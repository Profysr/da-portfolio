"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * TagFilter - Universal pill/tag filter component for categories, tabs, and counts.
 *
 * Supports both simple string arrays: ["All", "Web", "Automation"]
 * and object arrays: [{ id: "web", label: "Web", count: 12 }]
 */
export function TagFilter({
  items = [],
  activeValue,
  onChange,
  className,
  buttonClassName,
  getItemValue = (item) => (typeof item === "object" ? item.id ?? item.label : item),
  getItemLabel = (item) => (typeof item === "object" ? item.label : item),
  getItemCount = (item) => (typeof item === "object" ? item.count : undefined),
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full max-w-2xl",
        className,
      )}
    >
      {items.map((item) => {
        const val = getItemValue(item);
        const label = getItemLabel(item);
        const count = getItemCount(item);
        const isActive = activeValue === val;

        return (
          <button
            key={String(val)}
            type="button"
            onClick={() => onChange?.(val)}
            className={cn(
              "px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 inline-flex items-center gap-1.5 select-none",
              isActive
                ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-surface-high",
              buttonClassName,
            )}
          >
            <span>{label}</span>
            {count !== undefined && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded font-mono transition-colors",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-white/10 text-muted-foreground",
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default TagFilter;