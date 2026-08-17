# DA Portfolio — Roadmap

> **How to read this file:** Work through phases top to bottom. Each phase lists tasks and any ❓ questions that need answering before work begins. No code is written until the questions for that phase are answered.

---

## Ground Rules

1. **Pages** go in `src/pages/` — one file per page (e.g. `src/pages/HomePage.jsx`).
2. **Sections** live in `src/sections/<PageName>/` — e.g. `src/sections/HomePage/Hero.jsx`.
3. **Reusable UI components** (not in `src/components/ui/`) go in `src/components/` — e.g. `src/components/layout/PageWrapper.jsx`, `src/components/nav/Navbar.jsx`.
4. **Never put static data inside a component.** If a component has hardcoded strings/arrays, move them to `src/data/idx.js` and import from there. If an existing component already has static data, refactor it out first.
5. **Write JSX/JS.** The data file (`idx.js`) is plain JS with JSDoc types. Components are `.jsx`, hooks/utilities are `.js`.
6. **Use `@tabler/icons-react` exclusively for icons.** No inline SVGs, no `lucide-react`.
7. **Responsive by default.** Every section must work at 375 px (mobile) up to 1440 px (desktop). Use Tailwind breakpoints (`sm:`, `md:`, `lg:`). Test at key widths: 375, 768, 1024, 1440.
8. **Ask before you act.** If anything is unclear, stop and ask. Confirm the plan for a phase before writing any code for it.
9. **`stitch/` is inspiration, not a spec.** The design files (`DESIGN.md`, `code.html`) describe a vibe — dark cinematic, electric violet, glassmorphism — but you are free to adapt or skip anything that doesn't fit the actual content.

---

## Phase 0 — Housekeeping & Pre-flight ✅ (DONE)

- [x] Remove `transition-link.tsx` (Next.js-only dependency)
- [x] Remove `custom-cursor.tsx` (kept `smooth-cursor.tsx`)
- [x] Remove `App.css` (Vite boilerplate)
- [x] Refactor `command-palette.tsx` — remove `next-view-transitions`, `next-themes`, `cmdk`, `@tabler/icons-react` only, data-driven from props
- [x] Replace all `lucide-react` icons with `@tabler/icons-react`
- [x] Install missing Radix packages (`@radix-ui/react-slot`, `@radix-ui/react-tooltip`)
- [x] Fix pre-existing TS errors (`blur-fade.tsx`, `border-beam.tsx`, `particles.tsx`)
- [x] Create `CODEGUIDE.md` — component catalogue and file descriptions
- [x] Create `src/data/idx.js` — single source of truth with placeholder data

**Result:** Codebase compiles clean. All icons are tabler. Palette is data-driven.

---

## Phase 1 — Layout Shell & Design System Foundation ✅ (DONE)

**Decisions locked:**
- Nav: **Dock + floating TopBar** (glass panel, `max-w-7xl` constrained)
- Logo: **"DA"** text placeholder in TopBar (left side)
- Light mode: **Dark-only**, no toggle
- Command palette: ⌘K / Ctrl+K shortcut + button in TopBar; state owned inline in `App.tsx`; UI isolated in `CommandPaletteUI`
- Icons: section/social icon components passed as JSX props from `idx.js` → `App.tsx` → palette (no internal icon maps in palette)
- Dock visibility: **Context-based** — `DockVisibilityProvider` in `nav/`, any section can hide dock via `useDockHide()` hook
- Footer: Data-driven from `idx.js → footer` config; wrapped in Section + Layout; theme tokens only

### Tasks
- [x] 1.1 Replace `index.css` theme tokens with the DESIGN.md palette
  - Primary: Electric Violet `#d0bcff`
  - Surfaces: `#131313` background, `#1c1b1b` surface-low, `#201f1f` surface, `#2a2a2a` surface-high
  - Text: `#e5e2e1` foreground, `#cbc3d7` muted
  - Border radius: sm `0.25rem`, md `0.5rem`, lg `0.75rem`, xl `1rem`, 2xl `1.5rem`
- [x] 1.2 Light mode skipped — dark is the only theme
- [x] 1.3 Create `src/components/layout/Layout.jsx` — `max-w-7xl` container, responsive padding
- [x] 1.4 Create `src/components/layout/Section.jsx` — `py-20 sm:py-24 lg:py-28` wrapper with optional `BlurFade` reveal (default on, `noFade` prop to disable)
- [x] 1.5 Create `src/components/layout/AppShell.tsx` — floating glass TopBar ("DA" logo left, CommandPaletteButton right) + bottom Dock nav with tooltips + hover backgrounds; palette state owned in AppShell
- [x] 1.6 Create `src/components/layout/Footer.jsx` — two-section footer: hero CTA card + branding/copyright bar, dock-hide via `useDockHide`
- [x] 1.7 Create `src/components/nav/DockVisibilityProvider.jsx` — context + `useDockHide()` hook + `AnimatedDock` wrapper for scroll-aware dock visibility
- [x] 1.8 Update eslint config — include `.jsx` files in lint scope

**Result:** Codebase compiles clean. Dark cinematic theme, floating TopBar + Dock with visibility context, command palette wired with keyboard + button, icons passed as props from `idx.js`.

---

## Phase 2 — Hero Section ✅ (DONE)

**Goal:** First-screen impact — animated name, headline, CTA buttons, background effect.

### Tasks
- [x] 2.1 Create `src/sections/HomePage/Hero.jsx`
- [x] 2.2 Wire up name reveal — "Bilal Ahmad" with dynamic roles via `TypingAnimation`
- [x] 2.3 `LightRays` background effect — animated light rays from top of container
- [x] 2.4 `ShimmerButton` CTA — "View my work" (scrolls to #projects) with `IconArrowRight`
- [x] 2.5 Social links row — GitHub, LinkedIn, X with tabler icons + tooltips
- [x] 2.6 Scroll-down indicator — animated chevron at the bottom

**Result:** Hero section live. LightRays background, TypingAnimation cycling roles, ShimmerButton CTA, social icons, scroll indicator.

### ❓ Questions (Phase 2) — Answered
1. **Tagline:** Pitch set in `idx.js → personal.tagline`
2. **CTA links:** `#projects` (scroll)
3. **Background:** `LightRays` chosen and implemented
4. **CTA button:** `ShimmerButton` (replaced `RainbowButton`)

---

## Phase 3 — About Me + Stats + Skills ✅ (DONE)

**Goal:** Who you are, where you are, social proof numbers, and skill grid.

### Tasks
- [x] 3.1 Create `src/sections/HomePage/About.jsx`
- [x] 3.2 Layout: Globe card (left/5-col), bio sidebar (right/7-col), then Skills (7-col) + Stats (5-col) stacked below
- [x] 3.3 Social links row — GitHub, LinkedIn, X using tabler icon buttons, pulled from `idx.js → personal.socials`
- [x] 3.4 Stats column — animated `NumberTicker` cards pulling from `idx.js → about.stats`
- [x] 3.5 Skills grid — BentoCard per category from `idx.js → SkillsAndTools`
- [x] 3.6 Decorative accent — `Globe` with location badge + GMT live indicator

**Result:** Section renders. Globe with live GMT time, bio with socials, skill bento cards, animated stat numbers.

### ❓ Questions (Phase 3) — Pending
1. **Avatar:** Do you have a photo/avatar image to use? If yes — path/URL? If no, initials placeholder is already in place.
2. **Social links:** Any additional platforms beyond GitHub, LinkedIn, X? (Add to `idx.js → personal.socials`)
3. **Stats values:** Are the placeholder numbers in `idx.js` roughly correct?

---

## Phase 4 — "What I Build" — Consistency Heatmap + Stats ✅ (DONE)

**Goal:** Show contribution rhythm and build velocity through a bento grid layout.

### Tasks
- [x] 4.1 `src/components/Heatmap.jsx` — deterministic 52×7 JSX grid using seeded PRNG (no API, deterministic across renders)
- [x] 4.2 Activity card — heading, contribution count, heatmap cells with 5 intensity levels, "Less…More" legend
- [x] 4.3 Stats column — 4 stacked BentoCards using `SpotlightGlow` + Card primitives
- [x] 4.4 Section styling unified: Card + SpotlightGlow + BlurFade throughout
- [x] 4.5 Future GitHub hook: component structure leaves clear integration point for real data

**Result:** Heatmap + stat cards rendered. Deterministic pattern, 4 stat cards with icons from `idx.js → contributions`.

### ❓ Questions (Phase 4)
1. **Heading & copy:** Confirm "What I Build" + "A snapshot of build velocity and open-source output."
2. **Stat card values:** 4,280+ hrs / 150 automations / 38 repos / 120K+ LOC — keep, or update?
3. **Future integration:** Path clear for real GitHub data integration.

---

## Phase 5 — Experience (Timeline) ✅ (DONE)

**Goal:** Work history as a vertical expandable timeline.

### Tasks
- [x] 5.1 Create `src/sections/HomePage/Experience.jsx`
- [x] 5.2 Expandable role cards — company header, role, date range, description paragraph
- [x] 5.3 "Present" → highlighted `Badge` (green dot). Past roles → muted `Badge`.
- [x] 5.4 Skill `Badge`s per role pulled from `idx.js → experience[].tech[]`
- [x] 5.5 Section heading rendered via `GradientHeading` component
- [x] 5.6 Framer Motion `AnimatePresence` height animation for expand/collapse

> **Note:** Uses `framer-motion` `AnimatePresence` for expand/collapse rather than `TracingBeam`. The implementation is functional; `TracingBeam` can be substituted in a future polish pass.

**Result:** Section renders. Expandable role cards with company headers, tech badges, Present indicator.

### ❓ Questions (Phase 5) — Answered
1. **Chronological order:** Founder first (newest), then OSS contributor — confirmed.
2. **More entries:** 2 entries current; add as needed in `idx.js`.
3. **Tech badges:** All `tech[]` items shown per role.

---

## Phase 6 — Education + Certificates 🔄 (Built, needs rework)

**Goal:** Academic credentials and professional certificates.

> Files exist at `src/sections/HomePage/Education.jsx` and `src/sections/HomePage/Certificates.jsx`. Both are functional but require theme-token migration and data-shape fixes before they're production-ready.

### Tasks (rework version)
- [x] 6.1 `src/sections/HomePage/Education.jsx` — card timeline exists, needs rework
- [x] 6.2 `src/sections/HomePage/Certificates.jsx` — marquee card carousel exists, needs rework
- [ ] 6.3 Replace all hardcoded `#1c1b1b`, `text-zinc-xxx`, `border-white/xx` with theme tokens (`bg-surface`, `text-foreground`, `border-border`)
- [ ] 6.4 Fix data-field mismatches: `education[].period` → `education[].start/end`, `certificates[].title` → `certificates[].name`, remove references to non-existent `logo`/`image` fields
- [ ] 6.5 Replace `max-w-4xl mx-auto` in inner wrapper with `<Layout>` delegation (Section already wraps with Layout)
- [ ] 6.6 Integrate `useDockHide` hook so dock hides on scroll into view
- [ ] 6.7 Fix invalid Tailwind values: `w-75`, `w-87.5` (should be `w-60`, `w-[22rem]`), `pl-13` (invalid), `hover:paused` (should be `hover:[animation-play-state:paused]`)

### ❓ Questions
1. **Education layout:** Current card-list style OK, or switch to timeline (same as Experience)?
2. **Certificates:** Are all four placeholders in `idx.js` real? Any to remove or add?
3. **Certificate images:** Do you have badge/logo images for the marquee cards?

---

## Phase 7 — Projects 🔄 (Built, needs rework)

**Goal:** Showcase your best work with filtering.

> File exists at `src/sections/HomePage/Projects.jsx` (187 lines, filterable BentoGrid). Functional but requires theme-token migration, data-shape alignment, and component API alignment.

### Tasks (rework version)
- [x] 7.1 `src/sections/HomePage/Projects.jsx` — filterable BentoGrid exists with All/Web/Automation/Open Source tabs
- [x] 7.2 `BentoGrid` + `BentoCard` layout used
- [x] 7.3 Empty state implemented when filter returns no results
- [ ] 7.4 Replace all hardcoded `#1c1b1b`, `text-zinc-xxx`, `border-white/xx` with theme tokens
- [ ] 7.5 Align `BentoCard` props to actual API — verify `title`, `subtitle`, `Icon`, `badge`, `headerExtra` are valid props (not inline `className` overrides that bypass theme tokens)
- [ ] 7.6 Fix data-field mismatches: `projects[].subtitle` and `projects[].category` may not exist in `idx.js` — align to actual `idx.js → projects[]` fields
- [ ] 7.7 Remove unused imports: `IconFolderOff`, `IconLayersTriangle`
- [ ] 7.8 Integrate `useDockHide` hook

### ❓ Questions
1. **Filter tabs confirmed:** All / Web / Automation / Open Source — keep these or change?
2. **Project data:** Currently two placeholders in `idx.js`. More real projects to add?
3. **Project images:** Screenshots/thumbnails needed, or colored placeholder divs with icon?

---

## Phase 8 — Kanban Board (Current Activities + Vision)

**Goal:** Visual representation of what you're doing now vs. future goals.

### Tasks
- [ ] 8.1 Create `src/sections/HomePage/KanbanBoard.jsx`
- [ ] 8.2 Two columns: "Current Activities" | "Vision"
- [ ] 8.3 Each column: list of cards from `idx.js → kanban`
- [ ] 8.4 Card: title, description, status indicator (colored dot — green in-progress, gray todo, blue done)
- [ ] 8.5 Subtle hover animation — lift + `SpotlightGlow`
- [ ] 8.6 Section heading with tagline

### ❓ Questions
1. **Column headers:** "Current Activities" / "Vision" — good labels?
2. **More cards?** Currently 3 per column in `idx.js`.
3. **Status colors:** Green (in-progress), Gray (todo), Blue (done) — OK?
4. **Drag & drop:** No (static showcase), or yes?

---

## Phase 9 — Blog / Writings Section

**Goal:** Showcase thought leadership with post previews.

### Tasks
- [ ] 9.1 Create `src/sections/HomePage/Blog.jsx`
- [ ] 9.2 Layout: vertical card list or horizontal scroll
- [ ] 9.3 Each card: title, excerpt, formatted date, tags as `Badge`s
- [ ] 9.4 "Read all posts →" link at the bottom
- [ ] 9.5 CommandPalette integration — blog posts from `idx.js → blogs` surface in "Recent Writing" group (palette already wired)
- [ ] 9.6 Show max 3 posts on page; palette shows up to 8

### ❓ Questions
1. **Layout:** Card list or horizontal scroll?
2. **"Read all" link:** Separate `/blog` page or just `#blog` anchor?
3. **Post data:** Three placeholders in `idx.js`. Real posts coming later?

---

## Phase 10 — Contact CTA + Status (Replaces standalone Contact.jsx)

**Goal:** Final conversion section before footer.

> Contact is integrated into `Footer.jsx` ("Let's Talk" mailto button + social links). No separate Contact.jsx is needed — the footer CTA handles conversion.

### Tasks
- [x] 10.1 Contact CTA integrated into `Footer.jsx` — "Let's Talk" mailto anchor + `IconDownload` Resume button
- [x] 10.2 Social links bar inside footer top card (GitHub, LinkedIn, X, Email)
- [ ] 10.3 Optional: Standalone `src/sections/HomePage/Contact.jsx` with `Spotlight` + `ShinyButton` — revisit if footer CTA is insufficient

### ❓ Questions (TODO section implementation)
1. **Standalone Contact section needed?** Footer CTA is the primary conversion point. Confirm if a dedicated section is wanted.
2. **Form:** Real HTML form or styled `mailto:` link only?

---

## Phase 11 — Polish, Scroll Animations & Responsiveness

**Goal:** Smooth feel everywhere, mobile-friendly, production-ready.

### Tasks
- [ ] 11.1 Wrap every section in `BlurFade` for scroll-reveal entrance (some already use it)
- [ ] 11.2 Add `Highlighter` annotations to key phrases — name, role, agency name
- [ ] 11.3 Verify mobile layout at 375 px — all sections readable, no overflow, nav accessible
- [ ] 11.4 Test `SmoothCursor` — verify it disables on touch devices (handled by media query)
- [ ] 11.5 Lazy-load heavy components: `Globe`, `LightRays` via `React.lazy()` + `Suspense`
- [ ] 11.6 `CommandPalette` integration — press ⌘K / Ctrl+K, verify search filters, nav scrolls to sections, social links open
- [ ] 11.7 Add `prefers-reduced-motion` media query — disable animations for users who prefer it

### ❓ Questions
1. **Reduced motion:** Should we respect `prefers-reduced-motion`? (Yes by default, confirming.)
2. **Loading state:** Skeleton/spinner preference while lazy components load?

---

## Phase 12 — Content Fill, SEO & Deploy

**Goal:** Real content, final polish, production build.

### Tasks
- [ ] 12.1 **Fill in** `src/data/idx.js` — all real data (personal info, experience, projects, blogs, etc.)
- [ ] 12.2 Replace placeholder images — avatar, project screenshots
- [ ] 12.3 SEO — add `<title>`, `<meta name="description">`, Open Graph tags
- [ ] 12.4 Favicon — add `favicon.ico` or SVG favicon to `public/`
- [ ] 12.5 Run `npm run build` — zero TS errors, zero lint errors, clean bundle
- [ ] 12.6 Deploy — Vercel recommended (zero-config Vite), or Netlify, or GitHub Pages

### ❓ Questions
1. **Domain:** Do you have a custom domain? Which host?
2. **Deploy target:** Vercel, Netlify, or GitHub Pages? (Vercel recommended)
3. **Analytics:** Plausible / Google Analytics / none? (Plausible recommended.)

---

## Quick-Reference: File Structure (actual, as of last update)

```
src/
├── data/
│   └── idx.js                        ← Single source of truth (all content)
├── lib/
│   └── utils.ts                      ← cn() helper
├── components/
│   ├── ui/                           ← DO NOT ADD FOLDERS — only .tsx files
│   │   ├── animated-beam.tsx
│   │   ├── animated-circular-progress-bar.tsx
│   │   ├── animated-shiny-text.tsx
│   │   ├── aurora-text.tsx
│   │   ├── background-gradient.tsx
│   │   ├── badge.tsx
│   │   ├── bento-grid.tsx
│   │   ├── blur-fade.tsx
│   │   ├── border-beam.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dock.tsx
│   │   ├── dotted-map.tsx
│   │   ├── expandable-list.tsx
│   │   ├── globe.tsx
│   │   ├── glowing-effect.tsx
│   │   ├── Heading.tsx
│   │   ├── highlighter.tsx
│   │   ├── InterfaceCraftCards.tsx
│   │   ├── kinetic-text.tsx
│   │   ├── light-rays.tsx
│   │   ├── marquee.tsx
│   │   ├── number-ticker.tsx
│   │   ├── particles.tsx
│   │   ├── pointer.tsx
│   │   ├── ripple.tsx
│   │   ├── shimmer-button.tsx
│   │   ├── smooth-cursor.tsx
│   │   ├── spotlight-glow.tsx
│   │   ├── spotlight.tsx
│   │   ├── terminal.tsx
│   │   ├── tooltip.tsx
│   │   ├── tracing-beam.tsx
│   │   └── typing-animation.tsx
│   ├── layout/
│   │   ├── AppShell.tsx               ← Phase 1 ✅ (DockVisibilityProvider wraps here)
│   │   ├── Section.jsx                ← Phase 1 ✅
│   │   ├── Layout.jsx                 ← Phase 1 ✅
│   │   └── Footer.jsx                 ← Phase 1 ✅ (Section + badged CTA + dock-hide)
│   ├── nav/
│   │   └── DockVisibilityProvider.jsx ← Phase 1 ✅ (context + useDockHide + AnimatedDock)
│   ├── sections/
│   │   └── HomePage/
│   │       ├── Hero.jsx               ← Phase 2 ✅
│   │       ├── About.jsx              ← Phase 3 ✅
│   │       ├── Contributions.jsx      ← Phase 4 ✅ (heatmap + stat cards)
│   │       ├── Experience.jsx         ← Phase 5 ✅ (expandable timeline)
│   │       ├── FAQ.jsx                ← Bonus ✅ (accordion + dock-hide)
│   │       ├── Projects.jsx           ← Phase 7 🔄 (BentoGrid, needs theme-token rework)
│   │       ├── Education.jsx          ← Phase 6 🔄 (card timeline, needs rework)
│   │       └── Certificates.jsx       ← Phase 6 🔄 (marquee, needs rework)
│   ├── CommandPallete.jsx             ← Phase 1 ✅ (⌘K palette, tabler icons)
│   ├── AvatarStatus.jsx               ← Shared (avatar + online status)
│   ├── ContactCard.jsx                ← Shared (About section social card)
│   ├── Heatmap.jsx                    ← Phase 4 ✅ (deterministic 52×7 grid)
│   ├── StatCard.jsx                   ← Shared (About/Contributions stats)
│   └── TechCard.jsx                   ← Shared (About skills bento card)
└── sections/
    └── HomePage/
        ├── Hero.jsx                  ← Phase 2
        ├── About.jsx                 ← Phase 3
        ├── Contributions.jsx         ← Phase 4 (heatmap + stats)
        ├── Experience.jsx            ← Phase 5
        └── FAQ.jsx                   ← FAQ (bonus)
```

---

## Questions Summary

| # | Question | Phase | Your Answer |
|---|---|---|
| 1 | Nav: Dock / top bar / both / neither? | 1 | Dock + floating TopBar (glass, max-w-7xl) |
| 2 | Logo text (initials / "DA" / something else)? | 1 | "DA" text in TopBar left |
| 3 | Light mode toggle or dark-only? | 1 | Dark-only, no toggle |
| 4 | Tagline / one-line pitch? | 2 | ✅ Settled in `idx.js → personal.tagline` |
| 5 | Hero background: LightRays / Gradient / Shader? | 2 | ✅ `LightRays` chosen and implemented |
| 6 | CTA button: ShimmerButton or RainbowButton? | 2 | ✅ `ShimmerButton` (replaced RainbowButton) |
| 7 | Avatar photo or initials placeholder? | 3 | ❓ |
| 8 | Are placeholder stats/skills roughly correct? | 3 | ❓ |
| 9 | GitHub heatmap: simulated or real API? | 4 | ❓ |
| 10 | Consistency card 2 theme? | 4 | ❓ |
| 11 | Experience: TracingBeam or Framer Motion? | 5 | ✅ Framer Motion `AnimatePresence` used; TracingBeam deferred to polish pass |
| 12 | Tech badges: all `tech[]` or top 3 per role? | 5 | ✅ All shown |
| 13 | Project filter tabs: yes or flat grid? | 7 | ❓ |
| 14 | Kanban: drag-and-drop or static? | 8 | ❓ |
| 15 | Standalone Contact.jsx needed or footer CTA sufficient? | 10 | ❓ |
| 16 | Deploy target: Vercel / Netlify / GitHub Pages? | 12 | ❓ |
| 17 | Analytics: Plausible / GA / none? | 12 | ❓ |
| 18 | Reduced motion: respect `prefers-reduced-motion`? | 11 | ❓ |