"use client";

import { cn } from "@/lib/utils";

export interface TopGlowProps {
  className?: string;
}

export function TopGlow({ className }: TopGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-0 flex items-center justify-center overflow-hidden h-[600px]",
        className,
      )}
    >
      {/* 1. Bright Top Core Source */}
      <div className="absolute -top-36 h-[250px] w-[500px] rounded-[100%] bg-primary/40 blur-[70px]" />

      {/* 2. Wide Sunshine Downward Ambient Gradient */}
      <div className="absolute -top-48 h-[550px] w-[1100px] rounded-[100%] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent blur-[110px]" />

      {/* 3. Conic Light Beam Rays (Fans down from top center) */}
      <div
        className="absolute -top-16 h-[550px] w-[1200px] opacity-75 animate-pulse"
        style={{
          background: `conic-gradient(from 135deg at 50% 0%, transparent 0deg, color-mix(in srgb, var(--primary) 22%, transparent) 45deg, transparent 90deg)`,
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 100%)",
          animationDuration: "7s",
        }}
      />

      {/* 4. Top Edge Specular High-Light (Lightning rim line) */}
      <div className="absolute top-0 h-[1px] w-[60%] max-w-4xl bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-80 blur-[0.5px]" />
    </div>
  );
}
