"use client";

import React from "react";
import Link from "next/link";
import {
  IconLink,
  IconExternalLink,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
  Callout,
  Note,
  Tip,
  Warning,
  Danger,
  Important,
} from "@/components/docs/Callout";
import { ZoomImage } from "@/components/docs/ZoomImage";
import { MarkdownPre } from "@/components/common/CodeBlock";

function nodeToText(node) {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (typeof node === "object" && node.props && node.props.children !== undefined) {
    return nodeToText(node.props.children);
  }
  return "";
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

/* ── Only 3 things are truly custom here ──
   1. Headings — anchor link on hover
   2. Links — internal/external routing
   3. Images — ZoomImage lightbox wrapper
   Everything else (p, ul, ol, li, blockquote, code, pre, table, etc.)
   is rendered by Streamdown with our shared markdown-styles classes
   applied via the components map in Markdown.jsx. */

function createHeading(Tag, baseClasses) {
  return function HeadingComponent({ children, id, className, ...props }) {
    const headingText = nodeToText(children);
    const headingId = id || slugify(headingText);

    return (
      <Tag
        id={headingId}
        className={cn("group/heading relative scroll-mt-24 text-foreground", baseClasses, className)}
        {...props}
      >
        <span className="inline-block">{children}</span>
        <a
          href={`#${headingId}`}
          aria-label={`Link to ${headingText}`}
          className="ml-2 inline-flex opacity-0 transition-opacity duration-150 group-hover/heading:opacity-100 text-muted-foreground hover:text-primary"
        >
          <IconLink className="size-4 inline-block" />
        </a>
      </Tag>
    );
  };
}

export const mdxCustomComponents = {
  h1: createHeading("h1", "text-2xl sm:text-3xl font-extrabold tracking-tight mt-10 mb-5 leading-tight"),
  h2: createHeading("h2", "text-xl sm:text-2xl font-bold tracking-tight mt-12 mb-4 pb-2.5 border-b border-border/50"),
  h3: createHeading("h3", "text-lg sm:text-xl font-semibold tracking-tight mt-8 mb-3"),
  h4: createHeading("h4", "text-base sm:text-lg font-semibold tracking-tight mt-6 mb-2"),
  h5: createHeading("h5", "text-sm font-semibold tracking-wider uppercase text-muted-foreground mt-4 mb-2"),
  h6: createHeading("h6", "text-xs font-semibold tracking-widest uppercase text-muted-foreground mt-4 mb-2"),

  pre: MarkdownPre,

  a: ({ href = "#", children, className, ...props }) => {
    const isExternal = typeof href === "string" && href.startsWith("http");
    const linkCls = cn(
      "text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary font-medium cursor-pointer",
      className
    );

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls} {...props}>
          <span>{children}</span>
          <IconExternalLink className="size-3 opacity-70 ml-0.5 inline-block" />
        </a>
      );
    }

    return (
      <Link href={href || "#"} className={linkCls} {...props}>
        {children}
      </Link>
    );
  },

  img: ({ src, alt, caption, width, height, ...props }) => (
    <ZoomImage
      src={src}
      alt={alt || "Image"}
      caption={caption}
      width={width || 1200}
      height={height || 675}
      {...props}
    />
  ),

  Callout,
  Note,
  Tip,
  Warning,
  Danger,
  Important,
};

export default mdxCustomComponents;