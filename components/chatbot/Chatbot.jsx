"use client";

import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  IconSparkles,
  IconArrowUp,
  IconLoader2,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import { Message, WelcomeMessage } from "./Message";
import { QuickActions } from "./QuickActions";
import { cn } from "@/lib/utils";
import { cannedResponses, matchCannedResponse } from "@/data/botContent";
import { validateInputClientSide, CHAT_CONSTRAINTS } from "@/lib/validation-client";

let msgIdCounter = 0;
function uniqueId() {
  return `${Date.now()}-${++msgIdCounter}-${Math.random().toString(36).slice(2, 8)}`;
}

// ============================================================================
// COMPONENT: ChatHeader
// ============================================================================

function ChatHeader() {
  return (
    <DrawerHeader className="py-2 px-3 border-b border-border">
      <div className="flex items-center gap-1.5">
        <IconSparkles className="size-3.5 text-muted-foreground" />
        <DrawerTitle className="text-sm! font-semibold tracking-tight text-foreground">
          AI Assistant
        </DrawerTitle>
      </div>
      <DrawerDescription className="text-[11px] text-muted-foreground/80 mt-0.5 text-left">
        Ask about projects, experience, or tech stack
      </DrawerDescription>
    </DrawerHeader>
  );
}

// ============================================================================
// COMPONENT: SourcesChips (renders clickable source links) — DISABLED
// ============================================================================

/*
function SourcesChips({ sources }) {
  if (!sources?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {sources.map((src, i) => (
        <a
          key={i}
          href={src.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium text-primary bg-primary/10 rounded hover:bg-primary/20 transition-colors"
        >
          <IconCheck className="size-3" />
          {src.title} › {src.heading}
        </a>
      ))}
    </div>
  );
}
*/

// ============================================================================
// COMPONENT: Message (enhanced with sources)
// ============================================================================

function EnhancedMessage({ content, role, isStreaming, sources }) {
  return (
    <div
      className={cn(
        "flex gap-2",
        role === "user" ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={cn(
          "relative max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed",
          role === "user"
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted text-foreground rounded-tl-sm",
        )}
      >
        <Message content={content} role={role} isStreaming={isStreaming} />
        {/* {role === "assistant" && !isStreaming && (
          <SourcesChips sources={sources} />
        )} */}
      </div>
    </div>
  );
}

// ============================================================================
// COMPONENT: ChatMessagesContainer
// ============================================================================

function ChatMessagesContainer({ messages, isStreaming }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  return (
    <div
      className="flex-1 overflow-y-auto px-2 py-3 space-y-4 w-full"
      role="log"
      aria-live="polite"
      aria-label="Conversation history"
    >
      <WelcomeMessage />
      {messages.map((msg, index) => (
        <EnhancedMessage
          key={msg.id}
          content={msg.content}
          role={msg.role}
          isStreaming={
            isStreaming &&
            index === messages.length - 1 &&
            msg.role === "assistant"
          }
          sources={msg.sources}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

// ============================================================================
// COMPONENT: ChatInputForm
// ============================================================================
const AutoResizeTextArea = forwardRef(
  ({ value, onChange, onKeyDown, className, ...props }, ref) => {
    const textareaRef = useRef(null);

    useImperativeHandle(ref, () => textareaRef.current);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "0px";
        textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
      }
    }, [value]);

    return (
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        rows={1}
        className={cn(
          "w-full min-h-[56px] max-h-40 py-4 pl-3 pr-11 text-sm resize-none overflow-y-auto bg-background/50 hover:bg-background border border-border/40 focus:border-foreground/20 rounded-lg focus:outline-none transition-all placeholder:text-muted-foreground/60 disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

AutoResizeTextArea.displayName = "AutoResizeTextArea";

function ChatInputForm({
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
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const validateAndSetError = useCallback((value) => {
    const result = validateInputClientSide(value);
    if (!result.isValid) {
      setValidationError(result.error || "Invalid input");
    } else {
      setValidationError("");
    }
    setIsOverLimit(value.length >= maxLength);
    return result.isValid;
  }, [maxLength]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isStreaming && validateAndSetError(input)) {
        onSubmit(input);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isStreaming && validateAndSetError(input)) {
      onSubmit(input);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    validateAndSetError(value);
  };

  return (
    <DrawerFooter className="p-2 gap-2 bg-surface backdrop-blur-md border-t border-border/40 flex flex-col items-center">
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
          placeholder={validationError ? `Error: ${validationError}` : "Reply to assistant..."}
          disabled={isStreaming}
          aria-label="Chat input"
          autoComplete="off"
          aria-invalid={validationError ? "true" : "false"}
          aria-describedby={validationError ? "validation-error" : undefined}
        />

        {/* Validation Error Display */}
        {validationError && (
          <div
            id="validation-error"
            className="absolute bottom-full left-3 right-12 mb-1 px-2 py-1 text-[10px] text-destructive bg-destructive/10 border border-destructive/30 rounded"
            role="alert"
            aria-live="polite"
          >
            <IconAlertCircle className="inline size-2.5 mr-1" />
            {validationError}
          </div>
        )}

        {/* Character Count Indicator */}
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

        <button
          type="submit"
          disabled={!input.trim() || isStreaming || validationError}
          className={cn(
            "absolute right-2 bottom-3 size-8 rounded-md flex items-center justify-center transition-all",
            input.trim() && !isStreaming && !validationError
              ? "bg-primary text-primary-foreground hover:bg-primary-hover hover:scale-105"
              : "bg-muted text-muted-foreground opacity-40 cursor-not-allowed scale-95",
          )}
          aria-label={isStreaming ? "Streaming response" : validationError ? `Error: ${validationError}` : "Send message"}
        >
          {isStreaming ? (
            <IconLoader2 className="size-4 animate-spin" />
          ) : (
            <IconArrowUp className="size-4 stroke-[2.5]" />
          )}
        </button>
      </form>

      <p className="text-[11px] text-muted-foreground/60 text-center select-none pt-0.5">
        AI responses are generated based on portfolio details and may vary.
      </p>

      {/* Constraints Visual Indicator */}
      <div className="w-full px-2 pt-1 text-center">
        <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground/60 flex-wrap">
          <span className="inline-flex items-center gap-1">
            <IconCheck className="size-2.5 text-emerald-500" />
            <span>Max {CHAT_CONSTRAINTS.MAX_LENGTH} chars</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <IconCheck className="size-2.5 text-emerald-500" />
            <span>{CHAT_CONSTRAINTS.MAX_MESSAGES_PER_MINUTE} msg/min</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <IconCheck className="size-2.5 text-emerald-500" />
            <span>{CHAT_CONSTRAINTS.MAX_MESSAGES_PER_HOUR} msg/hour</span>
          </span>
        </div>
      </div>
    </DrawerFooter>
  );
}

// ============================================================================
// MAIN COMPONENT: Chatbot
// ============================================================================

export function Chatbot({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);

  const processRealStream = useCallback(
    async (userText, currentPath) => {
      setIsStreaming(true);
      const msgId = uniqueId();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "", id: msgId, sources: [] },
      ]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, { role: "user", content: userText }],
            currentPath,
          }),
        });

        if (!res.ok) {
          if (res.status === 503) throw new Error("FALLBACK");
          throw new Error(`HTTP ${res.status}`);
        }

        const sourcesHeader = res.headers.get("X-Sources");
        let sources = [];
        try {
          sources = sourcesHeader ? JSON.parse(sourcesHeader) : [];
        } catch {
          sources = [];
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === msgId ? { ...m, content: fullText, sources } : m,
            ),
          );
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId ? { ...m, content: fullText, sources } : m,
          ),
        );
      } catch (err) {
        // Fallback to canned responses
        setFallbackMode(true);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? { ...m, content: matchCannedResponse(userText), sources: [] }
              : m,
          ),
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [messages],
  );

  const handleSend = (text) => {
    if (!text.trim() || isStreaming) return;
    const userText = text.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText, id: uniqueId() },
    ]);
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    processRealStream(userText, currentPath);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(val) => !val && onClose()}
      direction="bottom"
    >
      <DrawerPortal>
        <DrawerOverlay className="bg-background/50 backdrop-blur-sm" />
        <DrawerContent className="w-full mx-auto max-w-2xl bg-surface rounded-t-2xl border-t border-border focus:outline-none flex flex-col h-[85dvh]">
          <ChatHeader />
          <ChatMessagesContainer
            messages={messages}
            isStreaming={isStreaming}
          />
          <ChatInputForm
            input={input}
            setInput={setInput}
            onSubmit={handleSend}
            isStreaming={isStreaming}
            isOpen={open}
            showQuickActions={!isStreaming && messages.length === 0}
            onQuickAction={handleSend}
          />
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
