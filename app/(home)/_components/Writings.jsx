"use client";

import React from "react";
import { Section } from "@/components/layout/Section";
import { LazyContentCarousel } from "@/components/lazy";
import { writings } from "@/data/idx";

export default function Writings() {
  return (
    <Section id="writings" className="bg-surface">
      <div className="w-full">
        <LazyContentCarousel
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
