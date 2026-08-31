"use client";

import { useRef } from "react";
import * as Base from "fumadocs-core/toc";
import { IconList, IconCalendar, IconClock, IconTag } from "@tabler/icons-react";
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



function FrontmatterHeader({ meta, actions }) {
  const formattedDate = meta?.date
    ? new Date(meta.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
      {meta?.tags && meta.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {meta.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 sm:gap-1.5 text-primary-text text-[10px] sm:text-xs">
              <IconTag className="size-2.5 sm:size-3" />
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <Heading
        variant="gradient"
        className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-left"
      >
        {meta?.title}
      </Heading>

      {meta?.description && (
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
          {meta.description}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-1 sm:pt-2">
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono text-muted-foreground">
          {formattedDate && (
            <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md border border-border bg-surface px-2 sm:px-2.5 py-0.5 sm:py-1">
              <IconCalendar className="size-3 sm:size-3.5 text-primary" />
              <span>{formattedDate}</span>
            </span>
          )}
          {meta?.readTime && (
            <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md border border-border bg-surface px-2 sm:px-2.5 py-0.5 sm:py-1">
              <IconClock className="size-3 sm:size-3.5 text-primary" />
              <span>{meta.readTime} read</span>
            </span>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 sm:gap-3">{actions}</div>}
      </div>
    </div>
  );
}

export function ReadingLayout({
  type = "writing",
  meta,
  actions,
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
    <div className="min-h-screen flex flex-col bg-background-surface text-foreground selection:bg-primary selection:text-primary-foreground relative">
      <DocsTopBar type={type} title={meta?.title} />

      <Base.AnchorProvider toc={items}>
        <Base.ScrollProvider containerRef={scrollRef}>
          <main ref={scrollRef} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-12">
            <FrontmatterHeader meta={meta} actions={actions} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-start">
              <div className="lg:col-span-8 xl:col-span-8 min-w-0 max-w-full">
                <article className="prose prose-neutral dark:prose-invert article-content">{children}</article>
              </div>

              <aside className="hidden lg:block lg:col-span-4 xl:col-span-4 space-y-4 h-[calc(100vh-200px)] sticky top-24 overflow-y-auto">
                {sidebar}
                {items.length > 0 && (
                  <div className="rounded-md border border-border bg-surface/80 backdrop-blur-sm p-3 sm:p-4 shadow-e1">
                    <div className="flex items-center justify-between pb-2 sm:pb-3 mb-2 sm:mb-3 border-b border-border/60">
                      <h4 className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                        <IconList className="size-3 sm:size-3.5 text-primary" />
                        <span>On This Page</span>
                      </h4>
                      <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground bg-surface-muted px-1 sm:px-1.5 py-0.5 rounded">
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

      </Base.AnchorProvider>

      <Footer />
    </div>
  );
}

export default ReadingLayout;
