import { cn } from "@/lib/utils";

/**
 * PageWrapper — full-width outer container with a max-width inner column.
 *
 * Usage:
 *   <PageWrapper>
 *     <Section>…</Section>
 *     <Section>…</Section>
 *   </PageWrapper>
 */
export function PageWrapper({ children, className }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}