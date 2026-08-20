"use client";

import { useLocation } from "react-router-dom";
import { GradientHeading } from "../ui/Heading";

export function ReadingNav() {
  const { pathname } = useLocation();
  const title = pathname.startsWith("/projects")
    ? "Projects"
    : pathname.startsWith("/writing")
      ? "Writing"
      : "Reading";

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