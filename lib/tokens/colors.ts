export const gold = {
  50: "#FEFBE8",
  100: "#FDF5C4",
  200: "#FBE98D",
  300: "#F8DA55",
  400: "#F2CF35",
  500: "#EBC429",
  600: "#C99E15",
  700: "#97760F",
  800: "#6B520C",
  900: "#453508",
  950: "#291F04",
};

export const warmNeutral = {
  cream: "#FDFBF7",
  paper: "#F7F6F3",
  hover: "#F9F9F8",
  line: "#EAEAEA",
  lineStrong: "#E2E2E2",
  slate: "#6E6D69",
  graphite: "#3B3B3B",
  charcoal: "#1A1A1A",
};

export const darkSurface = {
  base: "#141414",
  raised: "#201F1F",
  raisedAlt: "#1C1B1B",
  line: "#494454",
  text: "#F5F5F5",
  textMuted: "#A1A1AA",
};

export const categoryHues = {
  blue: {
    name: "engineering",
    light: { bg: "#E1F3FE", text: "#1F6C9F", solid: "#1F6C9F" },
    dark: { bg: "rgba(31,108,159,0.16)", text: "#8CC6EA", solid: "#1F6C9F" },
  },
  green: {
    name: "data-ai",
    light: { bg: "#EDF3EC", text: "#346538", solid: "#346538" },
    dark: { bg: "rgba(52,101,56,0.16)", text: "#9DC79F", solid: "#346538" },
  },
  rose: {
    name: "automation",
    light: { bg: "#FDEBEC", text: "#9F2F2D", solid: "#9F2F2D" },
    dark: { bg: "rgba(159,47,45,0.16)", text: "#EBA6A4", solid: "#9F2F2D" },
  },
  amber: {
    name: "writing",
    light: { bg: "#FBF3DB", text: "#956400", solid: "#956400" },
    dark: { bg: "rgba(149,100,0,0.16)", text: "#E3C268", solid: "#956400" },
  },
};

export const techStackRail = {
  light: [
    categoryHues.blue.light.bg,
    categoryHues.green.light.bg,
    categoryHues.amber.light.bg,
    categoryHues.rose.light.bg,
    warmNeutral.paper,
  ],
  dark: [
    darkSurface.raisedAlt,
    categoryHues.blue.dark.bg,
    categoryHues.green.dark.bg,
    categoryHues.amber.dark.bg,
    categoryHues.rose.dark.bg,
  ],
};

export const semanticLight = {
  background: warmNeutral.cream,
  foreground: warmNeutral.charcoal,
  surface: "#FFFFFF",
  "surface-hover": warmNeutral.hover,
  "surface-muted": warmNeutral.paper,
  primary: gold[500],
  "primary-foreground": warmNeutral.charcoal,
  "primary-hover": warmNeutral.charcoal,
  secondary: warmNeutral.paper,
  "secondary-foreground": warmNeutral.charcoal,
  muted: warmNeutral.paper,
  "muted-foreground": warmNeutral.slate,
  accent: warmNeutral.graphite,
  "accent-foreground": warmNeutral.cream,
  "accent-hover": warmNeutral.charcoal,
  destructive: "#9F2F2D",
  "destructive-foreground": warmNeutral.cream,
  border: warmNeutral.line,
  "border-strong": warmNeutral.lineStrong,
  input: warmNeutral.line,
  ring: "#D4A800",
  card: "#FFFFFF",
  "card-foreground": warmNeutral.charcoal,
  popover: "#FFFFFF",
  "popover-foreground": warmNeutral.charcoal,
};

export const semanticDark = {
  background: darkSurface.base,
  foreground: darkSurface.text,
  surface: darkSurface.raised,
  "surface-hover": darkSurface.raisedAlt,
  "surface-muted": darkSurface.raisedAlt,
  primary: gold[400],
  "primary-foreground": darkSurface.base,
  "primary-hover": gold[300],
  secondary: darkSurface.raisedAlt,
  "secondary-foreground": darkSurface.text,
  muted: darkSurface.raisedAlt,
  "muted-foreground": darkSurface.textMuted,
  accent: gold[500],
  "accent-foreground": darkSurface.base,
  "accent-hover": gold[400],
  destructive: "#F47272",
  "destructive-foreground": darkSurface.base,
  border: darkSurface.line,
  "border-strong": "#5A5566",
  input: darkSurface.line,
  ring: gold[500],
  card: darkSurface.raised,
  "card-foreground": darkSurface.text,
  popover: darkSurface.raised,
  "popover-foreground": darkSurface.text,
};
