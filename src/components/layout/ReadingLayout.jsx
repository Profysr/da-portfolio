"use client";

import { Outlet, useMatches, useNavigate } from "react-router-dom";
import { Section } from "./Section";
import { Footer } from "./Footer";
import { GradientHeading } from "../ui/Heading";

function ReadingLayout() {
  const navigate = useNavigate();
  const matches = useMatches();

  const crumbs = matches
    .filter((m) => typeof m.handle?.breadcrumb === "string")
    .map((m) => m.handle.breadcrumb);

  const currentTitle = crumbs[crumbs.length - 1] ?? "";

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Sticky top bar — breadcrumbs only ── */}
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center gap-2 sm:gap-3 h-12 px-4 sm:px-6">
          <GradientHeading
            as="span"
            className="text-sm font-semibold tracking-tight"
          >
            {crumbs[0] ?? "Reading"}
          </GradientHeading>

          {crumbs.length > 1 && (
            <>
              <span className="text-border text-sm">/</span>
              <span className="text-xs text-muted-foreground truncate">
                {currentTitle}
              </span>
            </>
          )}
        </div>
      </header>

      {/* ── Page content — back button rendered by child pages ── */}
      <Section className="flex-1 py-8 md:py-12" noFade>
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </Section>

      <Footer />
    </div>
  );
}

export default ReadingLayout;