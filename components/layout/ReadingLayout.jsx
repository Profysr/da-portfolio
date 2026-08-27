"use client";

import { DocsTopBar } from "@/components/docs/DocsTopBar";
import { TableOfContents } from "@/components/docs/TableOfContents";
import { SimilarContent } from "@/components/docs/SimilarContent";
import { Footer } from "@/components/layout/Footer";

export function ReadingLayout({
  type = "writing",
  title = "",
  header,
  sidebar,
  toc = [],
  similarItems = [],
  currentSlug = "",
  children,
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Sticky Top Navigation with Reading Progress & Breadcrumb */}
      <DocsTopBar type={type} title={title} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Custom Hero Header Slot */}
        {header && <div className="mb-10 sm:mb-12">{header}</div>}

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 xl:col-span-8 min-w-0 max-w-full">
            {/* Mobile TOC */}
            <TableOfContents toc={toc} className="lg:hidden" />

            {/* Article / MDX Body */}
            <article className="article-body">{children}</article>

            {/* Similar / Recommended Content */}
            {similarItems && similarItems.length > 0 && (
              <SimilarContent
                items={similarItems}
                type={type}
                currentSlug={currentSlug}
              />
            )}
          </div>

          {/* Desktop Right Rail: Custom Sidebar Widgets + Table of Contents */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-4 pl-4 border-l border-border space-y-6">
            {sidebar}
            <TableOfContents toc={toc} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ReadingLayout;
