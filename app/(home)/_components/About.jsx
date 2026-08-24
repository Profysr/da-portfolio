"use client";

import { personal, about, contributions } from "@/data/idx";
import { Section } from "@/components/layout/Section";
import { DoubleBezel } from "@/components/ui/DoubleBezel";
import { AvatarStatus } from "@/components/AvatarStatus";
import { ScrollReveal, StaggeredReveal } from "@/components/ui/ScrollReveal";
import {
  IconMapPin,
  IconDownload,
  Icon360View,
  IconClock,
  IconGitBranch,
  IconBrandGithub,
} from "@tabler/icons-react";
import { HeatmapGrid } from "@/components/Heatmap";
import { ViewOnMap } from "@/components/watermelon/ViewOnMap";
import { NumberSlider } from "@/components/watermelon/NumberSlider";
import { downloadResume } from "@/lib/download";
import { useState, useEffect } from "react";
import { useGitHubStats } from "@/hooks/useGitHubStats";

/* ── Live GMT clock ─────────────────────────────────────────────────── */
function LiveClock({ timeZone = "UTC", label = "GMT" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [timeZone]);

  return (
    <span className="font-mono text-xs text-muted-foreground">
      {time ? `${time} ${label}` : "--:--:--"}
    </span>
  );
}

/* ── Editorial-split About ──────────────────────────────────────────── */
export default function About() {
  const { stats } = useGitHubStats();
  const [heatmapWeeks, setHeatmapWeeks] = useState(30);

  const [statement, ...supportingParts] = personal.bio.split(". ");
  const supporting = supportingParts.join(". ");

  const experienceStat = about.stats[0] ?? {};
  const repoValue = stats?.publicRepos ? `${stats.publicRepos}+` : "40+";
  const contributionValue = stats?.totalContributions
    ? `${stats.totalContributions}+`
    : "829+";

  const statItems = [
    {
      value: experienceStat.value || "2 Yrs 8 Mos",
      label: experienceStat.title || "In Industry",
      icon: IconClock,
    },
    {
      value: repoValue,
      label: "Public Repos",
      icon: IconGitBranch,
    },
    {
      value: contributionValue,
      label: "Contributions",
      icon: Icon360View,
    },
  ];

  return (
    <Section id="about" className="py-section-tight" noFade>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Editorial split — statement left */}
        <div className="flex flex-col justify-center gap-6 lg:col-span-7">
          <ScrollReveal variant="reveal" duration={0.8} once={false}>
            <p className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
              {statement}.
            </p>
          </ScrollReveal>

          {supporting && (
            <ScrollReveal variant="fade" duration={0.7} delay={0.1} once={false}>
              <p className="max-w-xl leading-relaxed text-muted-foreground">
                {supporting}.
              </p>
            </ScrollReveal>
          )}

          <StaggeredReveal
            variant="fade"
            staggerDelay={0.08}
            once={false}
            delay={0.15}
            className="flex flex-wrap gap-x-10 gap-y-4"
          >
            {statItems.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon
                  className="mt-1 h-4 w-4 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-2xl font-bold tracking-tight">{value}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </StaggeredReveal>

          <ScrollReveal
            variant="fade"
            duration={0.7}
            delay={0.25}
            once={false}
            className="flex flex-wrap items-center gap-4"
          >
            <ViewOnMap />
            {personal.resumeUrl && (
              <button
                type="button"
                onClick={() => downloadResume(personal.resumeUrl)}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-medium transition-all hover:border-primary/40 hover:text-primary active:scale-95 text-sm"
              >
                <IconDownload className="h-5 w-5" strokeWidth={1.5} />
                Resume
              </button>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <IconMapPin className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span>{personal.location}</span>
              <span aria-hidden="true">·</span>
              <IconClock className="h-4 w-4" strokeWidth={1.5} />
              <LiveClock timeZone="Asia/Karachi" label="PKT" />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* GitHub rhythm band */}
      <ScrollReveal
        variant="reveal"
        duration={0.8}
        delay={0.1}
        once={false}
        className="mt-12"
      >
        <div className="rounded-lg border border-border bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20 text-primary">
                <IconBrandGithub className="h-4.5 w-4.5" strokeWidth={1.5} />
              </span>
              <div>
                <h4 className="text-base font-semibold">GitHub Rhythm</h4>
                <p className="text-xs text-muted-foreground">
                  Commits, open-source PRs, and build cadence
                </p>
              </div>
            </div>
              <NumberSlider
                label="Range"
                unit="wks"
                min={12}
                max={52}
                step={2}
                value={heatmapWeeks}
                onChange={setHeatmapWeeks}
                layout="row"
                className="w-60"
              />
          </div>
          <div className="overflow-x-auto px-5 py-5">
            <HeatmapGrid
              weeks={heatmapWeeks}
              githubUsername={
                stats?.username || contributions.githubUsername || "Profysr"
              }
              realContributionCalendar={stats?.contributionCalendar}
              overrideTotal={stats?.totalContributions}
            />
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
