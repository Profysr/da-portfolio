import { cn } from "@/lib/utils";

export function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-muted", className)}
    />
  );
}

export const SkeletonShapes = {
  card: () => <Skeleton className="rounded-lg border border-border bg-muted h-64 w-full" />,
  cardCompact: () => <Skeleton className="rounded-lg border border-border bg-muted h-40 w-full" />,
  techCard: () => <Skeleton className="rounded-lg border border-border bg-muted h-48 w-72 shrink-0" />,
  chatDrawer: () => (
    <div className="flex flex-col h-[90dvh] w-full max-w-3xl">
      <Skeleton className="h-16 w-48 rounded-md bg-muted" />
      <Skeleton className="flex-1 h-8 w-full bg-muted/50" />
      <Skeleton className="h-12 w-3/4 bg-muted" />
    </div>
  ),
  commandPalette: () => (
    <div className="rounded-lg border border-border bg-card p-4 w-96">
      <Skeleton className="h-8 w-24 rounded-md bg-muted mb-4" />
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md bg-muted" />
        ))}
      </div>
    </div>
  ),
  heatmap: () => (
    <div className="grid grid-cols-52 gap-1" aria-hidden="true">
      {[...Array(52 * 7)].map((_, i) => (
        <Skeleton key={i} className="size-3 rounded-[2px] bg-muted" />
      ))}
    </div>
  ),
  mapModal: () => (
    <div className="fixed inset-0 flex items-center justify-center z-50" aria-hidden="true">
      <div className="bg-card rounded-xl border border-border p-6 w-96 h-80">
        <Skeleton className="h-full w-full rounded-lg bg-muted" />
      </div>
    </div>
  ),
  section: () => <Skeleton className="h-32 w-full bg-muted/50 rounded-lg" />,
};