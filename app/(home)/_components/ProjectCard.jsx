"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconBrandGithub,
  IconCheck,
  IconChevronDown,
  IconExternalLink,
  IconLock,
} from "@tabler/icons-react";
import OptimizedImage from "@/components/common/OptimizedImage";
import { TechPill } from "@/components/common/TechPill";
import { ExtendedLink } from "@/components/common/ExtendedLink";
import { TAG_META } from "@/data/idx";
import { cn } from "@/lib/utils";

/* Tag strings → display config (TAG_META is the single source of truth) */
function getTagConfig(tag) {
  return TAG_META[tag] || TAG_META.default;
}

/* Collapsible feature list — expanded by default, collapsible */
function FeaturesList({ features }) {
  const [open, setOpen] = useState(() => (features?.length ?? 0) <= 3);
  if (!features?.length) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded px-1 py-1 text-[10.5px] font-mono uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
      >
        <span>Features ({features.length})</span>
        <IconChevronDown
          className={cn("size-3 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-1.5 overflow-hidden"
          >
            {features.map((feature, index) => (
              <li
                key={`${index}-${feature}`}
                className="flex items-start gap-1.5 text-xs text-muted-foreground"
              >
                <IconCheck
                  className="mt-0.5 size-3 shrink-0 text-primary"
                  strokeWidth={2}
                />
                <span>{feature}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Status badge — Live (emerald pulse) / In Progress (amber) */
function StatusBadge({ status }) {
  const isLive = status === "live";
  return (
    <span className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground shadow-sm">
      <span className="relative flex size-1.5">
        {isLive && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/30" />
        )}
        <span
          className={cn(
            "relative inline-flex size-1.5 rounded-full",
            isLive ? "bg-emerald-500" : "bg-amber-500",
          )}
        />
      </span>
      {isLive ? "Live" : "In Progress"}
    </span>
  );
}

/* Inset media panel — image, terminal snippet, or category fallback */
function MediaPanel({ project }) {
  const tags = project.tags || [];
  const CatIcon = getTagConfig(tags[0]).Icon;
  const hasImage = project.image && !project.image.endsWith("null");

  return (
    <div className="relative min-h-40 overflow-hidden rounded-md border border-border/50 bg-muted/50">
      {hasImage ? (
        <OptimizedImage
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="absolute inset-0 h-full"
        />
      ) : project.terminalSnippet ? (
        <div className="flex min-h-40 flex-col justify-between p-3">
          <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-muted-foreground">
            {project.terminalSnippet}
          </pre>
        </div>
      ) : (
        <div className="flex min-h-40 items-center justify-center">
          <CatIcon
            className="size-12 text-muted-foreground/30"
            strokeWidth={1}
            aria-hidden
          />
        </div>
      )}

      {/* Tag chips */}
      <div className="absolute left-2 top-2 flex flex-wrap gap-1">
        {tags.map((tag) => {
          const { Icon, shade } = getTagConfig(tag);
          return (
            <span
              key={tag}
              className={cn(
                "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10.5px] font-medium",
                shade,
              )}
            >
              <Icon className="size-3" aria-hidden />
              {tag}
            </span>
          );
        })}
      </div>

      <StatusBadge status={project.status} />
    </div>
  );
}

/* Footer links — Source / Private · Live Demo */
function CardFooter({ project }) {
  const github = project.github || (project.isExternal ? project.link : "#");
  const live = project.live;
  const hasGithub = Boolean(github && github !== "#");
  const hasLive = Boolean(live && live !== "#");

  return (
    <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-3">
      {hasGithub ? (
        <ExtendedLink
          href={github}
          className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <IconBrandGithub className="size-3.5" />
          <span>Source</span>
        </ExtendedLink>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <IconLock className="size-3" /> Private Repository
        </span>
      )}

      {hasLive && (
        <ExtendedLink
          href={live}
          className="ml-auto inline-flex items-center gap-1.5 rounded bg-primary px-3.5 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <span>Live Demo</span>
          <IconExternalLink className="size-3.5" />
        </ExtendedLink>
      )}
    </div>
  );
}

/**
 * ProjectCard — PricingCard-DNA minimal card: outer inset panel (p-1.5),
 * media panel with glass-muted surface, collapsible features.
 */
function ProjectCard({ project }) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-1.5 shadow-sm transition-colors duration-300 hover:border-primary hover:shadow-md">
      <MediaPanel project={project} />

      <div className="flex flex-1 flex-col gap-3 p-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
          <span className="inline-block size-1.5 rounded-full bg-primary" />
          <span>
            {project.industry || project.tag || "Software Engineering"}
          </span>
        </div>

        <div className="space-y-1.5">
          <h4 className="text-base font-bold text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h4>
          <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        </div>

        <FeaturesList features={project.features} />

        {project.strategies?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.strategies.map((strategy) => (
              <span
                key={strategy}
                className="inline-flex items-center gap-1 rounded border border-border/50 bg-surface px-2 py-0.5 text-[10.5px] font-medium text-foreground/80"
              >
                <IconCheck className="size-2.5 shrink-0 text-primary" />
                {strategy}
              </span>
            ))}
          </div>
        )}

        {project.tech?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.tech.map((tag) => (
              <TechPill key={tag} name={tag} size="sm" />
            ))}
          </div>
        )}

        <CardFooter project={project} />
      </div>
    </article>
  );
}

export default ProjectCard;