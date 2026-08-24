"use client";

import React, { useRef } from "react";
import { gsap, useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

/**
 * StackedCards — sticky card deck with scrubbed scale-down handoff.
 *
 * Each card sticks at a staggered top offset (deck fan). As the next card
 * travels up to cover the current one, the current card scales down to
 * 0.92 / opacity 0.55 — fully reversible (scrub is bidirectional).
 *
 * Reduced-motion: useGSAP early-returns → cards remain in plain sticky
 * stack (position-based layout, no animation).
 */
export function StackedCards({
  items,
  className,
  cardClassName,
  topOffset = 96,
  stackStep = 14,
}) {
  const scopeRef = useRef(null);

  useGSAP(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    const cards = gsap.utils.toArray(".stack-card", scope);

    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.92,
        opacity: 0.55,
        transformOrigin: "center top",
        ease: "none",
        scrollTrigger: {
          trigger: next,
          start: "top bottom",
          end: "top top+=120",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div ref={scopeRef} className={cn("flex flex-col gap-6", className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn("stack-card sticky", cardClassName)}
          style={{ top: `${topOffset + i * stackStep}px` }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default StackedCards;
