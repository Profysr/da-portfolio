"use client";

import React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { IconLoader2 } from "@tabler/icons-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  magneticStrength?: number;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface MagneticLinkProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  magneticStrength?: number;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href: string;
}

function cloneIcon(icon: React.ReactNode, size: number): React.ReactNode {
  if (typeof icon === "object" && icon !== null && "type" in icon) {
    const element = icon as React.ReactElement<{
      width?: number;
      height?: number;
      style?: React.CSSProperties;
    }>;
    return React.cloneElement(element, {
      width: size,
      height: size,
      style: { width: size, height: size, ...element.props.style },
    });
  }
  return icon;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
  xl: "px-10 py-5 text-xl gap-3",
};

const variantClasses = {
  default:
    "bg-accent text-accent-foreground hover:bg-accent/90 border border-transparent",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-canvas-muted hover:border-border",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:bg-canvas-muted",
  accent:
    "bg-accent text-accent-foreground hover:bg-accent/90 border border-transparent shadow-[0_2px_0_0_rgb(59,59,59)]",
};

export function MagneticButton({
  children,
  className,
  variant = "default",
  size = "md",
  icon,
  iconPosition = "right",
  magneticStrength = 0.15,
  fullWidth = false,
  loading = false,
  onClick,
}: MagneticButtonProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const childSpringX = useSpring(x, {
    ...springConfig,
    stiffness: 200,
    damping: 20,
  });
  const childSpringY = useSpring(y, {
    ...springConfig,
    stiffness: 200,
    damping: 20,
  });

  const iconSize =
    size === "sm" ? 16 : size === "md" ? 18 : size === "lg" ? 20 : 22;

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * magneticStrength);
    y.set((e.clientY - top - height / 2) * magneticStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const iconComponent = icon ? cloneIcon(icon, iconSize) : null;

  return (
    <motion.button
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-lg border transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      disabled={loading}
      onClick={onClick}
    >
      <motion.div
        className="flex items-center gap-inherit pointer-events-none"
        style={{ x: childSpringX, y: childSpringY }}
      >
        {loading ? (
          <IconLoader2 className="animate-spin text-current" size={iconSize} />
        ) : (
          <>
            {iconPosition === "left" && iconComponent}
            <span className="relative z-10">{children}</span>
            {iconPosition === "right" && iconComponent}
          </>
        )}
      </motion.div>
    </motion.button>
  );
}

export function MagneticLink({
  children,
  className,
  variant = "default",
  size = "md",
  icon,
  iconPosition = "right",
  magneticStrength = 0.15,
  fullWidth = false,
  onClick,
  href,
}: MagneticLinkProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const childSpringX = useSpring(x, {
    ...springConfig,
    stiffness: 200,
    damping: 20,
  });
  const childSpringY = useSpring(y, {
    ...springConfig,
    stiffness: 200,
    damping: 20,
  });

  const iconSize =
    size === "sm" ? 16 : size === "md" ? 18 : size === "lg" ? 20 : 22;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) * magneticStrength);
    y.set((e.clientY - top - height / 2) * magneticStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const iconComponent = icon ? cloneIcon(icon, iconSize) : null;

  return (
    <motion.a
      href={href}
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-lg border transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
    >
      <motion.div
        className="flex items-center gap-inherit pointer-events-none"
        style={{ x: childSpringX, y: childSpringY }}
      >
        {iconPosition === "left" && iconComponent}
        <span className="relative z-10">{children}</span>
        {iconPosition === "right" && iconComponent}
      </motion.div>
    </motion.a>
  );
}
