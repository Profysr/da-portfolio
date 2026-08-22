"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "motion/react";

interface CursorGlowProps {
  /** Visual variant */
  variant?: "spotlight" | "border";
  /** Blur radius for spotlight variant */
  blur?: number;
  /** Spotlight size in px */
  size?: number;
  /** Spotlight color (rgba) */
  color?: string;
  /** Border glow blur */
  borderBlur?: number;
  /** Inactive zone (0-1) */
  inactiveZone?: number;
  /** Proximity threshold */
  proximity?: number;
  /** Spread for border variant */
  spread?: number;
  /** Movement animation duration */
  movementDuration?: number;
  /** Border width */
  borderWidth?: number;
  /** Disable the effect */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

const CursorGlow = memo(
  ({
    variant = "spotlight",
    blur = 0,
    size = 300,
    color = "rgba(212, 168, 0, 0.15)",
    borderBlur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    movementDuration = 2,
    borderWidth = 1,
    disabled = false,
    className,
  }: CursorGlowProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

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

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          if (variant === "border") {
            const currentAngle =
              parseFloat(element.style.getPropertyValue("--start")) || 0;
            const targetAngle =
              (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
                Math.PI + 90;

            const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
            const newAngle = currentAngle + angleDiff;

            animate(currentAngle, newAngle, {
              duration: movementDuration,
              ease: [0.16, 1, 0.3, 1],
              onUpdate: (value) => {
                element.style.setProperty("--start", String(value));
              },
            });
          }
        });
      },
      [variant, inactiveZone, proximity, movementDuration]
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

    // Spotlight variant - simpler radial gradient
    if (variant === "spotlight") {
      return (
        <div
          ref={containerRef}
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/glow:opacity-100",
            className
          )}
          style={{
            background: `radial-gradient(${size}px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${color}, transparent 70%)`,
          }}
        />
      );
    }

    // Border variant - complex conic gradient with animated sweep
    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${borderBlur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                `radial-gradient(circle, #d4a800 10%, #d4a80000 20%),
                radial-gradient(circle at 40% 40%, #d4a800 5%, #d4a80000 15%),
                radial-gradient(circle at 60% 60%, #d4a800 10%, #d4a80000 20%), 
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #d4a800 0%,
                  #d4a800 calc(25% / var(--repeating-conic-gradient-times)),
                  #d4a800 calc(50% / var(--repeating-conic-gradient-times)), 
                  #d4a800 calc(75% / var(--repeating-conic-gradient-times)),
                  #d4a800 calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            borderBlur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

CursorGlow.displayName = "CursorGlow";

export { CursorGlow };