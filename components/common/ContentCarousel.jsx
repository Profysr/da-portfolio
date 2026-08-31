"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IconArrowUpRight,
  IconArrowRight,
  IconArrowLeft,
  IconCalendar,
  IconClock,
  IconTag,
  IconBook,
} from "@tabler/icons-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { GlowFrame } from "@/components/ui/GlowFrame";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

const CARD_SHADES = [
  {
    tagShade: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    accentColor: "bg-blue-500",
    hoverBorder: "group-hover:border-blue-500/40",
    glowColor: "color-mix(in srgb, #3b82f6 15%, transparent)",
  },
  {
    tagShade: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    accentColor: "bg-emerald-500",
    hoverBorder: "group-hover:border-emerald-500/40",
    glowColor: "color-mix(in srgb, #10b981 15%, transparent)",
  },
  {
    tagShade: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    accentColor: "bg-purple-500",
    hoverBorder: "group-hover:border-purple-500/40",
    glowColor: "color-mix(in srgb, #a855f7 15%, transparent)",
  },
  {
    tagShade: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    accentColor: "bg-amber-500",
    hoverBorder: "group-hover:border-amber-500/40",
    glowColor: "color-mix(in srgb, #f59e0b 15%, transparent)",
  },
  {
    tagShade: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    accentColor: "bg-cyan-500",
    hoverBorder: "group-hover:border-cyan-500/40",
    glowColor: "color-mix(in srgb, #06b6d4 15%, transparent)",
  },
  {
    tagShade: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    accentColor: "bg-rose-500",
    hoverBorder: "group-hover:border-rose-500/40",
    glowColor: "color-mix(in srgb, #f43f5e 15%, transparent)",
  },
];

export function CarouselCard({ item, index, type = "writing" }) {
  const isProject = type === "project" || type === "projects";
  const href = isProject ? `/projects/${item.slug}` : `/writing/${item.slug}`;
  const shade = CARD_SHADES[index % CARD_SHADES.length];

  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const imageSrc = item.image || item.thumbnail;
  const categoryText =
    (isProject && (item.category || item.industry)) ||
    (!isProject && (item.category || item.tags?.[0])) ||
    "Article";

  return (
    <div className="h-full w-full select-none py-1">
      <GlowFrame
        interior
        border
        size={240}
        proximity={60}
        spread={25}
        interiorColor={shade.glowColor}
        className="h-full rounded-md"
      >
        <Link
          href={href}
          aria-label={`Open ${isProject ? "project" : "article"}: ${item.title}`}
          className={cn(
            "group relative flex h-full flex-col rounded-md border border-border/80 bg-card p-3 shadow-xs transition-all duration-300",
            "hover:shadow-e2 hover:border-primary/50 no-underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
        >
          {/* Media Header with Image */}
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-md border border-border/50 bg-surface-muted">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={item.title || ""}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 360px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center bg-surface-muted">
                <IconBook
                  className="size-10 text-muted-foreground"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </div>
            )}

            {/* Subtle Gradient Overlay */}
            {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" /> */}

            {/* Tag Badge on top-left of image */}
            <div className="absolute left-2.5 top-2.5">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10.5px] font-semibold tracking-wide backdrop-blur-md shadow-2xs",
                  shade.tagShade
                )}
              >
                <IconTag className="size-2.5 opacity-80" aria-hidden />
                {categoryText}
              </span>
            </div>

            {/* Read Time on top-right of image */}
            {item.readTime && (
              <div className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-md border border-border/80 bg-card/90 px-2 py-0.5 text-[10.5px] font-medium text-foreground backdrop-blur-md shadow-2xs">
                <IconClock className="size-2.5 text-primary" aria-hidden />
                <span>{item.readTime}</span>
              </div>
            )}
          </div>

          {/* Card Body */}
          <div className="flex flex-1 flex-col justify-between p-3 pt-4">
            <div>
              {/* Meta Row: Category indicator + Date */}
              <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      shade.accentColor
                    )}
                    aria-hidden
                  />
                  <span className="truncate font-mono text-foreground/80">
                    {categoryText}
                  </span>
                </div>
                {formattedDate && (
                  <span className="inline-flex shrink-0 items-center gap-1 font-mono text-muted-foreground/70 text-[10.5px]">
                    <IconCalendar className="size-3" aria-hidden />
                    {formattedDate}
                  </span>
                )}
              </div>

              {/* Title */}
              <h4 className="mb-2 line-clamp-2 text-base font-bold leading-snug tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                {item.title}
              </h4>

              {/* Description / Excerpt */}
              {(item.description || item.excerpt) && (
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {item.description || item.excerpt}
                </p>
              )}
            </div>

            {/* Footer with Read Link */}
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-border/60 pt-3">
              {/* Secondary tag if available */}
              <div className="flex items-center gap-1">
                {item.tags?.[1] && (
                  <span className="inline-flex items-center rounded border border-border/60 bg-surface px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground">
                    {item.tags[1]}
                  </span>
                )}
                {isProject && item.access && (
                  <span className="inline-flex items-center rounded border border-border/60 bg-surface px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground">
                    {item.access}
                  </span>
                )}
              </div>

              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                <span>{isProject ? "View Project" : "Read"}</span>
                <IconArrowUpRight className="size-3.5" aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      </GlowFrame>
    </div>
  );
}

export function ContentCarousel({
  title,
  subtitle,
  badge,
  items = [],
  type = "writing",
  viewAllHref,
  viewAllText = "View all",
  className = "",
}) {
  const [api, setApi] = useState(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((carouselApi) => {
    if (!carouselApi) return;
    setCanScrollPrev(carouselApi.canScrollPrev());
    setCanScrollNext(carouselApi.canScrollNext());
  }, []);

  const handleSetApi = useCallback(
    (carouselApi) => {
      setApi(carouselApi);
      onSelect(carouselApi);
    },
    [onSelect]
  );

  useEffect(() => {
    if (!api) return;
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  if (!items || items.length === 0) return null;

  return (
    <section className={cn("w-full", className)}>
      <ScrollReveal variant="reveal" duration={0.5} once={false}>
        {/* Header with Title + Subtitle on Left, Carousel Controls on Right */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            {badge && (
              <div className="mb-2">
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary-text">
                  {badge}
                </span>
              </div>
            )}
            {title && (
              <h3 className="m-0 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Right Navigation & View All */}
          <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="group/link mr-1 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <span>{viewAllText}</span>
                <IconArrowRight
                  className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            )}

            {/* Back & Forth Arrow Buttons using shadcn embla API */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous slide"
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer shadow-xs",
                  canScrollPrev
                    ? "border-border/80 bg-surface text-foreground hover:border-primary/50 hover:bg-surface-hover active:scale-95"
                    : "border-border/40 bg-surface/40 text-muted-foreground/40 cursor-not-allowed opacity-50"
                )}
              >
                <IconArrowLeft className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next slide"
                className={cn(
                  "flex size-9 items-center justify-center rounded-xl border transition-all duration-200 cursor-pointer shadow-xs",
                  canScrollNext
                    ? "border-border/80 bg-surface text-foreground hover:border-primary/50 hover:bg-surface-hover active:scale-95"
                    : "border-border/40 bg-surface/40 text-muted-foreground/40 cursor-not-allowed opacity-50"
                )}
              >
                <IconArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* shadcn Carousel Component */}
      <Carousel
        setApi={handleSetApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {items.map((item, idx) => (
            <CarouselItem
              key={item.id || item.slug || idx}
              className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3"
            >
              <CarouselCard item={item} index={idx} type={type} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
