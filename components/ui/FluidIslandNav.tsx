"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

interface FluidIslandNavProps {
  items: NavItem[];
  className?: string;
  position?: "top" | "bottom";
  activeItem?: string;
  onItemClick?: (item: NavItem) => void;
  variant?: "default" | "pill" | "minimal" | "glass";
  showIndicators?: boolean;
  fluidAnimation?: boolean;
  magneticStrength?: number;
}

function cloneIcon(icon: React.ReactNode, color?: string, size?: number): React.ReactNode {
  if (typeof icon === "object" && icon !== null && "type" in icon) {
    const element = icon as React.ReactElement;
    return React.cloneElement(element, {
      ...(color && { color }),
      ...(size && { width: size, height: size }),
    });
  }
  return icon;
}

export function FluidIslandNav({
  items,
  className,
  position = "bottom",
  activeItem,
  onItemClick,
  variant = "default",
  showIndicators = true,
  fluidAnimation = true,
  magneticStrength = 0.3,
}: FluidIslandNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [itemPositions, setItemPositions] = useState<Record<string, { left: number; width: number }>>({});

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measureItems = () => {
      const positions: Record<string, { left: number; width: number }> = {};
      items.forEach((item) => {
        const element = nav.querySelector(`[data-nav-item="${item.id}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          const navRect = nav.getBoundingClientRect();
          positions[item.id] = {
            left: rect.left - navRect.left,
            width: rect.width,
          };
        }
      });
      setItemPositions(positions);
    };

    measureItems();
    const observer = new ResizeObserver(measureItems);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition(null);
      setHoveredIndex(null);
    };

    nav.addEventListener("mousemove", handleMouseMove);
    nav.addEventListener("mouseenter", handleMouseEnter);
    nav.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
      nav.removeEventListener("mouseenter", handleMouseEnter);
      nav.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const variantStyles = {
    default: "bg-surface/80 border border-border/50 backdrop-blur-xl shadow-xl",
    pill: "bg-canvas-muted border border-border/30 backdrop-blur-xl shadow-lg",
    minimal: "bg-transparent border-none shadow-none",
    glass: "bg-surface/60 border border-border/30 backdrop-blur-2xl shadow-2xl",
  };

  const activePosition = activeItem && itemPositions[activeItem]
    ? itemPositions[activeItem]
    : null;

  return (
    <motion.nav
      ref={navRef}
      className={cn(
        "relative flex items-center justify-center gap-1 px-2 py-1.5 rounded-2xl",
        "transition-all duration-300 ease-out",
        variantStyles[variant],
        className
      )}
      style={{ position: position === "top" ? "sticky" : "relative", top: position === "top" ? 0 : undefined, zIndex: 50 }}
      initial={{ opacity: 0, y: position === "bottom" ? 30 : -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setHoveredIndex(null); }}
    >
      {fluidAnimation && activePosition && showIndicators && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem}
            className="absolute top-1.5 bottom-1.5 z-0 rounded-xl bg-accent shadow-[0_2px_0_0_rgb(59,59,59),0_4px_12px_-2px_rgb(59,59,59,0.3)]"
            style={{
              left: activePosition.left,
              width: activePosition.width,
            }}
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 0.8,
            }}
          />
        </AnimatePresence>
      )}

      {items.map((item, index) => {
        const itemPos = itemPositions[item.id];
        const isActive = activeItem === item.id;
        const isHovered = hoveredIndex === index;
        
        let magneticX = 0;
        let magneticScale = 1;
        
        if (fluidAnimation && mousePosition && isHovering && itemPos) {
          const itemCenter = itemPos.left + itemPos.width / 2;
          const distance = Math.abs(mousePosition.x - itemCenter);
          const maxDistance = itemPos.width * 2;
          const influence = Math.max(0, 1 - distance / maxDistance);
          magneticScale = 1 + influence * 0.2;
          magneticX = influence * magneticStrength * (mousePosition.x - itemCenter) * 0.2;
        }

        const iconColor = isActive 
          ? "var(--accent-foreground)" 
          : isHovered 
            ? "var(--foreground)" 
            : "var(--muted-foreground)";

        return (
          <motion.div
            key={item.id}
            data-nav-item={item.id}
            style={{
              transform: `translateX(${magneticX}px) scale(${magneticScale})`,
              zIndex: isActive || isHovered ? 10 : 5,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onMouseEnter={() => !item.disabled && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {item.href ? (
              <motion.a
                href={item.href}
                onClick={(e) => {
                  if (!item.disabled) onItemClick?.(item);
                }}
                className={cn(
                  "relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl",
                  "font-medium text-sm transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  "disabled:opacity-50 disabled:pointer-events-none",
                  isActive
                    ? "text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                  item.disabled && "cursor-not-allowed"
                )}
                style={{
                  minWidth: itemPos?.width || undefined,
                }}
                whileTap={{ scale: 0.96 }}
                initial={false}
                animate={{
                  color: iconColor,
                }}
              >
                {item.icon && (
                  <motion.span
                    className="flex-shrink-0"
                    style={{ width: 18, height: 18 }}
                    initial={false}
                    animate={{ color: iconColor }}
                  >
                    {cloneIcon(item.icon, iconColor, 18)}
                  </motion.span>
                )}
                <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <motion.span
                    className={cn(
                      "flex-shrink-0 min-w-[18px] h-5 px-1.5 text-[10px] font-bold rounded-full flex items-center justify-center",
                      isActive
                        ? "bg-accent-foreground/20 text-accent-foreground"
                        : "bg-accent/10 text-accent"
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.a>
            ) : (
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  if (!item.disabled) onItemClick?.(item);
                }}
                className={cn(
                  "relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl",
                  "font-medium text-sm transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  "disabled:opacity-50 disabled:pointer-events-none",
                  isActive
                    ? "text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                  item.disabled && "cursor-not-allowed"
                )}
                style={{
                  minWidth: itemPos?.width || undefined,
                }}
                whileTap={{ scale: 0.96 }}
                initial={false}
                animate={{
                  color: iconColor,
                }}
                disabled={item.disabled}
              >
                {item.icon && (
                  <motion.span
                    className="flex-shrink-0"
                    style={{ width: 18, height: 18 }}
                    initial={false}
                    animate={{ color: iconColor }}
                  >
                    {cloneIcon(item.icon, iconColor, 18)}
                  </motion.span>
                )}
                <span className="relative z-10 whitespace-nowrap">{item.label}</span>
                {item.badge && (
                  <motion.span
                    className={cn(
                      "flex-shrink-0 min-w-[18px] h-5 px-1.5 text-[10px] font-bold rounded-full flex items-center justify-center",
                      isActive
                        ? "bg-accent-foreground/20 text-accent-foreground"
                        : "bg-accent/10 text-accent"
                    )}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {item.badge}
                  </motion.span>
                )}
              </motion.button>
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
}

interface FluidIslandNavWithContentProps {
  items: NavItem[];
  children: React.ReactNode | ((activeItem: string) => React.ReactNode);
  className?: string;
  position?: "top" | "bottom";
  defaultActiveItem?: string;
  onItemClick?: (item: NavItem) => void;
  variant?: "default" | "pill" | "minimal" | "glass";
  fluidAnimation?: boolean;
}

export function FluidIslandNavWithContent({
  items,
  children,
  className,
  position = "bottom",
  defaultActiveItem,
  onItemClick,
  variant = "default",
  fluidAnimation = true,
}: FluidIslandNavWithContentProps) {
  const [activeItem, setActiveItem] = useState(defaultActiveItem || items[0]?.id || "");

  const handleItemClick = (item: NavItem) => {
    setActiveItem(item.id);
    onItemClick?.(item);
  };

  const renderContent = typeof children === "function" ? children(activeItem) : children;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <FluidIslandNav
        items={items}
        position={position}
        activeItem={activeItem}
        onItemClick={handleItemClick}
        variant={variant}
        fluidAnimation={fluidAnimation}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeItem}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        >
          {renderContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

interface FloatingNavProps {
  items: NavItem[];
  className?: string;
  activeItem?: string;
  onItemClick?: (item: NavItem) => void;
  align?: "left" | "center" | "right";
  variant?: "default" | "pill" | "minimal";
}

export function FloatingNav({
  items,
  className,
  activeItem,
  onItemClick,
  align = "center",
  variant = "default",
}: FloatingNavProps) {
  const variantStyles = {
    default: "bg-surface/80 border border-border/50 backdrop-blur-xl shadow-xl",
    pill: "bg-canvas-muted border border-border/30 backdrop-blur-xl shadow-lg",
    minimal: "bg-transparent border-none shadow-none",
  };

  const alignStyles = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <motion.nav
      className={cn(
        "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-2xl",
        variantStyles[variant],
        alignStyles[align],
        className
      )}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
      {items.map((item) => {
        const isActive = activeItem === item.id;
        const iconColor = isActive ? "var(--accent-foreground)" : "currentColor";

        if (item.href) {
          return (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                if (!item.disabled) onItemClick?.(item);
              }}
              className={cn(
                "relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl",
                "font-medium text-sm transition-all duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                "disabled:opacity-50 disabled:pointer-events-none",
                isActive
                  ? "bg-accent text-accent-foreground shadow-[0_2px_0_0_rgb(59,59,59)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-canvas-muted",
                item.disabled && "cursor-not-allowed"
              )}
              whileTap={{ scale: 0.96 }}
            >
              {item.icon && (
                <span className="flex-shrink-0" style={{ width: 18, height: 18 }}>
                  {cloneIcon(item.icon, iconColor, 18)}
                </span>
              )}
              <span>{item.label}</span>
              {item.badge && (
                <span className={cn(
                  "flex-shrink-0 min-w-[18px] h-5 px-1.5 text-[10px] font-bold rounded-full flex items-center justify-center",
                  isActive
                    ? "bg-accent-foreground/20 text-accent-foreground"
                    : "bg-accent/10 text-accent"
                )}>
                  {item.badge}
                </span>
              )}
            </motion.a>
          );
        }

        return (
          <motion.button
            key={item.id}
            onClick={(e) => {
              e.preventDefault();
              if (!item.disabled) onItemClick?.(item);
            }}
            className={cn(
              "relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl",
              "font-medium text-sm transition-all duration-200 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              "disabled:opacity-50 disabled:pointer-events-none",
              isActive
                ? "bg-accent text-accent-foreground shadow-[0_2px_0_0_rgb(59,59,59)]"
                : "text-muted-foreground hover:text-foreground hover:bg-canvas-muted",
              item.disabled && "cursor-not-allowed"
            )}
            whileTap={{ scale: 0.96 }}
            disabled={item.disabled}
          >
            {item.icon && (
              <span className="flex-shrink-0" style={{ width: 18, height: 18 }}>
                {cloneIcon(item.icon, iconColor, 18)}
              </span>
            )}
            <span>{item.label}</span>
            {item.badge && (
              <span className={cn(
                "flex-shrink-0 min-w-[18px] h-5 px-1.5 text-[10px] font-bold rounded-full flex items-center justify-center",
                isActive
                  ? "bg-accent-foreground/20 text-accent-foreground"
                  : "bg-accent/10 text-accent"
              )}>
                {item.badge}
              </span>
            )}
          </motion.button>
        );
      })}
    </motion.nav>
  );
}