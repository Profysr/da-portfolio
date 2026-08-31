"use client";

import { useEffect, useState } from "react";
import { IconDownload } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { personal } from "@/data/idx.js";
import { downloadResume } from "@/utils/download";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Logo } from "@/components/layout/Logo";

/* ------------------------------------------------------------------ */
/*  TopBar — fixed, full-width, with Logo and ATS Resume Download CTA */
/* ------------------------------------------------------------------ */
function TopBar({ isVisible }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted && resolvedTheme === "dark" ? "dark" : "light";

  return (
    <header
      className={`fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 flex items-center justify-center pointer-events-none transition-transform duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex items-center justify-between max-w-7xl w-full mx-auto py-2 px-3 bg-background/25 backdrop-blur-xl border border-border rounded-lg shadow-e2">
        <a href="#hero" className="flex items-center gap-2">
          <Logo className="h-8 w-auto text-foreground" />
        </a>
        <div className="flex items-center gap-3">
          {mounted && (
            <AnimatedThemeToggler
              theme={currentTheme}
              onThemeChange={(t) => setTheme(t)}
            />
          )}
          {personal.resumeUrl && (
            <button
              type="button"
              onClick={() => downloadResume(personal.resumeUrl)}
              className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded sm:rounded-md border border-border bg-surface-muted/60 hover:bg-surface-muted hover:border-primary/40 text-foreground font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <IconDownload className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
              <span>Resume</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
