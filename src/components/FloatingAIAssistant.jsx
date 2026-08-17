"use client";

import React, { useState } from "react";
import { IconSparkles } from "@tabler/icons-react";
import { AIRecruiterModal } from "./AIRecruiterModal";

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button / Pill */}
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Recruiter Assistant"
          className="group relative flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full border border-primary/40 bg-surface/90 hover:bg-surface-high text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(208,188,255,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_28px_rgba(208,188,255,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:border-primary/70"
        >
          {/* Subtle animated border ping glow */}
          <span className="absolute -inset-0.5 rounded-full bg-linear-to-r from-primary/30 via-transparent to-primary/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />

          {/* Sparkle Icon */}
          <div className="relative flex size-6 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <IconSparkles className="size-3.5 animate-pulse" />
          </div>

          {/* Label */}
          <span className="relative text-xs sm:text-sm font-semibold tracking-tight text-white pr-1">
            Ask AI
          </span>

          {/* Online Indicator */}
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
        </button>
      </div>

      {/* Global AI Recruiter Modal */}
      <AIRecruiterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default FloatingAIAssistant;
