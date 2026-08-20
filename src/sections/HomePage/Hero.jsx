"use client";

import { useRef, useState, Suspense } from "react";
import { LazyLightRays } from "@/components/lazy";
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
import { FavoriteStack } from "@/components/FavoriteStack";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Section } from "@/components/layout/Section";

/* ============================================================
 *  Animated Name & Headline Sub-component
 * ============================================================ */
export function Headline() {
  const roles = [
    "Software Engineer",
    "Forward Deployed Engineer",
    "Engineering Lead",
  ];

  return (
    <Heading title="Developer">
      <BlurFade
        delay={0.05}
        inView
        className="w-full flex flex-col items-center justify-center gap-2"
      >
        <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-muted-foreground/80">
          <span>HI, I'M</span>
          <span className="font-semibold tracking-[0.25em] text-foreground">
            {personal.name}
          </span>
        </div>

        <div className="flex items-center justify-center min-h-12 sm:min-h-16">
          <TypingAnimation
            words={roles}
            loop={true}
            typeSpeed={70}
            deleteSpeed={40}
            pauseDelay={1800}
            startOnView={false}
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-linear-to-b from-foreground via-foreground/90 to-foreground/50 bg-clip-text text-transparent text-center"
          />
        </div>

        {/* Favorite Stack with Interactive Tool Icons */}
        <FavoriteStack variant="compact" className="mt-1" />
      </BlurFade>
    </Heading>
  );
}

/* ============================================================
 *  Call-To-Action & Social Links Sub-component
 * ============================================================ */
function HeroActions({ wiggleIcon, handleIconClick, scrollToProjects }) {
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
    return `text-zinc-300 hover:text-white transition-all duration-300 ${
      isWiggling ? "animate-wiggle scale-125 text-white" : "hover:scale-110"
    }`;
  };

  return (
    <BlurFade delay={0.1} direction="down" inView>
      <div className="z-20 flex flex-col sm:flex-row items-center justify-center gap-2">
        {/* Social Icons Bar */}
        <div className="flex items-center space-x-4 sm:space-x-5 pt-1">
          {socials.map(({ platform, icon: Icon, label, url, aria }) => (
            <Tooltip key={platform}>
              <TooltipTrigger asChild>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={aria || label}
                  onClick={() => handleIconClick(label.toLowerCase())}
                  className="p-2 rounded-md hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                >
                  <Icon
                    size={20}
                    stroke={1.7}
                    className={getIconClass(label)}
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <span className="hidden sm:block h-6 w-px bg-zinc-700/80" aria-hidden />

        <div className="flex items-center justify-center">
          <ShimmerButton
            ref={ctaRef}
            onMouseMove={handleCtaMove}
            onClick={scrollToProjects}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg"
          >
            <span>View my work</span>
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </ShimmerButton>
        </div>
      </div>
    </BlurFade>
  );
}

/* ============================================================
 *  Main Hero Section Export
 * ============================================================ */
export default function Hero() {
  const [wiggleIcon, setWiggleIcon] = useState(null);

  const handleIconClick = (name) => {
    setWiggleIcon(name);
    setTimeout(() => setWiggleIcon(null), 600);
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section
      id="hero"
      // className="relative w-full overflow-hidden pt-28 pb-16 sm:pt-36 md:pt-44 flex items-center justify-center"
    >
      <Suspense fallback={null}>
        <LazyLightRays
          count={10}
          color="rgba(160, 210, 255, 0.25)"
          blur={50}
          speed={10}
          className="opacity-80"
        />
      </Suspense>

      <TooltipProvider delayDuration={0}>
        <Layout className="relative z-10 flex flex-col items-center justify-center gap-8">
          <AvatarStatus />
          <Headline />
          <HeroActions
            wiggleIcon={wiggleIcon}
            handleIconClick={handleIconClick}
            scrollToProjects={scrollToProjects}
          />
        </Layout>
      </TooltipProvider>

      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 text-zinc-400 hover:text-zinc-200 transition-colors animate-bounce cursor-pointer z-20"
        onClick={() =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll down"
      >
        <IconChevronDown size={22} stroke={1.5} />
      </div>
    </Section>
  );
}
