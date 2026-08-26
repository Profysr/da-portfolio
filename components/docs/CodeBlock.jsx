"use client";

import { useState, useRef } from "react";
import { IconCopy, IconCheck, IconCode } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function CodeBlock({
  children,
  className,
  title,
  language,
  ...props
}) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  // Extract language from className if formatted like "language-python" or "language-jsx"
  const derivedLang =
    language ||
    (typeof className === "string"
      ? className.match(/language-([a-zA-Z0-9_-]+)/)?.[1]
      : "") ||
    "";

  const handleCopy = async () => {
    if (!preRef.current) return;
    const text = preRef.current.innerText || preRef.current.textContent || "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative group/code my-6 rounded-xl border border-border/80 bg-surface/80 dark:bg-[#0c0c0e] overflow-hidden shadow-sm transition-all">
      {/* Code Block Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-muted/70 dark:bg-[#141417] border-b border-border/60 text-xs text-muted-foreground font-mono">
        <div className="flex items-center gap-2">
          {/* macOS style dots */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="size-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          {title ? (
            <span className="text-foreground font-medium flex items-center gap-1.5">
              <IconCode className="size-3.5 text-primary" />
              {title}
            </span>
          ) : derivedLang ? (
            <span className="text-primary font-semibold uppercase tracking-wider text-[11px]">
              {derivedLang}
            </span>
          ) : (
            <span className="text-muted-foreground/80">code</span>
          )}
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : "Copy code"}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-muted-foreground hover:text-foreground hover:bg-surface-hover/80 border border-transparent hover:border-border/60 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <IconCheck className="size-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-sans font-medium">Copied</span>
            </>
          ) : (
            <>
              <IconCopy className="size-3.5" />
              <span className="font-sans">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <pre
        ref={preRef}
        className={cn(
          "p-4 overflow-x-auto text-[13px] sm:text-sm font-mono leading-relaxed bg-transparent m-0 border-none rounded-none text-foreground",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
