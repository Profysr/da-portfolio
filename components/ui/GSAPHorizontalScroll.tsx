"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPHorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  items?: React.ReactNode[];
  itemWidth?: number;
  gap?: number;
  showScrollbar?: boolean;
}

export function GSAPHorizontalScroll({
  children,
  className,
  items,
  itemWidth = 320,
  gap = 24,
  showScrollbar = true,
}: GSAPHorizontalScrollProps) {
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!horizontalScrollRef.current) return;

    const container = horizontalScrollRef.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    
    if (scrollWidth <= 0) return;

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "bottom center",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });
      return () => ctx.revert();
    }, container);

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  if (!items?.length) return null;

  return (
    <div ref={horizontalScrollRef} className={cn("relative overflow-hidden", className)}>
      <div 
        ref={scrollContainerRef}
        className="flex gap-6" 
        style={{ width: `calc(${items.length} * ${itemWidth}px + ${items.length - 1} * ${gap}px)` }}
      >
        {items.map((item, index) => (
          <motion.div
            key={`${index}`}
            className="shrink-0"
            style={{ width: itemWidth, flexShrink: 0 }}
            layout
          >
            {item}
          </motion.div>
        ))}
      </div>
      
      {showScrollbar && (
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-border mt-4 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent origin-left"
            style={{ transformOrigin: "left center" }}
            animate={{ scaleX: [0, 1] }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
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
  width = 320 
}: GSAPHorizontalCardProps) {
  return (
    <motion.div
      className={cn("shrink-0 rounded-2xl border border-border bg-surface overflow-hidden", className)}
      style={{ width, flexShrink: 0 }}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}