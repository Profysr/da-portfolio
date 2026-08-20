"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// GitHub Dark Theme standard green levels
const LEVEL_COLORS = [
  "bg-[#161b22] border border-[#21262d]", // Level 0 (None)
  "bg-[#0e4429] border border-[#0e4429]", // Level 1 (Low)
  "bg-[#006d32] border border-[#006d32]", // Level 2 (Medium-Low)
  "bg-[#26a641] border border-[#26a641]", // Level 3 (Medium-High)
  "bg-[#39d353] border border-[#39d353]", // Level 4 (High)
];

const LEVEL_COUNTS = [0, 2, 5, 8, 14];

export function HeatmapGrid({
  weeks = 32,
  githubUsername = "Profysr",
  className = "",
  realContributionCalendar = null,
  overrideTotal = null,
}) {
  const [revealed, setRevealed] = useState(false);

  // Generate or parse heatmap data
  const { weeksData, totalContributions } = useMemo(() => {
    // 1. If real GraphQL contribution calendar is passed from API
    if (realContributionCalendar?.weeks && Array.isArray(realContributionCalendar.weeks)) {
      const rawWeeks = realContributionCalendar.weeks.slice(-weeks);
      const parsedWeeks = rawWeeks.map((w) =>
        w.contributionDays.map((d) => {
          let level = 0;
          if (d.contributionLevel === "FIRST_QUARTILE") level = 1;
          else if (d.contributionLevel === "SECOND_QUARTILE") level = 2;
          else if (d.contributionLevel === "THIRD_QUARTILE") level = 3;
          else if (d.contributionLevel === "FOURTH_QUARTILE") level = 4;
          else if (d.contributionCount > 0) level = Math.min(4, Math.ceil(d.contributionCount / 3));

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
        })
      );
      return {
        weeksData: parsedWeeks,
        totalContributions: overrideTotal ?? realContributionCalendar.totalContributions ?? 0,
      };
    }

    // 2. Deterministic fallback heatmap data
    const totalDays = weeks * 7;
    const rand = mulberry32(1337);
    const days = [];
    const now = new Date();
    let total = 0;

    for (let i = totalDays - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dayOfWeek = date.getDay(); // 0 = Sun
      const weekIndex = Math.floor((totalDays - 1 - i) / 7);

      const base =
        dayOfWeek === 0 || dayOfWeek === 6 ? rand() * 3 : rand() * 8 + 1;
      const trend = 0.6 + (weekIndex / weeks) * 0.8;
      const spike = rand() < 0.08 ? rand() * 9 : 0;
      const level = Math.min(
        4,
        Math.max(0, Math.round((base * trend + spike) / 2.6)),
      );

      const count =
        level === 0 ? 0 : Math.round(LEVEL_COUNTS[level] + (rand() * 4 - 2));
      total += Math.max(0, count);

      days.push({
        date: date.toISOString().split("T")[0],
        formattedDate: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        level,
        count: Math.max(0, count),
        dayOfWeek,
      });
    }

    // Group into columns of weeks (7 days each)
    const groupedWeeks = [];
    for (let w = 0; w < weeks; w++) {
      groupedWeeks.push(days.slice(w * 7, (w + 1) * 7));
    }

    return {
      weeksData: groupedWeeks,
      totalContributions: overrideTotal ?? total,
    };
  }, [weeks, realContributionCalendar, overrideTotal]);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn("w-full flex flex-col justify-between h-full", className)}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-semibold text-white">
              {totalContributions.toLocaleString()}
            </span>{" "}
            contributions in range
          </div>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-emerald-400/90 hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            @{githubUsername}
          </a>
        </div>

        <div className="w-full overflow-x-auto pb-1 scrollbar-none">
          <div className="flex gap-xs w-full justify-between items-center">
            {weeksData.map((week, wIdx) => (
              <div
                key={wIdx}
                className="flex flex-col gap-xs"
              >
                {week.map((day, dIdx) => {
                  const isCellActive = revealed;
                  const displayLevel = isCellActive ? day.level : 0;

                  return (
                    <Tooltip key={day.date}>
                      <TooltipTrigger asChild>
                        <div
                          /* Scaled dimensions on bigger viewports: h-3 w-3 -> sm:h-3.5 sm:w-3.5 -> md:h-4 md:w-4 -> lg:h-[18px] lg:w-[18px] */
                          className={cn(
                            "h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 rounded-xs transition-all duration-300 hover:scale-125 hover:z-20 cursor-pointer",
                            LEVEL_COLORS[displayLevel],
                          )}
                          style={{
                            transitionDelay: `${(wIdx * 7 + dIdx) * 4}ms`,
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="text-[11px] px-2.5 py-1"
                      >
                        <div className="font-semibold text-white">
                          {day.count}{" "}
                          {day.count === 1 ? "contribution" : "contributions"}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {day.formattedDate}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-[10px] text-muted-foreground/80">
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
      </div>
    </TooltipProvider>
  );
}
