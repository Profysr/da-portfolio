"use client";

import React from "react";
import {
  IconSparkles,
  IconCpu,
  IconRobot,
  IconHierarchy,
  IconCheck,
} from "@tabler/icons-react";
import { Marquee } from "@/components/ui/marquee";
import { BorderBeam } from "@/components/ui/border-beam";
import { favoriteStack } from "@/data/idx";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";


const FALLBACK_ICONS = {
  n8n: IconRobot,
  "Custom MCPs": IconCpu,
  Microservices: IconHierarchy,
};

export function FavoriteStack({ variant = "compact", className = "" }) {
  const items = favoriteStack.items || [];

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "relative flex items-center w-full max-w-xl overflow-hidden rounded-lg p-2 border border-border bg-surface/80 backdrop-blur-md shadow-xs",
          // Fade masks on left and right edges
          "before:absolute before:left-0 before:z-10 before:h-full before:w-10 before:bg-linear-to-r before:from-surface/90 before:to-transparent",
          "after:absolute after:right-0 after:z-10 after:h-full after:w-10 after:bg-linear-to-l after:from-surface/90 after:to-transparent",
          className
        )}
      >
        <Marquee
          pauseOnHover
          repeat={4}
          className="p-0 [--gap:0.75rem] [--duration:22s]"
        >
          {items.map((item) => {
            const FallbackIcon = FALLBACK_ICONS[item.name] || IconSparkles;
            return (
              <button
                key={item.name}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-transparent hover:border-primary/30 transition-all duration-200 cursor-default shrink-0"
              >
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="size-5 object-contain shrink-0"
                  />
                ) : (
                  <FallbackIcon className="size-5 text-primary shrink-0" />
                )}
                <span className="text-[11px] font-medium text-zinc-200 whitespace-nowrap">
                  {item.name}
                </span>
              </button>
            );
          })}
        </Marquee>
      </div>
    );
  }

  // Detailed Callout Card (for TechStack section)
  return (
    <div
      className={cn(
        "relative w-full sm:max-w-3xl rounded-md border border-primary/30 bg-surface p-4 sm:p-5 flex flex-col gap-3.5 shadow-lg overflow-hidden",
        className
      )}
    >
      {/* Animated scanning border beam */}
      <BorderBeam
        colorFrom="#FFDA27"
        colorTo="transparent"
        duration={8}
        size={140}
        borderWidth={1.5}
      />
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded bg-primary/20 text-primary shrink-0">
            <IconSparkles className="size-6" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-white uppercase tracking-wider block">
              {favoriteStack.title}
            </span>
            <span className="text-xs text-muted-foreground">
              {favoriteStack.subtitle}
            </span>
          </div>
        </div>

        <Badge variant="lightSuccess">
          <IconCheck className="size-3" />
          <span>{favoriteStack.tag || "Production Tested"}</span>
        </Badge>
      </div>

      {/* Grid of Daily Driver Badges with Logos */}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const FallbackIcon = FALLBACK_ICONS[item.name] || IconSparkles;
          return (
            <div
              key={item.name}
              className="inline-flex items-center gap-2 rounded border border-border bg-surface-high/60 px-3 py-1.5 text-xs text-zinc-100 hover:border-primary/40 hover:bg-surface-high transition-all"
            >
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.name}
                  className="size-5 object-contain shrink-0"
                />
              ) : (
                <FallbackIcon className="size-5 text-primary shrink-0" />
              )}
              <span className="font-semibold text-xs text-white">{item.name}</span>
              {item.role && (
                <span className="hidden md:flex text-[10px] text-muted-foreground/80 font-mono border-l border-border pl-1.5">
                  {item.role}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoriteStack;
