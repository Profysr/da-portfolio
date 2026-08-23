import { forwardRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/layout/Layout";

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