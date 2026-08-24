"use client";

import { useEffect, useState, type FC, type KeyboardEvent } from "react";
import { motion, LayoutGroup } from "motion/react";

interface TabItem {
  id: string;
  label: string;
  /** Optional count chip rendered after the label (e.g. items in category) */
  count?: number;
}

interface ContinuousTabsProps {
  /** REQUIRED — every consumer must supply its own tabs (no default data) */
  tabs: TabItem[];
  defaultActiveId?: string;
  onChange?: (id: string) => void;
  /** Optional aria-label for the surrounding tablist landmark */
  ariaLabel?: string;
  className?: string;
}

// NOTE: Watermelon ships demo placeholder tabs by default. Per Rule #14
// (refactor gate for watermelon components), demo data must be commented
// out so production code never falls back to "Home / Interactions / ...".
// Consumers (e.g. TechStack) MUST pass a `tabs` prop.
//
// const DEMO_TABS: TabItem[] = [
//   { id: "home",         label: "Home" },
//   { id: "interactions", label: "Interactions" },
//   { id: "resources",    label: "Resources" },
//   { id: "docs",         label: "Docs" },
// ];

export const ContinuousTabs: FC<ContinuousTabsProps> = ({
  tabs,
  defaultActiveId,
  onChange,
  ariaLabel = "Tab navigation",
  className,
}) => {
  const [active, setActive] = useState<string>(
    defaultActiveId ?? tabs[0]?.id ?? "",
  );
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));
  }, []);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!tabs.length) return;
    let nextIndex = index;
    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    const next = tabs[nextIndex];
    if (next) handleChange(next.id);
  };

  if (!isMounted) return null;
  if (!tabs.length) return null;

  return (
    <LayoutGroup>
      <nav
        role="tablist"
        aria-label={ariaLabel}
        className={[
          "theme-injected",
          "relative inline-flex items-center gap-0.5 sm:gap-1",
          "rounded-lg border border-border bg-background p-1 sm:p-1.5",
          "shadow-e1",
          "transition-all duration-300",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {tabs.map((tab, index) => {
          const isActive = active === tab.id;
          const tabId = `tab-${tab.id}`;

          return (
            <button
              key={tab.id}
              id={tabId}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="relative rounded-lg px-4 py-2 sm:px-6 sm:py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                    mass: 0.9,
                  }}
                  className="absolute inset-0 rounded-lg bg-foreground shadow-xs"
                />
              )}

              <span
                className={[
                  "relative z-10 inline-flex items-center gap-1.5",
                  "text-sm sm:text-base font-semibold",
                  "transition-colors duration-200",
                  isActive
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {tab.label}
                {typeof tab.count === "number" && (
                  <span
                    className={[
                      "font-mono text-[10px] px-1.5 py-0.5 rounded",
                      "transition-colors",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-surface text-muted-foreground",
                    ].join(" ")}
                  >
                    {tab.count}
                 </span>
                )}
             </span>
           </button>
          );
        })}
     </nav>
   </LayoutGroup>
  );
};
