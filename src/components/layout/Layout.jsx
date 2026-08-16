import { cn } from "@/lib/utils";

/**
 * Layout — inner content constrainer.
 *
 * Provides responsive horizontal padding and a centered max-width column.
 * Use this INSIDE a section, not as the outer page wrapper, so the section
 * itself can span full-width (enabling full-bleed backgrounds).
 *
 * Usage:
 *   <section className="bg-gradient-to-br from-slate-900 to-black">
 *     <Layout>
 *       <HeroContent />
 *     </Layout>
 *   </section>
 */
export function Layout({ children, className = "" }) {
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