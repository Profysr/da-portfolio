"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getProjectBySlug } from "@/lib/content";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { Streamdown } from "streamdown";
import { IconArrowLeft, IconArrowLeft as BackIcon, IconCalendar } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

function parseChangelogEntries(markdown) {
  if (!markdown) return [];
  const entries = [];
  const blocks = markdown.split(/^## /m).filter(Boolean);
  for (const block of blocks) {
    const firstLine = block.split("\n")[0].trim();
    const match = firstLine.match(/^v([\d.]+)\s*[—\-]\s*(.+)$/);
    if (!match) continue;
    entries.push({
      version: match[1],
      date: match[2].trim(),
      body: block.slice(block.indexOf("\n") + 1).trim(),
    });
  }
  return entries;
}

export default function ProjectChangelog() {
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

  const entries = useMemo(
    () => parseChangelogEntries(project?.changelog),
    [project?.changelog]
  );

  if (error) {
    return (
      <Section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <GradientHeading as="h1" className="text-2xl mb-4">
            Project not found
          </GradientHeading>
          <p className="text-muted-foreground text-sm mb-6">
            The project &ldquo;{slug}&rdquo; doesn&apos;t exist or has no changelog.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline cursor-pointer"
          >
            <BackIcon className="size-4" />
            Go back
          </button>
        </div>
      </Section>
    );
  }

  if (!project) {
    return (
      <Section className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 rounded bg-surface-high" />
            <div className="h-4 w-1/2 rounded bg-surface-high" />
          </div>
        </div>
      </Section>
    );
  }

  if (!entries.length) {
    return (
      <Section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <GradientHeading as="h1" className="text-2xl mb-4">
            No changelog yet
          </GradientHeading>
          <p className="text-muted-foreground text-sm mb-6">
            {project.title} doesn&apos;t have a published changelog.
          </p>
          <Link
            to={`/projects/${slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline cursor-pointer"
          >
            <BackIcon className="size-4" />
            Back to project
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section className="py-8 md:py-12" noFade>
      <div className="max-w-4xl mx-auto">
        {/* Back button inside body */}
        <Link
          to={`/projects/${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8"
        >
          <BackIcon className="size-4" />
          Back to {project.title}
        </Link>

        {/* Header */}
        <header className="mb-10">
          <GradientHeading as="h1" className="text-2xl sm:text-3xl md:text-4xl mb-2">
            Changelog
          </GradientHeading>
          <p className="text-muted-foreground text-sm">
            Version history for <span className="text-foreground font-medium">{project.title}</span>
          </p>
        </header>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <ul className="space-y-8">
            {entries.map((entry) => (
              <li key={entry.version} className="relative flex gap-6">
                {/* Left: sticky version bubble */}
                <div className="shrink-0 w-16 pt-1">
                  <div className="flex flex-col items-center">
                    <span className="relative z-10 flex size-3.5 items-center justify-center">
                      <span className="absolute size-3.5 rounded-full bg-primary" />
                    </span>
                    <span className="mt-1.5 text-[11px] font-mono font-semibold text-primary">
                      v{entry.version}
                    </span>
                  </div>
                </div>

                {/* Right: date + content */}
                <div className="flex-1 min-w-0 pb-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground mb-2">
                    <IconCalendar className="size-3" />
                    {entry.date}
                  </span>
                  <div
                    className={cn(
                      "prose prose-invert prose-sm max-w-none",
                      "[&_h1]:text-lg [&_h1]:font-semibold [&_h1]:mt-0 [&_h1]:mb-3",
                      "[&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-2",
                      "[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-3 [&_h3]:mb-1.5",
                      "[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-3",
                      "[&_ul]:text-muted-foreground [&_ul]:mb-3 [&_ul]:pl-5",
                      "[&_ol]:text-muted-foreground [&_ol]:mb-3 [&_ol]:pl-5",
                      "[&_li]:mb-1",
                      "[&_strong]:text-foreground",
                      "[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-surface-high [&_code]:text-xs [&_code]:text-foreground",
                      "[&_pre]:bg-surface-high [&_pre]:border [&_pre]:border-border [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-4",
                      "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
                    )}
                  >
                    <Streamdown>{entry.body}</Streamdown>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}