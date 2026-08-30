"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconChevronDown,
  IconSparkles,
  IconMail,
  IconArrowRight,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { BlurFade } from "@/components/ui/blur-fade";
import { Heading } from "@/components/ui/Heading";
import { ExpandableList } from "@/components/ui/expandable-list";
import { FrequentQuestions, personal } from "@/data/idx";

const FAQAccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-border last:border-none py-1">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-2.5 rounded text-left group transition-colors duration-200 hover:bg-surface-hover cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`text-xs sm:text-sm transition-colors pr-3 ${
            isOpen
              ? "text-primary font-semibold"
              : "text-foreground font-medium"
          }`}
        >
          {question}
        </span>
        <div
          className={`p-1 rounded border border-border bg-surface-muted text-muted-foreground group-hover:text-foreground transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180 text-primary" : ""
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-1 pb-3 px-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const INITIAL_FAQ_COUNT = 4;

export default function FAQClient() {
  const [openId, setOpenId] = useState(FrequentQuestions.items[0]?.id || null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const hasMoreQuestions = FrequentQuestions.items.length > INITIAL_FAQ_COUNT;

  const renderFAQList = () =>
    FrequentQuestions.items.map((item) => (
      <FAQAccordionItem
        key={item.id}
        question={item.question}
        answer={item.answer}
        isOpen={openId === item.id}
        onToggle={() => handleToggle(item.id)}
      />
    ));

  return (
    <Section id="faq" noFade className="py-6 sm:py-12">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-6">
        {/* Left Column: Header & Direct Reach-out Card */}
        <BlurFade
          inView
          delay={0.05}
          className="w-full lg:w-5/12 flex flex-col gap-4 lg:sticky lg:top-24"
        >
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium">
              <IconSparkles className="h-3 w-3" />
              <span>{FrequentQuestions.badge || "FAQ"}</span>
            </div>

            <Heading
              variant="gradient"
              text={FrequentQuestions.heading}
              as="h2"
              className="text-2xl! sm:text-3xl! text-center! lg:text-left!"
            />

            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 max-w-md leading-relaxed">
              {FrequentQuestions.subheading}
            </p>
          </div>

          {/* Quick Contact Card */}
          <div className="rounded-md border border-border bg-surface p-4 sm:p-5 flex flex-col gap-2.5 shadow-sm hover:border-border-strong transition-colors">
            <div className="flex items-center gap-2 text-foreground text-xs sm:text-sm font-semibold">
              <span className="p-1 rounded bg-primary/10 border border-primary/20 text-primary">
                <IconMail className="h-3.5 w-3.5" />
              </span>
              <span>Have a specific project in mind?</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              I'm always open to discussing system architecture, agent
              workflows, or custom consulting.
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="group inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline pt-0.5"
            >
              <span>Get in touch directly</span>
              <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </BlurFade>

        {/* Right Column: FAQ Accordion Component */}
        <BlurFade inView delay={0.1} className="w-full lg:w-7/12">
          <div className="w-full rounded-md border border-border bg-surface p-3.5 sm:p-5 shadow-sm">
            <ExpandableList
              items={FrequentQuestions.items}
              initialCount={INITIAL_FAQ_COUNT}
              showMoreLabel={(hiddenCount) =>
                `Show more questions (+${hiddenCount})`
              }
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
}
