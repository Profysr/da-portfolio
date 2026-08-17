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
import { GradientHeading } from "../ui/Heading";

/* ─────────────────────────────────────────────────────────────
 *  1. Footer CTA Action Buttons
 * ───────────────────────────────────────────────────────────── */
const FooterCTA = () => (
  <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
    <a
      href={personal.email ? `mailto:${personal.email}` : "#"}
      className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-zinc-950 font-semibold text-sm transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(208,188,255,0.35)]"
    >
      <span>{footer?.ctaLabel || "Let's Talk"}</span>
      <IconArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
    {(personal.resumeUrl || footer?.resumePath) && (
      <a
        href={personal.resumeUrl || footer?.resumePath}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] hover:border-primary/40 text-white font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
      >
        <IconDownload className="w-4 h-4 text-zinc-300" />
        <span>Resume</span>
      </a>
    )}
  </div>
);

/* ─────────────────────────────────────────────────────────────
 *  2. Bottom Navigation & Socials Contrast Strip
 * ───────────────────────────────────────────────────────────── */
const FooterNavStrip = () => (
  <div className="w-full mt-10 rounded-xl bg-zinc-800/80 border border-white/10 text-zinc-300 py-4 px-5 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-medium text-xs sm:text-sm backdrop-blur-xl shadow-lg">
    {/* Left: Quick Nav Links */}
    <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center">
      {nav.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="px-2.5 py-1 rounded-md text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all font-medium text-xs sm:text-sm"
        >
          {item.label}
        </a>
      ))}
    </div>

    {/* Right: Social Channels with Tooltips */}
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
      {socials.map(({ platform, icon: Icon, label, url }) => (
        <Tooltip key={platform}>
          <TooltipTrigger asChild>
            <a
              key={platform}
              href={url}
              target={url.startsWith("http") ? "_blank" : undefined}
              rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.1] hover:border-primary/30 hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <Icon size={18} stroke={1.8} />
            </a>
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
  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-xs text-zinc-500 font-mono">
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
            {/* Elevated Frosted Shady Container */}
            <div className="relative rounded-lg bg-linear-to-b from-zinc-900/90 via-zinc-950/95 to-black border border-white/15 p-6 sm:p-10 md:p-12 flex flex-col items-center shadow-[0_15px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl overflow-hidden">
              {/* Subtle top ambient light ray */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-lg h-56 bg-primary/20 blur-3xl rounded-full"
              />
              {/* Subtle Dot Grid inside container */}
              {/* <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] bg-size-[20px_20px]"
              /> */}

              {/* Centered CTA Section */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-4 text-center max-w-2xl mx-auto my-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary text-xs font-medium backdrop-blur-md shadow-sm">
                  <IconSparkles className="h-3.5 w-3.5" />
                  <span>{footer?.badge || "Get in Touch"}</span>
                </div>

                <GradientHeading
                  text={
                    footer?.heading ||
                    "Ready to build something impactful together?"
                  }
                  className="text-2xl! sm:text-3xl! md:text-4xl! font-bold tracking-tight text-white max-w-xl"
                />

                <p className="text-xs sm:text-sm md:text-base capitalize text-zinc-400 leading-relaxed max-w-lg">
                  {footer?.subheading ||
                    "Whether you need scalable data pipelines, AI tooling, or full-stack software, let's talk."}
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
