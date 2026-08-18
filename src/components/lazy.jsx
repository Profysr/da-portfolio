"use client";

import React from "react";

const lazy = (importFn) => React.lazy(() => importFn());

export const LazyGlobe = lazy(() => import("@/components/ui/globe"));
export const LazyLightRays = lazy(() => import("@/components/ui/light-rays"));
export const LazyParticles = lazy(() => import("@/components/ui/particles"));
export const LazyDottedMap = lazy(() => import("@/components/ui/dotted-map"));
export const LazyAnimatedBeam = lazy(() => import("@/components/ui/animated-beam"));
export const LazyNumberTicker = lazy(() => import("@/components/ui/number-ticker"));
export const LazyAnimatedShinyText = lazy(() =>
  import("@/components/ui/animated-shiny-text"),
);