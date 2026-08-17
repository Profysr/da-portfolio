"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconSchool,
  IconAward,
  IconCertificate,
  IconExternalLink,
  IconSparkles,
  IconCheck,
} from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Layout } from "@/components/layout/Layout";
import { GradientHeading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { education, certificates, awards } from "@/data/idx";

const TABS = [
  { id: "all", label: "All Credentials" },
  { id: "certs", label: "Certifications & Licenses", count: certificates.length },
  { id: "edu", label: "Academic Education", count: education.length },
  { id: "awards", label: "Honors & Awards", count: awards?.length || 0 },
];

export function Credentials() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Section id="credentials" noFade className="py-10 md:py-16">
      <Layout>
        <div className="flex flex-col items-center gap-7">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-2.5">
            <Badge variant="outline">CREDENTIALS & BACKGROUND</Badge>
            <GradientHeading
              text="Education & Certifications"
              className="text-3xl! sm:text-5xl!"
            />
            <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg">
              Verified industry certifications, academic degrees, and honors aligned with LinkedIn standards.
            </p>
          </div>

          {/* Filter Tabs — Responsive wrap without broken oval border */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 w-full max-w-2xl">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 inline-flex items-center gap-1.5 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "bg-surface border border-border text-muted-foreground hover:text-white hover:border-primary/40 hover:bg-surface-high"
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-white/10 text-muted-foreground"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Cards Content */}
          <div className="w-full space-y-6">
            {/* Certifications Block */}
            {(activeTab === "all" || activeTab === "certs") && (
              <div className="space-y-3">
                {activeTab === "all" && (
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-0.5">
                    <IconCertificate className="size-3.5 text-primary" />
                    <span>Industry Certifications</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {certificates.map((cert, idx) => (
                    <motion.div
                      key={cert.id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className="rounded-md border border-border bg-surface p-4 sm:p-5 shadow-lg flex flex-col justify-between gap-3 hover:border-primary/40 transition-all group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="size-8 rounded border border-primary/20 bg-primary/10 flex items-center justify-center text-primary shrink-0">
                              <IconCertificate className="size-4" />
                            </div>
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-primary transition-colors">
                                {cert.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {cert.issuingOrg}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-[11px] text-zinc-400 shrink-0 bg-white/5 border border-border px-2 py-0.5 rounded">
                            {cert.issueDate}
                          </span>
                        </div>

                        {/* Credential ID */}
                        {cert.credentialId && (
                          <div className="text-[11px] font-mono text-muted-foreground/70">
                            Credential ID:{" "}
                            <span className="text-zinc-300">{cert.credentialId}</span>
                          </div>
                        )}

                        {/* Skills */}
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {cert.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center rounded border border-border bg-surface-high/40 px-2 py-0.5 text-[10px] font-mono text-zinc-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Verify Link */}
                      {cert.credentialUrl && cert.credentialUrl !== "#" && (
                        <div className="pt-2.5 border-t border-border flex items-center justify-between">
                          <span className="text-[11px] text-emerald-400 inline-flex items-center gap-1">
                            <IconCheck className="size-3" />
                            <span>Verified</span>
                          </span>
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                          >
                            <span>Verify Credential</span>
                            <IconExternalLink className="size-3" />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Block */}
            {(activeTab === "all" || activeTab === "edu") && (
              <div className="space-y-3">
                {activeTab === "all" && (
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-0.5 pt-2">
                    <IconSchool className="size-3.5 text-primary" />
                    <span>Academic Education</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {education.map((edu, idx) => (
                    <motion.div
                      key={edu.id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className="rounded-md border border-border bg-surface p-4 sm:p-5 shadow-lg flex flex-col justify-between gap-3 hover:border-primary/40 transition-all group"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="size-8 rounded border border-border bg-white/[0.04] flex items-center justify-center text-primary shrink-0">
                              <IconSchool className="size-4" />
                            </div>
                            <div>
                              <h4 className="text-sm sm:text-base font-semibold text-white">
                                {edu.institution}
                              </h4>
                              <p className="text-xs text-primary font-medium">
                                {edu.degree}
                                {edu.fieldOfStudy ? ` • ${edu.fieldOfStudy}` : ""}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-[11px] text-zinc-400 shrink-0 bg-white/5 border border-border px-2 py-0.5 rounded">
                            {edu.startDate} — {edu.endDate}
                          </span>
                        </div>

                        {edu.grade && (
                          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-primary/30 bg-primary/10 text-primary text-[11px] font-medium">
                            <IconSparkles className="size-3" />
                            <span>{edu.grade}</span>
                          </div>
                        )}

                        {edu.description && (
                          <p className="text-xs text-zinc-300 leading-relaxed">
                            {edu.description}
                          </p>
                        )}

                        {edu.skills && edu.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {edu.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center rounded border border-border bg-surface-high/40 px-2 py-0.5 text-[10px] font-mono text-zinc-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {edu.url && edu.url !== "#" && (
                        <div className="pt-2.5 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                          <span>{edu.location}</span>
                          <a
                            href={edu.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
                          >
                            <span>Institution Site</span>
                            <IconExternalLink className="size-3" />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Honors & Awards Block */}
            {(activeTab === "all" || activeTab === "awards") && awards && awards.length > 0 && (
              <div className="space-y-3">
                {activeTab === "all" && (
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground pl-0.5 pt-2">
                    <IconAward className="size-3.5 text-primary" />
                    <span>Honors & Awards</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {awards.map((award, idx) => (
                    <motion.div
                      key={award.id || idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.04 }}
                      className="rounded-md border border-border bg-surface p-4 shadow-lg space-y-1.5 hover:border-primary/40 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="size-7 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                            <IconAward className="size-3.5" />
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-white">
                              {award.title}
                            </h4>
                            <p className="text-[11px] text-muted-foreground">{award.issuer}</p>
                          </div>
                        </div>
                        <span className="font-mono text-[10px] text-zinc-400 bg-white/5 border border-border px-1.5 py-0.5 rounded">
                          {award.date}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 pl-9 leading-relaxed">
                        {award.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Section>
  );
}

export default Credentials;
