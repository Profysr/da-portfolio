"use client";

import { GradientHeading } from "../ui/Heading";

export function ReadingNav({ title = "Reading" }) {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border">
      <div className="max-w-4xl mx-auto flex items-center h-12 px-4 sm:px-6">
        <GradientHeading as="span" className="text-sm font-semibold tracking-tight">
          {title}
        </GradientHeading>
      </div>
    </header>
  );
}