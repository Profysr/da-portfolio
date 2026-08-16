"use client";

import { Section } from "@/components/layout/Section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { strategies } from "@/data/idx";
import { IconSparkles } from "@tabler/icons-react";

export default function Strategies() {
  return (
    <Section id="strategies" className="pt-8 sm:pt-12 pb-16" noFade>
      {/* Section Header */}
      <BlurFade inView delay={0}>
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium mb-2.5">
            <IconSparkles className="h-3 w-3" />
            <span>Architecture & Mastery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-headline-md">
            Core Strategies & Concepts
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            Key architectural paradigms, AI orchestration patterns, and computational foundations.
          </p>
        </div>
      </BlurFade>

      {/* 4 Strategy Cards Grid */}
      <BentoGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {strategies.map((strat, idx) => {
          const IconComp = strat.icon;
          return (
            <BlurFade
              key={strat.id}
              inView
              delay={0.05 * (idx + 1)}
              className="col-span-1"
            >
              <BentoCard
                title={strat.title}
                Icon={IconComp}
                badge={strat.badge}
                className="h-full flex flex-col justify-between"
              >
                <p className="text-xs text-muted-foreground leading-relaxed mt-2 mb-4 flex-1">
                  {strat.description}
                </p>
                <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[10px] text-primary/80 font-mono">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="text-muted-foreground/60">Verified Mastery</span>
                </div>
              </BentoCard>
            </BlurFade>
          );
        })}
      </BentoGrid>
    </Section>
  );
}
