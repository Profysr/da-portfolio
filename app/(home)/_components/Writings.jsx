"use client";

import React from "react";
import { Section } from "@/components/layout/Section";
import { ContentCarousel } from "@/components/common/ContentCarousel";
import { writings } from "@/data/idx";

export default function Writings() {
  return (
    <Section id="writings" className="bg-surface">
      <div className="w-full">
        <ContentCarousel
          badge="WRITINGS"
          title="Essays & Articles"
          subtitle="Deep dives on data visualization, engineering patterns, and career signals — written for practitioners."
          items={writings}
          type="writing"
        />
      </div>
    </Section>
  );
}
