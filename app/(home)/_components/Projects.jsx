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
  IconLock,
  IconTerminal,
  IconCheck,
  IconServer,
  IconCpu,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/idx";
import { TagFilter } from "@/components/TagFilter";
import { TechPill } from "@/components/TechPill";
import { ExtendedLink } from "@/components/ExtendedLink";
import { LazyParticles } from "@/components/lazy";
import { Suspense } from "react";
import { ExpandableList } from "@/components/ui/expandable-list";

/* ── Category & Domain Helpers ─────────────────────────────────────── */
const CATEGORIES = ["All", "Web", "Automation", "Open Source"];

const CATEGORY_CONFIG = {
  Web: {
    Icon: IconGlobe,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  Automation: {
    Icon: IconRobot,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  "Open Source": {
    Icon: IconCode,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  default: {
    Icon: IconCode,
    color: "text-zinc-400",
    bg: "bg-zinc-500/10 border-zinc-500/20",
  },
};

/* ── Fallback Hero Blueprint Component ──────────────────────────────── */
function ProjectBlueprintHero({ project, config }) {
  const CatIcon = config.Icon;

  return (
    <div className="relative h-48 w-full bg-zinc-950/90 border-b border-border/80 p-3.5 flex flex-col justify-between overflow-hidden font-mono select-none">
      {/* Background Blueprint Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-size-[16px_16px]" />

      {/* Top Subtle Amber Glow Effect */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/10 blur-2xl pointer-events-none rounded-full" />

      {/* Mock Terminal/Editor Window Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/60 pb-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-500/90 inline-block shadow-sm" />
          <span className="size-2.5 rounded-full bg-amber-500/90 inline-block shadow-sm" />
          <span className="size-2.5 rounded-full bg-emerald-500/90 inline-block shadow-sm" />
          <span className="ml-2 text-xs font-medium text-zinc-400 truncate">
            {project.id}.config.js
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border tracking-wide uppercase ${config.bg || "bg-amber-500/10"} ${config.color || "text-amber-400"} border-amber-500/30`}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Dynamic Architecture Visualizer Snippet */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-between px-1 gap-3">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2 text-sm text-zinc-100 font-semibold tracking-tight truncate">
            <CatIcon
              className={`size-4 shrink-0 ${config.color || "text-amber-400"}`}
            />
            <span className="truncate">{project.title}</span>
          </div>
          <p className="text-xs text-amber-300/80 font-mono line-clamp-1">
            <span className="text-zinc-500">// Strategy:</span>{" "}
            {project.strategies?.[0] || "Event-Driven Processing"}
          </p>
        </div>

        {/* Pipeline / Node Mock graphic */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <div className="p-1.5 rounded-md bg-zinc-900 border border-zinc-700/60 text-amber-400 shadow-inner">
            <IconCpu className="size-4" />
          </div>
          <span className="w-4 h-px bg-zinc-700 border-t border-dashed border-zinc-500" />
          <div className="p-1.5 rounded-md bg-zinc-900 border border-zinc-700/60 text-emerald-400 shadow-inner">
            <IconServer className="size-4" />
          </div>
        </div>
      </div>

      {/* Bottom Status Ribbon */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-zinc-400 border-t border-border/60 pt-2">
        <span className="flex items-center gap-1.5">
          <IconTerminal className="size-3.5 text-amber-400/90" />
          <span className="font-medium text-zinc-300">
            {project.isPrivate ? "Proprietary Core" : "Open Source"}
          </span>
        </span>
        <span className="text-zinc-400">
          {project.industry || "General Engineering"}
        </span>
      </div>
    </div>
  );
}


/* ── Reusable Project Card Footer Component ────────────────────────── */
function ProjectCardFooter({
  github,
  live,
  isPrivate,
  fallbackText = "Internal deployment — preview unavailable"
}) {
  const hasGithub = Boolean(github && github !== "#");
  const hasLive = Boolean(live && live !== "#");
  const hasAnyContent = hasGithub || hasLive || isPrivate;

  return (
    <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-2 min-h-10.5">
      {hasAnyContent ? (
        <>
          <div className="flex items-center gap-2">
            {hasGithub ? (
              <ExtendedLink
                href={github}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-surface-high/60 hover:bg-surface-high border border-border px-3 py-1.5 rounded transition-colors"
              >
                <IconBrandGithub className="size-3.5" />
                <span>Source</span>
              </ExtendedLink>
            ) : isPrivate ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground/60 italic">
                <IconLock className="size-3 text-muted-foreground/50" /> Private Repository
              </span>
            ) : null}
          </div>

          {hasLive && (
            <ExtendedLink
              href={live}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-foreground bg-primary hover:opacity-90 px-3.5 py-1.5 rounded transition-opacity ml-auto"
            >
              <span>Live Demo</span>
              <IconExternalLink className="size-3.5" />
            </ExtendedLink>
          )}
        </>
      ) : (
        /* Fallback message when no links or private status exist */
        <div className="w-full flex items-center gap-2 text-xs font-mono text-muted-foreground/50 py-0.5">
          <IconLock className="size-3.5 shrink-0 text-muted-foreground/40" />
          <span>{fallbackText}</span>
        </div>
      )}
    </div>
  );
}

/* ── Project Card Component ───────────────────────────────────────── */
function ProjectCard({ project }) {
  const config = CATEGORY_CONFIG[project.category] || CATEGORY_CONFIG.default;
  const CatIcon = config.Icon;
  const hasImage = project.image && !project.image.endsWith("null");

  return (
    <article className="flex flex-col h-full rounded-md border border-border bg-surface shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 overflow-hidden group">
      {/* 1. Header Media Section */}
      {hasImage ? (
        <div className="relative h-48 w-full overflow-hidden shrink-0 border-b border-border">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-black/30" />

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
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <span className="inline-block size-1.5 rounded-full bg-primary" />
            <span>{project.industry || "Software Engineering"}</span>
          </div>

          <div className="flex items-center gap-2 text-[10.5px]">
            {project.isPrivate ? (
              <Badge variant="lightWarning">
                <IconLock className="size-2.5" /> Private
              </Badge>
            ) : (
              <Badge variant="lightSuccess">Public Repo</Badge>
            )}

            {project.isHosted ? (
              <Badge variant="lightSuccess">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
                Live Hosted
              </Badge>
            ) : (
              <Badge variant="light">Internal Tool</Badge>
            )}
          </div>
        </div>
        {/* Title & Core Subtitle/Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            {/* {project.isFeatured && (
              <span className="shrink-0 px-2 py-0.5 rounded border border-primary/30 bg-primary/10 text-[10px] font-semibold text-primary">
                Featured
              </span>
            )} */}
          </div>
          {/* {project.subtitle && (
            <p className="text-xs font-medium text-foreground/80">
              {project.subtitle}
            </p>
          )} */}
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
                <TechPill
                  key={tag}
                  name={tag}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}
        {/* Bottom Action Links */}
        <ProjectCardFooter github={project.github} isPrivate={project.isPrivate} live={project.live} />
      </div>
    </article>
  );
}

/* ── Main Section Wrapper ─────────────────────────────────────────── */
const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = projects.filter((p) =>
    activeTab === "All"
      ? true
      : p.category?.toLowerCase() === activeTab.toLowerCase(),
  );

  return (
    <Section id="projects" noFade className="py-10 md:py-16 relative">
      <Suspense fallback={null}>
        <LazyParticles
          className="absolute inset-0"
        // quantity={120}
        // ease={60}
        // color="#ffffff"
        // size={0.7}
        />
      </Suspense>
      <Layout>
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

          {/* Filter Tabs */}
          <TagFilter items={CATEGORIES} activeValue={activeTab} onChange={setActiveTab} />

          {/* Integrated Expandable Grid */}
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
                <ExpandableList
                  items={filtered}
                  initialCount={4}
                  showMoreLabel={(hiddenCount) =>
                    `Load ${hiddenCount} More Project${hiddenCount !== 1 ? "s" : ""}`
                  }
                  showLessLabel="Show Less"
                  listClassName="grid grid-cols-1 lg:grid-cols-2 gap-3"
                  renderItem={(project) => <ProjectCard project={project} />}
                />
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
