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

> **Note:** Uses `motion` `AnimatePresence` for expand/collapse rather than `TracingBeam`. The implementation is functional; `TracingBeam` can be substituted in a future polish pass.

**Result:** Section renders. Expandable role cards with company headers, tech badges, Present indicator.

### ❓ Questions (Phase 5) — Answered
1. **Chronological order:** Founder first (newest), then OSS contributor — confirmed.
2. **More entries:** 2 entries current; add as needed in `idx.js`.
3. **Tech badges:** All `tech[]` items shown per role.

---

## Phase 6 — Education + Certificates ✅ (DONE)

**Goal:** Academic credentials and professional certificates.

### Tasks
- [x] 6.1 `src/sections/HomePage/Education.jsx` — BentoCard grid, expand/collapse, theme tokens, data-driven from `idx.js → education`
- [x] 6.2 `src/sections/HomePage/Certificates.jsx` — infinite marquee carousel using `Marquee` component, theme tokens, Layout wrapper
- [x] 6.3 Education data shape updated — `image, company, role, date, location, skills[], href`
- [x] 6.4 Certificates: `cert.name` (not `cert.title`), no `cert.image` field, valid Tailwind throughout

### ❓ Questions (Phase 6) — Answered
1. **Education layout:** Card grid (BentoGrid 2-col on desktop) — confirmed.
2. **Certificates:** All four placeholders in `idx.js` kept. `Marquee` carousel with `pauseOnHover` — confirmed.
3. **Certificate images:** No `image` field — renders `IconAward` always. Add later when you have badge images.

### ❓ Questions (Phase 7) — Answered
1. **Filter tabs:** Kept — All / Web / Automation / Open Source (data now has `category` field).
2. **Project data:** Enriched to 4 entries with `subtitle, category, tags, isFeatured, githubUrl, liveUrl, image`.
3. **Project images:** `image` field added to data — currently all `null`. Add real paths when screenshots are available.

---

## Phase 7 — Projects ✅ (DONE)

**Goal:** Showcase your best work with filtering.

### Tasks (completed)
- [x] 7.1 `src/sections/HomePage/Projects.jsx` — filterable BentoGrid with All/Web/Automation/Open Source tabs
- [x] 7.2 `idx.js → projects[]` enriched — `subtitle, category, tags, isFeatured, githubUrl, liveUrl, image` fields added
- [x] 7.3 Each card: project title, description, tech `Badge`s, GitHub/live link buttons via `BentoCard` API
- [x] 7.4 Featured/star logic — `isFeatured` field drives `headerExtra` badge + `md:col-span-8` layout
- [x] 7.5 Filter tabs working — `category` field drives tab filter
- [x] 7.6 Empty state with reset button when filter returns no results
- [x] 7.7 All hardcoded colors replaced with theme tokens
- [x] 7.8 Filter tabs unified via `TagFilter` component (replaced inline pill pattern)

### ❓ Questions — Answered
1. **Filter tabs confirmed:** All / Web / Automation / Open Source — keep these or change?
2. **Project data:** Expand as needed in `idx.js`.
3. **Project images:** `image` field added to data — currently all `null`. Add real paths when screenshots are available.

---

## Phase 8 — Activities & Writings ✅ (DONE)

**Goal:** Combine Kanban Board (Current Activities + Vision) and Blog/Writings into one unified, data-driven section.

> **Decision:** Rather than building a separate `KanbanBoard.jsx` (Phase 8) and `Blog.jsx` (Phase 9), both were merged into a single `src/sections/HomePage/Activities.jsx` component. The Kanban "columns" are now rendered as two distinct blocks:
> - **Block 1: Side Projects & Open Source** — maps to "Current Activities" (Kanban duties)
> - **Block 2: Writings & Community Contributions** — maps to Blog/Writings
>
> This reduces component count and gives a cleaner, editorial layout with two-column grid rows (description left, list right) via `ActivityRow`.

### Tasks
- [x] 8.1 Create `src/sections/HomePage/Activities.jsx` — replaces both `KanbanBoard.jsx` and `Blog.jsx`
- [x] 8.2 Two blocks: "Side projects and things I'm building" (Kanban/current-activities) | "Writings & community contributions" (Blog/writings)
- [x] 8.3 Each block uses `ActivityRow` — title, description snippet, and "View" link badge with `IconArrowUpRight`
- [x] 8.4 Data sourced from `idx.js → sideProjects[]` and `communityWritings[]`
- [x] 8.5 Layout: two-column grid — left column holds section heading + description text, right column holds the row list with top border
- [x] 8.6 Section heading rendered via standard HTML + section body in `Layout`

### ❓ Questions (Phase 8) — Answered via merged approach
1. **Combined section confirmed:** Activities + Writings merged into one `Activities.jsx`, not two separate sections.
2. **Card structure:** Row-based list (not Kanban cards) chosen for readability and consistent spacing.
3. **Data fields:** `title`, `description`, `link` per item; pulls from `idx.js`.

## Phase 9 — Blog / Writings Section ✅ (DONE — merged into Phase 8 / Activities.jsx)

**Goal:** Showcase thought leadership with post previews.

> **Merged into Phase 8.** The "Blog / Writings" functionality is fully covered by Block 2 of `Activities.jsx` ("Writings & community contributions"). No separate `Blog.jsx` was created.

### Tasks (completed via Activities.jsx Block 2)
- [x] 9.1 `Activities.jsx` — Block 2 covers the writings section
- [x] 9.2 Layout: vertical row list (description left, list right) via `ActivityRow`
- [x] 9.3 Each row: title, excerpt (description), "View" action link — works as post previews
- [x] 9.4 Data sourced from `idx.js → communityWritings[]` with `title, description, link`
- [x] 9.5 No separate "Read all posts →" link needed — section is self-contained as part of combined two-block layout

### ❓ Questions (Phase 9) — Answered
1. **Layout:** Vertical row list inside a two-column grid — confirmed.
2. **"Read all" link:** Not needed as separate element; blocks read as a continuous editorial section.
3. **Post data:** 4 entries in `idx.js → communityWritings[]`. Expand as needed.

---

## Phase 10 — Contact CTA + Status ✅ (DONE)

**Goal:** Final conversion section — handled via the Footer.

> Contact conversion is fully handled in `Footer.jsx` ("Let's Talk" mailto anchor + Resume download + social links). No standalone `Contact.jsx` was created — the footer CTA is the primary conversion point.

### Tasks
- [x] 10.1 Contact CTA integrated into `Footer.jsx` — "Let's Talk" mailto anchor + `IconDownload` Resume button
- [x] 10.2 Social links bar inside footer top card (GitHub, LinkedIn, X, Email)
- [x] 10.3 Standalone `Contact.jsx` deemed unnecessary — footer CTA is sufficient; marked as not needed

### ❓ Questions (Phase 10) — Answered
1. **Standalone Contact section:** Not needed — footer CTA handles conversion.
2. **Form:** `mailto:` link sufficient for now; no HTML form required.

---

## Phase 11 — Polish, Scroll Animations & Responsiveness

**Goal:** Smooth feel everywhere, mobile-friendly, production-ready.

### Tasks
- [x] 11.1 `TagFilter` component created at `src/components/TagFilter.jsx` — unified pill/filter replacing inline patterns in TechStack, Credentials, and Projects sections
- [x] 11.2 TechStack filter → migrated to `TagFilter` (string array items)
- [x] 11.3 Credentials filter → migrated to `TagFilter` (object array with `count`)
- [x] 11.4 Projects filter → migrated to `TagFilter` (string array items)
- [ ] 11.5 Wrap remaining unwrapped sections in `BlurFade` for scroll-reveal entrance
- [ ] 11.6 Add `Highlighter` annotations to key phrases — name, role, agency name
- [ ] 11.7 Verify mobile layout at 375 px — all sections readable, no overflow, nav accessible
- [ ] 11.8 Test `SmoothCursor` — verify it disables on touch devices (handled by media query)
- [ ] 11.9 Lazy-load heavy components: `Globe`, `LightRays` via `React.lazy()` + `Suspense`
- [ ] 11.10 `CommandPalette` integration — press ⌘K / Ctrl+K, verify search filters, nav scrolls to sections, social links open
- [ ] 11.11 Add `prefers-reduced-motion` media query — disable animations for users who prefer it

### ❓ Questions
1. **Reduced motion:** Should we respect `prefers-reduced-motion`? (Yes by default, confirming.)
2. **Loading state:** Skeleton/spinner preference while lazy components load?

---

## Phase 13 — Detail Pages: Data Layer 🟡 (NEXT)

**Goal:** Prepare the data layer so detail pages have something to render. No UI changes yet.

> **Context:** Activities.jsx currently uses static `SIDE_PROJECTS` and `COMMUNITY_WRITINGS` from `src/data/activities.ts`. We're splitting this into two reusable data sources: `projects.js` (expanded) and a renamed `writings.js` (was `blogs.js`). Each entry gains `slug` (URL) and `content` (markdown body). Side projects merge into `projects.js` with `isActivity: true`.

### Tasks
- [ ] 13.1 Add `slug`, `content` to all entries in `src/data/projects.js` (4 main projects + 4 side projects merged from `activities.ts`)
- [ ] 13.2 Add `isActivity: true, featured: false` to side-projects so they don't appear in homepage Projects grid but appear in Activities
- [ ] 13.3 Add optional `changelog: [...]` field to project entries where applicable (none of the 8 initial projects need it)
- [ ] 13.4 Rename `src/data/blogs.js` → `src/data/writings.js`; add `slug`, `content` to each entry
- [ ] 13.5 Update `src/data/idx.js` barrel: `export * from "./writings"` (was `./blogs`)
- [ ] 13.6 Delete `src/data/activities.ts`
- [ ] 13.7 Update import in `src/components/CommandPallete.jsx`: `blogs` → `writings`
- [ ] 13.8 Update import in `src/lib/botApi.ts`: `blogs` → `writings`
- [ ] 13.9 Build passes; all imports resolve

### ❓ Questions (Phase 13) — Answered
1. **Schema shape:** Each project entry has `slug`, `content` (markdown string), optional `changelog`. Each writing entry has `slug`, `content`.
2. **Side-project location:** Merged into `projects.js` (not kept separate).
3. **isActivity flag:** Drives whether entry appears in Activities section or homepage Projects grid.

### Checkpoint
Show one final project entry + one final writing entry for approval before Phase 14.

---

## Phase 14 — ReadingLayout + Slug Lookup Helper

**Goal:** Build the minimal reading layout that wraps all detail pages. Verify in isolation before wiring real routes.

### Tasks
- [ ] 14.1 Create `src/lib/content.js` — `getProjectBySlug(slug)` and `getWritingBySlug(slug)` lookup helpers
- [ ] 14.2 Create `src/components/layout/ReadingLayout.jsx` — minimal layout: back button (top-left), breadcrumbs (Writing/Title or Projects/Title), `<Outlet />` for page, full Footer at bottom
- [ ] 14.3 Add temporary `<Route element={<ReadingLayout />}><Route path="/reading-demo" element={<div>Demo</div>} /></Route>` to `src/App.tsx` to verify layout in isolation
- [ ] 14.4 Visual check: navigate to `/reading-demo`, confirm back button + breadcrumbs + Footer render correctly

### ❓ Questions (Phase 14) — Answered
1. **Footer inclusion:** Yes — full Footer component (Let's Talk + socials + resume download) at the bottom of every detail page.
2. **Breadcrumbs:** Show "Writing / {title}" or "Projects / {title}" depending on route.

### Checkpoint
Screenshot the layout for approval before Phase 15.

---

## Phase 15 — WritingDetail Page

**Goal:** First end-to-end detail page. Validates the routing pattern + markdown rendering before adding the more complex ProjectDetail.

### Tasks
- [ ] 15.1 Create `src/pages/WritingDetail.jsx` — uses `useParams()` → `getWritingBySlug()` → renders hero (title, formatted date, tags, readTime), `<Streamdown>` for content, back link
- [ ] 15.2 404 fallback — if slug not found, render a "Not Found" message inside ReadingLayout with back button (not a redirect)
- [ ] 15.3 Add `<Route path="/writing/:slug" element={<WritingDetail />} />` inside ReadingLayout in `src/App.tsx`
- [ ] 15.4 Link Activities.jsx Block 2 rows to `/writing/:slug` (replace static `#` links)
- [ ] 15.5 Visual check: click each writing row → detail page renders correctly → back button returns to home

### ❓ Questions (Phase 15) — Answered
1. **Streamdown:** Already installed with code/math/mermaid plugins configured (used in MessageResponse). Reuse directly.

### Checkpoint
Click through all writings, confirm markdown rendering looks right, approve Phase 16.

---

## Phase 16 — ProjectDetail Page

**Goal:** Project detail page with tech chips, GitHub/Live buttons, optional "View Changelog" link.

### Tasks
- [ ] 16.1 Create `src/pages/ProjectDetail.jsx` — same pattern as WritingDetail plus:
  - Tech chips (reuse `TechPill` component from earlier work)
  - GitHub button (if `github` field set, not `"#"`)
  - Live Demo button (if `live` field set, not `"#"`)
  - "View Changelog" button (only if `project.changelog` field exists) → `/projects/:slug/changelog`
- [ ] 16.2 404 fallback identical to WritingDetail
- [ ] 16.3 Add `<Route path="/projects/:slug" element={<ProjectDetail />} />` inside ReadingLayout in `src/App.tsx`
- [ ] 16.4 Add "Read Docs" button to `src/sections/HomePage/Projects.jsx` cards → links to `/projects/:slug`
- [ ] 16.5 Link Activities.jsx Block 1 rows to `/projects/:slug`
- [ ] 16.6 Visual check: click any project card (homepage Projects + Activities) → detail renders all metadata + markdown

### Checkpoint
Click through both Activities (Block 1) and homepage Projects, confirm both flow correctly, approve Phase 17.

---

## Phase 17 — ProjectChangelog Page

**Goal:** Timeline-style changelog view adapted from `changelog-template/app/page.tsx`. Vertical timeline with sticky dates + version bubbles + markdown content per entry.

### Tasks
- [ ] 17.1 Create `src/pages/ProjectChangelog.jsx` — adapted timeline layout:
  - Header: project title + back-to-project link
  - Left column: sticky date + version bubble (e.g. "v0.3")
  - Right column: tags (Badge components) + `<Streamdown>` content
  - Vertical timeline line with primary-color dot per entry
- [ ] 17.2 404 fallback if project doesn't exist OR has no `changelog` field
- [ ] 17.3 Add `<Route path="/projects/:slug/changelog" element={<ProjectChangelog />} />` inside ReadingLayout in `src/App.tsx`
- [ ] 17.4 Since none of the 8 initial projects have changelog data, optionally add a placeholder changelog to one project entry for visual verification (ask user)

### ❓ Questions (Phase 17)
1. **Sample changelog:** Should I add a placeholder changelog to one project (e.g. `proj-3` RPA Clinical Automation Suite) for visual testing, or skip until real data exists?

### Checkpoint
Screenshot a sample changelog render for approval.

---

## Phase 18 — Polish, 404s, Scroll Restoration

**Goal:** Production-ready edge cases.

### Tasks
- [ ] 18.1 Custom "Not Found" component for slug-not-found (better UX than blank page)
- [ ] 18.2 Add `<ScrollToTop>` component to `App.tsx` — scrolls to top on route change (React Router doesn't do this by default)
- [ ] 18.3 Verify back button works in all 3 detail page types
- [ ] 18.4 Mobile responsiveness at 375 px — all 3 detail pages readable
- [ ] 18.5 Verify all routes load without console warnings
- [ ] 18.6 Build passes clean

### Checkpoint
Run through all routes on mobile + desktop, approve.

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
│   │   ├── TagFilter.jsx             ← Phase 11 ✅ (shared pill filter: TechStack, Credentials, Projects)
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
│   │       ├── TechStack.jsx          ← Phase 4 ✅ (categorized tools grid + TagFilter)
│   │       ├── Experience.jsx         ← Phase 5 ✅ (expandable timeline + dotted-map bg)
│   │       ├── Credentials.jsx        ← Phase 6 ✅ (Education/Certificates/Awards + TagFilter)
│   │       ├── Projects.jsx           ← Phase 7 ✅ (filterable BentoGrid + TagFilter)
│   │       ├── Activities.jsx         ← Phase 8+9 ✅ (Side Projects + Writings combined)
│   │       └── FAQ.jsx                ← Bonus ✅ (accordion + dock-hide)
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
        ├── TechStack.jsx             ← Phase 4 (tools grid)
        ├── Experience.jsx            ← Phase 5 (dotted-map bg)
        ├── Credentials.jsx           ← Phase 6 (ed/certs/awards)
        ├── Projects.jsx              ← Phase 7 (BentoGrid + TagFilter)
        ├── Activities.jsx            ← Phase 8+9 (side projects + writings)
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
| 13 | Project filter tabs: yes or flat grid? | 7 | ✅ Kept — All / Web / Automation / Open Source via `TagFilter` |
| 14 | Kanban: separate board or merged into Activities? | 8 | ✅ Merged — no standalone KanbanBoard.jsx; Activities.jsx covers both Kanban + Writings |
| 15 | Standalone Contact.jsx needed or footer CTA sufficient? | 10 | ✅ Footer CTA sufficient — no standalone Contact.jsx needed |
| 16 | Deploy target: Vercel / Netlify / GitHub Pages? | 12 | ❓ |
| 17 | Analytics: Plausible / GA / none? | 12 | ❓ |
| 18 | Reduced motion: respect `prefers-reduced-motion`? | 11 | ❓ |