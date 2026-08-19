"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  IconArrowUpRight,
  IconCode,
  IconPencil,
  IconBrandGithub,
  IconExternalLink,
  IconSparkles,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";

/* ── Section Data ──────────────────────────────────────────────────── */
const SIDE_PROJECTS = [
  {
    title: "Da Profiler",
    description: "Open-source Python REST API profiler & N+1 query workbench",
    link: "https://github.com",
    isExternal: true,
    tag: "Open Source",
  },
  {
    title: "JCN Engine",
    description: "Multi-tenant SaaS project management engine",
    link: "https://github.com",
    isExternal: true,
    tag: "SaaS",
  },
  {
    title: "Clinical RPA Core",
    description: "Desktop automation hooks for SystmOne & EMIS",
    link: "#",
    isExternal: false,
    tag: "Private",
  },
  {
    title: "Agentic CLI Coder",
    description: "Terminal refactoring agent powered by local LLMs",
    link: "https://github.com",
    isExternal: true,
    tag: "AI",
  },
];

const COMMUNITY_WRITINGS = [
  {
    title: "Profiling Django APIs at Scale",
    description: "Detecting SQL N+1 query bottlenecks in production",
    link: "#",
    readTime: "8 min",
  },
  {
    title: "Clinical Automation Patterns",
    description: "Architecting zero-latency desktop workflows in healthcare",
    link: "#",
    readTime: "12 min",
  },
  {
    title: "Open Source Engineering",
    description: "Building developer tooling and multi-tenant SaaS systems",
    link: "#",
    readTime: "6 min",
  },
  {
    title: "Agentic Workflows in CLI",
    description: "Integrating lightweight open-weights LLMs into terminal pipelines",
    link: "#",
    readTime: "10 min",
  },
  {
    title: "Scaling Postgres for Healthcare",
    description: "Partitioning, indexing, and tuning for NHS-grade workloads",
    link: "#",
    readTime: "9 min",
  },
];

/* ── Animated Row ──────────────────────────────────────────────────── */
function AnimatedRow({ item, index, type }) {
  const isExternal = item.link?.startsWith("http");
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.link}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex items-center gap-3 w-full px-3 py-3.5 border-b border-border/30 last:border-b-0 hover:bg-white/[0.03] transition-colors duration-200 cursor-pointer"
    >
      {/* Animated left accent bar */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-full bg-primary"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: hovered ? "60%" : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Index / Number */}
      <motion.span
        className="shrink-0 flex items-center justify-center size-7 rounded-md border border-border bg-surface-high/60 text-[11px] font-mono text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-all duration-200"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.15 }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-foreground group-hover:text-white transition-colors truncate">
            {item.title}
          </span>
          {/* Tag pill for projects */}
          {item.tag && (
            <span className="hidden sm:inline-flex shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider border border-border bg-surface-high text-muted-foreground">
              {item.tag}
            </span>
          )}
          {/* Read time for writings */}
          {item.readTime && (
            <span className="hidden sm:inline-flex shrink-0 text-[10px] font-mono text-muted-foreground/60">
              {item.readTime} read
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground/70 mt-0.5 truncate">
          {item.description}
        </p>
      </div>

      {/* Arrow */}
      <motion.div
        className="shrink-0 flex items-center justify-center size-7 rounded-md border border-border/50 text-muted-foreground group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-200"
        animate={{ rotate: hovered ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconArrowUpRight className="size-3.5" />
      </motion.div>
    </motion.a>
  );
}

/* ── Panel (one block) ─────────────────────────────────────────────── */
function Panel({ icon: Icon, badge, heading, description, items, type, showMoreLabel, showLessLabel, initialCount = 4 }) {
  const [showAll, setShowAll] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const visible = showAll ? items : items.slice(0, initialCount);
  const hiddenCount = items.length - initialCount;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-5"
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div className="shrink-0 flex size-9 items-center justify-center rounded-md border border-border bg-surface-high/80 text-primary">
          <Icon className="size-4.5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="light">{badge}</Badge>
          </div>
          <h2 className="text-base font-bold tracking-tight text-foreground leading-snug">
            {heading}
          </h2>
          <p className="text-xs text-muted-foreground/70 max-w-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* List panel */}
      <div className="rounded-md border border-border bg-surface overflow-hidden">
        {/* Subtle top shimmer line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <AnimatePresence mode="popLayout">
          {visible.map((item, idx) => (
            <AnimatedRow
              key={item.title + idx}
              item={item}
              index={idx}
              type={type}
            />
          ))}
        </AnimatePresence>

        {/* Show more / less */}
        {hiddenCount > 0 && (
          <div className="border-t border-border/40 px-3 py-2.5">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="group flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                <IconSparkles className="size-3.5" />
              </motion.span>
              {showAll
                ? showLessLabel
                : showMoreLabel(hiddenCount)}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main Combined Section ─────────────────────────────────────────── */
export function ActivityAndWritings() {
  return (
    <Section id="activity-writings" className="py-8 sm:py-14">
      <Layout>
        <div className="flex flex-col gap-8 items-center">
          {/* Section header */}
          <div className="flex flex-col items-center text-center gap-2.5">
            <Badge variant="light">BUILDING & WRITING</Badge>
            <GradientHeading
              text="Activity & Contributions"
            />
            <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
              Open experiments, developer tools, and essays on engineering patterns I've shipped or published.
            </p>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            <Panel
              icon={IconCode}
              badge="OPEN SOURCE"
              heading="Side projects & things I'm building"
              description="Active experiments, developer tools, and clinical automation initiatives — some open, some proprietary."
              items={SIDE_PROJECTS}
              type="project"
              initialCount={4}
              showMoreLabel={(n) => `Show ${n} more projects`}
              showLessLabel="Show fewer"
            />

            <Panel
              icon={IconPencil}
              badge="WRITINGS"
              heading="Essays & community contributions"
              description="Sharing what I learn: API profiling, healthcare automation, multi-tenant SaaS, and agentic workflows."
              items={COMMUNITY_WRITINGS}
              type="writing"
              initialCount={4}
              showMoreLabel={(n) => `Show ${n} more articles`}
              showLessLabel="Show fewer"
            />
          </div>
        </div>
      </Layout>
    </Section>
  );
}

export default ActivityAndWritings;
