"use client";

import { useState, useMemo, useEffect, useRef, createContext, useContext } from "react";
import {
  IconList,
  IconArrowUp,
  IconCheck,
  IconShare,
  IconX,
  IconChevronRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useActiveHeading } from "@/hooks/useActiveHeading";
import { useIsMobile } from "@/hooks/useIsMobile";

// ============================================================
// CONTEXT
// Single source of truth for TOC active state so DesktopToc
// and MobileTocDrawer share one IntersectionObserver.
// ============================================================

const TocContext = createContext(null);

function useTocContext() {
  const ctx = useContext(TocContext);
  if (!ctx) throw new Error("Toc components must be used within TocProvider");
  return ctx;
}

// ============================================================
// UTILITIES
// ============================================================

function handleScrollTo(e, url, onComplete) {
  e.preventDefault();
  const targetId = url.replace(/^#/, "");
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    const topOffset = 90;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - topOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });

    if (onComplete) onComplete(targetId);
    window.history.pushState(null, "", url);
  }
}

function handleScrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ============================================================
// SHARED: QUICK ACTIONS
// Back-to-top and share/copy-link buttons.
// ============================================================

function TocQuickActions() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL to clipboard", err);
    }
  };

  return (
    <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
      <button
        type="button"
        onClick={handleScrollToTop}
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors group cursor-pointer"
      >
        <IconArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
        <span>Back to top</span>
      </button>

      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer"
        title="Copy URL"
      >
        {copied ? (
          <>
            <IconCheck className="size-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-medium">Copied!</span>
          </>
        ) : (
          <>
            <IconShare className="size-3.5" />
            <span>Share</span>
          </>
        )}
      </button>
    </div>
  );
}

// ============================================================
// DESKTOP TOC (Static Sidebar)
// Always-visible, non-collapsible sidebar widget for >= lg.
// ============================================================

export function DesktopToc() {
  const { items, activeId, onSelect } = useTocContext();

  return (
    <aside className="w-full space-y-5">
      <div className="rounded-md border border-border bg-surface/80 backdrop-blur-sm p-4 shadow-e1">
        {/* Title Bar */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
          <h4 className="font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <IconList className="size-3.5 text-primary" />
            <span>On This Page</span>
          </h4>
          <span className="text-[10px] font-mono text-muted-foreground bg-surface-muted px-1.5 py-0.5 rounded">
            {items.length} sections
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 text-xs max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
          {items.map((item) => {
            const id = item.url.replace(/^#/, "");
            const isActive = activeId === id;

            return (
              <a
                key={item.url}
                href={item.url}
                onClick={(e) => handleScrollTo(e, item.url, onSelect)}
                className={cn(
                  "group relative block py-1.5 pr-2 transition-all duration-150 leading-relaxed rounded-md",
                  item.depth === 3 ? "pl-5 text-[11.5px]" : "pl-3 text-xs font-medium",
                  isActive
                    ? "text-primary font-semibold bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/60",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full transition-all duration-200",
                    isActive ? "bg-primary" : "bg-transparent group-hover:bg-border",
                  )}
                />
                <span className="line-clamp-2">{item.title}</span>
              </a>
            );
          })}
        </nav>

        <TocQuickActions />
      </div>
    </aside>
  );
}

// ============================================================
// MOBILE TOC DRAWER (Right-side Slide-in Panel)
// Floating trigger + animated drawer for < lg screens.
// ============================================================

export function MobileTocDrawer() {
  const { items, activeId, onSelect } = useTocContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 lg:hidden inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        aria-label="Open table of contents"
      >
        <IconList className="size-4" />
        <span className="text-sm font-semibold">On This Page</span>
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-background border-l border-border shadow-2xl transform transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              On This Page
            </h3>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-surface-hover transition-colors"
              aria-label="Close table of contents"
            >
              <IconX className="size-5 text-muted-foreground" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            {items.map((item) => {
              const id = item.url.replace(/^#/, "");
              const isActive = activeId === id;

              return (
                <a
                  key={item.url}
                  href={item.url}
                  onClick={(e) => {
                    handleScrollTo(e, item.url, (clickedId) => {
                      onSelect(clickedId);
                      setIsOpen(false);
                    });
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                    item.depth === 3 && "pl-8 text-xs",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/80",
                  )}
                >
                  {isActive && <IconChevronRight className="size-3.5 text-primary shrink-0" />}
                  <span className="line-clamp-2">{item.title}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

// ============================================================
// PROVIDER
// Wraps TOC items and scroll-spy state. DesktopToc and
// MobileTocDrawer consume this single shared context.
// ============================================================

export function TocProvider({ toc, children }) {
  const [selectedActiveId, setSelectedActiveId] = useState("");
  const items = useMemo(
    () => (toc || []).filter((item) => item && (item.depth === 2 || item.depth === 3)),
    [toc],
  );
  const observedActiveId = useActiveHeading(items);
  const effectiveActiveId =
    selectedActiveId || observedActiveId || items[0]?.url.replace(/^#/, "");

  return (
    <TocContext.Provider value={{ items, activeId: effectiveActiveId, onSelect: setSelectedActiveId }}>
      {children}
    </TocContext.Provider>
  );
}