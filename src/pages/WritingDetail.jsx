"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWritingBySlug } from "@/lib/content";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { Streamdown } from "streamdown";
import {
  IconArrowLeft,
  IconCalendar,
  IconClock,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function WritingDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [writing, setWriting] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getWritingBySlug(slug)
      .then((w) => {
        if (!cancelled) {
          if (w) setWriting(w);
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
      <Section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <GradientHeading as="h1" className="text-2xl mb-4">
            Writing not found
          </GradientHeading>
          <p className="text-muted-foreground text-sm mb-6">
            The post &ldquo;{slug}&rdquo; doesn&apos;t exist or has been removed.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline cursor-pointer"
          >
            <IconArrowLeft className="size-4" />
            Go back
          </button>
        </div>
      </Section>
    );
  }

  if (!writing) {
    return (
      <Section className="py-20">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 rounded bg-surface-high" />
            <div className="h-4 w-1/2 rounded bg-surface-high" />
            <div className="h-4 w-full rounded bg-surface-high" />
            <div className="h-4 w-5/6 rounded bg-surface-high" />
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section className="py-8 md:py-12" noFade>
      <div className="max-w-4xl mx-auto">
        {/* Back button inside body */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-8"
        >
          <IconArrowLeft className="size-4" />
          Back
        </button>

        {/* Hero block */}
        <header className="mb-10">
          <GradientHeading as="h1" className="text-2xl sm:text-3xl md:text-4xl mb-3">
            {writing.title}
          </GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5">
            {writing.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <IconCalendar className="size-3.5" />
              {new Date(writing.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <IconClock className="size-3.5" />
              {writing.readTime} read
            </span>
            {writing.tags?.map((tag) => (
              <Badge key={tag} variant="light" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Markdown body */}
        <article
          className={cn(
            "prose prose-invert prose-sm sm:prose-base max-w-none",
            "[&_h1]:text-xl [&_h1]:font-semibold [&_h1]:mt-8 [&_h1]:mb-3",
            "[&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-7 [&_h2]:mb-2.5",
            "[&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2",
            "[&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4",
            "[&_ul]:text-muted-foreground [&_ul]:mb-4 [&_ul]:pl-5",
            "[&_ol]:text-muted-foreground [&_ol]:mb-4 [&_ol]:pl-5",
            "[&_li]:mb-1.5",
            "[&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/40 hover:[&_a]:decoration-primary",
            "[&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
            "[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-surface-high [&_code]:text-xs [&_code]:text-foreground",
            "[&_pre]:bg-surface-high [&_pre]:border [&_pre]:border-border [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-6",
            "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
            "[&_img]:rounded-lg [&_img]:border [&_img]:border-border [&_img]:my-6",
            "[&_hr]:border-border [&_hr]:my-8",
          )}
        >
          <Streamdown>{writing.content}</Streamdown>
        </article>
      </div>
    </Section>
  );
}