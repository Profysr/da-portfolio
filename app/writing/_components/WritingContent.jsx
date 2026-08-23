"use client";

import { useMDXComponents } from "@/components/mdx-components";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { IconArrowLeft, IconCalendar, IconClock } from "@tabler/icons-react";
import Link from "next/link";

export function WritingContent({ meta, children }) {
  const mdxComponents = useMDXComponents();

  const formattedDate = meta?.date
    ? new Date(meta.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <Section className="py-8 md:py-12" noFade>
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/#writings"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <IconArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Writings
        </Link>

        <header className="mb-10">
          <Heading
            variant="gradient"
            as="h1"
            className="text-2xl sm:text-3xl md:text-4xl mb-3"
          >
            {meta?.title}
          </Heading>

          {meta?.description && (
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5">
              {meta.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {formattedDate && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <IconCalendar className="size-3.5" />
                {formattedDate}
              </span>
            )}

            {meta?.readTime && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <IconClock className="size-3.5" />
                {meta.readTime} read
              </span>
            )}

            {meta?.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <div className="h-px bg-border mb-8" />

        <article className="prose prose-invert prose-sm sm:prose-base max-w-none">
          {children}
        </article>
      </div>
    </Section>
  );
}
