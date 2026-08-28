"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MagneticDockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string;
}

interface MagneticDockProps {
  items: MagneticDockItem[];
  className?: string;
  position?: "bottom" | "top" | "left" | "right";
  magneticStrength?: number;
  itemSize?: number;
  gap?: number;
  backgroundColor?: string;
  borderColor?: string;
  activeItem?: string;
  onItemClick?: (item: MagneticDockItem) => void;
  showLabels?: boolean;
  labelPosition?: "inside" | "outside";
}

function cloneIcon(icon: React.ReactNode, size: number, color?: string): React.ReactNode {
  if (typeof icon === "object" && icon !== null && "type" in icon) {
    const element = icon as React.ReactElement<{ width?: number; height?: number; color?: string; style?: React.CSSProperties }>;
    return React.cloneElement(element, {
      width: size,
      height: size,
      ...(color && { color }),
      style: { width: size, height: size, ...element.props.style },
    });
  }
  return icon;
}

export function MagneticDock({
  items,
  className,
  position = "bottom",
  magneticStrength = 0.4,
  itemSize = 56,
  gap = 8,
  backgroundColor = "var(--surface)",
  borderColor = "var(--border)",
  activeItem,
  onItemClick,
  showLabels = false,
  labelPosition = "outside",
}: MagneticDockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isHorizontal = position === "bottom" || position === "top";

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = dock.getBoundingClientRect();
      if (isHorizontal) {
        setMousePosition({
          x: e.clientX - rect.left - rect.width / 2,
          y: 0,
        });
      } else {
        setMousePosition({
          x: 0,
          y: e.clientY - rect.top - rect.height / 2,
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition(null);
      setHoveredIndex(null);
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseenter", handleMouseEnter);
    dock.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseenter", handleMouseEnter);
      dock.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHorizontal]);

  const positionStyles = {
    bottom: { bottom: 0, left: "50%", transform: "translateX(-50%)", flexDirection: "row" as const },
    top: { top: 0, left: "50%", transform: "translateX(-50%)", flexDirection: "row" as const },
    left: { left: 0, top: "50%", transform: "translateY(-50%)", flexDirection: "column" as const },
    right: { right: 0, top: "50%", transform: "translateY(-50%)", flexDirection: "column" as const },
  };

  const dockStyle = positionStyles[position];

  return (
    <motion.div
      ref={dockRef}
      className={cn(
        "fixed z-50 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        className
      )}
      style={{
        ...dockStyle,
        backgroundColor,
        borderColor,
        borderWidth: "1px",
        gap,
        padding: isHorizontal ? "0.75rem 1rem" : "1rem 0.75rem",
      }}
      initial={{ opacity: 0, y: position === "bottom" ? 30 : position === "top" ? -30 : 0, x: position === "left" ? -30 : position === "right" ? 30 : 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setHoveredIndex(null); }}
    >
      {items.map((item, index) => {
        const isActive = activeItem === item.id;
        const isHovered = hoveredIndex === index;
        
        const itemCenter = index * (itemSize + gap) - (items.length - 1) * (itemSize + gap) / 2;
        const distance = isHorizontal 
          ? Math.abs((mousePosition?.x || 0) - itemCenter)
          : Math.abs((mousePosition?.y || 0) - itemCenter);
        
        const maxDistance = itemSize * 2.5;
        const influence = Math.max(0, 1 - distance / maxDistance);
        const scale = 1 + influence * 0.35;
        const translate = isHorizontal
          ? influence * magneticStrength * ((mousePosition?.x || 0) - itemCenter) * 0.3
          : 0;
        const translateY = !isHorizontal
          ? influence * magneticStrength * ((mousePosition?.y || 0) - itemCenter) * 0.3
          : 0;

        const iconColor = isActive ? "var(--accent-foreground)" : "currentColor";

        const handleClick = (e: React.MouseEvent) => {
          if (!item.href) e.preventDefault();
          if (!item.disabled) onItemClick?.(item);
        };

        return (
          <motion.div
            key={item.id}
            style={{
              transform: `translate(${translate}px, ${translateY}px) scale(${scale})`,
              zIndex: isHovered || isActive ? 10 : 5,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onMouseEnter={() => !item.disabled && setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {item.href ? (
              <motion.a
                href={item.href}
                onClick={handleClick}
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-xl border transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  "disabled:opacity-50 disabled:pointer-events-none",
                  isActive && "bg-accent/10 border-accent/30",
                  !isActive && "bg-canvas-muted border-border/50 hover:bg-canvas-muted/80 hover:border-border",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                style={{
                  width: itemSize,
                  height: itemSize,
                }}
                whileTap={{ scale: 0.9 }}
                initial={false}
                animate={{
                  backgroundColor: isActive ? "var(--accent-muted)" : "transparent",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                }}
              >
                <motion.div
                  className={cn(
                    "flex items-center justify-center rounded-lg transition-all duration-200",
                    isActive ? "bg-accent text-accent-foreground" : "text-foreground"
                  )}
                  style={{ width: itemSize - 16, height: itemSize - 16 }}
                  initial={false}
                  animate={{ scale: scale }}
                >
                  {cloneIcon(item.icon, 22, iconColor)}
                </motion.div>

                {item.badge && (
                  <motion.span
                    className="absolute -top-1 -right-1 min-w-[18px] h-5 px-1.5 text-[10px] font-bold text-accent-foreground bg-accent rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {item.badge}
                  </motion.span>
                )}

                {showLabels && labelPosition === "inside" && (
                  <motion.span
                    className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground opacity-0"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.a>
            ) : (
              <motion.button
                onClick={handleClick}
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-xl border transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  "disabled:opacity-50 disabled:pointer-events-none",
                  isActive && "bg-accent/10 border-accent/30",
                  !isActive && "bg-canvas-muted border-border/50 hover:bg-canvas-muted/80 hover:border-border",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                style={{
                  width: itemSize,
                  height: itemSize,
                }}
                whileTap={{ scale: 0.9 }}
                initial={false}
                animate={{
                  backgroundColor: isActive ? "var(--accent-muted)" : "transparent",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                }}
                disabled={item.disabled}
              >
                <motion.div
                  className={cn(
                    "flex items-center justify-center rounded-lg transition-all duration-200",
                    isActive ? "bg-accent text-accent-foreground" : "text-foreground"
                  )}
                  style={{ width: itemSize - 16, height: itemSize - 16 }}
                  initial={false}
                  animate={{ scale: scale }}
                >
                  {cloneIcon(item.icon, 22, iconColor)}
                </motion.div>

                {item.badge && (
                  <motion.span
                    className="absolute -top-1 -right-1 min-w-[18px] h-5 px-1.5 text-[10px] font-bold text-accent-foreground bg-accent rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    {item.badge}
                  </motion.span>
                )}

                {showLabels && labelPosition === "inside" && (
                  <motion.span
                    className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground opacity-0"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            )}

            {showLabels && labelPosition === "outside" && (
              <motion.div
                className={cn(
                  "absolute whitespace-nowrap text-sm font-medium text-foreground transition-all duration-200",
                  isHorizontal
                    ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
                    : position === "left"
                    ? "left-full top-1/2 -translate-y-1/2 ml-2"
                    : "right-full top-1/2 -translate-y-1/2 mr-2"
                )}
                initial={{ opacity: 0, x: isHorizontal ? 0 : position === "left" ? -10 : 10, y: isHorizontal ? 10 : 0 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  x: isHovered ? 0 : (isHorizontal ? 0 : position === "left" ? -10 : 10),
                  y: isHovered ? 0 : (isHorizontal ? 10 : 0)
                }}
              >
                <span className="px-2 py-1 bg-surface border border-border rounded-lg shadow-lg">
                  {item.label}
                </span>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}