"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown, IconCode, IconExternalLink } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/idx";

const RoleCard = ({ role, isLastRole }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative pl-6 sm:pl-8 pb-6 last:pb-0">
      {/* Connector Node / Icon Tile */}
      <div className="absolute left-0 top-0.5 -translate-x-1/2 z-10 flex size-6 items-center justify-center rounded-md border border-white/10 bg-[#1c1b1b] text-zinc-400 ring-4 ring-background">
        <IconCode className="size-3.5" />
      </div>

      {/* Role Header Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group w-full text-left rounded-lg p-2 -ml-2 hover:bg-white/5 transition-colors duration-200 focus:outline-none"
      >
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-base sm:text-lg font-medium text-zinc-100 group-hover:text-white transition-colors">
            {role.title}
          </h4>
          <div
            className={`p-1 rounded-full bg-white/5 border border-white/10 transition-transform duration-300 ${
              isOpen ? "rotate-180 bg-white/10 text-white" : "text-zinc-400"
            }`}
          >
            <IconChevronDown className="size-4" />
          </div>
        </div>

        {/* Role Metadata Line */}
        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs sm:text-sm text-zinc-400">
          <span>{role.type}</span>
          <span className="text-zinc-600">•</span>
          <span className="font-mono text-zinc-300">{role.period}</span>
          <span className="text-zinc-600">•</span>
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3 pl-0.5 space-y-3">
              {role.description && (
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {role.description}
                </p>
              )}

              {role.skills && role.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-xs text-zinc-300"
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
    <Section noFade className="py-12 md:py-16">
      <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <Badge variant="outline">CAREER</Badge>
          <GradientHeading text="Work Experience" className="text-3xl! sm:text-5xl!" />
          <p className="text-sm sm:text-base text-muted-foreground/80 max-w-xl">
            My professional journey across software development, RPA automation, and engineering leadership.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="w-full space-y-6">
          {experiences.map((exp, expIdx) => (
            <motion.div
              key={exp.company + expIdx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: expIdx * 0.1 }}
              className="rounded-lg bg-[#1c1b1b] border border-border p-5 sm:p-6 shadow-2xl space-y-6"
            >
              {/* Company Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full border border-white/10 bg-white/5 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="size-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg sm:text-xl font-semibold text-white hover:underline inline-flex items-center gap-1"
                      >
                        {exp.company}
                        <IconExternalLink className="size-4 text-zinc-400" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mt-0.5">
                      <span>{exp.location}</span>
                      <span>({exp.locationType})</span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                {exp.isCurrent && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium shrink-0">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                    </span>
                    Present
                  </div>
                )}
              </div>

              {/* Roles Timeline Container */}
              <div className="relative pl-3 ml-2 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                {exp.roles.map((role, roleIdx) => (
                  <RoleCard
                    key={role.id || role.title}
                    role={role}
                    isLastRole={roleIdx === exp.roles.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};