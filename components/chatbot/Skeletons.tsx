"use client";

import { Skeleton } from "@/components/common/Skeleton";
import { cn } from "@/lib/utils";

export function ConversationSkeleton() {
  return (
    <div
      className="flex-1 flex flex-col gap-8 p-4 overflow-hidden"
      aria-hidden="true"
    >
      {/* Simulated User Message - matches Message + MessageContent structure */}
      <div className="group flex w-full max-w-[95%] flex-col gap-2 is-user ml-auto justify-end">
        <div className="is-user:dark flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-sm group-[.is-user]:ml-auto group-[.is-user]:rounded-lg group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground">
          <Skeleton className="h-4 w-48 rounded bg-muted/60" />
          <Skeleton className="h-4 w-32 rounded bg-muted/40" />
        </div>
      </div>

      {/* Simulated Assistant Message - matches Message + MessageContent structure */}
      <div className="group flex w-full max-w-[95%] flex-col gap-2 is-assistant">
        <div className="flex items-start gap-3">
          <Skeleton className="size-7 rounded-full bg-muted shrink-0" />
          <div className="is-user:dark flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-sm group-[.is-assistant]:text-foreground">
            <Skeleton className="h-4 w-full bg-muted/60 rounded" />
            <Skeleton className="h-4 w-5/6 bg-muted/40 rounded" />
            <Skeleton className="h-4 w-1/2 bg-muted/40 rounded" />
          </div>
        </div>
      </div>

      {/* Second Assistant Message for variety */}
      {/* <div className="group flex w-full max-w-[95%] flex-col gap-2 is-assistant">
        <div className="flex items-start gap-3">
          <Skeleton className="size-7 rounded-full bg-muted shrink-0" />
          <div className="is-user:dark flex w-fit min-w-0 max-w-full flex-col gap-2 overflow-hidden text-sm group-[.is-assistant]:text-foreground">
            <Skeleton className="h-4 w-full bg-muted/60 rounded" />
            <Skeleton className="h-4 w-4/5 bg-muted/40 rounded" />
          </div>
        </div>
      </div> */}
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

      {/* Input Box Skeleton - matches ChatPrompt structure */}
      <div className="rounded-xl border border-border p-2 space-y-3 bg-background/50">
        <Skeleton className="h-12 w-full bg-muted/50 rounded-md" />
        <div className="flex justify-between items-center pt-1">
          <Skeleton className="h-5 w-16 bg-primary rounded" />
          <Skeleton className="size-8 rounded-lg bg-primary" />
        </div>
      </div>
    </div>
  );
}
