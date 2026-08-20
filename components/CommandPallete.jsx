"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  IconSearch,
  IconCheck,
  IconCopy,
  IconFileText,
} from "@tabler/icons-react";
import { nav, socials, personal, writings } from "@/data/idx.js";

/* ------------------------------------------------------------------ */
/*  Event name — shared between CommandPaletteButton & CommandPalette */
/* ------------------------------------------------------------------ */

export const PALETTE_OPEN_EVENT = "palette:open";

/* ------------------------------------------------------------------ */
/*  Sub-components for better readability                             */
/* ------------------------------------------------------------------ */

function PaletteSearch({ search, setSearch }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-border/60 px-4">
      <IconSearch className="h-4 w-4 text-muted-foreground shrink-0" />
      <input
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Type a command or search…"
        className="flex-1 bg-transparent py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
      <kbd className="hidden sm:inline-flex items-center rounded border border-border/60 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
        esc
      </kbd>
    </div>
  );
}

function PaletteItem({ item, globalIndex, isActive, onSelect, onHover }) {
  return (
    <button
      data-index={globalIndex}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-foreground/80 transition-colors",
        isActive && "bg-accent/60 text-foreground"
      )}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background/60 text-muted-foreground">
        {item.icon}
      </span>
      <span className="flex-1 truncate text-left">{item.label}</span>
      {item.sublabel && (
        <span className="hidden sm:inline truncate text-xs text-muted-foreground">
          {item.sublabel}
        </span>
      )}
    </button>
  );
}

function PaletteGroup({ heading, items, filteredItems, flatItems, activeIndex, setActiveIndex }) {
  const groupFiltered = items.filter((item) => filteredItems.includes(item));
  if (groupFiltered.length === 0) return null;

  return (
    <div className="mb-1">
      <p className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
        {heading}
      </p>
      {groupFiltered.map((item) => {
        const globalIndex = flatItems.indexOf(item);
        return (
          <PaletteItem
            key={item.id}
            item={item}
            globalIndex={globalIndex}
            isActive={activeIndex === globalIndex}
            onSelect={() => item.action()}
            onHover={() => setActiveIndex(globalIndex)}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main CommandPalette Component                                      */
/* ------------------------------------------------------------------ */

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  /* Scroll-lock while open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Keyboard shortcuts + custom open event */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_OPEN_EVENT, onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_OPEN_EVENT, onOpen);
    };
  }, [open, close]);

  /* Reset active index when search term updates */
  const handleSearchChange = (val) => {
    setSearch(val);
    setActiveIndex(0);
  };

  /* Scroll active item into view */
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  /* Build command items from data/idx.js */
  const navigationItems = nav.map((n) => {
    const Icon = n.icon;
    return {
      id: `nav-${n.id}`,
      label: n.label,
      icon: <Icon className="h-4 w-4" />,
      action: () => {
        close();
        document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      },
      keywords: [n.label],
    };
  });

  const socialItems = socials.map((s) => {
    const Icon = s.icon;
    return {
      id: `social-${s.platform}`,
      label: s.label,
      sublabel: s.url,
      icon: <Icon className="h-4 w-4" />,
      action: () => {
        close();
        window.open(s.url, "_blank", "noopener,noreferrer");
      },
      keywords: [s.platform, s.label],
    };
  });

  const emailItems = [
    {
      id: "copy-email",
      label: copied ? "Copied!" : "Copy email",
      sublabel: personal.email,
      icon: copied ? (
        <IconCheck className="h-4 w-4 text-green-500" />
      ) : (
        <IconCopy className="h-4 w-4" />
      ),
      action: async () => {
        try {
          await navigator.clipboard.writeText(personal.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          window.location.href = `mailto:${personal.email}`;
        }
      },
      keywords: ["email", "contact", "mail", "copy"],
    },
  ];

  const writingItems = writings.slice(0, 8).map((post) => ({
    id: `writing-${post.id}`,
    label: post.title,
    sublabel: new Date(post.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    icon: <IconFileText className="h-4 w-4" />,
    action: () => {
      close();
      window.location.href = `/writing/${post.slug}`;
    },
    keywords: [post.excerpt, ...post.title.split(" ")],
  }));

  /* Group & filter */
  const groupedItems = [
    ...(navigationItems.length ? [{ heading: "Navigation", items: navigationItems }] : []),
    ...(socialItems.length ? [{ heading: "Social", items: socialItems }] : []),
    ...(emailItems.length ? [{ heading: "Contact", items: emailItems }] : []),
    ...(writingItems.length ? [{ heading: "Recent Writing", items: writingItems }] : []),
  ];

  const flatItems = groupedItems.flatMap((g) => g.items);

  const filteredItems =
    search.trim() === ""
      ? flatItems
      : flatItems.filter((item) => {
          const q = search.toLowerCase();
          return (
            item.label.toLowerCase().includes(q) ||
            item.keywords?.some((k) => k.toLowerCase().includes(q)) ||
            item.sublabel?.toLowerCase().includes(q)
          );
        });

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={close}
        className="fixed inset-0 z-[6000] bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="fixed left-1/2 top-4 sm:top-[10%] z-[6001] flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col max-h-[calc(100svh-2rem)] animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-background/95 shadow-2xl backdrop-blur-xl">
          <PaletteSearch search={search} setSearch={handleSearchChange} />

          {/* Results List */}
          <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
            {filteredItems.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No results found.</p>
            )}

            {groupedItems.map((group) => (
              <PaletteGroup
                key={group.heading}
                heading={group.heading}
                items={group.items}
                filteredItems={filteredItems}
                flatItems={flatItems}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  CommandPaletteButton — trigger that lives in the TopBar           */
/* ------------------------------------------------------------------ */

export function CommandPaletteButton() {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPod|iPad/i.test(navigator.userAgent));
  }, []);

  const open = () => window.dispatchEvent(new Event(PALETTE_OPEN_EVENT));

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command palette"
      className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/40 hover:bg-background/70 hover:border-border px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      <IconSearch className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border/60 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
        <span className="text-[11px] leading-none">{isMac ? "⌘" : "Ctrl"}</span>
        K
      </kbd>
    </button>
  );
}