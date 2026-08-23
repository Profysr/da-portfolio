"use client";

import { cn } from "@/lib/utils";
import {
  IconDeviceDesktop,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { useCallback, useState, useSyncExternalStore } from "react";

const themes: ReadonlyArray<{
  key: ThemeValue;
  icon: typeof IconSun;
  label: string;
}> = [
  { key: "system", icon: IconDeviceDesktop, label: "System theme" },
  { key: "light", icon: IconSun, label: "Light theme" },
  { key: "dark", icon: IconMoon, label: "Dark theme" },
];

const emptySubscribe = () => () => {};

type ThemeValue = "system" | "light" | "dark";

interface ThemeSwitcherProps {
  defaultValue?: ThemeValue;
  className?: string;
}

export function ThemeSwitcher({
  defaultValue = "system",
  className,
}: ThemeSwitcherProps) {
  const [theme, setThemeState] = useState<ThemeValue>(defaultValue);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const setTheme = useCallback((next: ThemeValue) => {
    setThemeState(next);
  }, []);

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn("h-10 w-20 rounded-full", className)}
      />
      );
  }

  return (
    <div
      data-testid="theme-toggle"
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "relative flex h-8 items-center rounded-full bg-background p-1 ring-1 ring-border",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            type="button"
            key={key}
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            className="relative h-6 w-6 rounded-full"
            onClick={() => setTheme(key)}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 rounded-full bg-secondary"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                "relative m-auto h-4 w-4",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}

export default ThemeSwitcher;
