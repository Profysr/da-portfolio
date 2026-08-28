"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TextMaskRevealProps {
  children: string;
  className?: string;
  maskImage?: string;
  maskColor?: string;
  direction?: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top" | "center-out" | "radial";
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
  splitBy?: "word" | "char" | "line";
  fontSize?: string;
  fontWeight?: string;
}

export function TextMaskReveal({
  children,
  className,
  maskImage,
  maskColor = "var(--accent)",
  direction = "left-to-right",
  delay = 0,
  duration = 0.8,
  staggerDelay = 0.03,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
  splitBy = "word",
  fontSize,
  fontWeight,
}: TextMaskRevealProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = textRef.current;
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

  const splitText = (text: string) => {
    if (splitBy === "char") return text.split("");
    if (splitBy === "word") return text.split(" ").filter(Boolean);
    return text.split("\n").filter(Boolean);
  };

  const parts = splitText(children);
  const separator = splitBy === "char" ? "" : splitBy === "word" ? " " : "\n";

  const getClipPath = (progress: number, dir: string) => {
    switch (dir) {
      case "left-to-right":
        return `inset(0 ${100 - progress * 100}% 0 0)`;
      case "right-to-left":
        return `inset(0 0 0 ${100 - progress * 100}%)`;
      case "top-to-bottom":
        return `inset(0 0 ${100 - progress * 100}% 0)`;
      case "bottom-to-top":
        return `inset(${100 - progress * 100}% 0 0 0)`;
      case "center-out":
        const side = (100 - progress * 100) / 2;
        return `inset(${side}% ${side}% ${side}% ${side}%)`;
      case "radial":
        return `circle(${progress * 100}% at 50% 50%)`;
      default:
        return `inset(0 ${100 - progress * 100}% 0 0)`;
    }
  };

  const getTransformOrigin = (dir: string) => {
    switch (dir) {
      case "left-to-right": return "left center";
      case "right-to-left": return "right center";
      case "top-to-bottom": return "center top";
      case "bottom-to-top": return "center bottom";
      case "center-out": return "center center";
      case "radial": return "center center";
      default: return "left center";
    }
  };

  return (
    <div ref={textRef} className={cn("inline-block", className)}>
      {parts.map((part, index) => (
        <span key={index} style={{ display: "inline-block" }}>
          <motion.span
            style={{
              display: "inline-block",
              background: maskImage ? `url(${maskImage})` : `linear-gradient(90deg, ${maskColor}, ${maskColor})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
              clipPath: isVisible ? getClipPath(1, direction) : getClipPath(0, direction),
              transformOrigin: getTransformOrigin(direction),
              fontSize,
              fontWeight,
            }}
            initial={false}
            animate={isVisible ? { clipPath: getClipPath(1, direction) } : { clipPath: getClipPath(0, direction) }}
            transition={{
              duration,
              delay: delay + index * staggerDelay,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            {part}
          </motion.span>
          {index < parts.length - 1 && <span style={{ display: "inline-block" }}>{separator}</span>}
        </span>
      ))}
    </div>
  );
}

interface TextMaskRevealLinesProps {
  lines: string[];
  className?: string;
  maskColor?: string;
  direction?: "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top" | "center-out" | "radial";
  delay?: number;
  duration?: number;
  lineStaggerDelay?: number;
  wordStaggerDelay?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
  fontSize?: string;
  fontWeight?: string;
  lineClassName?: string;
}

export function TextMaskRevealLines({
  lines,
  className,
  maskColor = "var(--accent)",
  direction = "left-to-right",
  delay = 0,
  duration = 0.8,
  lineStaggerDelay = 0.12,
  wordStaggerDelay = 0.03,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
  fontSize,
  fontWeight,
  lineClassName,
}: TextMaskRevealLinesProps) {
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

  const getClipPath = (progress: number, dir: string) => {
    switch (dir) {
      case "left-to-right":
        return `inset(0 ${100 - progress * 100}% 0 0)`;
      case "right-to-left":
        return `inset(0 0 0 ${100 - progress * 100}%)`;
      case "top-to-bottom":
        return `inset(0 0 ${100 - progress * 100}% 0)`;
      case "bottom-to-top":
        return `inset(${100 - progress * 100}% 0 0 0)`;
      case "center-out":
        const side = (100 - progress * 100) / 2;
        return `inset(${side}% ${side}% ${side}% ${side}%)`;
      case "radial":
        return `circle(${progress * 100}% at 50% 50%)`;
      default:
        return `inset(0 ${100 - progress * 100}% 0 0)`;
    }
  };

  const getTransformOrigin = (dir: string) => {
    switch (dir) {
      case "left-to-right": return "left center";
      case "right-to-left": return "right center";
      case "top-to-bottom": return "center top";
      case "bottom-to-top": return "center bottom";
      case "center-out": return "center center";
      case "radial": return "center center";
      default: return "left center";
    }
  };

  return (
    <div ref={containerRef} className={cn("flex flex-col gap-2", className)}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className={cn(lineClassName)}>
          {line.split(" ").filter(Boolean).map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              style={{
                display: "inline-block",
                background: `linear-gradient(90deg, ${maskColor}, ${maskColor})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
                clipPath: isVisible ? getClipPath(1, direction) : getClipPath(0, direction),
                transformOrigin: getTransformOrigin(direction),
                fontSize,
                fontWeight,
              }}
              initial={false}
              animate={isVisible ? { clipPath: getClipPath(1, direction) } : { clipPath: getClipPath(0, direction) }}
              transition={{
                duration,
                delay: delay + lineIndex * lineStaggerDelay + wordIndex * wordStaggerDelay,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animate?: boolean;
  animationDuration?: number;
}

export function GradientText({
  children,
  className,
  gradient = "linear-gradient(135deg, var(--accent) 0%, var(--accent-muted) 100%)",
  animate = false,
  animationDuration = 3,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "bg-[length:200%_200%]",
        animate && "animate-gradient-shift",
        className
      )}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </span>
  );
}

interface SplitTextProps {
  children: string;
  className?: string;
  splitBy?: "word" | "char" | "line";
  wrapperClassName?: string;
}

export function SplitText({
  children,
  className,
  splitBy = "word",
  wrapperClassName = "inline-block",
}: SplitTextProps) {
  const parts = splitBy === "char"
    ? children.split("")
    : splitBy === "word"
    ? children.split(" ").filter(Boolean)
    : children.split("\n").filter(Boolean);

  const separator = splitBy === "char" ? "" : splitBy === "word" ? " " : "\n";

  return (
    <span className={cn(className)}>
      {parts.map((part, index) => (
        <span key={index} className={wrapperClassName}>
          {part}
          {index < parts.length - 1 && <span>{separator}</span>}
        </span>
      ))}
    </span>
  );
}