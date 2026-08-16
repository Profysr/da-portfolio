"use client";

import { personal, about, favoriteStack, tools, skills } from "@/data/idx";
import { Section } from "@/components/layout/Section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoCard } from "@/components/ui/bento-grid";
import { AvatarStatus } from "@/components/AvatarStatus";
import { Globe } from "@/components/ui/globe";
import { Marquee } from "@/components/ui/marquee";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

/* ─────────────────────────────────────────────────────────────
 *  Main About Section (Exact Bento Grid: 12 Cols x 8 Rows)
 * ───────────────────────────────────────────────────────────── */
export default function About() {
  const stats = about.stats;

  return (
    <Section id="about" className="pt-10 sm:pt-14 pb-16" noFade>
      {/* Section Header */}
      <BlurFade inView delay={0}>
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
      </BlurFade>

      {/* 12-Column x 8-Row Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-8 gap-2.5 sm:gap-3">
        {/* div1: About Me Card (Cols 1..4, Rows 1..6) */}
        <BlurFade
          inView
          delay={0.05}
          className="col-span-12 md:col-span-4 md:row-span-6 md:col-start-1 md:row-start-1"
        >
          <BentoCard
            // title={personal.name}
            // subtitle={personal.tagline}
            // badge="Forward Deployed"
            className="h-full"
          >
            <div className="flex flex-col gap-3.5 py-2">
              <AvatarStatus />

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {personal.bio}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 4).flatMap((cat) =>
                  cat.items.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex px-2 py-0.5 rounded-md border border-primary/15 bg-primary/[0.06] text-[10px] font-medium text-primary/90"
                    >
                      {skill}
                    </span>
                  ))
                ).slice(0, 8)}
              </div>
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
        </BlurFade>

        {/* div19: Globe Card (Cols 5..8, Rows 1..4) */}
        <BlurFade
          inView
          delay={0.1}
          className="col-span-12 md:col-span-4 md:row-span-4 md:col-start-5 md:row-start-1"
        >
          <BentoCard
            title="Location & Presence"
            subtitle={personal.locationLabel}
            Icon={IconMapPin}
            badge={personal.timezone}
            className="h-full min-h-[260px]"
          >
            <div className="relative flex-1 my-1 min-h-[160px] flex items-center justify-center overflow-hidden">
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
        </BlurFade>

        {/* div20: Stat Card - In Industry (Cols 9..10, Rows 1..2) */}
        <BlurFade
          inView
          delay={0.12}
          className="col-span-12 sm:col-span-6 md:col-span-2 md:row-span-2 md:col-start-9 md:row-start-1"
        >
          <BentoCard className="h-full flex flex-col justify-between p-3.5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium">
                {stats.industry.title}
              </span>
              <IconClock className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            </div>
            <div className="my-auto">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono leading-none">
                {stats.industry.value}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground/70 font-mono">
              {stats.industry.subtext}
            </span>
          </BentoCard>
        </BlurFade>

        {/* div17: Stat Card - Projects Built (Cols 11..12, Row 1) */}
        <BlurFade
          inView
          delay={0.14}
          className="col-span-12 sm:col-span-6 md:col-span-2 md:row-span-1 md:col-start-11 md:row-start-1"
        >
          <BentoCard className="h-full flex items-center justify-between p-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">
                {stats.projects.title}
              </span>
              <span className="text-lg font-bold text-white font-mono">
                {stats.projects.value}
              </span>
            </div>
            <IconFolderCode className="h-4 w-4 text-primary/70 shrink-0" />
          </BentoCard>
        </BlurFade>

        {/* div28: Stat Card - Hours Logged (Cols 11..12, Rows 2..3) */}
        <BlurFade
          inView
          delay={0.16}
          className="col-span-12 sm:col-span-6 md:col-span-2 md:row-span-2 md:col-start-11 md:row-start-2"
        >
          <BentoCard className="h-full flex flex-col justify-between p-3.5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium">
                {stats.hours.title}
              </span>
              <IconActivity className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            </div>
            <div className="my-auto">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono leading-none">
                {stats.hours.value}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground/70 font-mono">
              {stats.hours.subtext}
            </span>
          </BentoCard>
        </BlurFade>

        {/* div21: Stat Card - Automations (Cols 9..10, Row 3) */}
        <BlurFade
          inView
          delay={0.18}
          className="col-span-12 sm:col-span-6 md:col-span-2 md:row-span-1 md:col-start-9 md:row-start-3"
        >
          <BentoCard className="h-full flex items-center justify-between p-3">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground">
                {stats.automations.title}
              </span>
              <span className="text-lg font-bold text-white font-mono">
                {stats.automations.value}
              </span>
            </div>
            <IconRobot className="h-4 w-4 text-primary/70 shrink-0" />
          </BentoCard>
        </BlurFade>

        {/* div32: Core Powerhouse / Favorite Stack (Cols 5..8, Rows 5..6) */}
        <BlurFade
          inView
          delay={0.2}
          className="col-span-12 md:col-span-4 md:row-span-2 md:col-start-5 md:row-start-5"
        >
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
        </BlurFade>

        {/* div22: Connect with AnimatedBeam (Cols 9..12, Rows 4..8) */}
        <BlurFade
          inView
          delay={0.22}
          className="col-span-12 md:col-span-4 md:row-span-5 md:col-start-9 md:row-start-4"
        >
          <BentoCard
            title="Connect & Collaborate"
            subtitle="Direct network links"
            Icon={IconWorld}
            badge="Live Beams"
            className="h-full min-h-[280px]"
          >
            <ContactCard />
          </BentoCard>
        </BlurFade>

        {/* div25: Tools Marquee Card (Cols 1..8, Rows 7..8) */}
        <BlurFade
          inView
          delay={0.24}
          className="col-span-12 md:col-span-8 md:row-span-2 md:col-start-1 md:row-start-7"
        >
          <BentoCard
            title="Tools & Technologies"
            subtitle="Daily development stack"
            badge={`${tools.length}+ Tools`}
            className="h-full justify-center"
          >
            <TooltipProvider delayDuration={0}>
              <div className="relative overflow-hidden py-2 my-auto">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent z-10" />

                <Marquee pauseOnHover className="[--duration:26s]">
                  {tools.map((tool) => (
                    <Tooltip key={tool.name}>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-primary/40 hover:scale-105 transition-all duration-300 cursor-pointer">
                          <img
                            src={tool.icon}
                            alt={`${tool.name} icon`}
                            className="h-5 w-5 object-contain shrink-0"
                            loading="lazy"
                          />
                          <span className="text-xs font-medium text-white/90">
                            {tool.name}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="text-[10px] px-2 py-0.5"
                      >
                        {tool.category}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </Marquee>
              </div>
            </TooltipProvider>
          </BentoCard>
        </BlurFade>
      </div>
    </Section>
  );
}
