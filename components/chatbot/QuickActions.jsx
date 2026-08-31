"use client";

import { QUICK_ACTIONS } from "@/data/botContent";
import { cn } from "@/lib/utils";

export function QuickActions({ onActionClick, disabled }) {
  return (
    <div
      role="group"
      aria-label="Suggested questions"
      className="w-full overflow-x-auto whitespace-nowrap scrollbar-none py-1 px-1 flex gap-1"
    >
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.id}
          type="button"
          disabled={disabled}
          onClick={() => onActionClick(action.query)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
            "border border-border bg-surface text-muted-foreground",
            "hover:bg-surface-hover hover:text-foreground hover:border-primary/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          )}
        >
          <action.icon className="size-3.5 shrink-0" aria-hidden />
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}
