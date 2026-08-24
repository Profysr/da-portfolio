"use client";

import { useRef, useState, Suspense } from "react";
import { motion } from "motion/react";
import { LazyLightRays } from "@/components/common/lazy";
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
import { MagneticLink } from "@/components/ui/MagneticButton";
import { ScrollReveal, StaggeredReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/layout/Section";

/* ============================================================
 *  Animated Name & Headline Sub-component (Watermark + Typewriter)
 * ============================================================ */
export function Headline() {
  const roles = [
    "Software Engineer",
    "Forward Deployed Engineer",
    "Engineering Lead",
  ];

  return (
    <Heading title="Developer" variant="watermark">
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
            className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground text-center"
          />
        </div>

        {/* Favorite Stack with Animated Reveal */}
        <StaggeredReveal
          variant="slide-up"
          staggerDelay={0.08}
          delay={0.3}
          duration={0.6}
          once={false}
          className="mt-2"
        >
          <FavoriteStack variant="compact" />
        </StaggeredReveal>
      </BlurFade>
    </Heading>
  );
}

/* ============================================================
 *  Call-To-Action & Social Links Sub-component
 * ============================================================ */
function HeroActions() {
  const ctaRef = useRef(null);

  const handleCtaMove = (e) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const getIconClass = (isWiggling) => {
    return `transition-all duration-300 ${
      isWiggling ? "animate-wiggle scale-125" : "hover:scale-110"
    }`;
  };

  const [wiggleIcon, setWiggleIcon] = useState(null);

  const handleIconClick = (name) => {
    setWiggleIcon(name);
    setTimeout(() => setWiggleIcon(null), 600);
  };

  return (
    <div className="z-20 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-3xl">
      <ScrollReveal variant="slide-up" delay={0.4} duration={0.6} once={false}>
        <div className="flex items-center space-x-4 sm:space-x-5 pt-1">
          {socials.map(({ platform, icon: Icon, label, url, aria, color }) => {
            return (
              <Tooltip key={platform}>
                <TooltipTrigger asChild>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={aria || label}
                    onClick={() => handleIconClick(label.toLowerCase())}
                    className="p-2 rounded-md hover:bg-white/10 transition-colors"
                    style={{ color }}
                  >
                    <Icon
                      size={20}
                      weight="bold"
                      className={getIconClass(
                        wiggleIcon === label.toLowerCase(),
                      )}
                    />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  {label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </ScrollReveal>

      <span className="hidden sm:block h-6 w-0.5 bg-border" aria-hidden />

      <ScrollReveal variant="slide-up" delay={0.5} duration={0.6} once={false}>
        <div className="flex items-center justify-center">
          <MagneticLink
            ref={ctaRef}
            onMouseMove={handleCtaMove}
            href="#projects"
            size="lg"
            variant="premium"
            className="flex items-center justify-center"
            icon={<IconArrowRight />}
            iconPosition="right"
            magneticStrength={0.2}
          >
            <span>View my work</span>
          </MagneticLink>
        </div>
      </ScrollReveal>
    </div>
  );
}

/* ============================================================
 *  Main Hero Section Export
 * ============================================================ */
export default function Hero() {
  return (
    <Section
      id="hero"
      className="relative w-full overflow-hidden min-h-screen flex items-center justify-center pt-24"
    >
      <Suspense fallback={null}>
        <LazyLightRays
          // count={10}
          color="rgba(160, 210, 255, 0.25)"
          blur={50}
        />
      </Suspense>

      <TooltipProvider delayDuration={0}>
        <Layout className="relative z-10 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 sm:px-6">
          <ScrollReveal variant="fade" delay={0} duration={0.6} once={false}>
            <AvatarStatus />
          </ScrollReveal>

          <ScrollReveal
            variant="slide-up"
            delay={0.1}
            duration={0.6}
            once={false}
          >
            <Headline />
          </ScrollReveal>

          <HeroActions />

          <ScrollReveal variant="fade" delay={0.7} duration={0.6} once={false}>
            <motion.div
              className="mt-2 md:mt-4 text-muted-foreground hover:text-foreground transition-colors animate-bounce cursor-pointer"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Scroll down"
            >
              <IconChevronDown size={22} stroke={1.5} />
            </motion.div>
          </ScrollReveal>
        </Layout>
      </TooltipProvider>
    </Section>
  );
}
