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

interface CurtainRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "vertical" | "horizontal" | "vertical-reverse" | "horizontal-reverse";
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
  easing?: [number, number, number, number];
  overlayColor?: string;
  overlayClassName?: string;
  as?: HTMLMotionComponent;
}

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

export function CurtainReveal({
  children,
  className,
  direction = "vertical",
  delay = 0,
  duration = 0.8,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
  easing = [0.32, 0.72, 0, 1],
  overlayColor = "var(--accent)",
  overlayClassName,
  as: Component = "div",
}: CurtainRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
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

  const getCurtainVariants = (dir: string) => {
    switch (dir) {
      case "vertical":
        return {
          initial: { scaleY: 1, transformOrigin: "top center" },
          animate: { scaleY: 0, transformOrigin: "bottom center" },
        };
      case "vertical-reverse":
        return {
          initial: { scaleY: 1, transformOrigin: "bottom center" },
          animate: { scaleY: 0, transformOrigin: "top center" },
        };
      case "horizontal":
        return {
          initial: { scaleX: 1, transformOrigin: "left center" },
          animate: { scaleX: 0, transformOrigin: "right center" },
        };
      case "horizontal-reverse":
        return {
          initial: { scaleX: 1, transformOrigin: "right center" },
          animate: { scaleX: 0, transformOrigin: "left center" },
        };
      default:
        return { initial: {}, animate: {} };
    }
  };

  const curtainVariants = getCurtainVariants(direction);
  const ContainerComponent = motionComponentMap[Component];

  return (
    <ContainerComponent ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className={cn("absolute inset-0 z-10", overlayClassName)}
        style={{ backgroundColor: overlayColor }}
        initial={curtainVariants.initial}
        animate={isVisible ? curtainVariants.animate : curtainVariants.initial}
        transition={{
          duration,
          delay,
          ease: easing,
        }}
      />
      <div className="relative z-20">
        {children}
      </div>
    </ContainerComponent>
  );
}

interface CurtainRevealTextProps {
  children: string;
  className?: string;
  direction?: "vertical" | "horizontal";
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
  overlayColor?: string;
}

export function CurtainRevealText({
  children,
  className,
  direction = "vertical",
  delay = 0,
  duration = 0.6,
  staggerDelay = 0.04,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
  overlayColor = "var(--accent)",
}: CurtainRevealTextProps) {
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

  const words = children.split(" ").filter(Boolean);

  const curtainVariants = direction === "vertical"
    ? {
        initial: { scaleY: 1, transformOrigin: "top center" },
        animate: { scaleY: 0, transformOrigin: "bottom center" },
      }
    : {
        initial: { scaleX: 1, transformOrigin: "left center" },
        animate: { scaleX: 0, transformOrigin: "right center" },
      };

  return (
    <div ref={textRef} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, index) => (
        <span key={index} className="relative inline-block" style={{ position: "relative" }}>
          <motion.span
            className="relative z-10"
            style={{ display: "inline-block" }}
          >
            {word} {index < words.length - 1 ? " " : ""}
          </motion.span>
          <motion.div
            className="absolute inset-0 z-20"
            style={{ backgroundColor: overlayColor }}
            initial={curtainVariants.initial}
            animate={isVisible ? curtainVariants.animate : curtainVariants.initial}
            transition={{
              duration,
              delay: delay + index * staggerDelay,
              ease: [0.32, 0.72, 0, 1],
            }}
          />
        </span>
      ))}
    </div>
  );
}

interface CurtainImageProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "vertical" | "horizontal" | "vertical-reverse" | "horizontal-reverse";
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  amount?: number;
  overlayColor?: string;
  width?: number;
  height?: number;
}

export function CurtainImage({
  src,
  alt,
  className,
  direction = "vertical",
  delay = 0,
  duration = 0.8,
  once = true,
  margin = "0px 0px -10% 0px",
  amount = 0.1,
  overlayColor = "var(--accent)",
  width,
  height,
}: CurtainImageProps) {
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

  const curtainVariants = direction === "vertical"
    ? {
        initial: { scaleY: 1, transformOrigin: "top center" },
        animate: { scaleY: 0, transformOrigin: "bottom center" },
      }
    : direction === "vertical-reverse"
    ? {
        initial: { scaleY: 1, transformOrigin: "bottom center" },
        animate: { scaleY: 0, transformOrigin: "top center" },
      }
    : direction === "horizontal"
    ? {
        initial: { scaleX: 1, transformOrigin: "left center" },
        animate: { scaleX: 0, transformOrigin: "right center" },
      }
    : {
        initial: { scaleX: 1, transformOrigin: "right center" },
        animate: { scaleX: 0, transformOrigin: "left center" },
      };

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: overlayColor }}
        initial={curtainVariants.initial}
        animate={isVisible ? curtainVariants.animate : curtainVariants.initial}
        transition={{
          duration,
          delay,
          ease: [0.32, 0.72, 0, 1],
        }}
      />
      <img
        src={src}
        alt={alt}
        className="relative z-20 w-full h-full object-cover"
        loading="lazy"
        width={width}
        height={height}
      />
    </div>
  );
}