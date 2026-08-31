"use client";

import { personal, about } from "@/data/idx";
import { Section } from "@/components/layout/Section";
import { ScrollReveal, StaggeredReveal } from "@/components/ui/ScrollReveal";
import { NumberTicker } from "@/components/ui/number-ticker";
import {
  IconMapPin,
  IconDownload,
  Icon360View,
  IconClock,
  IconGitBranch,
  IconBrandGithub,
} from "@tabler/icons-react";
import { LazyHeatmap, LazyViewOnMap } from "@/components/lazy";
import { NumberSlider } from "@/components/common/NumberSlider";
import { downloadResume } from "@/utils/download";
import { useState, useEffect } from "react";
import { useGitHubStats } from "@/hooks/useGitHubStats";

/* ── Live PKT clock ─────────────────────────────────────────────────── */
function LiveClock({ timeZone = "Asia/Karachi", label = "PKT" }) {
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
    <span className="text-sm font-medium tracking-wide text-foreground">
      {time ? `${time} ${label}` : "--:--:--"}
    </span>
  );
}

/* ── Editorial About ────────────────────────────────────────────────── */
export default function About() {
  const { stats } = useGitHubStats();
  const [sliderWeeks, setSliderWeeks] = useState(30);
  const [heatmapWeeks, setHeatmapWeeks] = useState(30);

  /* Debounce: slider moves freely; API-consuming heatmap updates 350ms after rest */
  useEffect(() => {
    const timer = setTimeout(() => setHeatmapWeeks(sliderWeeks), 350);
    return () => clearTimeout(timer);
  }, [sliderWeeks]);

  const [statement, ...supportingParts] = personal.bio.split(". ");
  const supporting = supportingParts.join(". ");

  const experienceStat = about.stats[0] ?? {};
  const repoCount = stats?.publicRepos ?? 61;
  const contributionCount = stats?.totalContributions ?? 829;

  const statsData = [
    {
      id: "experience",
      icon: IconClock,
      value: experienceStat.value || "2 Yrs 8 Mos",
      title: experienceStat.title || "In Industry",
      isTicker: false,
    },
    {
      id: "repos",
      icon: IconGitBranch,
      value: repoCount,
      title: "Public Repos",
      isTicker: true,
    },
    {
      id: "contributions",
      icon: Icon360View,
      value: contributionCount,
      title: "Contributions",
      isTicker: true,
    },
  ];

  return (
    <Section id="about" noFade>
      <div className="flex flex-col gap-6">
        <ScrollReveal variant="reveal" duration={0.8} once={true}>
          <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]">
            {statement}.
          </h2>
        </ScrollReveal>

        {supporting && (
          <ScrollReveal variant="fade" duration={0.7} delay={0.1} once={true}>
            <p className="leading-relaxed text-muted-foreground">
              {supporting}.
            </p>
          </ScrollReveal>
        )}

        <StaggeredReveal
          variant="fade"
          staggerDelay={0.08}
          delay={0.15}
          once={true}
          className="flex flex-wrap gap-x-10 gap-y-4"
        >
          {statsData.map(({ id, icon: Icon, value, title, isTicker }) => (
            <div key={id} className="flex items-start gap-2.5">
              <Icon
                className="mt-1 h-4 w-4 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <p className="text-2xl font-bold tracking-tight">
                  {isTicker ? <NumberTicker value={value} /> : value}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {title}
                </p>
              </div>
            </div>
          ))}
        </StaggeredReveal>

        <ScrollReveal
          variant="fade"
          duration={0.7}
          delay={0.25}
          once={true}
          className="flex flex-wrap items-center gap-4"
        >
          {personal.resumeUrl && (
            <button
              type="button"
              onClick={() => downloadResume(personal.resumeUrl)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-all hover:border-primary/40 hover:text-primary active:scale-95"
            >
              <IconDownload className="h-4 w-4" strokeWidth={1.5} />
              Resume
            </button>
          )}

          <LazyViewOnMap />

          {/* Live Clock */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <IconMapPin className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span>{personal.location}</span>
            </div>

            {/* Enhanced Live Clock Pill */}
            <div className="inline-flex items-center gap-2 rounded-md border border-border/60 bg-muted/50 px-3 py-1 shadow-e1">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <LiveClock timeZone="Asia/Karachi" label="PKT" />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* GitHub rhythm band */}
      <ScrollReveal
        variant="reveal"
        duration={0.8}
        delay={0.1}
        once={true}
        className="mt-12"
      >
        <div className="rounded-lg border border-border bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-md bg-background">
                <IconBrandGithub className="h-4.5 w-4.5" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="text-base font-semibold">GitHub Rhythm</h3>
                <p className="text-xs text-muted-foreground">
                  Commits, open-source PRs, and build cadence
                </p>
              </div>
            </div>
            <NumberSlider
              label="Range"
              unit="wks"
              min={24}
              max={44}
              step={2}
              value={sliderWeeks}
              onChange={setSliderWeeks}
              layout="row"
              className="w-60"
            />
          </div>
          <div className="overflow-x-auto px-5 py-5">
            <LazyHeatmap
              key={heatmapWeeks}
              weeks={heatmapWeeks}
              githubUsername={stats?.username || personal.githubUsername}
              realContributionCalendar={stats?.contributionCalendar}
              overrideTotal={stats?.totalContributions}
            />
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}
