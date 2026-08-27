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

// ============================================================================
// HELPER UTILITIES & CUSTOM HOOKS
// ============================================================================

/**
 * Custom hook to manage IntersectionObserver logic for active heading detection.
 * @param {Array} items - List of valid TOC items with depth and url.
 * @returns {string} activeId - The ID of the heading currently visible in the viewport.
 */
function useActiveHeading(items) {
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef(null);

  useEffect(() => {
    if (!items.length) return;

    // Map TOC items to actual DOM elements
    const headingElements = items
      .map((item) => {
        const id = item.url.replace(/^#/, "");
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!headingElements.length) return;

    // Callback when elements intersect with viewport threshold
    const callback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    };

    // Configure observer with custom margins (trigger near header/top region)
    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: [0, 1],
    });

    headingElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  return activeId;
}

/**
 * Handles smooth scrolling to target element offset by top navigation bar height.
 * @param {Event} e - Click event object.
 * @param {string} url - Target link hash (e.g., "#section-1").
 * @param {Function} [onComplete] - Optional callback after scroll completes.
 */
const handleScrollTo = (e, url, onComplete) => {
  e.preventDefault();
  const targetId = url.replace(/^#/, "");
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    const topOffset = 90; // Height offset for fixed site header
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - topOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    if (onComplete) onComplete(targetId);
    window.history.pushState(null, "", url);
  }
};

/**
 * Smoothly scrolls the window back to the top.
 */
const handleScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Individual Navigation Link Item in TOC.
 */
function TocNavLink({ item, activeId, onClick, isDesktop = false }) {
  const id = item.url.replace(/^#/, "");
  const isActive = activeId === id;

  if (isDesktop) {
    return (
      <a
        href={item.url}
        onClick={onClick}
        className={cn(
          "group relative block py-1.5 pr-2 transition-all duration-150 leading-relaxed rounded-md",
          item.depth === 3 ? "pl-5 text-[11.5px]" : "pl-3 text-xs font-medium",
          isActive
            ? "text-primary font-semibold bg-primary/5"
            : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/60",
        )}
      >
        {/* Left active visual indicator bar */}
        <span
          className={cn(
            "absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full transition-all duration-200",
            isActive ? "bg-primary" : "bg-transparent group-hover:bg-border",
          )}
        />
        <span className="line-clamp-2">{item.title}</span>
      </a>
    );
  }

  return (
    <a
      href={item.url}
      onClick={onClick}
      className={cn(
        "block text-xs py-1.5 transition-colors line-clamp-1",
        item.depth === 3 && "pl-4 text-[11px]",
        isActive
          ? "text-primary font-semibold"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {item.title}
    </a>
  );
}

/**
 * Footer controls providing "Back to Top" and "Share/Copy Link" functionality.
 */
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
      {/* Scroll to Top Button */}
      <button
        type="button"
        onClick={handleScrollToTop}
        className="inline-flex items-center gap-1 hover:text-foreground transition-colors group cursor-pointer"
      >
        <IconArrowUp className="size-3.5 transition-transform group-hover:-translate-y-0.5" />
        <span>Back to top</span>
      </button>

      {/* Copy URL Link Button */}
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

/**
 * Mobile Collapsible Accordion view (`<lg` screens).
 */
function MobileToc({ items, activeId, onSelect }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="lg:hidden w-full mb-6">
      <div className="rounded-md border border-border bg-surface/80 backdrop-blur-md overflow-hidden transition-all">
        {/* Accordion Toggle Header */}
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
              mobileOpen && "rotate-180",
            )}
          />
        </button>

        {/* Accordion Content */}
        {mobileOpen && (
          <div className="px-4 pb-4 pt-1 border-t border-border/50">
            <nav className="space-y-1 max-h-64 overflow-y-auto pr-2">
              {items.map((item) => (
                <TocNavLink
                  key={item.url}
                  item={item}
                  activeId={activeId}
                  onClick={(e) =>
                    handleScrollTo(e, item.url, (id) => {
                      onSelect(id);
                      setMobileOpen(false);
                    })
                  }
                />
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Desktop Sidebar View (`>=lg` screens).
 */
function DesktopToc({ items, activeId, className, onSelect }) {
  return (
    <aside className={cn("hidden lg:block w-full space-y-5", className)}>
      <div className="rounded-md border border-border bg-surface/80 backdrop-blur-sm p-4 shadow-e1">
        {/* Sidebar Title */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <IconList className="size-3.5 text-primary" />
            <span>On This Page</span>
          </h3>
          <span className="text-[10px] font-mono text-muted-foreground bg-surface-muted px-1.5 py-0.5 rounded">
            {items.length} sections
          </span>
        </div>

        {/* Links Navigation */}
        <nav className="space-y-1 text-xs max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
          {items.map((item) => (
            <TocNavLink
              key={item.url}
              item={item}
              activeId={activeId}
              isDesktop
              onClick={(e) => handleScrollTo(e, item.url, (id) => onSelect(id))}
            />
          ))}
        </nav>

        {/* Footer Actions */}
        <TocQuickActions />
      </div>
    </aside>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * TableOfContents Component
 * Filters heading depths (h2, h3), displays active scrolling indicator,
 * and renders adaptive Mobile and Desktop layouts.
 */
export function TableOfContents({ toc = [], className = "" }) {
  const [selectedActiveId, setSelectedActiveId] = useState("");

  // Filter TOC items: include only valid h2 (depth 2) and h3 (depth 3)
  const items = (toc || []).filter(
    (item) => item && (item.depth === 2 || item.depth === 3),
  );

  // Hook handles section active status via IntersectionObserver
  const observedActiveId = useActiveHeading(items);

  // Fallback priority: manually clicked ID > observer active ID > first heading ID
  const effectiveActiveId =
    selectedActiveId || observedActiveId || items[0]?.url.replace(/^#/, "");

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Mobile Collapsible TOC Trigger */}
      <MobileToc
        items={items}
        activeId={effectiveActiveId}
        onSelect={setSelectedActiveId}
      />

      {/* Desktop Static Sidebar TOC */}
      <DesktopToc
        items={items}
        activeId={effectiveActiveId}
        className={className}
        onSelect={setSelectedActiveId}
      />
    </>
  );
}
