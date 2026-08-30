"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * NavLink — drop-in replacement for ExtendedLink.
 *
 * - Internal routes → next/link with active state via usePathname()
 * - External (http/https/mailto/#) → plain <a> with target="_blank"
 * - Supports prefetch intent via `prefetch` prop
 * - forwardRef preserved for AnimatedBeam / ref consumers
 */
export const NavLink = forwardRef(function NavLink(
  {
    href,
    className,
    children,
    newTab = true,
    active,
    activeClassName,
    prefetch,
    ...rest
  },
  ref,
) {
  const pathname = usePathname();

  const isExternal =
    href &&
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("#"));

  // Active detection: exact match or prefix match for nested routes
  const isActive =
    active !== undefined
      ? active
      : !isExternal &&
        href &&
        (pathname === href || (href !== "/" && pathname.startsWith(href)));

  const cls = cn(
    "inline-flex items-center gap-1.5 transition-all cursor-pointer",
    className,
    isActive && activeClassName,
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

  return (
    <Link ref={ref} href={href} className={cls} prefetch={prefetch} {...rest}>
      {children}
    </Link>
  );
});

NavLink.displayName = "Navigation Link";

export default NavLink;
