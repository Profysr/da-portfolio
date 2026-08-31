"use client";

import { Section } from "@/components/layout/Section";
import { Skeleton, SkeletonShapes } from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero skeleton */}
      <Section className="min-h-[100dvh] flex items-center justify-center pt-28">
        <div className="w-full max-w-4xl px-6 space-y-6">
          <Skeleton className="h-10 w-24 rounded-full bg-primary/20" />
          <Skeleton className="h-12 w-3/4 bg-muted" />
          <Skeleton className="h-6 w-1/2 bg-muted/50" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-36 rounded-lg bg-muted" />
            <Skeleton className="h-10 w-36 rounded-lg bg-muted" />
          </div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      </Section>

      {/* About skeleton */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <Skeleton className="h-8 w-1/3 bg-muted" />
          <Skeleton className="h-6 w-full bg-muted/50" />
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <SkeletonShapes.cardCompact key={i} />
            ))}
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-40 rounded-lg bg-muted" />
            <Skeleton className="h-10 w-32 rounded-lg bg-muted/50" />
          </div>
        </div>
      </Section>

      {/* TechStack skeleton — horizontal scroller */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <Skeleton className="h-8 w-24 bg-muted mb-6" />
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory">
            {[...Array(5)].map((_, i) => (
              <SkeletonShapes.techCard key={i} className="snap-start" />
            ))}
          </div>
        </div>
      </Section>

      {/* Experience skeleton — timeline */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Skeleton className="h-8 w-32 bg-muted mb-8" />
          <div className="relative pl-6 border-l border-border/50">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative pb-10 before:absolute before:left-[-6px] before:top-0 before:size-3 before:rounded-full before:bg-primary">
                <Skeleton className="h-6 w-1/2 bg-muted mb-2" />
                <Skeleton className="h-16 w-full bg-muted/50 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects skeleton — bento grid */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <Skeleton className="h-8 w-32 bg-muted mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Hero 2x2 */}
            <Skeleton className="lg:col-span-2 lg:row-span-2 h-80 rounded-lg border border-border bg-muted" />
            {/* 2x1 */}
            <Skeleton className="lg:col-span-2 h-40 rounded-lg border border-border bg-muted" />
            {/* 1x1 x2 */}
            <SkeletonShapes.cardCompact />
            <SkeletonShapes.cardCompact />
          </div>
        </div>
      </Section>

      {/* Credentials + Writings + FAQ skeleton */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <div>
            <Skeleton className="h-8 w-32 bg-muted mb-6" />
            <div className="flex flex-wrap gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-28 rounded-lg bg-muted" />
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-24 bg-muted mb-6" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <SkeletonShapes.cardCompact key={i} />
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-20 bg-muted mb-6" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg border border-border bg-muted/50" />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}