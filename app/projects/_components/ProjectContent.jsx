"use client";

import { useMDXComponents } from "@/components/mdx-components";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { TechPill } from "@/components/common/TechPill";
import { ExtendedLink } from "@/components/common/ExtendedLink";
import {
  IconArrowLeft,
  IconCalendar,
  IconExternalLink,
  IconBrandGithub,
  IconRocket,
} from "@tabler/icons-react";
import Link from "next/link";

export function ProjectContent({ meta, children, changelog }) {
  const mdxComponents = useMDXComponents();

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

  return (
    <Section className="py-8 md:py-12" noFade>
      <div className="max-w-5xl mx-auto px-4">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <IconArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Projects
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="outline" className="text-[11px] capitalize">
              {meta.category}
            </Badge>
            <Badge variant="secondary" className="text-[11px]">
              {meta.industry}
            </Badge>
            <Badge variant={accessVariant} className="text-[11px]">
              {meta.access}
            </Badge>
          </div>

          <Heading
            variant="gradient"
            as="h1"
            className="text-2xl sm:text-3xl md:text-4xl mb-3"
          >
            {meta.title}
          </Heading>

          {meta.description && (
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5">
              {meta.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {formattedDate && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <IconCalendar className="size-3.5" />
                {formattedDate}
              </span>
            )}
          </div>

          {(hasGithub || hasLive) && (
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {hasGithub && (
                <ExtendedLink
                  href={meta.github}
                  newTab
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border border-border bg-surface text-foreground hover:border-primary hover:bg-surface-hover"
                >
                  <IconBrandGithub className="size-4" />
                  Source
                </ExtendedLink>
              )}
              {hasLive && (
                <ExtendedLink
                  href={meta.live}
                  newTab
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border border-border bg-primary text-primary-foreground hover:bg-primary-hover"
                >
                  <IconRocket className="size-4" />
                  Live Demo
                  <IconExternalLink className="size-3.5 opacity-60" />
                </ExtendedLink>
              )}
            </div>
          )}

          {meta.strategies?.length > 0 && (
            <div className="mb-6">
              <p className="text-[10.5px] uppercase font-mono tracking-wider text-muted-foreground/80 mb-2">
                Key Strategies & Patterns
              </p>
              <div className="flex flex-wrap gap-1.5">
                {meta.strategies.map((strat) => (
                  <span
                    key={strat}
                    className="inline-flex items-center gap-1 rounded bg-surface border border-border/50 px-2 py-0.5 text-[10.5px] font-medium text-foreground"
                  >
                    <span className="size-1.5 rounded-full bg-primary" />
                    {strat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {meta.tech?.length > 0 && (
            <div className="mb-6">
              <p className="text-[10.5px] uppercase font-mono tracking-wider text-muted-foreground/80 mb-2">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-1">
                {meta.tech.map((tag) => (
                  <TechPill key={tag} name={tag} size="sm" className="" />
                ))}
              </div>
            </div>
          )}
        </header>

        <div className="h-px bg-border mb-8" />

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <article className="prose prose-invert prose-sm sm:prose-base max-w-none">
              {children}
            </article>

            {changelog && changelog.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-primary">📋</span>
                  Changelog
                </h2>
                <div className="space-y-4">
                  {changelog.map((entry) => (
                    <details
                      key={entry.version}
                      className="group border border-border rounded-lg overflow-hidden bg-surface/50"
                    >
                      <summary className="p-4 cursor-pointer list-none flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded bg-primary/10 text-primary text-sm font-mono font-semibold">
                            {entry.version}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {new Date(entry.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <span className="text-primary transition-transform group-open:rotate-90">
                          ▶
                        </span>
                      </summary>
                      <div className="px-4 pb-4 border-t border-border/50">
                        <ul className="space-y-2 text-muted-foreground text-sm">
                          {entry.items.map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-primary shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-lg border border-border bg-surface p-5">
                <h3 className="text-sm font-semibold mb-3">Project Info</h3>
                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="font-medium">{meta.category}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Industry</dt>
                    <dd className="font-medium">{meta.industry}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Access</dt>
                    <dd className="font-medium">{meta.access}</dd>
                  </div>
                  {formattedDate && (
                    <div>
                      <dt className="text-muted-foreground">Date</dt>
                      <dd className="font-medium">{formattedDate}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {meta.strategies?.length > 0 && (
                <div className="rounded-lg border border-border bg-surface p-5">
                  <h3 className="text-sm font-semibold mb-3">Strategies</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {meta.strategies.map((s) => (
                      <li key={s} className="flex gap-2">
                        <span className="text-primary shrink-0">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {meta.tech?.length > 0 && (
                <div className="rounded-lg border border-border bg-surface p-5">
                  <h3 className="text-sm font-semibold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-1">
                    {meta.tech.map((tag) => (
                      <TechPill key={tag} name={tag} size="sm" className="" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}