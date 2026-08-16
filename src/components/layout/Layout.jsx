import { useState, useEffect } from "react"
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CommandPaletteButton } from "@/components/CommandPallete";
import { nav, socials } from "@/data/idx.js";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DOCK_ICON_SIZE = 40;
const DOCK_MAGNIFICATION = 48;
const DOCK_DISTANCE = 72;

/* ------------------------------------------------------------------ */
/*  TopBar                                                             */
/* ------------------------------------------------------------------ */
function TopBar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setVisible(true); // Scrolling UP or at top
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false); // Scrolling DOWN
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    // Kept as 'sticky top-4' so it respects parent container widths
    <header
      className={`sticky top-4 z-50 flex items-center justify-center pointer-events-none transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-20"
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
/*  BottomDock                                                         */
/* ------------------------------------------------------------------ */
function BottomDock() {
  return (
    <TooltipProvider delayDuration={0}>
      <Dock
        iconSize={DOCK_ICON_SIZE}
        iconMagnification={DOCK_MAGNIFICATION}
        iconDistance={DOCK_DISTANCE}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 lg:px-8"
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
/*  Layout Component                                                   */
/* ------------------------------------------------------------------ */
export function Layout({ children, className = "" }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#151516] text-foreground">
      <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6", className)}>
        <TopBar />
        <main className="min-h-screen">{children}</main>
      </div>
      <BottomDock />
    </div>
  );
}