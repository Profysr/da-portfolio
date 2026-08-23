"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";
import type { AnimationPlaybackControls } from "motion/react";
import { animate } from "motion/react";
import { cn } from "@/lib/utils";

interface GlowFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  interior?: boolean;
  border?: boolean;
  size?: number;
  interiorColor?: string;
  spread?: number;
  borderWidth?: number;
  disabled?: boolean;
}

const GlowFrame = forwardRef<HTMLDivElement, GlowFrameProps>(
  (
    {
      children,
      className,
      interior = true,
      border = true,
      size = 180,
      interiorColor = "rgba(255,255,255,0.14)",
      spread = 40,
      borderWidth = 1,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const frameRef = useRef<HTMLDivElement | null>(null);
    const angleRef = useRef(0);
    const rafRef = useRef(0);
    const animRef = useRef<AnimationPlaybackControls | null>(null);
    const motionOkRef = useRef(true);

    useEffect(() => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      motionOkRef.current = !mq.matches;
      const onChange = (e: MediaQueryListEvent) => {
        motionOkRef.current = !e.matches;
      };
      mq.addEventListener("change", onChange);
      return () => {
        mq.removeEventListener("change", onChange);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        animRef.current?.stop();
      };
    }, []);

    const track = useCallback(
      (e: React.PointerEvent<HTMLDivElement>) => {
        const el = frameRef.current;
        if (!el || !motionOkRef.current || e.pointerType !== "mouse") return;

        const { clientX, clientY } = e;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);

        rafRef.current = requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect();
          const x = clientX - rect.left;
          const y = clientY - rect.top;

          el.style.setProperty("--mx", `${x}px`);
          el.style.setProperty("--my", `${y}px`);
          el.style.setProperty("--active", "1");

          if (!border) return;

          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const target =
            (180 * Math.atan2(y - cy, x - cx)) / Math.PI + 90;
          const current = angleRef.current;
          const diff = ((target - current + 180) % 360) - 180;
          const next = current + diff;

          animRef.current?.stop();
          animRef.current = animate(current, next, {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
              angleRef.current = v;
              el.style.setProperty("--start", String(v));
            },
          });
        });
      },
      [border]
    );

    const deactivate = useCallback(() => {
      frameRef.current?.style.setProperty("--active", "0");
    }, []);

    return (
      <div
        ref={(node) => {
          frameRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        onPointerMove={disabled ? undefined : track}
        onPointerLeave={disabled ? undefined : deactivate}
        className={cn("group/gf relative isolate", className)}
        {...props}
      >
        {children}

        {!disabled && interior && (
          <div
            aria-hidden
            data-glow="interior"
            className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/gf:opacity-100"
            style={{
              background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), ${interiorColor}, transparent 70%)`,
              filter: "blur(24px)",
            }}
          />
        )}

        {!disabled && border && (
          <div
            aria-hidden
            data-glow="border"
            className="pointer-events-none absolute inset-0 z-[2] overflow-hidden rounded-[inherit]"
            style={
              {
                "--spread": spread,
                "--start": "0",
                "--active": 0,
                "--gf-border-width": `${borderWidth}px`,
                "--repeating-conic-gradient-times": "5",
                "--gradient": `radial-gradient(circle, #d4a800 10%, #d4a80000 20%),
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
          >
            <div
              className={cn(
                "glow",
                "rounded-[inherit]",
                'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--gf-border-width))]',
                "after:[border:var(--gf-border-width)_solid_transparent]",
                "after:[background:var(--gradient)] after:[background-attachment:fixed]",
                "after:opacity-[var(--active)] after:transition-opacity after:duration-500",
                "after:[mask-clip:padding-box,border-box]",
                "after:[mask-composite:intersect]",
                "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
              )}
            />
          </div>
        )}
      </div>
    );
  }
);

GlowFrame.displayName = "GlowFrame";

export { GlowFrame };
