"use client";

import { useNavigate } from "react-router-dom";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "@/components/ui/Heading";
import { IconArrowLeft } from "@tabler/icons-react";

export function NotFound({ title = "Page not found", message = "", backLabel = "Go back" }) {
  const navigate = useNavigate();
  return (
    <Section className="py-20">
      <div className="max-w-4xl mx-auto text-center">
        <GradientHeading as="h1" className="text-2xl mb-4">
          {title}
        </GradientHeading>
        <p className="text-muted-foreground text-sm mb-6">
          {message || "The page you're looking for doesn't exist or has been moved."}
        </p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline cursor-pointer"
        >
          <IconArrowLeft className="size-4" />
          {backLabel}
        </button>
      </div>
    </Section>
  );
}