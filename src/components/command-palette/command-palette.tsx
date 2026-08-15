"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type React from "react";

import { cn } from "@/lib/utils";
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconFolderCode,
  IconBook,
  IconMail,
  IconSearch,
  IconCheck,
  IconCopy,
  IconFileText,
  IconExternalLink,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export const PALETTE_OPEN_EVENT = "palette:open";

export interface PaletteBlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export interface PaletteSocial {
  platform: string;
  url: string;
  label: string;
}

interface CommandPaletteProps {
  posts: PaletteBlogPost[];
  sections?: { id: string; label: string }[];
  socials?: PaletteSocial[];
}

type CommandItem = {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
};

const sectionIcons: Record<string, React.ReactNode> = {
  hero: <IconHome className="h-4 w-4" />,
  about: <IconUser className="h-4 w-4" />,
  experience: <IconBriefcase className="h-4 w-4" />,
  projects: <IconFolderCode className="h-4 w-4" />,
  blog: <IconBook className="h-4 w-4" />,
  contact: <IconMail className="h-4 w-4" />,
};

const socialIcons: Record<string, React.ReactNode> = {
  github: <IconBrandGithub className="h-4 w-4" />,
  linkedin: <IconBrandLinkedin className="h-4 w-4" />,
  twitter: <IconExternalLink className="h-4 w-4" />,
  x: <IconExternalLink className="h-4 w-4" />,
};

export function CommandPalette({
  posts,
  sections = [],
  socials = [],
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewport, setViewport] = useState<{ height: number; offsetTop: number } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const goToSection = useCallback((id: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const goToUrl = useCallback((url: string) => {
    setOpen(false);
    requestAnimationFrame(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("hello@da-portfolio.dev");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.location.href = "mailto:hello@da-portfolio.dev";
    }
  }, []);

  // ── Build items from props (no hardcoded data) ──────────────────────
  const navigationItems: CommandItem[] = sections.map((s) => ({
    id: `nav-${s.id}`,
    label: s.label,
    icon: sectionIcons[s.id] ?? <IconSearch className="h-4 w-4" />,
    action: () => goToSection(s.id),
    keywords: [s.label],
  }));

  const socialItems: CommandItem[] = socials.map((s) => ({
    id: `social-${s.platform}`,
    label: s.label,
    sublabel: s.url,
    icon: socialIcons[s.platform] ?? <IconExternalLink className="h-4 w-4" />,
    action: () => goToUrl(s.url),
    keywords: [s.platform, s.label],
  }));

  const emailItems: CommandItem[] = [
    {
      id: "copy-email",
      label: copied ? "Copied!" : "Copy email",
      sublabel: "hello@da-portfolio.dev",
      icon: copied ? <IconCheck className="h-4 w-4 text-green-500" /> : <IconCopy className="h-4 w-4" />,
      action: copyEmail,
      keywords: ["email", "contact", "mail", "copy"],
    },
  ];

  const blogItems: CommandItem[] = posts.slice(0, 8).map((post) => ({
    id: `blog-${post.slug}`,
    label: post.title,
    sublabel: new Date(post.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    icon: <IconFileText className="h-4 w-4" />,
    action: () => {
      setOpen(false);
      window.open(`#${post.slug}`, "_blank");
    },
    keywords: [post.description, ...post.title.split(" ")],
  }));

  const groupedItems = [
    ...(navigationItems.length > 0 ? [{ heading: "Navigation", items: navigationItems }] : []),
    ...(socialItems.length > 0 ? [{ heading: "Social", items: socialItems }] : []),
    ...(emailItems.length > 0 ? [{ heading: "Contact", items: emailItems }] : []),
    ...(blogItems.length > 0 ? [{ heading: "Recent Writing", items: blogItems }] : []),
  ];

  const flatItems = groupedItems.flatMap((g) => g.items);

  // ── Keyboard shortcuts ──────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        flatItems[activeIndex]?.action();
      }
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_OPEN_EVENT, onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_OPEN_EVENT, onOpen);
    };
  }, [open, activeIndex, flatItems]);

  useEffect(() => {
    if (!open) {
      setCopied(false);
      setSearch("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setViewport({ height: vv.height, offsetTop: vv.offsetTop });
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [open]);

  const filtered =
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

  useEffect(() => {
    setActiveIndex(0);
  }, [search]);

  // Keep active item in view inside scrollable list
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, filtered]);

  if (!open) return null;

  return (
    <>
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-[6000] bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        style={
          viewport
            ? { top: viewport.offsetTop + 16, maxHeight: viewport.height - 32 }
            : undefined
        }
        className="fixed left-1/2 top-4 sm:top-[10%] z-[6001] flex w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col max-h-[calc(100svh-2rem)] animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex flex-col overflow-hidden rounded-xl border border-border/60 bg-background/95 shadow-2xl backdrop-blur-xl">
          {/* Search */}
          <div className="flex shrink-0 items-center gap-2 border-b border-border/60 px-4">
            <IconSearch className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveIndex(0);
              }}
              placeholder="Type a command or search…"
              className="flex-1 bg-transparent py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <kbd className="hidden sm:inline-flex items-center rounded border border-border/60 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              esc
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">No results found.</p>
            )}
            {groupedItems.map((group) => {
              const groupFiltered = group.items.filter((item) => filtered.includes(item));
              if (groupFiltered.length === 0) return null;
              return (
                <div key={group.heading} className="mb-1">
                  <p className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                    {group.heading}
                  </p>
                  {groupFiltered.map((item) => {
                    const globalIndex = flatItems.indexOf(item);
                    return (
                      <button
                        key={item.id}
                        data-index={globalIndex}
                        onClick={() => item.action()}
                        onMouseEnter={() => setActiveIndex(globalIndex)}
                        className={cn(
                          "flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-foreground/80 transition-colors",
                          activeIndex === globalIndex && "bg-accent/60 text-foreground",
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
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}