"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandGithub,
  IconExternalLink,
  IconFolderOff,
  IconStar,
  IconCode,
  IconGlobe,
  IconRobot,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { projects } from "@/data/idx";

const CATEGORIES = ["All", "Web", "Automation", "Open Source"];

const CATEGORY_ICON = {
  Web: IconGlobe,
  Automation: IconRobot,
  "Open Source": IconCode,
};

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    return project.category?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <Section id="projects" noFade className="py-10 md:py-16">
      <Layout>
        <div className="flex flex-col items-center gap-7">
          {/* Header Block */}
          <div className="flex flex-col items-center text-center gap-2.5">
            <Badge variant="outline">PORTFOLIO</Badge>
            <GradientHeading
              text="Featured Projects"
              className="text-3xl! sm:text-5xl!"
            />
            <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
              A showcase of web applications, developer tooling, and workflow automation engines.
            </p>
          </div>

          {/* Filter Tabs — Responsive wrap without broken oval border */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full max-w-2xl">
            {CATEGORIES.map((category) => {
              const isActive = activeTab === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "bg-surface border border-border text-muted-foreground hover:text-white hover:border-primary/40 hover:bg-surface-high"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Bento Grid Projects Container */}
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <BentoGrid>
                  {filteredProjects.map((project) => {
                    const CategoryIcon = CATEGORY_ICON[project.category] || IconCode;
                    return (
                      <BentoCard
                        key={project.id}
                        title={project.title}
                        subtitle={project.subtitle}
                        Icon={CategoryIcon}
                        badge={project.category}
                        className={`col-span-12 ${
                          project.isFeatured
                            ? "md:col-span-8"
                            : "md:col-span-4"
                        }`}
                        headerExtra={
                          project.isFeatured && (
                            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded border border-primary/30 bg-primary/10 text-primary font-mono">
                              <IconStar className="size-3 fill-primary text-primary" />
                              Featured
                            </span>
                          )
                        }
                      >
                        <div className="flex flex-col justify-between h-full gap-3 pt-2">
                          {/* Description */}
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1">
                            {project.tags?.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded border border-border bg-surface-high/40 px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border mt-1">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-surface-high/60 hover:bg-surface-high border border-border px-3 py-1.5 rounded transition-colors"
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
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground bg-primary hover:opacity-90 px-3 py-1.5 rounded transition-opacity"
                              >
                                <span>Demo</span>
                                <IconExternalLink className="size-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </BentoCard>
                    );
                  })}
                </BentoGrid>
              </motion.div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex flex-col items-center justify-center p-10 rounded-md border border-dashed border-border bg-surface text-center space-y-2.5"
              >
                <div className="p-2.5 rounded border border-border text-muted-foreground bg-surface-high">
                  <IconFolderOff className="size-6" />
                </div>
                <h4 className="text-sm font-semibold text-foreground">
                  No projects found
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm">
                  There are no projects matching the selected category filter right now.
                </p>
                <button
                  onClick={() => setActiveTab("All")}
                  className="mt-1 text-xs font-medium text-primary hover:underline"
                >
                  Reset Filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Layout>
    </Section>
  );
};

export default Projects;