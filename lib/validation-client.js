"use client";

/**
 * Client-side validation utilities
 * Lightweight version without JSDOM/DOMPurify for browser use
 */

const CHAT_CONSTRAINTS = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 1000,
  MAX_MESSAGES_PER_MINUTE: 5,
  MAX_MESSAGES_PER_HOUR: 20,
};

/**
 * Client-side input validation
 * Lightweight version without DOMPurify/JSDOM
 */
function validateInputClientSide(input) {
  if (!input || typeof input !== "string") {
    return { isValid: false, error: "Input must be a string" };
  }

  const trimmed = input.trim();
  
  if (trimmed.length < 1) {
    return { isValid: false, error: "Message cannot be empty" };
  }
  if (trimmed.length > CHAT_CONSTRAINTS.MAX_LENGTH) {
    return { isValid: false, error: `Message too long (max ${CHAT_CONSTRAINTS.MAX_LENGTH} characters)` };
  }

  // Basic pattern checks for client-side
  const dangerousPatterns = [
    /<script/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
    /eval\s*\(/gi,
    /document\./gi,
    /window\./gi,
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(input)) {
      return { isValid: false, error: "Input contains potentially dangerous content" };
    }
  }

  return { isValid: true, sanitized: trimmed };
}

export { validateInputClientSide, CHAT_CONSTRAINTS };