"use client";

import {
  useState,
  useRef,
  useLayoutEffect,
  type ComponentProps,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { IconBolt, IconSend2 } from "@tabler/icons-react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { QuickActions } from "./QuickActions";
import { MessageItem } from "./ChatConversation";

// ============================================================================
// Constants & Config
// ============================================================================
const MAX_CHARS = 500;
const TOTAL_CREDITS = 10;

// ============================================================================
// Auto-Resize Textarea Component
// ============================================================================

interface AutoResizeTextareaProps extends ComponentProps<"textarea"> {
  value: string;
}

function AutoResizeTextarea({
  value,
  className,
  onChange,
  ...props
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate true scrollHeight shrink/growth
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 192)}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className={cn(
        "w-full resize-none bg-transparent px-3 py-2.5",
        "text-sm placeholder:text-muted-foreground",
        "outline-none focus:outline-none",
        "min-h-[2.5rem] max-h-48 overflow-y-auto",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

// ============================================================================
// Sub-Components: Footer Controls
// ============================================================================

interface PromptCreditsPillProps {
  credits: number;
}

function PromptCreditsPill({ credits }: PromptCreditsPillProps) {
  const noCredits = credits <= 0;

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors select-none",
        noCredits
          ? "border-destructive/40 bg-destructive/10 text-destructive"
          : credits <= 3
            ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
            : "border-border bg-muted/30 text-muted-foreground"
      )}
    >
      <IconBolt className="size-2.5" />
      <span>
        {noCredits ? "No credits" : `${credits} / ${TOTAL_CREDITS} credits`}
      </span>
    </div>
  );
}

interface PromptCharCounterProps {
  charCount: number;
  isOverLimit: boolean;
  isNearLimit: boolean;
}

function PromptCharCounter({
  charCount,
  isOverLimit,
  isNearLimit,
}: PromptCharCounterProps) {
  return (
    <span
      className={cn(
        "text-[10px] tabular-nums transition-colors",
        isOverLimit
          ? "font-semibold text-destructive"
          : isNearLimit
            ? "text-amber-400"
            : "text-muted-foreground/50"
      )}
    >
      {charCount} / {MAX_CHARS}
    </span>
  );
}

interface PromptSubmitButtonProps {
  canSubmit: boolean;
  isLoading: boolean;
}

function PromptSubmitButton({ canSubmit, isLoading }: PromptSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={!canSubmit}
      aria-label={isLoading ? "Stop" : "Submit"}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md transition-all",
        "bg-primary text-primary-foreground shadow-none",
        "hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
      )}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <IconSend2 className="size-4 text-background" />
      )}
    </button>
  );
}

// ============================================================================
// Main ChatPrompt Component
// ============================================================================

export interface ChatPromptProps {
  messages: MessageItem[];
  isLoading: boolean;
  onSend: (message: string) => void;
  /** Remaining credits. Defaults to TOTAL_CREDITS when not provided. */
  credits?: number;
}

export function ChatPrompt({
  messages,
  isLoading,
  onSend,
  credits = TOTAL_CREDITS,
}: ChatPromptProps) {
  const [inputValue, setInputValue] = useState("");

  const charCount = inputValue.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isNearLimit = charCount >= MAX_CHARS * 0.8 && !isOverLimit;
  const noCredits = credits <= 0;
  const canSubmit = !isLoading && !isOverLimit && !noCredits && charCount > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSend(inputValue.trim());
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSubmit) {
        onSend(inputValue.trim());
        setInputValue("");
      }
    }
  };

  return (
    <div className="p-2 bg-surface/50">
      {messages.length === 0 && !isLoading && (
        <QuickActions onActionClick={onSend} disabled={isLoading} />
      )}

      <form
        onSubmit={handleSubmit}
        className={cn(
          "w-full rounded-lg border transition-colors",
          "border-input dark:bg-input/30",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50"
        )}
      >
        <AutoResizeTextarea
          name="message"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            isLoading ? "Assistant is responding..." : "Reply to assistant..."
          }
          disabled={isLoading || noCredits}
          maxLength={MAX_CHARS + 20}
        />

        <div className="flex items-center justify-between px-2 pb-2">
          <PromptCreditsPill credits={credits} />

          <div className="flex items-center gap-2">
            <PromptCharCounter
              charCount={charCount}
              isOverLimit={isOverLimit}
              isNearLimit={isNearLimit}
            />
            <PromptSubmitButton canSubmit={canSubmit} isLoading={isLoading} />
          </div>
        </div>
      </form>
    </div>
  );
}