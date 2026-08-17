import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CommandPalette,
  CommandPaletteButton,
} from "@/components/CommandPallete";
import { nav, socials } from "@/data/idx.js";
import { Footer } from "./Footer";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DOCK_ICON_SIZE = 40;
const DOCK_MAGNIFICATION = 48;
const DOCK_DISTANCE = 72;

/* ------------------------------------------------------------------ */
/*  TopBar — fixed, full-width, hides on scroll down                  */
/* ------------------------------------------------------------------ */

function TopBar({ isVisible }: { isVisible: boolean }) {
  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 flex items-center justify-center pointer-events-none transition-transform duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex items-center justify-between max-w-7xl w-full mx-auto h-12 px-4 sm:px-6 bg-background/30 backdrop-blur-xl border border-white/10 rounded-full shadow-lg">
        <a
          href="#hero"
          aria-label="Home"
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          DA
        </a>
        <CommandPaletteButton />
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  BottomDock — fixed bottom dock with smooth auto-hide              */
/* ------------------------------------------------------------------ */

function BottomDock({ isVisible }: { isVisible: boolean }) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : 80,
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.95,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
    >
      <div className={isVisible ? "pointer-events-auto" : "pointer-events-none"}>
        <TooltipProvider delayDuration={0}>
          <Dock
            iconSize={DOCK_ICON_SIZE}
            iconMagnification={DOCK_MAGNIFICATION}
            iconDistance={DOCK_DISTANCE}
            className="border border-white/10 bg-background/50 backdrop-blur-2xl shadow-2xl"
          >
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <DockIcon key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={`#${item.id}`}
                        aria-label={item.label}
                        className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
                      >
                        <Icon size={18} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              );
            })}

            <div className="hidden min-[480px]:block h-full w-px bg-white/10" />

            {socials.slice(0, 2).map((s) => {
              const SocialIcon = s.icon;
              return (
                <DockIcon key={s.platform} className="hidden min-[480px]:flex">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={s.url}
                        aria-label={s.label}
                        className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon size={18} />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{s.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              );
            })}
          </Dock>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  AppShell — Master Application Shell with Continuous Global Background */
/* ------------------------------------------------------------------ */

export function AppShell() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Automatically hide near the bottom so Dock never collides with Footer/CTAs
      const isNearBottom = windowHeight + currentScrollY >= documentHeight - 380;

      if (isNearBottom) {
        setIsNavVisible(false);
      } else if (currentScrollY <= 60) {
        // At the very top, always show
        setIsNavVisible(true);
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling UP -> reveal nav
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        // Scrolling DOWN -> hide nav to maximize content viewport
        setIsNavVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground flex flex-col justify-between overflow-x-hidden">
        {/* Continuous Unified Dot Grid at Root */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[24px_24px]"
        />

        {/* Global Ambient Glows at Root */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-280 h-140 bg-primary/5 blur-[140px] rounded-full z-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 w-280 h-140 bg-primary/5 blur-[140px] rounded-full z-0"
        />

        {/* Fixed Navigation & Command Palette */}
        <CommandPalette />
        <TopBar isVisible={isNavVisible} />

        {/* Main Content Area */}
        <main className="relative z-10 w-full flex-1">
          <Outlet />
        </main>

        {/* Floating Bottom Dock */}
        <BottomDock isVisible={isNavVisible} />

        {/* Footer */}
        <div className="relative z-10 w-full">
          <Footer />
        </div>
      </div>
  );
}
