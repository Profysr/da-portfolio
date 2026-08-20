"use client";

import Link from "react-router-dom";
import { IconExternalLink } from "@tabler/icons-react";

export function ExternalLink({
  href,
  className,
}) {
  const isExternal = href && (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("#"));

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <IconExternalLink className="size-3.5" />
      </a>
    );
  }

  // Internal link - use React Router Link
  return (
    <Link to={href} className={className}>
      <IconExternalLink className="size-3.5" />
    </Link>
  );
}