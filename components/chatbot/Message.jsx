"use client";

import { IconX, IconCopy, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/* Simple markdown renderer for curated responses */
function renderMarkdown(text) {
  const parts = text.split(/(\n\n|\n)/);
  return parts.map((part, i) => {
    if (part === "\n\n" || part === "\n") return <br key={`br-${i}`} />;
    if (part.startsWith("▸") || part.startsWith("•")) {
      return <div key={i} className="ml-4 my-1 text-sm text-muted-foreground">{part}</div>;
    }
    if (part.includes("**")) {
      const boldParts = part.split(/\*\*(.*?)\*\*/);
      return (
        <span key={i} className="text-sm leading-relaxed">
          {boldParts.map((bp, j) => (j % 2 === 1 ? <strong key={j}>{bp}</strong> : bp))}
        </span>
      );
    }
    if (part.includes("`")) {
      const codeParts = part.split(/`(.*?)`/);
      return (
        <span key={i} className="text-sm leading-relaxed">
          {codeParts.map((cp, j) => (j % 2 === 1 ? <code key={j} className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-primary">{cp}</code> : cp))}
        </span>
      );
    }
    return <p key={i} className="text-sm leading-relaxed">{part}</p>;
  });
}

export function Message({ content, role, isStreaming }) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 w-full max-w-[320px] animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
      role={isUser ? undefined : "log"}
      aria-live={isUser ? undefined : "polite"}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
        aria-hidden
      >
        {isUser ? (
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ) : (
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 17h8M12 11v6" />
          </svg>
        )}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "relative flex-1 rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted border border-border rounded-tl-sm"
        )}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {role === "assistant" ? renderMarkdown(content) : content}
        </div>

        {/* Streaming cursor */}
        {isStreaming && role === "assistant" && (
          <span className="inline-block ml-1 animate-pulse text-primary" aria-hidden>
            ▋
          </span>
        )}

        {/* Copy button on hover */}
        <button
          className="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100 size-6 rounded bg-surface/80 text-muted-foreground hover:text-foreground"
          aria-label="Copy message"
          onClick={() => navigator.clipboard.writeText(content)}
        >
          <IconCopy className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

export function WelcomeMessage() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[320px]">
      <div className="flex gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground" aria-hidden>
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 17h8M12 11v6" />
          </svg>
        </div>
        <div className="flex-1 rounded-2xl bg-muted/50 border border-border/50 p-4">
          <p className="text-sm font-medium text-foreground">Ask me about Bilal's work</p>
          <p className="text-xs text-muted-foreground mt-1">Projects, experience, tech stack, or contact info</p>
        </div>
      </div>
    </div>
  );
}