"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { IconArrowLeft, IconMoodEmpty } from "@tabler/icons-react";

/**
 * Reusable error/empty state for detail pages.
 *
 * @param {string} title       – e.g. "Writing not found"
 * @param {string} message     – description text
 * @param {string} slug        – optional slug to interpolate into message
 * @param {object} action      – { label, to } for the primary action button
 *                                If omitted, defaults to a "Go back" button.
 */
export function PageError({ title, message, slug, action }) {
  const router = useRouter();

  const defaultMessage = slug
    ? `The page "${slug}" doesn't exist or has been moved.`
    : "The page you're looking for doesn't exist or has been moved.";

  return (
    <Section className="py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center size-14 rounded-full border border-border bg-surface-high/60 mb-5">
          <IconMoodEmpty className="size-6 text-muted-foreground" />
        </div>
        <Heading variant="gradient" as="h1" className="text-2xl mb-3">
          {title}
        </Heading>
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
          {message || defaultMessage}
        </p>

        {action?.to ? (
          <Link
            href={action.to}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-surface-high hover:border-primary/50 hover:text-white text-sm font-medium transition-all cursor-pointer"
          >
            <IconArrowLeft className="size-4" />
            {action.label || "Go back"}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-surface-high hover:border-primary/50 hover:text-white text-sm font-medium transition-all cursor-pointer"
          >
            <IconArrowLeft className="size-4" />
            {action?.label || "Go back"}
          </button>
        )}
      </div>
    </Section>
  );
}