"use client";

import { personal, about, favoriteStack } from "@/data/idx";
import { Section } from "@/components/layout/Section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoCard } from "@/components/ui/bento-grid";
import { AvatarStatus } from "@/components/AvatarStatus";
import { Globe } from "@/components/ui/globe";
import {
  IconMapPin,
  IconSparkles,
  IconWorld,
  IconDownload,
  IconFolderCode,
  IconClock,
  IconActivity,
  IconRobot,
} from "@tabler/icons-react";
import { ContactCard } from "@/components/ContactCard";
import { ToolsMarqueeCard } from "@/components/TechCard";
import { Particles } from "@/components/ui/particles";
import { StatCard } from "@/components/StatCard";

/* ─────────────────────────────────────────────────────────────
 *  Main About Section Component
 * ───────────────────────────────────────────────────────────── */
export default function About() {
  const bentoItems = [
    // 1. About Me Card
    {
      id: "about-me",
      className:
        "col-span-12 md:col-span-4 md:row-span-5 md:col-start-1 md:row-start-1",
      delay: 0.05,
      content: (
        <BentoCard className="h-full">
          <div className="flex flex-col gap-3.5 py-2">
            <AvatarStatus />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {personal.bio}
            </p>
          </div>

          <div className="pt-2.5 border-t border-white/10 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <IconMapPin className="h-3 w-3 text-primary/70" />
              <span className="text-[11px] font-mono">{personal.location}</span>
            </div>
            {personal.resumeUrl && (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/[0.04] text-xs font-medium text-white hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                <IconDownload className="h-3.5 w-3.5 text-primary" />
                Get Resume
              </a>
            )}
          </div>
        </BentoCard>
      ),
    },

    // 2. Globe Card
    {
      id: "location-globe",
      className:
        "col-span-12 md:col-span-4 md:row-span-3 md:col-start-5 md:row-start-1",
      delay: 0.1,
      content: (
        <BentoCard
          title="Location & Presence"
          subtitle={personal.locationLabel}
          Icon={IconMapPin}
          badge={personal.timezone}
          className="h-full min-h-65"
        >
          <div className="relative flex-1 my-1 min-h-40 flex items-center justify-center overflow-hidden">
            <Globe className="scale-90 sm:scale-95" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <IconWorld className="h-3.5 w-3.5 text-primary" />
              <span>Worldwide</span>
            </div>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live
            </span>
          </div>
        </BentoCard>
      ),
    },

    // 3-6. Dynamic Stat Cards mapped directly into the array
    ...about.stats.map((stat, index) => ({
      id: `stat-${stat.id}`,
      className: stat.spanClass,
      delay: 0.12 + index * 0.02,
      content: (
        <StatCard
          title={stat.title}
          value={stat.value}
          subtext={stat.subtext}
          icon={stat.icon}
          isCompact={stat.isCompact}
          className="h-full"
        />
      ),
    })),

    // 7. Favorite Stack Card
    {
      id: "favorite-stack",
      className:
        "col-span-12 md:col-span-4 md:row-span-2 md:col-start-5 md:row-start-4",
      delay: 0.2,
      content: (
        <BentoCard
          title={favoriteStack.title}
          subtitle={favoriteStack.subtitle}
          Icon={IconSparkles}
          badge="Stack"
          className="h-full flex flex-col justify-between"
        >
          <div className="p-2.5 rounded-lg border border-primary/20 bg-linear-to-br from-primary/10 via-white/[0.02] to-transparent my-auto">
            <div className="text-xs font-semibold text-white tracking-tight">
              {favoriteStack.stack}
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1.5">
            <span>Production Ready</span>
            <span className="text-primary font-medium">
              {favoriteStack.tag}
            </span>
          </div>
        </BentoCard>
      ),
    },

    // 8. Contact Card
    {
      id: "connect-card",
      className:
        "col-span-12 md:col-span-4 md:row-span-4 md:col-start-9 md:row-start-5",
      delay: 0.22,
      content: (
        <BentoCard
          title="Connect & Collaborate"
          subtitle="Direct network links"
          Icon={IconWorld}
          className="h-full min-h-70"
        >
          <ContactCard />
        </BentoCard>
      ),
    },
  ];

  return (
    <Section id="about" className="relative py-10 sm:pt-14" noFade>
      <Particles
        className="absolute inset-0"
        quantity={200}
        ease={60}
        color="#ffffff"
        size={0.75}
      />

      {/* Section Header */}
      {/* <BlurFade inView delay={0}>
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium mb-2.5">
            <IconSparkles className="h-3 w-3" />
            <span>Profile & Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-headline-md">
            {about.heading}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            {about.subheading}
          </p>
        </div>
      </BlurFade> */}

      {/* 12-Column x 8-Row Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-8 gap-2.5 sm:gap-3">
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

        <ToolsMarqueeCard />
      </div>
    </Section>
  );
}
