"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatedName,
  HOLD_MS,
  INITIAL_REVEAL_MS,
  SWAP_REVEAL_MS,
} from "@/components/ui/animated-name";
import { LightRays } from "@/components/ui/light-rays";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { Layout } from "@/components/layout/Layout";
import { IconArrowRight, IconChevronDown } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { personal, socials } from "@/data/idx";
import { AvatarStatus } from "@/components/AvatarStatus";
import Heading from "@/components/ui/Heading";
import { TypingAnimation } from "@/components/ui/typing-animation";


/* ============================================================
 *  2. Animated Name & Headline Sub-component
 * ============================================================ */
export function Headline() {
  const roles = [
    "Software Engineer",
    "Forward Deployed Engineer",
    "Engineering Lead",
  ];

  return (
    <Heading title="Developer" className="my-4">
      <BlurFade delay={0.05} inView className="w-full space-y-3">
        {/* Top: Small Name with Spaced Characters */}
        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-muted-foreground/80">
          <span>HI, I'M</span>
          <span className="font-semibold tracking-[0.25em] text-foreground">
            {personal.name}
          </span>
        </div>

        {/* Center: Main Role Typewriter Animation */}
        <div className="flex items-center justify-center min-h-[3rem] sm:min-h-[4rem]">
          <TypingAnimation
            words={roles}
            loop={true}
            typeSpeed={70}
            deleteSpeed={40}
            pauseDelay={1800}
            startOnView={false}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-linear-to-b from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent"
          />
        </div>
      </BlurFade>
    </Heading>
  );
}

/* ============================================================
 *  3. Social Links & Call-To-Action Sub-component
 * ============================================================ */
function SocialAndCta({ wiggleIcon, handleIconClick, scrollToProjects }) {
  const ctaRef = useRef(null);

  const handleCtaMove = (e) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const getIconClass = (label) => {
    const isWiggling = wiggleIcon === label.toLowerCase();
    return `text-zinc-300 hover:text-white transition-all duration-300 ${isWiggling ? "animate-wiggle scale-125 text-white" : "hover:scale-110"
      }`;
  };

  return (
    <BlurFade delay={0.1} direction="down" inView>
      <div className="z-20 flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
        {/* Social Icons */}
        <div className="flex items-center space-x-4 sm:space-x-5">
          {socials.map(({ platform, icon: Icon, label, url, aria }) => (
            <Tooltip key={platform}>
              <TooltipTrigger asChild>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={aria || label}
                  onClick={() => handleIconClick(label.toLowerCase())}
                  className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                >
                  <Icon size={20} stroke={1.7} className={getIconClass(label)} />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Vertical Divider */}
        <span className="hidden sm:block h-6 w-px bg-zinc-700/80" aria-hidden />

        {/* CTA Rainbow Button */}
        <RainbowButton
          ref={ctaRef}
          onMouseMove={handleCtaMove}
          onClick={scrollToProjects}
          variant="default"
          size="default"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2 text-sm font-semibold shadow-lg"
        >
          <span>View my work</span>
          <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </RainbowButton>
      </div>
    </BlurFade>
  );
}

/* ============================================================
 *  Main Hero Section Export
 * ============================================================ */
export default function Hero() {
  const [wiggleIcon, setWiggleIcon] = useState(null);

  //______ Start: Cycle animation for animated name_______
  const [phase, setPhase] = useState("initial");
  const [suffix, setSuffix] = useState("");

  useEffect(() => {
    let timer;
    if (phase === "initial") {
      // Transition quicker from initial load to hold
      timer = setTimeout(() => setPhase("hold"), INITIAL_REVEAL_MS);
    } else if (phase === "hold") {
      // Use cycleMs from config (e.g. 2500ms - 3500ms for faster feedback)
      const holdTime = suffix === "" ? 2000 : animatedName.cycleMs;
      timer = setTimeout(() => setPhase("exit"), holdTime);
    } else if (phase === "enter") {
      timer = setTimeout(() => setPhase("hold"), SWAP_REVEAL_MS);
    }
    return () => clearTimeout(timer);
  }, [phase, suffix]);

  const handleExitComplete = () => {
    setSuffix((s) => (s === "" ? " Ahmad" : ""));
    setPhase("enter");
  };

  //______ End: Cycle animation for animated name

  const handleIconClick = (name) => {
    setWiggleIcon(name);
    setTimeout(() => setWiggleIcon(null), 600);
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden pt-28 pb-20 sm:pt-40 md:pt-48 flex items-center justify-center"
    >
      {/* Full-width Light Rays Background Effect */}
      <LightRays
        count={8}
        color="rgba(160, 210, 255, 0.15)"
        blur={40}
        speed={14}
        className="opacity-70"
      />

      <TooltipProvider delayDuration={0}>
        {/* Constrained Content Column */}
        <Layout className="relative z-10 flex flex-col items-center justify-center space-y-8">
          {/* 1. Avatar & Status */}
          <AvatarStatus />

          {/* 2. Headline & Tagline */}
          <Headline
            phase={phase}
            suffix={suffix}
            handleExitComplete={handleExitComplete}
          />

          {/* 3. Socials & Action Button */}
          <SocialAndCta
            wiggleIcon={wiggleIcon}
            handleIconClick={handleIconClick}
            scrollToProjects={scrollToProjects}
          />
        </Layout>
      </TooltipProvider>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-zinc-200 transition-colors animate-bounce cursor-pointer z-20"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll down"
      >
        <IconChevronDown size={24} stroke={1.5} />
      </div>
    </section>
  );
}