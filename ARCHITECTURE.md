# 🏛️ ARCHITECTURE — Sitemap, Design System & Structure

**Companion docs:** `ROADMAP.md` (phases) · `COMPONENTS_MAP.md` (component audit)

---

## 🗺️ STATIC SITEMAP

```
bilalahmad.dev/
│
├── [/] HOME ────────────────────────────────────────────── layout: HomeLayout
│    ├─ Hero        floating pill-cluster (decorative) · avatar-status · kinetic headline · CTAs
│    ├─ About       editorial split · ticker stats · double-bezel portrait
│    ├─ TechStack   GSAP horizontal scroller · solid shade-differentiated cards
│    ├─ Experience  pinned scroll stories (sticky-stack OR Timeline renderer)
│    ├─ Projects    ALL projects incl. in-progress · PricingCard-inspired minimal cards
│    ├─ Credentials EDUCATION ONLY (certs/awards commented out in data)
│    ├─ Writings    MDX articles only (redesigned former Activity section)
│    └─ FAQ         accordion island (lazy client component)
│         ├──→ /projects/[slug]     (from project cards)
│         ├──→ /writing/[slug]      (from writings rows)
│         └──→ #contact anchor      (Footer)
│
├── [/projects] LIST ── HomeLayout · full bento index + TagFilter
│    └── /[slug] DETAIL ── ReadingLayout · ProjectContent · JSON-LD SoftwareApplication · OG image
├── [/writing] LIST ── HomeLayout · article index + TagFilter
│    └── /[slug] DETAIL ── ReadingLayout · WritingContent · JSON-LD Article · OG image · TOC
│
├── /api/chat (Node.js) · /api/github · /api/revalidate       ├── /og (dynamic OG 1200×630)
├── /sitemap.xml · /robots.txt · /manifest                 └── error / loading / not-found states
│
GLOBAL CHROME (all pages): TopBar (FluidIslandNav + theme toggle) · BottomDock (chatbot trigger)
                            · Footer
```

### Page → Component → Data map

| Route | Layout | Sections/Components | Data Source |
|-------|--------|--------------------|-------------|
| `/` | HomeLayout | 8 sections above | `data/personal`, `data/projects`, MDX via `lib/source` |
| `/projects` | HomeLayout | Bento + TagFilter + StatCard | MDX frontmatter (all 8, incl. in-progress) |
| `/projects/[slug]` | ReadingLayout | ProjectContent + JSON-LD | MDX body |
| `/writing` | HomeLayout | Beam-spine list + JournalNavigation? | MDX frontmatter (3 articles) |
| `/writing/[slug]` | ReadingLayout | WritingContent + JSON-LD + TOC | MDX body |

---

## 🎨 DESIGN DIRECTION

**Design Read:** engineer portfolio for recruiters/technical leads · editorial-luxury language · Tailwind v4 token-driven · Motion-first, GSAP reserved for pinning/horizontal pan.

**Dials (taste-adjusted):** `DESIGN_VARIANCE: 7` · `MOTION_INTENSITY: 7` · `VISUAL_DENSITY: 5`

### 👤 USER TASTE PROFILE (binding for all token + component decisions)

| Preference | Token/Design consequence |
|-----------|--------------------------|
| **Lower roundness** | Base radius 6px (not 10px); scale caps at 14px — no pill/2rem squircles; DoubleBezel adapted with tight concentric offsets |
| **Lesser spacing** | Section rhythm py-16/py-20 (not py-24+); component gaps tightened one step; overlap `-mt-12` standard |
| **More connected sections** | Continuity system intensified: deeper negative-margin overlaps, shared background canvas, handoff choreography between every adjacent pair |
| **Reverse animated components** | Every entrance paired with counter-motion (exit-reverse); parallax layers counter-move; stack cards scale DOWN on arrival |
| **Multi-color backgrounds** | Multi-hue tint system (existing pastel family: red/blue/green/yellow pairs) for card categories & TechStack shade rail — same saturation/lightness band, different hues |
| **Tracing-spotlight card hover** | Card-local mouse-tracked radial highlight (CSS vars updated on card mousemove) — NOT a custom cursor; decorative overlay only, disabled under reduced-motion/touch. Revives spotlight pattern at card scope |
| **Smooth scrolling animations** | Native `scroll-behavior: smooth` + IO/Motion reveals + GSAP scrub pinning; NO scroll-hijack libs |

**Archetypes selected** (`high-end-visual-design` skill):
- Vibe: **Editorial Luxury** — warm cream `#FDFBF7`, gold accent `#EBC429`, film-grain overlay at 0.03 opacity
- Layout families rotate per section (no repetition): Cascade → Split → Horizontal Pan → Stack → Bento → List → Spine → Accordion
- ⚠️ Skill's "py-24 macro-whitespace" and "rounded-[2rem] squircle" defaults are OVERRIDDEN by taste profile (tighter spacing, lower roundness win)

### Global Continuity System (simplified per user directive)

| Technique | Implementation |
|-----------|---------------|
| Backgrounds | **Plain solid token backgrounds** (`bg-background`) — ambient orb layer DEPRECATED at P08 (component kept unused for future revisit) |
| Section rhythm | Tight `--spacing-section` clamp + flex-col gap-first layout; no divider borders, minimal relative/z/overflow usage |
| Handoff choreography | Entrance reveals pair with previous exit-reverse (delivered via P09 ScrollReveal primitives) |
| Reverse-based feel | Parallax/counter-moves reserved for Hero pill layer + Experience stack only |

### Motion Rules

- Custom cubic-beziers only — `cubic-bezier(0.32,0.72,0,1)` / `(0.16,1,0.3,1)`. No linear/ease-in-out
- Animate ONLY `transform` + `opacity`. GPU-safe always
- `prefers-reduced-motion` → every animation collapses to static/instant
- Never `window.addEventListener('scroll')` — IO / Motion useScroll / GSAP ScrollTrigger only
- Entry reveals ≥800ms blur-fade-up; stagger cascade 60–100ms steps
- Eyebrow budget ≤3 across 8 sections; marquee usage page-wide ≤1

---

## 🎨 DESIGN TOKEN SYSTEM (Phase 2–4)

Three-layer architecture:

```
Primitive (raw hex, px values)
   ↓
Semantic (background, foreground, primary, muted, destructive...)
   ↓
Component (button-primary-bg, card-surface, techstack-shade-1..5)
```

| Token file (CSS, self-contained) | Contents |
|------------|----------|
| `lib/tokens/colors.css` | Semantic light/dark maps (shadcn names) · category pastels · sidebar/chart aliases + own `@theme inline` color mappings |
| `typography.css` | Font stacks (`--font-stack-*`) + font utilities mapping |
| `spacing.css` | Radius scale (DEFAULT 4px) · section rhythm/gutter spacing + mappings |
| `effects.css` | Tinted elevation e1–e5 · motion easings · GlowFrame spotlight vars |

Imported by `app/globals.css` via `@import "../lib/tokens/*.css"` — each file owns both its raw variables **and** its `@theme inline` namespace (Tailwind v4 merges multiple `@theme` blocks). No TS bridge, no drift.

Special tokens:
- **TechStack shades:** 5 solid tint steps from pastel family (one per card category)
- **Dark mode:** `.dark` class strategy via next-themes; gold-family primary; no pure `#000`/`#FFF`

---

## 📁 TARGET FOLDER STRUCTURE

```
.
├── app/
│   ├── (home)/
│   │   ├── _components/        Hero.jsx About.jsx TechStack.jsx Experience.jsx
│   │   │                       Projects.jsx Credentials.jsx Activities→Writings.jsx FAQ.jsx
│   │   └── page.tsx            (existing convention kept)
│   ├── projects/[...slug]/page.jsx + _components/ProjectContent.jsx
│   ├── writing/[...slug]/page.jsx + _components/WritingContent.jsx
│   ├── api/chat/route.ts       api/github/route.ts
│   ├── og/route.jsx            dynamic OG images
│   ├── layout.tsx              root layout (Next convention exception)
│   ├── providers.jsx           ThemeProvider + future providers
│   ├── globals.css             token-driven styles
│   └── sitemap.ts robots.ts manifest.ts loading.jsx error.jsx not-found.jsx
├── components/
│   ├── ui/                     shadcn primitives (.tsx PERMITTED ZONE)
│   ├── animations/             ScrollReveal StaggeredReveal Magnetic AmbientBackground
│   │                           HeroPills useGSAP.js
│   ├── lazy/                   index.jsx (next/dynamic registry) Skeleton.jsx
│   ├── chatbot/                Chatbot Message QuickActions
│   ├── analytics/              WebVitals NavLink
│   ├── layout/                 TopBar BottomDock Footer HomeLayout ReadingLayout Section Layout
│   ├── watermelon/             KEPT — integration targets mapped (see COMPONENTS_MAP.md)
│   ├── 21st/                   KEPT — style references (PricingCard→ProjectCard DNA, Timeline option)
│   └── *.jsx                   feature components (FavoriteStack TechPill AvatarStatus Heatmap ...)
├── lib/
│   ├── tokens/                 colors.css typography.css spacing.css effects.css
│   ├── fonts.ts                seo.ts structured-data.ts analytics.ts utils.ts source.ts
├── hooks/                      useReducedMotion.js etc
├── data/                       personal.ts idx.ts (education-only credentials after P17)
└── content/                    projects/*.mdx (8) writings/*.mdx (3)
```

---

## ⚡ PERFORMANCE STRATEGY

| Concern | Solution |
|---------|----------|
| Bundle <150KB/component | next/dynamic registry (ssr:false for GSAP/canvas/chat/palette); per-phase bundle delta checks |
| LCP <2.5s | Hero avatar OptimizedImage priority=true fetchPriority=high; fonts preload policy (sans yes, mono no) |
| CLS <0.1 | All images width/fill+sizes; skeleton fallbacks match final shape; font-display swap with size-adjust |
| INP <200ms | No scroll listeners; Motion values not useState for continuous input; heavy work in islands |
| Dep weight | Drop `ai` SDK (−70KB) → custom chatbot; optimizePackageImports for icon libraries |
| Caching | Edge API routes; immutable static asset headers; ISR revalidation endpoint |

---

## 🔍 SEO STRATEGY

| Layer | Implementation |
|-------|---------------|
| Metadata | Factory in `lib/seo.ts` — canonical, OG, Twitter, robots per route; metadataBase from existing `websiteDomain` |
| Structured data | Person + WebSite (root, exists) · Article (writing) · SoftwareApplication (project) · BreadcrumbList (deep pages) |
| Discovery | Dynamic sitemap including all MDX slugs · robots.ts · manifest |
| Social | Dynamic OG route `/og` — three templates (portfolio/project/writing), 1200×630, brand fonts |
| Content semantics | Single h1/page, heading hierarchy, semantic landmarks, skip-link (exists) |

---

## ♿ ACCESSIBILITY COMMITMENTS

- WCAG AA contrast on all token pairs (validated Phase 4 + Phase 21 sweep)
- Full keyboard paths: nav, dock, chatbot focus trap + restore, palette
- ARIA live regions for chatbot streaming; labels on all icon buttons
- Reduced-motion honored globally (CSS gate + JS primitive guards)
- Cursor-follow effects retired (a11y-hostile) — files kept, marked UNUSED

---

## 🤖 AI / RAG CHATBOT (Phase 18)

| Layer | Implementation |
|-------|---------------|
| **Primary LLM** | Groq `openai/gpt-oss-120b` (free tier: ~30 RPM, 14.4K RPD on 70B-class; ~500 tok/s streaming) |
| **Fallback LLM** | Google `gemini-3.1-flash-lite` (free tier, GA until ≥May 2027) |
| **Last Resort** | Canned `RESPONSES` object in Chatbot.jsx (never shows error) |
| **Vector Store** | Upstash Vector (model-based index: `openai/text-embedding-3-small`, 1536-dim) |
| **Embeddings** | Built-in Upstash (`upsert-data` / `query-data` with raw text) — zero external embedding API calls |
| **Indexer** | `scripts/build-index.js` — fumadocs sources + all structured data (experience, skills, credentials, projects, writings, botKnowledge); stable IDs; `index.reset()` + batched `upsert-data` |
| **Retrieval** | `index.query({ data: userQuery, topK: 3 })` — no embedding call at query time |
| **Prompt** | Two-tier: active page context (`currentPath`) + global RAG context; last 6 messages for multi-turn |
| **Streaming** | Vercel AI SDK `streamText` → `toTextStreamResponse()`; sources via `X-Sources` header |
| **Client** | Custom fetch + ReadableStream reader (no `useChat`); canned fallback on any error |
| **Dependencies** | `@ai-sdk/groq`, `@ai-sdk/google`, `ai@7` (server-only), `@upstash/vector` |

### Free-tier → Premium Path
1. **Now**: Groq free tier + Google free tier + Upstash free tier (10K queries/day, 1 GB)
2. **Growth trigger**: OpenRouter $10 one-time top-up (1K free req/day forever) OR Google Paid Tier 1 (~$1–2/mo, training opt-out)
3. **Embeddings**: Already zero-cost (Upstash built-in); migration to `gemini-embedding-001@1536` if higher quality needed later (requires re-index)

---

## 🚀 VERCEL DEPLOYMENT NOTES

- Framework preset: Next.js (auto)
- Security headers set (nosniff, frame-deny, referrer-policy, permissions-policy)
- Long-cache immutable for `/_next/static`
- Analytics + Speed Insights dashboards as post-launch monitoring surface
- Lighthouse CI gates PRs before merge
