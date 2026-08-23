import Image from "next/image";
import { IconDownload } from "@tabler/icons-react";
import { personal } from "@/data/idx.js";
import { downloadResume } from "@/lib/download";

/* ------------------------------------------------------------------ */
/*  TopBar — fixed, full-width, with Logo and ATS Resume Download CTA */
/* ------------------------------------------------------------------ */
function TopBar({ isVisible }) {
  return (
    <header
      className={`fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 flex items-center justify-center pointer-events-none transition-transform duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      }`}
    >
      <div className="pointer-events-auto flex items-center justify-between max-w-7xl w-full mx-auto py-2 px-3 bg-background/30 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg">
        <a
          href="#hero"
          aria-label="Home"
          className="flex items-center gap-2 font-bold tracking-tight text-white hover:text-primary transition-colors text-sm sm:text-base"
        >
          {personal.logo ? (
            <Image
              src={personal.logo}
              alt="Bilal Ahmad"
              width={80}
              height={24}
              loading="eager"
              className="h-auto object-contain"
            />
          ) : (
            <span>DA</span>
          )}
        </a>
        {personal.resumeUrl && (
          <button
            type="button"
            onClick={() => downloadResume(personal.resumeUrl)}
            className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded sm:rounded-md border border-border bg-surface-high/60 hover:bg-surface-high hover:border-primary/40 text-foreground font-medium text-xs sm:text-sm transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            <IconDownload className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            <span>Resume</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default TopBar;
