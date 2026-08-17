"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconAward, IconExternalLink } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { certificates } from "@/data/idx";

const CertificateCard = ({ cert }) => (
  <div className="w-75 sm:w-87.5 shrink-0 rounded-lg bg-[#1c1b1b] border border-border p-5 shadow-xl flex flex-col justify-between gap-4 hover:border-white/20 transition-all duration-300">
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="size-9 rounded-md border border-white/10 bg-white/5 flex items-center justify-center text-zinc-300">
          {cert.image ? (
            <img src={cert.image} alt={cert.issuer} className="size-5 object-contain" />
          ) : (
            <IconAward className="size-5" />
          )}
        </div>
        <span className="font-mono text-xs text-zinc-400">{cert.date}</span>
      </div>

      <div>
        <h4 className="text-base font-semibold text-white line-clamp-1">
          {cert.title}
        </h4>
        <p className="text-xs text-zinc-400 mt-0.5">{cert.issuer}</p>
      </div>
    </div>

    {cert.url && (
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors pt-2 border-t border-white/10"
      >
        <span>Verify Credential</span>
        <IconExternalLink className="size-3.5" />
      </a>
    )}
  </div>
);

export const Certificates = () => {
  return (
    <Section noFade className="py-12 md:py-16 overflow-hidden">
      <div className="flex flex-col items-center gap-8 max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-3">
          <Badge variant="outline">CREDENTIALS</Badge>
          <GradientHeading text="Certifications" className="text-3xl! sm:text-5xl!" />
          <p className="text-sm sm:text-base text-muted-foreground/80 max-w-xl">
            Professional certifications and verified industry skill achievements.
          </p>
        </div>

        {/* Infinite Scroll Marquee Container */}
        <div className="w-full relative flex overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-4 animate-marquee hover:paused shrink-0">
            {certificates?.concat(certificates).map((cert, idx) => (
              <CertificateCard key={cert.id + idx} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};