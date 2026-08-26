"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconActivity } from "@tabler/icons-react";

const LEVEL_COLORS = [
  "bg-[#ebedf0] dark:bg-white/[0.04] border border-black/5 dark:border-white/[0.06]", // Level 0 (None)
  "bg-[#9be9a8] dark:bg-[#0e4429] border border-emerald-700/10 dark:border-emerald-500/40", // Level 1 (1+ contributions)
  "bg-[#40c463] dark:bg-[#006d32] border border-emerald-700/10 dark:border-emerald-400/50", // Level 2
  "bg-[#30a14e] dark:bg-[#26a641] border border-emerald-700/10 dark:border-emerald-300/60", // Level 3
  "bg-[#216e39] dark:bg-[#39d353] border border-emerald-700/10 dark:border-emerald-300 dark:shadow-[0_0_8px_rgba(52,211,153,0.35)]", // Level 4
];

// Custom Hook: Data Extraction & Normalization
function useContributionData(realContributionCalendar, weeks, overrideTotal) {
  const isRealtime = Boolean(
    realContributionCalendar?.weeks &&
    Array.isArray(realContributionCalendar.weeks) &&
    realContributionCalendar.weeks.length > 0,
  );

  const { weeksData, totalContributions } = useMemo(() => {
    if (!isRealtime) return { weeksData: [], totalContributions: 0 };

    const rawWeeks = realContributionCalendar.weeks.slice(-weeks);
    const parsedWeeks = rawWeeks.map((w) =>
      w.contributionDays.map((d) => {
        let level = 0;
        if (d.contributionLevel === "FIRST_QUARTILE") level = 1;
        else if (d.contributionLevel === "SECOND_QUARTILE") level = 2;
        else if (d.contributionLevel === "THIRD_QUARTILE") level = 3;
        else if (d.contributionLevel === "FOURTH_QUARTILE") level = 4;
        else if (d.contributionCount > 0)
          level = Math.min(4, Math.ceil(d.contributionCount / 3));

        const dateObj = new Date(d.date);
        return {
          date: d.date,
          formattedDate: dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          level,
          count: d.contributionCount,
          dayOfWeek: dateObj.getDay(),
        };
      }),
    );

    return {
      weeksData: parsedWeeks,
      totalContributions:
        overrideTotal ?? realContributionCalendar.totalContributions ?? 0,
    };
  }, [weeks, realContributionCalendar, overrideTotal, isRealtime]);

  return { isRealtime, weeksData, totalContributions };
}

// Sub-component: Live API Indicator Badge
function StatusBadge({ isRealtime }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border cursor-pointer transition-colors",
            isRealtime
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "bg-surface-muted border-border text-muted-foreground",
          )}
        >
          <span className="relative flex h-1.5 w-1.5">
            {isRealtime && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={cn(
                "relative inline-flex rounded-full h-1.5 w-1.5",
                isRealtime ? "bg-emerald-500" : "bg-muted-foreground/50",
              )}
            />
          </span>
          <span>{isRealtime ? "Live API" : "Offline"}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-[11px] max-w-[220px]">
        {isRealtime
          ? "Connected directly to GitHub GraphQL API v4"
          : "No live data supplied. Connect GraphQL response payload."}
      </TooltipContent>
    </Tooltip>
  );
}

// Sub-component: Header Bar
function HeatmapHeader({ totalContributions, isRealtime, githubUsername }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">
            {totalContributions.toLocaleString()}
          </span>{" "}
          contributions in range
        </div>
        <StatusBadge isRealtime={isRealtime} />
      </div>

      <a
        href={`https://github.com/${githubUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline transition-all flex items-center gap-1"
      >
        @{githubUsername}
      </a>
    </div>
  );
}

// Sub-component: Individual Heatmap Square
function HeatmapCell({ day, revealed, wIdx, dIdx }) {
  const displayLevel = revealed ? day.level : 0;

  return (
    <Tooltip key={day.date}>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "h-3 w-3 md:h-4 md:w-4 rounded-xs transition-all duration-500 hover:scale-105 cursor-pointer",
            revealed ? "scale-100 opacity-100" : "scale-50 opacity-30",
            LEVEL_COLORS[displayLevel],
          )}
          style={{
            transitionDelay: `${(wIdx * 7 + dIdx) * 3}ms`,
          }}
        />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="text-[11px] px-2.5 py-1 bg-popover text-popover-foreground border border-border shadow-md"
      >
        <div className="font-semibold text-foreground">
          {day.count} {day.count === 1 ? "contribution" : "contributions"}
        </div>
        <div className="text-[10px] text-muted-foreground">
          {day.formattedDate}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

// Sub-component: Grid View
function HeatmapGridContent({ weeksData, revealed }) {
  return (
    <div className="w-full overflow-x-auto pb-1 scrollbar-none">
      <div className="flex gap-xs w-full justify-between items-center">
        {weeksData.map((week, wIdx) => (
          <div key={wIdx} className="flex flex-col gap-xs">
            {week.map((day, dIdx) => (
              <HeatmapCell
                key={day.date}
                day={day}
                revealed={revealed}
                wIdx={wIdx}
                dIdx={dIdx}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Sub-component: Empty State Placeholder
function HeatmapEmptyState() {
  return (
    <div className="w-full py-8 px-4 rounded-lg border border-dashed border-border bg-surface-muted/40 flex flex-col items-center justify-center text-center gap-1.5 my-auto">
      <IconActivity className="h-5 w-5 text-muted-foreground/60 mb-1" />
      <span className="text-xs font-medium text-foreground">
        GitHub API Not Connected
      </span>
      <p className="text-[11px] text-muted-foreground max-w-[260px]">
        Provide a valid{" "}
        <code className="text-[10px]">realContributionCalendar</code> object to
        view live commit metrics.
      </p>
    </div>
  );
}

// Sub-component: Footer Legend
function HeatmapLegend({ weeks }) {
  return (
    <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground">
      <span>Last {weeks} weeks</span>
      <div className="flex items-center gap-1.5">
        <span>Less</span>
        {LEVEL_COLORS.map((color, i) => (
          <div
            key={i}
            className={cn("h-2.5 w-2.5 md:h-3 md:w-3 rounded-xs", color)}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

// Main Container Component
export function HeatmapGrid({
  weeks = 32,
  githubUsername = "Profysr",
  className = "",
  realContributionCalendar = null,
  overrideTotal = null,
}) {
  const [revealed, setRevealed] = useState(false);
  const { isRealtime, weeksData, totalContributions } = useContributionData(
    realContributionCalendar,
    weeks,
    overrideTotal,
  );

  /* Reveal on mount + re-stagger the wave every time the week range changes */
  useEffect(() => {
    if (!isRealtime) return undefined;

    const raf = requestAnimationFrame(() => setRevealed(false));
    const timer = setTimeout(() => setRevealed(true), 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [isRealtime, weeks]);

  return (
    <div
      className={cn("w-full flex flex-col justify-between h-full", className)}
    >
      <HeatmapHeader
        totalContributions={totalContributions}
        isRealtime={isRealtime}
        githubUsername={githubUsername}
      />

      {isRealtime ? (
        <HeatmapGridContent weeksData={weeksData} revealed={revealed} />
      ) : (
        <HeatmapEmptyState />
      )}

      <HeatmapLegend weeks={weeks} />
    </div>
  );
}
