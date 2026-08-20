"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface ExpandableListProps<T> {
  items: T[];
  initialCount?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  showMoreLabel?: string | ((hiddenCount: number) => string);
  showLessLabel?: string;
  className?: string;
  listClassName?: string;
  buttonClassName?: string;
  animatePresence?: boolean;
}

export function ExpandableList<T>({
  items,
  initialCount = 3,
  renderItem,
  showMoreLabel,
  showLessLabel = "Show less",
  className,
  listClassName,
  buttonClassName,
}: ExpandableListProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);

  const canExpand = items.length > initialCount;
  const visibleItems = isExpanded ? items : items.slice(0, initialCount);
  const hiddenCount = Math.max(0, items.length - initialCount);

  const defaultShowMore =
    typeof showMoreLabel === "function"
      ? showMoreLabel(hiddenCount)
      : showMoreLabel || `Show more (${hiddenCount} more)`;

  return (
    <div className={cn("w-full flex flex-col", className)}>
      <div className={cn("w-full flex flex-col", listClassName)}>
        <AnimatePresence initial={false}>
          {visibleItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderItem(item, index)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {canExpand && (
        <div className="pt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className={cn(
              "group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3 hover:bg-white/8 hover:border-primary/40 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-all duration-300 shadow-sm backdrop-blur-md",
              buttonClassName
            )}
          >
            <span>{isExpanded ? showLessLabel : defaultShowMore}</span>
            <IconChevronDown
              className={cn(
                "h-4 w-4 text-primary transition-transform duration-300",
                isExpanded ? "rotate-180" : "group-hover:translate-y-0.5"
              )}
            />
          </button>
        </div>
      )}
    </div>
  );
}
