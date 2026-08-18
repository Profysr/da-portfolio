"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconCode, IconExternalLink, IconBriefcase } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/idx";
import { ExpandableList } from "@/components/ui/expandable-list";
import { ScrollRail } from "@/components/ui/ScrollRail";
import { cn } from "@/lib/utils";

/**
 * RoleCard
 * --------
 * Fixes vs the previous version:
 *  - Header no longer forces title + chevron onto one rigid row. Title gets
 *    `min-w-0` so long titles wrap instead of squeezing the meta line or
 *    overlapping the toggle button.
 *  - Meta line (type • period • duration) wraps onto its own baseline on
 *    narrow screens instead of truncating/crowding.
 *  - The role's own connector dot + line now share ONE left offset with the
 *    parent rail (`left-3` inside a `pl-9`/`pl-10` box) instead of computing
 *    its position against a different padding context than the parent line.
 *    That's what caused the floating/misaligned dot on multi-role cards.
 */
const RoleCard = ({ role, isLast, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn(!isLast && "pb-4 sm:pb-5")}>
      <div className="relative pl-5 sm:pl-7">
        {/* Connector node — anchored to the same left offset as the line below */}
        <div className="absolute left-2 sm:left-2.5 top-1 z-10 flex size-4 sm:size-5 -translate-x-1/2 items-center justify-center rounded border border-border bg-surface text-primary ring-2 sm:ring-4 ring-background">
          <IconCode className="size-2.5 sm:size-3" />
        </div>

        {/* Line down to the next role, sharing the exact same x-position */}
        {!isLast && (
          <div className="absolute left-2 sm:left-2.5 top-5 sm:top-6 bottom-0 w-px -translate-x-1/2 bg-border" aria-hidden />
        )}

        {/* Role Header Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group w-full text-left rounded p-1.5 sm:p-2 -ml-1.5 sm:-ml-2 hover:bg-white/[0.04] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
        >
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <h4 className="min-w-0 flex-1 text-xs sm:text-base font-semibold text-white group-hover:text-primary transition-colors break-words">
              {role.title}
            </h4>
            <div
              className={`shrink-0 p-0.5 sm:p-1 rounded border border-border transition-transform duration-300 ${isOpen ? "rotate-180 bg-white/10 text-white" : "text-muted-foreground"
                }`}
            >
              <IconChevronDown className="size-3 sm:size-3.5" />
            </div>
          </div>

          {/* Role Metadata Line — wraps freely, no forced single row */}
          <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-muted-foreground">
            <span className="text-foreground/90 font-medium">{role.type}</span>
            <span className="opacity-50">•</span>
            <span className="font-mono text-zinc-300">{role.period}</span>
            <span className="opacity-50">•</span>
            <span className="text-zinc-400">{role.duration}</span>
          </div>
        </button>

        {/* Description & Skill Tags Block */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-1 pl-0.5 space-y-2 sm:space-y-2.5">
                {role.description && (
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {role.description}
                  </p>
                )}

                {role.skills && role.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                    {role.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded border border-border bg-surface-high/40 px-1.5 sm:px-2 py-0.5 font-mono text-[9.5px] sm:text-[10px] text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Experience = () => {
  return (
    <Section id="experience" noFade className="py-10 md:py-16">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-2.5">
        <Badge variant="outline">CAREER</Badge>
        <GradientHeading text="Work Experience" className="text-3xl! sm:text-5xl!" />
        <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
          Engineering leadership, forward deployed solutions, and clinical RPA systems.
        </p>
      </div>

      {/* Experience Cards — scroll-lit rail + expandable list */}
      <ScrollRail className="mt-8">
        <ExpandableList
          items={experiences}
          initialCount={2}
          showMoreLabel={(hiddenCount) =>
            `Show ${hiddenCount} more ${hiddenCount === 1 ? "role" : "roles"}`
          }
          showLessLabel="Show less"
          renderItem={(exp, i) => (
            <ScrollRail.Item key={exp.id || exp.company} index={i}>
              {({ isLit }) => (
                <div
                  className={cn(
                    "rounded-md bg-surface p-3 sm:p-4.5 shadow-lg space-y-4 sm:space-y-5 transition-all duration-500",
                    isLit
                      ? "border border-primary/50 shadow-primary/5"
                      : "border border-border hover:border-primary/30"
                  )}
                >
                  {/* Company Header */}
                  <div className="flex items-start justify-between gap-2.5 sm:gap-3 border-b border-border pb-3 sm:pb-3.5">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="size-8 sm:size-10 rounded border border-border bg-surface-high/60 p-1 flex items-center justify-center shrink-0">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="size-full rounded object-contain"
                          />
                        ) : (
                          <IconBriefcase className="size-3.5 sm:size-4 text-primary" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <a
                            href={exp.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm sm:text-lg font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 min-w-0 truncate"
                          >
                            <span className="truncate">{exp.company}</span>
                            <IconExternalLink className="size-3 sm:size-3.5 text-muted-foreground hover:text-primary shrink-0" />
                          </a>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 text-[11px] sm:text-xs text-muted-foreground mt-0.5">
                          <span>{exp.location}</span>
                          <span className="opacity-50">•</span>
                          <span className="text-foreground/80">{exp.locationType}</span>
                        </div>
                      </div>
                    </div>

                    {exp.isCurrent && (
                      <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 text-[10px] sm:text-[11px] font-medium shrink-0">
                        <span className="relative flex size-1.5 sm:size-2">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex size-1.5 sm:size-2 rounded-full bg-emerald-500" />
                        </span>
                        Present
                      </div>
                    )}
                  </div>

                  {/* Roles — single shared rail, dot/line share one x-offset */}
                  <div>
                    {exp.roles.map((role, idx) => (
                      <RoleCard
                        key={role.id || role.title}
                        role={role}
                        isLast={idx === exp.roles.length - 1}
                        defaultOpen={true}
                      />
                    ))}
                  </div>
                </div>
              )}
            </ScrollRail.Item>
          )}
        />
      </ScrollRail>
    </Section>
  );
};

export default Experience;