"use client";

import React from "react";
import {
  IconSchool,
  IconSparkles,
  IconArrowUpRight,
  IconMapPin,
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
    <div className="flex flex-wrap gap-1.5 pt-1">
      {skills.map((skill) => (
        <span
          key={skill}
          className="inline-flex items-center rounded-md border border-border/40 bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground transition-colors hover:text-foreground hover:border-border/80"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

/* Minimalist Education Card */
function EducationCard({ edu, index, total }) {
  const revealVariant = index % 2 === 0 ? "slide-top-left" : "slide-top-right";

  return (
    <ScrollReveal
      variant={revealVariant}
      delay={index * 0.1}
      duration={0.7}
      once={false}
      className="h-full"
    >
      <article
        className={cn(
          "group relative flex flex-col justify-between h-full",
          "rounded-md border border-border bg-card/50 hover:bg-card",
          "hover:border-border-strong hover:shadow-xl transition-all duration-300",
          "select-none p-6 sm:p-7"
        )}
      >
        <div className="space-y-4">
          {/* Top metadata rail */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground/70 pb-1 border-b border-border/30">
            <span className="tracking-[0.2em] uppercase">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} • {edu.startDate} — {edu.endDate}
            </span>
            {edu.grade && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-medium tracking-wide">
                <IconSparkles className="size-3" />
                <span>{edu.grade}</span>
              </span>
            )}
          </div>

          {/* Institution & Degree */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {edu.institution}
                </h4>
                <p className="text-sm sm:text-base font-medium text-foreground/90 mt-1">
                  {edu.degree}
                  {edu.fieldOfStudy ? (
                    <span className="text-muted-foreground font-normal">
                      {" "}in {edu.fieldOfStudy}
                    </span>
                  ) : null}
                </p>
                {edu.minor && (
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    Minor in {edu.minor}
                  </p>
                )}
              </div>

              {edu.url && edu.url !== "#" && (
                <a
                  href={edu.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${edu.institution}`}
                  className="size-8 rounded-lg border border-border/40 bg-muted flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-border/80 transition-colors shrink-0"
                >
                  <IconArrowUpRight className="size-4" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          {edu.description && (
            <p className="text-xs sm:text-sm text-muted-foreground/85 leading-relaxed">
              {edu.description}
            </p>
          )}

          {/* Skills / Focus areas */}
          <div className="pt-1">
            <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">
              Focus & Methodologies
            </span>
            <SkillBadges skills={edu.skills} />
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-4 mt-6 border-t border-border/30 flex items-center justify-between text-xs font-mono text-muted-foreground/70">
          <div className="flex items-center gap-1.5">
            <IconMapPin className="size-3.5 text-primary" />
            <span>{edu.location}</span>
          </div>
          {edu.activities && (
            <span className="hidden sm:inline-block text-[11px] truncate max-w-[200px] text-muted-foreground/60">
              {edu.activities}
            </span>
          )}
        </div>
      </article>
    </ScrollReveal>
  );
}

/* Education section block */
function EducationSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-5xl">
      {education.map((edu, idx) => (
        <EducationCard
          key={edu.id || idx}
          edu={edu}
          index={idx}
          total={education.length}
        />
      ))}
    </div>
  );
}

export default function Credentials() {
  return (
    <Section id="credentials" className="py-16 md:py-24">
      <div className="flex flex-col items-center gap-8 md:gap-12 w-full">
        {/* Header — reveal */}
        <ScrollReveal variant="reveal" delay={0} duration={0.6} once={false}>
          <div className="flex flex-col items-center text-center gap-2.5 px-4 sm:px-6">
            <Badge
              variant="outline"
              className="tracking-[0.25em] text-[10px] bg-background/80 text-muted-foreground border-border/60 uppercase shadow-none px-3.5 py-1 font-mono rounded-full"
            >
              Academic Credentials
            </Badge>
            <Heading
              variant="gradient"
              text="Education & Degrees"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
            />
            <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-md font-normal leading-relaxed">
              Formal foundation in computer science, distributed systems, and applied computational mathematics.
            </p>
          </div>
        </ScrollReveal>

        {/* Education grid — diagonal reveals from top-left and top-right */}
        <EducationSection />
      </div>
    </Section>
  );
}