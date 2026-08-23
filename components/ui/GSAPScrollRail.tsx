"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TimelineCard {
  id: string | number;
  title: string;
  date: string;
  description: string;
  tag?: string;
}

interface GSAPTimelineRailProps {
  items: TimelineCard[];
  className?: string;
}

export function GSAPTimelineRail({ items, className }: GSAPTimelineRailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !fillLineRef.current || !items.length) return;

    const container = containerRef.current; // Creates a stable non-null reference
    const fillLine = fillLineRef.current;

    const ctx = gsap.context(() => {
      // 1. Scrub the vertical fill line
      gsap.fromTo(
        fillLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        },
      );

      // 2. Animate nodes inside container
      const nodes = container.querySelectorAll<HTMLDivElement>(
        "[data-timeline-node]",
      );

      nodes.forEach((node) => {
        const dot = node.querySelector("[data-timeline-dot]");
        const card = node.querySelector("[data-timeline-card]");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: node,
            start: "top 65%",
            toggleActions: "play reverse play reverse",
          },
        });

        tl.to(
          dot,
          {
            backgroundColor: "var(--primary)",
            borderColor: "var(--primary)",
            boxShadow: "0 0 12px var(--primary)",
            scale: 1.25,
            duration: 0.25,
            ease: "power2.out",
          },
          0,
        ).to(
          card,
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          },
          0.05,
        );
      });
    }, container); // Pass non-null local variable 'container'

    return () => ctx.revert();  
  }, [items]);

  return (
    <div
      ref={containerRef}
      className={cn("relative max-w-4xl mx-auto py-12 px-4", className)}
    >
      {/* Background Track Line */}
      <div
        className="absolute left-6 md:left-1/2 top-12 bottom-12 w-0.5 bg-border -translate-x-1/2"
        aria-hidden
      />

      {/* Animated Fill Line */}
      <div
        ref={fillLineRef}
        className="absolute left-6 md:left-1/2 top-12 bottom-12 w-0.5 bg-primary -translate-x-1/2 origin-top"
        aria-hidden
      />

      {/* Timeline Items */}
      <div className="space-y-12">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.id}
              data-timeline-node
              className={cn(
                "relative flex items-center flex-col md:flex-row",
                isEven ? "md:flex-row-reverse" : "",
              )}
            >
              {/* Timeline Dot */}
              <div
                data-timeline-dot
                className="absolute left-6 md:left-1/2 top-6 z-10 size-4 -translate-x-1/2 rounded-full border-2 border-border bg-background transition-colors origin-center"
              />

              {/* Card Container */}
              <div
                className={cn(
                  "w-full pl-14 md:pl-0 md:w-[calc(50%-2.5rem)]",
                  isEven ? "md:text-right" : "md:text-left",
                )}
              >
                <div
                  data-timeline-card
                  className="rounded-xl border border-border bg-card p-6 shadow-sm opacity-0 translate-y-6"
                >
                  <div
                    className={cn(
                      "flex items-center gap-2 mb-2",
                      isEven ? "md:justify-end" : "md:justify-start",
                    )}
                  >
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.date}
                    </span>
                    {item.tag && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
