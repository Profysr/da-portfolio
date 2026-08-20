"use client";

import React from "react";
const lazy = (importFn) => React.lazy(() => importFn());

// export const LazyGlobe = lazy(() =>
//   import("@/components/ui/globe").then((m) => ({ default: m.Globe })),
// );
// export const LazyDottedMap = lazy(() =>
//   import("@/components/ui/dotted-map").then((m) => ({ default: m.DottedMap })),
// );
export const LazyLightRays = lazy(() =>
  import("@/components/ui/light-rays").then((m) => ({ default: m.LightRays })),
);
export const LazyParticles = lazy(() =>
  import("@/components/ui/particles").then((m) => ({ default: m.Particles })),
);
export const LazyAnimatedBeam = lazy(() =>
  import("@/components/ui/animated-beam").then((m) => ({ default: m.AnimatedBeam })),
);
export const LazyNumberTicker = lazy(() =>
  import("@/components/ui/number-ticker").then((m) => ({ default: m.NumberTicker })),
);
export const LazyAnimatedShinyText = lazy(() =>
  import("@/components/ui/animated-shiny-text").then((m) => ({
    default: m.AnimatedShinyText,
  })),
);