import { useRef, Suspense } from "react";
import { LazyAnimatedBeam } from "@/components/lazy";
import { personal, socials } from "@/data/idx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SuspenseBeam = ({ fromRef, toRef, ...props }) => (
  <Suspense
    fallback={
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-px w-full bg-white/5" />
      </div>
    }
  >
    <LazyAnimatedBeam fromRef={fromRef} toRef={toRef} {...props} />
  </Suspense>
);

export function ContactCard() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);

  const node1Ref = useRef(null);
  const node2Ref = useRef(null);
  const node3Ref = useRef(null);
  const node4Ref = useRef(null);

  const leftSocials = socials.slice(0, 2);
  const rightSocials = socials.slice(2, 4);

  return (
    <TooltipProvider delayDuration={0}>
      <div
        ref={containerRef}
        className="relative flex h-full min-h-[260px] w-full items-center justify-between px-8 py-6 overflow-hidden"
      >
        {/* Left Column Nodes */}
        <div className="z-10 flex flex-col justify-between h-full py-2">
          {leftSocials.map((soc, idx) => {
            const IconComp = soc.icon;
            const targetRef = idx === 0 ? node1Ref : node2Ref;

            return (
              <Tooltip key={soc.platform}>
                <TooltipTrigger asChild>
                  <a
                    ref={targetRef}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-muted-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-white/10 hover:text-white"
                  >
                    <IconComp className="h-6 w-6" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{soc.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Center Avatar Node */}
        <div className="z-10 flex flex-col items-center justify-center">
          <div
            ref={centerRef}
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/50 bg-white/5 p-1 shadow-[0_0_25px_rgba(208,188,255,0.25)]"
          >
            <img
              src={personal.avatar || "/avatar.jpg"}
              alt={personal.name}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>
          <span className="mt-2 text-xs font-mono text-muted-foreground tracking-wider">
            {personal.name.split(" ")[0]}
          </span>
        </div>

        {/* Right Column Nodes */}
        <div className="z-10 flex flex-col justify-between h-full py-2">
          {rightSocials.map((soc, idx) => {
            const IconComp = soc.icon;
            const targetRef = idx === 0 ? node3Ref : node4Ref;
            const isEmail = soc.platform === "email";

            return (
              <Tooltip key={soc.platform}>
                <TooltipTrigger asChild>
                  <a
                    ref={targetRef}
                    href={soc.url}
                    target={isEmail ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={soc.label}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-muted-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-white/10 hover:text-white"
                  >
                    <IconComp className="h-6 w-6" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{soc.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Animated Beams */}
        <SuspenseBeam
          containerRef={containerRef}
          fromRef={node1Ref}
          toRef={centerRef}
          curvature={-60}
          endYOffset={-6}
          duration={3}
          gradientStartColor="#a855f7"
          gradientStopColor="#FFDA27"
        />
        <SuspenseBeam
          containerRef={containerRef}
          fromRef={node2Ref}
          toRef={centerRef}
          curvature={60}
          endYOffset={6}
          duration={3}
          delay={0.4}
          gradientStartColor="#a855f7"
          gradientStopColor="#FFDA27"
        />
        <SuspenseBeam
          containerRef={containerRef}
          fromRef={node3Ref}
          toRef={centerRef}
          curvature={-60}
          endYOffset={-6}
          duration={3}
          delay={0.2}
          reverse
          gradientStartColor="#a855f7"
          gradientStopColor="#FFDA27"
        />
        <SuspenseBeam
          containerRef={containerRef}
          fromRef={node4Ref}
          toRef={centerRef}
          curvature={60}
          endYOffset={6}
          duration={3}
          delay={0.6}
          reverse
          gradientStartColor="#a855f7"
          gradientStopColor="#FFDA27"
        />
      </div>
    </TooltipProvider>
  );
}
