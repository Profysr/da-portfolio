"use client";

import React, { useState } from "react";
import { IconFolderOff } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { projects, TAG_META } from "@/data/idx";
import { ContinuousTabs } from "@/components/common/Tabs";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import ProjectCard from "./ProjectCard";
import { ExpandableList } from "@/components/ui/expandable-list";
// =========================================
// Empty State
// =========================================
export const ProjectsEmptyState = ({ onReset }) => {
  return (
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
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-1 text-xs font-medium text-primary hover:underline"
        >
          Reset Filter
        </button>
      )}
    </motion.div>
  );
};

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
// Helper to render individual card within masonry columns
const renderProjectItem = (project, idx) => (
  <div
    key={project.id || project.slug}
    className="mb-3.5 break-inside-avoid inline-block w-full"
  >
    <ScrollReveal
      variant="slide-up"
      delay={(idx % 4) * 0.07}
      duration={0.6}
      once={false}
    >
      <ProjectCard project={project} />
    </ScrollReveal>
  </div>
);
// =========================================
// Main Component
// =========================================
const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = projects.filter((p) =>
    activeTab === "All"
      ? true
      : p.tags?.some((tag) => tag.toLowerCase() === activeTab.toLowerCase()),
  );

  const HAS_MORE_THAN_6 = filtered.length > 6;

  return (
    <Section id="projects" noFade>
      <div className="flex flex-col items-center gap-7">
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

        <ContinuousTabs
          tabs={tabs}
          defaultActiveId="All"
          onChange={setActiveTab}
          ariaLabel="Filter projects by tag"
        />

        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeTab}
              id={`tabpanel-${activeTab}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {HAS_MORE_THAN_6 ? (
                <ExpandableList
                  items={filtered}
                  collapsedHeight={900}
                  listClassName="columns-1 sm:columns-2 lg:columns-3 gap-3.5 w-full"
                  showMoreLabel={`Show more (${filtered.length - 6} more)`}
                  renderItem={(project, idx) => renderProjectItem(project, idx)}
                />
              ) : (
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-3.5 w-full">
                  {filtered.map((project, idx) =>
                    renderProjectItem(project, idx),
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <ProjectsEmptyState onReset={() => setActiveTab("All")} />
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default Projects;
