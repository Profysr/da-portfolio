"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type HTMLMotionComponent = 
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

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "flip" | "reveal";
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
  style?: React.CSSProperties;
  as?: HTMLMotionComponent;
}

const variantAnimations = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  "slide-up": { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
  "slide-down": { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
  "slide-left": { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  "slide-right": { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
  scale: { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } },
  flip: { initial: { opacity: 0, rotateX: -90 }, animate: { opacity: 1, rotateX: 0 } },
  reveal: { initial: { opacity: 0, y: 30, filter: "blur(8px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" } },
};

const motionComponentMap: Record<HTMLMotionComponent, React.ComponentType<any>> = {
  div: motion.div,
  span: motion.span,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  aside: motion.aside,
  nav: motion.nav,
  button: motion.button,
  a: motion.a,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
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
  as: Component = "div",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
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
      {
        rootMargin: margin,
        threshold: amount,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [margin, amount, once]);

  const animation = variantAnimations[variant];
  const MotionComponent = motionComponentMap[Component];

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(className)}
      style={style}
      initial={animation.initial}
      animate={isVisible ? animation.animate : animation.initial}
      transition={{
        duration,
        delay,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      {children}
    </MotionComponent>
  );
}

interface StaggeredRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale" | "flip" | "reveal";
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
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn(containerClassName, className)}>
      {childrenArray.map((child, index) => (
        <ScrollReveal
          key={index}
          variant={variant}
          delay={delay + index * staggerDelay}
          duration={duration}
          once={once}
          margin={margin}
          amount={amount}
          className={itemClassName}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  as?: HTMLMotionComponent;
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
  as: Component = "div",
  variant = "word",
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.5,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
}: ScrollRevealTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = textRef.current;
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
      {
        rootMargin: margin,
        threshold: amount,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [margin, amount, once]);

  const splitText = (text: string) => {
    if (variant === "char") return text.split("");
    if (variant === "word") return text.split(" ").filter(Boolean);
    return text.split("\n").filter(Boolean);
  };

  const parts = splitText(children);
  const separator = variant === "char" ? "" : variant === "word" ? " " : "\n";
  const TextComponent = motionComponentMap[Component];

  return (
    <TextComponent ref={textRef} className={cn("inline-block", className)}>
      {parts.map((part, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: "1.2em", filter: "blur(4px)" }}
          animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: "1.2em", filter: "blur(4px)" }}
          transition={{
            duration,
            delay: delay + index * staggerDelay,
            ease: [0.32, 0.72, 0, 1],
          }}
          style={{ display: "inline-block" }}
        >
          {part}
          {index < parts.length - 1 && <span>{separator}</span>}
        </motion.span>
      ))}
    </TextComponent>
  );
}