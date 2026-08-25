"use client";

import React from "react";
import { motion } from "motion/react";
import { IconExternalLink, IconClock, IconTag } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { writings } from "@/data/idx";
import { cn } from "@/lib/utils";

/* Individual article card — sits on the tracing beam */
function ArticleCard({ article, index }) {
  return (
    <ScrollReveal
      variant="slide-up"
      delay={index * 0.1}
      duration={0.6}
      once={false}
    >
      <motion.article
        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "relative flex flex-col gap-3 p-4 sm:p-5 rounded-lg border border-border bg-card",
          "w-full sm:max-w-[420px]",
          index % 2 === 0 ? "ml-auto" : "mr-auto",
        )}
      >
        {/* Date + read time row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-mono">{article.date}</span>
          <span className="flex items-center gap-1">
            <IconClock className="size-3" aria-hidden />
            <span>{article.readTime}</span>
          </span>
        </div>

        {/* Title + excerpt */}
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground/80 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {article.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded border border-border bg-surface-muted px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground"
            >
              <IconTag className="size-2.5" aria-hidden />
              {tag}
            </span>
          ))}
        </div>

        {/* Read link */}
        <motion.a
          href={`/writing/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline group"
          whileHover={{ x: 4 }}
        >
          Read article
          <IconExternalLink className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </motion.article>
    </ScrollReveal>
  );
}

/* Tracing beam wrapper with article cards as children */
function WritingsBeam() {
  return (
    <TracingBeam className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col gap-6 lg:gap-8 px-2 lg:px-0">
        {writings.map((article, index) => (
          <ArticleCard key={article.slug} article={article} index={index} />
        ))}
      </div>
    </TracingBeam>
  );
}

export default function Writings() {
  return (
    <Section id="writings" noFade>
      <div className="flex flex-col items-center gap-7">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2.5">
          <Badge variant="light">WRITINGS</Badge>
          <Heading
            variant="gradient"
            text="Essays & Articles"
            className="text-3xl! sm:text-5xl!"
          />
          <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
            Deep dives on data visualization, engineering patterns, and career
            signals — written for practitioners.
          </p>
        </div>

        {/* Beam + articles */}
        <WritingsBeam />
      </div>
    </Section>
  );
}
