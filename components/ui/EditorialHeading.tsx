"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ScrollRevealText } from "./ScrollReveal";

interface EditorialHeadingProps {
  children: string;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: "default" | "display" | "hero" | "section" | "compact";
  align?: "left" | "center" | "right";
  animate?: boolean;
  animationVariant?: "word" | "line" | "char";
  animationDelay?: number;
  animationStaggerDelay?: number;
  animationDuration?: number;
  subheading?: string;
  subheadingClassName?: string;
  divider?: boolean;
  dividerClassName?: string;
}

const levelStyles = {
  1: "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em]",
  2: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em]",
  3: "text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.01em]",
  4: "text-2xl sm:text-3xl font-semibold",
  5: "text-xl sm:text-2xl font-medium",
  6: "text-lg sm:text-xl font-medium",
};

const variantStyles = {
  default: "",
  display: "font-extrabold tracking-[-0.04em]",
  hero: "font-extrabold tracking-[-0.04em] text-foreground/95",
  section: "font-bold tracking-[-0.02em]",
  compact: "font-semibold tracking-tight",
};

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const HeadingComponents = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export function EditorialHeading({
  children,
  className,
  level = 1,
  variant = "default",
  align = "left",
  animate = true,
  animationVariant = "word",
  animationDelay = 0,
  animationStaggerDelay = 0.04,
  animationDuration = 0.6,
  subheading,
  subheadingClassName,
  divider = false,
  dividerClassName,
}: EditorialHeadingProps) {
  const HeadingTag = HeadingComponents[level];

  const baseClassName = cn(
    "text-wrap-balance",
    levelStyles[level],
    variantStyles[variant],
    "text-foreground"
  );

  return (
    <div className={cn("flex flex-col gap-4", alignStyles[align], className)}>
      {animate ? (
        <ScrollRevealText
          as={HeadingTag}
          className={baseClassName}
          variant={animationVariant}
          delay={animationDelay}
          staggerDelay={animationStaggerDelay}
          duration={animationDuration}
        >
          {children}
        </ScrollRevealText>
      ) : (
        React.createElement(HeadingTag, { className: baseClassName }, children)
      )}
      
      {subheading && (
        <motion.p
          className={cn(
            "text-muted-foreground leading-relaxed text-wrap-balance max-w-3xl",
            level === 1 && "text-lg sm:text-xl",
            level === 2 && "text-base sm:text-lg",
            level >= 3 && "text-sm sm:text-base",
            subheadingClassName
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: animationDelay + (animate ? 0.2 : 0), ease: [0.32, 0.72, 0, 1] }}
        >
          {subheading}
        </motion.p>
      )}

      {divider && (
        <motion.div
          className={cn(
            "w-16 h-px bg-accent",
            align === "center" && "mx-auto",
            align === "right" && "ml-auto",
            dividerClassName
          )}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: animationDelay + (animate ? 0.3 : 0), ease: [0.32, 0.72, 0, 1] }}
          style={{ transformOrigin: align === "right" ? "right" : align === "center" ? "center" : "left" }}
        />
      )}
    </div>
  );
}

interface HeroHeadlineProps {
  lines: string[];
  className?: string;
  align?: "left" | "center" | "right";
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  highlightWords?: string[];
  highlightClassName?: string;
}

export function HeroHeadline({
  lines,
  className,
  align = "left",
  delay = 0,
  staggerDelay = 0.12,
  duration = 0.7,
  highlightWords = [],
  highlightClassName = "relative",
}: HeroHeadlineProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("flex flex-col gap-2", alignStyles[align], className)}>
      {lines.map((line, lineIndex) => (
        <motion.div
          key={lineIndex}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration,
            delay: delay + lineIndex * staggerDelay,
            ease: [0.32, 0.72, 0, 1],
          }}
          style={{ transformOrigin: align === "center" ? "center" : align === "right" ? "right" : "left" }}
        >
          <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-[-0.04em] text-foreground text-wrap-balance">
            {line.split(" ").map((word, wordIndex) => (
              <span
                key={`${word}-${wordIndex}`}
                className={cn(
                  highlightWords.some((hw) => hw.toLowerCase() === word.toLowerCase()) &&
                    `${highlightClassName} text-accent`
                )}
              >
                {word} {wordIndex < line.split(" ").length - 1 && " "}
              </span>
            ))}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

interface SectionHeadlineProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  animate?: boolean;
}

export function SectionHeadline({
  label,
  title,
  description,
  className,
  align = "left",
  animate = true,
}: SectionHeadlineProps) {
  return (
    <div className={cn("flex flex-col gap-3 max-w-3xl", align === "center" && "mx-auto", className)}>
      {label && (
        <motion.span
          className="inline-flex items-center gap-2 text-sm font-medium text-accent uppercase tracking-wider"
          initial={{ opacity: 0, x: -20 }}
          animate={animate ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0, ease: [0.32, 0.72, 0, 1] }}
        >
          {label}
        </motion.span>
      )}
      <EditorialHeading
        level={2}
        variant="section"
        align={align}
        animate={animate}
        animationDelay={label ? 0.1 : 0}
      >
        {title}
      </EditorialHeading>
      {description && (
        <motion.p
          className={cn(
            "text-muted-foreground leading-relaxed text-wrap-balance",
            align === "center" && "mx-auto"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={animate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}