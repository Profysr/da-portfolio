"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconBrandGithub,
  IconExternalLink,
  IconFolderOff,
  IconGlobe,
  IconRobot,
  IconCode,
  IconChevronDown,
  IconChevronUp,
  IconLock,
  IconBuildingHospital,
  IconBuildingStore,
  IconTerminal,
  IconCheck,
  IconServer,
  IconCpu,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/idx";
import { Particles } from "@/components/ui/particles";

/* ── Category & Domain Helpers ─────────────────────────────────────── */
const CATEGORIES = ["All", "Web", "Automation", "Open Source"];

const CATEGORY_CONFIG = {
  Web: { Icon: IconGlobe, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  Automation: { Icon: IconRobot, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  "Open Source": { Icon: IconCode, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  default: { Icon: IconCode, color: "text-zinc-400", bg: "bg-zinc-500/10 border-zinc-500/20" },
};

const DEFAULT_VISIBLE = 4;

/* ── Fallback Hero Blueprint Component ──────────────────────────────── */
function ProjectBlueprintHero({ project, config }) {
  const CatIcon = config.Icon;

  return (
    <div className="relative h-48 w-full bg-surface-high/60 border-b border-border p-3.5 flex flex-col justify-between overflow-hidden font-mono select-none">
      {/* Background Subtle Mesh Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

      {/* Mock Terminal/Editor Window Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/60 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-500/80 inline-block" />
          <span className="size-2.5 rounded-full bg-amber-500/80 inline-block" />
          <span className="size-2.5 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 text-[10px] text-muted-foreground/70 truncate">
            {project.id}.config.ts
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`px-1.5 py-0.5 rounded text-[9.5px] font-medium border ${config.bg} ${config.color}`}>
            {project.category}
          </span>
        </div>
      </div>

      {/* Dynamic Architecture Visualizer Snippet */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-between px-2 gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-zinc-300 font-semibold">
            <CatIcon className={`size-4 ${config.color}`} />
            <span>{project.title}</span>
          </div>
          <p className="text-[10.5px] text-muted-foreground/80 font-mono line-clamp-1">
            // Strategy: {project.strategies?.[0] || "Event-Driven Processing"}
          </p>
        </div>

        {/* Pipeline / Node Mock graphic */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0 opacity-75">
          <div className="p-1.5 rounded bg-surface border border-border text-primary">
            <IconCpu className="size-3.5" />
          </div>
          <span className="w-3 h-px bg-border" />
          <div className="p-1.5 rounded bg-surface border border-border text-emerald-400">
            <IconServer className="size-3.5" />
          </div>
        </div>
      </div>

      {/* Bottom Status Ribbon */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-muted-foreground/70 border-t border-border/40 pt-1.5">
        <span className="flex items-center gap-1">
          <IconTerminal className="size-3 text-muted-foreground" />
          <span>{project.isPrivate ? "Proprietary Core" : "Open Source"}</span>
        </span>
        <span>{project.industry || "General Engineering"}</span>
      </div>
    </div>
  );
}

/* ── Project Card Component ───────────────────────────────────────── */
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
      className="flex flex-col rounded-md border border-border bg-surface shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 overflow-hidden group"
    >
      {/* 1. Header Media Section: Real Image OR High-Tech Blueprint Hero */}
      {hasImage ? (
        <div className="relative h-48 w-full overflow-hidden shrink-0 border-b border-border">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30" />

          {/* Floating Category Pill */}
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded border border-border/80 bg-surface/90 backdrop-blur-md text-[10.5px] font-medium text-foreground shadow-xs">
            <CatIcon className={`size-3 ${config.color}`} />
            {project.category}
          </span>
        </div>
      ) : (
        <ProjectBlueprintHero project={project} config={config} />
      )}

      {/* 2. Main Body Content */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 gap-4">

        {/* Industry & Access Metadata Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-2.5">
          {/* Industry Tag */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            <span>{project.industry || "Software Engineering"}</span>
          </div>

          {/* Status Indicators: Private/Public & Live/Internal */}
          <div className="flex items-center gap-2 text-[10.5px]">
            {project.isPrivate ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-amber-400 font-medium">
                <IconLock className="size-2.5" /> Private
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-medium">
                Public Repo
              </span>
            )}

            {project.isHosted ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Hosted
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-border bg-surface-high/60 text-muted-foreground">
                Internal Tool
              </span>
            )}
          </div>
        </div>

        {/* Title & Core Subtitle/Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {project.isFeatured && (
              <span className="shrink-0 px-2 py-0.5 rounded border border-primary/30 bg-primary/10 text-[10px] font-semibold text-primary">
                Featured
              </span>
            )}
          </div>
          {project.subtitle && (
            <p className="text-xs font-medium text-foreground/80">
              {project.subtitle}
            </p>
          )}
          <p className="text-xs text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Strategies & Engineering Patterns Used */}
        {project.strategies && project.strategies.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10.5px] uppercase font-mono tracking-wider text-muted-foreground/80">
              Key Strategies & Patterns
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.strategies.map((strat) => (
                <span
                  key={strat}
                  className="inline-flex items-center gap-1 rounded bg-surface-high border border-border/80 px-2 py-0.5 text-[10.5px] font-medium text-zinc-300"
                >
                  <IconCheck className="size-2.5 text-primary shrink-0" />
                  {strat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Full Tech Stack Pills */}
        {project.tech?.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10.5px] uppercase font-mono tracking-wider text-muted-foreground/80">
              Technologies
            </span>
            <div className="flex flex-wrap gap-1">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded border border-border bg-surface-high/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Spacer & Bottom Action Links */}
        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {project.github && project.github !== "#" ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-surface-high/60 hover:bg-surface-high border border-border px-3 py-1.5 rounded transition-colors"
              >
                <IconBrandGithub className="size-3.5" />
                <span>Source</span>
              </a>
            ) : project.isPrivate ? (
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/60 italic">
                <IconLock className="size-3" /> Private Repository
              </span>
            ) : null}
          </div>

          {project.live && project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground bg-primary hover:opacity-90 px-3.5 py-1.5 rounded transition-opacity"
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

/* ── Main Section Wrapper ─────────────────────────────────────────── */
export const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = projects.filter((p) =>
    activeTab === "All" ? true : p.category?.toLowerCase() === activeTab.toLowerCase()
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowAll(false);
  };

  const visible = showAll ? filtered : filtered.slice(0, DEFAULT_VISIBLE);
  const hiddenCount = filtered.length - DEFAULT_VISIBLE;

  return (
    <Section id="projects" noFade className="py-10 md:py-16 relative">
      <Particles
        className="absolute inset-0"
        quantity={120}
        ease={60}
        color="#ffffff"
        size={0.7}
      />
      <Layout>
        <div className="flex flex-col items-center gap-7">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-2.5">
            <Badge variant="outline">PORTFOLIO</Badge>
            <GradientHeading
              text="Featured Engineering Projects"
              className="text-3xl! sm:text-5xl!"
            />
            <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
              Production software systems, clinical RPA suites, and open-source developer tooling.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleTabChange(cat)}
                  className={`px-3.5 py-1.5 rounded text-xs font-medium transition-all duration-200 ${isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-surface-high"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Project Grid - Spacious 2-Column Layout */}
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <AnimatePresence>
                    {visible.map((project, idx) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        delay={idx * 0.05}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Show More Button */}
                {filtered.length > DEFAULT_VISIBLE && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setShowAll((prev) => !prev)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-surface hover:bg-surface-high text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary"
                    >
                      {showAll ? (
                        <>
                          <IconChevronUp className="size-4" />
                          <span>Show Less</span>
                        </>
                      ) : (
                        <>
                          <span>Load {hiddenCount} More Project{hiddenCount !== 1 ? "s" : ""}</span>
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