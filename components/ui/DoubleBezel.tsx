"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface DoubleBezelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "subtle";
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export function DoubleBezel({
  children,
  className,
  variant = "default",
  hoverable = false,
  padding = "md",
}: DoubleBezelProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const variantClasses = {
    default: "bg-surface border border-border shadow-double-bezel",
    elevated: "bg-surface border border-border shadow-[0_2px_0_0_rgb(59,59,59),0_8px_30px_-4px_rgb(0,0,0,0.08)]",
    subtle: "bg-canvas-muted border border-border/50 shadow-sm",
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-300 ease-out",
        variantClasses[variant],
        paddingClasses[padding],
        hoverable && "hover:shadow-[0_2px_0_0_rgb(59,59,59),0_12px_40px_-4px_rgb(0,0,0,0.12)] hover:-translate-y-1",
        className
      )}
      initial={false}
      whileHover={hoverable ? { y: -4, transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] } } : undefined}
    >
      <div className="absolute inset-0 border border-border/30 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface DoubleBezelCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  image?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
}

export function DoubleBezelCard({
  children,
  className,
  hoverable = true,
  image,
  imageAlt,
  width = 600,
  height = 400,
}: DoubleBezelCardProps) {
  return (
    <DoubleBezel variant="default" hoverable={hoverable} padding="none" className={className}>
      {image && (
        <div className="aspect-video overflow-hidden">
          <Image
            src={image}
            alt={imageAlt || ""}
            width={width}
            height={height}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">{children}</div>
    </DoubleBezel>
  );
}