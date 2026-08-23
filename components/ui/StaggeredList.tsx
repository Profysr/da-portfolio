"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface StaggeredListProps<T> {
  items: T[];
  className?: string;
  itemClassName?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
  variant?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "reveal";
  staggerDelay?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
  direction?: "vertical" | "horizontal" | "grid";
  gap?: string;
}

const variantAnimations = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  "slide-up": { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  "slide-down": { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } },
  "slide-left": { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 } },
  "slide-right": { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
  reveal: { initial: { opacity: 0, y: 20, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" } },
};

export function StaggeredList<T>({
  items,
  className,
  itemClassName,
  renderItem,
  variant = "reveal",
  staggerDelay = 0.06,
  delay = 0,
  duration = 0.5,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
  direction = "vertical",
  gap = "1.5rem",
}: StaggeredListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(container);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin: margin,
        threshold: amount,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [margin, amount, once]);

  const animation = variantAnimations[variant];

  const directionStyles = {
    vertical: { display: "flex", flexDirection: "column" as const, gap },
    horizontal: { display: "flex", flexDirection: "row" as const, flexWrap: "wrap" as const, gap },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap },
  };

  return (
    <div ref={containerRef} className={cn(className)} style={directionStyles[direction]}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={cn(itemClassName)}
          initial={animation.initial}
          animate={isVisible ? animation.animate : animation.initial}
          transition={{
            duration,
            delay: delay + index * staggerDelay,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </div>
  );
}

interface StaggeredListItemProps {
  children: React.ReactNode;
  className?: string;
  index: number;
  staggerDelay?: number;
  delay?: number;
  duration?: number;
  variant?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "reveal";
}

export function StaggeredListItem({
  children,
  className,
  index,
  staggerDelay = 0.06,
  delay = 0,
  duration = 0.5,
  variant = "reveal",
}: StaggeredListItemProps) {
  const animation = variantAnimations[variant];

  return (
    <motion.li
      className={cn(className)}
      initial={animation.initial}
      animate={animation.animate}
      transition={{
        duration,
        delay: delay + index * staggerDelay,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      {children}
    </motion.li>
  );
}

interface StaggeredGridProps<T> {
  items: T[];
  className?: string;
  itemClassName?: string;
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: { base: number; sm: number; md: number; lg: number; xl: number };
  gap?: string;
  variant?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "reveal";
  staggerDelay?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
}

export function StaggeredGrid<T>({
  items,
  className,
  itemClassName,
  renderItem,
  columns = { base: 1, sm: 2, md: 2, lg: 3, xl: 4 },
  gap = "1.5rem",
  variant = "reveal",
  staggerDelay = 0.06,
  delay = 0,
  duration = 0.5,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
}: StaggeredGridProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(container);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        rootMargin: margin,
        threshold: amount,
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [margin, amount, once]);

  const animation = variantAnimations[variant];

  return (
    <div
      ref={containerRef}
      className={cn(
        "grid",
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4",
        className
      )}
      style={{ gap }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={cn(itemClassName)}
          initial={animation.initial}
          animate={isVisible ? animation.animate : animation.initial}
          transition={{
            duration,
            delay: delay + index * staggerDelay,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </div>
  );
}