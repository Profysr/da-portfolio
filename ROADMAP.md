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

### Tasks
- [x] 1.1 Replace `index.css` theme tokens with the DESIGN.md palette
  - Primary: Electric Violet `#d0bcff`
  - Surfaces: `#131313` background, `#1c1b1b` surface-low, `#201f1f` surface, `#2a2a2a` surface-high
  - Text: `#e5e2e1` foreground, `#cbc3d7` muted
  - Border radius: sm `0.25rem`, md `0.5rem`, lg `0.75rem`, xl `1rem`, 2xl `1.5rem`
- [x] 1.2 Light mode skipped — dark is the only theme
- [x] 1.3 Create `src/components/layout/PageWrapper.jsx` — `max-w-7xl` container, responsive padding
- [x] 1.4 Create `src/components/layout/Section.jsx` — `py-20 sm:py-24 lg:py-28` wrapper with optional `BlurFade` reveal (default on, `noFade` prop to disable)
- [x] 1.5 Update `App.tsx` — floating glass TopBar ("DA" logo left, CommandPaletteButton right) + bottom Dock nav with tooltips + hover backgrounds; palette state (open/close, ⌘K, Esc, PALETTE_OPEN_EVENT) lives here
- [x] 1.6 Update eslint config — include `.jsx` files in lint scope

**Result:** Codebase compiles clean. Dark cinematic theme, floating TopBar + Dock, command palette fully wired with keyboard + button, icons passed as props from `idx.js`.

## Phase 2 — Hero Section ✅ (DONE)

**Goal:** First-screen impact — animated name, headline, CTA buttons, background effect.

### Tasks
- [x] 2.1 Create `src/pages/HomePage/sections/Hero.jsx`
- [x] 2.2 Wire up `AnimatedName` for the name reveal — currently says "Shivy", replaced with actual name suffix cycle
- [x] 2.3 Add `KineticText` or `AuroraText` for the tagline/headline
- [x] 2.4 Add `ShinyButton` CTAs — "View Projects" (scrolls to #projects) + "Get in Touch" (scrolls to #contact)
- [x] 2.5 Background effect — `BackgroundGradient` (animated radial gradient) implemented
- [x] 2.6 Scroll-down indicator — animated chevron at the bottom

**Result:** Hero section live. Name cycles, tagline kinetic, CTAs wired, animated gradient background, scroll indicator in place.

### ❓ Questions (Phase 2) — Answered
1. **Your name:** Name cycle settled (see `idx.js → personal.nameCycle`)
2. **Tagline:** Pitch set in `idx.js → personal.tagline`
3. **CTA links:** Confirmed → `#projects` / `#contact`
4. **Background:** `BackgroundGradient` chosen and implemented

---

## Phase 3 — About Me + Stats + Skills 🔄 (IN PROGRESS)

**Goal:** Who you are, where you are, social proof numbers, and skill grid.

### Tasks
- [x] 3.1 Create `src/sections/HomePage/About.jsx`
- [x] 3.2 Layout: Globe card (left/5-col), bio sidebar (right/7-col), then Skills (7-col) + Stats (5-col) stacked below
- [x] 3.3 Social links row — GitHub, LinkedIn, X using tabler icon `Button` outline variants, pulled from `idx.js → personal.socials`
- [x] 3.4 Stats column — 4 stacked `NumberTicker` cards pulling from `idx.js → stats` (Commits, Projects, DaysSpent, Articles)
- [x] 3.5 Skills grid — BentoCard per category from `idx.js → skills`, 3 cards in a grid (Automations / Engineering / Tools)
- [x] 3.6 Decorative accent — `Globe` with location badge + GMT live indicator, replacing the open `DottedMap` slot

**Result:** Section renders. Globe with live GMT time, bio with avatar + socials, skill bento cards, animated stat numbers.

### ❓ Questions (Phase 3) — Pending
1. **Avatar:** Do you have a photo/avatar image to use? If yes — path/URL? If no, initials placeholder is already in place.
2. **Social links:** Any additional platforms beyond GitHub, LinkedIn, X? (Add to `idx.js → personal.socials`)
3. **Stats values:** Are the placeholder numbers in `idx.js` (2500 commits, 40 projects, 1000 days, 60 articles) roughly correct?
4. **Skills layout:** ✅ BentoCard grid confirmed.

---

## Phase 4 — "What I Build" — Consistency Heatmap + Stats

**Goal:** Show contribution rhythm and build velocity through a bento grid layout.

### Tasks
- [x] 4.1 Create `src/sections/HomePage/Consistency.jsx`
- [x] 4.2 Heatmap — 52×7 JSX grid rendered with deterministic seeded PRNG (no API, no `document.write`, consistent pattern across renders), `consistency.heatmap` config from `idx.js`
- [x] 4.3 Activity card — 8-col span: heading, contribution count, heatmap cells with 5 intensity levels, "Less…More" legend
- [x] 4.4 Stats column — 4-col span: 4 stacked BentoCards (Hours Logged / Automations / Repositories / Lines Committed) using `SpotlightGlow` + `Card` primitives
- [x] 4.5 Section styling unified with About.jsx approach: `Card` + `SpotlightGlow` + `BlurFade` throughout
- [x] 4.6 Future GitHub hook: component structure leaves a clear integration point for real data (see `initiateRealGitHubData()` comment in Consistency.jsx for Phase 11–12 options: Vercel serverless fn, pre-generated JSON at build time, or `VITE_GITHUB_TOKEN` API call)

**Result:** Section renders. Deterministic heatmap, 4 stat cards with icons from `idx.js → consistency`, section heading "What I Build".

### ❓ Questions (Phase 4)
1. **The heading & copy:** "What I Build" + "A snapshot of build velocity and open-source output." — alternate wording?
2. **Stat card values:** 4,280+ hrs / 150 automations / 38 repos / 120K+ LOC — keep, or update to your real numbers?
3. **Future integration:** When you want real GitHub data, the path is clear in Consistency.jsx — confirmed.

---

## Phase 5 — Experience (Timeline with TracingBeam)

**Goal:** Work history as a vertical scroll-linked timeline.

### Tasks
- [ ] 5.1 Create `src/pages/HomePage/sections/Experience.jsx`
- [ ] 5.2 Use `TracingBeam` as the vertical timeline spine (already in `src/components/ui/`)
- [ ] 5.3 Each entry is a `Card` with: role, company, date range, description paragraph, tech `Badge`s
- [ ] 5.4 "Present" → green `Badge` with dot indicator. Past roles → muted `Badge`.
- [ ] 5.5 Data from `idx.js → experience` array
- [ ] 5.6 Section heading with `Heading` component or custom styled `<h2>`

### ❓ Questions
1. **Does the order in `idx.js → experience` match the chronological order you want?** (Currently: Founder first, then OSS contributor — is that right?)
2. **Any experience entries beyond the two placeholders?** If yes, add them to `idx.js` now or as you go.
3. **Tech badges:** Show all `tech[]` items from `idx.js`, or only the top 3–4 per role?

---

## Phase 6 — Education + Certificates

**Goal:** Academic credentials and professional certificates.

### Tasks
- [ ] 6.1 Create `src/pages/HomePage/sections/Education.jsx`
- [ ] 6.2 Education entries — simpler card stack or inline timeline style
- [ ] 6.3 Create `src/pages/HomePage/sections/Certificates.jsx`
- [ ] 6.4 Horizontal scroll carousel using `Marquee` (infinite scroll, pause on hover)
- [ ] 6.5 Each cert card: certificate name, issuer, date, credential link (tabler `IconExternalLink`)
- [ ] 6.6 Data from `idx.js → education` and `idx.js → certificates`

### ❓ Questions
1. **Education layout:** Timeline style (same as Experience) or simple card list?
2. **Certificates:** Are all four placeholders in `idx.js` real? Any to remove or add?
3. **Certificate images:** Do you have badge/logo images? If yes, add `image` field to `idx.js`. If no, skip and use icon-only cards.

---

## Phase 7 — Projects

**Goal:** Showcase your best work with filtering.

### Tasks
- [ ] 7.1 Create `src/pages/HomePage/sections/Projects.jsx`
- [ ] 7.2 Layout: `BentoGrid` with `BentoCard` for each project from `idx.js → projects`
- [ ] 7.3 Each card: project title, description, tech `Badge`s, GitHub/live link buttons
- [ ] 7.4 `BorderBeam` on hover for featured/starred project(s)
- [ ] 7.5 **Filter tabs** — "All" / "Data" / "Web" / "Open Source" (filter by project `tech` overlap with a tag list) — **❓ tabs yes or flat grid?**
- [ ] 7.6 Empty state if filter returns no results

### ❓ Questions
1. **Filter tabs:** Yes or no? (Tab system adds UI complexity — confirm you want it.)
2. **Project data:** Currently two placeholders in `idx.js`. Do you have more real projects to add? Add them now or during content fill?
3. **Project images:** Do you have screenshots/thumbnails? If yes, path pattern? If no, use colored placeholder divs with icon.

---

## Phase 8 — Kanban Board (Current Activities + Vision)

**Goal:** Visual representation of what you're doing now vs. future goals — agency/contributor identity.

### Tasks
- [ ] 8.1 Create `src/pages/HomePage/sections/KanbanBoard.jsx`
- [ ] 8.2 Two columns: "Current Activities" | "Vision"
- [ ] 8.3 Each column: list of cards from `idx.js → kanbanCurrent` / `idx.js → kanbanVision`
- [ ] 8.4 Card: title, description, status indicator (colored dot — green in-progress, gray todo, blue done)
- [ ] 8.5 Subtle hover animation — lift + `SpotlightGlow`
- [ ] 8.6 Section heading with tagline about open source + agency

### ❓ Questions
1. **Column headers:** "Current Activities" / "Vision" — good labels?
2. **More cards?** Currently 3 per column in `idx.js`. Enough or add more?
3. **Status colors:** Green (in-progress), Gray (todo), Blue (done) — OK? Want different colors?
4. **Drag & drop:** No (static showcase), or yes (adds complexity with state management)?

---

## Phase 9 — Blog / Writings Section

**Goal:** Showcase thought leadership with post previews.

### Tasks
- [ ] 9.1 Create `src/pages/HomePage/sections/Blog.jsx`
- [ ] 9.2 Layout: vertical card list (each card = post preview) or horizontal scroll
- [ ] 9.3 Each card: title, excerpt, formatted date, tags as `Badge`s
- [ ] 9.4 "Read all posts →" link at the bottom (links to `/blog` or scrolls to blog section)
- [ ] 9.5 Wire up `CommandPalette` (already built) — blog posts from `idx.js → blogs` should appear in the "Recent Writing" group
- [ ] 9.6 Show max 3 posts on the page; palette shows up to 8

### ❓ Questions
1. **Layout:** Card list or horizontal scroll?
2. **Link behavior:** "Read all" links to a separate `/blog` page (not yet built, Phase 11 stretch) or just `#blog` anchor?
3. **Post data:** Three placeholders in `idx.js`. Real posts coming later, or do you have existing writing to add now?

---

## Phase 10 — Contact CTA

**Goal:** Final conversion section.

### Tasks
- [ ] 10.1 Create `src/pages/HomePage/sections/Contact.jsx`
- [ ] 10.2 `Spotlight` or `SpotlightGlow` on the section container (cursor-following glow)
- [ ] 10.3 `ShinyButton` — "Send me an email" (`mailto:hello@da-portfolio.dev`)
- [ ] 10.4 Social links repeat (GitHub, LinkedIn, X)
- [ ] 10.5 **Optional:** Simple contact form (name + email + message → `mailto:` or a service like Formspree) — **❓ real form or mailto link?**

### ❓ Questions
1. **Form:** Real HTML form (needs backend/Formspree) or just a styled `mailto:` link?
2. **Email address:** Is `hello@da-portfolio.dev` correct, or do you want a different address?

---

## Phase 11 — Polish, Scroll Animations & Responsiveness

**Goal:** Smooth feel everywhere, mobile-friendly, production-ready.

### Tasks
- [ ] 11.1 Wrap every section in `BlurFade` (from `src/components/ui/`) for scroll-reveal entrance
- [ ] 11.2 Add `Highlighter` (rough-notation) annotations to key phrases — your name, "Data Analyst", agency name
- [ ] 11.3 Verify mobile layout at 375 px — all sections readable, no overflow, nav accessible
- [ ] 11.4 Test `SmoothCursor` — verify it disables on touch devices (already handled by media query)
- [ ] 11.5 Lazy-load heavy components: `Globe`, `Particles`, `SmoothCursor` via `React.lazy()` + `Suspense`
- [ ] 11.6 `CommandPalette` integration — press ⌘K / Ctrl+K, verify search filters, nav scrolls to sections, social links open
- [ ] 11.7 Add `prefers-reduced-motion` media query — disable animations for users who prefer it

### ❓ Questions
1. **Reduced motion:** Should we respect `prefers-reduced-motion`? (Yes by default, but confirming.)
2. **Loading state:** Any skeleton/spinner preference while lazy components load? (Or let `Suspense` fallback handle it.)

---

## Phase 12 — Content Fill, SEO & Deploy

**Goal:** Real content, final polish, production build.

### Tasks
- [ ] 12.1 **You fill in** `src/data/idx.js` — all real data (personal info, experience, projects, blogs, etc.)
- [ ] 12.2 Replace placeholder images — avatar, project screenshots (store in `src/assets/` or CDN)
- [ ] 12.3 SEO — add `<title>`, `<meta name="description">`, Open Graph tags to `index.html`
- [ ] 12.4 Favicon — add `favicon.ico` or SVG favicon to `public/`
- [ ] 12.5 Run `npm run build` — verify zero TypeScript errors, zero lint errors, clean production bundle
- [ ] 12.6 Deploy — Vercel recommended (zero-config Vite), or Netlify, or GitHub Pages

### ❓ Questions
1. **Domain:** Do you have a custom domain ready? If yes, which host?
2. **Deploy target:** Vercel, Netlify, or GitHub Pages? (Vercel is fastest for Vite + React.)
3. **Analytics:** Add Plausible / Google Analytics / none? (Plausible recommended for privacy.)

---

## Quick-Reference: File Structure Per Phase

```
src/
├── data/
│   └── idx.js                        ← Single source of truth (all content)
├── hooks/
│   └── use-theme.js                  ← Phase 1
├── components/
│   ├── layout/
│   │   ├── PageWrapper.jsx           ← Phase 1
│   │   └── Section.jsx               ← Phase 1 (BlurFade wrapper)
│   ├── nav/
│   │   └── Navbar.jsx                ← Phase 1 (or remove if Dock-only)
│   ├── sections/
│   │   ├── Footer.jsx                ← Phase 1
│   │   ├── Hero.jsx                  ← Phase 2 (HomePage)
│   │   ├── About.jsx                 ← Phase 3 (HomePage)
│   │   ├── Consistency.jsx           ← Phase 4 (HomePage)
│   │   ├── Experience.jsx            ← Phase 5 (HomePage)
│   │   ├── Education.jsx             ← Phase 6 (HomePage)
│   │   ├── Certificates.jsx          ← Phase 6 (HomePage)
│   │   ├── Projects.jsx              ← Phase 7 (HomePage)
│   │   ├── KanbanBoard.jsx           ← Phase 8 (HomePage)
│   │   ├── Blog.jsx                  ← Phase 9 (HomePage)
│   │   └── Contact.jsx               ← Phase 10 (HomePage)
│   └── effects/
│       └── ShaderBackground.jsx      ← Phase 2 (if choosing shader)
├── sections/
│   └── HomePage/
│       ├── Hero.jsx                  ← Phase 2
│       ├── About.jsx                 ← Phase 3
│       ├── Consistency.jsx           ← Phase 4
│       ├── Experience.jsx            ← Phase 5
│       ├── Education.jsx             ← Phase 6
│       ├── Certificates.jsx          ← Phase 6
│       ├── Projects.jsx              ← Phase 7
│       ├── KanbanBoard.jsx           ← Phase 8
│       ├── Blog.jsx                  ← Phase 9
│       └── Contact.jsx               ← Phase 10
├── pages/
│   └── HomePage/
│       └── HomePage.jsx              ← Assembles all sections from src/sections/HomePage/
└── App.tsx                           ← Root shell (SmoothCursor + Dock, Phase 1)
```

---

## Questions Summary

| # | Question | Phase | Your Answer |
|---|---|---|---|
| 1 | Nav: Dock / top bar / both / neither? | 1 | Dock + floating TopBar (glass, max-w-7xl) |
| 2 | Logo text (initials / "DA" / something else)? | 1 | "DA" text in TopBar left |
| 3 | Light mode toggle or dark-only? | 1 | Dark-only, no toggle |
| 4 | Hero name suffix cycle? | 2 | ✅ Settled in idx.js → personal.nameCycle |
| 5 | Tagline / one-line pitch? | 2 | ✅ Settled in idx.js → personal.tagline |
| 6 | Hero background: Particles / Gradient / Shader? | 2 | ✅ BackgroundGradient chosen and implemented |
| 7 | Avatar photo or initials placeholder? | 3 | ❓ |
| 8 | Are placeholder stats/skills roughly correct? | 3 | ❓ |
| 9 | Skills: badges or BentoGrid cards? | 3 | ❓ |
| 10 | GitHub heatmap: simulated or real API? | 4 | ❓ |
| 11 | Consistency card 2 theme? | 4 | ❓ |
| 12 | Project filter tabs: yes or flat grid? | 7 | ❓ |
| 13 | Kanban: drag-and-drop or static? | 8 | ❓ |
| 14 | Contact: real form or mailto link? | 10 | ❓ |
| 15 | Deploy target: Vercel / Netlify / GitHub Pages? | 12 | ❓ |
| 16 | Analytics: Plausible / GA / none? | 12 | ❓ |