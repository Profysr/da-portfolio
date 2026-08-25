import { cn } from "@/lib/utils";

/**
 * Layout — inner content constrainer.
 *
 * Provides tight, modern responsive horizontal padding (reduced side gutters)
 * and a centered max-width column.
 */
export function Layout({ children, className = "" }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-4 md:px-6",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Layout;