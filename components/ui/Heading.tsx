import React, { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
  /** Section title for watermark variant */
  title?: string;
  /** Variant: "watermark" (container with watermark) or "gradient" (text gradient) */
  variant?: "watermark" | "gradient";
  /** Heading level for gradient variant */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  /** Text content for gradient variant */
  text?: string;
  /** Watermark className override */
  watermarkClassName?: string;
}

export function Heading({
  title,
  children,
  variant = "watermark",
  as: Component = "h1",
  className = "",
  watermarkClassName = "",
  text,
  style,
  ...props
}: HeadingProps) {
  // Gradient text variant - used for section titles
  if (variant === "gradient") {
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

  // Watermark container variant - used for hero/section wrappers
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center",
        className,
      )}
      {...props}
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

export default Heading;