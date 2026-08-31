import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type FC,
} from "react";

import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto inline-block max-w-md",

        // 1. Clip gradient to text & set transparent text fill
        "bg-clip-text text-transparent",

        // 2. Standard CSS / Tailwind properties for background sizing & positioning
        "animate-shiny-text [background-position:0_0] [background-size:var(--shiny-width)_100%] bg-no-repeat",

        // 3. Define base text color -> bright shine -> base text color
        "bg-gradient-to-r from-neutral-500/70 via-neutral-950 via-50% to-neutral-500/70 dark:from-neutral-400/60 dark:via-white dark:to-neutral-400/60",

        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
