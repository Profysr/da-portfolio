"use client";

import React from "react";
import { motion } from "motion/react";
import { IconSparkles, IconCheck } from "@tabler/icons-react";
import { Marquee } from "@/components/ui/marquee";
import { BorderBeam } from "@/components/ui/border-beam";
import { favoriteStack } from "@/data/idx";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TechPill } from "@/components/TechPill";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function FavoriteStack({ variant = "compact", className = "" }) {
  const items = favoriteStack.items || [];

  if (variant === "compact") {
    return (
      <ScrollReveal
        variant="slide-up"
        delay={0}
        duration={0.6}
        once={false}
        className={cn(
          "relative flex items-center w-full max-w-xl overflow-hidden rounded-lg p-2 border border-border bg-surface/80 backdrop-blur-md shadow-xs",
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
          {items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              <TechPill
                name={item.name}
                subCategory={item.role ?? undefined}
                size="sm"
              />
            </motion.div>
          ))}
        </Marquee>
      </ScrollReveal>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full sm:max-w-3xl rounded-md border border-primary/30 bg-surface p-4 sm:p-5 flex flex-col gap-3.5 shadow-lg overflow-hidden",
        className
      )}
    >
      <BorderBeam
        colorFrom="#FFDA27"
        colorTo="transparent"
        duration={8}
        size={140}
        borderWidth={1.5}
      />
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

      <ScrollReveal
        variant="slide-up"
        delay={0.2}
        duration={0.6}
        once={false}
        className="flex flex-wrap gap-2"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <TechPill
              name={item.name}
              subCategory={item.role ?? undefined}
              size="md"
            />
          </motion.div>
        ))}
      </ScrollReveal>
    </div>
  );
}

export default FavoriteStack;