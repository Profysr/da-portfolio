"use client";

import React from "react";
import {
  IconArrowUpRight,
  IconDownload,
  IconSparkles,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { nav, socials, personal, footer } from "@/data/idx";
import { Heading } from "@/components/ui/Heading";
import { downloadResume } from "@/lib/download";

import { ExtendedLink } from "@/components/ExtendedLink";

/* ─────────────────────────────────────────────────────────────
 *  1. Footer CTA Action Buttons
 * ───────────────────────────────────────────────────────────── */
const FooterCTA = () => (
  <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
    <ExtendedLink
      href={personal.email ? `mailto:${personal.email}` : "#"}
      newTab={false}
      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-xs sm:text-sm transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(208,188,255,0.25)]"
    >
      <span>{footer?.ctaLabel || "Let's Talk"}</span>
      <IconArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </ExtendedLink>
    {(personal.resumeUrl || footer?.resumePath) && (
      <button
        type="button"
        onClick={() => downloadResume(personal.resumeUrl || footer?.resumePath)}
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-surface-high/60 hover:bg-surface-high hover:border-primary/40 text-foreground font-medium text-xs sm:text-sm transition-all duration-300 active:scale-95 backdrop-blur-md"
      >
        <IconDownload className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-y-0.5" />
        <span>Resume</span>
      </button>
    )}
  </div>
);

/* ─────────────────────────────────────────────────────────────
 *  2. Bottom Navigation & Socials Contrast Strip
 * ───────────────────────────────────────────────────────────── */
const FooterNavStrip = () => (
  <div className="w-full mt-8 rounded-md bg-surface-high/50 border border-border/80 text-muted-foreground py-3 px-4 sm:px-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-medium text-xs backdrop-blur-xl">
    {/* Left: Quick Nav Links */}
    <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
      {nav.map((item) => (
        <ExtendedLink
          key={item.id}
          href={`#${item.id}`}
          newTab={false}
          className="px-2.5 py-1 rounded text-muted-foreground hover:text-white hover:bg-white/[0.06] transition-all font-medium text-xs"
        >
          {item.label}
        </ExtendedLink>
      ))}
    </div>

    {/* Right: Social Channels with Tooltips */}
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
      {socials.map(({ platform, icon: Icon, label, url }) => (
        <Tooltip key={platform}>
          <TooltipTrigger asChild>
            <ExtendedLink
              key={platform}
              href={url}
              aria-label={label}
              className="p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-white/[0.08] hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <Icon size={16} stroke={1.8} />
            </ExtendedLink>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            {label}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
 *  3. Bottom Copyright & System Status Metadata
 * ───────────────────────────────────────────────────────────── */
const BottomMetadata = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-xs text-muted-foreground font-mono">
    <p>
      © {new Date().getFullYear()} · {personal.name}. All rights reserved.
    </p>
    <div className="flex items-center gap-2 text-[11px]">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      <span>Systems Operational ({personal.timezone})</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
 *  Main Footer Component
 * ───────────────────────────────────────────────────────────── */
export const Footer = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Section noFade className="relative py-8 sm:py-12">
        <footer className="w-full overflow-hidden font-sans">
          <div className="flex flex-col gap-4">
            {/* Elevated Surface Container matching theme tokens */}
            <div className="relative rounded-md bg-surface border border-border p-6 sm:p-8 md:p-10 flex flex-col items-center shadow-xl backdrop-blur-2xl overflow-hidden">
              {/* Subtle top ambient light ray */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-primary/10 blur-3xl rounded-full"
              />

              {/* Centered CTA Section */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-3.5 text-center max-w-2xl mx-auto my-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-medium backdrop-blur-md shadow-xs">
                  <IconSparkles className="h-3.5 w-3.5" />
                  <span>{footer?.badge || "Get in Touch"}</span>
                </div>

                <Heading
                  variant="gradient"
                  text={
                    footer?.heading ||
                    "Ready to build something impactful together?"
                  }
                  className="text-2xl! sm:text-3xl! font-bold tracking-tight text-white max-w-xl"
                />

                <p className="text-xs sm:text-sm capitalize text-muted-foreground leading-relaxed max-w-lg">
                  {footer?.subheading ||
                    "Whether you need scalable automation, AI tooling, or full-stack software systems, let's talk."}
                </p>

                <FooterCTA />
              </div>

              {/* Navigation & Socials Contrast Strip */}
              <div className="relative z-10 w-full">
                <FooterNavStrip />
              </div>
            </div>

            {/* Bottom Metadata */}
            <BottomMetadata />
          </div>
        </footer>
      </Section>
    </TooltipProvider>
  );
};

export default Footer;
