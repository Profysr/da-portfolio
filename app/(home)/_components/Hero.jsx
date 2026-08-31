"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconArrowRight, IconChevronDown } from "@tabler/icons-react";
import { personal, socials } from "@/data/idx.js";
import { cn } from "@/lib/utils";
import { AvatarStatus } from "@/components/AvatarStatus";
import { HeroConstellation } from "@/components/ui/hero-constellation";
import Heading from "@/components/ui/Heading";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { ShimmerLink } from "@/components/ui/shimmer-button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Section } from "@/components/layout/Section";

/* ============================================================
 *  Headline — watermark + kinetic typewriter roles
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
 *  Actions — socials + single primary CTA (one cluster)
 * ============================================================ */
function HeroActions() {
  const [wiggleIcon, setWiggleIcon] = useState(null);

  const handleIconClick = (name) => {
    setWiggleIcon(name.toLowerCase());
    setTimeout(() => setWiggleIcon(null), 600);
  };

  const getIconClass = (isWiggling) =>
    `transition-all duration-300 ${isWiggling ? "animate-wiggle scale-125" : "hover:scale-110"}`;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-3xl">
      <div className="flex items-center gap-4 sm:gap-5">
        {socials.map(({ platform, label, icon: Icon, url, aria }) => (
          <Tooltip key={platform}>
            <TooltipTrigger asChild>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={aria || label}
                onClick={() => handleIconClick(label)}
                className="p-3 rounded-md hover:bg-foreground/5 transition-colors"
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

      <ShimmerLink
        href="#projects"
        icon={<IconArrowRight size={18} />}
        iconPosition="right"
        className="inline-flex items-center justify-center"
      >
        <span>View my work</span>
      </ShimmerLink>
    </div>
  );
}

/* ============================================================
 *  Hero — stack discipline: status · headline · subtext · CTA
 * ============================================================ */
export default function Hero() {
  return (
    <Section id="hero" className="relative">
      <HeroConstellation desktopDots={300} mobileDots={75} />
      <div className="flex w-full flex-col items-center justify-center gap-7 text-center pt-18 md:pt-32">
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

        {/* Scroll-down indicator — fills the visual gap & guides user to next section */}
        <div
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Scroll to About section"
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-4 sm:mt-6 flex flex-col items-center gap-1.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase group-hover:text-foreground transition-colors">
            Scroll
          </span>
          <IconChevronDown size={24} strokeWidth={2.5} />
        </div>
      </div>
    </Section>
  );
}
