"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconSchool, IconExternalLink } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { education } from "@/data/idx";

export const Education = () => {
  return (
    <Section noFade className="py-12 md:py-16">
      <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center gap-3">
          <Badge variant="outline">ACADEMICS</Badge>
          <GradientHeading text="Education" className="text-3xl! sm:text-5xl!" />
          <p className="text-sm sm:text-base text-muted-foreground/80 max-w-xl">
            My academic foundation and educational background.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="w-full space-y-6">
          {education?.map((item, idx) => (
            <motion.div
              key={item.id || item.degree + idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-lg bg-[#1c1b1b] border border-border p-5 sm:p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full border border-white/10 bg-white/5 p-2 flex items-center justify-center shrink-0 text-zinc-300">
                    <IconSchool className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                      {item.degree}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                      {item.institution}
                    </p>
                  </div>
                </div>

                <span className="font-mono text-xs sm:text-sm text-zinc-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full shrink-0">
                  {item.period}
                </span>
              </div>

              {item.description && (
                <p className="text-sm text-zinc-300 leading-relaxed pl-13">
                  {item.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};