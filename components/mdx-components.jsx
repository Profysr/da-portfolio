"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TechPill } from "@/components/common/TechPill";
import { Terminal, TypingAnimation, AnimatedSpan } from "@/components/ui/terminal";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MarkdownPre } from "@/components/common/CodeBlock";
import { ZoomImage } from "@/components/docs/ZoomImage";
import {
  Callout,
  Note,
  Tip,
  Warning,
  Danger,
  Important,
} from "@/components/docs/Callout";
import { cn } from "@/lib/utils";
import { createMarkdownElements } from "@/components/common/Markdown";
import {
  IconExternalLink,
  IconBrandGithub,
  IconRocket,
  IconHash,
} from "@tabler/icons-react";

const docBase = createMarkdownElements("doc");

/**
 * Helper to slugify string for heading IDs
 */
function slugify(text) {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function HeadingWithAnchor({
  level = 2,
  children,
  id,
  className,
  ...props
}) {
  const Component = `h${level}`;
  const textContent =
    typeof children === "string"
      ? children
      : React.Children.toArray(children)
          .map((child) => (typeof child === "string" ? child : ""))
          .join("");

  const headingId = id || slugify(textContent);

  const levelStyles = {
    1: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b border-border/60",
    2: "text-xl sm:text-2xl font-bold tracking-tight mt-10 mb-4 pb-2 border-b border-border/50",
    3: "text-lg sm:text-xl font-semibold tracking-tight mt-8 mb-3",
    4: "text-base sm:text-lg font-semibold tracking-tight mt-6 mb-2",
    5: "text-sm sm:text-base font-semibold tracking-tight mt-5 mb-2",
    6: "text-xs sm:text-sm font-semibold tracking-tight mt-4 mb-2 text-muted-foreground uppercase tracking-wider",
  };

  return (
    <Component
      id={headingId}
      className={cn(
        "group relative scroll-mt-24 text-foreground flex items-center gap-2",
        levelStyles[level],
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      {headingId && (
        <a
          href={`#${headingId}`}
          aria-label={`Link to ${textContent}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground/60 hover:text-primary p-1 rounded-md no-underline shrink-0"
        >
          <IconHash className="size-4" />
        </a>
      )}
    </Component>
  );
}

function ExternalLink({ href = "", children, className, ...props }) {
  const isExternal = typeof href === "string" && href.startsWith("http");
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary font-medium transition-colors inline-flex items-center gap-0.5",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {isExternal && <IconExternalLink className="size-3.5 opacity-70 ml-0.5 inline shrink-0" />}
    </Link>
  );
}

function GitHubLink({ href, children, className, ...props }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border border-border/80 bg-surface text-foreground hover:border-primary/50 hover:bg-surface-hover hover:text-primary hover:shadow-sm no-underline my-2",
        className
      )}
      {...props}
    >
      <IconBrandGithub className="size-4 shrink-0" />
      <span>{children}</span>
    </Link>
  );
}

function LiveLink({ href, children, className, ...props }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border border-border/80 bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm no-underline my-2",
        className
      )}
      {...props}
    >
      <IconRocket className="size-4 shrink-0" />
      <span>{children}</span>
      <IconExternalLink className="size-3.5 opacity-70 shrink-0" />
    </Link>
  );
}

export const mdxComponents = {
  h1: (props) => <HeadingWithAnchor level={1} {...props} />,
  h2: (props) => <HeadingWithAnchor level={2} {...props} />,
  h3: (props) => <HeadingWithAnchor level={3} {...props} />,
  h4: (props) => <HeadingWithAnchor level={4} {...props} />,
  h5: (props) => <HeadingWithAnchor level={5} {...props} />,
  h6: (props) => <HeadingWithAnchor level={6} {...props} />,

  ...docBase,

  pre: (props) => <MarkdownPre {...props} />,

  img: (props) => <ZoomImage {...props} />,
  Image: (props) => <ZoomImage {...props} />,
  ZoomImage,

  a: ({ href, children, className, ...props }) => (
    <ExternalLink href={href} className={className} {...props}>
      {children}
    </ExternalLink>
  ),

  // shadcn & custom documentation UI components
  Terminal,
  TypingAnimation,
  AnimatedSpan,
  Alert,
  AlertTitle,
  AlertDescription,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Callout,
  Note,
  Tip,
  Warning,
  Danger,
  Important,
  Badge: ({ variant = "outline", children, className, ...props }) => (
    <Badge
      variant={variant}
      className={cn("text-[11px]", className)}
      {...props}
    >
      {children}
    </Badge>
  ),
  TechPill: ({ name, size = "sm", className, ...props }) => (
    <TechPill name={name} size={size} className={className} {...props} />
  ),
  ExternalLink,
  GitHubLink,
  LiveLink,
};

export function useMDXComponents(components) {
  return {
    ...mdxComponents,
    ...components,
  };
}
