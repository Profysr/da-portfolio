"use client";

import React, { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/Heading";
import { IconSparkles } from "@tabler/icons-react";
import { TechPill } from "@/components/common/TechPill";
import { Section } from "@/components/layout/Section";
import { LazyHorizontalScroll } from "@/components/lazy";
import { SkillsAndTools } from "@/data/idx";
import { cn } from "@/lib/utils";

export function TechHeader() {
  return (
    <div className="w-full flex flex-col items-center text-center gap-2 px-4 sm:px-6">
      <Badge
        variant="outline"
        className="tracking-[0.25em] text-[10px] bg-background/80 text-muted-foreground border-border/60 uppercase shadow-none px-3 py-0.5 font-mono rounded-full"
      >
        Arsenal & Tools
      </Badge>
      <Heading
        variant="gradient"
        text="Technologies & Stack"
        as="h2"
        className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground"
      />
      <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-md font-normal leading-normal">
        Production tools, runtimes, and agentic orchestration frameworks I use
        to build scalable systems.
      </p>
    </div>
  );
}

export function TechClusterCard({ group, index, totalGroups }) {
  const Icon = group.Icon ?? IconSparkles;

  return (
    <div
      className={cn(
        "group relative shrink-0 flex flex-col justify-between",
        "w-[320px] sm:w-[380px] md:w-[430px] lg:w-[480px]",
        "rounded-xl border p-4 sm:p-5 md:p-6 transition-all duration-300 select-none overflow-hidden shadow-xs hover:shadow-md hover:scale-[1.01]",
        group.shade ?? "shade-card-canvas",
      )}
    >
      {/* Top subtle highlight line */}
      <div className="absolute inset-x-0 -top-px h-px bg-linear-to-r from-transparent via-current/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-xl" />

      {/* Card Content */}
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-2">
          {/* Header row with index badge & Icon */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(totalGroups).padStart(2, "0")}
            </span>
            <div className="flex items-center justify-center size-8 sm:size-9 rounded-lg border border-current/20 bg-current/10 shrink-0">
              <Icon className="size-4 sm:size-4.5" strokeWidth={1.75} />
            </div>
          </div>

          {/* Category Title */}
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
            {group.category}
          </h3>

          {/* Minimalist Tech Pills grid */}
          <div className="flex flex-wrap gap-x-2 gap-y-1 w-full">
            {group.items?.map((item) => (
              <div key={item.name} className="stack-pill">
                <TechPill
                  name={item.name}
                  size="responsive"
                  subCategory={item.subCategory ?? undefined}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Footer */}
        <div className="pt-3 border-t border-current/15 flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-widest uppercase opacity-75">
          <span>{group.items?.length ?? 0} ITEMS</span>
          <span className="size-1.5 rounded-full bg-current opacity-80" />
        </div>
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <Section
      id="stack"
      noFade={true}
      innerClassName="max-w-none px-0 w-full"
      className="p-0! bg-surface w-full overflow-visible!"
    >
      <LazyHorizontalScroll
        itemCount={SkillsAndTools.length}
        scrollLengthVh={320}
        header={<TechHeader />}
      >
        {SkillsAndTools.map((group, idx) => (
          <TechClusterCard
            key={group.category}
            group={group}
            index={idx}
            totalGroups={SkillsAndTools.length}
          />
        ))}
      </LazyHorizontalScroll>
    </Section>
  );
}
