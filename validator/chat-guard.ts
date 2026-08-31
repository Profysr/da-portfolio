import { z } from "zod";

// ============================================================================
// 1. SCHEMAS & CONSTRAINTS
// ============================================================================

export const CHAT_CONSTRAINTS = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 1000,
  MAX_FREE_CREDITS: 5,
};

// Plain chat message shape — no `useChat`/`UIMessage.parts` involved anymore,
// so this can stay a simple, stable string-content schema instead of chasing
// the `ai` package's internal UIMessagePart union.
export const ChatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

export const ChatRequestSchema = z.object({
  messages: z
    .array(ChatMessageSchema)
    .min(1, "At least one message is required")
    .max(50, "Message context window exceeded"),
  currentPath: z.string().optional(),
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;

// ============================================================================
// 2. SANITIZATION & NORMALIZATION
// ============================================================================

/**
 * Normalizes text, strips non-printable ASCII control characters, and trims whitespace.
 */
export function normalizeInput(input: unknown): string {
  if (typeof input !== "string") return "";

  return (
    input
      // Remove null bytes and invisible control chars (keep standard newlines/tabs)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      .trim()
  );
}

/**
 * Validates chat request structure and sanitizes user message content.
 */
export function validateAndCleanRequest(body: unknown) {
  const parseResult = ChatRequestSchema.safeParse(body);

  if (!parseResult.success) {
    const errors = parseResult.error.issues.map(
      (i) => `${i.path.join(".")}: ${i.message}`,
    );
    return { isValid: false as const, errors };
  }

  const cleanedMessages: ChatMessage[] = parseResult.data.messages.map((msg) =>
    msg.role === "user"
      ? { ...msg, content: normalizeInput(msg.content) }
      : msg,
  );

  const lastUserMsg = cleanedMessages.filter((m) => m.role === "user").pop();

  if (
    !lastUserMsg ||
    lastUserMsg.content.length < CHAT_CONSTRAINTS.MIN_LENGTH
  ) {
    return { isValid: false as const, errors: ["User query cannot be empty"] };
  }

  if (lastUserMsg.content.length > CHAT_CONSTRAINTS.MAX_LENGTH) {
    return {
      isValid: false as const,
      errors: [
        `Query exceeds maximum limit of ${CHAT_CONSTRAINTS.MAX_LENGTH} characters`,
      ],
    };
  }

  return {
    isValid: true as const,
    data: { ...parseResult.data, messages: cleanedMessages },
  };
}

// ============================================================================
// 3. PROMPT INJECTION GUARD
// ============================================================================

/**
 * Wraps user input in structural boundary tags to prevent context manipulation.
 */
export function wrapPromptBoundary(userQuery: string): string {
  return `<user_query>\n${userQuery}\n</user_query>`;
}
