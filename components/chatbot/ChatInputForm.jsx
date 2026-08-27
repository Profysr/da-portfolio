"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  IconAlertCircle,
  IconArrowUp,
  IconLoader2,
  IconCheck,
} from "@tabler/icons-react";
import { DrawerFooter } from "@/components/ui/drawer";
import { QuickActions } from "./QuickActions";
import { AutoResizeTextArea } from "./AutoResizeTextArea";
import { CHAT_CONSTRAINTS, normalizeInput } from "@/lib/chat-guard";
import { cn } from "@/lib/utils";

// ============================================================================
// COMPONENT: ChatInputForm
// Handles user input formatting, character bounds, and submission dispatch.
// Note: Legacy regex keyword blacklists were removed to prevent false-positive
// rejections on valid technical developer queries.
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
}) {
  const inputRef = useRef(null);
  const [validationError, setValidationError] = useState("");

  // Character limit status evaluation
  const isOverLimit = input.length > maxLength;

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
    if (cleaned && !isStreaming && !isOverLimit) {
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

  const canSubmit = input.trim().length > 0 && !isStreaming && !isOverLimit;

  return (
    <DrawerFooter className="p-2 gap-2 bg-surface backdrop-blur-md border-t border-border/40 flex flex-col items-center">
      {/* Quick Action Suggestions */}
      {showQuickActions && (
        <QuickActions onActionClick={onQuickAction} disabled={isStreaming} />
      )}

      <form onSubmit={handleSubmit} className="relative flex items-end w-full">
        <AutoResizeTextArea
          ref={inputRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          maxLength={maxLength}
          placeholder={
            validationError
              ? `Error: ${validationError}`
              : "Reply to assistant..."
          }
          disabled={isStreaming}
          aria-label="Chat input"
          autoComplete="off"
          aria-invalid={isOverLimit || !!validationError ? "true" : "false"}
          aria-describedby={validationError ? "validation-error" : undefined}
        />

        {/* Validation Error Banner */}
        {validationError && (
          <div
            id="validation-error"
            className="absolute bottom-full left-3 right-12 mb-1 px-2 py-1 text-[10px] text-destructive bg-destructive/10 border border-destructive/30 rounded flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <IconAlertCircle className="size-3 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Live Character Count Indicator */}
        <span
          className={cn(
            "absolute right-12 bottom-2 text-[10px] select-none transition-colors",
            isOverLimit
              ? "text-destructive font-medium"
              : "text-muted-foreground/50",
          )}
        >
          {input.length}/{maxLength}
        </span>

        {/* Action Button */}
        <button
          type="submit"
          disabled={!canSubmit}
          className={cn(
            "absolute right-2 bottom-3 size-8 rounded-md flex items-center justify-center transition-all",
            canSubmit
              ? "bg-primary text-primary-foreground hover:bg-primary-hover hover:scale-105"
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
            <IconLoader2 className="size-4 animate-spin" />
          ) : (
            <IconArrowUp className="size-4 stroke-[2.5]" />
          )}
        </button>
      </form>

      {/* Disclaimers & Constraints Footer */}
      {/* <p className="text-[11px] text-muted-foreground/60 text-center select-none pt-0.5">
        AI responses are generated based on portfolio details and may vary.
      </p> */}

      <div className="w-full px-2 pt-1 text-center">
        <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground/60 flex-wrap">
          <span className="inline-flex items-center gap-1">
            <IconCheck className="size-2.5 text-emerald-500" />
            <span>Prompt Protection Active</span>
          </span>
        </div>
      </div>
    </DrawerFooter>
  );
}
