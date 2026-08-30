"use client";

import React from "react";
import {
  IconArrowUp,
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
import { downloadResume } from "@/utils/download";
import { ExtendedLink } from "@/components/common/ExtendedLink";
// import { ViewOnMap } from "@/components/watermelon/ViewOnMap";

/* ─────────────────────────────────────────────────────────────
 *  1. Hero Actions (Contact + Resume + Map)
 * ───────────────────────────────────────────────────────────── */
const FooterActions = () => (
  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
    {/* Main Contact CTA */}
    <ExtendedLink
      href={personal.email ? `mailto:${personal.email}` : "#"}
      newTab={false}
      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold text-xs sm:text-sm transition-transform active:scale-95"
    >
      <span>{footer?.ctaLabel || "Let's Talk"}</span>
      <IconArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </ExtendedLink>

    {/* Resume Download */}
    {(personal.resumeUrl || footer?.resumePath) && (
      <button
        type="button"
        onClick={() => downloadResume(personal.resumeUrl || footer?.resumePath)}
        className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-surface-muted hover:bg-surface hover:border-primary/40 text-foreground font-medium text-xs sm:text-sm transition-all active:scale-95"
      >
        <IconDownload className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
        <span>Resume</span>
      </button>
    )}

    {/* Interactive Map Trigger */}
    {/* <ViewOnMap address={personal.location || "Boston Public Garden"} /> */}
  </div>
);

/* ─────────────────────────────────────────────────────────────
 *  2. Navigation, Socials & Back to Top Strip
 * ───────────────────────────────────────────────────────────── */
const FooterNavStrip = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full rounded-md bg-surface-muted/60 border border-border py-3 px-4 sm:px-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
      {/* Left: Quick Nav Links */}
      <nav
        className="flex items-center gap-1 flex-wrap justify-center"
        aria-label="Footer Navigation"
      >
        {nav.map((item) => (
          <ExtendedLink
            key={item.id}
            href={`#${item.id}`}
            newTab={false}
            className="px-2.5 py-1 rounded text-muted-foreground hover:text-foreground hover:bg-surface transition-colors font-medium"
          >
            {item.label}
          </ExtendedLink>
        ))}
      </nav>

      {/* Right: Social Channels & Back-To-Top Button */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {socials.map(({ platform, icon: Icon, label, url }) => (
            <Tooltip key={platform}>
              <TooltipTrigger asChild>
                <ExtendedLink
                  href={url}
                  aria-label={label}
                  className="p-3 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
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

        <div className="h-4 w-px bg-border hidden sm:block" />

        {/* Go To Top */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-3 rounded-md border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors active:scale-95"
            >
              <IconArrowUp size={16} stroke={1.8} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Back to top
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
 *  3. Bottom Copyright, Attribution & System Status
 * ───────────────────────────────────────────────────────────── */
const BottomMetadata = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 text-xs text-muted-foreground font-mono">
    {/* Left: Copyright */}
    <p>
      © {new Date().getFullYear()} {personal.name}. All rights reserved.
    </p>

    {/* Center: Powered By / Built By Attribution */}
    <p className="text-xs text-muted-foreground/80">
      Built with <span className="text-foreground font-bold">Magic UI</span>
    </p>

    {/* Right: Operational Status */}
    <div className="flex items-center gap-2 text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span>Systems Operational ({personal.timezone || "UTC"})</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────
 *  Main Footer Component
 * ───────────────────────────────────────────────────────────── */
export const Footer = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <Section noFade>
        <footer className="w-full font-sans space-y-4">
          {/* Unified Primary Card */}
          <div className="rounded-lg bg-surface border border-border p-6 sm:p-10 flex flex-col items-center text-center gap-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/25 bg-primary/50 text-primary-foreground text-xs font-medium">
              <IconSparkles className="h-3.5 w-3.5" />
              <span>{footer?.badge || "Get in Touch"}</span>
            </div>

            <div className="space-y-2 max-w-xl">
              <Heading
                variant="gradient"
                text={
                  footer?.heading ||
                  "Ready to build something impactful together?"
                }
                className="text-2xl! sm:text-3xl! font-bold tracking-tight text-foreground"
              />

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
                {footer?.subheading ||
                  "Whether you need scalable automation, AI tooling, or full-stack software systems, let's talk."}
              </p>
            </div>

            <FooterActions />
            <FooterNavStrip />
          </div>

          <BottomMetadata />
        </footer>
      </Section>
    </TooltipProvider>
  );
};

export default Footer;
