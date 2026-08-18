"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconCode, IconExternalLink, IconBriefcase } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/idx";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { ExpandableList } from "@/components/ui/expandable-list";

const RoleCard = ({ role, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="relative pl-5 sm:pl-7 pb-5">
      {/* Connector Node / Icon Tile */}
      <div className="absolute left-0 top-1 -translate-x-1/2 z-10 flex size-5 items-center justify-center rounded border border-border bg-surface text-primary ring-4 ring-background">
        <IconCode className="size-3" />
      </div>

      {/* Role Header Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full text-left rounded p-2 -ml-2 hover:bg-white/[0.04] transition-colors duration-200 focus:outline-none"
      >
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-primary transition-colors">
            {role.title}
          </h4>
          <div
            className={`p-1 rounded border border-border transition-transform duration-300 ${isOpen ? "rotate-180 bg-white/10 text-white" : "text-muted-foreground"
              }`}
          >
            <IconChevronDown className="size-3.5" />
          </div>
        </div>

        {/* Role Metadata Line */}
        <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-muted-foreground">
          <span className="text-foreground/90 font-medium">{role.type}</span>
          <span>•</span>
          <span className="font-mono text-zinc-300">{role.period}</span>
          <span>•</span>
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
            <div className="pt-1.5 pl-0.5 space-y-2.5">
              {role.description && (
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {role.description}
                </p>
              )}

              {role.skills && role.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded border border-border bg-surface-high/40 px-2 py-0.5 font-mono text-[10px] text-zinc-300"
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
  );
};

export const Experience = () => {
  return (
    <Section id="experience" noFade className="py-10 md:py-16">
      <Layout>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-2.5">
          <Badge variant="outline">CAREER</Badge>
          <GradientHeading text="Work Experience" className="text-3xl! sm:text-5xl!" />
          <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
            Engineering leadership, forward deployed solutions, and clinical RPA systems.
          </p>
        </div>

        {/* Experience Cards — TracingBeam + expandable list */}
        <TracingBeam className="pl-2 w-full">
          <ExpandableList
            items={experiences}
            initialCount={2}
            listClassName="space-y-5"
            showMoreLabel={(hiddenCount) =>
              `Show ${hiddenCount} more ${hiddenCount === 1 ? "role" : "roles"}`
            }
            showLessLabel="Show less"
            renderItem={(exp) => (
              <div className="rounded-md bg-surface border border-border p-3 sm:p-4 shadow-lg space-y-5 hover:border-primary/30 transition-all">
                {/* Company Header */}
                <div className="flex items-start justify-between gap-3 border-b border-border pb-3.5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded border border-border bg-surface-high/60 p-1 flex items-center justify-center shrink-0">
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="size-full rounded object-contain"
                        />
                      ) : (
                        <IconBriefcase className="size-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                        >
                          {exp.company}
                          <IconExternalLink className="size-3.5 text-muted-foreground hover:text-primary" />
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span>{exp.location}</span>
                        <span>•</span>
                        <span className="text-foreground/80">{exp.locationType}</span>
                      </div>
                    </div>
                  </div>

                  {exp.isCurrent && (
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 text-[11px] font-medium shrink-0">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                      </span>
                      Present
                    </div>
                  )}
                </div>

                {/* Roles Timeline */}
                <div className="relative pl-2.5 ml-1.5 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-border">
                  {exp.roles.map((role) => (
                    <RoleCard key={role.id || role.title} role={role} defaultOpen={true} />
                  ))}
                </div>
              </div>
            )}
          />
        </TracingBeam>
      </Layout>
    </Section>
  );
};


export default Experience;