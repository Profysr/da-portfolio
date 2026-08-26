"use client";

import Link from "next/link";
import Image from "next/image";
import { IconArrowRight, IconCalendar, IconClock, IconSparkles } from "@tabler/icons-react";
import { GlowFrame } from "@/components/ui/GlowFrame";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const GOLD_INTERIOR = "color-mix(in srgb, var(--primary) 14%, transparent)";

function MetaChip({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-surface px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground">
      {children}
    </span>
  );
}

function SimilarCard({ item, index, isProject }) {
  const href = isProject ? `/projects/${item.slug}` : `/writing/${item.slug}`;
  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <ScrollReveal
      variant="slide-up"
      delay={index * 0.08}
      duration={0.5}
      once={false}
      className="h-full"
    >
      <GlowFrame
        interior
        border
        size={240}
        proximity={60}
        spread={25}
        interiorColor={GOLD_INTERIOR}
        className="h-full rounded-md"
      >
        <Link
          href={href}
          aria-label={`Open ${isProject ? "project" : "article"}: ${item.title}`}
          className="group flex h-full flex-col rounded-lg border border-border bg-card p-1.5 shadow-xs transition-shadow duration-300 hover:shadow-e2 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {item.thumbnail && (
            <div className="relative mb-1 aspect-[16/9] w-full overflow-hidden rounded-[calc(var(--radius-lg)-4px)] bg-surface-muted">
              <Image
                src={item.thumbnail}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 320px"
                className="object-cover transition-transform duration-300 ease-smooth group-hover:scale-[1.04]"
              />
            </div>
          )}

          <div className="flex flex-1 flex-col p-3">
            {/* Meta row */}
            <div className="mb-2 flex items-center justify-between gap-2 text-[10.5px] font-medium text-muted-foreground">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="size-1.5 shrink-0 rounded-full bg-primary/70" aria-hidden />
                <span className="truncate font-mono text-foreground/80">
                  {(isProject && item.category) || (!isProject && item.tags?.[0]) || ""}
                </span>
              </span>
              {formattedDate && (
                <span className="inline-flex shrink-0 items-center gap-1 font-mono text-muted-foreground/70">
                  <IconCalendar className="size-3" aria-hidden />
                  {formattedDate}
                </span>
              )}
            </div>

            {/* Title */}
            <h4 className="mb-1.5 line-clamp-2 text-sm sm:text-base font-bold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
              {item.title}
            </h4>

            {/* Description */}
            {item.description && (
              <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            )}

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
              <span className="flex items-center gap-1.5 text-[10.5px] text-muted-foreground">
                {!isProject && item.readTime && (
                  <MetaChip>
                    <IconClock className="size-3" aria-hidden />
                    {item.readTime}
                  </MetaChip>
                )}
                {isProject && item.access && <MetaChip>{item.access}</MetaChip>}
              </span>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Read
                <IconArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </div>
          </div>
        </Link>
      </GlowFrame>
    </ScrollReveal>
  );
}

export function SimilarContent({
  items = [],
  type = "writing",
  currentSlug = "",
}) {
  if (!items || items.length === 0) return null;

  const isProject = type === "project" || type === "projects";
  const sectionTitle = isProject ? "Related Projects" : "Related Writing";
  const sectionSubtitle = isProject
    ? "Explore other systems, tools, and architectures."
    : "More articles, guides, and engineering notes.";

  return (
    <section className="mt-16 pt-10 border-t border-border/80">
      <ScrollReveal variant="reveal" duration={0.6} once={false}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <IconSparkles className="size-4 text-primary" aria-hidden />
              <h3 className="m-0 text-lg sm:text-xl font-bold tracking-tight text-foreground">
                {sectionTitle}
              </h3>
            </div>
            <p className="m-0 text-xs sm:text-sm text-muted-foreground">
              {sectionSubtitle}
            </p>
          </div>

          <Link
            href={isProject ? "/#projects" : "/#writings"}
            className="group/link inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <span>View all</span>
            <IconArrowRight
              className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <SimilarCard
            key={item.slug}
            item={item}
            index={index}
            isProject={isProject}
          />
        ))}
      </div>
    </section>
  );
}

export default SimilarContent;
