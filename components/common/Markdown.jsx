"use client";

import Link from "next/link";
import { Streamdown } from "streamdown";
import { code } from "@streamdown/code";
import { cn } from "@/lib/utils";

const INCOMPLETE_LINK = "streamdown:incomplete-link";

export const markdownScales = {
  doc: {
    p: "text-foreground/90 text-sm sm:text-base leading-relaxed mb-5 font-normal",
    ul: "text-foreground/90 text-sm sm:text-base mb-5 space-y-2 list-disc pl-6 marker:text-primary/70",
    ol: "text-foreground/90 text-sm sm:text-base mb-5 space-y-2 list-decimal pl-6 marker:text-primary font-mono",
    li: "leading-relaxed",
    blockquote:
      "my-6 relative border-l-4 border-primary bg-surface/50 pl-5 pr-4 py-3 rounded-r-xl italic text-foreground/90 text-sm sm:text-base font-normal",
    code: "relative rounded-md bg-surface-muted border border-border/80 px-1.5 py-0.5 text-[12.5px] font-mono text-foreground font-medium",
    strong: "font-semibold text-foreground",
    em: "italic text-foreground/90",
    hr: "border-border/80 my-10",
    tableWrap: "overflow-x-auto my-6 rounded-xl border border-border/80 bg-surface/40 shadow-xs",
    table: "w-full border-collapse text-left text-sm",
    th: "border-b border-border/80 p-3.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground bg-surface-muted/70",
    td: "border-b border-border/50 p-3.5 text-sm text-foreground/90 leading-relaxed",
  },
  chat: {
    p: "text-sm leading-relaxed mb-2.5 last:mb-0",
    ul: "text-sm mb-2.5 space-y-1 list-disc pl-5 marker:text-primary/70",
    ol: "text-sm mb-2.5 space-y-1 list-decimal pl-5 marker:text-primary font-mono",
    li: "leading-relaxed [&>p]:mb-0",
    blockquote: "my-2 border-l-2 border-primary/60 pl-3 italic text-muted-foreground",
    code: "rounded-md bg-surface-muted border border-border/60 px-1.5 py-0.5 text-xs font-mono text-foreground font-medium",
    strong: "font-semibold text-foreground",
    em: "italic text-foreground/90",
    hr: "border-border/60 my-3",
    tableWrap: "overflow-x-auto my-2.5 rounded-lg border border-border/60",
    table: "w-full border-collapse text-left text-xs",
    th: "border-b border-border/60 px-2.5 py-1.5 font-semibold text-[11px] uppercase tracking-wider text-muted-foreground bg-surface-muted/70",
    td: "border-b border-border/40 px-2.5 py-1.5 text-xs text-foreground/90 leading-relaxed",
  },
};

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

export function createMarkdownElements(scale = "doc") {
  const s = markdownScales[scale] || markdownScales.doc;
  return {
    p: ({ children, className, ...props }) => (
      <p className={cn(s.p, className)} {...props}>
        {children}
      </p>
    ),
    ul: ({ children, className, ...props }) => (
      <ul className={cn(s.ul, className)} {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, className, ...props }) => (
      <ol className={cn(s.ol, className)} {...props}>
        {children}
      </ol>
    ),
    li: ({ children, className, ...props }) => (
      <li className={cn(s.li, className)} {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, className, ...props }) => (
      <blockquote className={cn(s.blockquote, className)} {...props}>
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => (
      <code className={cn(s.code, className)} {...props}>
        {children}
      </code>
    ),
    strong: ({ children, className, ...props }) => (
      <strong className={cn(s.strong, className)} {...props}>
        {children}
      </strong>
    ),
    em: ({ children, className, ...props }) => (
      <em className={cn(s.em, className)} {...props}>
        {children}
      </em>
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn(s.hr, className)} {...props} />
    ),
    table: ({ children, className, ...props }) => (
      <div className={s.tableWrap}>
        <table className={cn(s.table, className)} {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, className, ...props }) => (
      <th className={cn(s.th, className)} {...props}>
        {children}
      </th>
    ),
    td: ({ children, className, ...props }) => (
      <td className={cn(s.td, className)} {...props}>
        {children}
      </td>
    ),
  };
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
