"use client";

import { personal, about, contributions } from "@/data/idx";
import { Section } from "@/components/layout/Section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoCard } from "@/components/ui/bento-grid";
import { AvatarStatus } from "@/components/AvatarStatus";
import { Globe } from "@/components/ui/globe";
import {
  IconMapPin,
  IconWorld,
  IconDownload,
  Icon360View,
  IconClock,
  IconGitBranch,
} from "@tabler/icons-react";
import { ContactCard } from "@/components/ContactCard";
import { Particles } from "@/components/ui/particles";
import { StatCard } from "@/components/StatCard";
import { HeatmapGrid } from "@/components/Heatmap";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────
 *  Unified About & Contributions Bento Grid
 * ───────────────────────────────────────────────────────────── */
export default function About() {
  const bentoItems = [
    // 1. About Me Bio Card
    {
      id: "about-me",
      className:
        "col-span-12 md:col-span-4 md:row-span-4 md:col-start-1 md:row-start-1",
      delay: 0.05,
      content: (
        <BentoCard className="h-full">
          <div className="flex flex-col gap-3 py-2">
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/15 bg-white/4 text-xs font-medium text-white hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                <IconDownload className="h-3.5 w-3.5 text-primary" />
                Resume
              </a>
            )}
          </div>
        </BentoCard>
      ),
    },

    // 2. Interactive Globe Card
    {
      id: "location-globe",
      className:
        "col-span-12 md:col-span-4 md:row-span-4 md:col-start-5 md:row-start-1",
      delay: 0.08,
      content: (
        <BentoCard
          title="Location & Presence"
          subtitle={personal.locationLabel}
          Icon={IconMapPin}
          badge={personal.timezone}
          className="h-full min-h-60"
        >
          <div className="relative flex-1 my-1 min-h-36 flex items-center justify-center overflow-hidden">
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

{
      id: "stat-industry",
      className:
        "col-span-6 md:col-span-2 md:row-span-3 md:col-start-9 md:row-start-1",
      delay: 0.14,
      content: (
        <StatCard
          title="Experience"
          value={about.stats[0]?.value || "2.8+ Yrs"}
          subtext="In Industry"
          icon={about.stats[0]?.icon || IconClock}
          className="h-full"
        />
      ),
    },

    // 6. Stat Card 2: Hours / Commits (Moved UP to top right)
    {
      id: "stat-commits",
      className:
        "col-span-6 md:col-span-2 md:row-span-3 md:col-start-11 md:row-start-1",
      delay: 0.16,
      content: (
        <StatCard
          title="Commits"
          value={contributions.stats[2]?.value ? `${contributions.stats[2].value}+` : "2,500+"}
          subtext="Year to Date"
          icon={IconGitBranch}
          className="h-full"
        />
      ),
    },

    // 4. GitHub Heatmap Card (Merged into About)
    {
      id: "github-heatmap",
      className:
        "col-span-12 md:col-span-8 md:row-span-3 md:col-start-1 md:row-start-5",
      delay: 0.12,
      content: (
        <BentoCard
          title="GitHub Rhythm & Velocity"
          subtitle="Real-time commits, open-source PRs, and build cadence"
          Icon={Icon360View}
          badge={`@${contributions.githubUsername}`}
          className="h-full justify-between"
        >
          <div className="flex-1 flex items-center justify-center my-auto py-2 overflow-x-auto">
            <HeatmapGrid
              weeks={contributions.heatmapWeeks || 30}
              githubUsername={contributions.githubUsername || "Profysr"}
            />
          </div>
        </BentoCard>
      ),
    },
        
    // 3. Connect & Collaborate Card
{
      id: "connect-card",
      className:
        "col-span-12 md:col-span-4 md:row-span-4 md:col-start-9 md:row-start-4",
      delay: 0.1,
      content: (
        <BentoCard
          title="Connect & Collaborate"
          subtitle="Direct network links"
          Icon={IconWorld}
          className="h-full min-h-60"
        >
          <ContactCard />
        </BentoCard>
      ),
    },
  ];

  return (
    <Section id="about" className="relative py-12 md:py-16" noFade>
      <Particles
        className="absolute inset-0"
        quantity={120}
        ease={60}
        color="#ffffff"
        size={0.7}
      />

      {/* Unified 12-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-7 gap-1 sm:gap-2">
        {bentoItems.map((item) => (
          <BlurFade
            key={item.id}
            inView
            delay={item.delay}
            className={cn(item.className, "bg-surface/50")}
          >
            {item.content}
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
