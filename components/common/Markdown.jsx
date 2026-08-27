"use client";

import Link from "next/link";
import { Streamdown } from "streamdown";
import { code } from "@streamdown/code";
import { cn } from "@/lib/utils";
import { createMarkdownElements, markdownScales } from "./markdown-styles";

const INCOMPLETE_LINK = "streamdown:incomplete-link";

function ChatLink({ href, children, className, ...props }) {
  if (href === INCOMPLETE_LINK) {
    return (
      <span className={cn("text-muted-foreground", className)} {...props}>
        {children}
      </span>
    );
  }
  const cls = cn(
    "text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary font-medium break-words",
    className
  );
  if (/^https?:\/\//i.test(href || "")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer nofollow" className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href || "#"} className={cls}>
      {children}
    </Link>
  );
}

function chatHeading(Tag, cls) {
  return function ChatHeading({ children, className, ...props }) {
    return (
      <Tag className={cn(cls, className)} {...props}>
        {children}
      </Tag>
    );
  };
}

export const chatMarkdownComponents = {
  ...createMarkdownElements("chat"),
  h1: chatHeading("h1", "text-base font-semibold tracking-tight mt-3 mb-1.5 first:mt-0"),
  h2: chatHeading("h2", "text-sm font-semibold tracking-tight mt-3 mb-1.5 first:mt-0"),
  h3: chatHeading("h3", "text-sm font-semibold tracking-tight mt-2 mb-1"),
  h4: chatHeading("h4", "text-sm font-semibold tracking-tight mt-2 mb-1"),
  h5: chatHeading("h5", "text-xs font-semibold tracking-tight mt-2 mb-1"),
  h6: chatHeading(
    "h6",
    "text-xs font-semibold tracking-wider uppercase text-muted-foreground mt-2 mb-1"
  ),
  a: ChatLink,
  inlineCode: ({ children, className }) => (
    <code className={cn(markdownScales.chat.code, className)}>{children}</code>
  ),
  img: ({ src, alt, className }) => (
    <img
      src={typeof src === "string" ? src : ""}
      alt={alt || ""}
      loading="lazy"
      className={cn("max-w-full h-auto rounded-lg border border-border/60", className)}
    />
  ),
};

export function Markdown({
  children,
  className,
  components,
  shikiTheme = ["github-light", "github-dark"],
}) {
  return (
    <div
      className={cn(
        "text-foreground break-words [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
    >
      <Streamdown
        plugins={{ code }}
        shikiTheme={shikiTheme}
        components={{ ...chatMarkdownComponents, ...components }}
      >
        {children}
      </Streamdown>
    </div>
  );
}