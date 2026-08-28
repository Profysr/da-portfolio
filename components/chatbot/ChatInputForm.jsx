"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  IconAlertCircle,
  IconArrowUp,
  IconLoader2,
  IconCheck,
  IconShieldCheck,
  IconCoins,
} from "@tabler/icons-react";
import { DrawerFooter } from "@/components/ui/drawer";
import { QuickActions } from "./QuickActions";
import { AutoResizeTextArea } from "./AutoResizeTextArea";
import { CHAT_CONSTRAINTS, normalizeInput } from "@/lib/chat-guard";
import { cn } from "@/lib/utils";

// ============================================================================
// COMPONENT: ChatInputForm
// Handles user input formatting, character bounds, credit tracking, and submission.
// ============================================================================
export function ChatInputForm({
  input,
  setInput,
  onSubmit,
  isStreaming,
  isOpen,
  showQuickActions,
  onQuickAction,
  maxLength = CHAT_CONSTRAINTS.MAX_LENGTH,
  userCredits = 20,
  maxCredits = 20,
}) {
  const inputRef = useRef(null);
  const [validationError, setValidationError] = useState("");

  // Character limit status evaluation
  const isOverLimit = input.length > maxLength;
  const isLowCredits = userCredits <= 0;

  // Auto-focus input when the drawer opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Client-side length and structural validation
  const validateAndSetError = useCallback(
    (value) => {
      const trimmed = value.trim();

      if (!trimmed) {
        setValidationError("");
        return false;
      }

      if (value.length > maxLength) {
        setValidationError(
          `Message exceeds maximum length of ${maxLength} characters`,
        );
        return false;
      }

      setValidationError("");
      return true;
    },
    [maxLength],
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    validateAndSetError(value);
  };

  const handleFormSubmit = () => {
    const cleaned = normalizeInput(input);
    if (cleaned && !isStreaming && !isOverLimit && !isLowCredits) {
      setValidationError("");
      onSubmit(cleaned);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (validateAndSetError(input)) {
        handleFormSubmit();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAndSetError(input)) {
      handleFormSubmit();
    }
  };

  const canSubmit =
    input.trim().length > 0 && !isStreaming && !isOverLimit && !isLowCredits;

  return (
    <DrawerFooter className="p-2 gap-2 bg-surface backdrop-blur-md border-t border-border/40 flex flex-col items-center">
      {/* Quick Action Suggestions */}
      {showQuickActions && (
        <QuickActions onActionClick={onQuickAction} disabled={isStreaming} />
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1.5">
        {/* Unified Input Container */}
        <div className="relative flex flex-col w-full rounded-md border border-border bg-background/80 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring transition-all overflow-hidden shadow-sm">
          {/* Validation Error Banner */}
          {validationError && (
            <div
              id="validation-error"
              className="mx-2 mt-2 px-2.5 py-1 text-[11px] text-destructive bg-destructive/10 border border-destructive/20 rounded-md flex items-center gap-1.5"
              role="alert"
              aria-live="polite"
            >
              <IconAlertCircle className="size-3.5 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Main Text Area */}
          <div className="relative w-full pr-12">
            <AutoResizeTextArea
              ref={inputRef}
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              maxLength={maxLength}
              placeholder={
                isLowCredits
                  ? "You have depleted your credits for today..."
                  : validationError
                    ? `Error: ${validationError}`
                    : "Reply to assistant..."
              }
              disabled={isStreaming || isLowCredits}
              aria-label="Chat input"
              autoComplete="off"
              aria-invalid={isOverLimit || !!validationError ? "true" : "false"}
              aria-describedby={
                validationError ? "validation-error" : undefined
              }
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent resize-none p-3 text-sm min-h-14"
            />

            {/* Action Button */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={cn(
                "absolute right-2.5 bottom-2.5 size-7 rounded-lg flex items-center justify-center transition-all",
                canSubmit
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 shadow-sm"
                  : "bg-muted text-muted-foreground opacity-40 cursor-not-allowed scale-95",
              )}
              aria-label={
                isStreaming
                  ? "Streaming response"
                  : validationError
                    ? `Error: ${validationError}`
                    : "Send message"
              }
            >
              {isStreaming ? (
                <IconLoader2 className="size-3.5 animate-spin" />
              ) : (
                <IconArrowUp className="size-3.5 stroke-[2.5]" />
              )}
            </button>
          </div>

          {/* Integrated Bottom Constraint Strip */}
          <div className="flex items-center justify-end px-3 py-1 text-[10px] text-muted-foreground select-none">
            {/* Right: Real-time Credits & Dynamic Character Counter */}
            <div className="flex items-center gap-3">
              {/* Real-time Credits Badge */}
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-medium",
                  isLowCredits
                    ? "text-destructive"
                    : "text-muted-foreground/80",
                )}
              >
                <IconCoins className="size-3 opacity-70" />
                <span>
                  {userCredits}/{maxCredits} credits
                </span>
              </span>

              <span className="text-border">|</span>

              {/* Character Counter */}
              <span
                className={cn(
                  "font-mono transition-colors",
                  isOverLimit
                    ? "text-destructive font-bold"
                    : input.length > maxLength * 0.85
                      ? "text-amber-500 font-medium"
                      : "text-muted-foreground/70",
                )}
              >
                {input.length}/{maxLength}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full px-2 pt-0.5 text-center">
          <div className="flex items-center justify-center gap-3 text-[10px]">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-500 font-medium">
              <IconShieldCheck className="size-3" />
              <span>Prompt Protection Active</span>
            </span>
          </div>
        </div>
      </form>
    </DrawerFooter>
  );
}
