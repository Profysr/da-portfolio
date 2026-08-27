"use client";

import React, { useState } from "react";
import { IconCopy, IconCheck, IconUser, IconRobot } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Markdown } from "@/components/common/Markdown";

// Extracted Modular Sub-components
function MessageAvatar({ isUser }) {
  return (
    <div
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-lg text-xs transition-colors",
        isUser
          ? "bg-primary/15 text-primary border border-primary/25"
          : "bg-surface-muted text-muted-foreground border border-border/60",
      )}
      aria-hidden
    >
      {isUser ? (
        <IconUser className="size-4" />
      ) : (
        <IconRobot className="size-4" />
      )}
    </div>
  );
}

function CopyButton({ content }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      className="absolute -bottom-6 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
      aria-label="Copy message"
      onClick={handleCopy}
    >
      {copied ? (
        <IconCheck className="size-3.5 text-emerald-500" />
      ) : (
        <IconCopy className="size-3.5" />
      )}
    </button>
  );
}

export function Message({ content, role, isStreaming }) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "group flex gap-2.5 w-full max-w-[85%] items-start animate-fade-in",
        isUser ? "flex-row-reverse ml-auto" : "flex-row mr-auto",
      )}
      role={isUser ? undefined : "log"}
      aria-live={isUser ? undefined : "polite"}
    >
      <MessageAvatar isUser={isUser} />

      <div
        className={cn(
          "relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed break-words transition-all shadow-xs",
          isUser
            ? "bg-primary text-primary-foreground font-medium rounded-tr-xs"
            : "bg-surface border border-border/60 text-foreground rounded-tl-xs",
        )}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{content}</div>
        ) : (
          <Markdown>{content}</Markdown>
        )}

        {isStreaming && !isUser && (
          <span
            className="inline-block ml-1 animate-pulse text-primary font-bold"
            aria-hidden
          >
            ▋
          </span>
        )}

        {!isUser && !isStreaming && <CopyButton content={content} />}
      </div>
    </div>
  );
}

export function WelcomeMessage() {
  return (
    <div className="flex gap-2.5 w-full max-w-[85%] items-start mr-auto">
      <MessageAvatar isUser={false} />
      <div className="rounded-2xl bg-surface border border-border/60 p-3.5 rounded-tl-xs shadow-xs">
        <p className="text-xs font-semibold text-foreground">
          Ask me about Bilal's work
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Projects, experience, tech stack, or contact info
        </p>
      </div>
    </div>
  );
}
