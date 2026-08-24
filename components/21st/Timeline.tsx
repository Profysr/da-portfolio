"use client";

// Rule #14 refactor (P14): framer-motion → motion/react · Aceternity demo
// header removed · hardcoded white/black/neutral/purple-blue → tokens ·
// spine draw converted height→scaleY (transform-only, zero per-frame
// layout) · ResizeObserver replaces one-shot measurement · reduced-motion
// renders the spine fully drawn · z-index replaced by DOM-order sandwich
// (spine renders before entries).
import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const reduceMotion = useReducedMotion();

  // Track content height (responsive-safe; original measured once on mount)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setHeight(entry.contentRect.height),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

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
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-linear-to-b from-transparent from-0% via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              scaleY: reduceMotion ? 1 : drawTransform,
              opacity: reduceMotion ? 1 : opacityTransform,
            }}
            className="absolute inset-0 origin-top w-[2px] rounded-full bg-linear-to-t from-primary via-primary/70 to-transparent from-0% via-[10%]"
          />
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 first:pt-0 md:gap-10"
          >
            {/* Sticky era label + node dot */}
            <div className="sticky top-28 flex flex-col items-center self-start max-w-xs md:w-full lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-background">
                <div className="h-4 w-4 rounded-full border border-border bg-surface-muted p-2" />
              </div>
              <h3 className="hidden pl-20 text-xl font-bold text-muted-foreground md:block lg:text-4xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4">
              <h3 className="mb-4 text-2xl font-bold text-left text-muted-foreground md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
