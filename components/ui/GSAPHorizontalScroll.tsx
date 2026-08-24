"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPHorizontalScrollProps {
  items?: React.ReactNode[];
  children?: React.ReactNode;
  itemWidth?: number;
  gap?: number;
  start?: string;
  distanceMultiplier?: number;
  end?: string | number;
  scrub?: boolean | number;
  pin?: boolean;
  showScrollbar?: boolean;
  ariaLabel?: string;
  className?: string;
  trackClassName?: string;
  trackRef?: React.RefObject<HTMLDivElement | null>;
  velocitySkew?: boolean;
  maxSkew?: number;
  onTweenReady?: (tween: gsap.core.Tween) => void;
  // NEW: Allow static content to live inside the pinned wrapper
  topContent?: React.ReactNode; 
}

export function GSAPHorizontalScroll({
  items,
  children,
  itemWidth,
  gap = 24,
  start = "top top",
  distanceMultiplier = 1,
  end,
  scrub = 1,
  pin = true,
  showScrollbar = false,
  ariaLabel = "Horizontal content rail",
  className,
  trackClassName,
  trackRef,
  velocitySkew = true,
  maxSkew = 6,
  onTweenReady,
  topContent,
}: GSAPHorizontalScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const internalTrackRef = useRef<HTMLDivElement>(null);
  const finalTrackRef = (trackRef ?? internalTrackRef) as React.RefObject<HTMLDivElement>;
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const wrapper = wrapperRef.current;
    const track = finalTrackRef.current;
    if (!wrapper || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      wrapper.style.overflowX = "auto";
      wrapper.tabIndex = 0;
      return;
    }

    wrapper.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(0, track.scrollWidth - wrapper.clientWidth);

      const skewTo = velocitySkew
        ? gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3" })
        : null;

      let resetTimer: gsap.core.Tween | null = null;
      const scheduleReset = () => {
        if (!skewTo) return;
        resetTimer?.kill();
        resetTimer = gsap.delayedCall(0.15, () => skewTo(0));
      };

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start,
          end: end ?? (() => `+=${getDistance() * distanceMultiplier}`),
          scrub,
          pin,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (skewTo) {
              const rawVelocity = self.getVelocity();
              const normalized = gsap.utils.clamp(-maxSkew, maxSkew, -(rawVelocity / 300));
              skewTo(normalized);
              scheduleReset();
            }
          },
        },
      });

      onTweenReady?.(tween);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, wrapper);

    return () => {
      ctx.revert();
      wrapper.style.overflow = "";
    };
  }, [
    start,
    end,
    distanceMultiplier,
    scrub,
    pin,
    finalTrackRef,
    velocitySkew,
    maxSkew,
    onTweenReady,
  ]);

  const renderItems = () => {
    if (children) return children;
    if (!items?.length) return null;
    return items.map((node, i) => (
      <div key={i} className="shrink-0" style={itemWidth ? { width: itemWidth, flexShrink: 0 } : undefined}>
        {node}
      </div>
    ));
  };

  return (
    <div
      ref={wrapperRef}
      role="region"
      aria-label={ariaLabel}
      className={cn("relative overflow-hidden w-full", className)}
    >
      {/* NEW: Render static pinned content here */}
      {topContent} 
      
      <div
        ref={finalTrackRef}
        className={cn("flex will-change-transform", trackClassName)}
        style={{
          ...(gap ? { gap: `${gap}px` } : undefined),
          transformOrigin: "center center",
        }}
      >
        {renderItems()}
      </div>

      {showScrollbar && (
        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-1 mt-4 rounded-full bg-border overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-accent origin-left"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>
      )}
    </div>
  );
}

interface GSAPHorizontalCardProps {
  children: React.ReactNode;
  className?: string;
  width?: number;
}

export function GSAPHorizontalCard({
  children,
  className,
  width,
}: GSAPHorizontalCardProps) {
  return (
    <div
      className={cn("shrink-0", className)}
      style={width ? { width, flexShrink: 0 } : undefined}
    >
      {children}
    </div>
  );
}
