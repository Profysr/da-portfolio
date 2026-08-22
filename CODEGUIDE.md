# CODEGUIDE.md — DA Portfolio Project

## Project Overview

Portfolio website for **DA (Data Analyst / Agency)**. Built with **Next.js 16 + React 19 + Tailwind CSS 4 + shadcn/ui + fumadocs**. App Router with Server Components by default. "Dark Cinematic/Ethereal Professional" aesthetic with Golden Yellow (`#d4a800`) primary accent.

---

## Technology Stack

| Tool | Version | Role |
|---|---|---|
| Next.js | 16.3.1 | App Router, SSR/SSG, file-system routing |
| React | 19.2.8 | UI framework |
| Tailwind CSS | 4.x | Styling (via `@tailwindcss/postcss`) |
| shadcn/ui | 4.18.0 | Component primitives (Base Nova style via `shadcn/tailwind.css`) |
| Motion | 13.1.1 | Scroll-triggered & micro-interactions |
| cobe | 0.6.5 | Interactive 3D globe (not yet used) |
| rough-notation | 0.5.1 | Hand-drawn style highlight annotations |
| @tabler/icons-react | 3.46.0 | Icon library (all UI icons) |
| class-variance-authority | 0.7.1 | Component variant logic |
| radix-ui | 1.6.7 | Primitives (Slot, Tooltip, etc.) |
| fumadocs-core | 16.14.5 | MDX content source layer |
| fumadocs-mdx | 15.3.0 | MDX build pipeline |
| streamdown | 2.5.0 | MDX rendering with components |
| Geist Variable (font) | via next/font | Primary typeface (Space Grotesk in CSS) |
| tw-animate-css | 1.4.0 | Preset animation utilities |

---

## File Tree & Descriptions

```
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout — fonts, TooltipProvider, dark theme
│   ├── page.tsx                      # Homepage (Server Component)
│   ├── globals.css                   # Tailwind v4 + CSS variables + theme tokens
│   ├── (home)/                       # Route group for homepage sections
│   │   ├── page.tsx                  # Composes all HomePage sections
│   │   └── _components/              # Section components (Hero, About, Projects, etc.)
│   ├── writing/
│   │   ├── [...slug]/page.jsx        # WritingDetail (Server Component + SSG)
│   │   └── _components/WritingContent.jsx
│   ├── projects/
│   │   └── [slug]/                   # ProjectDetail (to be created)
│   └── api/github/route.ts           # GitHub API endpoint
│
├── components/
│   ├── ui/                           # ⛔ DO NOT ADD FOLDERS — only .tsx/.jsx component files
│   │   ├── badge.tsx                 # CVA variants: default/secondary/destructive/outline/ghost/link
│   │   ├── bento-grid.tsx            # Apple-style grid + BentoCard
│   │   ├── blur-fade.tsx             # Scroll-triggered blur + opacity + translate reveal
│   │   ├── button.tsx                # CVA variants: default/outline/ghost/destructive/link
│   │   ├── card.tsx                  # Card, CardHeader, CardTitle, CardContent, CardFooter
│   │   ├── expandable-list.tsx       # Show-N / show-all animated list toggle
│   │   ├── Heading.tsx               # Heading (watermark) + GradientHeading (text gradient)
│   │   ├── light-rays.tsx            # Animated light rays from top
│   │   ├── marquee.tsx               # Infinite horizontal/vertical scroll ticker
│   │   ├── number-ticker.tsx         # Scroll-triggered animated counter
│   │   ├── particles.tsx             # Canvas mouse-reactive particle field
│   │   ├── scroll-rail.tsx           # Scroll-linked vertical rail for sections
│   │   ├── shimmer-button.tsx        # Hero/CTA primary button with animated conic-gradient
│   │   ├── spotlight-glow.tsx        # Cursor-following conic-gradient glow overlay
│   │   ├── tooltip.tsx               # Radix Tooltip + Provider
│   │   ├── typing-animation.tsx      # Character-by-character typewriter effect
│   │   └── ... (other unused components — see Phase 19C)
│   ├── layout/
│   │   ├── AppShell.tsx              # DEPRECATED — replaced by HomeLayout
│   │   ├── BottomDock.jsx            # Bottom floating dock with tooltips
│   │   ├── Footer.jsx                # Two-section footer: CTA card + branding bar
│   │   ├── HomeLayout.jsx            # Master shell: TopBar + main + BottomDock + AssistantAi + Footer
│   │   ├── Layout.jsx                # Inner mx-auto max-w-7xl content constrainer
│   │   ├── ReadingLayout.jsx         # Detail page layout: back button + breadcrumbs + content + Footer
│   │   ├── Section.jsx               # py-20 sm:py-24 lg:py-28 wrapper with optional BlurFade
│   │   ├── TopBar.jsx                # Floating glass TopBar with logo + CommandPaletteButton
│   │   └── SectionWrapper.jsx        # Unifies Section+Layout+BlurFade+Particles (Phase 19C)
│   ├── nav/
│   │   └── DockVisibilityProvider.jsx # Context + useDockHide() hook + AnimatedDock
│   ├── sections/                     # DEPRECATED duplicate — delete
│   ├── 21st/                         # Experimental components (PricingCard, Timeline)
│   ├── ai-elements/                  # AI Assistant related components
│   ├── common/                       # Shared utilities
│   ├── watermelon/                   # Experimental
│   ├── AssistantAi.jsx               # AI Assistant Drawer (complex, lazy-loaded)
│   ├── AvatarStatus.jsx              # Avatar + online "Systems Operational" status dot
│   ├── CommandPallete.jsx            # ⌘K / Ctrl+K command palette (data-driven from idx.js)
│   ├── ContactCard.jsx               # Social links card with AnimatedBeam connectors
│   ├── ExtendedLink.jsx              # External link wrapper with IconExternalLink
│   ├── FavoriteStack.jsx             # Hero tech stack marquee + detailed card
│   ├── Heatmap.jsx                   # Deterministic 52×7 JSX contribution heatmap grid
│   ├── lazy.jsx                      # React.lazy exports for heavy components
│   ├── NotFound.jsx                  # Shared 404 with back button
│   ├── PageLoader.jsx                # Shared skeleton
│   ├── PageError.jsx                 # Shared error state
│   ├── ScrollToTop.jsx               # Route change scroll restoration
│   ├── StatCard.jsx                  # Single stat card with icon + number
│   ├── TagFilter.jsx                 # Unified pill/filter component (replaces inline patterns)
│   ├── TechCard.jsx                  # Skill category card (icon + tool list)
│   └── TechPill.jsx                  # Tech badge with icon from TECH_ICON_MAP
│
├── data/                             # Single Source of Truth (JS barrel: idx.js)
│   ├── idx.js                        # Re-exports all data modules
│   ├── personal.js                   # Identity, socials, about stats
│   ├── navigation.js                 # Nav items for Dock/CommandPalette
│   ├── skills.js                     # TECH_ICON_MAP + SkillsAndTools + favoriteStack
│   ├── experience.js                 # Work history + education + awards
│   ├── projects.js                   # Projects (featured + side) + contributions config
│   ├── writings.js                   # Blog posts metadata
│   ├── credentials.js                # Certificates
│   ├── botContent.js                 # AI Assistant knowledge base
│   └── content.js                    # FAQ data
│
├── lib/
│   ├── utils.ts                      # cn() — clsx + tailwind-merge
│   ├── download.ts                   # Resume download helper
│   ├── botApi.ts                     # AI Assistant backend logic
│   ├── source.ts                     # Fumadocs typed sources (writings, projects)
│   └── mdx-plugins.ts                # rehype plugins (pretty-code, extractHeadings, wrapChangelog)
│
├── hooks/
│   ├── useGitHubStats.js             # GitHub API integration
│   └── useScrollVisibility.ts        # Extracted from AppShell scroll logic
│
├── content/                          # MDX content files (fumadocs source)
│   ├── writings/*.mdx                # Blog posts with frontmatter
│   └── projects/*.mdx                # Project detail pages with changelog
│
├── public/
│   ├── tools/                        # Tech icon SVGs (referenced by TECH_ICON_MAP)
│   └── ...
│
├── source.config.ts                  # Fumadocs config for MDX collections
├── components.json                   # shadcn config — style: base-nova
├── next.config.ts                    # Next.js + MDX wrapper config
├── tsconfig.json                     # TypeScript strictness config
├── eslint.config.mjs                 # Flat ESLint config
├── package.json                      # Dependencies & scripts
└── ROADMAP.md                        # Phase-based roadmap with questions
```

---

## UI Component Quick Reference

### Surface / Layout
| Component | Use For | File |
|---|---|---|
| `Section` | Full-width section wrapper with `<Layout>` + optional `BlurFade` | `layout/Section.jsx` |
| `Layout` | Inner mx-auto max-w-7xl content constrainer | `layout/Layout.jsx` |
| `SectionWrapper` | Unifies Section + Layout + BlurFade + LazyParticles | `layout/SectionWrapper.jsx` |
| `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` | Content surface | `ui/card.tsx` |
| `BentoGrid` + `BentoCard` | Apple-style grid; skills, stat cards, project showcases | `ui/bento-grid.tsx` |
| `ScrollRail` | Scroll-linked vertical rail for Credentials section | `ui/ScrollRail.jsx` |

### Buttons / Interactive
| Component | Use For | File |
|---|---|---|
| `Button` (CVA variants) | All standard CTAs | `ui/button.tsx` |
| `ShimmerButton` | Hero/CTA primary button with animated conic-gradient spark | `ui/shimmer-button.tsx` |
| `Badge` | Skill tags, category labels, status pills | `ui/badge.tsx` |
| `TagFilter` | Unified pill filter for categories (Projects, Credentials, TechStack) | `TagFilter.jsx` |
| `TechPill` | Tech badge with icon from TECH_ICON_MAP | `TechPill.jsx` |

### Typography / Text Effects
| Component | Use For | File |
|---|---|---|
| `Heading` | Section headers with watermark text + radial glow bg | `ui/Heading.tsx` |
| `GradientHeading` | `bg-clip-text` gradient heading | `ui/Heading.tsx` |
| `TypingAnimation` | Character-by-character typewriter effect | `ui/typing-animation.tsx` |
| `NumberTicker` | Scroll-triggered animated counter | `ui/number-ticker.tsx` |

### Visual Effects / Backgrounds
| Component | Use For | File |
|---|---|---|
| `SpotlightGlow` | Cursor-following conic-gradient glow overlay on cards | `ui/spotlight-glow.tsx` |
| `Particles` | Canvas mouse-reactive particle field | `ui/particles.tsx` |
| `LightRays` | Randomised animated light rays from top of container | `ui/light-rays.tsx` |
| `BlurFade` | Scroll-triggered blur + opacity + translate reveal wrapper | `ui/blur-fade.tsx` |

### Navigation / Overlay
| Component | Use For | File |
|---|---|---|
| `BottomDock` | Bottom floating icon dock with tooltips | `layout/BottomDock.jsx` |
| `TopBar` | Floating glass TopBar with logo + CommandPaletteButton | `layout/TopBar.jsx` |
| `Tooltip` + `TooltipProvider` | Hover tooltips (Radix) | `ui/tooltip.tsx` |
| `CommandPalette` + `CommandPaletteButton` | ⌘K / Ctrl+K quick navigation | `CommandPallete.jsx` |

---

## Design System (from globals.css — actual implementation)

### Colors (dark mode — primary theme)
| Token | Value | Usage |
|---|---|---|
| `--background` | `#141414` | Page background |
| `--surface-low` | `#1c1b1b` | Lowest surface |
| `--surface` | `#201f1f` | Card / panel background |
| `--surface-high` | `#2a2a2a` | Elevated surface |
| `--surface-highest` | `#353534` | Highest surface |
| `--foreground` | `#f5f5f5` | Primary text |
| `--muted-foreground` | `#a1a1aa` | Secondary / muted text |
| `--primary` | `#d4a800` | Golden Yellow accent |
| `--primary-foreground` | `#000000` | Text on primary bg |
| `--secondary` | `#2a2a2a` | Secondary action bg |
| `--border` | `rgba(255, 255, 255, 0.12)` | Border color |
| `--input` | `rgba(255, 255, 255, 0.15)` | Input field border |
| `--ring` | `#d4a800` | Focus ring color |

> **Note:** DESIGN.md specifies Electric Violet (`#d0bcff`) but globals.css implements Golden Yellow (`#d4a800`). The codebase uses the Golden Yellow palette.

> All components use Tailwind tokens (`bg-background`, `text-foreground`, `border-border`, etc.) — **no hardcoded hex values in component files** (except some legacy sections needing cleanup).

### Typography
- Primary: Space Grotesk (CSS variable `--font-sans`), weights 400–700
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

## Portfolio Sections Status

| # | Section | Status | Primary Components |
|---|---|---|---|
| 1 | **TopBar + BottomDock** | ✅ Done | TopBar, BottomDock, Tooltip, CommandPalette |
| 2 | **Hero** | ✅ Done | LightRays, TypingAnimation, ShimmerButton, AvatarStatus, FavoriteStack |
| 3 | **About Me** | ✅ Done | Globe (not used), NumberTicker, BentoGrid skills, ContactCard, Particles |
| 4 | **Contributions** | ✅ Done | Heatmap, StatCard, BentoCard, SpotlightGlow |
| 5 | **Experience** | ✅ Done | ExpandableList, Badge, GradientHeading |
| 6 | **TechStack** | ✅ Done | TagFilter, TechPill |
| 7 | **Projects** | ✅ Done | TagFilter, ExpandableList, ProjectCard, ProjectBlueprintHero |
| 8 | **Credentials** | ✅ Done | TagFilter, ExpandableList, ScrollRail, CertificateCard, EducationCard, AwardCard |
| 9 | **Activities & Writings** | ✅ Done | ActivityRow (merged Kanban + Blog) |
| 10 | **FAQ** | ✅ Done | ExpandableList, GradientHeading |
| 11 | **Footer** | ✅ Done | Badge, ShimmerButton, Section, useDockHide |

---

## Data Contract (`data/idx.js`)

```js
// Identity
export const personal = { name, tagline, bio, avatar, logo, location, locationLabel, timezone, email, resumeUrl, socials[] }
export const socials = [{ platform, icon, url, label, handle, aria }]
export const about = { heading, subheading, stats: [{ id, title, value, subtext, icon, spanClass, isCompact? }] }

// Skills + tools
export const SkillsAndTools = [{ category, items: [{ name, subCategory }] }]
export const TECH_ICON_MAP = { [toolName]: { img, hideName, lightBg, category } }
export const favoriteStack = { title, subtitle, stack, tag, icon, items: [{ name, role }] }

// Contributions / heatmap
export const contributions = { heading, subheading, githubUsername, heatmapWeeks, stats: [{ label, value, suffix, icon, badge, spanClass }] }

// Work history
export const experiences = [{ company, logo, url, location, locationType, isCurrent, roles: [{ id, title, type, period, duration, description, skills[] }] }]

// Education
export const education = [{ id, institution, degree, fieldOfStudy, minor, startDate, endDate, grade, activities, description, location, skills[], url, image }]

// Certificates
export const certificates = [{ id, name, issuingOrg, issueDate, expirationDate, credentialId, credentialUrl, skills[] }]

// Awards
export const awards = [{ id, title, issuer, date, description }]

// Projects
export const projects = [
  // Featured (homepage grid): { id, slug, title, description, tech[], category, industry, access, strategies[], github, live, image, featured: true, isActivity: false }
  // Side projects (Activities): { id, slug, title, description, link, isExternal, tag, featured: false, isActivity: true }
]

// Writings
export const writings = [{ id, slug, title, excerpt, date, tags[], readTime }]

// FAQ
export const FrequentQuestions = { badge, heading, subheading, items: [{ id, question, answer }] }

// Navigation
export const nav = [{ id, label, icon }]
```

---

## Key Rules

1. **No new folders in `components/ui/`** — only `.tsx`/`.jsx` component files go there.
2. **Sections live in `app/(home)/_components/`** — not `components/sections/`.
3. **All content comes from `data/idx.js`** — never hardcode content in components.
4. **All styling via Tailwind utility classes** using theme tokens (`bg-background`, `text-foreground`, `border-border`, etc.). No hardcoded hex values in component files.
5. **Follow `cn()` pattern** from `@/lib/utils` for conditional class merging.
6. **Use `@tabler/icons-react` for all icons.** No `lucide-react` anywhere (remove from deps).
7. **Dock visibility** — use `useDockHide()` from `@/components/nav/DockVisibilityProvider`. Any section can trigger hide on scroll into view.
8. **Server Components by default.** Only add `"use client"` when interactivity is required (state, effects, browser APIs).
9. **Static Generation preferred.** Use `generateStaticParams()` for dynamic routes.
10. **Ask before you act** — if a phase has open ❓ questions, confirm answers before writing code.

---

## Completed Phases Summary

| Phase | Name | Key Deliverable |
|---|---|---|
| **Phase 0** | Housekeeping & Pre-flight | Clean codebase, icons migrated to tabler, TS errors fixed |
| **Phase 1** | Layout Shell & Design System | HomeLayout, Section, Layout, Footer, DockVisibilityProvider, dark theme |
| **Phase 2** | Hero Section | LightRays, TypingAnimation, ShimmerButton, FavoriteStack, AvatarStatus |
| **Phase 3** | About Me | Particles, NumberTicker, BentoGrid skills, ContactCard |
| **Phase 4** | Contributions / Heatmap | Deterministic 52×7 heatmap, 4 stat BentoCards |
| **Phase 5** | Experience | Expandable role cards with tech badges |
| **Phase 6** | TechStack | TagFilter + TechPill filterable skills |
| **Phase 7** | Projects | Filterable BentoGrid with ProjectCard + ProjectBlueprintHero |
| **Phase 8** | Credentials | ScrollRail + CertificateCard/EducationCard/AwardCard + TagFilter |
| **Phase 9** | Activities & Writings | Merged Kanban + Blog into ActivityRow two-block layout |
| **Phase 10** | FAQ | Accordion with Framer Motion expand/collapse |
| **Phase 11** | Polish & TagFilter | Unified TagFilter across Projects, Credentials, TechStack |
| **Phase 13** | Detail Pages Data Layer | Projects + Writings enriched with slug/contentPath, activities.ts deleted |
| **Phase 14** | ReadingLayout | Minimal detail page layout with back button + breadcrumbs + Footer |
| **Phase 15** | WritingDetail (App Router) | SSG with fumadocs, generateStaticParams, generateMetadata |
| **Phase 16** | ProjectDetail | Pending migration to App Router |
| **Phase 17** | ProjectChangelog | Pending migration to App Router |
| **Phase 18** | Polish, 404s, Scroll Restoration | NotFound, ScrollToTop (needs App Router update) |

---

## ⚠️ Items Needing Attention

### 1. Color Palette Mismatch
- **DESIGN.md** specifies Electric Violet (`#d0bcff`) palette
- **globals.css** implements Golden Yellow (`#d4a800`) palette
- **Decision needed:** Which palette to standardize on? Current codebase uses Golden Yellow.

### 2. Unused UI Components (Phase 19C cleanup)
Remove from `components/ui/`:
- `animated-beam.tsx`
- `animated-circular-progress-bar.tsx`
- `animated-shiny-text.tsx`
- `aurora-text.tsx`
- `background-gradient.tsx`
- `border-beam.tsx`
- `dotted-map.tsx`
- `glowing-effect.tsx` (merge with spotlight-glow → CursorGlow)
- `interface-craft-cards.tsx`
- `kinetic-text.tsx`
- `ripple.tsx`
- `spotlight.tsx` (SVG-based, heavy)
- `terminal.tsx`
- `tracing-beam.tsx`

### 3. Duplicate Directory
- `components/sections/` — delete (duplicate of `app/(home)/_components/`)

### 4. Unused Dependencies (package.json)
Remove:
- `approve` — not imported
- `install-scripts` — build tool, not runtime
- `npm` — not needed as dependency
- `radix-ui` — meta-package; using individual `@radix-ui/*` packages
- `shadcn` — CLI only, not runtime
- `@streamdown/cjk` — only if CJK content
- `@streamdown/mermaid` — only if mermaid diagrams
- `lucide-react` — replaced by @tabler/icons-react

### 5. Heading Consolidation
- `Heading` (watermark container) + `GradientHeading` (text gradient) → single `Heading` with `variant` prop

### 6. Animation Consolidation
- Merge `SpotlightGlow` + `GlowingEffect` → single `CursorGlow` component

### 7. TagFilter Simplification
- Remove accessor function props (`getItemValue`, `getItemLabel`, `getItemCount`)
- Use two specialized variants: `CategoryFilter` (string array) + `TagFilterWithCount` (object array)

### 8. ProjectDetail & ProjectChangelog Migration
- Create `app/projects/[slug]/page.tsx` (Server Component + Client Component split)
- Create `app/projects/[slug]/changelog/page.tsx` (Server Component)
- Add `generateStaticParams()` for both
- Remove `react-router-dom` (not currently in deps but used in old pages/)

### 9. Content Layer Migration (Phase 20)
- Migrate `data/*.js` → `content/*.mdx` with frontmatter
- Configure `fumadocs-mdx` pipeline with `rehype-pretty-code` + `shiki`
- Build-time TOC extraction, SSG for all detail pages
- AI-ready content index (`public/content-index.json`)

### 10. SEO & Accessibility (Phase 19E)
- Add JSON-LD structured data (Person, WebSite, BlogPosting)
- Generate `sitemap.xml` + `robots.txt` via `next-sitemap`
- Add `metadata` export to all dynamic routes
- Audit color contrast (WCAG AA) — especially `text-muted-foreground` on dark surfaces
- Test keyboard navigation — Dock, CommandPalette, all interactive elements
- Verify `prefers-reduced-motion` respected across all animations

---

## Next Priority Actions

### Immediate (Week 1)
1. **Decide on color palette** — Electric Violet (DESIGN.md) vs Golden Yellow (globals.css)
2. **Create `app/projects/[slug]/page.tsx`** — ProjectDetail with SSG
3. **Create `app/projects/[slug]/changelog/page.tsx`** — ProjectChangelog with SSG
4. **Delete `components/sections/`** duplicate directory
5. **Remove unused dependencies** from package.json

### Short-term (Week 2)
6. **Consolidate unused UI components** (Phase 19C)
7. **Create `SectionWrapper`** to eliminate boilerplate
8. **Merge `SpotlightGlow` + `GlowingEffect`** → `CursorGlow`
9. **Consolidate `Heading` + `GradientHeading`** → single component with `variant`
10. **Simplify `TagFilter` API**

### Medium-term (Week 3-4)
11. **Content layer migration to MDX** (Phase 20)
12. **SEO & Accessibility audit** (Phase 19E)
13. **Performance optimization** — Particles reduction on mobile, Web Worker
14. **Deploy to Vercel** with static export (`output: 'export'`)

---

## Questions for Alignment

| # | Question | Context |
|---|---|---|
| 1 | **Color palette:** Standardize on Electric Violet (`#d0bcff`) or Golden Yellow (`#d4a800`)? | DESIGN.md vs globals.css mismatch |
| 2 | **Avatar:** Photo available? Path/URL? | Currently placeholder in personal.js |
| 3 | **Social links:** Any platforms beyond GitHub, LinkedIn, X, Email? | Add to personal.socials |
| 4 | **Deploy target:** Vercel (recommended), Netlify, or GitHub Pages? | Affects `output: 'export'` config |
| 5 | **Analytics:** Plausible / Google Analytics / none? | Add via `next/script` in layout.tsx |
| 6 | **Reduced motion:** Respect `prefers-reduced-motion`? | Default yes, confirm |
| 7 | **AI Assistant:** Keep in Dock or move to `/assistant` route? | Currently complex lazy-loaded drawer |
| 8 | **Content source:** Keep markdown in `data/` or move to CMS? | Phase 20 moves to `content/*.mdx` |
| 9 | **Code theme:** `github-light`/`github-dark` for shiki, or custom? | For syntax highlighting in MDX |
| 10 | **TOC depth:** Include h4-h6 in TOC, or only h2-h3? | For WritingContent/ProjectContent |

---

## Commands Reference

```bash
# Development
npm run dev          # fumadocs-mdx + next dev

# Build
npm run build        # fumadocs-mdx + next build

# Lint
npm run lint         # eslint

# Type check
npx tsc --noEmit     # TypeScript check

# Fumadocs MDX generation
npx fumadocs-mdx     # Generate @/.source virtual module

# Post-install (auto-runs)
npm run postinstall  # fumadocs-mdx
```