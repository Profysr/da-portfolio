```
json

export default function Dashboard() {

  const { data: githubData, isLoading: isLoadingGitHub } = useGitHub();
  const dashboardIconClass = "h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary";

  return (
    <div className="flex flex-col w-full">
      <CustomCursor />
      <SectionHeading icon={<IconLayoutDashboard className={headingIconClass} />}>
        About Me
      </SectionHeading>
      <ul
        className={`grid w-full gap-4 ${styles.dashboardGrid}`}>
        <GridItem
          area="location"
          icon={<IconMapPin className={dashboardIconClass} />}
          title="Boston, MA → Menlo Park, CA"
          transitionDuration="100ms"
          cursorEmoji="✈️"
        >
          <div className="min-h-[160px] md:min-h-0">
            <Globe />
          </div>
        </GridItem>

        <GridItem
          area="tools"
          icon={<IconTool className={dashboardIconClass} />}
          title="Tools"
          transitionDuration="400ms"
          cursorEmoji="🔧"
        >
          <ToolsMarquee />
        </GridItem>
        <GridItem
          area="contact"
          icon={<IconLink className={dashboardIconClass} />}
          title="Connect"
          transitionDuration="500ms"
          cursorEmoji="🔗"
        >
          <ContactMe />
        </GridItem>
        
        <GridItem
          area="github"
          icon={<IconBrandGithub className={dashboardIconClass} />}
          title="Activity"
          transitionDuration="900ms"
          tooltip="Last 7 Weeks"
          cursorEmoji="💻"
        >
          <div className="flex flex-col gap-[22px] sm:gap-6 h-full">
            {/* Heatmap */}
            <div className="flex-1">
              <GitHubHeatmap
                contributions={githubData?.contributions || []}
                isLoading={isLoadingGitHub}
              />
            </div>
          </div>
        </GridItem>
      </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  transitionDuration?: string;
  tooltip?: string;
  cursorEmoji?: string;
}

const GridItem = ({ area, icon, title, children, transitionDuration = "300ms", tooltip, cursorEmoji }: GridItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const itemRef = useRef<HTMLLIElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTap = () => {
    if (!tooltip) return;

    setShowTooltip(true);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Hide tooltip after 2 seconds
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const content = (
    <li
      ref={itemRef}
      data-cursor-emoji={cursorEmoji}
      className="min-h-[2rem] w-full list-none transition-all"
      style={{
        gridArea: area,
        transitionDuration,
        ...(cursorEmoji ? { cursor: "none" } : {}),
      }}
    >
      <div className="relative mx-auto h-full rounded-xl border p-2 md:rounded-2xl md:p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div
          className="group/glow relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-lg border-0.75 p-4 shadow-[0px_0px_12px_0px_#ebecf0] dark:shadow-[0px_0px_27px_0px_#2D2D2D] bg-background transition-all"
          style={{
            transitionDuration,
          }}
        >
          <SpotlightGlow />
          <div className="relative flex flex-row items-center gap-2 sm:gap-3">
            <div className="pt-0">{icon}</div>
            <div className="space-y-2">
              <h3 className="text-sm sm:text-md md:text-base tracking-tight text-start font-semibold text-black dark:text-white">
                {title}
              </h3>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </li>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip open={showTooltip} delayDuration={0}>
          <TooltipTrigger
            asChild
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleTap}
          >
            {content}
          </TooltipTrigger>
          <TooltipContent
            sideOffset={-16}
            side="top"
            align="center"
            collisionPadding={0}
            className="pointer-events-none whitespace-nowrap"
          >
            <p className="flex items-center gap-1.5">
              {tooltip === "Spotify" && (
                <IconBrandSpotifyFilled className="h-4 w-4 text-green-500" />
              )}
              {tooltip}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};

const ContactMe = () => {
  return (
    <div className="flex flex-col gap-4 sm:p-4">
      {data.contact.map(({ href, label, icon, aria }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={aria}
          className="flex items-center gap-2 group"
        >
          {React.cloneElement(icon, {
            className:
              "h-5 w-5 text-muted-foreground transition-all group-hover:animate-wiggle group-hover:scale-125 group-hover:text-primary",
          })}
          <span className="text-muted-foreground transition-all group-hover:text-primary group-hover:font-bold">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
};

const Tool = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center">
            <Image
              src={`${icon}`}
              alt={`${name} icon`}
              width={30}
              height={30}
              className="h-8 w-8"
              loading="eager"

            />
          </div>
        </TooltipTrigger>
        <TooltipContent sideOffset={5}>
          <p className="text-sm font-semibold text-muted-foreground">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ToolsMarquee = () => {
  const { theme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const currentTheme = theme || resolvedTheme || "dark";

  const processedToolsData = data.tools.map(({ name, icon, themeDependent }) => ({
    name,
    icon: `/tools/${icon}${themeDependent && currentTheme === "dark" ? "-dark" : ""}.svg`,
  }));
  return (
    <div className="relative overflow-hidden">
      <div className="fade-mask-left transition-all duration-400" />
      <div className="fade-mask-right transition-all duration-400" />
      <Marquee pauseOnHover className="[--duration:20s]">
        <div className="flex items-center gap-6">
          {processedToolsData.map(({ name, icon }) => (
            <Tool key={name} name={name} icon={icon} />
          ))}
        </div>
      </Marquee>
    </div>
  );
};


Heatmap:
"use client";

import { GitHubContribution } from '@/hooks/useGitHub';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useEffect, useState, useMemo } from 'react';

interface GitHubHeatmapProps {
  contributions: GitHubContribution[];
  isLoading: boolean;
}

const levelColors = {
  NONE: 'bg-zinc-100 dark:bg-neutral-800/50',
  FIRST_QUARTILE: 'bg-green-200 dark:bg-green-900/70',
  SECOND_QUARTILE: 'bg-green-400 dark:bg-green-700/80',
  THIRD_QUARTILE: 'bg-green-600 dark:bg-green-500/90',
  FOURTH_QUARTILE: 'bg-green-700 dark:bg-green-400',
};

export function GitHubHeatmap({ contributions, isLoading }: GitHubHeatmapProps) {
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());

  // Create placeholder data for loading state (49 days / 7 weeks)
  const placeholderData: GitHubContribution[] = useMemo(() => {
    return Array.from({ length: 49 }, (_, i) => ({
      date: new Date(Date.now() - (48 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      count: 0,
      level: 'NONE' as const,
    }));
  }, []);

  const displayContributions = isLoading ? placeholderData : contributions;

  // Group contributions into weeks (7 days each)
  const weeks: GitHubContribution[][] = [];
  for (let i = 0; i < displayContributions.length; i += 7) {
    weeks.push(displayContributions.slice(i, i + 7));
  }

  // Generate random reveal sequence
  useEffect(() => {
    if (!isLoading && contributions.length > 0) {
      setRevealedIndices(new Set()); // Reset on new data

      // Create array of all indices
      const indices = Array.from({ length: contributions.length }, (_, i) => i);

      // Shuffle array (Fisher-Yates shuffle)
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }

      // Reveal squares one by one with staggered delays
      const delay = 15; // milliseconds between each reveal

      indices.forEach((index, sequence) => {
        setTimeout(() => {
          setRevealedIndices(prev => new Set(prev).add(index));
        }, sequence * delay);
      });
    }
  }, [isLoading, contributions]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString + 'T12:00:00Z'); // Parse as UTC noon to avoid timezone shifts
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  };

  if (!displayContributions || displayContributions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-sm text-neutral-400">sorry, my access token probably expired 😕
        </div>
      </div>
    );
  }

  let flatIndex = 0;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex gap-1.5 sm:gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1.5 sm:gap-1">
              {week.map((day) => {
                const currentIndex = flatIndex++;
                const isRevealed = isLoading || revealedIndices.has(currentIndex);
                const displayLevel = isRevealed ? day.level : 'NONE';

                return (
                  <Tooltip key={day.date}>
                    <TooltipTrigger asChild>
                      <a
                        href="https://github.com/shivy02"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View GitHub profile"
                        className={`
                          block w-3.5 h-3.5 sm:w-3 sm:h-3 rounded-[2px]
                          ${levelColors[displayLevel]}
                          transition-all duration-300
                          hover:scale-125
                          cursor-pointer
                        `}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <div className="text-xs">
                        <div className="font-semibold">
                          {day.count} {day.count === 1 ? 'contribution' : 'contributions'}
                        </div>
                        <div className="text-muted-foreground">{formatDate(day.date)}</div>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}


```

- Example 02


```
json

import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons"

import { BentoCard, BentoGrid } from "@/registry/magicui/bento-grid"

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "/",
    cta: "Learn more",
    background: (
      <img alt="" className="absolute -top-20 -right-20 opacity-60" />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Full text search",
    description: "Search through all your files in one place.",
    href: "/",
    cta: "Learn more",
    background: (
      <img alt="" className="absolute -top-20 -right-20 opacity-60" />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    background: (
      <img alt="" className="absolute -top-20 -right-20 opacity-60" />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    href: "/",
    cta: "Learn more",
    background: (
      <img alt="" className="absolute -top-20 -right-20 opacity-60" />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description:
      "Get notified when someone shares a file or mentions you in a comment.",
    href: "/",
    cta: "Learn more",
    background: (
      <img alt="" className="absolute -top-20 -right-20 opacity-60" />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
]

export function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  )
}

```











