"use client";

import { personal, about, contributions } from "@/data/idx";
import { Section } from "@/components/layout/Section";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoCard } from "@/components/ui/bento-grid";
import { AvatarStatus } from "@/components/AvatarStatus";
import { LazyParticles } from "@/components/common/lazy";
import {
  IconMapPin,
  IconWorld,
  IconDownload,
  Icon360View,
  IconClock,
  IconGitBranch,
} from "@tabler/icons-react";
import { ContactCard } from "@/components/ContactCard";
import { StatCard } from "@/components/StatCard";
import { HeatmapGrid } from "@/components/Heatmap";
import { downloadResume } from "@/lib/download";
import { Suspense, useState, useEffect } from "react";
import { useGitHubStats } from "@/hooks/useGitHubStats";

import Image from "next/image";
import { cn } from "@/lib/utils";

// __ Live GMT / Local Clock Component _________________________________
export function LiveClock({ timeZone = "UTC", label = "GMT" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Formats to HH:MM:SS AM/PM based on desired timezone
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    updateTime(); // Initial run on mount
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, [timeZone]);

  return (
    <span className="font-mono text-muted-foreground font-medium">
      {time ? `${time} ${label}` : "Loading..."}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
 *  Unified About & Contributions Bento Grid
 * ───────────────────────────────────────────────────────────── */
export default function About() {
  const { stats } = useGitHubStats();

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
              <button
                type="button"
                onClick={() => downloadResume(personal.resumeUrl)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/15 bg-white/4 text-xs font-medium text-white hover:border-primary/50 hover:bg-primary/10 transition-all"
              >
                <IconDownload className="h-3.5 w-3.5 text-primary" />
                Resume
              </button>
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
            <Image
              src="/pakistan.svg"
              alt="Pakistan map"
              width={300}
              height={200}
              className="w-full h-auto max-h-52 object-contain"
            />
          </div>
          <div className="flex items-center justify-end gap-1 pt-2 border-t border-white/10 text-xs">
            <IconClock className="h-3.5 w-3.5 text-primary" />
            <LiveClock timeZone="UTC" label="GMT" />
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
      id: "stat-projects",
      className:
        "col-span-6 md:col-span-2 md:row-span-3 md:col-start-11 md:row-start-1",
      delay: 0.16,
      content: (
        <StatCard
          title="Projects Built"
          value={
            stats?.publicRepos
              ? `${stats.publicRepos}+ Repos`
              : about.stats[1]?.value || "20+"
          }
          subtext={
            stats?.totalStars ? `${stats.totalStars} Stars` : "Public Repos"
          }
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
          badge={`@${stats?.username || contributions.githubUsername}`}
          className="h-full justify-between"
        >
          <div className="flex-1 flex items-center justify-center my-auto py-2 overflow-x-auto">
            <HeatmapGrid
              weeks={contributions.heatmapWeeks || 30}
              githubUsername={
                stats?.username || contributions.githubUsername || "Profysr"
              }
              realContributionCalendar={stats?.contributionCalendar}
              overrideTotal={stats?.totalContributions}
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
      <Suspense fallback={null}>
        <LazyParticles className="absolute inset-0" />
      </Suspense>

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
