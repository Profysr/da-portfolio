"use client";

import { Section } from "@/components/layout/Section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { HeatmapGrid } from "@/components/Heatmap";
import { StatCard } from "@/components/StatCard";
import { contributions } from "@/data/idx";
import { Icon360View, IconClock } from "@tabler/icons-react";
import Heading from "@/components/ui/Heading";

/* ─────────────────────────────────────────────────────────────
 *  Bento grid items list — driven entirely by data/idx.js
 * ───────────────────────────────────────────────────────────── */
function getBentoItems() {
  const items = [
    {
      id: "github-velocity",
      className:
        "col-span-12 md:col-span-8 md:row-span-2 md:col-start-1 md:row-start-1",
      delay: 0.05,
      content: (
        <BentoCard
          title="Heatmap"
          subtitle="Daily commits, open-source PRs, and build rhythm"
          Icon={Icon360View}
          // badge="Active Streak"
          // className="h-full min-h-40"
        >
          <div className="flex-1 flex items-center justify-center my-auto py-2">
            <HeatmapGrid
              weeks={contributions.heatmapWeeks || 28}
              githubUsername={contributions.githubUsername || "Profysr"}
            />
          </div>
        </BentoCard>
      ),
    },
  ];

  let statIdx = 0;
  contributions.stats.forEach((stat) => {
    const icon = stat.icon || IconClock;
    items.push({
      id: `stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`,
      className: `col-span-12 ${stat.spanClass || ""}`,
      delay: 0.1 + statIdx * 0.02,
      content: (
        <StatCard
          title={stat.label}
          value={stat.value}
          subtext={stat.badge}
          icon={icon}
          className="h-full"
        />
      ),
    });
    statIdx++;
  });

  return items;
}

export default function Contributions() {
  const bentoItems = getBentoItems();

  return (
    <Section id="contributions" noFade>
      <Heading title="Github" watermarkClassName="top-0 -translate-y-1/2">
        <BentoGrid>
          {bentoItems.map((item) => (
            <BlurFade
              key={item.id}
              inView
              delay={item.delay}
              className={item.className}
            >
              {item.content}
            </BlurFade>
          ))}
        </BentoGrid>
      </Heading>
    </Section>
  );
}
