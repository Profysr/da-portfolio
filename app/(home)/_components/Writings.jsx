"use client";

import React from "react";
import { motion } from "motion/react";
import {
  IconArrowUpRight,
  IconClock,
  IconTag,
  IconBook,
} from "@tabler/icons-react";
import OptimizedImage from "@/components/common/OptimizedImage";
import { ExtendedLink } from "@/components/common/ExtendedLink";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ExpandableList } from "@/components/ui/expandable-list";
import { MasonryGrid } from "@/components/MasonryGrid";
import { writings } from "@/data/idx";
import { cn } from "@/lib/utils";
import { GlowFrame } from "@/components/ui/GlowFrame";

const ARTICLE_SHADES = [
  {
    tagShade: "shade-card-blue",
    accentColor: "bg-blue-500",
    hoverBorder: "hover:border-blue-500/50",
  },
  {
    tagShade: "shade-card-green",
    accentColor: "bg-emerald-500",
    hoverBorder: "hover:border-emerald-500/50",
  },
  {
    tagShade: "shade-card-purple",
    accentColor: "bg-purple-500",
    hoverBorder: "hover:border-purple-500/50",
  },
  {
    tagShade: "shade-card-gold",
    accentColor: "bg-amber-500",
    hoverBorder: "hover:border-amber-500/50",
  },
  {
    tagShade: "shade-card-cyan",
    accentColor: "bg-cyan-500",
    hoverBorder: "hover:border-cyan-500/50",
  },
  {
    tagShade: "shade-card-rose",
    accentColor: "bg-rose-500",
    hoverBorder: "hover:border-rose-500/50",
  },
];

/* Media Panel for writing articles with image preview and overlay badges */
function WritingMediaPanel({ article, shade }) {
  const hasImage = Boolean(article.image);

  return (
    <div className="relative aspect-video w-full min-h-40 overflow-hidden rounded-md border border-border/50 bg-muted/40 group/media">
      {hasImage ? (
        <OptimizedImage
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex size-full min-h-40 items-center justify-center bg-linear-to-br from-muted to-muted/60">
          <IconBook
            className="size-10 text-muted-foreground/30"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
      )}

      {/* Subtle overlay gradient for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

      {/* Top-left: Category / Primary Tag Chip */}
      <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold tracking-wide backdrop-blur-md shadow-xs",
            shade.tagShade,
          )}
        >
          <IconTag className="size-2.5 opacity-80" aria-hidden />
          {article.tags?.[0] || article.category || "Article"}
        </span>
      </div>

      {/* Top-right: Read Time Badge */}
      <div className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-md border border-border/80 bg-card/90 px-2 py-0.5 text-[10px] font-medium text-foreground backdrop-blur-md shadow-xs">
        <IconClock className="size-2.5 text-primary" aria-hidden />
        <span>{article.readTime}</span>
      </div>
    </div>
  );
}

/* Individual article card styled with ProjectCard DNA */
function ArticleCard({ article, index }) {
  const shade = ARTICLE_SHADES[index % ARTICLE_SHADES.length];

  return (
    <ScrollReveal
      variant="slide-up"
      delay={(index % 4) * 0.08}
      duration={0.5}
      once={false}
      className="h-full"
    >
      <GlowFrame
        interior
        border
        size={240}
        interiorColor={shade.accentColor}
        proximity={60}
        spread={25}
        className="h-full rounded-md"
      >
        <article
          className={cn(
            "group relative flex h-full flex-col rounded-lg border border-border bg-card p-1.5 shadow-xs transition-all duration-300",
            "hover:shadow-lg",
            shade.hoverBorder,
          )}
        >
          {/* Inset Media Panel with Image */}
          <WritingMediaPanel article={article} shade={shade} />

          {/* Content Body */}
          <div className="flex flex-1 flex-col justify-between gap-3 p-3 sm:p-3.5">
            <div className="space-y-2">
              {/* Meta Category + Date row */}
              <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-block size-1.5 rounded-full",
                      shade.accentColor,
                    )}
                  />
                  <span className="font-mono text-foreground/80">
                    {article.category || article.tags?.[0] || "Engineering"}
                  </span>
                </div>
                <span className="font-mono text-muted-foreground/70 text-[10.5px]">
                  {article.date}
                </span>
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-foreground transition-colors group-hover:text-primary leading-snug">
                <a
                  href={`/writing/${article.slug}`}
                  className="focus:outline-none focus:underline"
                >
                  {article.title}
                </a>
              </h4>

              {/* Excerpt */}
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            {/* Tags + Read Link Footer */}
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
              {/* Secondary Tags */}
              <div className="flex flex-wrap gap-1">
                {article.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded border border-border/60 bg-surface px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read Button */}
              <ExtendedLink
                href={`/writing/${article.slug}`}
                className="ml-auto inline-flex items-center gap-1.5 rounded bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 shadow-2xs group/btn"
                aria-label={`Read article: ${article.title}`}
              >
                <span>Read</span>
                <IconArrowUpRight className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </ExtendedLink>
            </div>
          </div>
        </article>
      </GlowFrame>
    </ScrollReveal>
  );
}

const renderArticleItem = (article, idx) => (
  <div key={article.id || `${article.slug}-${idx}`} className="w-full">
    <ArticleCard article={article} index={idx} />
  </div>
);

export default function Writings() {
  return (
    <Section id="writings" className="bg-surface">
      <div className="flex flex-col items-center gap-7 w-full">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2.5">
          <Badge variant="light">WRITINGS</Badge>
          <Heading
            variant="gradient"
            text="Essays & Articles"
            className="text-3xl! sm:text-5xl!"
          />
          <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
            Deep dives on data visualization, engineering patterns, and career
            signals — written for practitioners.
          </p>
        </div>

        {/* Article Cards in MasonryGrid with ExpandableList */}
        <div className="w-full">
          <ExpandableList
            items={writings}
            initialCount={3}
            showMoreLabel={(hiddenCount) => `Show more (${hiddenCount} more)`}
            showLessLabel="Show less"
            className="w-full"
            renderContent={(items) => (
              <MasonryGrid
                items={items}
                renderItem={(article, idx) => renderArticleItem(article, idx)}
              />
            )}
          />
        </div>
      </div>
    </Section>
  );
}
