"use client";

import React, { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/common/Markdown";

export function Message({ content, role, isStreaming }) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        "group flex gap-2.5 w-full max-w-[85%] items-start animate-fade-in",
        isUser ? "flex-row-reverse ml-auto" : "flex-row mr-auto",
      )}
      role={isUser ? undefined : "log"}
      aria-live={isUser ? undefined : "polite"}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground border border-border/40",
        )}
        aria-hidden
      >
        {isUser ? (
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ) : (
          <svg
            className="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 17h8M12 11v6" />
          </svg>
        )}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "relative rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed break-words",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-xs"
            : "bg-muted/60 border border-border/40 text-foreground rounded-tl-xs",
        )}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{content}</div>
        ) : (
          <Markdown>{content}</Markdown>
        )}

        {/* Streaming cursor */}
        {isStreaming && role === "assistant" && (
          <span
            className="inline-block ml-1 animate-pulse text-primary font-bold"
            aria-hidden
          >
            ▋
          </span>
        )}

        {/* Copy button on hover (assistant messages only) */}
        {!isUser && !isStreaming && (
          <button
            className="absolute -bottom-6 right-0 opacity-0 transition-opacity group-hover:opacity-100 p-1 text-muted-foreground hover:text-foreground"
            aria-label="Copy message"
            onClick={handleCopy}
          >
            {copied ? (
              <IconCheck className="size-3.5 text-emerald-500" />
            ) : (
              <IconCopy className="size-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export function WelcomeMessage() {
  return (
    <div className="flex gap-2.5 w-full max-w-[85%] items-start mr-auto">
      <div
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground border border-border/40"
        aria-hidden
      >
        <svg
          className="size-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 17h8M12 11v6" />
        </svg>
      </div>
      <div className="rounded-2xl bg-muted/40 border border-border/40 p-3.5 rounded-tl-xs">
        <p className="text-xs font-semibold text-foreground">
          Ask me about Bilal's work
        </p>
        <p className="text-xs text-muted-foreground/80 mt-0.5">
          Projects, experience, tech stack, or contact info
        </p>
      </div>
    </div>
  );
}
