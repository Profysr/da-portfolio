"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";

const RailContext = createContext(null);

export function ScrollRail({ children, className }) {
  const containerRef = useRef(null);
  const [railHeight, setRailHeight] = useState(0);
  const [offsets, setOffsets] = useState({});

  const registerOffset = useCallback((index, top) => {
    setOffsets((prev) => {
      if (prev[index] === top) return prev;
      return { ...prev, [index]: top };
    });
  }, []);

  // Update container height
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setRailHeight(entry.contentRect.height);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const fillY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, railHeight]),
    { stiffness: 300, damping: 40, mass: 0.2 }
  );

  return (
    <RailContext.Provider value={{ containerRef, fillY, registerOffset, offsets }}>
      <div ref={containerRef} className={cn("relative", className)}>
        {/* Track */}
        <div className="absolute left-1.5 sm:left-3 top-2 bottom-2 w-px bg-border" aria-hidden />
        
        {/* Fill Line */}
        <motion.div
          className="absolute left-1.5 sm:left-3 top-2 w-px bg-primary origin-top"
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
  const { containerRef, fillY, registerOffset, offsets } = useContext(RailContext);
  const [isLit, setIsLit] = useState(false);

  const targetOffset = offsets[index];

  // Measure position relative to container
  useEffect(() => {
    const measure = () => {
      if (dotRef.current && containerRef.current) {
        const dotTop = dotRef.current.getBoundingClientRect().top;
        const containerTop = containerRef.current.getBoundingClientRect().top;
        registerOffset(index, Math.max(0, dotTop - containerTop));
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index, containerRef, registerOffset]);

  // Two-way scroll listener (Lights ON scrolling down, Lights OFF scrolling up)
  useMotionValueEvent(fillY, "change", (latest) => {
    if (typeof targetOffset !== "number") return;
    const shouldBeLit = latest >= (targetOffset - 4);
    setIsLit((prev) => (prev === shouldBeLit ? prev : shouldBeLit));
  });

  return (
    <div className={cn("relative pl-4 sm:pl-9", !isLast && "pb-6 sm:pb-10", className)}>
      <motion.span
        ref={dotRef}
        initial={false}
        animate={{
          backgroundColor: isLit ? "var(--primary)" : "var(--background)",
          borderColor: isLit ? "var(--primary)" : "var(--border)",
          boxShadow: isLit
            ? "0 0 10px var(--primary), 0 0 18px var(--primary)"
            : "0 0 0px transparent",
          scale: isLit ? 1.2 : 0.85,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute left-1.5 sm:left-3 top-2 z-10 block size-3 sm:size-3.5 -translate-x-1/2 rounded-full border-2"
      />

      {typeof children === "function" ? children({ isLit }) : children}
    </div>
  );
};