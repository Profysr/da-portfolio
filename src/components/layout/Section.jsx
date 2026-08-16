import { forwardRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

/**
 * Section — vertical rhythm wrapper with optional scroll-reveal.
 *
 * @param {string}   className   — extra classes
 * @param {string}   id          — anchor id for in-page nav / command palette
 * @param {number}   delay       — BlurFade delay (seconds)
 * @param {number}   yOffset     — BlurFade vertical offset (px)
 * @param {boolean}  noFade      — skip BlurFade, render plain <section>
 * @param {ReactNode} children
 */
export const Section = forwardRef(function Section(
  {
    className,
    id,
    delay = 0,
    yOffset = 8,
    noFade = false,
    children,
    ...props
  },
  ref
) {
  const base = "py-20 sm:py-24 lg:py-28";

  if (noFade) {
    return (
      <section ref={ref} id={id} className={cn(base, className)} {...props}>
        {children}
      </section>
    );
  }

  return (
    <BlurFade
      delay={delay}
      offset={yOffset}
      className={cn(base, className)}
      inView
      inViewMargin="-80px"
    >
      <section ref={ref} id={id} {...props}>
        {children}
      </section>
    </BlurFade>
  );
});