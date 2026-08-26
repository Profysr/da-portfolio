"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/Heading";
import { ReadingLayout } from "@/components/layout/ReadingLayout";
import { personal } from "@/data/personal";
import { IconCalendar, IconClock } from "@tabler/icons-react";

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
    <div>
      {/* Tags */}
      {meta?.tags && meta.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {meta.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-[11px] font-mono px-2.5 py-0.5 border-border/80 bg-surface-muted/50"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Title */}
      <Heading
        variant="gradient"
        as="h1"
        className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
      >
        {meta?.title}
      </Heading>

      {/* Description */}
      {meta?.description && (
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 font-normal max-w-3xl">
          {meta.description}
        </p>
      )}

      {/* Author & Publication Meta */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60 text-xs sm:text-sm text-muted-foreground">
        {/* Author Chip */}
        <div className="flex items-center gap-3">
          <div className="relative size-9 rounded-full overflow-hidden border border-border/80 bg-surface-muted shrink-0">
            <Image
              src={personal.avatar}
              alt={personal.name}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground text-xs sm:text-sm">
              {personal.name}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {personal.tagline}
            </span>
          </div>
        </div>

        {/* Date & Read Time */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          {formattedDate && (
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar className="size-3.5 text-primary/80" />
              {formattedDate}
            </span>
          )}

          {meta?.readTime && (
            <span className="inline-flex items-center gap-1.5">
              <IconClock className="size-3.5 text-primary/80" />
              {meta.readTime} read
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
