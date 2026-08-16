"use client";

import { Section } from "@/components/layout/Section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { HeatmapGrid } from "@/components/Heatmap";
import { NumberTicker } from "@/components/ui/number-ticker";
import { contributions } from "@/data/idx";
import { IconActivity, IconClock } from "@tabler/icons-react";

export default function Contributions() {
  return (
    <Section id="contributions" className="pt-6 sm:pt-10 pb-20" noFade>
      {/* Section Header */}
      <BlurFade inView delay={0}>
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium mb-2.5">
            <IconActivity className="h-3 w-3" />
            <span>Output & Rhythm</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-headline-md">
            {contributions.heading}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            {contributions.subheading}
          </p>
        </div>
      </BlurFade>

      {/* Bento Grid */}
      <BentoGrid>
        {/* 1. GitHub Activity Heatmap (8 cols on lg) */}
        <BlurFade inView delay={0.05} className="col-span-12 lg:col-span-8">
          <BentoCard
            title="GitHub Velocity"
            subtitle="Daily commits, open-source PRs, and build rhythm"
            Icon={IconActivity}
            badge="Active Streak"
            className="h-full min-h-[220px]"
          >
            <div className="flex-1 flex items-center justify-center my-auto py-2">
              <HeatmapGrid
                weeks={contributions.heatmapWeeks || 28}
                githubUsername={contributions.githubUsername || "Profysr"}
              />
            </div>
          </BentoCard>
        </BlurFade>

        {/* 2. 4 Separate Velocity Metric Cards (4 cols on lg) */}
        <BlurFade inView delay={0.1} className="col-span-12 lg:col-span-4">
          <div className="grid grid-cols-2 gap-3 h-full">
            {contributions.stats.map((stat, idx) => {
              const IconComp = stat.icon || IconClock;
              return (
                <BentoCard
                  key={stat.label}
                  className="flex flex-col justify-between p-3.5 sm:p-4"
                >
                  <div className="flex items-center justify-between text-muted-foreground mb-1.5">
                    <span className="text-[11px] font-medium leading-tight">
                      {stat.label}
                    </span>
                    <IconComp className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                  </div>
                  <div className="flex items-baseline gap-0.5 my-1">
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                      <NumberTicker value={stat.value} delay={0.05 * (idx + 1)} />
                    </span>
                    {stat.suffix && (
                      <span className="text-lg text-primary font-bold">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground/70 font-mono">
                    {stat.badge}
                  </span>
                </BentoCard>
              );
            })}
          </div>
        </BlurFade>
      </BentoGrid>
    </Section>
  );
}
