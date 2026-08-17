"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronDown } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "./ui/Heading";
import { Badge } from "./ui/badge";
import { FrequentQuestions } from "@/data/idx";

const FAQAccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-white/10 last:border-none">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 px-2 text-left group transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-medium text-zinc-200 group-hover:text-white transition-colors pr-4">
          {question}
        </span>
        <div
          className={`p-1.5 rounded-full bg-white/5 border border-white/10 transition-transform duration-300 shrink-0 ${
            isOpen ? "rotate-180 bg-white/10" : ""
          }`}
        >
          <IconChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
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
            <p className="pb-5 px-2 text-sm sm:text-base text-zinc-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  const [openId, setOpenId] = useState(FrequentQuestions.items[0]?.id || null);

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Section noFade className="py-2 sm:py-4">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
        {/* Header Block */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-3 w-full lg:w-1/3">

          <GradientHeading
            text={FrequentQuestions.heading}
            className="text-3xl! lg:text-4xl! text-left!"
          />

          <p className="text-sm sm:text-base text-muted-foreground/80 max-w-xl">
            {FrequentQuestions.subheading}
          </p>
        </div>

        {/* FAQ Accordion Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full lg:w-2/3 rounded-lg bg-[#1c1b1b] border border-border p-5 sm:p-6 shadow-2xl"
        >
          <div className="divide-y divide-white/10">
            {FrequentQuestions.items.map((item) => (
              <FAQAccordionItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
