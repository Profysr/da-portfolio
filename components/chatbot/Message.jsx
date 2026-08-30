"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconCopy, IconCheck, IconUser, IconRobot } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// 1. Import all primitives directly from your ai-elements/message component
import {
  Message as BaseMessage,
  MessageContent,
  MessageActions,
  MessageAction,
  MessageResponse,
  MessageToolbar,
} from "@/components/ai-elements/message";

// 2. Modern "Thinking" Indicator
// Creates a smooth, 3-dot bouncing animation
function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-1 h-5 px-1">
      <span className="size-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="size-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="size-1.5 bg-foreground/50 rounded-full animate-bounce" />
    </div>
  );
}

// 3. Simplified Avatar Component
function MessageAvatar({ isUser }) {
  return (
    <div
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-lg text-xs transition-colors mt-0.5",
        isUser
          ? "bg-primary/15 text-primary border border-primary/25"
          : "bg-surface-muted text-muted-foreground border border-border/60",
      )}
    >
      {isUser ? (
        <IconUser className="size-4" />
      ) : (
        <IconRobot className="size-4" />
      )}
    </div>
  );
}

// 4. The Unified ChatMessage Component
export function ChatMessage({ message, isLatestStreaming }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    // 5. BaseMessage automatically applies flex direction, alignment, and 'is-user' classes
    <BaseMessage from={message.role} className="gap-3">
      <MessageAvatar isUser={isUser} />

      {/* 6. MessageContent inherently knows its parent role and applies bubble styling (bg, color, rounding) */}
      <MessageContent>
        {isUser ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : (
          // 7. MessageResponse directly handles Streamdown (All custom markdown config removed!)
          <MessageResponse content={message.content} />
        )}

        {/* 8. Show thinking indicator if the stream just started and content is empty */}
        {isLatestStreaming && !isUser && message.content === "" && (
          <ThinkingIndicator />
        )}
      </MessageContent>

      {/* 9. MessageToolbar & Actions handle the copy button seamlessly */}
      {!isUser && !isLatestStreaming && (
        <MessageToolbar className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <MessageActions>
            <MessageAction tooltip="Copy message" onClick={handleCopy}>
              {copied ? (
                <IconCheck className="size-3.5 text-emerald-500" />
              ) : (
                <IconCopy className="size-3.5 text-muted-foreground" />
              )}
            </MessageAction>
          </MessageActions>
        </MessageToolbar>
      )}
    </BaseMessage>
  );
}

// 10. Main Container Component
export function ChatMessagesContainer({ messages, isStreaming }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  // 11. Determine if we are waiting for the API to respond to a user message
  const isWaitingForResponse =
    isStreaming &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "user";

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-4 space-y-6 w-full"
      role="log"
      aria-live="polite"
    >
      {/* 12. Dynamic Empty State (Disappears automatically when first message is sent) */}
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-2 opacity-80 pt-10">
          <IconRobot className="size-10 text-muted-foreground/50 mb-2" />
          <p className="text-sm font-semibold text-foreground">
            Ask me about Bilal's work
          </p>
          <p className="text-xs text-muted-foreground">
            Projects, experience, tech stack, or contact info
          </p>
        </div>
      ) : (
        // 13. Map through messages using our refined component
        messages.map((msg, index) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isLatestStreaming={
              isStreaming &&
              index === messages.length - 1 &&
              msg.role === "assistant"
            }
          />
        ))
      )}

      {/* 14. Render standalone thinking indicator BEFORE the assistant message object is added to the array */}
      {isWaitingForResponse && (
        <BaseMessage from="assistant" className="gap-3">
          <MessageAvatar isUser={false} />
          <MessageContent>
            <ThinkingIndicator />
          </MessageContent>
        </BaseMessage>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
