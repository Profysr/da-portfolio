# 📋 ROADMAP — 24-Phase Implementation Plan

**Companion docs:** `ARCHITECTURE.md` (sitemap · design · structure) · `COMPONENTS_MAP.md` (full audit)
**Targets:** Lighthouse ≥95 all categories · <150KB/component · 0 axe violations · Top SEO ranking

---

## 🚫 CORE RULES (Non-Negotiable)

| # | Rule |
|---|------|
| 1 | **No custom SVGs** — download via URL or ask user. Library icon **components** (`@tabler/icons-react`, etc.) are sanctioned. Log source per asset |
| 2 | **Formats & folders:** `.jsx` default everywhere. `components/ui/` = **library-added components only** (shadcn/registry drops; `.tsx` permitted there). Our shared primitives → `components/common/` (**`.jsx` mandatory once outside ui/**). `.ts` for lib/config/api routes; root `app/layout.tsx` stays `.tsx` |
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
| 13 | **NO COMPONENT DELETIONS** — mark `UNUSED`, remove imports, keep files on disk. *Exception (user-authorized 2026-08-23): spotlight family (cursor-glow, glowing-effect, spotlight, spotlight-glow, SpotlightCard) deleted after GlowFrame consolidation — verified zero external imports pre-delete* · *Exception (user-authorized 2026-08-26): components/ai-elements/ family (message, conversation, suggestion) deleted after chatbot/* shipped + unified Markdown formatter — verified zero live imports (only commented refs inside UNUSED AssistantAi.jsx) pre-delete* |
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

> **Amendment (user directive):** Lazy-import registry MOVED from Phase 7 → **Phase 22**. Rationale: build sections first, discover which components actually ship, then register loaders for real usage only — no speculative entries. OptimizedImage stays early (consumed during section rebuilds).

## Phase 7 — OptimizedImage + Skeleton
**Files (2):** `components/ui/OptimizedImage.jsx` · `components/ui/Skeleton.jsx`
- Blur placeholder (auto SVG dataURL), priority→fetchPriority high, sizes defaults
- Error state fallback, fade-in on load
- Skeleton = shared pulse primitive (reused by registry in P22)

### Sub-phases:
- 7a. Component build
- 7b. Swap `<img>` usages found during section phases (tracked list)

## Phase 8 — AmbientBackground Global Layer
**Files (2):** `components/animations/AmbientBackground.jsx` · `app/globals.css` (keyframes append)
- CSS-only orbs (blob keyframes) + fixed grain overlay
- Retires Particles/LightRays usage page-wide (imports removed, files kept)
- Variants: orb/grid · intensities: subtle/medium/strong

## Phase 9 — Scroll Animation Primitives
**Files (2):** `components/animations/ScrollReveal.jsx` · `StaggeredReveal.jsx`
- IntersectionObserver + CSS animations (zero JS anim overhead)
- prefers-reduced-motion → static render
- Absorbs StaggeredList role

## Phase 10 — Magnetic & GSAP Hook (Option B outcome)
**Files (1):** `components/animations/useGSAP.js`
- ✅ RESOLVED per user Option B + usage evidence: `dock.tsx` declared dock winner (live in BottomDock) · `MagneticDock.tsx` marked UNUSED (12KB, zero consumers — file kept) · NO new Magnetic wrapper (MagneticButton/MagneticLink already sole-live pattern; indirection rejected under simplification directive)
- useGSAP hook: gsap.context lifecycle + ctx.revert · reduced-motion early-return · re-exports gsap/ScrollTrigger (single registration point) · usePrefersReducedMotion via useSyncExternalStore
- Consumers: P13 TechStack pan · P14 Experience stories

## Phase 11 — HERO REBUILD ⭐
**Files (2):** `app/(home)/_components/Hero.jsx` · `components/HeroPills.jsx` (new floating layer)
- ❌ Remove LightRays import + old `components/lazy.jsx` consumer migration (file stays, marked UNUSED)
- Floating decorative TechPill cluster at 3 parallax depths (Motion values, not useState)
- Stack discipline: avatar-status → kinetic headline (typewriter) → ≤20-word subtext → single CTA + socials
- Entry: staggered blur-fade-up 800ms `cubic-bezier(0.32,0.72,0,1)`
- FavoriteStack compact-marquee role retired here (data source reused)

---

# WEEK 3 — SECTIONS & CHATBOT

## Phase 12 — About Section
**Files (2):** `About.jsx` · portrait wrapper
- Editorial Split: massive statement left, DoubleBezel portrait right
- NumberTicker stats row
- Handoff pairing with Hero exit

## Phase 13 — TechStack Horizontal Scroller ⭐
**Files (3):** `TechStack.jsx` · shade-token classes in globals.css · watermelon `Tabs.tsx` refactor
- GSAP horizontal pan using existing `GSAPHorizontalScroll.tsx` engine
- **Solid different-shade background per card** (token tint steps forming color rhythm)
- ✅ CONFIRMED: watermelon `Tabs.tsx` drives TechStack category switching
- ⚠️ Rule #14 applies: Tabs.tsx refactored FIRST — standardize classes to `@theme` tokens, comment out demo content, then integrate

## Phase 14 — Experience Scroll Stories (A/B Evaluation)
**Files (2):** `Experience.jsx` · active mechanism component
- **Build BOTH, keep the winner** (user directive):
  - 15a. Option A: sticky-stack (pin top-top, scale 0.92/op 0.55 handoff) → review
  - 15b. Option B: `21st/Timeline.tsx` story renderer (refactored per Rule #14: token-standardized classes, demos commented out) → review
- Compare live on real data; user verdict recorded in phase log; loser marked UNUSED (file kept)

## Phase 15 — Projects Bento Rebuild ⭐
**Files (3):** new `ProjectCard.jsx` (PricingCard-inspired minimal aesthetic) · rebuilt bento layout · `Projects.jsx` feed update
- True asymmetric bento (current ProjectsBento is NOT the actual one — rebuild)
- **Iterate ALL 8 MDX projects including in-progress** (status badge: Live / In Progress)
- BorderBeam hover, stagger entrance, OptimizedImage thumbnails

## Phase 16 — Writings Redesign + Credentials Focus
**Files (3):** `Activities.jsx` → writings-only redesign · `Credentials.jsx` education-only · data file comment-out
- Activity section becomes **Writings**: 3 MDX articles on tracing-beam spine
- JournalNavigation (watermelon) integration candidate
- Credentials: **education entries ONLY**; certificates + awards commented out in data (preserved)

## Phase 17 — Lightweight Chatbot Components
**Files (3):** `components/chatbot/Chatbot.jsx` · `Message.jsx` · `QuickActions.jsx`
- Custom streaming UI (no `ai` SDK dependency)
- Quick-action chips: Projects / Experience / Stack / Contact
- ARIA live regions, focus management, keyboard navigable
- AssistantAi imports retired (file kept, marked UNUSED)

---

# WEEK 4 — API, SEO, QUALITY, DEPLOY

## Phase 18 — Chatbot API & Wiring
**Files (3):** `app/api/chat/route.ts` (Edge runtime) · `BottomDock.jsx` wiring · `package.json` (drop `ai` dep, −70KB)
- Curated responses + character-stream simulation
- Chatbot mounted via P22 registry 

## Phase 19 — SEO Metadata System
**Files (3):** `lib/seo.ts` · `lib/structured-data.ts` enhance · project detail page metadata
- Metadata factory (canonical, OG, Twitter, robots per route)
- Article + SoftwareApplication + BreadcrumbList JSON-LD

## Phase 20 — OG Images, Listings, Navigation
**Files (3):** `app/og/route.jsx` · listing pages polish · NavLink rollout (replaces ExtendedLink usage)
- Dynamic OG generation (1200×630, three templates)
- TagFilter a11y pass, static generation verification
- Footer contact candidates: ComposeEmail + ViewOnMap (watermelon) — user decides fit

## Phase 21 — Accessibility Sweep
**Files:** 0 audit + ≤4 fix files
- axe-core CLI full scan + manual keyboard/SR passes
- Fix flagged issues within file budget; overflow → next-phase log

## Phase 22 — Dynamic Import Registry (usage-driven) ⭐
**Files (2):** `components/lazy/index.jsx` · retire old `components/lazy.jsx`
- **Built AFTER the site exists** (user directive): audit final section/component usage → register ONLY real survivors via `next/dynamic`
- ssr:false for GSAP/canvas/chatbot/palette-class islands; ssr:true where SEO-relevant
- Skeleton fallbacks per shape (from P7)
- Old `lazy.jsx` consumers migrated; file marked UNUSED

## Phase 23 — Bundle Budgets & Dep Pruning
**Files (2):** `next.config.js` · `package.json`
- Performance budgets (150KB/component), optimizePackageImports for icon packs
- Verify removed deps: ai SDK; audit icon library usage concentration
- Consumes P22 registry results

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
| dynamic imports / next/dynamic | Phase 22 registry (ssr control per component class) |
| Image optimization props | Phase 7 OptimizedImage defaults |
| Link prefetch strategies | Phase 20 NavLink (intent-based prefetch) |
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
Phase 04b 🔄 BUILT (user-directed amendment) — TS token layer replaced by self-contained CSS files per user's architecture call: lib/tokens/{colors,typography,spacing,effects}.css (each owns raw vars + its @theme inline namespace); globals.css now imports them; DELETED colors.ts/typography.ts/spacing.ts/theme-mapping.ts (zero code consumers verified pre-delete — kills the TS→CSS drift risk). Output parity re-verified post-migration (hex/dark-variant/bg-primary/font-stack all present). tsc EXIT:0 · BUILD EXIT:0. ARCHITECTURE token table + folder structure synced. Awaiting review.
Phase 05 🔄 BUILT — Fonts & Providers: lib/fonts.ts created (Poppins latin, weights TRIMMED 7→5 via usage audit [300/900 unused → dropped], preload=true · Geist_Mono variable font, preload=false below-fold) · app/providers.jsx created (next-themes attribute="class", defaultTheme="system", enableSystem, disableTransitionOnChange) · layout.tsx swapped inline config→lib/fonts import, added geistMono.variable + suppressHydrationWarning (REQUIRED per Context7 /pacocoursey/next-themes — anti-flash script mutates DOM pre-hydration) · typography.css mono stack now consumes var(--font-geist-mono). Verified: 21 @font-face emitted in dedicated chunk, --font-geist-mono in output. tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0. ⚠️ Providers NOT yet mounted — dark mode activates at Phase 6 mount. Awaiting review.
Phase 06 ✅ RESEARCHED+BUILT — Root layout integration (user-directed research-first): Context7 confirmed useReportWebVitals (next/web-vitals) is current built-in API BUT @vercel/speed-insights ALREADY collects ALL Core Web Vitals via its web-vitals pipeline → planned custom WebVitals.jsx DROPPED as redundant duplicate-beacon code (zero new files/deps; both packages pre-existing ^2.x). layout.tsx: Providers mounted (dark mode LIVE) · <Analytics /> + <SpeedInsights /> mounted after children · viewport upgraded dual themeColor light #FDFBF7 / dark #141414 + colorScheme "light dark". Verified: tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0 · both theme-color metas in HTML · insights scripts baked into lazy client chunk (2d-jvapg16f_m.js → /_vercel/* at runtime). WEEK 1 COMPLETE.
Phase 06b 🔄 BUILT — Theme testing kit (user-directed): user-supplied ThemeSwitcher adopted → components/ui/theme-switcher.tsx (.tsx ui-zone; lucide→Tabler per icon policy [IconDeviceDesktop/IconSun/IconMoon]; @radix-ui/react-use-controllable-state swapped→inline controlled-state [dep-risk]; mounted-gate→useSyncExternalStore [passes strict lint]; motion layoutId pill preserved; role=radiogroup/radio + aria-checked; placeholder reserves layout pre-mount) · TopBar.jsx wired controlled via resolvedTheme→setTheme (localStorage['theme'] persists light/dark/system) + 'use client' added + logo text-white→text-foreground disclosed fix · DELETED interim components/layout/ThemeToggle.jsx (same-session artifact superseded before review). tsc/LINT/BUILD all EXIT:0.
Phase 06c 🔧 FIXED — User-reported: buttons animate but theme never changes. ROOT CAUSE: my typed refactor dropped controlled `value`/`onChange` props from ThemeSwitcherProps → TopBar's onChange(setTheme) silently ignored, pill ran on internal state only, next-themes.setTheme never called. FIX: restored controllable-state contract (isControlled = value!==undefined; theme = value ?? internal; setTheme forwards to onChange always). No CSS/token changes needed — .dark overrides were correct and waiting. tsc/LINT/BUILD EXIT:0.
Phase 06d 🔧 FIXED — Two user reports: (1) System click highlighted Moon not Monitor — stored choice was correct ("system"→resolved dark ✓) but switcher received resolvedTheme which erases system-vs-manual distinction → TopBar now feeds `theme==='system' ? 'system' : resolved…` so 🖥️ highlights when OS-following; (2) pill animation laggy — spring{type,duration:0.5} floaty + ring/box-shadow repaint per FLIP frame + no GPU hint → retuned stiffness:500/damping:40 (crisp, no overshoot), dropped ring, added transform-gpu. tsc/LINT/BUILD EXIT:0.
Phase 06e 🔄 BUILT — User-supplied logo public/bilal.svg integrated dual-mode: SVG is monochrome white-only → rendered via CSS mask technique (.logo-mark utility in globals.css: mask url + -webkit-mask prefix) tinted bg-foreground → auto-inverts light/dark via tokens, single asset source, no path duplication. TopBar: <Image>+personal.logo conditional replaced by mask span (h-6 aspect-[551/313] from viewBox), unused Image import removed, aria-label improved. LINT/BUILD EXIT:0.
Phase 06f 🔄 BUILT (user-directed, supersedes 06e mask approach) — user reformatted bilal.svg to structured paths → scripts/generate-logo.cjs created (reads public/bilal.svg → rewrites all non-currentColor fills to currentColor → emits components/layout/Logo.jsx inline component; rerunnable for future SVG revisions) · TopBar mask span → <Logo className="block h-6 w-auto text-foreground" /> · .logo-mark utility removed from globals.css. Logo.jsx = server-safe pure render, aria-hidden (link carries aria-label). LINT/BUILD EXIT:0.
Phase 06g 🔄 BUILT — User delivered currentColor-native SVG (v3): public/bilal.svg synced · Logo.jsx rewritten to user's exact signature (named export, aria-label="Bilal Ahmad" on svg — TopBar link label removed to avoid double announcement; fillRule camelCase; type annotation adapted to .jsx zone per Rule #2) · generator script DELETED per user (obsolete now that user supplies currentColor SVGs directly; also resolves eslint react-hooks plugin crash on .cjs) · logo sized h-6→h-7 (+20% ≈28.8px→h-7=28px). tsc/LINT/BUILD EXIT:0.
Phase 06h 🔧 FIXED — Two dev-runtime reports: (1) "Element type invalid / got undefined" in TopBar = stale Turbopack .next/dev cache after repeated export-shape flips on Logo.jsx (prod build proved graph valid) → remedy issued: stop server + Remove-Item .next\dev + restart. (2) Hydration diff warning on <html> (className+color-scheme dark added client-side) = next-themes anti-flash script mutating pre-hydration — suppressHydrationWarning had been accidentally lost from layout.tsx in a later edit → restored per Context7 /pacocoursey/next-themes mandate ("must add to <html> element"). Private-window irrelevant (empty storage → system theme → same mutation path). tsc/LINT/BUILD EXIT:0.
Phase 07-AMENDMENT ✅ APPROVED — User directive: lazy registry moved P07→P22 (usage-driven: build site first, register real survivors only). Plan renumbered 1–24 cleanly; OptimizedImage promoted to P07. COMPONENTS_MAP/ARCHITECTURE/baseline cross-refs synced.
Phase 07 🔄 BUILT — OptimizedImage + Skeleton: components/ui/Skeleton.jsx (shared pulse primitive) · components/ui/OptimizedImage.jsx (thin next/image wrapper: neutral blur dataURL default · fade-in 500ms ease-out-expo on load · error fallback w/ role=img+alt preserved · priority→fetchPriority high + native preload · sizes default responsive trio · quality 85 · forwardRef; verified ease-out-expo utility generated in build CSS). Consumers arrive P11 Hero + section rebuilds (7b swap list). tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 07b 🔄 BUILT — Rule compliance + folder taxonomy (user directives): (1) ui/ = library-added only → user moved OptimizedImage/Skeleton to components/common/ (custom primitives home; GlowFrame/theme-switcher still pending move → will convert .tsx→.jsx on move per Rule #2); (2) hand-drawn fallback svg REPLACED by @tabler IconPhotoOff (library icons sanctioned); (3) NEUTRAL_BLUR base64 svg ELIMINATED entirely → placeholder="empty" + Skeleton underlay until load (fixes dark-mode light-flash bug from hardcoded #F7F6F3; container span contract, zero svg authored). tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 08 🔄 BUILT — AmbientBackground global layer: components/animations/AmbientBackground.jsx (variant orb[3 token-tinted blurred orbs: gold primary 13% + pastel blue/green — multi-hue per taste] | grid[token border lines, radial mask] · intensity subtle/medium/strong via wrapper opacity · aria-hidden) + GrainOverlay export READY but grain texture pending user asset public/noise.png (Rule #1 — cannot author noise tile) · globals.css appended .ambient-orb{a,b,c} drift keyframes (26/32/38s ease-smooth alternate, blur 120px, GPU transform-only) + reduced-motion kill · MOUNTED in HomeLayout root (first child) · Footer.jsx +relative z-10 z-guard so statics never sink under layer. DISCLOSED: Footer purple glow shadow rgba(208,188,255,.25) spotted → logged P21 sweep candidate. Particles/LightRays import retirement tracked per-section (Hero P11 etc.), files untouched. Verified classes+keyframes in build CSS. tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 08b 🔧 FIXED — User report: orbs invisible both modes. ROOT CAUSE: double-dim math — pastel-BG tokens are near-cream (≈zero delta vs page bg) × wrapper opacity-40 ⇒ gold landed ~5% effective alpha. FIX: sample saturated TEXT-hue tokens instead (pastel-blue/green-text auto-swap dark variants), raise cores (primary 34% / blue 22% / green 18%), softness via radial-gradient closest-side fade (also removes costly 120px blur filter — skill perf guideline), intensity rebalanced subtle .7/medium .85/strong 1. Verified radial+mix values in build CSS. LINT EXIT:0 · BUILD EXIT:0.
Phase 08 ⛔ DEPRECATED (user decision) — AmbientBackground removed from runtime after visible-invisibility battle + user's simplification directive ("plain solid backgrounds; stop overusing relative/z/overflow-hidden"). ROLLED BACK: HomeLayout import+mount removed · Footer z-guard reverted (user had already simplified the line) · globals.css ambient block stripped (71 lines). FILE KEPT per Rule #13: components/animations/AmbientBackground.jsx marked UNUSED for future revisit. Build incident during rollback: PS5.1 Set-Content added UTF-8 BOM + stale Turbopack cache → parse error on compiled chunk as source; fixed by BOM strip ([IO.File]::WriteAllText UTF8Encoding(false)) + full .next purge. LESSON LOGGED: never rewrite tracked source via Set-Content; use Write/Edit tooling. tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 09 🔄 BUILT — Reveal system upgrade-in-place (Rule #7 discovery: ui/ScrollReveal.tsx ALREADY exported ScrollReveal/StaggeredReveal/ScrollRevealText feeding Hero+FavoriteStack+EditorialHeading → rewrote internals, preserved public API incl seconds-based props & 8 variants): motion/react dependency REMOVED from file (IO flips data-visible; CSS keyframes reveal-in driven by --rv-x/y/s/rx/blur/delay/dur custom props; StaggeredReveal = .reveal-item children w/ computed delay; ScrollRevealText = .sr-part per word/line/char with calc(i*stagger)) · reduced-motion handled purely in CSS !important override (JS branch dropped — also silences setState-in-effect lint) · polymorphic Tag ref via React.ElementType cast (TS union-ref fix) · globals.css appended reveal system block. CLEANUP LEDGER (user directive): Footer purple shadow already cleaned BY USER ✓; 1 residual purple ref logged at components/ContactCard.jsx:77 → P21 sweep. QUEUED P09b: OptimizedImage grid-stack de-positioning (drop relative/overflow/absolute in non-fill), GlowFrame trim (isolate/z-[2] removal), theme-switcher placeholder width tokenization. tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 09b ✅ BUILT — Cleanup sweep executed: (1) OptimizedImage wrapper de-positioned via CSS grid stacking ([grid-area:1/1] on Skeleton/error/Image) — relative+overflow-hidden+absolute-skeleton GONE in non-fill mode (fill keeps absolute: next/image framework requirement); (2) GlowFrame USER-UPGRADED version respected (proximity activation + --active opacity pattern superior) — surgical trims only: isolate removed, z-[2]/z-[3] dropped (DOM-order sandwich preserved: bg z-0 < overlays < content z-10); (3) theme-switcher placeholder h-10 w-[4.75rem]→h-8 w-22 (matches live control 88px, v4 dynamic spacing). NOTE: user rewrote GlowFrame independently — proximity window/body listeners are their deliberate perf tradeoff, left untouched. tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 10 ✅ BUILT (Option B) — user picked evidence-based skip: dock.tsx wins by default (live+integrated in BottomDock), MagneticDock.tsx marked UNUSED (zero consumers verified via grep, 12KB kept on disk), NO Magnetic wrapper created (MagneticLink already the live pattern; simplification directive over original consolidation plan). DELIVERED components/animations/useGSAP.js: gsap.context + ctx.revert cleanup, reduced-motion early-return, re-exports gsap/ScrollTrigger as single registration point, + usePrefersReducedMotion (useSyncExternalStore media-query reactive). Consumers queued: P13 TechStack pan · P14 Experience stories. tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 11 ⭐ 🔄 BUILT — HERO REBUILD: NEW components/HeroPills.jsx (5 curated favoriteStack pills at %-positions × 3 depth tiers [opacity .9/.7/.5], scroll parallax useScroll+useTransform −140px×depth over first 35%, per-pill idle float loop, hidden <lg decorative-only aria-hidden, reduced-motion→static via useReducedMotion) · Hero.jsx rewritten to stack discipline: AvatarStatus(status chip) → watermark Heading+TypingAnimation(kinetic headline) → personal.tagline subtext(6 words≤20 ✓) → single CTA cluster(socials+MagneticLink); entry=staggered reveal variant 600/800ms; min-h-[100dvh] pt-28; REMOVED LightRays+Suspense, FavoriteStack-marquee role, chevron cue; old components/lazy.jsx consumers NOW ZERO (Hero was last). BUG JOURNEY: platform.icon destructuring miss (string prop-access→undefined) diagnosed via dev-overlay "render method of HeroActions" pointer + probe bisect A/B; USER fixed with icon:Icon alias; my Probe B had also silently unmounted <HeroPills/> — remounted post-fix; Set-Content BOM avoided via Write tooling. tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 11b ✅ FINALIZED (user verdict) — HeroPills REJECTED visually → user finalized Hero themselves (restructured wrapper, pt-18/md:pt-24, min-h-dvh, TooltipProvider wrapper dropped [global root Provider covers tooltips]) · HeroPills.jsx DELETED (same-session artifact, user-authorized; zero residual refs verified) · orphaned import + unused TooltipProvider import cleaned · FINAL STACK: status chip → kinetic typewriter headline → tagline → socials+MagneticLink CTA on plain solid bg. tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 12 🔄 BUILT — About editorial-split recomposition: statement = bio first sentence as display type (text-3xl→[2.75rem] semibold tracking-tight) · supporting sentence muted · stat trio (Experience/Repos-live/Contributions-live) as inline icon+value+label w/ StaggeredReveal fade · CTA row (Resume token-button + location·clock line) · RIGHT DoubleBezel portrait (AvatarStatus + locationLabel, rounded-lg concentric) · GitHub Rhythm band (bordered card: 360 icon header + @badge + HeatmapGrid). REMOVED: LazyParticles bg (+Suspense), Pakistan map card, StatCard×2, Connect&Collaborate/ContactCard block (retires to P20 footer candidates), NumberTicker skipped (string values — logged decision). OLD-LAZY MIGRATED: About's common/lazy import GONE (remaining consumers: Projects/ContactCard/StatCard). tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 12b 🔄 BUILT — Watermelon integration (user directive): Rule#14 refactor first — NumberSlider.tsx rewritten as generic bare control (Calories/kCal demo domain stripped, rainbow hex gradients→gold token gradient primary-hover→primary, 60vh demo card→bare label+digits+track, shadow arbitrary→shadow-inset-highlight, size-13→h/w-10) · ViewOnMap.tsx trims (lucide X/Loader2/Map→IconX/IconLoader2/IconMap strokeWidth 1.5, rounded-2xl→rounded-lg, shadow-2xl→shadow-e5). INTEGRATED: ViewOnMap trigger joins About CTA row · NumberSlider = REAL control driving GitHub heatmap week range (Range 12–52wks step2, default 30, state in About → HeatmapGrid weeks) mounted in band header under @badge — no fake data. watermelon/ interpreted as user-owned .tsx zone (Rule #2 exception documented). tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 12c ✅ MICRO — Base heading scale reduced per user: h1 clamp(2.5,6vw,5)→(2.25,5vw,4) · h2 (2,4vw,3.5)→(1.75,3.5vw,2.75) · h3 (1.5,3vw,2.5)→(1.375,2.5vw,2) — matches originally-proposed token fluid scale. Verified in build CSS. BUILD EXIT:0.
Phase 12d 🔄 BUILT — Four user directives: (1) REVERSE ANIMATIONS: reveal system converted keyframes→TRANSITIONS (base = from-state via --rv vars; data-visible swaps to identity) → naturally reversible; About reveals set once={false} (exit-reverse on scroll-out); sr-part stagger via inline transitionDelay. (2) ViewOnMap modal misposition FIXED — reveal transform created containing block breaking position:fixed → modal PORTALED to document.body (mounted gate via useSyncExternalStore). (3) CLOCK timezone UTC→Asia/Karachi label PKT (personal.timezone "GMT+5" not IANA). (4) NumberSlider gradient warning — background moved to static style, only width animates (non-interpolable gradient fix). BONUS: user deleted bezel portrait themselves → About single-column max-w-3xl; stats upgraded with NumberTicker (Repos/Contributions numeric+suffix; Experience stays composite text); slider range 24–44wks + DEBOUNCED commit (350ms — instant UI, deferred heatmap update kills request churn); HeatmapGrid re-stagger wave on range change (revealed reset via rAF pattern, lint-safe) + cells pop-in scale-50→100. tsc EXIT:0 · LINT EXIT:0 · BUILD EXIT:0.
Phase 13 🔄 BUILT — TechStack dual-dimensional pan (user-refined through 3 directive rounds): (1) watermelon Tabs.tsx Rule#14 refactor FIRST (hsl()→shadow-e1 token, demo DEFAULT_TABS commented out, tabs prop now REQUIRED, full tablist/tab/aria-selected/arrow-key semantics, count chip) — then USER DIRECTIVE: no tabs on TechStack → refactor KEPT for future Writings filter (COMPONENTS_MAP candidate), zero consumers today. (2) USER created lib/tokens/shades.css (5 shade pairs blue/gold/green/rose/canvas, light tints + dark alpha-washes, @theme inline + atomic .shade-card-* classes) — globals.css wired @import; contrast verified: light 4.62–6.26:1 AA ✓, dark composites 7.90–8.68:1 AA ✓. (3) GSAPHorizontalScroll.tsx REPAIRED (4 bugs: ctx-cleanup was no-op inside callback, unmount killed ALL global ScrollTriggers, children prop dead via items-guard, motion layout conflicted with GSAP x) + ENHANCED (native overflow-x-auto scrollbar fallback for reduced-motion/no-JS with tabIndex+region a11y, container-based pan distance, ariaLabel, progress hairline). (4) TechStack rebuilt: NO FavoriteStack (user directive → component now ZERO consumers → UNUSED candidate, file kept per Rule#13; Marquee/BorderBeam chain unused with it), NO tabs; dual-dimensional GSAP pin-scrub pan — vertical scroll drives rail right→left, scroll-up reverses left→right (scrub bidirectional, scrub:1, end+=1400, pin below TopBar offset); premium editorial cards (mono index/count header → icon chip + title → hairline → pills) on user shade classes + GlowFrame spotlight hover (taste-profile tracing-spotlight pattern); TechPill hardcoded zinc-200 (dark-bg assumption) overridden via className tokens at consumer — NO TechPill file edit (budget). Files: Tabs.tsx · shades.css(user) · globals.css · GSAPHorizontalScroll.tsx · TechStack.jsx. tsc EXIT:0 · LINT EXIT:0 (30 pre-existing warnings, 0 errors, 0 in phase files) · BUILD EXIT:0 (19 pages) · shade utilities verified in built CSS · ux-mcp 0 issues @ AA. ✅ APPROVED 2026-08-24 (user: "move to next phase"). POST-APPROVAL: user independently rewrote TechStack.jsx + GSAPHorizontalScroll.tsx (velocitySkew, topContent, onTweenReady, distanceMultiplier, containerAnimation pill reveals) — captured in P14 entry.
Phase 14 🔄 IN PROGRESS — 14-prep cleanup sweep (user-directed, scope: Experience+TechStack+About+Hero+TopBar+BottomDock): (1) Experience.jsx — light-mode fixes (text-white/zinc-300/zinc-400/white-overlays → foreground/muted-foreground tokens; bg-surface-high→surface-muted [token never existed — silent no-bg bug]; shadow-lg+shadow-primary/5→shadow-e2; dropped no-op ExpandableList [2 items, initialCount=2 shows all]; Section relative removed). (2) TechStack.jsx (user had rewritten w/ velocitySkew+topContent+containerAnimation pill reveals — respected) — removed broken absolute -z-10 radial-gradient layer [anchored to page root, not section; P08 plain-solid directive], hover:shadow-md→shadow-e2. (3) About.jsx — dead font-poppins utility removed [never existed; body already Poppins], statement p→h2 + GitHub Rhythm h4→h3 [heading hierarchy; explicit text classes = zero visual delta], clock pill rounded-full→rounded-md [taste: no pills] + shadow-sm→shadow-e1, backdrop-blur-sm dropped [no-op inline]. (4) Hero.jsx — mojibake comments fixed, 2× cruft relative removed, space-x→gap per P02 convention. (5) TopBar.jsx — bg-surface-high/60→bg-surface-muted/60 [same nonexistent-token bug], shadow-lg→shadow-e2, nested backdrop-blur-md dropped. (6) BottomDock.jsx — LIGHT-MODE BROKEN nav links fixed (text-zinc-300 hover:text-white bg-white/10 → muted-foreground/foreground/10 tokens), divider bg-white/15→bg-border, BANNED PURPLE #d0bcff AI trigger → bg-primary/15 text-primary, shadow-2xl→shadow-e4. P21 CANDIDATES LOGGED (Rule #11, untouched): bento-grid.tsx text-white · expandable-list.tsx zinc/white · modal.tsx white-family · tracing-beam.tsx hardcoded hex · shimmer-button/InterfaceCraftCards/background-gradient/animated-beam defaults. StackedCards.jsx created (14a mechanism, CSS-sticky deck + GSAP scrub scale 0.92/op 0.55, reversible, reduced-motion-safe). Tests: tsc 0 · lint 0 errors (30 pre-existing) · build 0 (19 pages). A/B implementations (14a Experience rewrite + 14b Timeline refactor) NEXT.
Phase 14 ✅ BUILT — Experience scroll stories (user verdict: A/B CANCELLED — Timeline chosen directly; StackedCards.jsx BUILT but USER-RESERVED for a future section, zero consumers today, file kept per Rule#13): (1) 21st/Timeline.tsx Rule#14 REFACTOR: framer-motion→motion/react · Aceternity demo header REMOVED · white/black/neutral/purple-blue→tokens (bg-background dot ring, surface-muted node, muted-ghost era titles, border track gradient, primary-gold spine gradient) · spine draw height→**scaleY** (transform-only, zero per-frame reflow — pattern adopted from GSAPScrollRail audit) · one-shot measure→ResizeObserver (fixes stale-height bug) · reduced-motion → spine fully drawn · z-40 sticky dropped via DOM-order sandwich (spine renders before entries) · sticky top-40→top-28 (TopBar-aware) · pt-40→pt-10 (taste rhythm) · unused useMotionValueEvent import dropped. (2) Experience.jsx rewired onto Timeline: ScrollRail import GONE (component stays LIVE via Credentials), ExperienceCard isLit prop dropped → static token border + hover, data mapped {title: company, content: card}; user's role-indexing extension (index/showIndex on RoleCard) preserved untouched. (3) Dispositions: GSAPScrollRail.tsx → UNUSED (zero consumers, superseded — file kept); ScrollRail.jsx height→scaleY conversion logged as P21 sweep candidate; COMPONENTS_MAP synced (Experience row, Timeline row, rails cluster, StackedCards reserved entry). Tests: tsc 0 · lint 28 warnings/0 errors (−2 vs baseline) · build 0 (19 pages). NEXT: Projects bento rebuild (P15) — pending review gate.
⚠️ STANDING DIRECTIVE (user, 2026-08-25): run lint / tsc / build ONLY when the user explicitly asks — do not auto-run test commands after edits.
Phase 14 POST-BUILD REFINEMENTS (user-directed rounds, all approved): title→ReactNode (company link + locationType badge chip + location) · CompanyHeader REMOVED entirely (logo/icon/external-link header gone; link lives on era-label name) · Present badge moved company→RoleCard (isCurrent = !role.endDate) · period/duration → startDate/endDate ISO YYYY-MM (MMM YYYY display via formatDate; durations computable later; user-confirmed Mar 2026 RPA→Lead transition; botApi.ts consumer synced w/ local formatPeriod) · dot-glow BUG FIXED: useInView viewport-band desynced from beam → glow now driven by the SAME scrollYProgress as the spine (measured per-dot thresholds, rAF-deferred initial sync, lint-safe) · card gap pt-10/14→pt-6/8 · >50-char company names downshift era type + wrap-break-word safety net · mobile rail compacted (spine left-5, dot wrapper left-0, content pl-11; md+ untouched) · TechPill icon-only pills get wider 3:2 box (ICON_ONLY_CLASSES — hideName logos no longer letterboxed; user's attr-bump intent honored via matching wrap) · CATEGORY_META dissolved into SkillsAndTools objects (Icon+shade inline, user directive — single source of truth) · shade-orange tokens added (6.23:1 / 8.11:1 AA ✓). ✅ PHASE 14 COMPLETED 2026-08-25 (user: "mark the phase 14 completed").
Phase 15 🔄 BUILT — Projects bento rebuild: (1) data/projects.js restructured — status ("live"/"in-progress") + features[] on all 8, activity projects normalized (category→tags, tech added, tag/isActivity kept for Activities consumer), TAG_META export = single source of truth for tag display meta (user directive: add tags in one place), contributions object DELETED (95% dead — only githubUsername consumed; moved to personal.githubUsername, About fallback rewired, heading/subheading/stats/spanClass zero consumers verified). (2) ProjectCard.jsx NEW — PricingCard DNA (outer p-1.5 inset + media panel), OptimizedImage thumbnail (first P7 consumer) / terminalSnippet / category-icon fallbacks, multi-tag chips from TAG_META (dynamic getTagConfig), collapsible FeaturesList (aria-expanded, AnimatePresence height), StatusBadge (Live emerald ping / In Progress amber), strategy chips, tech pills, footer Source/Private+Live, BorderBeam gold paused-until-hover (animation-play-state gating — no idle battery ×8). (3) Projects.jsx — true asymmetric bento lg:grid-cols-4 (hero 2×2 + 2×1 + 1×1s), ScrollReveal stagger reversible, LazyParticles+Suspense+ExpandableList REMOVED (all 8 visible; deprecated pattern retired; old-lazy consumers now ContactCard/StatCard only), hardcoded colors→tokens, TagFilter→ContinuousTabs (user moved Tabs to components/common/Tabs.tsx; tabs derive from TAG_META + live counts; grid carries dynamic tabpanel-{activeTab} id so aria-controls resolves — TagFilter file KEPT, Credentials still consumes). PRERENDER BUG FIXED: stale config={config} prop passed to MediaPanel after tags refactor (ReferenceError config is not defined at build). Tests pending user request (standing directive). ✅ APPROVED 2026-08-26 (review gate).
Phase 16 ✅ COMPLETED BY USER — Writings redesign + Credentials education-only shipped outside phase flow (user sessions; MDX detail-layer rewrite + components/docs/* + ui accordion/alert/breadcrumb landed alongside).
Phase 17 🔄 IN PROGRESS (user-led) — Chatbot frontend built (Chatbot/Message/QuickActions); embeddings backend committed by user; API + BottomDock wiring = P18 integration underway.
Phase 17b 🔄 BUILT — Unified Markdown Formatter (user-directed mid-P18: one renderer for AI Assistant + ProjectContent + WritingContent): components/common/Markdown.jsx NEW — two-scale single source (`markdownScales.doc|chat`: p/ul/ol/li/blockquote/code/strong/em/hr/table/th/td class strings), `createMarkdownElements(scale)` factory + `<Markdown>` wrapper on streamdown@2.5 [plugins={code}, shikiTheme github-light/github-dark, components map incl. h1-h6 downshift, ChatLink w/ internal-next/link + external-rel hardening + streamdown:incomplete-link muted fallback, inlineCode virtual component] + @source dist lines in globals.css for v4 processing. Message.jsx regex renderMarkdown DELETED → <Markdown>{content}</Markdown> (user msgs stay pre-wrap). mdx-components.jsx base elements now spread ...docBase (classes verbatim-identical = zero visual delta; headings/pre/img/a/MDX-extras untouched). FIX vs legacy: chat inline-code dropped inherited text-primary tint (new light primary #EAB308 on surface-muted fails AA ~1.7:1) → text-foreground parity with doc scale (≈16:1 / dark ≈14:1 ✓). Research: Context7 /vercel/streamdown → components prop · inlineCode virtual · shikiTheme pair · @source v4 lines. P21 CANDIDATES (Rule #11): ARCHITECTURE.md token table stale vs live palette (light primary #EAB308/surface-muted #F1F5F9 — user-retuned); docs stale-note only, no code impact. Tests pending user request (standing directive). NEXT: resume P18 chatbot API/integration — pending review gate.
Phase 17c 🔄 BUILT — Docs-layer rationalization post-Streamdown (full audit: 8 docs/* files + 3 ui primitives; user verdicts per component): (1) CODE FENCES → components/common/CodeBlock.jsx NEW [MarkdownPre: extracts language/raw text from compiled <code class=language-x> child, re-fences, renders <Streamdown mode="static" plugins={code} shikiTheme github-light/dark>] — real Shiki highlighting arrives on pages for the first time; mdx-components pre rewired; OLD docs/CodeBlock.jsx DELETED (zero refs verified pre-delete). Token theming via globals.css [data-streamdown] overrides — attr names verified against dist (code-block/-header/-actions exist; -features does not); --radius-lg 8px + --shadow-e1 confirmed live tokens. (2) ReadingProgressBar.jsx DELETED by USER mid-phase (banned scroll-listener + width anim) + self-unmounted from DocsTopBar. (3) DocsComponents.jsx QUARANTINED UNUSED: Steps/MDXTabs/Cards/Kbd/FileTree had ZERO consumers across all 14 MDX files (grep-verified); imports+map entries removed from mdx-components.jsx, file kept per Rule #13. (4) KEPT as-is: TableOfContents (IO scrollspy solid), DocsTopBar, SimilarContent, Callout, ui/accordion·alert·breadcrumb. QUEUED 17d (user-approved scope): token polish TableOfContents/SimilarContent/ZoomImage/alert.tsx + ZoomImage aspect-video fix; lightbox→ui/dialog swap = separate candidate. ⚠️ User editing in parallel during phase — DocsTopBar state shifted mid-build (handled). Tests pending user request (standing directive). Pending review gate.
Phase 17d 🔄 BUILT — Token polish pass on surviving docs-layer components (user-approved scope): (1) ui/alert.tsx info/success/warning variants: hardcoded blue/emerald/amber Tailwind families → pastel token pairs (border+text = pastel-*-text, bg = pastel-*-bg; auto light/dark swap, zero dark: duplicates) — contrast verified: warning 6.37:1 · info 6.59:1 AA ✓ [green family pre-validated P13 range]; destructive already tokenized, untouched. (2) TableOfContents.jsx desktop card shadow-sm→shadow-e1. (3) SimilarContent.jsx hover:shadow-md→hover:shadow-e2. (4) ZoomImage.jsx — aspect-video FORCED CROP removed → natural w-full h-auto flow (non-16:9 images no longer letterboxed); caption rounded-full pill→rounded-lg (taste: no pills); shadows lg/2xl/sm/md→e2/e5/e1/e2. Rationale ledger delivered to user pre-build (why each custom component exists / what it gives). Lightbox→ui/dialog focus-trap swap remains logged candidate. Tests pending user request (standing directive). Pending review gate.
Phase 17e 🔄 BUILT — SimilarContent vibe upgrade to house DNA (user: "doesn't match the vibe"): rewritten to the Writings/TechStack card treatment — ScrollReveal slide-up stagger (index*80ms, once={false} reversible) wrapping GlowFrame per card (size 240, proximity 60, spread 25, gold interior color-mix primary 14%) wrapping single whole-card Link (aria-label, focus-visible ring, rounded-lg border bg-card p-1.5 inset panel = ProjectCard DNA); inset aspect-16/9 media w/ group-hover scale-[1.04]; meta row mono dot+category/date; hover shadow-xs→e2; Read arrow translate micro-motion; header reveal + View all arrow nudge; decorative imgs alt="" (link label carries meaning), icons aria-hidden. Dropped Badge import → lighter MetaChip (Writings-style). ux-mcp: 0 axe issues @ AA. Tests pending user request (standing directive). Pending review gate.
```
