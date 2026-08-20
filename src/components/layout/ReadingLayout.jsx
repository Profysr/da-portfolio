"use client";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Section } from "./Section";
import { Footer } from "./Footer";
import { IconArrowLeft } from "@tabler/icons-react";

function ReadingLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isProject = pathname.startsWith("/projects");
  const isWriting = pathname.startsWith("/writing");

  const breadcrumb =
    isProject
      ? { label: "Projects", href: "/" }
      : isWriting
        ? { label: "Writing", href: "/" }
        : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center gap-4 px-4 sm:px-6 h-12">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <IconArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          {breadcrumb && (
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <button
                type="button"
                onClick={() => navigate(breadcrumb.href)}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                {breadcrumb.label}
              </button>
              <span className="text-border">/</span>
              <span className="text-foreground truncate max-w-[200px] sm:max-w-none">
                <Outlet />
              </span>
            </nav>
          )}
        </div>
      </div>

      {/* Page content */}
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