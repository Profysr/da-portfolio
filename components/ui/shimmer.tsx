"use client";

import { cn } from "@/lib/utils";
import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import type { CSSProperties, ElementType, JSX } from "react";
import { memo, useMemo } from "react";

type MotionHTMLProps = MotionProps & Record<string, unknown>;

const motionComponentCache = new Map<
  keyof JSX.IntrinsicElements,
  React.ComponentType<MotionHTMLProps>
>();

const getMotionComponent = (element: keyof JSX.IntrinsicElements) => {
  let component = motionComponentCache.get(element);
  if (!component) {
    component = motion.create(element);
    motionComponentCache.set(element, component);
  }
  return component;
};

export interface TextShimmerProps {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  spread?: number;
  /** Primary text color when not shimmering (Default: muted white) */
  baseColor?: string;
  /** High contrast highlight color that passes over the text (Default: full white) */
  shimmerColor?: string;
}

const ShimmerComponent = ({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2,
  baseColor = "rgba(255, 255, 255, 0.45)",
  shimmerColor = "#ffffff",
}: TextShimmerProps) => {
  const MotionComponent = getMotionComponent(
    Component as keyof JSX.IntrinsicElements,
  );

  const dynamicSpread = useMemo(
    () => Math.max(children?.length ?? 0, 10) * spread,
    [children, spread],
  );

  return (
    <MotionComponent
      animate={{ backgroundPosition: "-200% 0" }}
      initial={{ backgroundPosition: "200% 0" }}
      className={cn(
        "relative inline-block bg-clip-text text-transparent [background-size:200%_100%]",
        className,
      )}
      style={
        {
          "--spread": `${dynamicSpread}px`,
          backgroundImage: `linear-gradient(
            90deg, 
            ${baseColor} 0%, 
            ${baseColor} calc(50% - var(--spread)), 
            ${shimmerColor} 50%, 
            ${baseColor} calc(50% + var(--spread)), 
            ${baseColor} 100%
          )`,
        } as CSSProperties
      }
      transition={{
        duration,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      {children}
    </MotionComponent>
  );
};

export const Shimmer = memo(ShimmerComponent);
