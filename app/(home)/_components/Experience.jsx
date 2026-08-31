"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconChevronDown,
  // IconExternalLink,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/data/idx";
import { TechPill } from "@/components/common/TechPill";
import { LazyTimeline } from "@/components/lazy";
import { cn } from "@/lib/utils";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2025-03" → "Mar 2025" · "2026" → "2026" · null → "Present" */
const formatDate = (value) => {
  if (!value) return "Present";
  const [yyyy, mm] = value.split("-");
  if (!mm) return yyyy;
  const month = MONTHS[Number(mm) - 1];
  return month ? `${month} ${yyyy}` : yyyy;
};

/** Dates are stored ISO-style (YYYY-MM) so durations stay computable. */
const formatPeriod = (role) =>
  `${formatDate(role.startDate)} — ${formatDate(role.endDate)}`;

const ExperienceHeader = () => (
  <div className="flex flex-col items-center text-center">
    {/* <Badge variant="light">CAREER</Badge> */}
    <Heading
      variant="gradient"
      text="Work Experience"
      as="h2"
      className="text-3xl! sm:text-5xl!"
    />
    <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
      Engineering leadership, forward deployed solutions, and clinical RPA
      systems.
    </p>
  </div>
);

const RoleCard = ({ role, index, showIndex, isLast, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isCurrent = !role.endDate;

  return (
    <div className={cn(!isLast && "pb-4")}>
      <div>
        {/* Role Toggle Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group w-full text-left rounded-lg p-1.5 sm:p-2 -ml-1.5 sm:-ml-2 hover:bg-surface-muted transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary/50"
        >
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5">
              {showIndex && (
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
              )}
              <h4 className="min-w-0 flex-1 text-xs sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors wrap-break-word">
                {role.title}
              </h4>
              {isCurrent && (
                <Badge variant="lightSuccess" className="shrink-0">
                  <span className="relative flex size-1.5 sm:size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 sm:size-2 rounded-full bg-emerald-500" />
                  </span>
                  Present
                </Badge>
              )}
            </div>
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

          <div className="flex flex-wrap items-center gap-x-1.5 sm:gap-x-2 gap-y-0.5 mt-1 text-[11px] sm:text-xs text-muted-foreground">
            <span className="text-foreground/90 font-medium">{role.type}</span>
            <span className="opacity-50">•</span>
            <span className="font-mono text-foreground/80">
              {formatPeriod(role)}
            </span>
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
  <Section id="experience" noFade innerClassName="p-0! md:px-4">
    <ExperienceHeader />

    <div className="mt-8">
      <LazyTimeline
        data={experiences.map((exp) => {
          // >50-char company names downshift the era-label type so the
          // sticky column stays compact (Timeline wraps within its row).
          const longName = exp.company.length > 50;
          return {
            title: (
              <span className="flex flex-col items-start gap-0.5 pb-1">
                <a
                  href={exp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-1.5 text-foreground hover:text-primary transition-colors",
                    longName && "text-base leading-snug sm:text-lg lg:text-xl",
                  )}
                >
                  {exp.company}
                </a>
                <div className="text-[10px] sm:text-[11px] text-muted-foreground font-medium leading-relaxed">
                  <span className="inline-block font-mono text-[10px] font-semibold bg-pastel-blue-bg text-pastel-blue-text px-1.5 py-0.5 rounded tracking-wide uppercase mr-1.5 align-middle">
                    {exp.locationType}
                  </span>
                  <span className="capitalize align-middle">
                    {exp.location}
                  </span>
                </div>
              </span>
            ),
            content: <ExperienceCard exp={exp} />,
          };
        })}
      />
    </div>
  </Section>
);

export default Experience;
