"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconAward } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";
import { certificates } from "@/data/idx";

const CertificateCard = ({ cert }) => (
  <div className="w-60 sm:w-[22rem] shrink-0 rounded-lg bg-surface border border-border p-5 shadow-xl flex flex-col justify-between gap-4 hover:border-primary/30 transition-all duration-300">
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="size-9 rounded-md border border-border bg-background/5 flex items-center justify-center text-primary">
          <IconAward className="size-5" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{cert.date}</span>
      </div>

      <div>
        <h4 className="text-base font-semibold text-foreground line-clamp-1">
          {cert.name}
        </h4>
        <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
      </div>
    </div>

    {cert.url && cert.url !== "#" && (
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline pt-2 border-t border-border"
      >
        <span>Verify Credential</span>
      </a>
    )}
  </div>
);

export const Certificates = () => {
  return (
    <Section id="certificates" noFade className="py-12 md:py-16 overflow-hidden">
      <Layout>
        <div className="flex flex-col items-center gap-8">
          {/* Header Block */}
          <div className="flex flex-col items-center text-center gap-3">
            <Badge variant="outline">CREDENTIALS</Badge>
            <GradientHeading
              text="Certifications"
              className="text-3xl! sm:text-5xl!"
            />
            <p className="text-sm sm:text-base text-muted-foreground/80 max-w-xl">
              Professional certifications and verified industry skill achievements.
            </p>
          </div>

          {/* Infinite Scroll Marquee — uses existing ui/marquee component */}
          <div className="w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <Marquee pauseOnHover repeat={4}>
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} cert={cert} />
              ))}
            </Marquee>
          </div>
        </div>
      </Layout>
    </Section>
  );
};