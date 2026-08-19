import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded border px-2.5 py-0.5 text-xs font-mono font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        // High-contrast gold highlight badge (e.g., "3.8 GPA", "First Class Honors")
        default:
          "border-yellow-500/30 bg-yellow-500/10 text-yellow-400 [a&]:hover:bg-yellow-500/20 [a&]:hover:border-yellow-500/50",

        // Secondary subtle filled badge
        secondary:
          "border-border/40 bg-muted/60 text-muted-foreground [a&]:hover:bg-muted [a&]:hover:text-foreground",

        // Minimal subtle outline badge (matches the tech tags like "C/C++", "Python", "SQL")
        outline:
          "border-border/60 bg-background/50 text-muted-foreground [a&]:hover:border-border [a&]:hover:text-foreground [a&]:hover:bg-muted/30",

        // Destructive / Alert status badge
        destructive:
          "border-red-500/30 bg-red-500/10 text-red-400 [a&]:hover:bg-red-500/20",

        // Accent badge for primary container elements
        light:
          "border-yellow-500/20 bg-yellow-400/5 text-yellow-300 [a&]:hover:bg-yellow-500/15",

        // Status: Verified / Success (matches the white "Verified" pill with green text/icon)
        lightSuccess:
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-400 [a&]:hover:bg-emerald-500/20 dark:bg-emerald-950/40",

        // Status: Warning
        lightWarning:
          "border-amber-500/20 bg-amber-500/10 text-amber-400 [a&]:hover:bg-amber-500/20",

        // Status: Destructive soft variant
        lightDestructive:
          "border-red-500/20 bg-red-500/10 text-red-400 [a&]:hover:bg-red-500/20",

        // Status: Info / Date tag (matches "Jan 2024", "Aug 2023" tags)
        lightInfo:
          "border-border/40 bg-muted/30 text-muted-foreground/80 font-mono text-[11px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge }