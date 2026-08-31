"use client";

import {
  useEffect,
  useState,
  useRef,
  useSyncExternalStore,
  type FC,
  type KeyboardEvent,
} from "react";
import { motion, LayoutGroup } from "motion/react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const emptySubscribe = () => () => {};

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
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const startSentinelRef = useRef<HTMLDivElement>(null);
  const endSentinelRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver guarantees overflow detection on load and resize
  useEffect(() => {
    if (!isMounted) return;

    const container = containerRef.current;
    const startSentinel = startSentinelRef.current;
    const endSentinel = endSentinelRef.current;

    if (!container || !startSentinel || !endSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === startSentinel) {
            setCanScrollLeft(!entry.isIntersecting);
          }
          if (entry.target === endSentinel) {
            setCanScrollRight(!entry.isIntersecting);
          }
        });
      },
      {
        root: container,
        threshold: 0.99,
      },
    );

    observer.observe(startSentinel);
    observer.observe(endSentinel);

    return () => observer.disconnect();
  }, [isMounted, tabs]);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  const handleScroll = (direction: "left" | "right") => {
    const el = containerRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
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
    if (next) {
      handleChange(next.id);
      const tabNode = document.getElementById(`tab-${next.id}`);
      tabNode?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  };

  if (!isMounted) return null;
  if (!tabs.length) return null;

  return (
    <LayoutGroup>
      <div className="relative max-w-full inline-flex items-center overflow-hidden rounded-lg">
        {/* Full-height Left Overlay - Complete Clickable Area */}
        {canScrollLeft && (
          <button
            type="button"
            aria-label="Scroll tabs left"
            onClick={() => handleScroll("left")}
            className="group absolute left-0 top-0 bottom-0 z-20 w-10 pr-1 sm:pr-1.5 bg-foreground/20 backdrop-blur-sm transition-opacity cursor-pointer text-right border-none outline-none flex justify-center items-center"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center group-hover:scale-105 group-active:scale-95">
              <IconChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
            </div>
          </button>
        )}

        {/* Tab Container */}
        <nav
          ref={containerRef}
          role="tablist"
          aria-label={ariaLabel}
          className={[
            "theme-injected",
            "relative flex w-full overflow-x-auto no-scrollbar scroll-smooth items-center gap-0.5 sm:gap-1",
            "whitespace-nowrap rounded-lg border border-border bg-background p-1 sm:p-1.5",
            "shadow-e1",
            "transition-all duration-300",
            className ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Boundary Observer target (left edge) */}
          <div
            ref={startSentinelRef}
            className="h-full w-[1px] shrink-0 pointer-events-none"
          />

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
                className="relative shrink-0 rounded-lg px-4 py-2 sm:px-6 sm:py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

          {/* Boundary Observer target (right edge) */}
          <div
            ref={endSentinelRef}
            className="h-full w-[1px] shrink-0 pointer-events-none"
          />
        </nav>

        {/* Full-height Right Overlay - Complete Clickable Area */}
        {canScrollRight && (
          <button
            type="button"
            aria-label="Scroll tabs right"
            onClick={() => handleScroll("right")}
            className="group absolute right-0 top-0 bottom-0 z-20 w-10 pr-1 sm:pr-1.5 bg-foreground/20 backdrop-blur-sm transition-opacity cursor-pointer text-right border-none outline-none flex justify-center items-center"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center group-hover:scale-105 group-active:scale-95">
              <IconChevronRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
            </div>
          </button>
        )}
      </div>
    </LayoutGroup>
  );
};
