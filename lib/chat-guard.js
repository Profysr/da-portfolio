import { z } from "zod";

// ============================================================================
// 1. SCHEMAS & CONSTRAINTS
// ============================================================================

export const CHAT_CONSTRAINTS = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 1000,
  MAX_HISTORY_MESSAGES: 10,
};

export const ChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
        id: z.string().optional(),
      }),
    )
    .min(1, "At least one message is required")
    .max(50, "Message context window exceeded"),
  currentPath: z.string().optional(),
});

// ============================================================================
// 2. SANITIZATION & NORMALIZATION
// ============================================================================

/**
 * Normalizes text, strips non-printable ASCII control characters, and trims whitespace.
 * @param {string} input
 * @returns {string}
 */
export function normalizeInput(input) {
  if (typeof input !== "string") return "";

  return (
    input
      // Remove null bytes and invisible control chars (keep standard newlines/tabs)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      .trim()
  );
}

/**
 * Validates chat request structure and sanitizes user input strings.
 * @param {unknown} body
 */
export function validateAndCleanRequest(body) {
  const parseResult = ChatRequestSchema.safeParse(body);

  if (!parseResult.success) {
    const errors = parseResult.error.issues.map(
      (i) => `${i.path.join(".")}: ${i.message}`,
    );
    return { isValid: false, errors };
  }

  const cleanedMessages = parseResult.data.messages.map((msg) => {
    if (msg.role === "user") {
      const cleanedContent = normalizeInput(msg.content);
      return { ...msg, content: cleanedContent };
    }
    return msg;
  });

  const lastUserMsg = cleanedMessages.filter((m) => m.role === "user").pop();

  if (
    !lastUserMsg ||
    lastUserMsg.content.length < CHAT_CONSTRAINTS.MIN_LENGTH
  ) {
    return { isValid: false, errors: ["User query cannot be empty"] };
  }

  if (lastUserMsg.content.length > CHAT_CONSTRAINTS.MAX_LENGTH) {
    return {
      isValid: false,
      errors: [
        `Query exceeds maximum limit of ${CHAT_CONSTRAINTS.MAX_LENGTH} characters`,
      ],
    };
  }

  return {
    isValid: true,
    data: { ...parseResult.data, messages: cleanedMessages },
  };
}

// ============================================================================
// 3. PROMPT INJECTION GUARD
// ============================================================================

/**
 * Wraps user input in structural boundary tags to prevent context manipulation.
 * @param {string} userQuery
 * @returns {string}
 */
export function wrapPromptBoundary(userQuery) {
  return `<user_query>\n${userQuery}\n</user_query>`;
}
