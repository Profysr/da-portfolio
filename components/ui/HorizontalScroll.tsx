"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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
        // Total horizontal translation so the last card aligns nicely in view
        const distance = Math.max(0, trackWidth - viewportWidth);
        setScrollDistance(distance);
      }
    };

    calculateDistance();

    // Use ResizeObserver if available for instant responsive updates
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

  // Framer Motion scroll tracking relative to containerRef
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Physical spring smoothing for fluid horizontal motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const x = useTransform(smoothProgress, [0, 1], [0, -scrollDistance]);

  // Update active index indicator based on progress
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
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between py-6 sm:py-8 md:py-10 overflow-hidden">
        {/* Pinned Section Header */}
        {header && <div className="w-full shrink-0 z-10">{header}</div>}

        {/* Pinned Cards Horizontal Track */}
        <div className="relative w-full flex-1 flex items-center overflow-hidden my-auto">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className={`flex shrink-0 items-center gap-4 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 will-change-transform motion-reduce:transform-none! ${className}`}
          >
            {children}
          </motion.div>
        </div>

        {/* Interactive Progress Indicator Bar */}
        <div className="w-full shrink-0 z-10 px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-between text-xs text-muted-foreground font-mono">
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
            <span className="opacity-60 text-xs sm:text-sm">
              {String(itemCount).padStart(2, "0")}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] tracking-widest uppercase opacity-70">
            <span>Scroll down to navigate stack</span>
            <span className="inline-block animate-bounce text-foreground">↓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
