"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandGithub,
  IconExternalLink,
  IconFolderOff,
  IconStar,
  IconCode2,
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
  "Open Source": IconCode2,
};

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    return project.category?.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <Section id="projects" noFade className="py-12 md:py-16">
      <Layout>
        <div className="flex flex-col items-center gap-8">
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
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full border border-border bg-surface backdrop-blur-md">
            {CATEGORIES.map((category) => {
              const isActive = activeTab === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none ${
                    isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectTab"
                      className="absolute inset-0 rounded-full bg-primary/20 border border-primary/30"
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
                  {filteredProjects.map((project) => {
                    const CategoryIcon = CATEGORY_ICON[project.category] || IconCode2;
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
                            <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono">
                              <IconStar className="size-3 fill-primary text-primary" />
                              Featured
                            </span>
                          )
                        }
                      >
                        <div className="flex flex-col justify-between h-full gap-4">
                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags?.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-[11px]">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-background/5 hover:bg-background/10 border border-border px-3 py-1.5 rounded-md transition-colors"
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
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground bg-primary hover:bg-primary/90 border border-primary px-3 py-1.5 rounded-md transition-colors"
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
                className="w-full flex flex-col items-center justify-center p-12 rounded-xl border border-dashed border-border bg-surface/50 text-center space-y-3"
              >
                <div className="p-3 rounded-full bg-background/5 border border-border text-muted-foreground">
                  <IconFolderOff className="size-8" />
                </div>
                <h4 className="text-base font-semibold text-foreground">
                  No projects found
                </h4>
                <p className="text-sm text-muted-foreground max-w-sm">
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
      </Layout>
    </Section>
  );
};