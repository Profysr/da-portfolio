# CODEGUIDE.md — DA Portfolio Project

## Project Overview

Portfolio website for **DA (Data Analyst / Agency)**. Built with **React 19 + Vite 8 + Tailwind CSS 4 + shadcn/ui (Base Nova style)**. Single-page application with "Dark Cinematic/Ethereal Professional" aesthetic drawn from DESIGN.md in `src/stitch/`.

---

## Technology Stack

| Tool | Version | Role |
|---|---|---|
| React | 19.2.8 | UI framework |
| Vite | 8.2.0 | Build tool & dev server |
| Tailwind CSS | 4.3.3 | Styling (via `@tailwindcss/vite`) |
| shadcn/ui | 4.18.0 | Component primitives (Base Nova style) |
| Framer Motion / Motion | 13.1.0 | Scroll-triggered & micro-interactions |
| cobe | 0.6.5 | Interactive 3D globe |
| rough-notation | 0.5.1 | Hand-drawn style highlight annotations |
| svg-dotted-map | 2.0.1 | Dot-map world background |
| @tabler/icons-react | 3.0.0 | Icon library (all UI icons) |
| lucide-react | 1.31.0 | ~~Legacy icon lib, removed~~ |
| class-variance-authority | 0.7.1 | Component variant logic |
| Geist Variable (font) | 5.3.0 | Primary typeface |
| tw-animate-css | 1.4.0 | Preset animation utilities |

---

## File Tree & Descriptions

```
├── index.html                        # Vite entry HTML — mounts #root
├── package.json                      # Dependencies & scripts (dev/build/lint/preview)
├── components.json                   # shadcn config — style: base-nova (icon lib noted as lucide, but all icons use @tabler/icons-react in code)
├── vite.config.ts                    # Vite + React + Tailwind plugin config
├── tsconfig.json / tsconfig.app.json  # TypeScript strictness config
├── eslint.config.js                   # Flat ESLint config
│
├── src/
│   ├── main.tsx                       # App bootstrap — renders <App /> into #root
│   ├── App.tsx                        # App shell — SmoothCursor + Dock nav bar, placeholder for sections
│   ├── index.css                      # Tailwind directives, shadcn theme tokens (dark cinematic), font imports, keyframe animations
│   │
│   ├── lib/
│   │   └── utils.ts                   # `cn()` helper — clsx + tailwind-merge (used everywhere)
│   │
│   ├── assets/
│   │   ├── hero.png                   # Placeholder hero image
│   │   ├── react.svg                  # React logo (boilerplate)
│   │   └── vite.svg                   # Vite logo (boilerplate)
│   │
│   ├── data/
│   │   └── idx.js                     # ⚠️  EMPTY — Single Source of Truth (to be filled)
│   │
│   ├── components/
│   │   ├── ui/                        # ⛔ DO NOT ADD FOLDERS HERE — only component .tsx files
│   │   │   ├── Heading.tsx            # Large display text with radial gradient bg
│   │   │   ├── button.tsx             # Button primitive — built on @base-ui/react, supports variant/size
│   │   │   ├── card.tsx               # Card surface + CardHeader/Title/Description/Content/Footer
│   │   │   ├── badge.tsx              # Pill/badge labels with variant styling
│   │   │   ├── dock.tsx + DockIcon    # Mac-style magnifying dock bar (motion-driven)
│   │   │   ├── globe.tsx              # Interactive COBE 3D WebGL globe
│   │   │   ├── dotted-map.tsx         # SVG dotted world map with marker support
│   │   │   ├── bento-grid.tsx         # BentoGrid + BentoCard (Apple-style card layout)
│   │   │   ├── border-beam.tsx        # Animated gradient border beam around an element
│   │   │   ├── animated-beam.tsx      # Curved SVG connector beam between two elements
│   │   │   ├── tracing-beam.tsx       # Vertical scroll-linked beam path (timeline feel)
│   │   │   ├── marquee.tsx            # Infinite horizontal/vertical scroll ticker
│   │   │   ├── shiny-button.tsx       # Animated shimmer sweep button
│   │   │   ├── animated-shiny-text.tsx # Text with repeating shimmer sweep
│   │   │   ├── aurora-text.tsx        # Text with animated aurora gradient fill
│   │   │   ├── kinetic-text.tsx       # Per-letter hover reactive text (stroke weight effect)
│   │   │   ├── animated-name.tsx      # Animated name reveal — "Shiv" + "y/am" swap cycle
│   │   │   ├── blur-fade.tsx          # Scroll-blur-reveal wrapper (up/down/left/right)
│   │   │   ├── number-ticker.tsx      # Animated counting number on scroll-into-view
│   │   │   ├── animated-circular-progress-bar.tsx # SVG ring progress gauge
│   │   │   ├── highlighter.tsx        # rough-notation highlight/underline/circle annotation
│   │   │   ├── ripple.tsx             # Concentric expanding ripple circles effect
│   │   │   ├── particles.tsx          # Canvas-drawn mouse-reactive particle field
│   │   │   ├── background-gradient.tsx # Animated multi-color radial gradient bg wrapper
│   │   │   ├── spotlight.tsx          # SVG radial gradient spotlight (mouse follow)
│   │   │   ├── spotlight-glow.tsx     # CSS radial gradient glow following pointer
│   │   │   ├── smooth-cursor.tsx      # Physics-driven custom cursor arrow (emoji-compatible)
│   │   │   ├── custom-cursor.tsx      # Emoji cursor that reacts to velocity & direction
│   │   │   ├── interfacecraftcards.tsx # 3D carousel cards (Knowledge → Interface Kit)
│   │   │   ├── terminal.tsx           # Terminal window with typing animation + sequence mode
│   │   │   │                           #   Sub-components: Terminal, AnimatedSpan, TypingAnimation
│   │   │   ├── tooltip.tsx            # Radix Tooltip + Provider/Trigger/Content
│   │   │   └── transition-link.tsx    # NOTE: imports from next-view-transitions — not usable in Vite
│   │   │
│   │   └── command-palette/
│   │       ├── command-palette.tsx    # ⌘K command palette (uses cmdk, next-view-transitions)
│   │       └── command-palette-button.tsx # Trigger button for palette
│   │
│   └── stitch/                        # Design reference only — do not move or copy
│       ├── DESIGN.md                  # Full design system: colors, typography, spacing, components spec
│       └── code.html                  # WebGL shader background (inspiration reference)
│       └── code (2).html
```

---

## UI Component Quick Reference

### Surface / Layout
| Component | Use For |
|---|---|
| `Card`, `CardHeader`, `CardContent`, `CardFooter` | Any content card; experience items, project cards |
| `BentoGrid` + `BentoCard` | Apple-style grid layout; capabilities, showcase cards |
| `Dock` + `DockIcon` | Bottom floating nav dock or social icon bar |

### Buttons / Interactive
| Component | Use For |
|---|---|
| `Button` (variant: default/outline/ghost/size) | All CTAs, links, actions |
| `ShinyButton` | Hero primary CTA with shimmer sweep |
| `Badge` | Skill tags, category labels |

### Typography / Text Effects
| Component | Use For |
|---|---|
| `Heading` | Section headers with dramatic reveal + radial bg |
| `KineticText` | Interactive hover-reactive hero/headline text |
| `AnimatedName` | Animated name cycling suffix (y/am) |
| `AuroraText` | Gradient-animated accent text |
| `AnimatedShinyText` | Subtle shimmer on supporting text |
| `NumberTicker` | Animated stats (commits, projects, etc.) |

### Visual Effects / Backgrounds
| Component | Use For |
|---|---|
| `BorderBeam` | Animated scanning light on card borders |
| `Spotlight` + `SpotlightGlow` | Cursor-follow radial glow on sections/cards |
| `BackgroundGradient` | Animated multi-color gradient background |
| `Ripple` | Pulse/ripple background decoration |
| `Particles` | Subtle particle canvas background |
| `Globe` | World/global presence presence element (about section) |
| `DottedMap` | GitHub activity-style dot map |
| `SmoothCursor` | Global custom cursor (desktop only) |
| `CustomCursor` | Emoji velocity-reactive cursor |
| `BlurFade` | Scroll-triggered blur/translate reveal wrapper |

### Timeline / Flow
| Component | Use For |
|---|---|
| `TracingBeam` | Vertical scroll timeline — experience, education |
| `AnimatedBeam` | Curved connector lines between paired elements |
| `Marquee` | Tech stack scroll or logo carousel |

### Animations / Feedback
| Component | Use For |
|---|---|
| `Highlighter` | Hand-drawn underline/highlight on key text |
| `Terminal` + `TypingAnimation` | Code/terminal demos in hero or project cards |

### Overlay / Navigation
| Component | Use For |
|---|---|
| `Tooltip` | Hover tooltips on cards/buttons |
| `Dock` | Bottom nav bar |
| `CommandPalette` + `CommandPaletteButton` | ⌘K quick navigation (refactor needed — cmdk not installed) |

---

## Design System (from DESIGN.md)

### Colors
- Background: `#131313` (surface), `#0e0e0e` (lowest), `#1c1b1b` (low)
- Primary accent: Electric Violet `#d0bcff`
- Text Primary: `#e5e2e1`
- Text Variant: `#cbc3d7`
- Outline: `#958ea0`
- Glassmorphism: `rgba(255,255,255,0.03)` fill + `12-20px` backdrop-blur
- Gradient bg: `radial-gradient(circle at 50% 200%, rgba(0,0,0,0.2), rgba(255,255,255,0))`

### Typography
- Display: Geist, 72px, weight 700, line-height 1.1, tracking -0.04em
- Headline-lg: Geist, 48px, weight 600
- Body-lg: Geist, 18px, weight 400, line-height 1.6
- Labels: JetBrains Mono, 12px, weight 500, tracking 0.05em

### Spacing (base-8 scale)
- Section gap: 120px
- Element gap: 24px
- Container max: 1200px
- Gutter: 24px

### Shapes
- Default radius: 0.5rem (8px)
- Buttons/Inputs: rounded-md (8px)
- Cards/Modals: rounded-xl (24px)
- Badges: rounded-full

---

## Planned Portfolio Sections

| # | Section | Primary Components Used |
|---|---|---|
| 1 | **Navigation** | Dock + DockIcon + Icon (lucide) |
| 2 | **Hero** | AnimatedName, KineticText, ShinyButton, BackgroundGradient, Particles/Globe |
| 3 | **About Me** | NumberTicker, DottedMap/Globe, BlurFade, Terminal |
| 4 | **Consistency** (Github Heatmap + 2 Cards) | DottedMap, BorderBeam, Card, Highlighter |
| 5 | **Experience** | TracingBeam, Timeline card items, Badge (for tags) |
| 6 | **Education** | TracingBeam or Card stack |
| 7 | **Certificates** | Marquee (horizontal scroll) or BentoGrid cards |
| 8 | **Projects** | BorderBeam + Card, AnimatedBeam, BentoGrid |
| 9 | **Kanban Board** (Current Activities + Vision) | Card + Dock-like status badges, Badge |
| 10 | **Blogs / Writings** | Card, NumberTicker, Marquee |
| 11 | **Contact / CTA** | ShinyButton, Spotlight, SmoothCursor |

---

## Data Contract (`src/data/idx.js`)

This file is the **Single Source of Truth**. Every section reads from this file. Fields are intentionally flat and typed with JSDoc for now (plain JS) though TypeScript interfaces could be added later.

```js
// Sections to define:
export const personal      = { name, tagline, bio, avatar, location, email, socials }
export const skills        = [ { category, items: [skill, ...] } ]
export const experience    = [ { id, role, company, start, end, description, tech[], current } ]
export const education     = [ { id, degree, institution, start, end, description } ]
export const certificates  = [ { id, name, issuer, date, url, image? } ]
export const projects      = [ { id, title, description, tech[], github, live, image? } ]
export const kanban        = { current: [ {id, title, status} ], vision: [ {id, title, status} ] }
export const blogs         = [ { id, title, excerpt, date, url, tags[] } ]
export const stats         = [ { label, value } ]   // for NumberTicker
```

---

## Key Rules

1. **No new folders in `src/components/ui/`** — only `.tsx` component files go there.
2. All portfolio sections live in `src/sections/` (to be created).
3. All content comes from `src/data/idx.js` — never hardcode content.
4. All styling via Tailwind utility classes; no CSS module files.
5. Follow `cn()` pattern from `@/lib/utils` for conditional classes.
6. Use `@tabler/icons-react` for all icons. No `lucide-react` anywhere.
7. DESIGN.md style must be respected throughout (dark cinematic, electric violet accents).