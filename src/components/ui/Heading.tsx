import React, { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
 *  1. Container Component (Watermark & Radial Background Glow)
 * ───────────────────────────────────────────────────────────── */
interface HeadingProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  watermarkClassName?: string;
}

export function Heading({
  title,
  children,
  className = "",
  watermarkClassName = "",
}: HeadingProps) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-6xl mx-auto flex-col items-center justify-center",
        className,
      )}
    >
      {/* Background Watermark Text */}
      {title && (
        <span
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center select-none text-center font-extrabold uppercase leading-none tracking-widest text-foreground/5 dark:text-white/5 text-5xl sm:text-7xl md:text-9xl whitespace-nowrap z-0",
            watermarkClassName,
          )}
        >
          {title}
        </span>
      )}

      {/* Subtle Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Foreground Content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  2. Typography Component (Gradient & Text Clip Effect)
 * ───────────────────────────────────────────────────────────── */
interface GradientHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  text?: string;
  children?: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  className?: string;
}

export function GradientHeading({
  text,
  children,
  as: Component = "h1",
  className = "",
  style,
  ...props
}: GradientHeadingProps) {
  return (
    <Component
    className={cn(
      "pointer-events-none inline-block bg-linear-to-b from-neutral-950 via-neutral-800 to-neutral-500 bg-clip-text text-center text-5xl sm:text-7xl font-extrabold leading-none tracking-wider text-transparent dark:from-white dark:via-neutral-300 dark:to-neutral-600",
      className,
    )}
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
      {...props}
    >
      {text || children}
    </Component>
  );
}

export default Heading;
