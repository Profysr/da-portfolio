"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  IconChevronDown,
  IconExternalLink,
  IconBriefcase,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/idx";
import { TechPill } from "@/components/common/TechPill";
import { Timeline } from "@/components/21st/Timeline";
import { cn } from "@/lib/utils";

const ExperienceHeader = () => (
  <div className="flex flex-col items-center text-center gap-2.5">
    <Badge variant="light">CAREER</Badge>
    <Heading
      variant="gradient"
      text="Work Experience"
      className="text-3xl! sm:text-5xl!"
    />
    <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
      Engineering leadership, forward deployed solutions, and clinical RPA
      systems.
    </p>
  </div>
);

const CompanyHeader = ({ exp }) => (
  <div className="flex items-start justify-between gap-2.5 sm:gap-3 border-b border-border pb-3 sm:pb-3.5">
    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
      <div className="size-8 sm:size-10 rounded border border-border bg-surface-muted p-1 flex items-center justify-center shrink-0">
        {exp.logo ? (
          <Image
            src={exp.logo}
            alt={`${exp.company} logo`}
            width={48}
            height={32}
            className="size-full object-contain"
            loading="lazy"
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
      <Badge variant="lightSuccess" className="shrink-0">
        <span className="relative flex size-1.5 sm:size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex size-1.5 sm:size-2 rounded-full bg-emerald-500" />
        </span>
        Present
      </Badge>
    )}
  </div>
);

const RoleCard = ({ role, index, showIndex, isLast, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn(!isLast && "pb-4 sm:pb-5")}>
      <div className="relative pl-7 sm:pl-10">
        {/* Render large step index when company has multiple roles */}
        {showIndex && (
          <div className="absolute left-0 top-0.5 flex size-6 sm:size-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-xs sm:text-base font-bold text-muted-foreground shadow-sm">
            {index + 1}
          </div>
        )}

        {/* Role Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group w-full text-left rounded p-1.5 sm:p-2 -ml-1.5 sm:-ml-2 hover:bg-surface-muted transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
        >
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <h4 className="min-w-0 flex-1 text-xs sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors wrap-break-word">
              {role.title}
            </h4>
            <div
              className={cn(
                "shrink-0 p-0.5 sm:p-1 rounded border border-border transition-transform duration-300",
                isOpen
                  ? "rotate-180 bg-surface-muted text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <IconChevronDown className="size-3 sm:size-3.5" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-muted-foreground">
            <span className="text-foreground/90 font-medium">{role.type}</span>
            <span className="opacity-50">•</span>
            <span className="font-mono text-foreground/80">{role.period}</span>
            <span className="opacity-50">•</span>
            <span>{role.duration}</span>
          </div>
        </button>

        {/* Collapsible Details */}
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
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                )}

                {role.skills && role.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                    {role.skills.map((skill) => (
                      <TechPill key={skill} name={skill} />
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

const ExperienceCard = ({ exp }) => {
  const hasMultipleRoles = exp.roles.length > 1;

  return (
    <div
      className={cn(
        "rounded-md bg-surface p-3 sm:p-4.5 shadow-e2 space-y-4 sm:space-y-5 transition-colors duration-500",
        "border border-border hover:border-primary/30",
      )}
    >
      <CompanyHeader exp={exp} />
      <div>
        {exp.roles.map((role, idx) => (
          <RoleCard
            key={role.id || role.title}
            role={role}
            index={idx}
            showIndex={hasMultipleRoles}
            isLast={idx === exp.roles.length - 1}
            defaultOpen={true}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Experience
 * ----------
 * Scroll-drawn timeline (21st/Timeline, Rule #14 refactored): sticky
 * company era labels + gold spine; company cards as entry content.
 */
const Experience = () => (
  <Section id="experience" noFade className="py-12 md:py-16">
    <ExperienceHeader />

    <div className="mt-8">
      <Timeline
        data={experiences.map((exp) => ({
          title: exp.company,
          content: <ExperienceCard exp={exp} />,
        }))}
      />
    </div>
  </Section>
);

export default Experience;
