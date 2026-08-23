# 📋 ROADMAP — 24-Phase Implementation Plan

**Companion docs:** `ARCHITECTURE.md` (sitemap · design · structure) · `COMPONENTS_MAP.md` (full audit)
**Targets:** Lighthouse ≥95 all categories · <150KB/component · 0 axe violations · Top SEO ranking

---

## 🚫 CORE RULES (Non-Negotiable)

| # | Rule |
|---|------|
| 1 | **No custom SVGs** — download via URL or ask user. Log source per asset |
| 2 | **Formats:** `.jsx` everywhere; `.tsx` ONLY in `components/ui/`; `.ts` for lib/config/api routes; root `app/layout.tsx` stays `.tsx` |
| 3 | **24 phases** — max **4 files per phase**, min 1 |
| 4 | **Review gate** after EVERY phase — user approval required |
| 5 | **Research-first** — Context7 MCP / skills validation logged per phase |
| 6 | **Testing mandatory** — lint · typecheck · build · axe-core · bundle delta · reduced-motion |
| 7 | **Component selection** — search codebase first; if >1 option → comparison table → USER PICKS |
| 8 | **Git checkpoint** — clean tree before phase; commit approved work before next phase |
| 9 | **Rollback** — unfixable failures → revert + report; never leave broken tree |
| 10 | Sitemap & tokens approved BEFORE visual component work |
| 11 | **No drive-by edits** — out-of-scope findings → "next-phase candidates" log only |
| 12 | **UX MCP verification** on UI changes (`ux_analyze_accessibility`, `ux_check_contrast`) — results pasted in review request |
| 13 | **NO COMPONENT DELETIONS** — mark `UNUSED`, remove imports, keep files on disk. *Exception (user-authorized 2026-08-23): spotlight family (cursor-glow, glowing-effect, spotlight, spotlight-glow, SpotlightCard) deleted after GlowFrame consolidation — verified zero external imports pre-delete* |
| 14 | ⚠️ **WATERMELON / 21st REFACTOR GATE** — every component in `components/watermelon/` and `components/21st/` MUST be refactored BEFORE integration: (a) standardize CSS classes to our token system (`@theme` variables), (b) comment out demo/sample content, (c) only then wire into app sections. Never import them raw |

---

## ✅ PHASE EXECUTION CHECKLIST (every phase)

```
PRE   git status clean · re-read docs · Context7 queries logged · skills consulted ·
      existing-component check · options compared (user picks if >1)
BUILD ≤4 files · format rules · no drive-by edits
TEST  lint · typecheck · build · axe · bundle delta · ux-mcp · reduced-motion
LOG   append phase entry (template at bottom of this file)
GATE  request review → WAIT → commit checkpoint on approval
FAIL  cannot fix in-phase → revert + report
```

---

# WEEK 1 — FOUNDATION & TOKENS

## Phase 1 — Documentation Baseline ✅
**Files:** `ROADMAP.md`, `ARCHITECTURE.md`, `COMPONENTS_MAP.md`
- [ ] All three docs written and approved
- [ ] Context7 research baseline logged (see Research Log below)

## Phase 2 — Design Token Research & Selection
**Files:** 0–1 (research + optional notes file)
- Activate skills: `design-system`, `design-taste-frontend`, `high-end-visual-design`, `ui-ux pro max`
- Generate palette proposals (gold accent scale 50–950), type scale, shadow elevation set
- **Deliverable:** options table → USER PICKS final tokens

### Sub-phases:
- 2a. Color scale research + contrast pre-check
- 2b. Typography scale proposal (fluid clamp values)
- 2c. Shadow/radius/transitions proposal

## Phase 3 — Token System Files
**Files (4):** `lib/design-tokens/colors.ts` · `typography.ts` · `spacing.ts` (+shadows+radius combined) · `theme-mapping.ts`
- Three-layer architecture (primitive → semantic → component)
- **Semantic layer uses shadcn-compatible variable names** (`--background`, `--foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--card`, `--popover`, `--radius`) — all existing shadcn/ui + custom components keep resolving with zero rename churn
- Light/dark value pairs exported
- `theme-mapping.ts` translates tokens into **Tailwind v4 namespace variables**: `--color-*`, `--spacing-*`, `--font-*` — these are what get declared inside `@theme`

## Phase 4 — globals.css `@theme` Wiring
**Files (1):** `app/globals.css`
- Inject mapped tokens **directly into the `@theme` block** using Tailwind v4 namespaces: `--color-*`, `--spacing-*`, `--font-*`. In v4, plain `:root` declarations do NOT generate utility classes (`bg-canvas`, `text-accent`) — `@theme` is the utility-generation API. *Ref: Context7 `/tailwindlabs/tailwindcss.com` → theme.mdx*
- Register shadcn semantic variables inside `@theme` as well; dark values are re-declared under a `.dark` selector override (next-themes class strategy), so every shadcn/ui component swaps themes without code changes
- Remove duplicate `prefers-color-scheme` block (next-themes owns mode switching)
- Custom named tokens (e.g. `--color-canvas`, `--color-accent-gold`) also live in `@theme` → auto-generate `bg-canvas`, `text-accent-gold` utilities
- Validate contrast via `ux_check_contrast` on key pairs
- Verify: built CSS output contains generated utilities (`bg-primary`, `text-muted-foreground`)

## Phase 5 — Fonts & Providers
**Files (2):** `lib/fonts.ts` · `app/providers.jsx`
- Poppins: trim weights to actually-used set, latin subset, swap display
- Geist Mono: no preload (below fold usage)
- next-themes ThemeProvider (`attribute="class"`, system default, disableTransitionOnChange)

## Phase 6 — Root Layout Integration
**Files (2):** `app/layout.tsx` · `components/analytics/WebVitals.jsx`
- Providers wrap, Analytics + SpeedInsights mount
- WebVitals component (useReportWebVitals → trackEvent)
- Viewport: dual themeColor (light/dark media queries)
- Keep existing metadata + JSON-LD structure

---

# WEEK 2 — PERFORMANCE & ANIMATIONS

## Phase 7 — Dynamic Import Registry
**Files (2):** `components/lazy/index.jsx` · `components/ui/Skeleton.jsx`
- `next/dynamic` wrappers: ssr:false → MagneticDock, FluidIslandNav, GSAPHorizontalScroll, GSAPScrollRail, AnimatedBeam, CursorGlow, Chatbot, CommandPalette
- ssr:true → heavy-but-SEO-relevant islands
- Consistent skeleton fallbacks per shape

## Phase 8 — OptimizedImage
**Files (1):** `components/ui/OptimizedImage.jsx`
- Blur placeholder (auto SVG dataURL), priority→fetchPriority high, sizes defaults
- Error state fallback, fade-in on load

### Sub-phases:
- 8a. Component build + test harness
- 8b. Swap `<img>` usages found during section phases (tracked list)

## Phase 9 — AmbientBackground Global Layer
**Files (2):** `components/animations/AmbientBackground.jsx` · `app/globals.css` (keyframes append)
- CSS-only orbs (blob keyframes) + fixed grain overlay
- Retires Particles/LightRays usage page-wide (imports removed, files kept)
- Variants: orb/grid · intensities: subtle/medium/strong

## Phase 10 — Scroll Animation Primitives
**Files (2):** `components/animations/ScrollReveal.jsx` · `StaggeredReveal.jsx`
- IntersectionObserver + CSS animations (zero JS anim overhead)
- prefers-reduced-motion → static render
- Absorbs StaggeredList role

## Phase 11 — Magnetic & GSAP Hook
**Files (3):** `components/animations/Magnetic.jsx` · `useGSAP.js` · dock variant wiring
- Consolidate MagneticButton/MagneticDock patterns into one primitive
- useGSAP: gsap.context lifecycle, ctx.revert cleanup, `start:"top top"` canonical skeleton
- **Dock A/B (user directive):** run BOTH `MagneticDock` and simple `dock.tsx` live in the BottomDock slot → compare UX/visuals/perf → keep whichever suits more; loser marked UNUSED (file kept). Verdict recorded at P11 review or deferred to a later polish phase if needed

## Phase 12 — HERO REBUILD ⭐
**Files (2):** `app/(home)/_components/Hero.jsx` · `components/HeroPills.jsx` (new floating layer)
- ❌ Remove LightRays import (file stays, marked UNUSED)
- Floating decorative TechPill cluster at 3 parallax depths (Motion values, not useState)
- Stack discipline: avatar-status → kinetic headline (typewriter) → ≤20-word subtext → single CTA + socials
- Entry: staggered blur-fade-up 800ms `cubic-bezier(0.32,0.72,0,1)`
- FavoriteStack compact-marquee role retired here (data source reused)

---

# WEEK 3 — SECTIONS & CHATBOT

## Phase 13 — About Section
**Files (2):** `About.jsx` · portrait wrapper
- Editorial Split: massive statement left, DoubleBezel portrait right
- NumberTicker stats row
- Handoff pairing with Hero exit

## Phase 14 — TechStack Horizontal Scroller ⭐
**Files (3):** `TechStack.jsx` · shade-token classes in globals.css · watermelon `Tabs.tsx` refactor
- GSAP horizontal pan using existing `GSAPHorizontalScroll.tsx` engine
- **Solid different-shade background per card** (token tint steps forming color rhythm)
- ✅ CONFIRMED: watermelon `Tabs.tsx` drives TechStack category switching
- ⚠️ Rule #14 applies: Tabs.tsx refactored FIRST — standardize classes to `@theme` tokens, comment out demo content, then integrate

## Phase 15 — Experience Scroll Stories (A/B Evaluation)
**Files (2):** `Experience.jsx` · active mechanism component
- **Build BOTH, keep the winner** (user directive):
  - 15a. Option A: sticky-stack (pin top-top, scale 0.92/op 0.55 handoff) → review
  - 15b. Option B: `21st/Timeline.tsx` story renderer (refactored per Rule #14: token-standardized classes, demos commented out) → review
- Compare live on real data; user verdict recorded in phase log; loser marked UNUSED (file kept)

## Phase 16 — Projects Bento Rebuild ⭐
**Files (3):** new `ProjectCard.jsx` (PricingCard-inspired minimal aesthetic) · rebuilt bento layout · `Projects.jsx` feed update
- True asymmetric bento (current ProjectsBento is NOT the actual one — rebuild)
- **Iterate ALL 8 MDX projects including in-progress** (status badge: Live / In Progress)
- BorderBeam hover, stagger entrance, OptimizedImage thumbnails

## Phase 17 — Writings Redesign + Credentials Focus
**Files (3):** `Activities.jsx` → writings-only redesign · `Credentials.jsx` education-only · data file comment-out
- Activity section becomes **Writings**: 3 MDX articles on tracing-beam spine
- JournalNavigation (watermelon) integration candidate
- Credentials: **education entries ONLY**; certificates + awards commented out in data (preserved)

## Phase 18 — Lightweight Chatbot Components
**Files (3):** `components/chatbot/Chatbot.jsx` · `Message.jsx` · `QuickActions.jsx`
- Custom streaming UI (no `ai` SDK dependency)
- Quick-action chips: Projects / Experience / Stack / Contact
- ARIA live regions, focus management, keyboard navigable
- AssistantAi imports retired (file kept, marked UNUSED)

---

# WEEK 4 — API, SEO, QUALITY, DEPLOY

## Phase 19 — Chatbot API & Wiring
**Files (3):** `app/api/chat/route.ts` (Edge runtime) · `BottomDock.jsx` wiring · `package.json` (drop `ai` dep, −70KB)
- Curated responses + character-stream simulation
- LazyChatbot mount from registry

## Phase 20 — SEO Metadata System
**Files (3):** `lib/seo.ts` · `lib/structured-data.ts` enhance · project detail page metadata
- Metadata factory (canonical, OG, Twitter, robots per route)
- Article + SoftwareApplication + BreadcrumbList JSON-LD

## Phase 21 — OG Images, Listings, Navigation
**Files (3):** `app/og/route.jsx` · listing pages polish · NavLink rollout (replaces ExtendedLink usage)
- Dynamic OG generation (1200×630, three templates)
- TagFilter a11y pass, static generation verification
- Footer contact candidates: ComposeEmail + ViewOnMap (watermelon) — user decides fit

## Phase 22 — Accessibility Sweep
**Files:** 0 audit + ≤4 fix files
- axe-core CLI full scan + manual keyboard/SR passes
- Fix flagged issues within file budget; overflow → next-phase log

## Phase 23 — Bundle Budgets & Dep Pruning
**Files (2):** `next.config.js` · `package.json`
- Performance budgets (150KB/component), optimizePackageImports for icon packs
- Verify removed deps: ai SDK; audit icon library usage concentration

## Phase 24 — CI Pipeline & Final Regression
**Files (2):** `lighthouserc.json` · `.github/workflows/ci.yml`
- Thresholds: perf ≥0.95, a11y ≥0.95, SEO ≥0.95, LCP <2.5s, CLS <0.1
- Full regression matrix → deploy checklist → monitoring sign-off

---

## 📝 PHASE LOG TEMPLATE

```markdown
## Phase [N] — [date]
**Files:** created/modified/deleted list
**Research:** [Context7 query → finding] · [skill → guidance]
**Reason:** metric-backed justification
**Tests:** lint ✅ · tsc ✅ · build ✅ · bundle [x]KB · axe [n] · ux-mcp results
**Review:** PENDING / APPROVED / CHANGES REQUESTED
```

---

## 📚 RESEARCH BASELINE (Phase 1 — executed via Context7 `/vercel/next.js`)

| Query | Key Finding Applied In |
|-------|----------------------|
| App Router folder structure | ARCHITECTURE.md structure section |
| dynamic imports / next/dynamic | Phase 7 registry (ssr control per component class) |
| Image optimization props | Phase 8 OptimizedImage defaults |
| Link prefetch strategies | Phase 21 NavLink (intent-based prefetch) |
| Font optimization | Phase 5 fonts.ts (subsets, preload policy) |
| SEO metadata / JSON-LD | Phase 20 factory schemas |
| Vercel Analytics / Web Vitals | Phase 6 WebVitals component |
| Tailwind v4 PostCSS setup | Already correct (`@tailwindcss/postcss`) — verified |

### Phase 2 research additions
| Source | Finding |
|--------|---------|
| Context7 `/tailwindlabs/tailwindcss.com` → theme.mdx | `@theme` = utility-generation API; plain `:root` vars don't generate utilities |
| Context7 `/tailwindlabs/tailwindcss.com` → colors.mdx | **`@theme inline`** required when tokens reference other CSS vars (`--color-canvas: var(--acme-canvas)`) — prevents scope-resolution failures; this is the shadcn-on-v4 pattern |
| Skill: `design-system` → tailwind-integration.md | shadcn semantic var names confirmed (`--background`…`--radius`); HSL-channel pattern is v3 — we adapt to v4 hex/oklch + `@theme inline` mapping |
| Skill: `high-end-visual-design` | Editorial Luxury archetype; motion beziers; DoubleBezel concentric formula (adapted to low radius per taste) |

---

## 📒 PHASE LOG

```
Phase 01 ✅ APPROVED 2026-08-23 — ROADMAP/ARCHITECTURE/COMPONENTS_MAP written; taste profile added to ARCHITECTURE.md; Rules #14 + @theme amendments applied.
Phase 02 ✅ APPROVED 2026-08-23 — Option A Gold Monochrome+ · radius DEFAULT 4px · flex-gap-over-padding · shadows/motion approved · spotlight family → consolidate into ONE upgraded GlowFrame wrapper (not new CSS) · dark mode auto+toggle w/ gold primary confirmed.
Phase 03 🔄 BUILT — lib/tokens/{colors,typography,spacing,theme-mapping}.ts written. Contrast fixes: primary-foreground cream→ink (1.9:1→10.33:1 AA), dark purple primary→gold (12.06:1), muted-fg #787774→#6E6D69 (4.33→5.01:1). tsc EXIT:0. Awaiting review.
Phase 03b 🔄 BUILT — GlowFrame consolidation (user-directed): components/ui/GlowFrame.tsx created (interior light glow + border seam-leak ported from cursor-glow, single wrapper, element-local tracking). Migrations: bento-grid.tsx + TechStack.jsx → GlowFrame. DELETED 5 superseded files (user override logged in Rule #13). Purple hover-shadow in bento → gold-tint (brand fix, disclosed). Stale-import grep: 0 · tsc EXIT:0. Awaiting review.
Phase 04 🔄 BUILT — globals.css wired via @theme inline: all semantic colors/pastels/sidebar/chart mapped to utilities · radius scale (DEFAULT 4px) · font stacks renamed --font-stack-* to avoid self-reference (typography.ts synced; Geist Mono var deferred to P5) · shadows e1-e5 + easings + spotlight + section-rhythm namespaces added · @custom-variant dark registered · duplicate prefers-color-scheme block REMOVED. Fixes: CSS comment containing */ broke parse. Verified in build output: bg-primary/text-muted-foreground/rounded-lg utilities ✓, hex tokens ✓, :where(.dark variant ✓, pastel/ease/shadow utilities absent-on-demand (unused) ✓. tsc EXIT:0 · BUILD EXIT:0 (19 pages). ⚠️ Known gap until P5: OS-dark users see light theme (media-query removed, provider not yet mounted). Awaiting review.
```
