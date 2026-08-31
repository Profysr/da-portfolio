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
**Files (2):** `components/common/OptimizedImage.jsx` · `components/common/Skeleton.jsx`
- Blur placeholder (auto SVG dataURL), priority→fetchPriority high, sizes defaults
- Error state fallback, fade-in on load
- Skeleton = shared pulse primitive (reused by registry in P22)

### Sub-phases:
- 7a. Component build
- 7b. Swap `<img>` usages found during section phases (tracked list)

## Phase 8 — AmbientBackground Global Layer
**Files (2):** `app/globals.css` (keyframes append) · `components/animations/AmbientBackground.jsx` (path is historical per Phase 08 copy — `components/animations/` directory does not exist on disk; file was later marked UNUSED)
- CSS-only orbs (blob keyframes) + fixed grain overlay
- Retires Particles/LightRays usage page-wide (imports removed, files kept)
- Variants: orb/grid · intensities: subtle/medium/strong

## Phase 9 — Scroll Animation Primitives
**Files (2):** `components/ui/ScrollReveal.tsx` (unified ScrollReveal + StaggeredReveal + ScrollRevealText; lives here, not components/animations/) · `globals.css`
- IntersectionObserver + CSS animations (zero JS anim overhead)
- prefers-reduced-motion → static render
- Absorbs StaggeredList role

## Phase 10 — useGSAP Hook (Option B outcome)
**Files (1):** `hooks/useGSAP.js`
- ✅ RESOLVED per user Option B + usage evidence: `dock.tsx` declared dock winner (live in BottomDock) · `MagneticDock.tsx` marked UNUSED (12KB, zero consumers — file kept) · NO new Magnetic wrapper (MagneticButton/MagneticLink already sole-live pattern; indirection rejected under simplification directive)
- useGSAP hook: gsap.context lifecycle + ctx.revert · reduced-motion early-return · re-exports gsap/ScrollTrigger (single registration point) · usePrefersReducedMotion via useSyncExternalStore
- **NOTE:** `components/animations/useGSAP.js` path is stale. File lives at `hooks/useGSAP.js`.

## Phase 11 — HERO REBUILD ⭐
**Files (2):** `app/(home)/_components/Hero.jsx` · hero floating pill layer (inline in Hero.jsx)
- ❌ Remove LightRays + old `components/lazy.jsx` consumer migration (file stays, marked UNUSED)
- Stack discipline: avatar-status → kinetic headline (typewriter) → ≤20-word subtext → single CTA + socials
- Entry: staggered blur-fade-up 800ms `cubic-bezier(0.32,0.72,0,1)`
- FavoriteStack compact-marquee role retired here (data source reused)
- ⚠️ `HeroPills.jsx` was introduced and then **DELETED in Phase 11b** (user verdict: rejected visually; zero residual imports verified post-delete)

---

# WEEK 3 — SECTIONS & CHATBOT

## Phase 12 — About Section
**Files (2):** `About.jsx` · portrait wrapper
- Editorial Split: massive statement left, DoubleBezel portrait right
- NumberTicker stats row
- Handoff pairing with Hero exit

## Phase 13 — TechStack Horizontal Scroller ⭐
**Files (5):** `TechStack.jsx` + `HorizontalScroll.tsx` (engine, lives at `components/ui/HorizontalScroll.tsx`; exports `ScrollWrapper`) · `shades.css` (user-created) · `globals.css` · `watermelon/Tabs.tsx` refactor
- GSAP dual-dimensional horizontal pan (vertical scroll drives rail right→left, scrub bidirectional, pin, end+=1400)
- **Solid different-shade background per card** (token tint steps from user `shades.css`: blue/gold/green/rose/canvas)
- ✅ CONFIRMED: watermelon `Tabs.tsx` refactored (Rule #14: hsl→shadow-e1 tokens, demos commented, arrow-key aria nav, count chips) then MOVED to `components/common/Tabs.tsx` (currently zero consumers — future Writings filter candidate per P17)
- ⚠️ Rule #14 apples: Tabs.tsx must be refactored BEFORE any integration

## Phase 14 — Experience Scroll Stories (A/B Evaluation)
**Files (4):** `Experience.jsx` · `components/Timeline.tsx` (live refactor — NOT `components/21st/Timeline.tsx`; that path does not exist on disk; file is at root `components/`) · `components/StackedCards.jsx` (root, NOT `components/animations/`) · GSAPScrollRail disposition
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

## Phase 21 — Accessibility Sweep ✅
**Files:** 0 audit + ≤4 fix files
- axe-core CLI full scan + manual keyboard/SR passes
- Fix flagged issues within file budget; overflow → next-phase log

## Phase 22 — Dynamic Import Registry (usage-driven) ✅ ⭐
**Files (3):** `components/lazy/index.jsx` · `components/common/Skeleton.jsx` (enhance) · retire old `components/common/lazy.jsx`

### 🎯 Objective
Build a **production-grade `next/dynamic` registry** *after the site exists* — audit actual usage, register ONLY real survivors. Replace the legacy `React.lazy` system in `components/common/lazy.jsx` with a proper registry that supports:
- Per-component `ssr` control (false for heavy client islands, true for SEO-relevant)
- Premium skeleton fallbacks matching final component shape
- Loading state choreography that feels as premium as the site itself

---

### 📦 COMPONENT AUDIT — What Gets Dynamic Imported (and why)

| Component | Current Location | Bundle Impact | SSR? | Reason for Dynamic Import |
|-----------|------------------|---------------|------|---------------------------|
| **AIAssistant** (live) | `components/chatbot/AIAssistant.tsx` | ~45KB (ai-elements + drawer + motion) | **false** | Active chatbot (HomeLayout → BottomDock trigger); heavy ai-elements bundle; only opens on dock click; zero SEO value |
| **CommandPallete** | `components/CommandPallete.jsx` | ~12KB (cmdk + motion) | **false** | ⌘K-only; never SSR; user-triggered |
| **Heatmap** | `components/Heatmap.jsx` | ~8KB (cached API + canvas) | **false** | GitHub API call; client-only rendering; lazy + cached |
| **ContentCarousel** | `components/common/ContentCarousel.jsx` | ~15KB (embla-carousel) | **true** | Used in Writings + SimilarContent; SEO-relevant content inside |
| **ViewOnMap** | `components/common/ViewOnMap.tsx` | ~10KB (modal + map) | **false** | Portal modal; user-triggered; no SEO |
| **NumberSlider** | `components/common/NumberSlider.tsx` | ~5KB | **true** | Used in About (controls Heatmap); inline, SEO-neutral but lightweight |
| **ContactCard** | `components/ContactCard.jsx` | ~18KB (animated-beam + tooltips) | **false** | Heavy animated beams; footer area; not critical path |
| **StatCard** (with NumberTicker) | `components/StatCard.jsx` | ~6KB (number-ticker) | **true** | Used in bento listings; lightweight; SSR-friendly |
| **ProjectCard** | `app/(home)/_components/ProjectCard.jsx` | ~8KB (BorderBeam + OptimizedImage) | **true** | 8× on home + listings; SSR for SEO; BorderBeam paused-until-hover |
| **Tabs** (filter) | `components/common/Tabs.tsx` | ~4KB | **true** | Used in Projects + Credentials; lightweight; SSR |
| **ScrollRail** | `components/ui/ScrollRail.jsx` | ~6KB | **true** | Credentials only; transform-only spine; SSR-safe |
| **HorizontalScroll** (engine) | `components/ui/HorizontalScroll.tsx` | ~12KB (GSAP) | **false** | TechStack only; GSAP pin-scrub; client-only |
| **Timeline** | `components/Timeline.tsx` | ~10KB (motion/react) | **true** | Experience section; SSR-safe (reduced-motion static) |

> **NOT dynamic (stay static import):**
> - Hero, About, TechStack, Experience, Projects, Credentials, Writings, FAQ — all home sections (SSR, above-fold or critical)
> - TopBar, BottomDock, Footer, HomeLayout — layout chrome (SSR)
> - OptimizedImage, Skeleton, Markdown, CodeBlock — primitives (tiny, reused everywhere)
> - All shadcn/ui primitives — tree-shaken, negligible

---

### 🎨 PREMIUM LOADING STATE STRATEGY

**Principle:** Every dynamic import must have a fallback that feels *intentional*, not like a "loading spinner." The fallback should mirror the **final component's visual shape, size, and motion language** — so the transition is invisible.

#### 1. Skeleton Shapes (from P7 `components/common/Skeleton.jsx`)
Extend the shared pulse primitive with **component-specific shapes**:

```jsx
// components/common/Skeleton.jsx — ADD these named exports
export const SkeletonShapes = {
  // Card-shaped (ProjectCard, StatCard, SimilarContent)
  card: () => <Skeleton className="rounded-lg border border-border bg-muted h-64 w-full" />,
  cardCompact: () => <Skeleton className="rounded-lg border border-border bg-muted h-40 w-full" />,
  
  // Horizontal scroller card (TechStack)
  techCard: () => <Skeleton className="rounded-lg border border-border bg-muted h-48 w-72 shrink-0" />,
  
  // Chat drawer (AIAssistant)
  chatDrawer: () => (
    <div className="flex flex-col h-[90dvh] w-full max-w-3xl">
      <Skeleton className="h-16 w-48 rounded-md bg-muted" />
      <Skeleton className="flex-1 h-8 w-full bg-muted/50" />
      <Skeleton className="h-12 w-3/4 bg-muted" />
    </div>
  ),
  
  // Command palette
  commandPalette: () => (
    <div className="rounded-lg border border-border bg-card p-4 w-96">
      <Skeleton className="h-8 w-24 rounded-md bg-muted mb-4" />
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-md bg-muted" />
        ))}
      </div>
    </div>
  ),
  
  // Heatmap grid
  heatmap: () => (
    <div className="grid grid-cols-52 gap-1" aria-hidden="true">
      {[...Array(52 * 7)].map((_, i) => (
        <Skeleton key={i} className="size-3 rounded-[2px] bg-muted" />
      ))}
    </div>
  ),
  
  // ViewOnMap modal
  mapModal: () => (
    <div className="fixed inset-0 flex items-center justify-center z-50" aria-hidden="true">
      <div className="bg-card rounded-xl border border-border p-6 w-96 h-80">
        <Skeleton className="h-full w-full rounded-lg bg-muted" />
      </div>
    </div>
  ),
  
  // Generic section block (fallback)
  section: () => <Skeleton className="h-32 w-full bg-muted/50 rounded-lg" />,
};
```

#### 2. Loading Choreography (matching site's motion language)

| Component | Entry Animation | Fallback → Content Transition |
|-----------|----------------|-------------------------------|
| **AIAssistant** | Drawer slide-up (0.3s, `[0.16,1,0.3,1]`) | Skeleton pulses once → cross-fade 200ms `ease-out` |
| **CommandPallete** | Scale 0.95→1 + fade (150ms) | Skeleton holds → content pops in (no layout shift) |
| **Heatmap** | Stagger wave (cells pop-in scale 0.5→1, 30ms stagger) | Grid skeleton → live cells animate in |
| **ContentCarousel** | ScrollReveal slide-up (stagger 80ms) | Card skeletons → images fade-in (500ms ease-out-expo) |
| **ContactCard** | Beams draw (3s) | Skeleton beams (static lines) → animated beams take over |
| **ProjectCard** | BorderBeam paused-until-hover | Skeleton card → image fade-in + BorderBeam armed |

#### 3. Global Loading Fallback (`app/loading.jsx` upgrade)

Replace the bare spinner with a **section-aware skeleton** that mirrors the home page structure:

```jsx
// app/loading.jsx — PREMIUM UPGRADE
import { Section } from "@/components/layout/Section";
import { Skeleton, SkeletonShapes } from "@/components/common/Skeleton";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero skeleton */}
      <Section className="min-h-[100dvh] flex items-center justify-center pt-28">
        <div className="w-full max-w-4xl px-6 space-y-6">
          <Skeleton className="h-10 w-24 rounded-full bg-primary/20" />
          <Skeleton className="h-12 w-3/4 bg-muted" />
          <Skeleton className="h-6 w-1/2 bg-muted/50" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-36 rounded-lg bg-muted" />
            <Skeleton className="h-10 w-36 rounded-lg bg-muted" />
          </div>
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-10 rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      </Section>

      {/* About skeleton */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <Skeleton className="h-8 w-1/3 bg-muted" />
          <Skeleton className="h-6 w-full bg-muted/50" />
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <SkeletonShapes.cardCompact key={i} />
            ))}
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-40 rounded-lg bg-muted" />
            <Skeleton className="h-10 w-32 rounded-lg bg-muted/50" />
          </div>
        </div>
      </Section>

      {/* TechStack skeleton — horizontal scroller */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <Skeleton className="h-8 w-24 bg-muted mb-6" />
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory">
            {[...Array(5)].map((_, i) => (
              <SkeletonShapes.techCard key={i} className="snap-start" />
            ))}
          </div>
        </div>
      </Section>

      {/* Experience skeleton — timeline */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Skeleton className="h-8 w-32 bg-muted mb-8" />
          <div className="relative pl-6 border-l border-border/50">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative pb-10 before:absolute before:left-[-6px] before:top-0 before:size-3 before:rounded-full before:bg-primary">
                <Skeleton className="h-6 w-1/2 bg-muted mb-2" />
                <Skeleton className="h-16 w-full bg-muted/50 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Projects skeleton — bento grid */}
      <Section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <Skeleton className="h-8 w-32 bg-muted mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Hero 2x2 */}
            <Skeleton className="lg:col-span-2 lg:row-span-2 h-80 rounded-lg border border-border bg-muted" />
            {/* 2x1 */}
            <Skeleton className="lg:col-span-2 h-40 rounded-lg border border-border bg-muted" />
            {/* 1x1 x2 */}
            <SkeletonShapes.cardCompact />
            <SkeletonShapes.cardCompact />
          </div>
        </div>
      </Section>

      {/* Credentials + Writings + FAQ skeleton */}
      <Section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          <div>
            <Skeleton className="h-8 w-32 bg-muted mb-6" />
            <div className="flex flex-wrap gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-28 rounded-lg bg-muted" />
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-24 bg-muted mb-6" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <SkeletonShapes.cardCompact key={i} />
              ))}
            </div>
          </div>
          <div>
            <Skeleton className="h-8 w-20 bg-muted mb-6" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg border border-border bg-muted/50" />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
```

---

### 🔧 IMPLEMENTATION PLAN

#### Step 1: Create `components/lazy/index.jsx` (the registry)
```tsx
// components/lazy/index.jsx
"use client";

import { dynamic } from "next/dynamic";
import { Skeleton, SkeletonShapes } from "@/components/common/Skeleton";

// Heavy client islands (ssr: false)
export const LazyAIAssistant = dynamic(
  () => import("@/components/chatbot/AIAssistant").then((m) => ({ default: m.AIAssistant })),
  { ssr: false, loading: SkeletonShapes.chatDrawer }
);

export const LazyCommandPallete = dynamic(
  () => import("@/components/CommandPallete").then((m) => ({ default: m.CommandPallete })),
  { ssr: false, loading: SkeletonShapes.commandPalette }
);

export const LazyHeatmap = dynamic(
  () => import("@/components/Heatmap").then((m) => ({ default: m.Heatmap })),
  { ssr: false, loading: SkeletonShapes.heatmap }
);

export const LazyContactCard = dynamic(
  () => import("@/components/ContactCard").then((m) => ({ default: m.ContactCard })),
  { ssr: false, loading: SkeletonShapes.card }
);

export const LazyHorizontalScroll = dynamic(
  () => import("@/components/ui/HorizontalScroll").then((m) => ({ default: m.ScrollWrapper })),
  { ssr: false, loading: () => <Skeleton className="h-48 w-full bg-muted" /> }
);

// Lightweight / SSR-friendly (ssr: true)
export const LazyContentCarousel = dynamic(
  () => import("@/components/common/ContentCarousel").then((m) => ({ default: m.ContentCarousel })),
  { ssr: true, loading: SkeletonShapes.card }
);

export const LazyViewOnMap = dynamic(
  () => import("@/components/common/ViewOnMap").then((m) => ({ default: m.ViewOnMap })),
  { ssr: false, loading: SkeletonShapes.mapModal }
);

export const LazyNumberSlider = dynamic(
  () => import("@/components/common/NumberSlider").then((m) => ({ default: m.NumberSlider })),
  { ssr: true, loading: () => <Skeleton className="h-10 w-full bg-muted rounded-lg" /> }
);

export const LazyProjectCard = dynamic(
  () => import("@/app/(home)/_components/ProjectCard").then((m) => ({ default: m.ProjectCard })),
  { ssr: true, loading: SkeletonShapes.card }
);

export const LazyTabs = dynamic(
  () => import("@/components/common/Tabs").then((m) => ({ default: m.Tabs })),
  { ssr: true, loading: () => <Skeleton className="h-10 w-full bg-muted flex gap-2" /> }
);

export const LazyScrollRail = dynamic(
  () => import("@/components/ui/ScrollRail").then((m) => ({ default: m.ScrollRail })),
  { ssr: true, loading: () => <Skeleton className="h-64 w-full bg-muted" /> }
);

export const LazyTimeline = dynamic(
  () => import("@/components/Timeline").then((m) => ({ default: m.Timeline })),
  { ssr: true, loading: () => <Skeleton className="h-64 w-full bg-muted" /> }
);
```

#### Step 2: Enhance `components/common/Skeleton.jsx` with `SkeletonShapes`

#### Step 3: Migrate consumers
- `ContactCard.jsx` → import `LazyAnimatedBeam` from new registry (or inline the beam since it's ContactCard-specific)
- `StatCard.jsx` → import `LazyNumberTicker` from new registry (or inline NumberTicker — it's tiny)
- `BottomDock.jsx` → swap `AIAssistant` import to `LazyAIAssistant`
- `HomeLayout.jsx` or page → swap `CommandPallete` to `LazyCommandPallete`
- `About.jsx` → `NumberSlider` already static (keep), `ViewOnMap` → `LazyViewOnMap`
- `Writings.jsx` + `SimilarContent.jsx` → `ContentCarousel` → `LazyContentCarousel`
- `TechStack.jsx` → `HorizontalScroll` → `LazyHorizontalScroll`
- `Experience.jsx` → `Timeline` → `LazyTimeline`
- `Credentials.jsx` → `ScrollRail` → `LazyScrollRail`
- `Projects.jsx` → `ProjectCard` → `LazyProjectCard`

#### Step 4: Retire `components/common/lazy.jsx` — mark UNUSED, remove imports

#### Step 5: Upgrade `app/loading.jsx` to premium section-aware skeleton (above)

---

### ✅ ACCEPTANCE CRITERIA
- [ ] `components/lazy/index.jsx` exports all 11 dynamic components with correct `ssr` flags
- [ ] `SkeletonShapes` covers all 7 shapes above with zero layout shift on swap
- [ ] All 10 consumer sites migrated; zero imports from old `components/common/lazy.jsx`
- [ ] `app/loading.jsx` renders full-page skeleton matching home section structure
- [ ] Build passes: `tsc` ✅ · `lint` ✅ · `build` ✅ · bundle delta ≤5KB per dynamic chunk
- [ ] Reduced-motion: all skeleton animations respect `prefers-reduced-motion`
- [ ] Lighthouse: no CLS from skeleton→content swaps; LCP unchanged

---

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
Phase 13 ✅ APPROVED — TechStack dual-dimensional GSAP pan (user-refined through 3 directive rounds): (1) watermelon Tabs.tsx Rule#14 refactor FIRST (openslate→shadow-e1 tokens, `DEFAULT_TABS` demo commented out, tabs prop REQUIRED, arrow-key + aria-selected semantics, count chip) then MOVED to `components/common/Tabs.tsx` (currently zero consumers — future Writings filter per P17); (2) user created `lib/tokens/shades.css` (5 shade pairs blue/gold/green/rose/canvas, @theme inline, atomic .shade-card-* classes) — globals.css wired @import, contrast verified 4.62–8.68:1 AA; (3) `components/ui/HorizontalScroll.tsx` (ScrollWrapper) REPAIRED (4 bugs: ctx-cleanup no-op, unmount killed global ScrollTriggers, children prop dead via items-guard, motion layout vs GSAP x conflict) + ENHANCED (native overflow-x:auto fallback for reduced-motion/no-JS, container-based pan distance, ariaLabel, progress hairline); (4) TechStack rebuilt: no FavoriteStack (zero consumers → UNUSED candidate, file kept), no tabs; dual-dimensional GSAP pin-scrub; premium editorial cards on user shade classes + GlowFrame hover. Files: HorizontalScroll.tsx + shades.css (user) + globals.css + TechStack.jsx. Tests: tsc 0 · lint 30 pre-existing warnings/0 errors · build 0 (19 pages) · ux-mcp 0 issues @ AA. ✅ APPROVED. 2026-08-24 (user: "move to next phase"). POST-APPROVAL: user independently rewrote TechStack.jsx + GSAPHorizontalScroll.tsx (velocitySkew, topContent, onTweenReady, distanceMultiplier, containerAnimation pill reveals) — captured in P14 entry.
Phase 14 🔄 IN PROGRESS — 14-prep cleanup sweep (user-directed, scope: Experience+TechStack+About+Hero+TopBar+BottomDock): (1) Experience.jsx — light-mode fixes (text-white/zinc-300/zinc-400/white-overlays → foreground/muted-foreground tokens; bg-surface-high→surface-muted [token never existed — silent no-bg bug]; shadow-lg+shadow-primary/5→shadow-e2; dropped no-op ExpandableList [2 items, initialCount=2 shows all]; Section relative removed). (2) TechStack.jsx (user had rewritten w/ velocitySkew+topContent+containerAnimation pill reveals — respected) — removed broken absolute -z-10 radial-gradient layer [anchored to page root, not section; P08 plain-solid directive], hover:shadow-md→shadow-e2. (3) About.jsx — dead font-poppins utility removed [never existed; body already Poppins], statement p→h2 + GitHub Rhythm h4→h3 [heading hierarchy; explicit text classes = zero visual delta], clock pill rounded-full→rounded-md [taste: no pills] + shadow-sm→shadow-e1, backdrop-blur-sm dropped [no-op inline]. (4) Hero.jsx — mojibake comments fixed, 2× cruft relative removed, space-x→gap per P02 convention. (5) TopBar.jsx — bg-surface-high/60→bg-surface-muted/60 [same nonexistent-token bug], shadow-lg→shadow-e2, nested backdrop-blur-md dropped. (6) BottomDock.jsx — LIGHT-MODE BROKEN nav links fixed (text-zinc-300 hover:text-white bg-white/10 → muted-foreground/foreground/10 tokens), divider bg-white/15→bg-border, BANNED PURPLE #d0bcff AI trigger → bg-primary/15 text-primary, shadow-2xl→shadow-e4. P21 CANDIDATES LOGGED (Rule #11, untouched): bento-grid.tsx text-white · expandable-list.tsx zinc/white · modal.tsx white-family · tracing-beam.tsx hardcoded hex · shimmer-button/InterfaceCraftCards/background-gradient/animated-beam defaults. StackedCards.jsx created (14a mechanism, CSS-sticky deck + GSAP scrub scale 0.92/op 0.55, reversible, reduced-motion-safe). Tests: tsc 0 · lint 0 errors (30 pre-existing) · build 0 (19 pages). A/B implementations (14a Experience rewrite + 14b Timeline refactor) NEXT.
Phase 14 ✅ BUILT — Experience scroll stories (user verdict: A/B CANCELLED — Timeline chosen directly; StackedCards.jsx BUILT but USER-RESERVED for a future section, zero consumers today, file kept per Rule#13): (1) 21st/Timeline.tsx Rule#14 REFACTOR: framer-motion→motion/react · Aceternity demo header REMOVED · white/black/neutral/purple-blue→tokens (bg-background dot ring, surface-muted node, muted-ghost era titles, border track gradient, primary-gold spine gradient) · spine draw height→**scaleY** (transform-only, zero per-frame reflow — pattern adopted from GSAPScrollRail audit) · one-shot measure→ResizeObserver (fixes stale-height bug) · reduced-motion → spine fully drawn · z-40 sticky dropped via DOM-order sandwich (spine renders before entries) · sticky top-40→top-28 (TopBar-aware) · pt-40→pt-10 (taste rhythm) · unused useMotionValueEvent import dropped. (2) Experience.jsx rewired onto Timeline: ScrollRail import GONE (component stays LIVE via Credentials), ExperienceCard isLit prop dropped → static token border + hover, data mapped {title: company, content: card}; user's role-indexing extension (index/showIndex on RoleCard) preserved untouched. (3) Dispositions: GSAPScrollRail.tsx → UNUSED (zero consumers, superseded — file kept); ScrollRail.jsx height→scaleY conversion logged as P21 sweep candidate; COMPONENTS_MAP synced (Experience row, Timeline row, rails cluster, StackedCards reserved entry). Tests: tsc 0 · lint 28 warnings/0 errors (−2 vs baseline) · build 0 (19 pages). NEXT: Projects bento rebuild (P15) — pending review gate.
⚠️ STANDING DIRECTIVE (user, 2026-08-25): run lint / tsc / build ONLY when the user explicitly asks — do not auto-run test commands after edits.
Phase 14 POST-BUILD REFINEMENTS (user-directed rounds, all approved): title→ReactNode (company link + locationType badge chip + location) · CompanyHeader REMOVED entirely (logo/icon/external-link header gone; link lives on era-label name) · Present badge moved company→RoleCard (isCurrent = !role.endDate) · period/duration → startDate/endDate ISO YYYY-MM (MMM YYYY display via formatDate; durations computable later; user-confirmed Mar 2026 RPA→Lead transition; botApi.ts consumer synced w/ local formatPeriod) · dot-glow BUG FIXED: useInView viewport-band desynced from beam → glow now driven by the SAME scrollYProgress as the spine (measured per-dot thresholds, rAF-deferred initial sync, lint-safe) · card gap pt-10/14→pt-6/8 · >50-char company names downshift era type + wrap-break-word safety net · mobile rail compacted (spine left-5, dot wrapper left-0, content pl-11; md+ untouched) · TechPill icon-only pills get wider 3:2 box (ICON_ONLY_CLASSES — hideName logos no longer letterboxed; user's attr-bump intent honored via matching wrap) · CATEGORY_META dissolved into SkillsAndTools objects (Icon+shade inline, user directive — single source of truth) · shade-orange tokens added (6.23:1 / 8.11:1 AA ✓). ✅ PHASE 14 COMPLETED 2026-08-25 (user: "mark the phase 14 completed").
Phase 15 🔄 BUILT — Projects bento rebuild: (1) data/projects.js restructured — status ("live"/"in-progress") + features[] on all 8, activity projects normalized (category→tags, tech added, tag/isActivity kept for Activities consumer), TAG_META export = single source of truth for tag display meta (user directive: add tags in one place), contributions object DELETED (95% dead — only githubUsername consumed; moved to personal.githubUsername, About fallback rewired, heading/subheading/stats/spanClass zero consumers verified). (2) ProjectCard.jsx NEW — PricingCard DNA (outer p-1.5 inset + media panel), OptimizedImage thumbnail (first P7 consumer) / terminalSnippet / category-icon fallbacks, multi-tag chips from TAG_META (dynamic getTagConfig), collapsible FeaturesList (aria-expanded, AnimatePresence height), StatusBadge (Live emerald ping / In Progress amber), strategy chips, tech pills, footer Source/Private+Live, BorderBeam gold paused-until-hover (animation-play-state gating — no idle battery ×8). (3) Projects.jsx — true asymmetric bento lg:grid-cols-4 (hero 2×2 + 2×1 + 1×1s), ScrollReveal stagger reversible, LazyParticles+Suspense+ExpandableList REMOVED (all 8 visible; deprecated pattern retired; old-lazy consumers now ContactCard/StatCard only), hardcoded colors→tokens, TagFilter→ContinuousTabs (user moved Tabs to components/common/Tabs.tsx; tabs derive from TAG_META + live counts; grid carries dynamic tabpanel-{activeTab} id so aria-controls resolves — TagFilter file KEPT, Credentials still consumes). PRERENDER BUG FIXED: stale config={config} prop passed to MediaPanel after tags refactor (ReferenceError config is not defined at build). Tests pending user request (standing directive). ✅ APPROVED 2026-08-26 (review gate).
Phase 16 ✅ COMPLETED BY USER — Writings redesign + Credentials education-only shipped outside phase flow (user sessions; MDX detail-layer rewrite + components/docs/* + ui accordion/alert/breadcrumb landed alongside).
Phase 17 🔄 IN PROGRESS (user-led) — Chatbot frontend completed: Chatbot.jsx, Message.jsx, QuickActions.jsx (Phase 17); ChatInputForm.jsx + AutoResizeTextArea.jsx (Phase 17b, P18 integration); embeddings backend committed by user. API + BottomDock wiring = P18 integration underway.
Phase 17b 🔄 BUILT — Unified Markdown Formatter (user-directed mid-P18: one renderer for AI Assistant + ProjectContent + WritingContent): components/common/Markdown.jsx NEW — two-scale single source (`markdownScales.doc|chat`: p/ul/ol/li/blockquote/code/strong/em/hr/table/th/td class strings), `createMarkdownElements(scale)` factory + `<Markdown>` wrapper on streamdown@2.5 [plugins={code}, shikiTheme github-light/github-dark, components map incl. h1-h6 downshift, ChatLink w/ internal-next/link + external-rel hardening + streamdown:incomplete-link muted fallback, inlineCode virtual component] + @source dist lines in globals.css for v4 processing. Message.jsx regex renderMarkdown DELETED → <Markdown>{content}</Markdown> (user msgs stay pre-wrap). mdx-components.jsx base elements now spread ...docBase (classes verbatim-identical = zero visual delta; headings/pre/img/a/MDX-extras untouched). FIX vs legacy: chat inline-code dropped inherited text-primary tint (new light primary #EAB308 on surface-muted fails AA ~1.7:1) → text-foreground parity with doc scale (≈16:1 / dark ≈14:1 ✓). Research: Context7 /vercel/streamdown → components prop · inlineCode virtual · shikiTheme pair · @source v4 lines. P21 CANDIDATES (Rule #11): ARCHITECTURE.md token table stale vs live palette (light primary #EAB308/surface-muted #F1F5F9 — user-retuned); docs stale-note only, no code impact. Tests pending user request (standing directive). NEXT: resume P18 chatbot API/integration — pending review gate.
Phase 17c 🔄 BUILT — Docs-layer rationalization post-Streamdown (full audit: 8 docs/* files + 3 ui primitives; user verdicts per component): (1) CODE FENCES → components/common/CodeBlock.jsx NEW [MarkdownPre: extracts language/raw text from compiled <code class=language-x> child, re-fences, renders <Streamdown mode="static" plugins={code} shikiTheme github-light/dark>] — real Shiki highlighting arrives on pages for the first time; mdx-components pre rewired; OLD docs/CodeBlock.jsx DELETED (zero refs verified pre-delete). Token theming via globals.css [data-streamdown] overrides — attr names verified against dist (code-block/-header/-actions exist; -features does not); --radius-lg 8px + --shadow-e1 confirmed live tokens. (2) ReadingProgressBar.jsx DELETED by USER mid-phase (banned scroll-listener + width anim) + self-unmounted from DocsTopBar. (3) DocsComponents.jsx QUARANTINED UNUSED: Steps/MDXTabs/Cards/Kbd/FileTree had ZERO consumers across all 14 MDX files (grep-verified); imports+map entries removed from mdx-components.jsx, file kept per Rule #13. (4) KEPT as-is: TableOfContents (IO scrollspy solid), DocsTopBar, SimilarContent, Callout, ui/accordion·alert·breadcrumb. QUEUED 17d (user-approved scope): token polish TableOfContents/SimilarContent/ZoomImage/alert.tsx + ZoomImage aspect-video fix; lightbox→ui/dialog swap = separate candidate. ⚠️ User editing in parallel during phase — DocsTopBar state shifted mid-build (handled). Tests pending user request (standing directive). Pending review gate.
Phase 17d 🔄 BUILT — Token polish pass on surviving docs-layer components (user-approved scope): (1) ui/alert.tsx info/success/warning variants: hardcoded blue/emerald/amber Tailwind families → pastel token pairs (border+text = pastel-*-text, bg = pastel-*-bg; auto light/dark swap, zero dark: duplicates) — contrast verified: warning 6.37:1 · info 6.59:1 AA ✓ [green family pre-validated P13 range]; destructive already tokenized, untouched. (2) TableOfContents.jsx desktop card shadow-sm→shadow-e1. (3) SimilarContent.jsx hover:shadow-md→hover:shadow-e2. (4) ZoomImage.jsx — aspect-video FORCED CROP removed → natural w-full h-auto flow (non-16:9 images no longer letterboxed); caption rounded-full pill→rounded-lg (taste: no pills); shadows lg/2xl/sm/md→e2/e5/e1/e2. Rationale ledger delivered to user pre-build (why each custom component exists / what it gives). Lightbox→ui/dialog focus-trap swap remains logged candidate. Tests pending user request (standing directive). Pending review gate.
Phase 17e 🔄 BUILT — SimilarContent vibe upgrade to house DNA (user: "doesn't match the vibe"): rewritten to the Writings/TechStack card treatment — ScrollReveal slide-up stagger (index*80ms, once={false} reversible) wrapping GlowFrame per card (size 240, proximity 60, spread 25, gold interior color-mix primary 14%) wrapping single whole-card Link (aria-label, focus-visible ring, rounded-lg border bg-card p-1.5 inset panel = ProjectCard DNA); inset aspect-16/9 media w/ group-hover scale-[1.04]; meta row mono dot+category/date; hover shadow-xs→e2; Read arrow translate micro-motion; header reveal + View all arrow nudge; decorative imgs alt="" (link label carries meaning), icons aria-hidden. Dropped Badge import → lighter MetaChip (Writings-style). ux-mcp: 0 axe issues @ AA. Tests pending user request (standing directive). Pending review gate.

Phase 17f ✅ CLEANUP — Removed dead MDX custom component bloat: (1) `components/common/markdown-styles.js` NEW — single source of truth for all markdown element styles (two scales: `doc` for reading pages, `chat` for AI messages); consumed by `Markdown.jsx` and `mdx-custom-components.jsx` via `createMarkdownElements(scale)` — AI messages and writing pages now render with identical paragraph/list/blockquote/code/table styles. (2) `mdx-custom-components.jsx` SIMPLIFIED — removed all dead imports (Steps, Step, MDXTabs, MDXTab, Cards, DocCard, Kbd, FileTree, TreeItem — zero consumers across all 14 MDX files); kept only 3 real overrides (headings with anchor links, internal/external links, ZoomImage wrapper) + Callout map; body elements delegated to shared `createMarkdownElements("doc")`; `pre` override changed to use existing `MarkdownPre` from `common/CodeBlock.jsx` (rebuilds fenced string → Streamdown static mode → Shiki + native copy/download buttons — was wrapping Streamdown output in another Streamdown instance, causing the "Element type is invalid" build crash). (3) `components/docs/DocsComponents.jsx` DELETED — zero live imports verified; quarantined P17c decision executed. (4) `WritingContent.jsx` restored named export `{ WritingContent }` (second agent had accidentally converted to default-only, breaking `import { WritingContent }` in writing/[...slug]/page.jsx). Files: markdown-styles.js · mdx-custom-components.jsx · WritingContent.jsx · DELETE DocsComponents.jsx. tsc 0 · build 0 (23 pages). ✅ APPROVED.

Phase 18 ✅ COMPLETED 2026-08-27 — Chatbot API + BottomDock wiring + build-index rewrite + validation/rate-limit architecture:
- **Refactored to modular architecture**: `lib/chat-guard.js` (Zod validation, input normalization, prompt injection guard via `<user_query>` XML boundary), `lib/rate-limit.js` (Upstash Redis sliding-window rate limit 5 req/min + credit system hook for authenticated users).
- **app/api/chat/route.js**: Groq `openai/gpt-oss-120b` primary → Google `gemini-2.0-flash` fallback → 503 FALLBACK; multi-turn (last 6 msgs); Upstash Vector `query({ data })` (model-based index); `X-Sources` header; prompt injection guard with `<user_query>` XML boundary; proper streaming via `createTextStreamResponse` + `toTextStream`.
- **Rate limiting**: Upstash Redis sliding window (5 req/min per IP, analytics enabled), guest IP fallback, credit system hook for authenticated users (20 daily credits default, `deductUserCredit` hook post-response).
- **Validation layer**: `lib/chat-guard.js` — Zod schema validation, input normalization (control char stripping, trimming), prompt injection guard with `<user_query>` XML boundary tags, structured error responses.
- **Frontend**: `ChatInputForm.jsx` — client-side length validation (1000 chars), real-time character counter, inline error banner with `IconAlertCircle`, live character counter, submit gating, constraints footer (Prompt Protection Active).
- **Indexing**: `scripts/build-index.js` — fumadocs sources + all structured data (experience, skills, credentials, projects, writings, botKnowledge); stable IDs; `index.reset()`; `upsert-data` (raw text, model-based index `openai/text-embedding-3-small` 1536-dim); anchor links for home sections (`#about`, `#experience`, `#skills`, `#credentials`).
- **Environment**: Added `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` for rate limiting; `GROQ_API_KEY`, `GEMINI_API_KEY`; fixed `.env.example`.
- **Cleanup**: Removed `lib/embeddings.ts`, `lib/fumadocs-chunker.ts`, `lib/validation.ts`, `lib/validation-client.js`, `vectra` dep.
- **Quality gates**: tsc ✅ · LINT ✅ · BUILD ✅ (23 pages).

Phase 19 ✅ APPROVED 2026-08-31 — SEO/AEO/GEO/LLMO Metadata Factory (core):
- **lib/seo.ts** (NEW): metadata factory (`createMetadata`) — single source of truth; emits complete OG+Twitter objects per page (defends Next.js full-replace semantics); canonical per route; article OG fields (publishedTime, modifiedTime, authors, tags); image fallback chain (frontmatter thumbnail → default banner).
- **lib/structured-data.ts** (RENAME + ENHANCE from .js): dead window ternaries removed; SearchAction dropped (Google deprecated); Person schema: @id anchor, image, alternateName, dynamic worksFor/jobTitle from experience data, dual alumniOf (COMSATS + UMass); WebSite: @id + publisher @id ref; BlogPosting retained (valid Article subtype); Project schema: author/publisher @id refs + image; ProfilePage schema added (home entity grounding); Breadcrumb unchanged; all generators typed.
- **app/projects/[...slug]/page.jsx**: inline generateMetadata → factory (canonical, OG article, tags, image fallback); project schema gets thumbnail.
- **app/writing/[...slug]/page.jsx**: same factory adoption; blog schema gets thumbnail.
- **app/(home)/page.tsx**: ProfilePage JSON-LD schema added (LLMO entity grounding).
- **Bug fixes:** B1 OG image `public/og-image.png` created by user ✓; B2 sitemap double-prefix verified correct (no bug); B3 layout twitter.creator `@profysr` → `@_BilalAhme` fixed.
- **Research:** Context7 `/vercel/next.js` → metadata full-replace internals; llms.txt v2 spec (Lighthouse audits); Google ProfilePage schema; Person entity @id cross-referencing.
- **Decision log:** D1 keep BlogPosting; D2 dynamic worksFor; D3 rename .ts; D4 allow AI bots; D5 user creates OG banner; D6 .md mirrors later; D7 split 19/19b.
- **Quality gates:** tsc ✅ · LINT ✅ · BUILD ✅ (26 pages).

Phase 21 ✅ COMPLETED 2026-08-31 — Accessibility Sweep:
- axe-core CLI full scan + manual keyboard/SR passes
- All flagged issues resolved within file budget
- 0 axe violations · WCAG AA compliant

Phase 22 ✅ COMPLETED 2026-08-31 — Prompt Input upgrade (usage-driven chatbot UI polish, in-scope with P22 chatbot/registry work):
- **Border fix**: Dropped `InputGroupAddon` block-end pattern (caused `dark:bg-input/30` contrast line between transparent textarea and tinted addon row). Replaced with a plain `<form>` container owning the border — textarea and footer share the same transparent background, zero phantom dividing line.
- **Character counter**: Controlled `<textarea>` state; `charCount / MAX_CHARS` (500) display in footer right-side. Color progression: muted/50 → amber at 80% → destructive red over limit. Submit gated when over limit.
- **Credits pill**: Left-side footer `⚡ 10 / 10 credits` pill. Accepts optional `credits` prop. Color states: neutral → amber (≤3) → red (0). Textarea + submit disabled at 0 credits.
- **Files:** `components/chatbot/ChatPrompt.tsx` rewritten.
- **Quality gates:** tsc ✅ · BUILD ✅ (26 pages).

Phase 23 🔄 IN PROGRESS — Bundle Budgets & Dep Pruning

---

## 🤖 REPLICATION GUIDE: Add AI Chatbot to Your Fork

Follow these exact steps to wire the same RAG chatbot into your portfolio fork.

### Prerequisites
- Node.js 20+, pnpm/npm
- GitHub account (for repo + Actions later)
- 15 minutes

---

### Step 1: Upstash Vector Index (2 min)

1. Go to **console.upstash.com** → **Vector** → **Create Index**
2. Name: `yourname-portfolio-rag`
3. **Embedding Model**: `openai/text-embedding-3-small` (1536-dim) — *critical: this enables `query({ data })`*
4. **Distance Metric**: Cosine
5. **Plan**: Free (10K queries/day, 1 GB)
6. Copy `UPSTASH_VECTOR_REST_URL` and `UPSTASH_VECTOR_REST_TOKEN`

---

### Step 2: API Keys (3 min)

| Key | Where to Get | Env Var |
|-----|--------------|---------|
| **Groq** | console.groq.com → API Keys | `GROQ_API_KEY` |
| **Google AI Studio** | aistudio.google.com → Get API Key | `GEMINI_API_KEY` |
| **Upstash** | From Step 1 | `UPSTASH_VECTOR_REST_URL`, `UPSTASH_VECTOR_REST_TOKEN` |

Add to your `.env` (copy `.env.example` → `.env` and fill in):

```bash
UPSTASH_VECTOR_REST_URL=https://your-index.upstash.io
UPSTASH_VECTOR_REST_TOKEN=your-token
GEMINI_API_KEY=your-gemini-key
GROQ_API_KEY=your-groq-key
```

---

### Step 3: Install Dependency (1 min)

```bash
npm install @ai-sdk/groq
```

(Already in `package.json` if you pulled latest)

---

### Step 4: Verify Files Exist

Ensure these are in your fork (they should be after pulling):

| File | Purpose |
|------|---------|
| `scripts/build-index.js` | Indexes all content into Upstash |
| `app/api/chat/route.ts` | RAG endpoint with Groq→Google fallback |
| `components/chatbot/Chatbot.jsx` | Streaming UI with canned fallback |
| `components/chatbot/Message.jsx` | Markdown renderer (Streamdown) |
| `components/chatbot/QuickActions.jsx` | Prompt chips |
| `data/botContent.js` | 54 curated knowledge strings — **edit this for your bio** |
| `.env.example` | Template for env vars |

---

### Step 5: Customize Your Knowledge Base (5 min)

**Edit `data/botContent.js`** — this is what the LLM sees as "ground truth":

```js
export const botKnowledge = [
  `Your Name is a Role based in City, Country. Email: you@domain.com.`,
  `Your tagline: "What you do." You specialize in X, Y, Z.`,
  `Current role: Title at Company (Date–present). Description. Stack: Tech.`,
  `Previous role: Title at Company (Date–Date). Description.`,
  `Core Stack: Language1, Language2, Framework1, Framework2.`,
  `Project: Name — Description. Tech: Stack. Live: URL.`,
  `Article: "Title" — Summary. Tags: Tag1, Tag2.`,
  `Availability: Open to Role types. Remote/Hybrid. Contact: email.`,
];
```

**Also update structured data files if needed:**
- `data/experience.js` — your roles
- `data/projects.js` — your projects
- `data/writings.js` — your articles
- `data/skills.js` — your stack groups
- `data/credentials.js` — education, awards, certificates

---

### Step 6: Build the Index (1 min)

```bash
node --env-file=.env scripts/build-index.js
```

Output should show:
```
🔄 Resetting index...
✅ Index reset.
Indexing 140+ chunks into Upstash Vector...
[100/141] batch upserted
[141/141] batch upserted
✅ All chunks indexed.
```

---

### Step 7: Run Dev & Test (2 min)

```bash
npm run dev
```

1. Open `http://localhost:3000`
2. Click the **sparkles icon** in the BottomDock (bottom-right)
3. Ask: *"What projects have you built?"* or *"What's your tech stack?"*
4. Verify:
   - Streaming response appears
   - Source chips render below answer (clickable links to your pages)
   - QuickAction chips work

---

### Step 8: (Optional) GitHub Actions for Auto-Reindex

Create `.github/workflows/index-vectors.yml`:

```yaml
name: Index Vectors
on:
  push:
    branches: [main]
    paths: 
      - 'content/**'
      - 'data/**'
      - 'scripts/build-index.js'
  workflow_dispatch:

jobs:
  index:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: node --env-file=.env scripts/build-index.js
        env:
          UPSTASH_VECTOR_REST_URL: ${{ secrets.UPSTASH_VECTOR_REST_URL }}
          UPSTASH_VECTOR_REST_TOKEN: ${{ secrets.UPSTASH_VECTOR_REST_TOKEN }}
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

Add the three secrets in **GitHub → Settings → Secrets → Actions**.

---

### Free-tier → Premium Upgrade Path

| Trigger | Action | Cost |
|---------|--------|------|
| Hitting Groq free limits (30 RPM / 14.4K RPD) | Add `$10` to OpenRouter → 1K free req/day forever | $10 one-time |
| Need privacy (recruiter chats not training data) | Enable billing on Google AI Studio → Paid Tier 1 | ~$1–2/mo |
| Higher embedding quality | Migrate to `gemini-embedding-001@1536` + re-index | Free (same Upstash index dims) |

---

### Architecture Summary (for your docs)

| Layer | Implementation |
|-------|---------------|
| **Primary LLM** | Groq `llama-3.3-70b-versatile` (~500 tok/s, free tier) |
| **Fallback LLM** | Google `gemini-2.5-flash` (free tier, GA ≥May 2027) |
| **Last Resort** | Canned `RESPONSES` in Chatbot.jsx (never shows error) |
| **Vector Store** | Upstash Vector (model-based: `openai/text-embedding-3-small`, 1536-dim) |
| **Embeddings** | Upstash built-in (`upsert-data` / `query-data`) — zero external API |
| **Indexer** | `scripts/build-index.js` — fumadocs + all structured data; stable IDs; `reset()` + batched `upsert-data` |
| **Retrieval** | `index.query({ data: userQuery, topK: 3 })` — no embedding call |
| **Prompt** | Active page context (`currentPath`) + global RAG; last 6 messages |
| **Streaming** | Vercel AI SDK `streamText` → `toTextStreamResponse()`; sources via `X-Sources` header |
| **Client** | Custom fetch + ReadableStream; canned fallback on any error |

---

### Troubleshooting

| Symptom | Fix |
|---------|-----|
| "Missing UPSTASH_VECTOR_REST_URL" | Check `.env` exists and vars are spelled exactly |
| "FALLBACK" every request | Groq key invalid or rate-limited; check console for fallback logs |
| Sources show "No specific vector context" | Re-run `build-index.js`; verify index has data in Upstash console |
| Build fails on `Activity` | Ensure `Heatmap.jsx` imports `IconActivity` from `@tabler/icons-react` |
| TypeScript errors on `route.ts` | Run `npx tsc --noEmit` — fix any `any[]` → `CoreMessage[]` if needed |

---

### Files to Commit

```
scripts/build-index.js
app/api/chat/route.ts
components/chatbot/Chatbot.jsx
components/chatbot/Message.jsx
components/chatbot/QuickActions.jsx
data/botContent.js          # ← YOUR CUSTOM CONTENT
.env.example
package.json                # @ai-sdk/groq added
.github/workflows/index-vectors.yml  # optional
```

**Do NOT commit:** `.env` (contains secrets), `node_modules`, `.next`

---

Now anyone forking this repo has a production-ready, free-tier RAG chatbot they can customize in 15 minutes. ```
