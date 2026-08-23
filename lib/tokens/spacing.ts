export const radius = {
  sm: "3px",
  DEFAULT: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  full: "9999px",
};

export const spacing = {
  section: "clamp(4rem, 7vw, 5rem)",
  sectionTight: "clamp(3rem, 5vw, 4rem)",
  overlap: "-3rem",
  overlapLg: "-4rem",
  gapComponent: "1.25rem",
  gapSectionInner: "2.5rem",
  gutter: "clamp(1rem, 3vw, 2rem)",
};

export const shadows = {
  e1: "0 1px 2px rgba(26,22,10,0.06)",
  e2: "0 4px 12px rgba(26,22,10,0.08)",
  e3: "0 8px 24px rgba(26,22,10,0.10)",
  e4: "0 16px 48px rgba(26,22,10,0.12)",
  e5: "0 24px 64px rgba(26,22,10,0.14)",
  insetHighlight:
    "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(26,22,10,0.04)",
  dark: {
    e1: "0 1px 2px rgba(0,0,0,0.35)",
    e2: "0 4px 12px rgba(0,0,0,0.40)",
    e3: "0 8px 24px rgba(0,0,0,0.45)",
    e4: "0 16px 48px rgba(0,0,0,0.50)",
    e5: "0 24px 64px rgba(0,0,0,0.55)",
    insetHighlight:
      "inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 1px rgba(0,0,0,0.30)",
  },
};

export const motion = {
  duration: {
    instant: "150ms",
    fast: "250ms",
    base: "400ms",
    slow: "700ms",
    cinematic: "1000ms",
  },
  easing: {
    outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
    smooth: "cubic-bezier(0.32, 0.72, 0, 1)",
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  stagger: {
    micro: 60,
    base: 80,
    drama: 120,
  },
};

export const spotlight = {
  size: "180px",
  blur: "40px",
  borderSize: "1px",
  opacity: 0.14,
};
