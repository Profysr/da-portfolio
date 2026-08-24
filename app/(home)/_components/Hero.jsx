"use client";

import { useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconArrowRight } from "@tabler/icons-react";
import { personal, socials } from "@/data/idx.js";
import { cn } from "@/lib/utils";
import { AvatarStatus } from "@/components/AvatarStatus";

import Heading from "@/components/ui/Heading";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";

/* ============================================================
 *  Headline â€” watermark + kinetic typewriter roles
 * ============================================================ */
const ROLES = [
  "Software Engineer",
  "Forward Deployed Engineer",
  "Engineering Lead",
];

function Headline() {
  return (
    <Heading title="Developer" variant="watermark">
      <TypingAnimation
        words={ROLES}
        loop
        typeSpeed={70}
        deleteSpeed={40}
        pauseDelay={1800}
        startOnView={false}
        className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground text-center"
      />
    </Heading>
  );
}

/* ============================================================
 *  Actions â€” socials + single primary CTA (one cluster)
 * ============================================================ */
function HeroActions() {
  const ctaRef = useRef(null);
  const [wiggleIcon, setWiggleIcon] = useState(null);

  const handleCtaMove = (e) => {
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleIconClick = (name) => {
    setWiggleIcon(name.toLowerCase());
    setTimeout(() => setWiggleIcon(null), 600);
  };

  const getIconClass = (isWiggling) =>
    `transition-all duration-300 ${isWiggling ? "animate-wiggle scale-125" : "hover:scale-110"}`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-3xl">
      <div className="flex items-center space-x-4 sm:space-x-5">
        {socials.map(({ platform, label, icon: Icon, url, aria }) => (
          <Tooltip key={platform}>
            <TooltipTrigger asChild>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={aria || label}
                onClick={() => handleIconClick(label)}
                className="p-2 rounded-md hover:bg-foreground/5 transition-colors"
              >
                <Icon
                  className={cn(
                    "h-5 w-5",
                    getIconClass(wiggleIcon === label.toLowerCase()),
                  )}
                  strokeWidth={1.5}
                />
              </a>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      <span className="hidden sm:block h-6 w-0.5 bg-border" aria-hidden />

      <MagneticLink
        ref={ctaRef}
        onMouseMove={handleCtaMove}
        href="#projects"
        variant="premium"
        className="inline-flex items-center justify-center"
        icon={<IconArrowRight />}
        iconPosition="right"
        magneticStrength={0.2}
      >
        <span>View my work</span>
      </MagneticLink>
    </div>
  );
}

/* ============================================================
 *  Hero â€” stack discipline: status Â· headline Â· subtext Â· CTA
 * ============================================================ */
export default function Hero() {
  return (
    <Section
      id="hero"
      className="relative flex min-h-dvh items-center justify-center pt-18 md:pt-24"
    >
      <Layout className="relative flex w-full flex-col items-center justify-center gap-7 px-4 text-center sm:px-6">
        <ScrollReveal variant="fade" duration={0.6}>
          <AvatarStatus />
        </ScrollReveal>

        <ScrollReveal variant="reveal" duration={0.8} className="w-full">
          <Headline />
        </ScrollReveal>

        <ScrollReveal variant="slide-up" duration={0.7} delay={0.15}>
          <p className="max-w-xl text-balance text-base sm:text-lg text-muted-foreground">
            {personal.tagline}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="slide-up" duration={0.7} delay={0.3}>
          <HeroActions />
        </ScrollReveal>
      </Layout>
    </Section>
  );
}
