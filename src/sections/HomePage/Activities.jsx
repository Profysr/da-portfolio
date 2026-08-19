"use client";

import React from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { ExpandableList } from "@/components/ui/expandable-list";

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
  {
    title: "Agentic Workflows in CLI",
    description:
      "Integrating lightweight open-weights LLMs into terminal pipelines",
    link: "#",
  },
];

/* ── Redesigned Row Item ───────────────────────────────────────────── */
function ActivityRow({ title, description, link, icon: Icon, idx }) {
  const isExternal = link.startsWith("http");

  return (
    <a
      href={link}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex items-center gap-2 w-full px-2.5 py-4 border-b border-border/20 last:border-b-0 hover:bg-muted/50 rounded-xl transition-all duration-200 cursor-pointer"
    >
      {/* Top-Left Circular Index Badge */}
      {!Icon && typeof idx === "number" && (
        <span className="flex items-center justify-center p-2 rounded-full bg-muted border border-border text-muted-foreground text-xs font-semibold group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200 shadow-sm">
          {idx + 1}
        </span>
      )}

      {/* Main Content Area */}
      <div className="flex items-center gap-3 pr-4 min-w-0">
        {Icon && (
          <span className="shrink-0 p-2 rounded-lg bg-background border border-border/40 text-foreground group-hover:border-border transition-colors">
            <Icon className="size-4" />
          </span>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 min-w-0">
          <span className="text-sm font-medium text-foreground transition-colors truncate">
            {title}
          </span>

          {description && (
            <span className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
              {description}
            </span>
          )}
        </div>
      </div>

      {/* Chevron Button with Rotating Dashed Border */}
      <div className="relative shrink-0 flex items-center justify-center w-8 h-8 rounded-full ml-auto">
        {/* Animated Dashed Ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-muted-foreground group-hover:border-primary group-hover:rotate-180 transition-all duration-500 ease-out" />

        {/* Chevron Icon */}
        <IconArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-all duration-200" />
      </div>
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

            <ExpandableList
              items={SIDE_PROJECTS}
              initialCount={4}
              showMoreLabel={(hiddenCount) =>
                `Show more projects (${hiddenCount} more)`
              }
              showLessLabel="Show fewer projects"
              className="lg:col-span-7"
              listClassName="bg-surface rounded border border-border py-2"
              renderItem={(item, idx) => (
                <ActivityRow key={item.id || idx} idx={idx} {...item} />
              )}
            />
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

            <ExpandableList
              items={COMMUNITY_WRITINGS}
              initialCount={4}
              showMoreLabel={(hiddenCount) =>
                `Show more writings (${hiddenCount} more)`
              }
              showLessLabel="Show fewer writings"
              className="lg:col-span-7"
              listClassName="bg-surface rounded border border-border py-2"
              renderItem={(item, idx) => (
                <ActivityRow key={item.id || idx} idx={idx} {...item} />
              )}
            />
          </div>
        </div>
      </Layout>
    </Section>
  );
}

export default ActivityAndWritings;
