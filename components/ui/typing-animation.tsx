"use client";

import { useMemo, type ComponentType, type RefAttributes } from "react";
import {
  motion,
  type DOMMotionComponents,
  type HTMLMotionProps,
  type MotionProps,
} from "motion/react";
import { cn } from "@/lib/utils";

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span,
} as const;

type MotionElementType = Extract<
  keyof DOMMotionComponents,
  keyof typeof motionElements
>;
type TypingAnimationMotionComponent = ComponentType<
  Omit<HTMLMotionProps<"span">, "ref"> & RefAttributes<HTMLElement>
>;

interface TypingAnimationProps extends Omit<MotionProps, "children"> {
  children?: string;
  words?: string[];
  className?: string;
  duration?: number; // duration in seconds or total ms depending on preference, let's use seconds for CSS
  typeSpeed?: number;
  delay?: number;
  loop?: boolean;
  as?: MotionElementType;
  showCursor?: boolean;
  cursorStyle?: "line" | "block" | "underscore";
}

export function TypingAnimation({
  children,
  words,
  className,
  duration = 3,
  delay = 0,
  loop = true,
  as: Component = "span",
  showCursor = true,
  cursorStyle = "line",
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motionElements[
    Component
  ] as TypingAnimationMotionComponent;

  const textToAnimate = useMemo(() => {
    if (words && words.length > 0) return words[0];
    return children ?? "";
  }, [words, children]);

  const characterCount = textToAnimate.length;
  const getCursorChar = () => {
    switch (cursorStyle) {
      case "block":
        return "▌";
      case "underscore":
        return "_";
      case "line":
      default:
        return "|";
    }
  };

  return (
    <MotionComponent
      className={cn(
        "inline-flex items-center leading-20 tracking-[-0.02em]",
        className,
      )}
      {...props}
    >
      <span
        className="inline-block overflow-hidden whitespace-nowrap border-r-2 border-transparent animate-typing"
        style={{
          width: `${characterCount}ch`,
          animation: `typing ${duration}s steps(${characterCount}, end) ${delay}s ${loop ? "infinite" : "1"}`,
        }}
      >
        {textToAnimate}
      </span>
      {showCursor && (
        <span className="inline-block animate-pulse ml-0.5">
          {getCursorChar()}
        </span>
      )}
    </MotionComponent>
  );
}
