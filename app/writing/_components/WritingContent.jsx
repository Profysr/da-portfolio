"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/Heading";
import { ReadingLayout } from "@/components/layout/ReadingLayout";
import { personal } from "@/data/personal";
import { IconCalendar, IconClock, IconTag } from "@tabler/icons-react";

export function WritingContent({
  meta,
  toc = [],
  similarPosts = [],
  children,
}) {
  const formattedDate = meta?.date
    ? new Date(meta.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const header = (
    <div className="space-y-4">
      {/* Tags Row */}
      {meta?.tags && meta.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary tracking-wide"
            >
              <IconTag className="size-3 opacity-80" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <Heading
        variant="gradient"
        as="h1"
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.15] text-balance text-left"
      >
        {meta?.title}
      </Heading>

      {/* Description */}
      {meta?.description && (
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed font-normal text-pretty">
          {meta.description}
        </p>
      )}

      {/* Author & Publication Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-border/70">
        {/* Author Info */}
        <div className="flex items-center gap-3">
          <div className="relative size-10 rounded-full overflow-hidden border border-border/80 bg-surface-muted shrink-0 shadow-xs">
            <Image
              src={personal.avatar}
              alt={personal.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground text-sm">
                {personal.name}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {personal.tagline}
            </span>
          </div>
        </div>

        {/* Date & Read Time */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-muted-foreground">
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
    </div>
  );

  return (
    <ReadingLayout
      type="writing"
      title={meta?.title}
      header={header}
      toc={toc}
      similarItems={similarPosts}
      currentSlug={meta?.slug}
    >
      {children}
    </ReadingLayout>
  );
}

export default WritingContent;