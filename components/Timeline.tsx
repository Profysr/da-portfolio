"use client";

import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  useMotionValueEvent,
} from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  title: React.ReactNode;
  content: React.ReactNode;
}

function TimelineRow({
  item,
  first,
  lit,
  dotRef,
}: {
  item: TimelineEntry;
  first: boolean;
  lit: boolean;
  dotRef: (el: HTMLSpanElement | null) => void;
}) {
  return (
    <div
      className={cn(
        "flex justify-start md:gap-6",
        first ? "pt-0" : "pt-6 md:pt-8",
      )}
    >
      {/* Sticky era label + node dot */}
      <div className="sticky top-28 flex flex-col items-start self-start md:w-44 lg:w-56 shrink-0">
        <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-background md:left-3">
          <span
            ref={dotRef}
            className={cn(
              "block size-4 rounded-full border-2 transition-all duration-300",
              lit
                ? "scale-110 border-primary bg-primary shadow-[0_0_10px_var(--primary),0_0_18px_var(--primary)]"
                : "border-border bg-surface-muted",
            )}
          />
        </div>
        <h3 className="hidden pl-14 text-xl font-bold text-muted-foreground wrap-break-word md:block lg:text-4xl">
          {item.title}
        </h3>
      </div>

      <div className="relative w-full pl-10 pr-4 md:pl-0">
        <h3 className="mb-4 text-2xl font-bold text-left text-muted-foreground md:hidden">
          {item.title}
        </h3>
        {item.content}
      </div>
    </div>
  );
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [height, setHeight] = useState(0);
  const [thresholds, setThresholds] = useState<number[]>([]);
  const [litMap, setLitMap] = useState<Record<number, boolean>>({});
  const reduceMotion = useReducedMotion();

  // Measure spine height + per-dot thresholds (responsive-safe)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const base = el.getBoundingClientRect().top;
      setHeight(el.getBoundingClientRect().height);
      setThresholds(
        dotRefs.current.map((d) =>
          d ? d.getBoundingClientRect().top - base : Number.POSITIVE_INFINITY,
        ),
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 25%", "end 65%"],
  });

  // Dot glow uses the SAME progress that draws the spine:
  // lit exactly when the beam tip (progress × height) reaches the dot.
  const computeLit = useCallback(
    (p: number) => {
      const next: Record<number, boolean> = {};
      thresholds.forEach((off, i) => {
        next[i] = p * height >= off - 2;
      });
      return next;
    },
    [thresholds, height],
  );

  const applyLit = useCallback(
    (p: number) => {
      setLitMap((prev) => {
        const next = computeLit(p);
        const same = thresholds.every((_, i) => prev[i] === next[i]);
        return same ? prev : next;
      });
    },
    [computeLit, thresholds],
  );

  useMotionValueEvent(scrollYProgress, "change", applyLit);

  // Cover initial load mid-page + threshold arrival (no change event yet).
  // rAF defers the setState out of the effect body (lint-safe, same
  // pattern as the P12d HeatmapGrid reset).
  useEffect(() => {
    const raf = requestAnimationFrame(() => applyLit(scrollYProgress.get()));
    return () => cancelAnimationFrame(raf);
  }, [applyLit, scrollYProgress]);

  // Transform-only draw — the spine scales instead of animating height
  const drawTransform = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="relative w-full">
      <div ref={ref} className="relative">
        {/* Spine — rendered before entries so it paints underneath (no z-index) */}
        <div
          aria-hidden="true"
          style={{ height: `${height}px` }}
          className="absolute left-5 top-0 w-0.5 overflow-hidden bg-linear-to-b from-transparent from-0% via-border to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{
              scaleY: reduceMotion ? 1 : drawTransform,
              opacity: reduceMotion ? 1 : opacityTransform,
            }}
            className="absolute inset-0 origin-top w-0.5 rounded-full bg-linear-to-t from-primary via-primary/70 to-transparent from-0% via-10%"
          />
        </div>

        {data.map((item, index) => (
          <TimelineRow
            key={index}
            item={item}
            first={index === 0}
            lit={reduceMotion ? true : (litMap[index] ?? false)}
            dotRef={(el) => {
              dotRefs.current[index] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
};
