import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  variant?: "watermark" | "gradient";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  text?: string;
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
  // Gradient text variant using theme design tokens
  if (variant === "gradient") {
    return (
      <Component
        className={cn(
          "pointer-events-none inline-block bg-linear-to-b from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-center text-5xl sm:text-7xl font-extrabold leading-none tracking-wider text-transparent",
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

  // Watermark container variant using theme variable opacities
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center",
        className,
      )}
      {...props}
    >
      {/* Background Watermark Text mapped to foreground token opacity */}
      {title && (
        <span
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center select-none text-center font-extrabold uppercase leading-none tracking-widest text-foreground/15 text-5xl sm:text-7xl md:text-9xl whitespace-nowrap z-0",
            watermarkClassName,
          )}
        >
          {title}
        </span>
      )}

      {/* Radial Glow leveraging primary accent token */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--foreground)_0%,transparent_70%)] opacity-15" />

      {/* Foreground Content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center text-center text-foreground">
        {children}
      </div>
    </div>
  );
}

export default Heading;
