"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPHorizontalScrollProps {
  items: React.ReactNode[];
  itemWidth?: number;
  gap?: number;
  showScrollbar?: boolean;
  className?: string;
}

export function GSAPHorizontalScroll({
  items,
  itemWidth = 320,
  gap = 24,
  showScrollbar = true,
  className,
}: GSAPHorizontalScrollProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!triggerRef.current || !scrollContainerRef.current || !items.length)
      return;

    const wrapper = triggerRef.current;
    const container = scrollContainerRef.current;

    const ctx = gsap.context(() => {
      // Calculate total horizontal scroll distance
      const totalScrollWidth = container.scrollWidth - wrapper.clientWidth;

      if (totalScrollWidth <= 0) return;

      gsap.to(container, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });
    }, wrapper);

    // Revert context on unmount to scoped-clean triggers safely
    return () => ctx.revert();
  }, [items, itemWidth, gap]);

  if (!items?.length) return null;

  return (
    <div
      ref={triggerRef}
      className={cn(
        "relative w-full h-screen flex flex-col justify-center overflow-hidden",
        className,
      )}
    >
      <div
        ref={scrollContainerRef}
        className="flex shrink-0 items-center"
        style={{
          gap: `${gap}px`,
          paddingLeft: "2rem",
          paddingRight: "2rem",
          width: `calc(${items.length} * ${itemWidth}px + ${items.length - 1} * ${gap}px + 4rem)`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="shrink-0" style={{ width: itemWidth }}>
            {item}
          </div>
        ))}
      </div>

      {/* Scroll Progress Indicator */}
      {showScrollbar && (
        <div className="absolute bottom-8 left-8 right-8 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent origin-left transition-transform duration-75 ease-out"
            style={{
              transform: `scaleX(${scrollProgress})`,
              transformOrigin: "left center",
            }}
          />
        </div>
      )}
    </div>
  );
}

interface GSAPHorizontalCardProps {
  children: React.ReactNode;
  className?: string;
  width?: number;
}

export function GSAPHorizontalCard({
  children,
  className,
  width = 320,
}: GSAPHorizontalCardProps) {
  return (
    <motion.div
      className={cn(
        "shrink-0 rounded-2xl border border-border bg-surface overflow-hidden p-6",
        className,
      )}
      style={{ width, flexShrink: 0 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
