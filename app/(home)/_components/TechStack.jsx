"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconSparkles,
  IconCpu,
  IconServer,
  IconBrandReact,
  IconCloud,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { SkillsAndTools } from "@/data/idx";
import { FavoriteStack } from "@/components/FavoriteStack";
import { GlowFrame } from "@/components/ui/GlowFrame";
import { TechPill } from "@/components/TechPill";
import { TagFilter } from "@/components/TagFilter";

const CATEGORY_ICONS = {
  "Automations & AI": IconCpu,
  "Engineering & Backend": IconServer,
  "Platforms & Cloud": IconCloud,
  "Conceptual & Design": IconBrandReact,
};

function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...SkillsAndTools.map((cat) => cat.category)];

  const displayedCategories =
    selectedCategory === "All"
      ? SkillsAndTools
      : SkillsAndTools.filter((cat) => cat.category === selectedCategory);

  return (
    <Section
      id="stack"
      noFade
      className="py-10 md:py-16 overflow-hidden relative"
    >
      <Layout>
        <div className="flex flex-col items-center gap-7">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-2.5">
            <Badge variant="light">ARSENAL & TOOLS</Badge>
            <Heading
              variant="gradient"
              text="Technologies & Stack"
              className="text-3xl! sm:text-5xl!"
            />
            <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
              Production tools, runtimes, and agentic orchestration frameworks I
              use to build scalable systems.
            </p>
          </div>

          {/* Daily Drivers Callout Strip Component */}
          <FavoriteStack variant="detailed" />

          {/* Category Filter Pills */}
          <TagFilter
            items={categories}
            activeValue={selectedCategory}
            onChange={setSelectedCategory}
          />

          {/* Categorized Tech Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
            <AnimatePresence mode="popLayout">
              {displayedCategories.map((group, groupIdx) => {
                const IconComponent =
                  CATEGORY_ICONS[group.category] || IconSparkles;
                return (
                  <motion.div
                    key={group.category}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25, delay: groupIdx * 0.04 }}
                    className="h-full group"
                  >
                    <GlowFrame
                      className="h-full rounded-md border border-border bg-surface p-4 sm:p-5 shadow-lg flex flex-col justify-between hover:border-primary/30 transition-all"
                      spread={30}
                      borderWidth={1}
                    >
                      <div className="relative z-[2] flex flex-col justify-between h-full gap-3">
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
                            <TechPill
                              key={item.name}
                              name={item.name}
                              subCategory={item.subCategory ?? undefined}
                              size="md"
                            />
                          ))}
                        </div>
                      </div>
                    </GlowFrame>
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
