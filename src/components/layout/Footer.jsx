"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { IconArrowUpRight, IconDownload } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { nav, socials, personal, footer } from "@/data/idx";
import { GradientHeading } from "../ui/Heading";
import { Badge } from "../ui/badge";

// 1. CTA Action Buttons Component
const FooterCTA = () => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <a
      href={personal.email ? `mailto:${personal.email}` : "#"}
      className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
    >
      <span>{footer.ctaLabel}</span>
      <IconArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
    <a
      href={footer.resumePath}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm"
    >
      <IconDownload className="w-4 h-4 text-zinc-300" />
      <span>Resume</span>
    </a>
  </div>
);

// 2. White Strip Component (Aligned to flex-end / bottom via mt-auto)
const WhiteStrip = () => (
  <div className="w-full mt-auto rounded-md bg-white text-zinc-950 py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-medium text-xs sm:text-sm shadow-sm">
    {/* Left Side: Nav Links */}
    <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
      {nav.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="px-2 py-1 rounded-md text-zinc-800 hover:text-zinc-950 hover:bg-zinc-100 transition-all font-medium text-xs sm:text-sm"
        >
          {item.label}
        </a>
      ))}
    </div>

    {/* Right Side: Social Icons */}
    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
      {socials.map(({ platform, icon: Icon, label, url }) => (
        <Tooltip key={platform}>
          <TooltipTrigger asChild>
            <a
              href={url}
              target={url.startsWith("http") ? "_blank" : undefined}
              rel={url.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="p-2 rounded-lg text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <Icon size={19} stroke={1.8} />
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

// 3. Bottom Footer Metadata Component
const BottomFooter = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
    className="flex items-center justify-between px-2 text-xs text-muted-foreground/70"
  >
    <p className="font-mono text-xs">
      © {new Date().getFullYear()} · {personal.name}
    </p>
  </motion.div>
);

// Main Footer Component
export const Footer = ({ onFooterInViewChange }) => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { amount: 0.2 });

  useEffect(() => {
    if (onFooterInViewChange) {
      onFooterInViewChange(isInView);
    }
  }, [isInView, onFooterInViewChange]);

  return (
    <TooltipProvider>
      <Section noFade className="py-8 sm:py-12 pb-4 sm:pb-4">
        <footer
          ref={footerRef}
          className="relative w-full bg-background text-foreground overflow-hidden font-sans"
        >
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative rounded-lg bg-[#1c1b1b] border border-border p-3 pt-12 flex flex-col items-center min-h-100 shadow-2xl gap-4"
            >
              {/* Centered Content Wrapper */}
              <div className="flex flex-col items-center justify-center gap-8 my-auto text-center">
                <Badge variant="outline">{footer.badge}</Badge>
                <GradientHeading
                  text={footer.heading}
                  className="text-3xl! max-w-4xl"
                />
                <FooterCTA />
              </div>

              {/* White Strip Anchored at Bottom */}
              <WhiteStrip />
            </motion.div>

            <BottomFooter />
          </div>
        </footer>
      </Section>
    </TooltipProvider>
  );
};