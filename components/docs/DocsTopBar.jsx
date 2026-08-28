"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  IconFolderCode,
  IconArticle,
} from "@tabler/icons-react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Logo } from "@/components/layout/Logo";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DocsTopBar({ type = "writing", title = "" }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const selectedTheme =
    theme === "system" ? "system" : resolvedTheme === "dark" ? "dark" : "light";

  const isProject = type === "project" || type === "projects";
  const parentLabel = isProject ? "Projects" : "Writing";
  const parentHref = isProject ? "/#projects" : "/#writings";
  const ParentIcon = isProject ? IconFolderCode : IconArticle;

  return (
    <header className="sticky top-0 z-40 w-full bg-background/50 backdrop-blur-xl border-b border-border transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Logo & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            aria-label="Home"
            className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
          >
            <Logo className="h-7 w-auto text-foreground" />
          </Link>

          <span className="text-muted-foreground/40 shrink-0 select-none">
            /
          </span>

          <Breadcrumb className="min-w-0">
            <BreadcrumbList className="flex-nowrap">
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <Link href={parentHref}>
                    <ParentIcon className="size-3.5 text-primary/80" />
                    <span>{parentLabel}</span>
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              {title && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="min-w-0">
                    <BreadcrumbPage className="truncate max-w-35 sm:max-w-65 md:max-w-95">
                      {title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Right: Theme Switcher */}
        <div className="flex items-center shrink-0">
          <ThemeSwitcher value={selectedTheme} onChange={(t) => setTheme(t)} />
        </div>
      </div>
    </header>
  );
}
