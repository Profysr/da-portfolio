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
| class-variance-authority | 0.7.1 | Component variant logic |
| @radix-ui/react-slot | — | Slot primitive for Badge, Button, RainbowButton |
| @radix-ui/react-tooltip | — | Tooltip primitive |
| @base-ui/react/button | — | Button primitive base |
| Geist Variable (font) | 5.3.0 | Primary typeface |
| tw-animate-css | 1.4.0 | Preset animation utilities |

---

## File Tree & Descriptions

```
├── index.html                        # Vite entry HTML — mounts #root
├── package.json                      # Dependencies & scripts
├── components.json                   # shadcn config — style: base-nova
├── vite.config.ts                    # Vite + React + Tailwind plugin config
├── tsconfig.json / tsconfig.app.json # TypeScript strictness config
├── eslint.config.js                  # Flat ESLint config (includes .jsx)
│
├── src/
│   ├── main.tsx                       # App bootstrap — renders <App /> into #root
│   ├── App.tsx                        # Router entry — mounts <AppShell /> for all routes
│   ├── index.css                      # Tailwind tokens, theme vars, keyframe animations
│   │
│   ├── lib/
│   │   └── utils.ts                   # `cn()` — clsx + tailwind-merge (used everywhere)
│   │
│   ├── data/
│   │   └── idx.js                     # ⚡ Single Source of Truth — all content lives here
│   │
│   ├── components/
│   │   ├── ui/                        # ⛔ DO NOT ADD FOLDERS — only .tsx component files
...
│   │   │   └── typing-animation.tsx    # Character-by-character type/delete/loop animation
│   │   │
│   │   └── CommandPallete.jsx          # ⌘K / Ctrl+K command palette (data-driven from idx.js)
│   │
│   ├── sections/
│   │   └── HomePage/
│   │       ├── Hero.jsx            # First screen — LightRays, TypingAnimation, ShimmerButton, AvatarStatus
│   │       ├── About.jsx           # Bio + Globe + NumberTicker stats + Skills BentoGrid + ContactCard
│   │       ├── Contributions.jsx   # HeatmapGrid + 4 stat BentoCards (SpotlightGlow)
│   │       ├── Experience.jsx      # Expandable company/role cards with company header + tech badges
│   │       ├── FAQ.jsx             # Accordion FAQ (Framer Motion expand/collapse) + ExpandableList
│   │       ├── Projects.jsx        # Filterable BentoGrid with All/Web/Automation/Open Source tabs ⚠️ NEEDS REWORK
│   │       ├── Education.jsx       # Card timeline for academic credentials ⚠️ NEEDS REWORK
│   │       └── Certificates.jsx    # Infinite marquee carousel of cert cards ⚠️ NEEDS REWORK
│   │   │
│   │   ├── AvatarStatus.jsx            # Avatar + online "Systems Operational" status dot
│   │   ├── ContactCard.jsx             # Social links card with AnimatedBeam connectors
│   │   ├── Heatmap.jsx                 # Deterministic 52×7 JSX contribution heatmap grid
│   │   ├── StatCard.jsx                # Single stat card with icon + number
│   │   └── TechCard.jsx                # Skill category card (icon + tool list)
│   │
│   └── sections/
│       └── HomePage/
│           ├── Hero.jsx                # Assembles all HomePage sections
│           ├── About.jsx
│           ├── Contributions.jsx
│           ├── Experience.jsx
│           └── FAQ.jsx
└── stitch/                            # Design reference — do not copy
    ├── DESIGN.md                       # Full design system spec
    └── code.html                       # WebGL shader background inspiration
```

---

## UI Component Quick Reference

### Surface / Layout
| Component | Use For | File |
|---|---|---|
| `Section` | Full-width section wrapper with `<Layout>` + optional `BlurFade` | `layout/Section.jsx` |
| `Layout` | Inner mx-auto max-w-7xl content constrainer | `layout/Layout.jsx` |
| `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` | Content surface; experience/project/stat cards | `ui/card.tsx` |
| `BentoGrid` + `BentoCard` | Apple-style grid; skills, stat cards, project showcases | `ui/bento-grid.tsx` |

### Buttons / Interactive
| Component | Use For | File |
|---|---|---|
| `Button` (CVA variants) | All standard CTAs — default/outline/ghost/destructive/link | `ui/button.tsx` |
| `ShimmerButton` | Hero/CTA primary button with animated conic-gradient spark | `ui/shimmer-button.tsx` |
| `ShinyButton` | CTA with repeating radial-gradient shimmer sweep | `ui/shiny-button.tsx` |
| `Badge` | Skill tags, category labels, status pills | `ui/badge.tsx` |

### Typography / Text Effects
| Component | Use For | File |
|---|---|---|
| `Heading` | Section headers with watermark text + radial glow bg | `ui/Heading.tsx` |
| `GradientHeading` | `bg-clip-text` gradient heading (used in Experience, About) | `ui/Heading.tsx` |
| `TypingAnimation` | Character-by-character typewriter effect | `ui/typing-animation.tsx` |
| `KineticText` | Per-letter hover-reactive text (stroke weight) | `ui/kinetic-text.tsx` |
| `AuroraText` | Text with animated multi-color aurora gradient | `ui/aurora-text.tsx` |
| `AnimatedShinyText` | Subtle repeating shimmer sweep on text spans | `ui/animated-shiny-text.tsx` |
| `NumberTicker` | Scroll-triggered animated counter (commits, projects, etc.) | `ui/number-ticker.tsx` |

### Visual Effects / Backgrounds
| Component | Use For | File |
|---|---|---|
| `BorderBeam` | Animated scanning conic-gradient border on cards | `ui/border-beam.tsx` |
| `Spotlight` | SVG elliptical spotlight with Gaussian blur | `ui/spotlight.tsx` |
| `SpotlightGlow` | Cursor-following conic-gradient glow overlay on cards | `ui/spotlight-glow.tsx` |
| `GlowingEffect` | Pointer-following border glow (alternative to SpotlightGlow) | `ui/glowing-effect.tsx` |
| `BackgroundGradient` | Animated multi-color radial gradient background | `ui/background-gradient.tsx` |
| `Ripple` | Concentric expanding ripple ring decorations | `ui/ripple.tsx` |
| `Particles` | Canvas mouse-reactive particle field | `ui/particles.tsx` |
| `LightRays` | Randomised animated light rays from top of container | `ui/light-rays.tsx` |
| `Globe` | Interactive 3D COBE WebGL globe with location markers | `ui/globe.tsx` |
| `DottedMap` | SVG dotted world map with pulsing location markers | `ui/dotted-map.tsx` |
| `BlurFade` | Scroll-triggered blur + opacity + translate reveal wrapper | `ui/blur-fade.tsx` |
| `SmoothCursor` | Physics-driven spring cursor (desktop-only, auto-disables on touch) | `ui/smooth-cursor.tsx` |

### Timeline / Flow
| Component | Use For | File |
|---|---|---|
| `TracingBeam` | Scroll-linked vertical timeline beam with animated path | `ui/tracing-beam.tsx` |
| `AnimatedBeam` | Curved SVG connector line between two paired elements | `ui/animated-beam.tsx` |
| `Marquee` | Infinite horizontal/vertical scroll ticker (pause on hover) | `ui/marquee.tsx` |
| `ExpandableList` | Show-N / show-all animated list toggle | `ui/expandable-list.tsx` |

### Animation / Feedback
| Component | Use For | File |
|---|---|---|
| `Highlighter` | rough-notation hand-drawn highlight/underline/circle on text | `ui/highlighter.tsx` |
| `Terminal` + `AnimatedSpan` + `TypingAnimation` | Code/terminal mockups with typing effect | `ui/terminal.tsx` |

### Navigation / Overlay
| Component | Use For | File |
|---|---|---|
| `Dock` + `DockIcon` | Bottom floating icon dock with spring magnification | `ui/dock.tsx` |
| `AnimatedDock` | `Dock` wrapped with scroll-aware hide/show animation | `nav/DockVisibilityProvider.jsx` |
| `useDockHide()` | Hook — call from any section to hide the dock on scroll into view | `nav/DockVisibilityProvider.jsx` |
| `Tooltip` + `TooltipProvider` | Hover tooltips (Radix) | `ui/tooltip.tsx` |
| `CommandPalette` + `CommandPaletteButton` | ⌘K / Ctrl+K quick navigation (tabler icons, data-driven) | `CommandPallete.jsx` |

---

## Design System (from DESIGN.md)

### Colors (dark mode — only mode)
| Token | Value | Usage |
|---|---|---|
| `--background` | `#131313` | Page background |
| `--surface-low` | `#1c1b1b` | Lowest surface |
| `--surface` | `#201f1f` | Card / panel background |
| `--surface-high` | `#2a2a2a` | Elevated surface |
| `--surface-highest` | `#353534` | Highest surface |
| `--foreground` | `#e5e2e1` | Primary text |
| `--muted-foreground` | `#cbc3d7` | Secondary / muted text |
| `--primary` | `#d0bcff` | Electric Violet accent |
| `--primary-foreground` | `#3c0091` | Text on primary bg |
| `--secondary` | `#3c4a5e` | Secondary action bg |
| `--border` | `#494454` | Border color |
| `--input` | `rgba(255 255 255 / 0.08)` | Input field border |

> All components use Tailwind tokens (`bg-background`, `text-foreground`, `border-border`, etc.)
> — **no hardcoded hex values anywhere** in component files.

### Typography
- Primary: Geist Variable, weights 400–700
- Mono: ui-monospace, Cascadia Code, Consolas
- Headings: `font-semibold`, tracking-tight
- Body: `font-normal`, leading-relaxed

### Shapes
| Token | Value |
|---|---|
| `--radius-sm` | `0.25rem` (4px) |
| `--radius-md` | `0.5rem` (8px) |
| `--radius-lg` | `0.75rem` (12px) |
| `--radius-xl` | `1rem` (16px) |
| `--radius-2xl` | `1.5rem` (24px) |

### Responsive Breakpoints
| Token | Width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1440px |

---

## Planned Portfolio Sections

| # | Section | Status | Primary Components |
|---|---|---|---|
| 1 | **TopBar + Dock Nav** | ✅ Done | Dock, DockIcon, Tooltip, CommandPalette |
| 2 | **Hero** | ✅ Done | LightRays, TypingAnimation, ShimmerButton, AvatarStatus |
| 3 | **About Me** | ✅ Done | Globe, NumberTicker, BentoCard, ContactCard, Particles |
| 4 | **Contributions** | ✅ Done | HeatmapGrid, StatCard, BentoCard, SpotlightGlow |
| 5 | **Experience** | ✅ Done | AnimatePresence expand/collapse, Badge, GradientHeading |
| 6 | **Projects** | 🔄 Needs rework | BentoGrid, BentoCard, Badge — hardcoded colors + data mismatches |
| 7 | **Education** | 🔄 Needs rework | Badge, GradientHeading — invalid classes + non-existent data fields |
| 8 | **Certificates** | 🔄 Needs rework | Badge, GradientHeading — invalid Tailwind values + wrong data field names |
| 9 | **FAQ** | ✅ Done | Accordion (Framer Motion), ExpandableList, GradientHeading |
| 10 | **Footer (Contact CTA)** | ✅ Done | Badge, ShimmerButton, Section, useDockHide |

---

## ⚠️ Sections Needing Rework

The following files exist and render, but must be refactored before they're production-ready.

### `Projects.jsx` (`src/sections/HomePage/Projects.jsx`)
- **Hardcoded colors:** `bg-[#1c1b1b]`, `text-zinc-300/400`, `border-white/10`, `bg-white/5`, `text-white`, `bg-primary/20`, `border-primary/40`, `text-amber-300`, `border-amber-500/30`, `bg-amber-500/10` — all must become theme tokens (`bg-surface`, `text-foreground`, `border-border`, `text-primary`, etc.)
- **`BentoCard` API:** Uses `title`, `subtitle`, `Icon`, `badge`, `headerExtra` props — verify against actual `BentoCard` component API in `ui/bento-grid.tsx`
- **Data field mismatch:** References `project.subtitle`, `project.category`, `project.tags`, `project.isFeatured`, `project.githubUrl`, `project.liveUrl` — none of these exist in `idx.js → projects` (actual: `id`, `title`, `description`, `tech[]`, `github`, `live`)
- **Unused imports:** `IconFolderOff`, `IconLayersTriangle`, `Icon360View`
- **Missing:** No `useDockHide` integration

### `Education.jsx` (`src/sections/HomePage/Education.jsx`)
- **Hardcoded colors:** `bg-[#1c1b1b]`, `text-white`, `text-zinc-400`, `border-white/10`, `bg-white/5`
- **Non-existent data fields:** `item.period` → use ``${item.start} – ${item.end}``; `item.logo` does not exist in `idx.js → education`
- **Non-standard Tailwind:** `pl-13` is invalid
- **Missing:** No `id` on `<Section>` for scroll anchor; no `useDockHide`
- **Unused import:** `IconExternalLink`

### `Certificates.jsx` (`src/sections/HomePage/Certificates.jsx`)
- **Hardcoded colors:** `bg-[#1c1b1b]`
- **Wrong data field:** `cert.title` → should be `cert.name`; `cert.image` does not exist in `idx.js → certificates` (no-op — safe fallback to icon)
- **Invalid Tailwind:** `w-75`, `w-87.5` are not valid Tailwind sizes; `hover:paused` on `.animate-marquee` should be `hover:[animation-play-state:paused]`
- **Data duplication:** `certificates.concat(certificates)` doubles the array for seamless marquee — OK but fragile; better to use `<Marquee>` component with `pauseOnHover`
- **Missing:** No `id` on `<Section>`; no inner `<Layout>`; no `useDockHide`
- **Unused import:** `IconExternalLink`

### `FAQ.jsx` (`src/components/FAQ.jsx`)
- **Wrong import path:** `GradientHeading` imported from `../../components/ui/Heading` — should be `@/components/ui/Heading` (currently resolving from wrong relative depth)
- **Hardcoded colors:** `zinc-900/80`, `text-zinc-xxx` throughout the contact card and accordion
- **Missing:** No `useDockHide`

---

## Data Contract (`src/data/idx.js`)

This file is the **Single Source of Truth**. Every section and shared component reads from this file.

```js
// Identity
export const personal = { name, tagline, bio, avatar, logo, location, timezone, email, resumeUrl, socials[] }

// Footer configuration
export const footer = { badge, heading, ctaLabel, resumePath }

// FAQ configuration
export const FrequentQuestions = { heading, subheading, items: [{ id, question, answer }] }

// Navigation
export const nav = [{ id, label, icon }]

// Social profiles
export const socials = [{ platform, icon, url, label, handle, aria }]

// Stats (About section)
export const about = { heading, subheading, stats: [{ id, title, value, subtext, icon, spanClass, isCompact? }] }

// Skills + tools
export const SkillsAndTools = [{ category, items: [{ name, img, subCategory }] }]

// Contributions / heatmap config
export const contributions = { heading, subheading, githubUsername, heatmapWeeks, stats: [{ label, value, suffix, icon, badge, spanClass }] }

// Work history
export const experience = [{ id, role, company, start, end, description, tech[], current }]

// Education
export const education = [{ id, degree, institution, start, end, description, highlights[] }]

// Certificates
export const certificates = [{ id, name, issuer, date, url }]
// note: no `image` or `title` field — use `name` for display name

// Projects
export const projects = [{ id, title, description, tech[], github, live, image? }]

// Kanban
export const kanban = [{ id, title, description, status, category }]
// status: "in-progress" | "todo" | "done"
// category: "current" | "vision"

// Blog posts
export const blogs = [{ id, title, excerpt, date, url, tags[] }]
```

---

## Key Rules

1. **No new folders in `src/components/ui/`** — only `.tsx` component files go there.
2. **All sections live in `src/components/sections/HomePage/`** (not `src/sections/`).
3. **All content comes from `src/data/idx.js`** — never hardcode content in components.
4. **All styling via Tailwind utility classes** using theme tokens (`bg-background`, `text-foreground`, `border-border`, etc.). No hardcoded hex values in component files.
5. **Follow `cn()` pattern** from `@/lib/utils` for conditional class merging.
6. **Use `@tabler/icons-react` for all icons.** No `lucide-react` anywhere.
7. **Dock visibility** — use `useDockHide()` from `@/components/nav/DockVisibilityProvider`. Any section can trigger hide on scroll into view without prop drilling or AppShell changes.
8. **Ask before you act** — if a phase has open ❓ questions, confirm answers before writing code.

---

## Completed Phases Summary

| Phase | Name | Key Deliverable |
|---|---|---|
| **Phase 0** | Housekeeping & Pre-flight | Clean codebase, all icons migrated to tabler, TS errors fixed |
| **Phase 1** | Layout Shell + Design System | AppShell, Section, Layout, Footer, DockVisibilityProvider, dark theme |
| **Phase 2** | Hero Section | LightRays, TypingAnimation, ShimmerButton, social links |
| **Phase 3** | About Me | Globe, NumberTicker, BentoGrid skills, ContactCard |
| **Phase 4** | Contributions / Heatmap | Deterministic 52×7 heatmap, 4 stat BentoCards |
| **Phase 5** | Experience | Expandable role cards with tech badges |
| **Phase 11** | FAQ | Accordion with Framer Motion expand/collapse |