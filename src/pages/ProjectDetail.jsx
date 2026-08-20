"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProjectBySlug } from "@/lib/content";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { TechPill } from "@/components/TechPill";
import { Streamdown } from "streamdown";
import {
  IconArrowLeft,
  IconExternalLink,
  IconBrandGithub,
  IconCalendar,
  IconCheck,
  IconRocket,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function ActionButton({ href, children, isInternal = false }) {
  if (!href || href === "#") return null;

  const className = cn(
    "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200",
    "border border-border/80 bg-surface-high/60 backdrop-blur-sm text-foreground hover:border-primary/50 hover:bg-surface-high hover:text-white hover:shadow-lg hover:shadow-primary/5"
  );

  if (isInternal) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getProjectBySlug(slug)
      .then((p) => {
        if (!cancelled) {
          if (p) setProject(p);
          else setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) {
    return (
      <Section className="py-24">
        <div className="max-w-md mx-auto text-center border border-border/60 bg-surface-high/30 p-8 rounded-2xl backdrop-blur-sm">
          <GradientHeading as="h1" className="text-2xl mb-2">
            Project Not Found
          </GradientHeading>
          <p className="text-muted-foreground text-sm mb-6">
            The project &ldquo;{slug}&rdquo; couldn&apos;t be found or may have moved.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <IconArrowLeft className="size-4" />
            Return to Projects
          </button>
        </div>
      </Section>
    );
  }

  if (!project) {
    return (
      <Section className="py-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="h-6 w-20 rounded-lg bg-surface-high/50 animate-pulse" />
          <div className="h-12 w-3/4 rounded-xl bg-surface-high/50 animate-pulse" />
          <div className="h-20 w-full rounded-2xl bg-surface-high/30 animate-pulse" />
        </div>
      </Section>
    );
  }

  return (
    <Section className="py-8 md:py-16" noFade>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Navigation / Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer"
        >
          <IconArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Overview
        </button>

        {/* Hero Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="light" className="text-xs px-2.5 py-0.5 rounded-md font-medium">
              {project.category}
            </Badge>
            {project.industry && (
              <Badge variant="lightInfo" className="text-xs px-2.5 py-0.5 rounded-md font-medium">
                {project.industry}
              </Badge>
            )}
            {project.access && (
              <Badge variant="lightWarning" className="text-xs px-2.5 py-0.5 rounded-md font-medium">
                {project.access}
              </Badge>
            )}
          </div>

          <GradientHeading as="h1" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {project.title}
          </GradientHeading>

          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
            {project.description}
          </p>

          {/* External Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.live && (
              <ActionButton href={project.live}>
                <IconRocket className="size-4 text-primary" />
                Live Product
                <IconExternalLink className="size-3.5 opacity-60" />
              </ActionButton>
            )}
            {project.github && (
              <ActionButton href={project.github}>
                <IconBrandGithub className="size-4" />
                Source Code
              </ActionButton>
            )}
            {project.changelog && (
              <ActionButton href={`/projects/${slug}/changelog`} isInternal>
                <IconCalendar className="size-4 text-primary" />
                Changelog History
              </ActionButton>
            )}
          </div>
        </header>

        {/* Grid Layout: Main Article (Left) vs Metadata Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Markdown Content Area */}
          <main className="lg:col-span-8">
            <article
              className={cn(
                "prose prose-invert prose-slate max-w-none",
                // Editorial Typography Tuning
                "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:border-b [&_h1]:border-border/60 [&_h1]:pb-3",
                "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-foreground",
                "[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-foreground/90",
                "[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-5 [&_p]:text-sm sm:[&_p]:text-base",
                "[&_ul]:text-muted-foreground [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-6",
                "[&_ol]:text-muted-foreground [&_ol]:mb-6 [&_ol]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6",
                "[&_li]:text-sm sm:[&_li]:text-base",
                "[&_a]:text-primary [&_a]:font-medium [&_a]:no-underline hover:[&_a]:underline",
                // Quotes / Q&A Callouts
                "[&_blockquote]:border-l-2 [&_blockquote]:border-primary/80 [&_blockquote]:bg-surface-high/30 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:rounded-r-xl [&_blockquote]:not-italic [&_blockquote]:my-6",
                // Inline & Block Code
                "[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:bg-surface-high [&_code]:text-xs [&_code]:font-mono [&_code]:text-foreground/90",
                "[&_pre]:bg-surface-high/80 [&_pre]:border [&_pre]:border-border/60 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6",
                // Images
                "[&_img]:rounded-xl [&_img]:border [&_img]:border-border/60 [&_img]:shadow-md [&_img]:my-8"
              )}
            >
              <Streamdown>{project.content}</Streamdown>
            </article>
          </main>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-8">
            {/* Tech Stack Section */}
            {project.tech?.length > 0 && (
              <div className="p-6 rounded-2xl border border-border/60 bg-surface-high/20 backdrop-blur-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  Tech Stack & Tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <TechPill key={t} name={t} size="sm" />
                  ))}
                </div>
              </div>
            )}

            {/* Key Highlights / Strategies */}
            {project.strategies?.length > 0 && (
              <div className="p-6 rounded-2xl border border-border/60 bg-surface-high/20 backdrop-blur-sm">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  Key Highlights
                </h2>
                <ul className="space-y-3">
                  {project.strategies.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                      <div className="mt-0.5 p-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                        <IconCheck className="size-3.5" />
                      </div>
                      <span className="leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

        </div>
      </div>
    </Section>
  );
}