import React from "react";
import { cn } from "@/lib/utils";

export function Heading({ title, children, className = "" }: { title: string, children: React.ReactNode, className?: string }) {
  return (
    <div
      className={cn(
        "relative flex w-full max-w-4xl mx-auto flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      {/* Background Watermark Text - Centered & Absolute */}
      {title && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center select-none text-center font-extrabold uppercase leading-none tracking-widest text-foreground/5 dark:text-white/5 text-5xl sm:text-7xl md:text-8xl whitespace-nowrap">
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