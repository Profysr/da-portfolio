"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface ExpandableListProps<T> {
  items?: T[];
  renderItem?: (item: T, index: number) => React.ReactNode;
  children?: React.ReactNode;
  collapsedHeight?: number;
  initialCount?: number;
  showMoreLabel?: string | ((hiddenCount: number) => React.ReactNode);
  showLessLabel?: string | (() => React.ReactNode);
  className?: string;
  listClassName?: string;
  buttonClassName?: string;
}

export function ExpandableList<T>({
  items,
  renderItem,
  children,
  collapsedHeight = 420,
  initialCount = 4,
  showMoreLabel = "Show more",
  showLessLabel = "Show less",
  className,
  listClassName,
  buttonClassName,
}: ExpandableListProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hiddenCount = items ? Math.max(0, items.length - initialCount) : 0;

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

  return (
    <div className={cn("relative w-full flex flex-col", className)}>
      {/* Animated Height Container */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : collapsedHeight,
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full overflow-hidden"
      >
        <div className={cn("w-full", listClassName)}>
          {children
            ? children
            : items?.map((item, index) => (
                <React.Fragment key={index}>
                  {renderItem?.(item, index)}
                </React.Fragment>
              ))}
        </div>

        {/* Dynamic Gradient Overlay */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background via-background/85 to-transparent z-10"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Center Trigger Button */}
      <div
        className={cn(
          "z-20 flex w-full items-center justify-center transition-all duration-300",
          isExpanded ? "pt-6 relative" : "absolute bottom-4 inset-x-0",
        )}
      >
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className={cn(
            "group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-surface/90 hover:bg-surface-hover hover:border-primary/50 text-xs sm:text-sm font-medium text-foreground transition-all duration-300 shadow-md backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
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
    </div>
  );
}
