"use client";

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function ExternalLink({ href, className, children, newTab = true }) {
  const isExternal =
    href &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("#"));

  const cls = cn(
    "inline-flex items-center gap-1.5 transition-all cursor-pointer",
    className,
  );

  if (isExternal && newTab) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  // Internal link - use React Router Link
  return (
    <Link to={href} className={cls}>
      {children}
    </Link>
  );
}
