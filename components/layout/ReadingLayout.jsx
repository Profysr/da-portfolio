"use client";

import { DocsTopBar } from "@/components/docs/DocsTopBar";
import { SimilarContent } from "@/components/docs/SimilarContent";
import { Footer } from "@/components/layout/Footer";
import { TocProvider, DesktopToc, MobileTocDrawer } from "@/components/docs/TableOfContents";

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

      <TocProvider toc={toc}>
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Custom Hero Header Slot */}
          {header && <div className="mb-10 sm:mb-12">{header}</div>}

          {/* 2-Column Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 xl:col-span-8 min-w-0 max-w-full">
              <article className="article-body">{children}</article>
            </div>

            {/* Desktop Right Rail: Custom Sidebar Widgets + Static TOC */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-4 pl-4 border-l border-border space-y-6 h-[calc(100vh-200px)] sticky top-24 overflow-y-auto">
              {sidebar}
              <DesktopToc />
            </aside>
          </div>
          {/* Similar / Recommended Content */}
          {similarItems && similarItems.length > 0 && (
            <SimilarContent
              items={similarItems}
              type={type}
              currentSlug={currentSlug}
            />
          )}
        </main>

        {/* Mobile Floating Drawer */}
        <MobileTocDrawer />
      </TocProvider>

      <Footer />
    </div>
  );
}

export default ReadingLayout;
