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
  value?: ThemeValue;
  onChange?: (theme: ThemeValue) => void;
  defaultValue?: ThemeValue;
  className?: string;
}

export function ThemeSwitcher({
  value,
  onChange,
  defaultValue = "system",
  className,
}: ThemeSwitcherProps) {
  const isControlled = value !== undefined;
  const [internalTheme, setInternalTheme] = useState<ThemeValue>(defaultValue);
  const theme: ThemeValue = isControlled ? value : internalTheme;

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const setTheme = useCallback(
    (next: ThemeValue) => {
      if (!isControlled) setInternalTheme(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={cn("h-10 w-20 rounded-md", className)}
      />
      );
  }

  return (
    <div
      data-testid="theme-toggle"
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "relative flex h-8 items-center rounded-md bg-background p-1 ring-1 ring-border",
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
                className="absolute inset-0 rounded-full bg-foreground shadow-e1 transform-gpu"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <Icon
              className={cn(
                "relative m-auto h-4 w-4 transition-colors duration-200",
                isActive
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground"
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
