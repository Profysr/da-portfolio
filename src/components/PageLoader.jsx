"use client";

import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";

/**
 * Reusable page-level loading skeleton for detail pages
 * (WritingDetail, ProjectDetail, ProjectChangelog).
 *
 * @param {"default" | "compact" | "minimal"} variant
 * - default: full hero + 3 content blocks (best for article-style pages)
 * - compact: smaller hero + 2 content blocks (good for changelogs)
 * - minimal: just a centered spinner (good for fast loads)
 */
export function PageLoader({ variant = "default", className }) {
  if (variant === "minimal") {
    return (
      <Section className={cn("flex items-center justify-center py-32", className)}>
        <div className="flex flex-col items-center gap-3">
          <Spinner />
          <span className="text-xs font-mono text-muted-foreground/70">
            Loading…
          </span>
        </div>
      </Section>
    );
  }

  const isCompact = variant === "compact";

  return (
    <Section className={cn("py-8 md:py-12", className)}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero block */}
        <div
          className={cn(
            "rounded-lg bg-surface-high/40 animate-pulse",
            isCompact ? "h-5 w-32" : "h-6 w-24",
          )}
        />
        <div
          className={cn(
            "rounded-xl bg-surface-high/40 animate-pulse",
            isCompact ? "h-8 w-1/2" : "h-12 w-3/4",
          )}
        />
        <div
          className={cn(
            "rounded-2xl bg-surface-high/30 animate-pulse",
            isCompact ? "h-16" : "h-20",
          )}
        />

        {/* Body blocks */}
        <div className="space-y-3 pt-2">
          <div
            className={cn(
              "rounded bg-surface-high/40 animate-pulse",
              isCompact ? "h-3 w-full" : "h-3 w-5/6",
            )}
          />
          <div
            className={cn(
              "rounded bg-surface-high/40 animate-pulse",
              isCompact ? "h-3 w-11/12" : "h-3 w-4/6",
            )}
          />
          <div
            className={cn(
              "rounded bg-surface-high/40 animate-pulse",
              isCompact ? "h-3 w-3/4" : "h-3 w-3/6",
            )}
          />
        </div>
      </div>
    </Section>
  );
}

/**
 * Animated spinner for inline loading states.
 * Three rotating dots that pulse in sequence.
 */
export function Spinner({ className }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2 rounded-full bg-primary animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}