"use client";

import { Badge } from "@/components/ui/badge";
import { TechPill } from "@/components/TechPill";
import { ExtendedLink } from "@/components/ExtendedLink";
import { cn } from "@/lib/utils";
import {
  IconExternalLink,
  IconBrandGithub,
  IconRocket,
} from "@tabler/icons-react";
import type { ComponentProps, ReactElement } from "react";

// Define explicit prop types for custom MDX components
interface BadgeProps extends ComponentProps<typeof Badge> {
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
}

interface TechPillProps extends ComponentProps<typeof TechPill> {
  name: string;
  size?: "sm" | "md";
}

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
  className?: string;
}

// Type for ExtendedLink to avoid forwardRef inference issues
type ExtendedLinkComponent = (props: {
  href: string;
  children: React.ReactNode;
  newTab?: boolean;
  className?: string;
  [key: string]: any;
}) => ReactElement | null;

// Cast ExtendedLink to avoid forwardRef type issues
const ExtLink = ExtendedLink as unknown as ExtendedLinkComponent;

export const mdxComponents = {
  h1: ({ children, ...props }: ComponentProps<"h1">) => (
    <h1
      className="scroll-m-20 text-3xl font-bold tracking-tight mb-4"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps<"h2">) => (
    <h2
      className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-3"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps<"h3">) => (
    <h3
      className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-2"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: ComponentProps<"h4">) => (
    <h4
      className="scroll-m-20 text-lg font-semibold tracking-tight mt-5 mb-2"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }: ComponentProps<"p">) => (
    <p className="text-muted-foreground leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentProps<"ul">) => (
    <ul
      className="text-muted-foreground mb-4 space-y-2 list-disc pl-6"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentProps<"ol">) => (
    <ol
      className="text-muted-foreground mb-4 space-y-2 list-decimal pl-6"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentProps<"li">) => (
    <li className="text-sm leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-2 border-primary pl-4 italic text-muted-foreground my-6"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: ComponentProps<"code">) => (
    <code
      className="relative rounded bg-surface-high px-1.5 py-0.5 text-xs font-mono text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: ComponentProps<"pre">) => (
    <pre
      className="bg-surface-high border border-border rounded-lg p-4 overflow-x-auto mb-6"
      {...props}
    >
      {children}
    </pre>
  ),
  a: ({ href, children, ...props }: ComponentProps<"a">) => {
    const hrefStr = typeof href === "string" ? href : "";
    const isExternal = hrefStr.startsWith("http");
    return (
      <ExtLink
        href={hrefStr}
        newTab={isExternal}
        className="text-primary underline decoration-primary/40 hover:decoration-primary"
        {...props}
      >
        {children}
      </ExtLink>
    );
  },
  hr: ({ ...props }: ComponentProps<"hr">) => (
    <hr className="border-border my-8" {...props} />
  ),
  strong: ({ children, ...props }: ComponentProps<"strong">) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: ComponentProps<"em">) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className="overflow-x-auto my-6" {...props}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  th: ({ children, ...props }: ComponentProps<"th">) => (
    <th
      className="border border-border p-3 text-left font-semibold bg-surface-high"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: ComponentProps<"td">) => (
    <td className="border border-border p-3 text-sm" {...props}>
      {children}
    </td>
  ),
  Badge: ({
    variant = "outline",
    children,
    className,
    ...props
  }: ComponentProps<typeof Badge>) => (
    <Badge
      variant={variant}
      className={cn("text-[11px]", className)}
      {...props}
    >
      {children}
    </Badge>
  ),
  TechPill: ({
    name,
    size = "sm",
    className,
    ...props
  }: ComponentProps<typeof TechPill>) => (
    <TechPill name={name} size={size} className={className} {...props} />
  ),
  ExternalLink: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    newTab?: boolean;
    className?: string;
  }) => (
    <ExtLink
      href={href}
      newTab
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border border-border/80 bg-surface-high/60 backdrop-blur-sm text-foreground hover:border-primary/50 hover:bg-surface-high hover:text-white hover:shadow-lg hover:shadow-primary/5"
      {...props}
    >
      {children}
      {href.startsWith("http") && (
        <IconExternalLink className="size-3.5 opacity-60" />
      )}
    </ExtLink>
  ),
  GitHubLink: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    newTab?: boolean;
    className?: string;
  }) => (
    <ExtLink
      href={href}
      newTab
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border border-border/80 bg-surface-high/60 backdrop-blur-sm text-foreground hover:border-primary/50 hover:bg-surface-high hover:text-white hover:shadow-lg hover:shadow-primary/5"
      {...props}
    >
      <IconBrandGithub className="size-4" />
      {children}
    </ExtLink>
  ),
  LiveLink: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    newTab?: boolean;
    className?: string;
  }) => (
    <ExtLink
      href={href}
      newTab
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border border-border/80 bg-surface-high/60 backdrop-blur-sm text-foreground hover:border-primary/50 hover:bg-surface-high hover:text-white hover:shadow-lg hover:shadow-primary/5"
      {...props}
    >
      <IconRocket className="size-4 text-primary" />
      {children}
      <IconExternalLink className="size-3.5 opacity-60" />
    </ExtLink>
  ),
};
