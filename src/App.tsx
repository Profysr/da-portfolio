import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ComponentType } from "react";
import { CommandPalette, CommandPaletteButton } from "@/components/CommandPallete";
import { nav, socials } from "@/data/idx.js";

const DOCK_ICON_SIZE = 40;
const DOCK_MAGNIFICATION = 48;
const DOCK_DISTANCE = 72;

function TopBar() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between max-w-7xl w-full mx-auto h-12 px-4 sm:px-6 bg-background/70 backdrop-blur-xl border border-border/60 rounded-2xl shadow-lg">
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

function App() {
  return (
    <>
      <CommandPalette />

      <TopBar />

      <TooltipProvider delayDuration={0}>
        <Dock
          iconSize={DOCK_ICON_SIZE}
          iconMagnification={DOCK_MAGNIFICATION}
          iconDistance={DOCK_DISTANCE}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        >
          {nav.map((item) => {
            const Icon = item.icon as ComponentType<{ size?: number }>;
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

          <div className="h-full w-px bg-border/60" />

          {socials.slice(0, 2).map((s) => {
            const SocialIcon = s.icon as ComponentType<{ size?: number }>;
            return (
              <DockIcon key={s.platform}>
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
    </>
  );
}

export default App;