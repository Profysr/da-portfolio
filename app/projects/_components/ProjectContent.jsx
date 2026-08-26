"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/Heading";
import { TechPill } from "@/components/common/TechPill";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ReadingLayout } from "@/components/layout/ReadingLayout";
import {
  IconExternalLink,
  IconBrandGithub,
  IconRocket,
  IconFileText,
} from "@tabler/icons-react";

export function ProjectContent({
  meta,
  changelog = [],
  toc = [],
  similarProjects = [],
  children,
}) {
  const formattedDate = meta?.date
    ? new Date(meta.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const hasGithub = meta.github && meta.github !== "#";
  const hasLive = meta.live && meta.live !== "#";

  const accessVariant =
    meta.access === "Open Source"
      ? "outline"
      : meta.access === "Hosted"
        ? "default"
        : "secondary";

  const header = (
    <div>
      {/* Metadata Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {meta.category && (
          <Badge variant="outline" className="text-[11px] uppercase font-mono tracking-wider px-2.5 py-0.5">
            {meta.category}
          </Badge>
        )}
        {meta.industry && (
          <Badge variant="secondary" className="text-[11px] px-2.5 py-0.5">
            {meta.industry}
          </Badge>
        )}
        {meta.access && (
          <Badge variant={accessVariant} className="text-[11px] px-2.5 py-0.5 font-mono">
            {meta.access}
          </Badge>
        )}
      </div>

      {/* Title */}
      <Heading
        variant="gradient"
        as="h1"
        className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
      >
        {meta.title}
      </Heading>

      {/* Description */}
      {meta.description && (
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 font-normal max-w-3xl">
          {meta.description}
        </p>
      )}

      {/* Quick Actions (Live Demo & Source Code) */}
      {(hasGithub || hasLive) && (
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {hasLive && (
            <Link
              href={meta.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm no-underline group hover:scale-[1.02] active:scale-[0.98]"
            >
              <IconRocket className="size-4" />
              <span>Live Demo</span>
              <IconExternalLink className="size-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}

          {hasGithub && (
            <Link
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border border-border/80 bg-surface text-foreground hover:border-primary/50 hover:bg-surface-hover hover:text-primary no-underline group hover:scale-[1.02] active:scale-[0.98]"
            >
              <IconBrandGithub className="size-4" />
              <span>Source Code</span>
            </Link>
          )}
        </div>
      )}

      {/* Strategies & Key Patterns */}
      {meta.strategies?.length > 0 && (
        <div className="mb-6">
          <p className="text-[11px] uppercase font-mono tracking-wider text-muted-foreground mb-2.5 font-medium">
            Key Strategies & Architecture
          </p>
          <div className="flex flex-wrap gap-2">
            {meta.strategies.map((strat) => (
              <span
                key={strat}
                className="inline-flex items-center gap-1.5 rounded-lg bg-surface border border-border/70 px-2.5 py-1 text-xs font-medium text-foreground"
              >
                <span className="size-1.5 rounded-full bg-primary" />
                {strat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {meta.tech?.length > 0 && (
        <div>
          <p className="text-[11px] uppercase font-mono tracking-wider text-muted-foreground mb-2.5 font-medium">
            Technologies Used
          </p>
          <div className="flex flex-wrap gap-1.5">
            {meta.tech.map((tag) => (
              <TechPill key={tag} name={tag} size="sm" />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const sidebar = (
    <div className="rounded-xl border border-border/80 bg-surface/40 backdrop-blur-sm p-4 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-3 mb-3 border-b border-border/60">
        Project Summary
      </h3>
      <dl className="space-y-2.5 text-xs">
        {meta.category && (
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Category</dt>
            <dd className="font-semibold text-foreground">{meta.category}</dd>
          </div>
        )}
        {meta.industry && (
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Industry</dt>
            <dd className="font-semibold text-foreground">{meta.industry}</dd>
          </div>
        )}
        {meta.access && (
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Access Model</dt>
            <dd className="font-semibold text-foreground">{meta.access}</dd>
          </div>
        )}
        {formattedDate && (
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Published</dt>
            <dd className="font-medium text-foreground">{formattedDate}</dd>
          </div>
        )}
      </dl>
    </div>
  );

  return (
    <ReadingLayout
      type="project"
      title={meta?.title}
      header={header}
      sidebar={sidebar}
      toc={toc}
      similarItems={similarProjects}
      currentSlug={meta?.slug}
    >
      {children}

      {/* Interactive Changelog Section using shadcn Accordion */}
      {changelog && changelog.length > 0 && (
        <section className="mt-14 pt-8 border-t border-border/80">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
            <IconFileText className="size-5 text-primary" />
            <span>Release Changelog</span>
          </h3>

          <div className="rounded-xl border border-border/80 bg-surface/50 p-4">
            <Accordion type="single" collapsible className="w-full">
              {changelog.map((entry) => (
                <AccordionItem key={entry.version} value={entry.version}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono font-bold">
                        {entry.version}
                      </span>
                      <span className="text-muted-foreground text-xs sm:text-sm">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm pt-2">
                      {entry.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary font-bold shrink-0">•</span>
                          <span className="leading-relaxed text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}
    </ReadingLayout>
  );
}