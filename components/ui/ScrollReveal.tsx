"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealTag =
  | "div"
  | "span"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "main"
  | "aside"
  | "nav"
  | "button"
  | "a"
  | "li"
  | "ul"
  | "ol"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

type RevealVariant =
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "flip"
  | "reveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
  style?: React.CSSProperties;
  as?: RevealTag;
}

const useInView = (
  ref: React.RefObject<HTMLElement | null>,
  margin: string,
  amount: number,
  once: boolean
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { rootMargin: margin, threshold: amount }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, margin, amount, once]);

  return isVisible;
};

export function ScrollReveal({
  children,
  className,
  variant = "reveal",
  delay = 0,
  duration = 0.6,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
  style,
  as: Tag = "div",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLElement>(null);
  const isVisible = useInView(elementRef, margin, amount, once);
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={elementRef}
      data-visible={isVisible}
      className={cn("reveal", `reveal-v-${variant}`, className)}
      style={{
        "--rv-delay": `${delay}s`,
        "--rv-dur": `${duration}s`,
        ...style,
      } as React.CSSProperties}
    >
      {children}
    </Component>
  );
}

interface StaggeredRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  staggerDelay?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
  containerClassName?: string;
  itemClassName?: string;
}

export function StaggeredReveal({
  children,
  className,
  variant = "reveal",
  staggerDelay = 0.08,
  delay = 0,
  duration = 0.5,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
  containerClassName,
  itemClassName,
}: StaggeredRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(elementRef, margin, amount, once);
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      ref={elementRef}
      data-visible={isVisible}
      className={cn("reveal", `reveal-v-${variant}`, containerClassName, className)}
    >
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={cn("reveal-item", itemClassName)}
          style={
            {
              "--rv-delay": `${delay + index * staggerDelay}s`,
              "--rv-dur": `${duration}s`,
            } as React.CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  as?: RevealTag;
  variant?: "word" | "line" | "char";
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
}

export function ScrollRevealText({
  children,
  className,
  as: Tag = "div",
  variant = "word",
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.5,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
}: ScrollRevealTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const isVisible = useInView(textRef, margin, amount, once);
  const Component = Tag as React.ElementType;

  const splitText = (text: string) => {
    if (variant === "char") return text.split("");
    if (variant === "word") return text.split(" ").filter(Boolean);
    return text.split("\n").filter(Boolean);
  };

  const parts = splitText(children);
  const separator = variant === "char" ? "" : variant === "word" ? " " : "\n";

  return (
    <Component
      ref={textRef}
      data-visible={isVisible}
      className={cn("reveal sr-text inline-block", className)}
      style={
        {
          "--rv-delay": `${delay}s`,
          "--rv-dur": `${duration}s`,
          "--rv-stagger": `${staggerDelay}s`,
        } as React.CSSProperties
      }
    >
      {parts.map((part, index) => (
        <span
          key={index}
          className="sr-part"
          style={
            {
              "--i": index,
              transitionDelay: `${delay + index * staggerDelay}s`,
            } as React.CSSProperties
          }
        >
          {part}
          {index < parts.length - 1 && <span>{separator}</span>}
        </span>
      ))}
    </Component>
  );
}
