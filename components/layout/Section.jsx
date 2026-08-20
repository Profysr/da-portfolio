import { forwardRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";

/**
 * Section — full-width vertical rhythm wrapper with optional scroll-reveal.
 *
 * The section itself spans full width so you can apply any background to it.
 * Content inside is automatically constrained via <Layout> (max-w-7xl + px).
 * Usage:
 *   // Full-width gradient background, content stays aligned
 *   <Section id="hero" className="bg-gradient-to-br from-slate-900 to-black py-24">
 *     <HeroContent />
 *   </Section>
 *
 *   // Subtle tinted background
 *   <Section id="about" className="bg-muted/20 py-20">
 *     <AboutContent />
 *   </Section>
 */
export const Section = forwardRef(function Section(
  {
    className,
    innerClassName,
    id,
    delay = 0,
    yOffset = 8,
    noFade = false,
    children,
    ...props
  },
  ref
) {
  const base = "w-full py-12 sm:py-18";

  const content = (
    <section ref={ref} id={id} className={cn(base, className)} {...props}>
      <Layout className={innerClassName}>
        {children}
      </Layout>
    </section>
  );

  if (noFade) return content;

  return (
    <BlurFade
      delay={delay}
      offset={yOffset}
      inView
      inViewMargin="-80px"
    >
      {content}
    </BlurFade>
  );
});