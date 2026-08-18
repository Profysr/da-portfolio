"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandGithub,
  IconExternalLink,
  IconFolderOff,
  IconGlobe,
  IconRobot,
  IconCode,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/idx";

/* ── Category config ──────────────────────────────────────────────── */
const CATEGORIES = ["All", "Web", "Automation", "Open Source"];

const CATEGORY_CONFIG = {
  Web:           { Icon: IconGlobe,  gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/20" },
  Automation:    { Icon: IconRobot,  gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20" },
  "Open Source": { Icon: IconCode,   gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20" },
  default:       { Icon: IconCode,   gradient: "from-zinc-500/20 via-slate-500/10 to-gray-500/20" },
};

const DEFAULT_VISIBLE = 6;

/* ── Project Card ─────────────────────────────────────────────────── */
function ProjectCard({ project, delay = 0 }) {
  const config = CATEGORY_CONFIG[project.category] || CATEGORY_CONFIG.default;
  const CatIcon = config.Icon;
  const hasImage = project.image && !project.image.endsWith("null");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.28, delay }}
      className="flex flex-col rounded-md border border-border bg-surface shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 overflow-hidden group"
    >
      {/* Image / Gradient Banner */}
      <div className="relative h-40 w-full overflow-hidden shrink-0">
        {hasImage ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${config.gradient} flex items-center justify-center`}
          >
            <CatIcon className="size-10 text-primary/30" />
          </div>
        )}

        {/* Category badge overlay */}
        {project.category && (
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border/60 bg-surface/80 backdrop-blur-sm text-[10px] font-medium text-foreground">
            <CatIcon className="size-2.5" />
            {project.category}
          </span>
        )}

        {/* Featured pill */}
        {project.isFeatured && (
          <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded border border-primary/30 bg-primary/10 backdrop-blur-sm text-[10px] font-medium text-primary">
            ★ Featured
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title + description */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        {project.tech?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded border border-border bg-surface-high/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="inline-flex items-center rounded border border-border bg-surface-high/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Spacer + Action Buttons */}
        <div className="mt-auto pt-3 border-t border-border flex items-center gap-2">
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-surface-high/60 hover:bg-surface-high border border-border px-3 py-1.5 rounded transition-colors"
            >
              <IconBrandGithub className="size-3.5" />
              <span>Source</span>
            </a>
          )}
          {project.live && project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground bg-primary hover:opacity-90 px-3 py-1.5 rounded transition-opacity"
            >
              <span>Live Demo</span>
              <IconExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ── Main Section ─────────────────────────────────────────────────── */
export const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = projects.filter((p) =>
    activeTab === "All" ? true : p.category?.toLowerCase() === activeTab.toLowerCase()
  );

  // Reset show-all when filter changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowAll(false);
  };

  const visible = showAll ? filtered : filtered.slice(0, DEFAULT_VISIBLE);
  const hiddenCount = filtered.length - DEFAULT_VISIBLE;

  return (
    <Section id="projects" noFade className="py-10 md:py-16">
      <Layout>
        <div className="flex flex-col items-center gap-7">
          {/* Header */}
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

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleTabChange(cat)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-surface-high"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Responsive Project Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  <AnimatePresence>
                    {visible.map((project, idx) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        delay={idx * 0.04}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Show more / less */}
                {filtered.length > DEFAULT_VISIBLE && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setShowAll((prev) => !prev)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-surface hover:bg-surface-high text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary"
                    >
                      {showAll ? (
                        <>
                          <IconChevronUp className="size-4" />
                          <span>Show less</span>
                        </>
                      ) : (
                        <>
                          <span>Load {hiddenCount} more project{hiddenCount !== 1 ? "s" : ""}</span>
                          <IconChevronDown className="size-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center justify-center p-10 rounded-md border border-dashed border-border bg-surface text-center space-y-2.5"
              >
                <div className="p-2.5 rounded border border-border text-muted-foreground bg-surface-high">
                  <IconFolderOff className="size-6" />
                </div>
                <h4 className="text-sm font-semibold text-foreground">
                  No projects found
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm">
                  No projects match the selected category filter.
                </p>
                <button
                  onClick={() => handleTabChange("All")}
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