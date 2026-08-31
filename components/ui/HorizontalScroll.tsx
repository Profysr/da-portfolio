"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface ScrollWrapperProps {
  children: React.ReactNode;
  itemCount: number;
  scrollLengthVh?: number;
  className?: string;
  header?: React.ReactNode;
}

export const ScrollWrapper: React.FC<ScrollWrapperProps> = ({
  children,
  itemCount,
  scrollLengthVh = 280,
  className = "",
  header,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Measure dynamic horizontal scroll distance based on track content vs viewport width
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const distance = Math.max(0, trackWidth - viewportWidth);
        setScrollDistance(distance);
      }
    };

    calculateDistance();

    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      const observer = new ResizeObserver(() => calculateDistance());
      observer.observe(trackRef.current);
      window.addEventListener("resize", calculateDistance);
      return () => {
        observer.disconnect();
        window.removeEventListener("resize", calculateDistance);
      };
    } else {
      window.addEventListener("resize", calculateDistance);
      return () => window.removeEventListener("resize", calculateDistance);
    }
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.0001,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollDistance]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const idx = Math.min(
        itemCount - 1,
        Math.max(0, Math.floor(latest * itemCount))
      );
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, itemCount]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${scrollLengthVh}vh` }}
      className="relative w-full"
    >
      {/* Sticky Viewport — full screen, top-0 so it pins behind the floating TopBar */}
      <div className="sticky top-0 h-screen w-full flex flex-col overflow-hidden">

        {/* ── Section Header ─────────────────────────────────────────── */}
        {header && (
          <div className="w-full shrink-0 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-5">
            {header}
          </div>
        )}

        {/* ── Cards Track — natural height, directly below header */}
        <div className="relative w-full shrink-0 pt-3 sm:pt-4 overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className={`flex shrink-0 items-start gap-3 sm:gap-4 md:gap-5 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28 will-change-transform motion-reduce:transform-none! ${className}`}
          >
            {children}
          </motion.div>
        </div>

        {/* Spacer — pushes progress bar to viewport bottom */}
        <div className="flex-1" />

        {/* ── Progress Bar ────────────────────────────────────────────── */}
        <div className="w-full shrink-0 pb-4 sm:pb-6 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-foreground font-bold tracking-widest text-xs sm:text-sm">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div className="w-24 sm:w-40 md:w-48 h-1.5 bg-muted/80 rounded-full overflow-hidden relative border border-border/40">
              <motion.div
                className="h-full bg-foreground rounded-full"
                style={{
                  width: `${((activeIndex + 1) / itemCount) * 100}%`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            <span className="text-muted-foreground text-xs sm:text-sm">
              {String(itemCount).padStart(2, "0")}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] tracking-widest uppercase text-muted-foreground">
            <span>Scroll down to navigate stack</span>
            <span className="inline-block animate-bounce text-foreground">↓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
