"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { IconSparkles } from "@tabler/icons-react";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import { GSAPHorizontalScroll } from "@/components/ui/GSAPHorizontalScroll";
import { SkillsAndTools } from "@/data/idx";
import { TechPill } from "@/components/common/TechPill";
import { cn } from "@/lib/utils";

function TechStack() {
  const tweenRef = useRef(null);

  return (
    <Section id="stack" noFade className="p-0! bg-surface">
      <GSAPHorizontalScroll
        ariaLabel="Technology stack categories"
        start="top top"
        distanceMultiplier={1.05}
        scrub={1}
        pin
        showScrollbar={false}
        velocitySkew={true}
        maxSkew={2}
        gap={48}
        className="w-full h-[75vh] min-h-150 flex flex-col justify-center"
        trackClassName="items-start mt-40 sm:mt-48"
        topContent={
          <div className="absolute top-8 sm:top-12 left-0 w-full flex flex-col items-center text-center gap-2.5 z-10 px-6">
            <Badge
              variant="outline"
              className="tracking-[0.2em] text-[10px] bg-surface text-foreground border-border uppercase shadow-xs px-3 py-1 font-mono"
            >
              Arsenal & Tools
            </Badge>
            <Heading
              variant="gradient"
              text="Technologies & Stack"
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
            />
            <p className="text-xs sm:text-sm text-muted-foreground max-w-lg font-normal leading-relaxed">
              Production tools, runtimes, and agentic orchestration frameworks I
              use to build scalable systems.
            </p>
          </div>
        }
        onTweenReady={(tween) => {
          tweenRef.current = tween;
          const groups = gsap.utils.toArray(".stack-cluster");

          groups.forEach((el) => {
            const pills = el.querySelectorAll(".stack-pill");
            gsap.set(pills, { opacity: 0, x: 16, scale: 0.96 });
            gsap.to(pills, {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.03,
              scrollTrigger: {
                containerAnimation: tween,
                trigger: el,
                start: "left 85%",
                end: "left 45%",
                scrub: false,
                toggleActions: "play none none reverse",
              },
            });
          });
        }}
      >
        {/* Leading spacer gives the first card left breathing room */}
        <div className="w-[8vw] sm:w-[12vw] shrink-0" />

        {SkillsAndTools.map((group, idx) => {
          const Icon = group.Icon ?? IconSparkles;

          return (
            <div
              key={group.category}
              className={cn(
                "stack-cluster shrink-0 flex flex-col justify-start",
                "w-[75vw] sm:w-125 max-w-lg",
              )}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={[
                    "flex items-center justify-center size-11 rounded-md border shadow-xs shrink-0 transition-transform duration-300 hover:scale-105",
                    group.shade ?? "shade-card-canvas",
                  ].join(" ")}
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <div>
                  <span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-0.5">
                    {String(idx + 1).padStart(2, "0")} /{" "}
                    {String(SkillsAndTools.length).padStart(2, "0")}
                  </span>
                  <h4 className="text-2xl font-semibold tracking-tight text-foreground">
                    {group.category}
                  </h4>
                </div>
              </div>

              {/* Minimal Accent Divider */}
              <div className="h-px w-20 bg-border-strong mb-5" />

              {/* Interactive Pills */}
              <div className="flex flex-wrap gap-2.5 w-full">
                {group.items.map((item) => (
                  <div key={item.name} className="stack-pill">
                    <TechPill
                      name={item.name}
                      subCategory={item.subCategory ?? undefined}
                      size="xl"
                      className={cn(
                        "transition-all duration-300 ease-out",
                        "bg-surface text-foreground hover:bg-surface-hover",
                        "border border-border hover:border-border-strong",
                        "shadow-xs hover:shadow-e2 hover:-translate-y-0.5",
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Trailing spacer */}
        <div className="w-[12vw] shrink-0" />
      </GSAPHorizontalScroll>
    </Section>
  );
}

export default TechStack;
