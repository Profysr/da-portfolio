// UNUSED — replaced by Writings.jsx (P16). Kept per Rule #13.
// "use client";
//
// import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ExtendedLink } from "@/components/common/ExtendedLink";
import { IconArrowUpRight, IconCode, IconPencil } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";

import { projects, writings } from "@/data/idx";

const SIDE_PROJECTS = projects
  .filter((p) => p.isActivity)
  .map((p) => ({ ...p, link: `/projects/${p.slug}` }));

const COMMUNITY_WRITINGS = writings.map((w) => ({
  ...w,
  link: `/writing/${w.slug}`,
}));

/* ── Animated Row ──────────────────────────────────────────────────── */
function AnimatedRow({ item, index }) {
  return (
    <div className="flex items-center gap-3 p-3 group relative cursor-pointer">
      {/* Left accent bar */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 group-hover:h-2/3 rounded-full bg-primary transition-all duration-200" />

      {/* Index / Number */}
      <span className="shrink-0 flex items-center justify-center size-7 rounded-md border border-border bg-surface-high/60 text-[11px] font-mono text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-all duration-200">
        {String(index + 1).padStart(2, "0")}
      </span>

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
      <div className="shrink-0 flex items-center justify-center size-7 rounded-md border border-border/50 text-muted-foreground group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-200">
        <IconArrowUpRight className="size-3.5" />
      </div>
    </div>
  );
}

/* ── Panel (one block) ─────────────────────────────────────────────── */
function Panel({
  icon: Icon,
  badge,
  heading,
  description,
  items,
  type,
  showMoreLabel,
  showLessLabel,
  initialCount = 4,
}) {
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
        <div className="h-px w-full bg-linear-to-r from-transparent via-primary/30 to-transparent" />

        <AnimatePresence mode="popLayout">
          {visible.map((item, idx) => (
            <div
              key={item.title + idx}
              className="border-border/30 last:border-b-0"
            >
              <ExtendedLink href={item.link} className="block">
                <AnimatedRow item={item} index={idx} />
              </ExtendedLink>
            </div>
          ))}
        </AnimatePresence>

        {/* Show More / Show Less Toggle Button */}
        {items.length > initialCount && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="w-full py-2.5 px-3 text-xs font-medium text-muted-foreground hover:text-foreground bg-surface-high/30 hover:bg-surface-high/60 border-t border-border/30 transition-colors cursor-pointer text-center"
          >
            {showAll
              ? showLessLabel
              : showMoreLabel
                ? showMoreLabel(hiddenCount)
                : `Show ${hiddenCount} more`}
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Main Combined Section ─────────────────────────────────────────── */
function ActivityAndWritings() {
  return (
    <Section id="writings">
      <div className="flex flex-col gap-8 items-center">
        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-2.5">
          <Badge variant="light">BUILDING & WRITING</Badge>
          <Heading variant="gradient" text="Activity & Contributions" />
          <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
            Open experiments, developer tools, and essays on engineering
            patterns I've shipped or published.
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
    </Section>
  );
}

export default ActivityAndWritings;
