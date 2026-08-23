import { semanticLight, semanticDark } from "./colors";
import { radius, shadows, motion, spotlight, spacing } from "./spacing";
import { fontFamily } from "./typography";

type SemanticTokenMap = Record<string, string>;

const toCssVars = (map: SemanticTokenMap, indent = "  ") =>
  Object.entries(map)
    .map(([k, v]) => `${indent}--${k}: ${v};`)
    .join("\n");

export const shadcnNamespaces = {
  color: [
    "background",
    "foreground",
    "surface",
    "surface-hover",
    "surface-muted",
    "primary",
    "primary-foreground",
    "primary-hover",
    "secondary",
    "secondary-foreground",
    "muted",
    "muted-foreground",
    "accent",
    "accent-foreground",
    "accent-hover",
    "destructive",
    "destructive-foreground",
    "border",
    "border-strong",
    "input",
    "ring",
    "card",
    "card-foreground",
    "popover",
    "popover-foreground",
  ],
};

export const themeInlineMapping = {
  colors: shadcnNamespaces.color.reduce<Record<string, string>>((acc, name) => {
    acc[`--color-${name}`] = `var(--${name})`;
    return acc;
  }, {}),
  radius: {
    "--radius-sm": radius.sm,
    "--radius": radius.DEFAULT,
    "--radius-md": radius.md,
    "--radius-lg": radius.lg,
    "--radius-xl": radius.xl,
  },
  fonts: {
    "--font-sans": fontFamily.sans,
    "--font-mono": fontFamily.mono,
  },
  shadows: {
    "--shadow-e1": shadows.e1,
    "--shadow-e2": shadows.e2,
    "--shadow-e3": shadows.e3,
    "--shadow-e4": shadows.e4,
    "--shadow-e5": shadows.e5,
    "--shadow-inset-highlight": shadows.insetHighlight,
  },
  easing: {
    "--ease-out-expo": motion.easing.outExpo,
    "--ease-smooth": motion.easing.smooth,
    "--ease-in-out-tokens": motion.easing.inOut,
    "--ease-spring": motion.easing.spring,
  },
  spotlight: {
    "--spotlight-size": spotlight.size,
    "--spotlight-blur": spotlight.blur,
    "--spotlight-opacity": String(spotlight.opacity),
  },
  section: {
    "--spacing-section": spacing.section,
    "--spacing-section-tight": spacing.sectionTight,
    "--spacing-gutter": spacing.gutter,
  },
};

export function generateThemeBlock(): string {
  const m = themeInlineMapping;
  return `@theme inline {
${Object.entries(m.colors)
  .map(([k, v]) => `  ${k}: ${v};`)
  .join("\n")}
${Object.entries(m.radius)
  .map(([k, v]) => `  ${k}: ${v};`)
  .join("\n")}
${Object.entries(m.fonts)
  .map(([k, v]) => `  ${k}: ${v};`)
  .join("\n")}
${Object.entries({ ...m.shadows, ...m.easing, ...m.spotlight, ...m.section })
  .map(([k, v]) => `  ${k}: ${v};`)
  .join("\n")}
}`;
}

export function generateSemanticBlocks(): string {
  return `:root {\n${toCssVars(semanticLight)}\n}\n\n.dark {\n${toCssVars(
    semanticDark
  )}\n}`;
}

export const darkVariantDirective =
  "@custom-variant dark (&:where(.dark, .dark *));";
