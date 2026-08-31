"use client";

import { Skeleton } from "@/components/common/Skeleton";

export function ConversationSkeleton() {
  return (
    <div
      className="flex-1 flex flex-col justify-end p-4 space-y-4 overflow-hidden"
      aria-hidden="true"
    >
      {/* Simulated User Message */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-2/3 rounded-2xl rounded-tr-xs bg-muted/60" />
      </div>

      {/* Simulated Assistant Message */}
      <div className="flex items-start gap-3">
        <Skeleton className="size-7 rounded-full bg-muted shrink-0" />
        <div className="space-y-2 w-3/4">
          <Skeleton className="h-4 w-full bg-muted/60 rounded" />
          <Skeleton className="h-4 w-5/6 bg-muted/40 rounded" />
          <Skeleton className="h-4 w-1/2 bg-muted/40 rounded" />
        </div>
      </div>
    </div>
  );
}

export function PromptSkeleton() {
  return (
    <div
      className="border-t border-border p-2 bg-surface/50 space-y-2"
      aria-hidden="true"
    >
      {/* Quick Action Chips Skeleton */}
      <div className="flex gap-1.5 overflow-hidden">
        <Skeleton className="h-6 w-28 rounded-full bg-muted shrink-0" />
        <Skeleton className="h-6 w-32 rounded-full bg-muted shrink-0" />
        <Skeleton className="h-6 w-24 rounded-full bg-muted shrink-0" />
      </div>

      {/* Input Box Skeleton */}
      <div className="rounded-xl border border-border/60 p-2 space-y-3 bg-background/50">
        <Skeleton className="h-12 w-full bg-muted/30 rounded-md" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-5 w-16 bg-muted/40 rounded" />
          <Skeleton className="size-8 rounded-lg bg-muted" />
        </div>
      </div>
    </div>
  );
}
