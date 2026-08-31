"use client";

import React from "react";
import { LazyContentCarousel } from "@/components/lazy";

export function SimilarContent({
  items = [],
  type = "writing",
  currentSlug = "",
}) {
  if (!items || items.length === 0) return null;

  const isProject = type === "project" || type === "projects";
  const sectionTitle = isProject ? "Related Projects" : "Related Writing";
  const sectionSubtitle = isProject
    ? "Explore other systems, tools, and architectures."
    : "More articles, guides, and engineering notes.";
  const viewAllHref = isProject ? "/#projects" : "/#writings";

  return (
    <div className="pt-10 w-full">
      <LazyContentCarousel
        badge={isProject ? "PROJECTS" : "WRITINGS"}
        title={sectionTitle}
        subtitle={sectionSubtitle}
        items={items}
        type={type}
        viewAllHref={viewAllHref}
        viewAllText={isProject ? "All projects" : "All writing"}
      />
    </div>
  );
}

export default SimilarContent;
