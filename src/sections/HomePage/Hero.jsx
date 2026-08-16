"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedName, HOLD_MS, INITIAL_REVEAL_MS, SWAP_REVEAL_MS } from "@/components/ui/animated-name";
import { LightRays } from "@/components/ui/light-rays";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ShinyButton } from "@/components/ui/shiny-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { IconArrowRight, IconChevronDown } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { personal, socials } from "@/data/idx";

const getStatus = () => {
  if (typeof window === "undefined") return { status: "Available", dotColor: "green" };
  const h = parseInt(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      hour: "numeric",
      hour12: false,
    }).format(new Date()),
    10,
  );
  if (h >= 8 && h < 22) return { status: "Available", dotColor: "green" };
  return { status: "Away", dotColor: "amber" };
};

const iconClass = (label, wiggleIcon) =>
  `text-muted ${wiggleIcon === label.toLowerCase() ? "animate-wiggle scale-150 transition-transform duration-200" : ""} hover:scale-130 hover:animate-wiggle transition-transform duration-300`;

function ContactIcons({ wiggleIcon, handleIconClick }) {
  return (
    <div className="flex flex-row items-center justify-center space-x-6">
      {socials.map(({ platform, icon: Icon, label, url, aria }) => (
        <Tooltip key={platform}>
          <TooltipTrigger asChild>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={aria}
              onClick={() => handleIconClick(label.toLowerCase())}
            >
              <Icon size={18} stroke={1.5} className={iconClass(label, wiggleIcon)} />
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom">{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

export default function Hero() {
  const [wiggleIcon, setWiggleIcon] = useState(null);
  const [phase, setPhase] = useState("initial");
  const [suffix, setSuffix] = useState("");
  const { status, dotColor } = getStatus();

  useEffect(() => {
    let timer;
    if (phase === "initial") {
      timer = setTimeout(() => setPhase("hold"), INITIAL_REVEAL_MS);
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("exit"), HOLD_MS);
    } else if (phase === "enter") {
      timer = setTimeout(() => setPhase("hold"), SWAP_REVEAL_MS);
    }
    return () => clearTimeout(timer);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleExitComplete = () => {
    setSuffix((s) => (s === "" ? " Ahmad" : ""));
    setPhase("enter");
  };

  const handleIconClick = (name) => {
    setWiggleIcon(name);
    setTimeout(() => setWiggleIcon(null), 600);
  };

  const ctaRef = useRef(null);
  const handleCtaMove = (e) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="pt-32 pb-16 sm:pt-56 relative flex items-center justify-center overflow-hidden">
      <LightRays
        count={7}
        color="rgba(160, 210, 255, 0.12)"
        blur={36}
        speed={14}
        className="opacity-60"
      />

      <TooltipProvider delayDuration={0}>
        <BlurFade delay={0.005} inView>
          <div className="relative flex flex-col items-center justify-center space-y-1">
            {/* Avatar + Status */}
            <div className="relative flex flex-col items-center justify-center">
              <div className="relative h-16 w-16 sm:w-20 sm:h-20 md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-br from-primary/60 via-primary/30 to-transparent">
                <img
                  src="/avatar.jpg"
                  alt={personal.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <ShinyButton className="z-50 mt-8">
                <div className="relative flex items-center justify-center">
                  <div
                    className={`absolute h-1.5 w-1.5 rounded-full border-1 ${dotColor === "green" ? "border-green-600/80 bg-green-500 animate-ping" : "border-orange-600/80 bg-orange-500 animate-ping"} mr-2`}
                  />
                  <div
                    className={`relative h-1 w-1 rounded-full border-1 ${dotColor === "green" ? "border-green-600/80 bg-green-500 animate-pulse" : "border-orange-600/80 bg-orange-500 animate-pulse"} mr-2`}
                  />
                </div>
                <AnimatedShinyText className="whitespace-pre-wrap text-center font-semibold leading-none text-muted-foreground text-xs sm:text-base py-[0.5]">
                  {status}
                </AnimatedShinyText>
              </ShinyButton>
            </div>

            {/* Name + Tagline */}
            <div className="w-full space-y-6">
              <BlurFade delay={0.005 * 1} inView>
                <p className="subpixel-antialiased leading-[1.8] text-5xl sm:text-7xl font-bold text-center whitespace-nowrap">
                  <span className="inline-block pb-2 bg-gradient-to-b from-zinc-200 dark:from-zinc-50 to-zinc-950 dark:to-zinc-300 bg-clip-text text-transparent">
                    Hi. I'm{" "}
                    <AnimatedName
                      name={personal.name.split(" ")[0]}
                      suffixes={["", " Ahmad"]}
                      phase={phase}
                      suffix={suffix}
                      onExitComplete={handleExitComplete}
                      className="font-script font-normal text-[1.05em] leading-none align-baseline"
                    />
                  </span>
                </p>
                <p className="text-base subpixel-antialiased tracking-tight font-medium sm:text-2xl text-center text-muted">
                  {personal.tagline}
                </p>
              </BlurFade>

              {/* Social + CTA */}
              <BlurFade delay={0.005 * 2} direction="down" inView>
                <div className="z-50 flex flex-row items-center justify-center gap-5">
                  <ContactIcons wiggleIcon={wiggleIcon} handleIconClick={handleIconClick} />
                  <span className="h-5 w-px bg-white/10" aria-hidden />
                  <RainbowButton
                    ref={ctaRef}
                    onMouseMove={handleCtaMove}
                    onClick={scrollToProjects}
                    variant="default"
                    size="default"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-1.5 text-sm font-medium"
                  >
                    <AnimatedShinyText className="relative">View my work</AnimatedShinyText>
                    <IconArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </RainbowButton>
                </div>
              </BlurFade>
            </div>
          </div>
        </BlurFade>
      </TooltipProvider>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted animate-bounce">
        <IconChevronDown size={22} stroke={1.5} />
      </div>
    </div>
  );
}