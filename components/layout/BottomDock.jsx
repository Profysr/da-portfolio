import { motion } from "motion/react";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconSparkles } from "@tabler/icons-react";
import { nav } from "@/data/idx.js";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const DOCK_ICON_SIZE = 40;
const DOCK_MAGNIFICATION = 48;
const DOCK_DISTANCE = 96;

/* ------------------------------------------------------------------ */
/*  BottomDock — fixed bottom dock with smooth auto-hide              */
/* ------------------------------------------------------------------ */
function BottomDock({ isVisible, onAIClick }) {
  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: isVisible ? 0 : 80,
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.95,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
    >
      <div
        className={isVisible ? "pointer-events-auto" : "pointer-events-none"}
      >
        <TooltipProvider delayDuration={0}>
          <Dock
            iconSize={DOCK_ICON_SIZE}
            iconMagnification={DOCK_MAGNIFICATION}
            iconDistance={DOCK_DISTANCE}
            className="border border-border bg-background/50 backdrop-blur-2xl shadow-e4 rounded-lg"
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
                          className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-foreground/10 text-muted-foreground hover:text-foreground transition-all"
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
              className="mx-1 h-5 w-px bg-border self-center"
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
                    className="relative flex p-2 items-center justify-center rounded-full bg-primary/15"
                  >
                    <IconSparkles className="text-primary" />

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

export default BottomDock;
