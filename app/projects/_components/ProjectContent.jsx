"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
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

const ProjectContent = ({
  meta,
  changelog = [],
  toc = [],
  similarProjects = [],
  children,
}) => {
  const hasGithub = meta.github && meta.github !== "#";
  const hasLive = meta.live && meta.live !== "#";

  const accessVariant =
    meta.access === "Open Source"
      ? "outline"
      : meta.access === "Hosted"
        ? "default"
        : "secondary";

  const actions = (hasGithub || hasLive) && (
    <div className="flex items-center gap-2 sm:gap-3">
      {hasLive && (
        <Link
          href={meta.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-xs md:text-sm font-semibold transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm no-underline group hover:scale-[1.02] active:scale-[0.98]"
        >
          <IconRocket className="size-3.5 sm:size-4" />
          <span>Live Demo</span>
          <IconExternalLink className="size-3 sm:size-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
      {hasGithub && (
        <Link
          href={meta.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-[11px] sm:text-xs md:text-sm font-semibold transition-all duration-200 border border-border/80 bg-surface text-foreground hover:border-primary/50 hover:bg-surface-hover hover:text-primary no-underline group hover:scale-[1.02] active:scale-[0.98]"
        >
          <IconBrandGithub className="size-3.5 sm:size-4" />
          <span>Source Code</span>
        </Link>
      )}
    </div>
  );

  const sidebar = (
    <div className="rounded-md border border-primary/20 bg-surface p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-primary pb-3 mb-3 border-b border-primary/20">
        Project Summary
      </h3>
      <dl className="space-y-3 text-xs">
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
        {meta.date && (
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Published</dt>
            <dd className="font-medium text-foreground">
              {new Date(meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );

  return (
    <ReadingLayout
      type="project"
      meta={meta}
      actions={actions}
      sidebar={sidebar}
      toc={toc}
      similarItems={similarProjects}
      currentSlug={meta?.slug}
    >
      {/* Strategies */}
      {meta.strategies?.length > 0 && (
        <div className="mb-4 sm:mb-6 not-prose">
          <p className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-muted-foreground mb-2 sm:mb-2.5 font-medium">
            Key Strategies & Architecture
          </p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {meta.strategies.map((strat) => (
              <span
                key={strat}
                className="inline-flex items-center gap-1 sm:gap-1.5 rounded-lg bg-surface border border-border/70 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-foreground"
              >
                <span className="size-1 sm:size-1.5 rounded-full bg-primary" />
                {strat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {meta.tech?.length > 0 && (
        <div className="not-prose">
          <p className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-muted-foreground mb-2 sm:mb-2.5 font-medium">
            Technologies Used
          </p>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {meta.tech.map((tag) => (
              <TechPill key={tag} name={tag} size="sm" />
            ))}
          </div>
        </div>
      )}

      {children}

      {/* Changelog */}
      {changelog && changelog.length > 0 && (
        <section className="mt-8 sm:mt-10 md:mt-14 pt-6 sm:pt-8 border-t border-border/80 not-prose">
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-foreground">
            <IconFileText className="size-4 sm:size-5 text-primary" />
            <span>Release Changelog</span>
          </h3>

          <div className="rounded-md border border-border/80 bg-surface/50 p-3 sm:p-4">
            <Accordion type="single" collapsible className="w-full">
              {changelog.map((entry) => (
                <AccordionItem key={entry.version} value={entry.version}>
                  <AccordionTrigger className="hover:no-underline py-2 sm:py-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-primary/10 text-primary text-[10px] sm:text-xs font-mono font-bold">
                        {entry.version}
                      </span>
                      <span className="text-muted-foreground text-[10px] sm:text-xs md:text-sm">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1.5 sm:space-y-2 text-muted-foreground text-[10px] sm:text-xs md:text-sm pt-1 sm:pt-2">
                      {entry.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 sm:gap-2">
                          <span className="text-primary font-bold shrink-0">
                            •
                          </span>
                          <span className="leading-relaxed text-foreground/90">
                            {item}
                          </span>
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
};

export default ProjectContent;
