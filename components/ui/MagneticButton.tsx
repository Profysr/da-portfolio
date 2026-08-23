"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

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

function cloneIcon(icon: React.ReactNode, size: number): React.ReactNode {
  if (typeof icon === "object" && icon !== null && "type" in icon) {
    const element = icon as React.ReactElement<{ width?: number; height?: number; style?: React.CSSProperties }>;
    return React.cloneElement(element, {
      width: size,
      height: size,
      style: { width: size, height: size, ...element.props.style },
    });
  }
  return icon;
}

export function MagneticButton({
  children,
  className,
  variant = "default",
  size = "md",
  icon,
  iconPosition = "right",
  magneticStrength = 0.3,
  fullWidth = false,
  loading = false,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
    xl: "px-10 py-5 text-xl gap-3",
  };

  const variantClasses = {
    default: "bg-accent text-accent-foreground hover:bg-accent/90 border border-transparent",
    outline: "bg-transparent text-foreground border border-border hover:bg-canvas-muted hover:border-border",
    ghost: "bg-transparent text-foreground border border-transparent hover:bg-canvas-muted",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 border border-transparent shadow-[0_2px_0_0_rgb(59,59,59)]",
  };

  const iconSize = size === "sm" ? 16 : size === "md" ? 18 : size === "lg" ? 20 : 22;

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition(null);
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const magneticTransform = mousePosition && isHovering && !loading
    ? `translate(${mousePosition.x * magneticStrength}px, ${mousePosition.y * magneticStrength}px)`
    : "translate(0, 0)";

  const iconComponent = icon ? cloneIcon(icon, iconSize) : null;

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-xl border transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      style={{ transform: magneticTransform, willChange: "transform" }}
      initial={false}
      animate={{
        transform: magneticTransform,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      }}
      whileTap={{ scale: 0.96 }}
      disabled={loading}
      onClick={onClick}
    >
      {loading ? (
        <motion.svg
          className="animate-spin"
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={false}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
        </motion.svg>
      ) : (
        <>
          {iconPosition === "left" && iconComponent}
          <span className="relative z-10">{children}</span>
          {iconPosition === "right" && iconComponent}
        </>
      )}
    </motion.button>
  );
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

export function MagneticLink({
  children,
  className,
  variant = "default",
  size = "md",
  icon,
  iconPosition = "right",
  magneticStrength = 0.3,
  fullWidth = false,
  onClick,
  href,
}: MagneticLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
    xl: "px-10 py-5 text-xl gap-3",
  };

  const variantClasses = {
    default: "bg-accent text-accent-foreground hover:bg-accent/90 border border-transparent",
    outline: "bg-transparent text-foreground border border-border hover:bg-canvas-muted hover:border-border",
    ghost: "bg-transparent text-foreground border border-transparent hover:bg-canvas-muted",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 border border-transparent shadow-[0_2px_0_0_rgb(59,59,59)]",
  };

  const iconSize = size === "sm" ? 16 : size === "md" ? 18 : size === "lg" ? 20 : 22;

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = link.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition(null);
    };

    link.addEventListener("mousemove", handleMouseMove);
    link.addEventListener("mouseenter", handleMouseEnter);
    link.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      link.removeEventListener("mousemove", handleMouseMove);
      link.removeEventListener("mouseenter", handleMouseEnter);
      link.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const magneticTransform = mousePosition && isHovering
    ? `translate(${mousePosition.x * magneticStrength}px, ${mousePosition.y * magneticStrength}px)`
    : "translate(0, 0)";

  const iconComponent = icon ? cloneIcon(icon, iconSize) : null;

  return (
    <motion.a
      ref={linkRef}
      href={href}
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-xl border transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      style={{ transform: magneticTransform, willChange: "transform" }}
      initial={false}
      animate={{
        transform: magneticTransform,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
    >
      {iconPosition === "left" && iconComponent}
      <span className="relative z-10">{children}</span>
      {iconPosition === "right" && iconComponent}
    </motion.a>
  );
}