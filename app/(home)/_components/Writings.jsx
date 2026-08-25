"use client";

import { motion } from "motion/react";
import {
  IconArrowUpRight,
  IconClock,
  IconTag,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlowFrame } from "@/components/ui/GlowFrame";
import { ExpandableList } from "@/components/ui/expandable-list";
import { MasonryGrid } from "@/components/MasonryGrid";
import { writings } from "@/data/idx";
import { cn } from "@/lib/utils";

const ARTICLE_SHADES = [
  {
    bgClass: "bg-linear-to-br from-shade-blue-bg/80 via-card/85 to-shade-blue-bg/40",
    borderClass: "border-shade-blue-border/70 hover:border-shade-blue-accent",
    accentColor: "var(--shade-blue-accent)",
    glowColor: "color-mix(in srgb, var(--shade-blue-accent) 22%, transparent)",
    tagClass: "border-shade-blue-border bg-shade-blue-bg text-shade-blue-text",
    numberClass: "text-shade-blue-accent",
  },
  {
    bgClass: "bg-linear-to-br from-shade-green-bg/80 via-card/85 to-shade-green-bg/40",
    borderClass: "border-shade-green-border/70 hover:border-shade-green-accent",
    accentColor: "var(--shade-green-accent)",
    glowColor: "color-mix(in srgb, var(--shade-green-accent) 22%, transparent)",
    tagClass: "border-shade-green-border bg-shade-green-bg text-shade-green-text",
    numberClass: "text-shade-green-accent",
  },
  {
    bgClass: "bg-linear-to-br from-shade-purple-bg/80 via-card/85 to-shade-purple-bg/40",
    borderClass: "border-shade-purple-border/70 hover:border-shade-purple-accent",
    accentColor: "var(--shade-purple-accent)",
    glowColor: "color-mix(in srgb, var(--shade-purple-accent) 22%, transparent)",
    tagClass: "border-shade-purple-border bg-shade-purple-bg text-shade-purple-text",
    numberClass: "text-shade-purple-accent",
  },
  {
    bgClass: "bg-linear-to-br from-shade-gold-bg/80 via-card/85 to-shade-gold-bg/40",
    borderClass: "border-shade-gold-border/70 hover:border-shade-gold-accent",
    accentColor: "var(--shade-gold-accent)",
    glowColor: "color-mix(in srgb, var(--shade-gold-accent) 22%, transparent)",
    tagClass: "border-shade-gold-border bg-shade-gold-bg text-shade-gold-text",
    numberClass: "text-shade-gold-accent",
  },
  {
    bgClass: "bg-linear-to-br from-shade-cyan-bg/80 via-card/85 to-shade-cyan-bg/40",
    borderClass: "border-shade-cyan-border/70 hover:border-shade-cyan-accent",
    accentColor: "var(--shade-cyan-accent)",
    glowColor: "color-mix(in srgb, var(--shade-cyan-accent) 22%, transparent)",
    tagClass: "border-shade-cyan-border bg-shade-cyan-bg text-shade-cyan-text",
    numberClass: "text-shade-cyan-accent",
  },
  {
    bgClass: "bg-linear-to-br from-shade-rose-bg/80 via-card/85 to-shade-rose-bg/40",
    borderClass: "border-shade-rose-border/70 hover:border-shade-rose-accent",
    accentColor: "var(--shade-rose-accent)",
    glowColor: "color-mix(in srgb, var(--shade-rose-accent) 22%, transparent)",
    tagClass: "border-shade-rose-border bg-shade-rose-bg text-shade-rose-text",
    numberClass: "text-shade-rose-accent",
  },
];

/* Individual article card with colorful background shade, spotlight glow, and hover micro-interactions */
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
        interiorColor={shade.glowColor}
        proximity={60}
        spread={25}
        className="h-full rounded-md"
      >
        <article
          className={cn(
            "group relative flex flex-col justify-between h-full p-5 sm:p-6",
            "rounded-md border transition-all duration-300 backdrop-blur-xs shadow-xs hover:shadow-xl",
            shade.bgClass,
            shade.borderClass,
          )}
        >
          <div className="space-y-3">
            {/* Date + read time row */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-mono font-medium">{article.date}</span>
                <span className="opacity-40">•</span>
                <span className="flex items-center gap-1">
                  <IconClock className="size-3 opacity-80" aria-hidden />
                  <span>{article.readTime}</span>
                </span>
              </div>

              {/* Number indicator */}
              <span className={cn("font-mono text-[11px] font-bold tracking-wider", shade.numberClass)}>
                #{String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Title + excerpt */}
            <div className="space-y-2">
              <h4 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-foreground/90 transition-colors">
                <a href={`/writing/${article.slug}`} className="focus:outline-none focus:underline">
                  {article.title}
                </a>
              </h4>
              <p className="text-xs sm:text-sm text-foreground/80 dark:text-foreground/75 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>
          </div>

          {/* Footer: Tags + Read Action */}
          <div className="flex items-center justify-between gap-2 pt-4 mt-3 border-t border-current/10">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 min-w-0">
              {article.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10.5px] font-semibold",
                    shade.tagClass,
                  )}
                >
                  <IconTag className="size-2.5 opacity-70" aria-hidden />
                  {tag}
                </span>
              ))}
            </div>

            {/* Read link */}
            <motion.a
              href={`/writing/${article.slug}`}
              className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary px-2.5 py-1 rounded-md bg-background/80 hover:bg-background border border-border/60 transition-colors group/btn shadow-2xs"
              whileHover={{ x: 2 }}
              aria-label={`Read article: ${article.title}`}
            >
              <span>Read</span>
              <IconArrowUpRight className="size-3.5 text-muted-foreground group-hover/btn:text-primary group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </motion.a>
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
  const HAS_MORE_THAN_4 = writings.length > 4;

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

        {/* Article Cards in MasonryGrid with ExpandableList if > 4 */}
        <div className="w-full">
          {HAS_MORE_THAN_4 ? (
            <ExpandableList
              items={writings}
              initialCount={4}
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
          ) : (
            <MasonryGrid
              items={writings}
              renderItem={(article, idx) => renderArticleItem(article, idx)}
            />
          )}
        </div>
      </div>
    </Section>
  );
}
