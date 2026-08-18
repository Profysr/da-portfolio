"use client";

import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * ScrollRail
 * ---------------
 * Same underlying technique as TracingBeam: measure the rail's total height,
 * map scroll progress across it to a spring-smoothed pixel value (`fillY`),
 * and treat that as "how far the line has been drawn."
 *
 * TracingBeam stops there and just draws the gradient at that position.
 * The rail goes one step further — each dot compares its own vertical
 * offset against `fillY` to decide whether it's been "reached" yet, and
 * lights itself + its border accordingly.
 */

const RailContext = createContext(null);

export function ScrollRail({ children, className }) {
  const containerRef = useRef(null);
  const [railHeight, setRailHeight] = useState(0);
  const offsetsRef = useRef({}); // index -> px offset from container top

  const registerOffset = (index, top) => {
    offsetsRef.current[index] = top;
  };
  const getOffset = (index) => offsetsRef.current[index] ?? Infinity;

  useLayoutEffect(() => {
    if (containerRef.current) setRailHeight(containerRef.current.offsetHeight);
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Pixel position the "fill" has traveled down the rail — identical role
  // to TracingBeam's y1/y2, just used as a literal draw height here.
  const fillY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, railHeight]),
    { stiffness: 380, damping: 60, mass: 0.5 }
  );

  return (
    <RailContext.Provider value={{ containerRef, fillY, registerOffset, getOffset }}>
      <div ref={containerRef} className={cn("relative", className)}>
        {/* static track, full height */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-border" aria-hidden />
        {/* animated fill — grows as fillY grows, exactly like the beam's line */}
        <motion.div
          className="absolute left-3 top-2 w-px bg-primary origin-top"
          style={{ height: fillY }}
          aria-hidden
        />
        {children}
      </div>
    </RailContext.Provider>
  );
}

ScrollRail.Item = function RailItem({ index, isLast, children, className }) {
  const dotRef = useRef(null);
  const { containerRef, fillY, registerOffset, getOffset } = useContext(RailContext);
  const [isLit, setIsLit] = useState(false);

  useLayoutEffect(() => {
    if (dotRef.current && containerRef.current) {
      const dotTop = dotRef.current.getBoundingClientRect().top;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      registerOffset(index, dotTop - containerTop);
    }
  }, [index]);

  // Every time the scroll-driven fill value changes, check whether it has
  // reached this dot's offset yet. This replaces the IntersectionObserver
  // callback — same "cumulative, stays lit once passed" behavior, but
  // derived from the same motion value that draws the line.
  useMotionValueEvent(fillY, "change", (latest) => {
    const lit = latest >= getOffset(index);
    setIsLit((prev) => (prev === lit ? prev : lit));
  });

  return (
    <div className={cn("relative pl-9 sm:pl-10", !isLast && "pb-8 sm:pb-10", className)}>
      <span
        ref={dotRef}
        className={cn(
          "absolute left-3 top-2 z-10 flex size-3.5 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-colors duration-300",
          isLit
            ? "border-primary bg-primary shadow-[0_0_0_4px] shadow-primary/15"
            : "border-border bg-background"
        )}
      >
        <span
          className={cn(
            "size-1.5 rounded-full transition-opacity duration-300",
            isLit ? "bg-background opacity-100" : "opacity-0"
          )}
        />
      </span>

      {typeof children === "function" ? children({ isLit }) : children}
    </div>
  );
};