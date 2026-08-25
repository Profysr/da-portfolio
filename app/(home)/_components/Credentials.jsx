"use client";

import React from "react";
import { motion } from "motion/react";
import {
  IconSchool,
  IconSparkles,
  IconExternalLink,
  IconCheck,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { education } from "@/data/idx";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";

/* Skill badges row */
function SkillBadges({ skills }) {
  if (!skills || skills.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1 pt-0.5">
      {skills.map((skill) => (
        <span
          key={skill}
          className="inline-flex items-center rounded border border-border bg-surface-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

/* Section header with icon */
function SectionHeaderTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-0.5 pt-2">
      <Icon className="size-3.5 text-primary" />
      <span>{title}</span>
    </div>
  );
}

/* Education card — reused from original, cleaned up */
function EducationCard({ edu, index }) {
  return (
    <ScrollReveal
      variant="slide-up"
      delay={index * 0.07}
      duration={0.5}
      once={false}
    >
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "rounded-lg border border-border bg-card p-4 sm:p-5 shadow-sm",
          "flex flex-col justify-between gap-3",
          "hover:border-primary/40 transition-colors duration-300",
          "h-full",
        )}
      >
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded border border-border bg-surface-muted flex items-center justify-center text-primary shrink-0">
                <IconSchool className="size-4" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-foreground">
                  {edu.institution}
                </h4>
                <p className="text-xs text-primary font-medium">
                  {edu.degree}
                  {edu.fieldOfStudy ? ` • ${edu.fieldOfStudy}` : ""}
                </p>
              </div>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground shrink-0 bg-surface-muted border border-border px-2 py-0.5 rounded">
              {edu.startDate} — {edu.endDate}
            </span>
          </div>

          {edu.grade && (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-primary/30 bg-primary/10 text-primary text-[11px] font-medium">
              <IconSparkles className="size-3" />
              <span>{edu.grade}</span>
            </div>
          )}

          {edu.description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {edu.description}
            </p>
          )}

          <SkillBadges skills={edu.skills} />
        </div>

        {edu.url && edu.url !== "#" && (
          <div className="pt-2.5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>{edu.location}</span>
            <a
              href={edu.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
            >
              <span>Institution Site</span>
              <IconExternalLink className="size-3" />
            </a>
          </div>
        )}
      </motion.article>
    </ScrollReveal>
  );
}

/* Education section block */
function EducationSection({ showHeader = true }) {
  return (
    <div className="space-y-3">
      {showHeader && (
        <SectionHeaderTitle icon={IconSchool} title="Academic Education" />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {education.map((edu, idx) => (
          <EducationCard key={edu.id || idx} edu={edu} index={idx} />
        ))}
      </div>
    </div>
  );
}

export default function Credentials() {
  return (
    <Section id="credentials" noFade>
      <div className="flex flex-col items-center gap-7">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2.5">
          {/* <Badge variant="outline">CREDENTIALS & BACKGROUND</Badge> */}
          <Heading
            variant="gradient"
            text="Education"
            className="text-3xl! sm:text-5xl!"
          />
          <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
            Academic degrees and certifications aligned with industry standards.
          </p>
        </div>

        {/* Education grid — no tabs, no filter, no rail */}
        {/* <div className="w-full max-w-4xl"> */}
        <EducationSection showHeader={false} />
        {/* </div> */}
      </div>
    </Section>
  );
}
