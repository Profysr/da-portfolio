import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Outlet } from "react-router-dom";
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

function TopBar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 flex items-center justify-center pointer-events-none transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-20"
        }`}
    >
      <div className="pointer-events-auto flex items-center justify-between max-w-7xl w-full mx-auto h-12 px-4 sm:px-6 bg-background/25 backdrop-blur-xl border border-border rounded-full shadow-lg">
        <a
          href="#hero"
          aria-label="Home"
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground"
        >
          DA
        </a>
        <CommandPaletteButton />
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  BottomDock — fixed, full-width                                     */
/* ------------------------------------------------------------------ */
function BottomDock() {
  return (
    <TooltipProvider delayDuration={0}>
      <Dock
        iconSize={DOCK_ICON_SIZE}
        iconMagnification={DOCK_MAGNIFICATION}
        iconDistance={DOCK_DISTANCE}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
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
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          );
        })}

        <div className="hidden min-[480px]:block h-full w-px bg-border" />

        {socials.slice(0, 2).map((s) => {
          const SocialIcon = s.icon;
          return (
            <DockIcon key={s.platform} className="hidden min-[480px]:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={s.url}
                    aria-label={s.label}
                    className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent/50 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon size={18} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{s.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          );
        })}
      </Dock>
    </TooltipProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  AppShell — full-width route wrapper                               */
/*                                                                     */
/*  Mounts chrome once for all routes. Pages render via <Outlet />.   */
/*  Each page section owns its own full-width background and uses     */
/*  <Layout> inside for content alignment.                            */
/*                                                                     */
/*  In App.tsx:                                                        */
/*    <Route element={<AppShell />}>                                   */
/*      <Route path="/" element={<HomePage />} />                     */
/*    </Route>                                                         */
/* ------------------------------------------------------------------ */

export function AppShell() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  return (
    <>
      {/* Chrome — full width, renders once across all routes */}
      <CommandPalette />
      <TopBar />

      <div className="flex flex-col gap-2">
        <Outlet />
      </div>
      <motion.div
        animate={{
          y: isFooterVisible ? 100 : 0,
          opacity: isFooterVisible ? 0 : 1,
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
      >
        <BottomDock />
      </motion.div>
      <Footer onFooterInViewChange={setIsFooterVisible} />
    </>
  );
}
