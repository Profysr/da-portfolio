"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconFolderOff } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { projects, TAG_META } from "@/data/idx";
import { ContinuousTabs } from "@/components/common/Tabs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import  ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

/* Asymmetric bento rhythm — hero 2×2, wide 2×1, rest 1×1 (lg+) */
const BENTO_SPANS = {
  "analytics-dashboard": "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "data-pipeline-toolkit": "sm:col-span-2 lg:col-span-2",
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");

  /* Filter tabs derive from TAG_META (single source of truth) + live counts */
  const tabs = [
    { id: "All", label: "All", count: projects.length },
    ...Object.keys(TAG_META)
      .filter((tag) => tag !== "default")
      .map((tag) => ({
        id: tag,
        label: tag,
        count: projects.filter((p) => p.tags?.includes(tag)).length,
      })),
  ];

  const filtered = projects.filter((p) =>
    activeTab === "All"
      ? true
      : p.tags?.some((tag) => tag.toLowerCase() === activeTab.toLowerCase()),
  );

  return (
    <Section id="projects" noFade>
        <div className="flex flex-col items-center gap-7">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-2.5">
            <Badge variant="light">PORTFOLIO</Badge>
            <Heading
              variant="gradient"
              text="Featured Engineering Projects"
              className="text-3xl! sm:text-5xl!"
            />
            <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
              Production software systems, clinical RPA suites, and open-source
              developer tooling.
            </p>
          </div>

          {/* Filter Tabs (common/Tabs — Rule #14 refactored, counts live) */}
          <ContinuousTabs
            tabs={tabs}
            defaultActiveId="All"
            onChange={setActiveTab}
            ariaLabel="Filter projects by tag"
          />

          {/* Asymmetric Bento Grid — id resolves the active tab's aria-controls */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeTab}
                id={`tabpanel-${activeTab}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
              >
                {filtered.map((project, idx) => (
                  <ScrollReveal
                    key={project.id || project.slug}
                    variant="slide-up"
                    delay={(idx % 4) * 0.07}
                    duration={0.6}
                    once={false}
                    className={cn("h-full", BENTO_SPANS[project.slug] ?? "")}
                  >
                    <ProjectCard project={project} />
                  </ScrollReveal>
                ))}
              </motion.div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex w-full flex-col items-center justify-center space-y-2.5 rounded-md border border-dashed border-border bg-surface p-10 text-center"
              >
                <div className="rounded border border-border bg-surface-muted p-2.5 text-muted-foreground">
                  <IconFolderOff className="size-6" />
                </div>
                <h4 className="text-sm font-semibold text-foreground">
                  No projects found
                </h4>
                <p className="max-w-sm text-xs text-muted-foreground">
                  No projects match the selected category filter.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("All")}
                  className="mt-1 text-xs font-medium text-primary hover:underline"
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

export default Projects;
