"use client";

import { useState, Children, isValidElement } from "react";
import Link from "next/link";
import { IconArrowUpRight, IconFolder, IconFile } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

/**
 * Steps & Step: Sequential tutorial / installation guides
 */
export function Steps({ children, className }) {
  return (
    <div
      className={cn(
        "my-6 ml-4 border-l border-border/80 pl-6 [counter-reset:step] space-y-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Step({ title, children, className }) {
  return (
    <div className={cn("relative [counter-increment:step]", className)}>
      {/* Number Badge */}
      <span className="absolute -left-[37px] flex size-7 items-center justify-center rounded-full border border-border/80 bg-surface text-xs font-mono font-bold text-primary shadow-sm">
        <span className="before:content-[counter(step)]" />
      </span>

      {title && (
        <h4 className="font-semibold text-base text-foreground mb-2 mt-0">
          {title}
        </h4>
      )}

      <div className="text-sm text-muted-foreground leading-relaxed space-y-3 [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

/**
 * MDX Tabs & Tab
 */
export function MDXTabs({ items = [], children, defaultIndex = 0 }) {
  const childArray = Children.toArray(children).filter(isValidElement);
  const tabTitles =
    items.length > 0
      ? items
      : childArray.map((child, i) => child.props.title || `Tab ${i + 1}`);

  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="my-6 rounded-xl border border-border/80 bg-surface/50 overflow-hidden shadow-sm">
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border/60 bg-surface-muted/60 px-3 pt-2">
        {tabTitles.map((title, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "px-3.5 py-1.5 text-xs font-medium rounded-t-lg transition-all border-b-2 cursor-pointer",
                isActive
                  ? "border-primary text-foreground bg-surface font-semibold shadow-xs"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-surface-hover/50"
              )}
            >
              {title}
            </button>
          );
        })}
      </div>

      <div className="p-4">
        {childArray[activeIndex] || childArray[0]}
      </div>
    </div>
  );
}

export function MDXTab({ children, className }) {
  return <div className={cn("text-sm", className)}>{children}</div>;
}

/**
 * Cards & Card: Grid of documentation link cards
 */
export function Cards({ children, cols = 2, className }) {
  const colClass =
    cols === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      : cols === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2";

  return <div className={cn("my-6 grid gap-4", colClass, className)}>{children}</div>;
}

export function DocCard({
  title,
  description,
  href,
  icon: Icon,
  children,
  className,
}) {
  const content = (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border/80 bg-surface/60 p-5 transition-all duration-200 hover:border-primary/50 hover:bg-surface-hover/80 hover:shadow-md",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          {Icon && (
            <div className="flex size-8 items-center justify-center rounded-lg border border-border/60 bg-surface-muted text-primary">
              <Icon className="size-4" />
            </div>
          )}
          {href && (
            <IconArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
          )}
        </div>

        {title && (
          <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors m-0 mb-1">
            {title}
          </h4>
        )}

        {description && (
          <p className="text-xs text-muted-foreground leading-relaxed m-0">
            {description}
          </p>
        )}

        {children}
      </div>
    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="no-underline block"
      >
        {content}
      </Link>
    );
  }

  return content;
}

/**
 * Keyboard key badge
 */
export function Kbd({ children, className }) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded border border-border bg-surface-muted px-1.5 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground shadow-xs",
        className
      )}
    >
      {children}
    </kbd>
  );
}

/**
 * FileTree representation
 */
export function FileTree({ children, className }) {
  return (
    <div
      className={cn(
        "my-6 rounded-xl border border-border/80 bg-surface/60 p-4 font-mono text-xs text-muted-foreground",
        className
      )}
    >
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

export function TreeItem({ name, isFolder = false, children, className }) {
  const Icon = isFolder ? IconFolder : IconFile;

  return (
    <div className={cn("pl-4 border-l border-border/50 space-y-1.5", className)}>
      <div className="flex items-center gap-2 text-foreground font-medium">
        <Icon className="size-3.5 text-primary" />
        <span>{name}</span>
      </div>
      {children}
    </div>
  );
}
