"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandGithub,
  IconExternalLink,
  IconFolderOff,
  IconStar,
  IconCode2,
  IconLayersTriangle,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { projects } from "@/data/idx";

const CATEGORIES = ["All", "Web", "Automation", "Open Source"];

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    return (
      project.category?.toLowerCase() === activeTab.toLowerCase() ||
      project.tags?.some((tag) => tag.toLowerCase() === activeTab.toLowerCase())
    );
  });

  return (
    <Section noFade className="py-12 md:py-16">
      <div className="flex flex-col items-center gap-8 max-w-6xl mx-auto w-full">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-3">
          <Badge variant="outline">PORTFOLIO</Badge>
          <GradientHeading
            text="Featured Projects"
            className="text-3xl! sm:text-5xl!"
          />
          <p className="text-sm sm:text-base text-muted-foreground/80 max-w-xl">
            A showcase of web applications, open-source developer tooling, and
            workflow automation engines.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full border border-white/10 bg-[#1c1b1b] backdrop-blur-md">
          {CATEGORIES.map((category) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectTab"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid Projects Container */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <BentoGrid>
                {filteredProjects.map((project) => (
                  <BentoCard
                    key={project.id || project.title}
                    title={project.title}
                    subtitle={project.subtitle}
                    Icon={project.isFeatured ? IconStar : IconCode2}
                    badge={project.category}
                    className={`col-span-12 ${
                      project.isFeatured
                        ? "md:col-span-8 border-primary/30 bg-primary/[0.02]"
                        : "md:col-span-4"
                    }`}
                    headerExtra={
                      project.isFeatured && (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 font-mono">
                          <IconStar className="size-3 fill-amber-400 text-amber-400" />
                          Featured
                        </span>
                      )
                    }
                  >
                    <div className="flex flex-col justify-between h-full pt-3 gap-4">
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Tags & Action Buttons */}
                      <div className="space-y-3.5 pt-2 border-t border-white/10">
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-2 pt-1">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-md transition-colors"
                            >
                              <IconBrandGithub className="size-3.5" />
                              <span>Source</span>
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-primary/20 hover:bg-primary/30 border border-primary/40 px-3 py-1.5 rounded-md transition-colors"
                            >
                              <span>Demo</span>
                              <IconExternalLink className="size-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </BentoCard>
                ))}
              </BentoGrid>
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center justify-center p-12 rounded-xl border border-dashed border-white/10 bg-[#1c1b1b]/50 text-center space-y-3"
            >
              <div className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                <IconFolderOff className="size-8" />
              </div>
              <h4 className="text-base font-semibold text-white">
                No projects found
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-sm">
                There are no projects matching the selected category filter
                right now.
              </p>
              <button
                onClick={() => setActiveTab("All")}
                className="mt-2 text-xs font-medium text-primary hover:underline"
              >
                Reset Filter
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
};
