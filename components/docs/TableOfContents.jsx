"use client";

import { useEffect, useState, useRef } from "react";
import {
  IconList,
  IconArrowUp,
  IconCheck,
  IconShare,
  IconChevronDown,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function TableOfContents({ toc = [], className = "" }) {
  const [activeId, setActiveId] = useState("");
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef(null);

  // Filter out depth > 3 or invalid items
  const items = (toc || []).filter((item) => item && (item.depth === 2 || item.depth === 3));

  useEffect(() => {
    if (!items.length) return;

    const headingElements = items
      .map((item) => {
        const id = item.url.replace(/^#/, "");
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!headingElements.length) return;

    // Set first item as default active if at top
    if (headingElements[0]) {
      setActiveId(headingElements[0].id);
    }

    const callback = (entries) => {
      // Find the first visible heading from top
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Pick the top visible heading
        setActiveId(visibleEntries[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: [0, 1],
    });

    headingElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  const handleScrollTo = (e, url) => {
    e.preventDefault();
    const targetId = url.replace(/^#/, "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const topOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(targetId);
      setMobileOpen(false);
      window.history.pushState(null, "", url);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Mobile Collapsible TOC Trigger */}
      <div className="lg:hidden w-full mb-6">
        <div className="rounded-xl border border-border/80 bg-surface/70 backdrop-blur-md overflow-hidden transition-all">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-foreground hover:bg-surface-hover/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <IconList className="size-4 text-primary" />
              <span>Table of Contents</span>
              <span className="text-[10px] font-mono text-muted-foreground bg-surface-muted px-1.5 py-0.5 rounded">
                {items.length}
              </span>
            </span>
            <IconChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform duration-200",
                mobileOpen && "rotate-180"
              )}
            />
          </button>

          {mobileOpen && (
            <div className="px-4 pb-4 pt-1 border-t border-border/50">
              <nav className="space-y-1 max-h-64 overflow-y-auto pr-2">
                {items.map((item) => {
                  const id = item.url.replace(/^#/, "");
                  const isActive = activeId === id;

                  return (
                    <a
                      key={item.url}
                      href={item.url}
                      onClick={(e) => handleScrollTo(e, item.url)}
                      className={cn(
                        "block text-xs py-1.5 transition-colors line-clamp-1",
                        item.depth === 3 && "pl-4 text-[11px]",
                        isActive
                          ? "text-primary font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sticky Table of Contents Sidebar */}
      <aside className={cn("hidden lg:block w-full sticky top-24 space-y-5", className)}>
        <div className="rounded-xl border border-border/80 bg-surface/40 backdrop-blur-sm p-4 shadow-e1">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <IconList className="size-3.5 text-primary" />
              <span>On This Page</span>
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground bg-surface-muted px-1.5 py-0.5 rounded">
              {items.length} sections
            </span>
          </div>

          <nav className="space-y-1 text-xs max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {items.map((item) => {
              const id = item.url.replace(/^#/, "");
              const isActive = activeId === id;

              return (
                <a
                  key={item.url}
                  href={item.url}
                  onClick={(e) => handleScrollTo(e, item.url)}
                  className={cn(
                    "group relative block py-1.5 pr-2 transition-all duration-150 leading-relaxed rounded-md",
                    item.depth === 3 ? "pl-5 text-[11.5px]" : "pl-3 text-xs font-medium",
                    isActive
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/60"
                  )}
                >
                  {/* Left active line indicator */}
                  <span
                    className={cn(
                      "absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full transition-all duration-200",
                      isActive
                        ? "bg-primary"
                        : "bg-transparent group-hover:bg-border"
                    )}
                  />
                  <span className="line-clamp-2">{item.title}</span>
                </a>
              );
            })}
          </nav>

          {/* Quick Actions Footer */}
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
        </div>
      </aside>
    </>
  );
}
