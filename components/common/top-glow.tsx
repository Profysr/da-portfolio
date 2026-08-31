"use client";

import React, { type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface GlowEffectProps {
  /** Alignment edge of the glow effect */
  position?: "top" | "bottom" | "center";
  /** Base color for the glow (CSS variable, hex, or rgb). Defaults to "var(--primary)" */
  color?: string;
  /** Total height of the glow area. Defaults to "600px" */
  height?: string;
  /** Toggle background conic rays */
  showRays?: boolean;
  /** Toggle specular edge rim line */
  showRim?: boolean;
  /** Overall opacity scaling (0 to 1). Defaults to 1 */
  opacity?: number;
  className?: string;
}

export function GlowEffect({
  position = "top",
  color = "var(--primary)",
  height = "600px",
  showRays = true,
  showRim = true,
  opacity = 1,
  className,
}: GlowEffectProps) {
  const positionStyles = {
    top: "top-0 inset-x-0",
    bottom: "bottom-0 inset-x-0 rotate-180",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <div
      aria-hidden="true"
      style={
        {
          "--glow-color": color,
          height: height,
          opacity: opacity,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute z-0 flex items-center justify-center overflow-hidden w-full",
        positionStyles[position],
        className,
      )}
    >
      {/* 1. Core Source Blur */}
      <div
        className="absolute -top-36 h-[250px] w-[500px] rounded-[100%] blur-[70px]"
        style={{
          background: `color-mix(in srgb, var(--glow-color) 40%, transparent)`,
        }}
      />

      {/* 2. Ambient Downward/Upward Sweep */}
      <div
        className="absolute -top-48 h-[550px] w-[1100px] rounded-[100%] blur-[110px]"
        style={{
          background: `linear-gradient(to bottom, color-mix(in srgb, var(--glow-color) 30%, transparent), color-mix(in srgb, var(--glow-color) 10%, transparent), transparent)`,
        }}
      />

      {/* 3. Conic Light Rays */}
      {showRays && (
        <div
          className="absolute -top-16 h-[550px] w-[1200px] opacity-75 animate-pulse"
          style={{
            background: `conic-gradient(from 135deg at 50% 0%, transparent 0deg, color-mix(in srgb, var(--glow-color) 22%, transparent) 45deg, transparent 90deg)`,
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 100%)",
            animationDuration: "7s",
          }}
        />
      )}

      {/* 4. Specular Rim Line */}
      {showRim && (
        <div
          className="absolute top-0 h-[1px] w-[60%] max-w-4xl opacity-80 blur-[0.5px]"
          style={{
            background: `linear-gradient(to right, transparent, color-mix(in srgb, var(--glow-color) 80%, transparent), transparent)`,
          }}
        />
      )}
    </div>
  );
}
