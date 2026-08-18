"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSparkles,
  IconCpu,
  IconServer,
  IconBrandReact,
  IconCloud,
  IconCheck,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { SkillsAndTools, favoriteStack } from "@/data/idx";
import { FavoriteStack } from "@/components/FavoriteStack";

const CATEGORY_ICONS = {
  "Automations & AI": IconCpu,
  "Engineering & Backend": IconServer,
  "Platforms & Cloud": IconCloud,
  "Conceptual & Design": IconBrandReact,
};

export function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...SkillsAndTools.map((cat) => cat.category)];

  const displayedCategories =
    selectedCategory === "All"
      ? SkillsAndTools
      : SkillsAndTools.filter((cat) => cat.category === selectedCategory);

  return (
    <Section id="stack" noFade className="py-10 md:py-16">
      <Layout>
        <div className="flex flex-col items-center gap-7">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-2.5">
            <Badge variant="outline">ARSENAL & TOOLS</Badge>
            <GradientHeading
              text="Technologies & Stack"
              className="text-3xl! sm:text-5xl!"
            />
            <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
              Production tools, runtimes, and agentic orchestration frameworks I use to build scalable systems.
            </p>
          </div>

          {/* Daily Drivers Callout Strip Component */}
          <FavoriteStack variant="detailed" />

          {/* Category Filter Pills — Responsive Wrap without broken oval border */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full max-w-2xl">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "bg-surface border border-border text-muted-foreground hover:text-white hover:border-primary/40 hover:bg-surface-high"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Categorized Tech Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <AnimatePresence mode="popLayout">
              {displayedCategories.map((group, groupIdx) => {
                const IconComponent = CATEGORY_ICONS[group.category] || IconSparkles;
                return (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25, delay: groupIdx * 0.04 }}
                    className="rounded-md border border-border bg-surface p-4 sm:p-5 shadow-lg flex flex-col justify-between hover:border-primary/30 transition-all group"
                  >
                    <div>
                      {/* Group Header */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="size-5 rounded border border-border bg-white/5 flex items-center justify-center text-primary group-hover:border-primary/40 transition-colors">
                            <IconComponent className="size-4.5" />
                          </div>
                          <h4 className="text-sm sm:text-base font-semibold text-white">
                            {group.category}
                          </h4>
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {group.items.length} tools
                        </span>
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <div
                            key={item.name}
                            className="inline-flex items-center gap-1.5 rounded border border-border bg-surface-high/40 px-2.5 py-1 text-xs text-zinc-200 hover:border-primary/40 hover:text-white transition-all cursor-default"
                          >
                            {item.img && (
                              <img
                                src={item.img}
                                alt={item.name}
                                className="size-6 object-contain shrink-0"
                              />
                            )}
                            <span className="font-medium text-[11px] sm:text-xs">{item.name}</span>
                            {item.subCategory && (
                              <span className="text-[10px] text-muted-foreground/70 font-mono border-l border-border pl-1.5">
                                {item.subCategory}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </Layout>
    </Section>
  );
}

export default TechStack;
