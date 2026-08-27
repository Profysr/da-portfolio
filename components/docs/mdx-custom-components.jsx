"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconCopy,
  IconCheck,
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
import {
  Steps,
  Step,
  MDXTabs,
  MDXTab,
  Cards,
  DocCard,
  Kbd,
  FileTree,
} from "@/components/docs/DocsComponents";
import { ZoomImage } from "@/components/docs/ZoomImage";

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

/* ── Code Block with Copy Action & Language Header ── */
export function MDXPre({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);
  const child = Array.isArray(children) ? children[0] : children;
  const childProps = child && typeof child === "object" ? child.props : {};
  const childClass = typeof childProps?.className === "string" ? childProps.className : "";
  const language = childClass.match(/language-([\w+-]+)/)?.[1] || "";
  const rawCode = nodeToText(childProps?.children !== undefined ? childProps.children : children);

  const handleCopy = async () => {
    if (!rawCode) return;
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={cn("group/code relative my-6 overflow-hidden rounded-xl border border-border/80 bg-surface/90 shadow-e1 transition-all hover:border-primary/40", className)}>
      {/* Top Header Strip with Language & Copy */}
      <div className="flex items-center justify-between border-b border-border/60 bg-surface-muted/70 px-4 py-2 text-xs">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-surface px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-all hover:border-primary/50 hover:bg-surface-hover hover:text-foreground active:scale-95 cursor-pointer"
        >
          {copied ? (
            <>
              <IconCheck className="size-3 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <IconCopy className="size-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Container */}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground bg-transparent m-0 border-0 rounded-none">
        {children}
      </pre>
    </div>
  );
}

/* ── Heading Factory with Anchor Hover Link ── */
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

/* ── Premium Typography Components ── */
export const mdxCustomComponents = {
  h1: createHeading(
    "h1",
    "text-2xl sm:text-3xl font-extrabold tracking-tight mt-10 mb-5 leading-tight text-foreground"
  ),
  h2: createHeading(
    "h2",
    "text-xl sm:text-2xl font-bold tracking-tight mt-12 mb-4 pb-2.5 border-b border-border/50 flex items-center"
  ),
  h3: createHeading(
    "h3",
    "text-lg sm:text-xl font-semibold tracking-tight mt-8 mb-3 text-foreground"
  ),
  h4: createHeading(
    "h4",
    "text-base sm:text-lg font-semibold tracking-tight mt-6 mb-2 text-foreground"
  ),
  h5: createHeading(
    "h5",
    "text-sm font-semibold tracking-wider uppercase text-muted-foreground mt-4 mb-2"
  ),
  h6: createHeading(
    "h6",
    "text-xs font-semibold tracking-widest uppercase text-muted-foreground mt-4 mb-2"
  ),

  p: ({ children, className, ...props }) => (
    <p
      className={cn(
        "text-[15px] sm:text-base leading-[1.75] text-foreground/90 mb-6 font-normal tracking-[-0.01em]",
        className
      )}
      {...props}
    >
      {children}
    </p>
  ),

  ul: ({ children, className, ...props }) => (
    <ul
      className={cn(
        "my-5 space-y-2 list-disc pl-6 marker:text-primary text-[15px] sm:text-base leading-relaxed text-foreground/90",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  ),

  ol: ({ children, className, ...props }) => (
    <ol
      className={cn(
        "my-5 space-y-2 list-decimal pl-6 marker:text-primary marker:font-mono text-[15px] sm:text-base leading-relaxed text-foreground/90",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  ),

  li: ({ children, className, ...props }) => (
    <li className={cn("leading-relaxed pl-1", className)} {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, className, ...props }) => (
    <blockquote
      className={cn(
        "my-6 relative border-l-3 border-primary bg-surface/50 pl-5 pr-4 py-3.5 rounded-r-xl italic text-foreground/90 text-[15px] sm:text-base font-normal shadow-2xs leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),

  code: ({ children, className, ...props }) => {
    const isInline = !className || !className.includes("language-");
    if (isInline) {
      return (
        <code
          className={cn(
            "relative rounded-md bg-surface-muted border border-border/80 px-1.5 py-0.5 text-[13px] font-mono text-primary font-medium tracking-tight shadow-2xs",
            className
          )}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },

  pre: MDXPre,

  a: ({ href = "#", children, className, ...props }) => {
    const isExternal = typeof href === "string" && href.startsWith("http");
    const linkCls = cn(
      "inline-flex items-center gap-0.5 text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary font-medium transition-colors cursor-pointer",
      className
    );

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkCls}
          {...props}
        >
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

  table: ({ children, className, ...props }) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border/70 bg-surface/40 shadow-xs">
      <table className={cn("w-full border-collapse text-left text-sm", className)} {...props}>
        {children}
      </table>
    </div>
  ),

  th: ({ children, className, ...props }) => (
    <th
      className={cn(
        "border-b border-border/80 p-3.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground bg-surface-muted/80",
        className
      )}
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, className, ...props }) => (
    <td
      className={cn(
        "border-b border-border/40 p-3.5 text-sm text-foreground/90 leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </td>
  ),

  hr: ({ className, ...props }) => (
    <hr className={cn("my-10 border-border/60", className)} {...props} />
  ),

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

  /* ── Interactive Custom Components ── */
  Callout,
  Note,
  Tip,
  Warning,
  Danger,
  Important,
  Steps,
  Step,
  MDXTabs,
  MDXTab,
  Tabs: MDXTabs,
  Tab: MDXTab,
  Cards,
  Card: DocCard,
  DocCard,
  Kbd,
  FileTree,
  ZoomImage,
  Image: ZoomImage,
};

export default mdxCustomComponents;
