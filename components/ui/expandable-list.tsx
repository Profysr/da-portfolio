"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface ExpandableListProps<T> {
  items?: T[];
  initialCount?: number;
  renderItem?: (item: T, index: number) => React.ReactNode;
  renderContent?: (items: T[], isExpanded: boolean) => React.ReactNode;
  children?: React.ReactNode;
  showMoreLabel?: string | ((hiddenCount: number) => React.ReactNode);
  showLessLabel?: string | (() => React.ReactNode);
  className?: string;
  listClassName?: string;
  buttonClassName?: string;
}

export function ExpandableList<T>({
  items = [],
  initialCount = 4,
  renderItem,
  renderContent,
  children,
  showMoreLabel = "Show more",
  showLessLabel = "Show less",
  className,
  listClassName,
  buttonClassName,
}: ExpandableListProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hiddenCount = Math.max(0, items.length - initialCount);

  const renderLabel = () => {
    if (isExpanded) {
      return typeof showLessLabel === "function"
        ? showLessLabel()
        : showLessLabel;
    }
    return typeof showMoreLabel === "function"
      ? showMoreLabel(hiddenCount)
      : showMoreLabel;
  };

  // Case 1: Custom container renderer (e.g. MasonryGrid with sliced items)
  if (renderContent && items.length > 0) {
    const hasOverflow = items.length > initialCount;
    const displayedItems =
      hasOverflow && !isExpanded ? items.slice(0, initialCount) : items;

    return (
      <div className={cn("relative w-full flex flex-col", className)}>
        <motion.div
          layout
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          {renderContent(displayedItems, isExpanded)}
        </motion.div>

        {hasOverflow && (
          <div className="flex w-full items-center justify-center pt-5 sm:pt-6">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className={cn(
                "group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border bg-surface/90 hover:bg-surface-hover hover:border-primary/50 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 shadow-xs backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
                buttonClassName,
              )}
            >
              <span>{renderLabel()}</span>
              <IconChevronDown
                className={cn(
                  "h-4 w-4 text-primary transition-transform duration-300",
                  isExpanded ? "rotate-180" : "group-hover:translate-y-0.5",
                )}
              />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Case 2: Individual item renderer (e.g. FAQ list or vertical item cards)
  if (renderItem && items.length > 0) {
    const hasOverflow = items.length > initialCount;
    const visibleItems = hasOverflow ? items.slice(0, initialCount) : items;
    const hiddenItems = hasOverflow ? items.slice(initialCount) : [];

    return (
      <div className={cn("relative w-full flex flex-col", className)}>
        {/* Always visible initial items */}
        <div className={cn("w-full", listClassName)}>
          {visibleItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderItem(item, index)}
            </React.Fragment>
          ))}
        </div>

        {/* Expandable overflow items */}
        {hasOverflow && (
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden w-full"
              >
                <div className={cn("w-full pt-3", listClassName)}>
                  {hiddenItems.map((item, index) => (
                    <React.Fragment key={initialCount + index}>
                      {renderItem(item, initialCount + index)}
                    </React.Fragment>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Trigger Button */}
        {hasOverflow && (
          <div className="flex w-full items-center justify-center pt-5 sm:pt-6">
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className={cn(
                "group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border bg-surface/90 hover:bg-surface-hover hover:border-primary/50 text-xs sm:text-sm font-medium text-foreground transition-all duration-200 shadow-xs backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
                buttonClassName,
              )}
            >
              <span>{renderLabel()}</span>
              <IconChevronDown
                className={cn(
                  "h-4 w-4 text-primary transition-transform duration-300",
                  isExpanded ? "rotate-180" : "group-hover:translate-y-0.5",
                )}
              />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Case 3: Children fallback
  return (
    <div className={cn("relative w-full flex flex-col", className)}>
      <div className={cn("w-full", listClassName)}>{children}</div>
    </div>
  );
}
