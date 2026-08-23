"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  radius?: number;
  color?: string;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

export function SpotlightCard({
  children,
  className,
  intensity = 0.15,
  radius = 300,
  color = "var(--accent)",
  hoverable = true,
  padding = "md",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition(null);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const spotlightStyle = mousePosition && isHovering ? {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')} 0%, transparent ${radius}px)`,
  } : {};

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl bg-surface border border-border overflow-hidden transition-all duration-300 ease-out",
        paddingClasses[padding],
        hoverable && "hover:shadow-[0_2px_0_0_rgb(59,59,59),0_20px_50px_-8px_rgb(0,0,0,0.12)] hover:-translate-y-1",
        className
      )}
      initial={false}
      whileHover={hoverable ? { y: -4, transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] } } : undefined}
      style={spotlightStyle as React.CSSProperties}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface SpotlightProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
  featured?: boolean;
  width?: number;
  height?: number;
}

export function SpotlightProjectCard({
  title,
  description,
  tags,
  image,
  imageAlt,
  href,
  className,
  featured = false,
  width = 600,
  height = 400,
}: SpotlightProjectCardProps) {
  return (
    <SpotlightCard intensity={featured ? 0.2 : 0.12} radius={featured ? 400 : 300} className={className}>
      {image && (
        <div className="relative aspect-video mb-6 overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={imageAlt || title}
            width={width}
            height={height}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {featured && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                Featured
              </span>
            </div>
          )}
        </div>
      )}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground tracking-tight text-wrap-balance">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-wrap-balance">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-canvas-muted text-muted-foreground border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
        {href && (
          <motion.a
            href={href}
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            whileHover={{ x: 4 }}
          >
            View Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        )}
      </div>
    </SpotlightCard>
  );
}