"use client";

import { useRouter } from "next/navigation";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { IconArrowLeft } from "@tabler/icons-react";

export function NotFound({ title = "Page not found", message = "", backLabel = "Go back" }) {
  const router = useRouter();
  return (
    <Section className="py-20">
      <div className="max-w-4xl mx-auto text-center">
        <Heading variant="gradient" as="h1" className="text-2xl mb-4">
          {title}
        </Heading>
        <p className="text-muted-foreground text-sm mb-6">
          {message || "The page you're looking for doesn't exist or has been moved."}
        </p>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline cursor-pointer"
        >
          <IconArrowLeft className="size-4" />
          {backLabel}
        </button>
      </div>
    </Section>
  );
}