"use client";

import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { GlowFrame } from "@/components/ui/GlowFrame";

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
    <GlowFrame
      // disabled={disableGlow}
      className={cn(
        "relative flex flex-col justify-between rounded-md border border-border bg-surface/10 backdrop-blur-md p-4 md:p-5",
        className,
      )}
      {...props}
    >
      {/* Background Graphic Layer */}
      {bgImage && (
        <Image
          src={bgImage}
          alt=""
          aria-hidden="true"
          fill
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full select-none z-0",
            bgClassName,
          )}
          sizes="100vw"
          priority={false}
        />
      )}

      {background && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {background}
        </div>
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
    </GlowFrame>
  );
};

export { BentoCard, BentoGrid };
