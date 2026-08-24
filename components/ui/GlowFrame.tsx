"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";

interface GlowFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  interior?: boolean;
  border?: boolean;
  size?: number;
  interiorColor?: string;
  proximity?: number;
  spread?: number;
  movementDuration?: number;
  borderWidth?: number;
  disabled?: boolean;
}

const GlowFrame = memo(
  ({
    children,
    className,
    interior = true,
    border = true,
    size = 280,
    interiorColor = "color-mix(in srgb, var(--ring) 15%, transparent)",
    proximity = 80, // Distance (px) outside the card where proximity border glow activates
    spread = 30, // Angle spread (deg) for the directional border beam
    movementDuration = 0.5,
    borderWidth = 1,
    disabled = false,
    ...props
  }: GlowFrameProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current || disabled) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          // 1. Calculate relative coordinates for radial spotlight
          const localX = mouseX - left;
          const localY = mouseY - top;
          element.style.setProperty("--glow-x", `${localX}px`);
          element.style.setProperty("--glow-y", `${localY}px`);

          // 2. Proximity check (activates even in the gap between neighboring cards)
          const isActive =
            mouseX >= left - proximity &&
            mouseX <= left + width + proximity &&
            mouseY >= top - proximity &&
            mouseY <= top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive || !border) return;

          // 3. Smooth directional angle calculation for border sweep
          const center = [left + width * 0.5, top + height * 0.5];
          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [proximity, movementDuration, border, disabled],
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <div
        ref={containerRef}
        className={cn("group/glow relative isolate", className)}
        style={{ "--active": 0 } as React.CSSProperties}
        {...props}
      >
        {children}

        {/* Interior Spotlight Glow */}
        {!disabled && interior && (
          <div
            aria-hidden
            data-glow="interior"
            className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] opacity-[var(--active)] transition-opacity duration-300"
            style={{
              background: `radial-gradient(${size}px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${interiorColor}, transparent 80%)`,
              filter: "blur(20px)",
            }}
          />
        )}

        {/* Bulletproof Border Leakage Layer */}
        {!disabled && border && (
          <div
            aria-hidden
            data-glow="border"
            className="pointer-events-none absolute -inset-px z-[3] rounded-[inherit] opacity-[var(--active)] transition-opacity duration-300"
            style={
              {
                padding: `${borderWidth}px`,
                background: `
                  radial-gradient(${size}px circle at var(--glow-x, 50%) var(--glow-y, 50%), var(--ring) 0%, transparent 100%),
                  conic-gradient(from calc(var(--start, 0) * 1deg - ${spread}deg) at 50% 50%, transparent 0deg, var(--ring) ${spread}deg, transparent calc(${spread}deg * 2))
                `,
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
              } as React.CSSProperties
            }
          />
        )}
      </div>
    );
  },
);

GlowFrame.displayName = "GlowFrame";

export { GlowFrame };
