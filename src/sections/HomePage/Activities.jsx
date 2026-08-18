"use client";

import React from "react";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";

/* ── Section Data ──────────────────────────────────────────────────── */
const SIDE_PROJECTS = [
  {
    title: "Da Profiler",
    description: "Open-source Python REST API profiler & N+1 query workbench",
    link: "https://github.com",
  },
  {
    title: "JCN Engine",
    description: "Multi-tenant SaaS project management engine",
    link: "https://github.com",
  },
  {
    title: "Clinical RPA Core",
    description: "Desktop automation hooks for SystmOne & EMIS",
    link: "#",
  },
  {
    title: "Agentic CLI Coder",
    description: "Terminal refactoring agent powered by local LLMs",
    link: "https://github.com",
  },
];

const COMMUNITY_WRITINGS = [
  {
    title: "Profiling Django APIs at Scale",
    description: "Detecting SQL N+1 query bottlenecks in production",
    link: "#",
  },
  {
    title: "Clinical Automation Patterns",
    description: "Architecting zero-latency desktop workflows in healthcare",
    link: "#",
  },
  {
    title: "Open Source Engineering",
    description: "Building developer tooling and multi-tenant SaaS systems",
    link: "#",
  },
  {
    title: "Agentic Workflows in CLI",
    description:
      "Integrating lightweight open-weights LLMs into terminal pipelines",
    link: "#",
  },
];

/* ── Minimalist Row Item ───────────────────────────────────────────── */
function ActivityRow({ title, description, link, icon: Icon }) {
  const isExternal = link.startsWith("http");

  return (
    <a
      href={link}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group flex items-center justify-between w-full px-5 py-4 rounded-md border border-border/40 bg-zinc-950/80 hover:bg-zinc-900/60 hover:border-border transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-center gap-3 pr-4">
        {Icon && (
          <span className="shrink-0 text-foreground text-lg">
            <Icon className="size-5" />
          </span>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-sm sm:text-base font-medium text-foreground group-hover:text-white transition-colors">
            {title}
          </span>

          {description && (
            <>
              <span className="hidden sm:inline text-muted-foreground/30">
                •
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                {description}
              </span>
            </>
          )}
        </div>
      </div>

      <IconArrowRight className="size-4 shrink-0 text-muted-foreground/70 group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200" />
    </a>
  );
}

/* ── Main Combined Section ─────────────────────────────────────────── */
export function ActivityAndWritings() {
  return (
    <Section id="activity-writings" className="py-6 sm:py-12">
      <Layout>
        <div className="space-y-12">
          {/* Block 1: Side Projects & Open Source */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Side projects and things I'm building
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
                Some of the ideas I test when exploring new frameworks,
                developer tooling, or automated clinical workflows. Each one is
                an active experiment or open-source initiative.
              </p>
            </div>

            <div className="lg:col-span-7 border-t border-border/80">
              {SIDE_PROJECTS.map((item, idx) => (
                <ActivityRow key={idx} {...item} />
              ))}
            </div>
          </div>

          {/* Block 2: Writing & Community Contributions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                Writings & community contributions
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
                Sharing insights on API profiling, desktop workflow automation,
                multi-tenant SaaS architecture, and open-source software
                engineering.
              </p>
            </div>

            <div className="lg:col-span-7 border-t border-border/80">
              {COMMUNITY_WRITINGS.map((item, idx) => (
                <ActivityRow key={idx} {...item} />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </Section>
  );
}

export default ActivityAndWritings;
