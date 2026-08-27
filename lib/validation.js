import { z } from "zod";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { CHAT_CONSTRAINTS } from "./validation-client";

// Initialize JSDOM window for DOMPurify server-side sanitization
const window = new JSDOM("").window;
const purify = DOMPurify(window);

// ============================================================================
// 2. SECURITY DETECTORS
// ============================================================================

const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i,
  /javascript:/i,
  /on\w+\s*=/i,
  /data:/i,
  /vbscript:/i,
  /expression\s*\(/i,
  /<iframe/i,
  /<object/i,
  /<embed/i,
  /<applet/i,
  /<meta/i,
  /<link/i,
  /<style/i,
  /eval\s*\(/i,
  /document\.cookie/i,
  /import\s*\(/i,
  /require\s*\(/i,
  /__proto__/i,
  /constructor\s*\(/i,
  /prototype\./i,
];

const SQL_INJECTION_PATTERNS = [
  /(\b(DROP|ALTER|EXEC|EXECUTE)\b)/i,
  /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
  /(xp_cmdshell|sp_executesql)/i,
];

// ============================================================================
// 3. ZOD SCHEMA DEFINITIONS
// ============================================================================

export const ChatMessageSchema = z.object({
  content: z
    .string()
    .min(CHAT_CONSTRAINTS.MIN_LENGTH, "Message cannot be empty")
    .max(
      CHAT_CONSTRAINTS.MAX_LENGTH,
      `Message exceeds maximum length of ${CHAT_CONSTRAINTS.MAX_LENGTH} characters`,
    ),
  currentPath: z.string().optional(),
});

export const ChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
        id: z.string().optional(),
      }),
    )
    .min(1, "At least one message required")
    .max(50, "Too many messages"),
  currentPath: z.string().optional(),
});

// ============================================================================
// 4. SANITIZATION & INSPECTION HELPERS
// ============================================================================

/**
 * Strips HTML tags and control characters from text inputs.
 * @param {string} input - Raw text string.
 * @returns {string} Cleaned plain text.
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== "string") return "";

  let sanitized = purify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });

  // Remove control characters (ASCII 0-8, 11-12, 14-31, 127)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  return sanitized.trim();
}

/**
 * Inspects text for dangerous execution patterns or obfuscation anomalies.
 * @param {string} input - Text to inspect.
 * @returns {string[]} Array of detected issue descriptions.
 */
export function detectDangerousPatterns(input) {
  const issues = [];

  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(input)) {
      issues.push(`Dangerous pattern detected: ${pattern.source}`);
    }
  }

  for (const pattern of SQL_INJECTION_PATTERNS) {
    if (pattern.test(input)) {
      issues.push(`SQL injection pattern detected: ${pattern.source}`);
    }
  }

  const specialCharRatio =
    (input.match(/[<>{}[\]\\|`$%^&*]/g) || []).length / input.length;
  if (specialCharRatio > 0.45) {
    issues.push(
      "Excessive special characters detected (potential obfuscation)",
    );
  }

  const words = input.split(/\s+/);
  if (words.some((w) => w.length > 300)) {
    issues.push("Unusually long continuous token detected");
  }

  return issues;
}

// ============================================================================
// 5. INPUT & REQUEST VALIDATORS
// ============================================================================

/**
 * Validates a single text message string.
 * @param {unknown} input
 * @returns {{ isValid: boolean, errors: string[], sanitized?: string }}
 */
export function validateChatInput(input) {
  const errors = [];

  if (typeof input !== "string") {
    return { isValid: false, errors: ["Input must be a string"] };
  }

  if (input.length < CHAT_CONSTRAINTS.MIN_LENGTH) {
    errors.push(
      `Message must be at least ${CHAT_CONSTRAINTS.MIN_LENGTH} character`,
    );
  }
  if (input.length > CHAT_CONSTRAINTS.MAX_LENGTH) {
    errors.push(
      `Message exceeds maximum length of ${CHAT_CONSTRAINTS.MAX_LENGTH} characters`,
    );
  }

  const issues = detectDangerousPatterns(input);
  errors.push(...issues);

  const sanitized = sanitizeInput(input);

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? sanitized : undefined,
  };
}

/**
 * Validates a full API request body containing message arrays.
 * @param {unknown} body
 * @returns {{ isValid: boolean, errors: string[], data?: object }}
 */
export function validateChatRequest(body) {
  const result = ChatRequestSchema.safeParse(body);

  if (!result.success) {
    const errors = result.error.issues.map(
      (e) => `${e.path.join(".")}: ${e.message}`,
    );
    return { isValid: false, errors };
  }

  const messageErrors = [];
  for (const [i, msg] of result.data.messages.entries()) {
    if (msg.role === "user") {
      const validation = validateChatInput(msg.content);
      if (!validation.isValid) {
        messageErrors.push(`Message ${i + 1}: ${validation.errors.join(", ")}`);
      }
    }
  }

  if (messageErrors.length > 0) {
    return { isValid: false, errors: messageErrors };
  }

  return { isValid: true, errors: [], data: result.data };
}

// ============================================================================
// 6. IN-MEMORY RATE LIMITING HELPERS
// ============================================================================

const rateLimitStore = new Map();

/**
 * Evaluates minute-level rate limits.
 * @param {string} identifier - User IP or session ID.
 */
export function checkRateLimit(identifier) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const entry = rateLimitStore.get(identifier);

  if (!entry || now - entry.windowStart > windowMs) {
    rateLimitStore.set(identifier, { count: 1, windowStart: now });
    return {
      limited: false,
      remaining: CHAT_CONSTRAINTS.MAX_MESSAGES_PER_MINUTE - 1,
      resetTime: now + windowMs,
    };
  }

  if (entry.count >= CHAT_CONSTRAINTS.MAX_MESSAGES_PER_MINUTE) {
    return {
      limited: true,
      remaining: 0,
      resetTime: entry.windowStart + windowMs,
    };
  }

  entry.count++;
  return {
    limited: false,
    remaining: CHAT_CONSTRAINTS.MAX_MESSAGES_PER_MINUTE - entry.count,
    resetTime: entry.windowStart + windowMs,
  };
}

/**
 * Evaluates hour-level rate limits.
 * @param {string} identifier - User IP or session ID.
 */
export function checkHourlyRateLimit(identifier) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const hourKey = `${identifier}:hour`;
  const entry = rateLimitStore.get(hourKey);

  if (!entry || now - entry.windowStart > windowMs) {
    rateLimitStore.set(hourKey, { count: 1, windowStart: now });
    return {
      limited: false,
      remaining: CHAT_CONSTRAINTS.MAX_MESSAGES_PER_HOUR - 1,
      resetTime: now + windowMs,
    };
  }

  if (entry.count >= CHAT_CONSTRAINTS.MAX_MESSAGES_PER_HOUR) {
    return {
      limited: true,
      remaining: 0,
      resetTime: entry.windowStart + windowMs,
    };
  }

  entry.count++;
  return {
    limited: false,
    remaining: CHAT_CONSTRAINTS.MAX_MESSAGES_PER_HOUR - entry.count,
    resetTime: entry.windowStart + windowMs,
  };
}

/**
 * Checks all active rate-limiting windows.
 * @param {string} identifier
 */
export function checkAllRateLimits(identifier) {
  const minuteCheck = checkRateLimit(identifier);
  const hourCheck = checkHourlyRateLimit(identifier);

  if (minuteCheck.limited) {
    return {
      limited: true,
      reason: "Rate limit exceeded. Please wait before sending more messages.",
      retryAfter: Math.ceil((minuteCheck.resetTime - Date.now()) / 1000),
    };
  }
  if (hourCheck.limited) {
    return {
      limited: true,
      reason: "Hourly limit exceeded. Please try again later.",
      retryAfter: Math.ceil((hourCheck.resetTime - Date.now()) / 1000),
    };
  }

  return { limited: false };
}

export default {
  validateChatInput,
  validateChatRequest,
  sanitizeInput,
  checkRateLimit,
  checkHourlyRateLimit,
  checkAllRateLimits,
  CHAT_CONSTRAINTS,
};
