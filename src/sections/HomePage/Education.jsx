"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconSchool, IconExternalLink, IconChevronDown } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { BentoCard } from "@/components/ui/bento-grid";
import { education } from "@/data/idx";

function EducationCard({ edu, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <BentoCard
        title={edu.company}
        subtitle={edu.role}
        Icon={IconSchool}
        badge={edu.date}
        className="h-full"
      >
        <div className="space-y-4">
          {/* Location + Link Row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
              <span>{edu.location}</span>
            </div>
            {edu.href && (
              <a
                href={edu.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Visit
                <IconExternalLink className="size-3" />
              </a>
            )}
          </div>

          {/* Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="group w-full flex items-center justify-between text-xs sm:text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <span>{isOpen ? "Hide details" : "Show details"}</span>
            <span
              className={`p-1 rounded-full border border-border transition-all duration-300 ${
                isOpen
                  ? "rotate-180 bg-primary/20 border-primary/40 text-primary"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              <IconChevronDown className="size-3.5" />
            </span>
          </button>

          {/* Expandable Description + Skills */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="space-y-3 pt-1">
                  {edu.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                  {edu.skills && edu.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {edu.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-[11px]">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BentoCard>
    </motion.div>
  );
}

export const Education = () => {
  return (
    <Section id="education" noFade className="py-12 md:py-16">
      <Layout>
        <div className="flex flex-col items-center gap-8">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-3">
            <Badge variant="outline">ACADEMICS</Badge>
            <GradientHeading
              text="Education"
              className="text-3xl! sm:text-5xl!"
            />
            <p className="text-sm sm:text-base text-muted-foreground/80 max-w-xl">
              Academic credentials and institutions that shaped my engineering foundation.
            </p>
          </div>

          {/* Education Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full">
            {education.map((edu, idx) => (
              <EducationCard key={edu.id || idx} edu={edu} index={idx} />
            ))}
          </div>
        </div>
      </Layout>
    </Section>
  );
};