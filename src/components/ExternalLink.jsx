"use client";

import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Reusable link component:
 * - Starts with "http", "https", "mailto:", or "#" → renders <a>
 * - Otherwise → renders React Router <Link> for internal navigation
 *
 * Forwards refs so consumers can attach refs (e.g. for AnimatedBeam).
 */
export const ExternalLink = forwardRef(function ExternalLink(
  { href, className, children, newTab = true, ...rest },
  ref,
) {
  const isExternal =
    href &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("#"));

  const cls = cn(
    "inline-flex items-center gap-1.5 transition-all cursor-pointer",
    className,
  );

  if (isExternal) {
    return (
      <a
        ref={ref}
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        className={cls}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Internal route - use React Router Link
  return (
    <Link ref={ref} to={href} className={cls} {...rest}>
      {children}
    </Link>
  );
});