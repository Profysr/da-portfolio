"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown, IconSparkles, IconMail, IconArrowRight } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { BlurFade } from "@/components/ui/blur-fade";
import { GradientHeading } from "@/components/ui/Heading";
import { ExpandableList } from "@/components/ui/expandable-list";
import { FrequentQuestions, personal } from "@/data/idx";

/* ─────────────────────────────────────────────────────────────
 *  Single FAQ Accordion Item Component
 * ───────────────────────────────────────────────────────────── */
const FAQAccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-border last:border-none py-1.5 transition-colors">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3.5 px-3 rounded-lg text-left group transition-all duration-200 hover:bg-background/5 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`text-sm sm:text-base font-medium transition-colors pr-4 ${isOpen ? "text-primary font-semibold" : "text-foreground group-hover:text-foreground"
            }`}
        >
          {question}
        </span>
        <div
          className={`p-1.5 rounded-full border transition-all duration-300 shrink-0 ${isOpen
              ? "rotate-180 bg-primary/20 border-primary/40 text-primary shadow-[0_0_12px_rgba(208,188,255,0.3)]"
              : "bg-background/10 border-border text-muted-foreground group-hover:text-foreground group-hover:border-border"
            }`}
        >
          <IconChevronDown className="w-3.5 h-3.5" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-1 pb-4 px-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
 *  Main FAQ Component
 * ───────────────────────────────────────────────────────────── */
export const FAQ = () => {
  const [openId, setOpenId] = useState(FrequentQuestions.items[0]?.id || null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Section id="faq" noFade className="py-4 sm:py-6">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12">
        {/* Left Column: Header & Direct Reach-out Card */}
        <BlurFade inView delay={0.05} className="w-full lg:w-5/12 flex flex-col gap-5 lg:sticky lg:top-24">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-medium backdrop-blur-md shadow-sm">
              <IconSparkles className="h-3 w-3" />
              <span>{FrequentQuestions.badge || "FAQ"}</span>
            </div>

            <GradientHeading
              text={FrequentQuestions.heading}
              className="text-2xl! sm:text-3xl! lg:text-4xl! text-center! lg:text-left!"
            />

            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-md leading-relaxed">
              {FrequentQuestions.subheading}
            </p>
          </div>

          {/* Quick Contact Card (Elevated Shady Glass) */}
          <div className="rounded-lg border border-border bg-surface backdrop-blur-2xl p-5 flex flex-col gap-3 shadow-xl hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 text-foreground text-xs sm:text-sm font-semibold">
              <span className="p-1.5 rounded-lg bg-primary/15 border border-primary/25 text-primary">
                <IconMail className="h-3.5 w-3.5" />
              </span>
              <span>Have a specific project in mind?</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              I'm always open to discussing system architecture, agent workflows, or custom consulting.
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="group inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline pt-1"
            >
              <span>Get in touch directly</span>
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </BlurFade>

        {/* Right Column: FAQ Accordion with ExpandableList (Initial 3 Items) */}
        <BlurFade inView delay={0.1} className="w-full lg:w-7/12">
          <div className="w-full rounded-lg border border-border bg-surface backdrop-blur-2xl p-4 sm:p-6">
            <ExpandableList
              items={FrequentQuestions.items}
              initialCount={3}
              showMoreLabel={(hiddenCount) => `Show more questions (+${hiddenCount})`}
              showLessLabel="Show fewer questions"
              renderItem={(item) => (
                <FAQAccordionItem
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openId === item.id}
                  onToggle={() => handleToggle(item.id)}
                />
              )}
            />
          </div>
        </BlurFade>
      </div>
    </Section>
  );
};
