import { Badge } from "@/components/ui/badge";
import { TechPill } from "@/components/TechPill";
import { ExtendedLink } from "@/components/ExtendedLink";
import { cn } from "@/lib/utils";
import {
  IconExternalLink,
  IconBrandGithub,
  IconRocket,
} from "@tabler/icons-react";

export const mdxComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="scroll-m-20 text-3xl font-bold tracking-tight mb-4"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-3"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-2"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="scroll-m-20 text-lg font-semibold tracking-tight mt-5 mb-2"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="text-muted-foreground leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="text-muted-foreground mb-4 space-y-2 list-disc pl-6"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="text-muted-foreground mb-4 space-y-2 list-decimal pl-6"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-sm leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-2 border-primary pl-4 italic text-muted-foreground my-6"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="relative rounded bg-surface-high px-1.5 py-0.5 text-xs font-mono text-foreground"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-surface-high border border-border rounded-lg p-4 overflow-x-auto mb-6"
      {...props}
    >
      {children}
    </pre>
  ),
  a: ({ href, children, ...props }) => {
    const hrefStr = typeof href === "string" ? href : "";
    const isExternal = hrefStr.startsWith("http");
    return (
      <ExtendedLink
        href={hrefStr}
        newTab={isExternal}
        className="text-primary underline decoration-primary/40 hover:decoration-primary"
        {...props}
      >
        {children}
      </ExtendedLink>
    );
  },
  hr: ({ ...props }) => <hr className="border-border my-8" {...props} />,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-border p-3 text-left font-semibold bg-surface-high"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-border p-3 text-sm" {...props}>
      {children}
    </td>
  ),
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
  ExternalLink: ({ href, children, ...props }) => (
    <ExtendedLink
      href={href}
      newTab
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border border-border/80 bg-surface-high/60 backdrop-blur-sm text-foreground hover:border-primary/50 hover:bg-surface-high hover:text-white hover:shadow-lg hover:shadow-primary/5"
      {...props}
    >
      {children}
      {typeof href === "string" && href.startsWith("http") && (
        <IconExternalLink className="size-3.5 opacity-60" />
      )}
    </ExtendedLink>
  ),
  GitHubLink: ({ href, children, ...props }) => (
    <ExtendedLink
      href={href}
      newTab
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border border-border/80 bg-surface-high/60 backdrop-blur-sm text-foreground hover:border-primary/50 hover:bg-surface-high hover:text-white hover:shadow-lg hover:shadow-primary/5"
      {...props}
    >
      <IconBrandGithub className="size-4" />
      {children}
    </ExtendedLink>
  ),
  LiveLink: ({ href, children, ...props }) => (
    <ExtendedLink
      href={href}
      newTab
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border border-border/80 bg-surface-high/60 backdrop-blur-sm text-foreground hover:border-primary/50 hover:bg-surface-high hover:text-white hover:shadow-lg hover:shadow-primary/5"
      {...props}
    >
      <IconRocket className="size-4 text-primary" />
      {children}
      <IconExternalLink className="size-3.5 opacity-60" />
    </ExtendedLink>
  ),
};
