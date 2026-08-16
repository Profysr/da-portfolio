"use client";

import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  title?: ReactNode;
  subtitle?: ReactNode;
  Icon?: React.ElementType;
  badge?: ReactNode;
  headerExtra?: ReactNode;
  background?: ReactNode;
  bgImage?: string;
  bgClassName?: string;
  className?: string;
  children?: ReactNode;
  disableGlow?: boolean;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  title,
  subtitle,
  Icon,
  badge,
  headerExtra,
  background,
  bgImage,
  bgClassName = "opacity-15 object-cover",
  className,
  children,
  disableGlow = false,
  ...props
}: BentoCardProps) => {
  return (
    <div
      className={cn(
        "group/glow relative flex flex-col justify-between overflow-hidden rounded-md border border-white/10 bg-white/2 backdrop-blur-md p-4 sm:p-5 md:p-5.5 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.035] hover:shadow-[0_0_24px_rgba(208,188,255,0.05)]",
        className
      )}
      {...props}
    >
      {/* Background Graphic Layer */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full select-none z-0",
            bgClassName
          )}
        />
      )}
      {background && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {background}
        </div>
      )}

      {/* Proximity & Cursor Glow Effects */}
      {!disableGlow && (
        <>
          <GlowingEffect
            spread={30}
            proximity={45}
            glow={true}
            disabled={false}
            borderWidth={1}
          />
          <SpotlightGlow size={280} color="rgba(208, 188, 255, 0.10)" />
        </>
      )}

      {/* Card Content & Header Slots */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {(title || Icon || badge || headerExtra) && (
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              {Icon && (
                <span className="p-1 rounded-md bg-primary/10 border border-primary/20 text-primary shrink-0">
                  <Icon />
                </span>
              )}
              <div>
                {title && (
                  <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-white text-left">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-[11px] text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-primary/80 font-mono">
                  {badge}
                </span>
              )}
              {headerExtra}
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export { BentoCard, BentoGrid };
