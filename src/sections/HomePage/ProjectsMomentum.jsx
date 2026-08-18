"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  IconTerminal,
  IconCpu,
  IconActivity,
  IconArrowRight,
  IconGitPullRequest,
  IconChecklist,
  IconSparkles,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";

/* ── Sample Active Momentum Data ───────────────────────────────────── */
const ACTIVE_PROJECTS = [
  {
    id: "da-profiler",
    title: "Da Profiler",
    phase: "v1.2 Release Sprint",
    progress: 85,
    tag: "Developer Tooling",
    status: "In Active Dev",
    description:
      "Open-source Python workbench & Postman-style REST API profiler targeting real-time SQL N+1 query detection.",
    highlights: ["Django ORM Profiling", "AST Query Parsing", "Flamegraph Visuals"],
    metric: "4.8k Downloads",
    codeSnippet: "pip install da-profiler",
  },
  {
    id: "jcn-saas",
    title: "JCN SaaS Engine",
    phase: "Multi-Tenant Scaling",
    progress: 70,
    tag: "Cloud Architecture",
    status: "Active Architecture",
    description:
      "Distributed multi-tenant project orchestration platform built with asynchronous queue processing and worker pods.",
    highlights: ["Celery / RabbitMQ Pipelines", "PostgreSQL Isolation", "Redis Caching Layer"],
    metric: "99.9% Uptime Goal",
    codeSnippet: "docker compose up --build",
  },
  {
    id: "clinical-rpa",
    title: "Clinical Workflow Engine",
    phase: "EMIS & SystmOne Integration",
    progress: 92,
    tag: "Healthcare RPA",
    status: "Deployment Verification",
    description:
      "Precision desktop automation suite integrating UK primary care systems for high-throughput document processing.",
    highlights: ["AutoHotkey Core", "Docman Document Routing", "Zero-Latency Hooks"],
    metric: "12k+ Letters Processed",
    codeSnippet: "RPA.executeSequence('EMIS_REFILL')",
  },
  {
    id: "agentic-coder",
    title: "Agentic CLI Automation",
    phase: "LLM Loop Prototyping",
    progress: 45,
    tag: "AI Systems",
    status: "R&D Prototype",
    description:
      "Autonomous terminal agent executing local CLI refactoring pipelines powered by lightweight open-weights LLMs.",
    highlights: ["OpenCode Agent Loop", "Context Awareness", "Terminal Control"],
    metric: "Sub-200ms Inference",
    codeSnippet: "npx agentic-cli --auto-fix",
  },
];

/* ── Momentum Project Card ─────────────────────────────────────────── */
function MomentumCard({ project, index }) {
  return (
    <div className="w-[85vw] max-w-[380px] sm:w-[420px] shrink-0 h-full select-none flex flex-col justify-between rounded-md border border-border bg-surface p-5 sm:p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      <div>
        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between gap-2 pb-3 border-b border-border/60">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-primary/30 bg-primary/10 text-[10.5px] font-mono font-medium text-primary">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            {project.status}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground/80">
            0{index + 1} // {project.tag}
          </span>
        </div>

        {/* Project Title & Phase */}
        <div className="relative z-10 mt-4 space-y-1">
          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
            {project.title}
            <IconArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </h3>
          <p className="text-xs font-mono text-primary/80 font-medium">
            Current Focus: {project.phase}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative z-10 my-4 space-y-1.5">
          <div className="flex justify-between items-center text-[10.5px] font-mono text-muted-foreground">
            <span>Milestone Progress</span>
            <span className="text-foreground font-semibold">{project.progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-high rounded-full overflow-hidden border border-border/50">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="relative z-10 text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Highlight Bullets */}
        <div className="relative z-10 mt-4 space-y-1.5">
          {project.highlights.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-300">
              <IconActivity className="size-3 text-primary shrink-0" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Code & Metric Ribbon */}
      <div className="relative z-10 mt-6 pt-3 border-t border-border flex items-center justify-between text-[10.5px] font-mono text-muted-foreground">
        <div className="flex items-center gap-1.5 bg-surface-high/60 border border-border/80 px-2.5 py-1 rounded text-zinc-300">
          <IconTerminal className="size-3 text-primary" />
          <span className="truncate max-w-[140px] sm:max-w-[160px]">
            {project.codeSnippet}
          </span>
        </div>
        <span className="text-foreground font-medium">{project.metric}</span>
      </div>
    </div>
  );
}

/* ── Active Momentum Section Component ─────────────────────────────── */
export function ProjectMomentum() {
  const targetRef = useRef(null);

  // Smooth horizontal scroll transform for desktop viewports
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  return (
    <Section id="momentum" className="py-12 sm:py-20 relative overflow-hidden">
      <Layout>
        {/* DESKTOP VIEW: Pinning Horizontal Scroll Layout */}
        <div ref={targetRef} className="hidden lg:block h-[220vh] relative">
          <div className="sticky top-24 h-[calc(100vh-8rem)] flex items-center overflow-hidden">
            <div className="grid grid-cols-12 gap-8 items-center w-full">
              {/* Left Column: Fixed Vision Banner */}
              <div className="col-span-4 space-y-5 pr-2">
                <Badge variant="outline" className="inline-flex gap-1.5 items-center">
                  <IconSparkles className="size-3 text-primary" />
                  DEVELOPMENT MOMENTUM
                </Badge>
                <h2 className="text-3xl xl:text-4xl font-extrabold text-foreground leading-tight tracking-tight">
                  Active Engineering & Product Vision
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  A real-time snapshot of production software, open-source utilities, and clinical automation systems currently being engineered in our pipeline.
                </p>

                <div className="pt-2 space-y-3 font-mono text-xs border-t border-border/80 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <IconGitPullRequest className="size-4 text-emerald-400" />
                    <span>Continuous Integration & Active Sprints</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCpu className="size-4 text-purple-400" />
                    <span>RPA & Autonomous Agent Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconChecklist className="size-4 text-blue-400" />
                    <span>Production Readiness Verification</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Horizontal Moving Container */}
              <div className="col-span-8 overflow-hidden pl-4">
                <motion.div style={{ x }} className="flex gap-5">
                  {ACTIVE_PROJECTS.map((project, index) => (
                    <MomentumCard key={project.id} project={project} index={index} />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET VIEW: Responsive Native Horizontal Snap Carousel */}
        <div className="block lg:hidden space-y-6">
          <div className="space-y-3 text-left">
            <Badge variant="outline" className="inline-flex gap-1.5 items-center">
              <IconSparkles className="size-3 text-primary" />
              DEVELOPMENT MOMENTUM
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Active Engineering & Product Vision
            </h2>
            <p className="text-xs text-muted-foreground">
              A real-time snapshot of systems, tooling, and clinical automation currently moving through active development.
            </p>
          </div>

          {/* Horizontal Scroll Area with Touch Snap */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
            {ACTIVE_PROJECTS.map((project, index) => (
              <div key={project.id} className="snap-center shrink-0">
                <MomentumCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </Section>
  );
}

export default ProjectMomentum;