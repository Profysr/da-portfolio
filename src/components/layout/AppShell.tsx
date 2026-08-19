import { useState, useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconDownload, IconSparkles } from "@tabler/icons-react";
import { nav, personal } from "@/data/idx.js";
import { Footer } from "./Footer";
import { AIBotModal } from "@/components/AIBotModal";
import { downloadResume } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  TopBar — fixed, full-width, with Logo and ATS Resume Download CTA */
/* ------------------------------------------------------------------ */

function TopBar({ isVisible }: { isVisible: boolean }) {
  return (
    <header
      className={`fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 flex items-center justify-center pointer-events-none transition-transform duration-300 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
        }`}
    >
      <div className="pointer-events-auto flex items-center justify-between max-w-7xl w-full mx-auto py-2 px-3 bg-background/30 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg">
        <a
          href="#hero"
          aria-label="Home"
          className="flex items-center gap-2 font-bold tracking-tight text-white hover:text-primary transition-colors text-sm sm:text-base"
        >
          {personal.logo ? (
            <img
              src={personal.logo}
              alt="Bilal Ahmad"
              className="h-6 sm:h-7 w-auto object-contain"
            />
          ) : (
            <span>DA</span>
          )}
        </a>
        {personal.resumeUrl && (
          <button
            type="button"
            onClick={() => downloadResume(personal.resumeUrl)}
            className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded sm:rounded-md border border-border bg-surface-high/60 hover:bg-surface-high hover:border-primary/40 text-foreground font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            <IconDownload className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            <span>Resume</span>
          </button>
        )}
      </div>
    </header>
  );
}


/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DOCK_ICON_SIZE = 40;
const DOCK_MAGNIFICATION = 48;
const DOCK_DISTANCE = 96;

/* ------------------------------------------------------------------ */
/*  BottomDock — fixed bottom dock with smooth auto-hide              */
/* ------------------------------------------------------------------ */
function BottomDock({
  isVisible,
  onAIClick,
}: {
  isVisible: boolean;
  onAIClick: () => void;
}) {
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
      <div
        className={isVisible ? "pointer-events-auto" : "pointer-events-none"}
      >
        <TooltipProvider delayDuration={0}>
          <Dock
            iconSize={DOCK_ICON_SIZE}
            iconMagnification={DOCK_MAGNIFICATION}
            iconDistance={DOCK_DISTANCE}
            className="border border-border bg-background/50 backdrop-blur-2xl shadow-2xl"
          >
            {/* Nav links */}
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <DockIcon key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={`#${item.id}`}
                        aria-label={item.label}
                        className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10 text-zinc-300 hover:text-white transition-all"
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

            {/* Vertical Divider */}
            <div
              className="mx-1 h-5 w-px bg-white/15 self-center"
              aria-hidden="true"
            />

            {/* AI Assistant Trigger */}
            <DockIcon>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={onAIClick}
                    aria-label="Open AI Recruiter Assistant"
                    className="relative flex p-2 items-center justify-center rounded-full bg-[#d0bcff]/20"
                  >
                    <IconSparkles className="text-[#d0bcff]" />

                    {/* Adjusted Status Dot */}
                    <span className="absolute top-0 right-0.5 flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-primary" />
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Ask AI Recruiter</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  AppShell — Master Application Shell with Continuous Dual-Tone Layout */
/* ------------------------------------------------------------------ */

export function AppShell() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAIOpen, setIsAIOpen] = useState(false);

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
        setIsNavVisible(true);
      } else if (currentScrollY < lastScrollY - 5) {
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        setIsNavVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground flex flex-col justify-between overflow-x-hidden">
      {/* Global Ambient Glows at Root */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-280 h-140 bg-primary/5 blur-[140px] rounded-full z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 w-280 h-140 bg-primary/5 blur-[140px] rounded-full z-0"
      />
      <TopBar isVisible={isNavVisible} />

      {/* Main Content Area — pb-28 ensures Dock never occludes bottom content */}
      <main className="relative z-10 w-full flex-1">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      <BottomDock isVisible={isNavVisible} onAIClick={() => setIsAIOpen(true)} />
      <AIBotModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer />
    </div>
  );
}

export default AppShell;
