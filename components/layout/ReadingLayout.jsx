"use client";

import { useState, useRef } from "react";
import * as Base from "fumadocs-core/toc";
import { IconList, IconX, IconCalendar, IconClock, IconTag } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/Heading";
import { DocsTopBar } from "@/components/docs/DocsTopBar";
import { SimilarContent } from "@/components/docs/SimilarContent";
import { Footer } from "@/components/layout/Footer";

function TocNav({ items, className }) {
  return (
    <nav className={cn("space-y-1 text-xs", className)}>
      {items.map((item) => (
        <Base.TOCItem
          key={item.url}
          href={item.url}
          className={cn(
            "group relative block py-1.5 pr-2 transition-all duration-150 leading-relaxed rounded-md",
            item.depth === 3 ? "pl-5 text-[11.5px]" : "pl-3 text-xs font-medium",
            "text-muted-foreground hover:text-foreground hover:bg-surface-hover/60 data-active:text-foreground data-active:font-semibold",
          )}
        >
          <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full transition-all duration-200 bg-transparent group-hover:bg-border data-active:bg-primary" />
          <span className="line-clamp-2">{item.title}</span>
        </Base.TOCItem>
      ))}
    </nav>
  );
}

function MobileTocDrawer({ items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 lg:hidden inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        aria-label="Open table of contents"
      >
        <IconList className="size-4" />
        <span className="text-sm font-semibold">On This Page</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-background border-l border-border shadow-2xl transform transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
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
          <div className="flex-1 overflow-y-auto px-2 py-4">
            <TocNav items={items} />
          </div>
        </div>
      </div>
    </>
  );
}

function FrontmatterHeader({ meta }) {
  const formattedDate = meta?.date
    ? new Date(meta.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="space-y-4 mb-10 sm:mb-12">
      {meta?.tags && meta.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {meta.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1.5 text-primary">
              <IconTag className="size-3" />
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <Heading
        variant="gradient"
        className="text-3xl sm:text-4xl font-extrabold tracking-wide text-left"
      >
        {meta?.title}
      </Heading>

      {meta?.description && (
        <p className="text-muted-foreground text-base">
          {meta.description}
        </p>
      )}

      <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-muted-foreground pt-2">
        {formattedDate && (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1">
            <IconCalendar className="size-3.5 text-primary" />
            <span>{formattedDate}</span>
          </span>
        )}
        {meta?.readTime && (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1">
            <IconClock className="size-3.5 text-primary" />
            <span>{meta.readTime} read</span>
          </span>
        )}
      </div>
    </div>
  );
}

export function ReadingLayout({
  type = "writing",
  meta,
  sidebar,
  toc = [],
  similarItems = [],
  currentSlug = "",
  children,
}) {
  const scrollRef = useRef(null);
  const items = (toc || []).filter(
    (item) => item && (item.depth === 2 || item.depth === 3),
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <DocsTopBar type={type} title={meta?.title} />

      <Base.AnchorProvider toc={items}>
        <Base.ScrollProvider containerRef={scrollRef}>
          <main ref={scrollRef} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <FrontmatterHeader meta={meta} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
              <div className="lg:col-span-8 xl:col-span-8 min-w-0 max-w-full">
                <article className="prose prose-neutral dark:prose-invert article-content">{children}</article>
              </div>

              <aside className="hidden lg:block lg:col-span-4 xl:col-span-4 space-y-4 h-[calc(100vh-200px)] sticky top-24 overflow-y-auto">
                {sidebar}
                {items.length > 0 && (
                  <div className="rounded-md border border-border bg-surface/80 backdrop-blur-sm p-4 shadow-e1">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-border/60">
                      <h4 className="font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <IconList className="size-3.5 text-primary" />
                        <span>On This Page</span>
                      </h4>
                      <span className="text-[10px] font-mono text-muted-foreground bg-surface-muted px-1.5 py-0.5 rounded">
                        {items.length} sections
                      </span>
                    </div>
                    <TocNav items={items} className="max-h-[calc(100vh-280px)] overflow-y-auto pr-1" />
                  </div>
                )}
              </aside>
            </div>

            {similarItems && similarItems.length > 0 && (
              <SimilarContent
                items={similarItems}
                type={type}
                currentSlug={currentSlug}
              />
            )}
          </main>
        </Base.ScrollProvider>

        <MobileTocDrawer items={items} />
      </Base.AnchorProvider>

      <Footer />
    </div>
  );
}

export default ReadingLayout;
