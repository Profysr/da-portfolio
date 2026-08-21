"use client";

import { mdxComponents } from "@/components/mdx-components";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { IconArrowLeft, IconCalendar, IconClock } from "@tabler/icons-react";
import Link from "next/link";

interface WritingContentProps {
  page: {
    data: {
      title: string;
      description: string;
      date: string;
      readTime?: string;
      tags?: string[];
      thumbnail?: string;
      body: React.ReactNode;
    };
    url: string;
  };
}

export function WritingContent({ page }: WritingContentProps) {
  const MDX = page.data.body;

  return (
    <Section className="py-8 md:py-12" noFade>
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/#activities"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <IconArrowLeft className="size-4" />
          Back to Writings
        </Link>

        <header className="mb-10">
          <GradientHeading as="h1" className="text-2xl sm:text-3xl md:text-4xl mb-3">
            {page.data.title}
          </GradientHeading>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5">
            {page.data.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <IconCalendar className="size-3.5" />
              {new Date(page.data.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {page.data.readTime && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <IconClock className="size-3.5" />
                {page.data.readTime} read
              </span>
            )}
            {page.data.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[11px]">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <div className="h-px bg-border mb-8" />

        <article className="prose prose-invert prose-sm sm:prose-base max-w-none">
          <MDX components={mdxComponents} />
        </article>
      </div>
    </Section>
  );
}