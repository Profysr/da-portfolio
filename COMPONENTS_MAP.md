# 🧩 COMPONENTS MAP — Full Audit

**Companion docs:** `ROADMAP.md` (phases) · `ARCHITECTURE.md` (sitemap/design)
**Rule (updated 2026-08-31):** Unused components/files with **zero live consumers** are now **DELETED** on user directive (full cleanup pass). Verified via fallow dead-code + manual import audit. Previously "kept UNUSED" custom components, orphaned ai-elements files, and dead shadcn/ui primitives were removed. Remaining rows below reflect only files still on disk.

> **Phase renumber (P07 amendment, user directive):** lazy registry moved P07→**P22**; phases 8–11 shifted −1 (now 7–10); sections shifted −1 (About=12 … Chatbot=17); chat-api=18, SEO=19, OG/NavLinks=20; a11y sweep=21. Cells below reflect ORIGINAL numbers where historical; key targets now: TechStack=13 · Experience=14 · Projects=15 · Writings/Creds=16 · Chatbot swap=17 · NavLink rollout=20 · Registry=22.

**Score legend:** 10 core keep-optimize · 7-8 keep-modify · 5-6 consolidate · 3-4 replace usage · UNUSED = retired from imports
**Columns:** Where used today → Target role → Duplicates/similar → Disposition

---
## Filesystem note

`components/animations/` does **not** exist as a directory. Files historically referenced with that prefix are on disk at `components/ui/` (ScrollReveal.tsx, StaggeredList.tsx, MagneticButton.tsx, MagneticDock.tsx, dock.tsx, GSAPScrollRail.tsx, shimmer-button.tsx, animated-shiny-text.tsx, CurtainReveal.tsx, EditorialHeading.tsx, tracing-beam.tsx) or `hooks/useGSAP.js`. This file uses the **actual on-disk paths**.

`components/21st/` does **not** exist on disk. Timeline.tsx lives at `components/Timeline.tsx`. PricingCard.tsx has no disk presence.

---

## app/(home)/_components/ — Home Sections

| Component | What it does | Used in | Similar to | Score | Disposition |
|-----------|-------------|---------|------------|-------|-------------|
| Hero.jsx | Avatar status, typewriter roles, socials, shimmer CTA; LightRays removed P12 | Home | — | 7 | **P12 rebuild done**: LightRays+Particles+Suspense dropped; stack = status → kinetic headline → tagline → socials+ShimmerLink CTA on plain solid bg |
| About.jsx | Bio editorial split · DoubleBezel portrait (removed P12d; portrait content now inline/asymmetric) · NumberTicker stats · NumberSlider heatmap range · ViewOnMap | Home | — | 8 | ✅ **P12 DONE**: single-column max-w-3xl; NumberTicker on numeric stats; ViewOnMap and NumberSlider integrated P12bc |
| TechStack.jsx | GSAP dual-dimensional horizontal scroller · shade-differentiated cards | Home | FavoriteStack (marquee overlap) | 7 | ✅ **P13 DONE**: GSAP pin-scrub engine `components/ui/HorizontalScroll.tsx` · solid shade cards · no FavoriteStack; envItem wrap fix included |
| Experience.jsx | Work history scroll stories | Home | ScrollRail, GSAPScrollRail | 8 | ✅ **P14 DONE**: Timeline renderer (Rule #14 refactored — motion/react, tokens, scaleY spine, ResizeObserver, reduced-motion static); ScrollRail retired from this section (live in Credentials) |
| Projects.jsx | ALL projects incl. in-progress · asymmetric bento grid | Home | layouts/ProjectsBento | 8 | ✅ **P15 DONE**: ProjectCard.jsx PricingCard DNA; BorderBeam paused-until-hover; ContinuousTabs from TAG_META; all 8 projects including in-progress |
| Credentials.jsx | Education only (certs/awards commented out in data) | Home | StatCard | 8 | **P17 education ONLY** — certs + awards data preserved but commented out; ScrollRail.jsx is live consumer here (height→scaleY conversion = P21 candidate) |
| Activities.jsx → Writings.jsx | Writings · MDX articles | Home | Heatmap, JournalNavigation | 7 | ✅ **P17 DONE**: Activity section renamed to Writings — old `Activities.jsx` **DELETED (2026-08-31)** as dead (replaced by Writings.jsx) |
| FAQ.jsx / FAQClient.jsx | Accordion (server wrapper + client island) | Home | — | 9 | Keep; lazy client island |

---

## components/layout/

| Component | What it does | Used in | Score | Disposition |
|-----------|-------------|---------|-------|-------------|
| HomeLayout.jsx | App shell: TopBar, dock, footer | Home route | Layout.jsx | 8 | Replace banned scroll-listener with IO/Motion; plain solid bg confirmed |
| TopBar.jsx | Fixed top navigation · AnimatedThemeToggler | HomeLayout | — | 8 | ✅ Integrated: AnimatedThemeToggler (replaced ThemeSwitcher) + Logo.jsx mounted |
| BottomDock.jsx | Bottom macOS-style dock · chatbot trigger | HomeLayout | dock.tsx | 9 | ✅ Kept; ChatInputForm wired |
| Footer.jsx | Site footer | HomeLayout | ContactCard | 9 | Keep; ViewOnMap integration candidate |
| Section.jsx | Section wrapper | All sections | — | 9 | Add overlap/fade-mask variants (seamless system) |
| ReadingLayout.jsx | Article reading shell | Detail pages | — | 9 | Keep |
| Layout.jsx | Base layout primitives | Various | HomeLayout | 9 | Keep |
| Logo.jsx | Inline SVG logo (currentColor-native) | TopBar | — | 9 | Keep; server-safe render; h-7 |

---

## components/ui/ (.tsx permitted zone)

Files previously misplaced to `components/animations/` in older docs live here. No `components/animations/` directory exists on disk.

### ⭐ Core engines

| Component | Role | Score | Disposition |
|-----------|------|-------|-------------|
| components/ui/HorizontalScroll.tsx (export `ScrollWrapper`) | Horizontal pin-scrub scroll engine — P13 repaired (ctx-cleanup, overlay mount, container pan, a11y overflow fallback) | 9 | ✅ **P13 LIVE** in TechStack |
| DoubleBezel.tsx | ~~Nested machined-container aesthetic~~ | — | **DELETED (2026-08-31)** — zero consumers |
| blur-fade.tsx | Blur-in entrance | 8 | Hero entry workhorse |
| typing-animation.tsx | Typewriter effect | 9 | Headline device |
| kinetic-text.tsx | ~~Animated text emphasis~~ | — | **DELETED (2026-08-31)** — zero consumers |
| number-ticker.tsx | Count-up numbers | 8 | Stats rows |
| border-beam.tsx | ~~Animated border sweep~~ | — | **DELETED (2026-08-31)** — only dead FavoriteStack |
| tracing-beam.tsx | ~~Vertical scroll-drawn spine~~ | — | **DELETED (2026-08-31)** — zero consumers |
| FluidIslandNav.tsx | ~~Morphing island navigation~~ | — | **DELETED (2026-08-31)** — zero consumers; TopBar uses its own inline nav |
| useGSAP.js | ~~hooks/useGSAP.js — GSAP context cleanup, reduced-motion guard, re-exports gsap/ScrollTrigger~~ | — | **DELETED (2026-08-31)** — only consumer was dead StackedCards |

### Animation/reveal family (consolidated)

| Component | Score | Disposition |
|-----------|-------|-------------|
| ScrollReveal.tsx | 9 | ✅ **P10/P09 UPGRADED (LIVE)** — unified system with StaggeredReveal + ScrollRevealText; CSS data-visible keyframes; reduced-motion handled; consumer: Hero, About, Projects, Credentials, ContentCarousel |
| StaggeredList.tsx | ~~5~~ | **DELETED (2026-08-31)** — role merged into ScrollReveal; zero consumers |
| MagneticButton.tsx / MagneticDock.tsx | — | **DELETED (2026-08-31)** — MagneticLink replaced by ShimmerLink in Hero; MagneticDock had zero consumers |
| dock.tsx | 9 | ⭐ Dock A/B WINNER — live production dock inside BottomDock (P10 Option B verdict) |
| GSAPScrollRail.tsx | ~~6→UNUSED~~ | **DELETED (2026-08-31)** — zero consumers; superseded by Timeline spine (P14) |
| shimmer-button.tsx | 9 | ✅ **LIVE** — exports ShimmerButton + ShimmerLink (anchor variant); dark/light mode via `var(--color-foreground)`; used in Hero CTA |
| animated-theme-toggler.tsx | 9 | ✅ **LIVE** — view-transition animated theme toggle with clip-path shapes; replaces ThemeSwitcher in TopBar; uses @tabler/icons-react (IconMoon/IconSun) |
| animated-shiny-text.tsx | 6 | ✅ **LIVE** — AvatarStatus.jsx + layout/Footer.jsx (2 consumers) |
| CurtainReveal.tsx | ~~6~~ | **DELETED (2026-08-31)** — zero consumers |
| EditorialHeading.tsx / Heading.tsx | 6 | EditorialHeading **DELETED (2026-08-31)** — zero consumers; Heading.tsx kept |

### Content/display

| Component | Score | Disposition |
|-----------|-------|-------------|
| bento-grid.tsx | ~~6~~ | **DELETED (2026-08-31)** — only consumer was dead StatCard.jsx |
| TextMaskReveal.tsx | ~~7~~ | **DELETED (2026-08-31)** — zero consumers |
| animated-circular-progress-bar.tsx | ~~6~~ | **DELETED (2026-08-31)** — zero consumers |
| animated-beam.tsx | ~~5~~ | **DELETED (2026-08-31)** — only used by dead lazy.jsx; zero live consumers |

### Spotlight family → ✅ CONSOLIDATED into `GlowFrame.tsx` (DONE P03b)

| Component | Status |
|-----------|--------|
| GlowFrame.tsx | **The one component.** Wraps ANY child. Element-local pointer tracking (no window listeners): interior circular glow (`rgba(255,255,255,.14)`, 180px, blur 24px) + border seam-leak (conic-gradient, angle-chases mouse via motion). rAF-throttled CSS vars · reduced-motion + non-mouse-pointer guards · forwardRef |
| ~~cursor-glow.tsx~~ · ~~glowing-effect.tsx~~ · ~~spotlight-glow.tsx~~ · ~~spotlight.tsx~~ · ~~SpotlightCard.tsx~~ | **DELETED** — user-authorized Rule #13 exception (P03b). Migrations: `bento-grid.tsx` BentoCard root → GlowFrame; `TechStack.jsx` category cards → GlowFrame |

### Marked UNUSED — **DELETED (2026-08-31 full-cleanup pass)**

> These files previously had imports removed but were kept on disk (old Rule #13). Per user directive, all with zero live consumers were **permanently removed**.

| Component | Reason |
|-----------|--------|
| AmbientBackground.jsx | ⛔ P08 DEPRECATED: plain solid backgrounds preferred — **deleted** |
| StackedCards.jsx | P14 CSS-sticky deck; reserved for future section but zero consumers — **deleted** |
| MagneticButton.tsx | ShimmerLink replaced it in Hero; zero consumers — **deleted** |
| MagneticDock.tsx | P10 zero consumers (12KB) — **deleted** |
| light-rays.tsx | Removed from Hero; was only in dead lazy.jsx — **deleted** |
| particles.tsx | CSS-only approach replaced it; was only in dead lazy.jsx — **deleted** |
| ripple.tsx / pointer.tsx | Decorative redundancy; zero live imports — **deleted** |
| modal.tsx | dialog.tsx + drawer.tsx covered overlay needs; zero consumers — **deleted** |
| animated-beam.tsx | Only used by ContactCard via old lazy.jsx (dead) — **deleted** |
| animated-shiny-text.tsx | ⚠️ Kept — **LIVE** (AvatarStatus + Footer) |
| GSAPScrollRail.tsx | Zero consumers; superseded by Timeline spine — **deleted** |
| CurtainReveal.tsx | Zero consumers; route-transition never wired — **deleted** |
| bento-grid.tsx | Only consumer was dead StatCard — **deleted** |

### LEGACY LAZY SYSTEM (retired — files **DELETED** 2026-08-31)

| Component | Status | Action |
|-----------|--------|--------|
| components/common/lazy.jsx | Old React.lazy registry (ContactCard/StatCard era) | **DELETED** — superseded by `components/lazy/index.jsx` (next/dynamic) |
| LazyLightRays | light-rays.tsx deleted | **DELETED** with lazy.jsx |
| LazyParticles | particles.tsx deleted | **DELETED** with lazy.jsx |
| LazyAnimatedBeam | animated-beam.tsx deleted | **DELETED** with lazy.jsx |
| LazyNumberTicker | number-ticker.tsx kept (live in About) | removed from registry with lazy.jsx |
| LazyAnimatedShinyText | animated-shiny-text.tsx LIVE | removed from registry with lazy.jsx |

### shadcn primitives (live ones kept, token-migrated Phase 3–4)

Kept: button · badge · input… (input kept but **input-group deleted** 2026-08-31) · tooltip · expandable-list · carousel · drawer · breadcrumb · accordion · separator · spinner · shimmer · theme-switcher (still used in DocsTopBar; TopBar swapped to animated-theme-toggler) · shimmer-button · dock · hover-card KEPT⇢(see note) …

**DELETED (2026-08-31) dead shadcn/ui primitives (zero live consumers):** alert · animated-beam · animated-circular-progress-bar · bento-grid · border-beam · card · checkbox · collapsible · command · dialog · dropdown-menu · hover-card · input-group · input · label · marquee · modal · scroll-area · select · slider · sonner · switch · terminal · textarea · light-rays · particles · pointer · ripple · kinetic-text · tracing-beam

> Note: `input.tsx`/`textarea.tsx` (only via dead input-group→prompt-input), `collapsible`/`scroll-area`/`hover-card` (only via dead ai-elements), `command`/`dialog` (only each other) — all in self-contained dead chains, removed. `hover-card.tsx` had NO live consumer once dead `attachments.tsx` was removed.

---

## components/common/ (custom primitives — `.jsx` mandatory per Rule #2)

| Component | What it does | Score | Disposition |
|-----------|-------------|-------|-------------|
| Tabs.tsx | Tabbed switching with count chips · aria-selected + arrow-key nav | 9 | ✅ **P15 LIVE in Projects** (moved here from watermelon; Rule #14 refactored: token classes, demos commented, keyboard nav, filter tabs derive from TAG_META + live counts) |
| Markdown.jsx | AI chat markdown renderer · Streamdown + shared markdown-styles.js (chat scale) · ChatLink + inlineCode + img | Message.jsx → all AI messages | 9 | Same style engine as writing pages; only scale differs |
| CodeBlock.jsx | MarkdownPre — extracts language from MDX className, rebuilds fenced string, feeds Streamdown static mode → Shiki highlighting + native copy/download buttons | mdx-custom-components.jsx `pre` override | 9 | ✅ **P17c LIVE**; supersedes deleted docs/CodeBlock.jsx; Streamdown handles buttons natively |
| markdown-styles.js | ⚠️ `components/common/markdown-styles.js` — single source of truth for all markdown element styles (doc + chat scales); consumed by Markdown.jsx AND mdx-custom-components.jsx via `createMarkdownElements()` | Markdown.jsx · mdx-custom-components.jsx | — | 9 | Both AI messages and writing pages share identical base styles |
| OptimizedImage.jsx | next/image wrapper · neutral blur · Skeleton fallback | 9 | ✅ **P07 LIVE** (moved ui→common P07b; IconPhotoOff fallback; Skeleton underlay) |
| Skeleton.jsx | Shared pulse primitive · shape fallbacks | 9 | ✅ **P07 LIVE** |
| ViewOnMap.tsx | Location map block · modal-portal to body | 8 | ✅ **P12bc INTEGRATED** in About CTA row (Rule #14 refactored: gold token gradient, IconIcon set, rounded-lg) |
| NumberSlider.tsx | Interactive number range control | 8 | ✅ **P12bc INTEGRATED** in About (drives GitHub heatmap week range 24–44 wks; debounced 350ms; gold token gradient; strokeWidth-1.5 icons) |
| CodeBlock.jsx | Streamdown static-mode Shiki block (mac-dots header + copy btn) | 9 | ✅ **P17c LIVE** in mdx-components pre — supersedes deleted docs/CodeBlock.jsx |
| ContentCarousel.jsx | Embla-carousel shell (scroll-reveal wrapped) | 8 | ✅ **LIVE** — used by Writings.jsx and SimilarContent.jsx |
| lazy.jsx | ~~React.lazy registry~~ | — | **DELETED (2026-08-31)** — superseded by `components/lazy/index.jsx` (next/dynamic); zero consumers |
| NavLink.jsx | ~~`next/link` wrapper~~ | — | **DELETED (2026-08-31)** — created P20 but zero consumers ever migrated; ExtendedLink.jsx kept (see below) |
| ExtendedLink.jsx | Custom link wrapper | 3→UNUSED | ✅ **P20 MARKED UNUSED** — replaced by NavLink (which was then deleted); file kept Rule #13; consumers migrate P21 |

---

## components/docs/ — reading-experience layer (user-built P16 era)

> **mdx-components.jsx note:** `mdx-components.jsx` (project root) is a re-export wrapper that imports `{ mdxCustomComponents }` from `components/docs/mdx-custom-components.jsx`. The real live map is `components/docs/mdx-custom-components.jsx`.

| Component | What it does | Used in | Score | Disposition |
|-----------|-------------|---------|-------|-------------|
| mdx-custom-components.jsx | MDX renderer map (simplified): headings w/ anchor links + img ZoomImage + Callout — all base elements pulled from shared markdown-styles.js so writing and chat render identically | `mdx-components.jsx` → all writing/project pages | — | 9 | Keep; only 3 custom overrides; Streamdown handles code blocks natively via MarkdownPre (common/CodeBlock.jsx) |
| ~CodeBlock.jsx~ | Pre-wrapper w/ mac-dots header · NO highlighting | OLD mdx-components pre | — | **DELETED** (P17c user-authorized Rule #13 exception) — superseded by `common/CodeBlock.jsx` = Streamdown Shiki block. Zero live imports verified pre-delete. |
| TableOfContents.jsx | IO scrollspy TOC · mobile collapse · back-to-top/share | ReadingLayout ×2 | 8 | Keep; token polish queued |
| DocsTopBar.jsx | Reading chrome: logo/breadcrumb/back/theme | ReadingLayout | 8 | Keep (intentionally distinct from TopBar) |
| SimilarContent.jsx | Related items grid · house-DNA card | ReadingLayout | 8 | ✅ P17e vibe upgrade (GlowFrame + ScrollReveal stagger); shadow-e2 |
| ZoomImage.jsx | Lightbox zoom images | mdx-components img/Image | 7 | Keep; lightbox→ui/dialog swap = candidate; aspect-video fix queued |
| Callout.jsx | Admonitions over ui/alert | mdx-components | 9 | Keep as-is |
| DocsComponents.jsx | Steps/MDXTabs/Cards/Kbd/FileTree authoring widgets | — | — | UNUSED | **DELETED (2026-08-28)** — zero live imports verified across entire codebase; quarantined P17c; confirmed safe to remove |
| ~ReadingProgressBar.jsx~ | Scroll-progress bar | ~~DocsTopBar~~ | — | **DELETED** (user decision P17c): banned scroll-listener + width animation; role replaced by TOC/scrollbar |
| ~components/mdx-components.jsx~ | Stale duplicate 244-line MDX renderer (duplicated Heading/anchor + link + ZoomImage + Callout; imported `createMarkdownElements` from Markdown.jsx which no longer exports it; Alert/Accordion/Breadcrumb each imported twice) | Zero imports | — | **DELETED (2026-08-28)** — dead duplicate; never wired up; zero consumers; root `mdx-components.jsx` (8-line thin wrapper) is the active file |

---

## components/chatbot/ — LIVE (AIAssistant) + NEW (P17/18 planned)

> **Current (live):** `AIAssistant.tsx` uses `components/ai-elements/*` — active in HomeLayout via BottomDock trigger. `QuickActions.jsx` shared by legacy + new system. **Planned (new):** `Chatbot.jsx`, `Message.jsx`, `QuickActions.jsx` (P17), `ChatInputForm.jsx`, `AutoResizeTextArea.jsx` (P17b/P18) — not yet built. BottomDock.jsx wires to AIAssistant via `onAIClick`/`setIsAIOpen` in HomeLayout.

| Component | What it does | Score | Disposition |
|-----------|-------------|-------|-------------|
| AIAssistant.tsx | Live drawer-based chat using ai-elements | 7 | **ACTIVE** — used by HomeLayout; **P22 dynamic import** (heavy ~45KB island) |
| QuickActions.jsx | Quick-action chips (Projects/Experience/Stack/Contact) | 9 | Shared by legacy + new; keep |

---

## components/ai-elements/ — LIVE (used by AIAssistant.tsx via chatbot/)

> Only `conversation.tsx` and `message.tsx` had live consumers (imported by `chatbot/ChatConversation.tsx`). The other five were **DELETED (2026-08-31)** as orphans — they had zero imports; they were wired for the legacy AIAssistant flow that is no longer used.

| Component | What it does | Score | Disposition |
|-----------|-------------|-------|-------------|
| conversation.tsx | Conversation shell + scroll button | 7 | **LIVE** in AIAssistant; **P22 dynamic import candidate** |
| message.tsx | Message bubble + branch rendering | 7 | **LIVE** in AIAssistant; **P22 dynamic import candidate** |
| prompt-input.tsx | Input textarea + submit + tools | ~~7~~ | **DELETED** — zero consumers |
| shimmer.tsx | ⚠️ in `components/ui/shimmer.tsx` | 7 | **LIVE** — used by ChatConversation |
| sources.tsx | Source citations display | ~~6~~ | **DELETED** — zero consumers |
| suggestion.tsx | Follow-up suggestions | ~~6~~ | **DELETED** — zero consumers |
| reasoning.tsx | Reasoning display | ~~5~~ | **DELETED** — zero consumers |
| attachments.tsx | File attachment handling | ~~5~~ | **DELETED** — zero consumers (had uncommitted icon-swap edits; removed per user directive) |

## Root `components/`

| Component | What it does | Score | Disposition |
|-----------|-------------|-------|-------------|
| FavoriteStack.jsx | Compact tech marquee + grid | ~~7~~ | **DELETED (2026-08-31)** — zero consumers as marquee; data retained in `data/skills.js` |
| TechPill.jsx | Tech logo/name pill atom | 9 | Reused in Hero, TechStack, bento meta; icon-only box widened |
| AvatarStatus.jsx | Availability avatar chip | 9 | Hero element #1; post-P12 optimized |
| CommandPallete.jsx | ⌘K command palette | 8 | Strict lazy island |
| Heatmap.jsx | Contribution heatmap · lazy + cached API | 8 | Candidate visual for Writings/Activity strip; NumberSlider (in About) controls week range |
| StatCard.jsx | Metric card | ~~8~~ | **DELETED (2026-08-31)** — zero consumers; its BentoCard import was a dead chain |
| ContactCard.jsx | Contact info card | 8 | Contact/footer area |
| StackedCards.jsx | CSS-sticky deck + GSAP scrub | — | **DELETED (2026-08-31)** — zero consumers (reserved-for-future never wired) |
| MasonryGrid.jsx | Masonry grid layout | — | Verify live imports (internal reference from expandable-list) · file kept |
| Timeline.tsx | **FILESYSTEM NOTE:** lives at `components/Timeline.tsx` (root) | 8 | ✅ **P14 LIVE in Experience** |

---

## components/watermelon/ — INTEGRATED

> Rule #14: components refactored before wiring in. ViewOnMap and NumberSlider now live in `components/common/`.

| Component | What it does | Proposed fit | Phase |
|-----------|-------------|--------------|-------|
| Tabs.tsx | ✅ **P15 LIVE in Projects** — moved to `components/common/Tabs.tsx`; Rule #14 refactored: token classes, demos commented, keyboard nav, count chips, aria-controls | Projects section | ✅ P15 |
| JournalNavigation.tsx | ⚠️ **DELETED (2026-08-31)** — zero consumers; never wired | (was Writings nav P21 candidate) | — |
| ComposeEmail.tsx | ⚠️ **DELETED (2026-08-31)** — zero consumers; never wired | (was footer composer P21 candidate) | — |
| ViewOnMap.tsx | ✅ **P12bc INTEGRATED in About** — moved to `components/common/ViewOnMap.tsx`; portaled to body; Rule #14 refactored | About CTA row | ✅ P12 |
| NumberSlider.tsx | ✅ **P12bc INTEGRATED in About** — moved to `components/common/NumberSlider.tsx`; drives GitHub heatmap week range; Rule #14 refactored | About band (heatmap control) | ✅ P12 |

---

## components/layouts/

| Component | Score | Disposition |
|-----------|-------|-------------|
| ProjectsBento.tsx | 5 | **P16 rebuild** — true asymmetric bento iterating ALL 8 projects incl. in-progress status |

---

## app/ infrastructure

| File | Score | Disposition |
|------|-------|-------------|
| layout.tsx | 8 | P6: providers, Analytics, SpeedInsights, WebVitals, dual themeColor (stays .tsx — Next root convention) |
| globals.css | 9 | Token injection P4, keyframes P9, seamless masks, reveal system, ambient-orb block removed P08d; hero glow SVG U-curve added (primary/foreground/destructive paths with Gaussian blur); shimmer-slide + spin-around keyframes via @theme inline |
| loading.jsx / error.jsx / not-found.jsx | 9 | Polish during relevant passes |
| sitemap.ts / robots.ts / manifest.ts | 9 | Dynamic MDX slugs |
| api/github/route.ts | 8 | Cache headers pass |

---

## Duplicate/Risk Summary

| Cluster | Members | Resolution |
|---------|---------|-----------|
| Dock systems | BottomDock · dock.tsx · MagneticDock.tsx | ✅ RESOLVED P10 Option B: dock.tsx wins; **MagneticDock DELETED (2026-08-31)** |
| Scroll rails | ScrollRail · GSAPScrollRail · tracing-beam · Timeline · HorizontalScroll | ✅ P14 Timeline = Experience spine; **ScrollRail, GSAPScrollRail, tracing-beam all DELETED (2026-08-31)** — zero consumers; HorizontalScroll = TechStack engine |
| Overlays | dialog · drawer · modal | **dialog + modal DELETED (2026-08-31)**; drawer wins |
| Headings | Heading.tsx · EditorialHeading.tsx · TextMaskReveal.tsx | **EditorialHeading + TextMaskReveal DELETED (2026-08-31)**; Heading.tsx kept |
| Marquees | FavoriteStack · TechStack shade cards | **FavoriteStack DELETED (2026-08-31)**; data retained in data/skills.js |
| Chat stacks | ai-elements/* (conversation+message LIVE via ChatConversation) · prompt-input/attachments/sources/suggestion/reasoning | 5 orphaned ai-elements **DELETED (2026-08-31)**; conversation + message kept |
| mdx exports | Root `mdx-components.jsx` (thin wrapper) · `components/docs/mdx-custom-components.jsx` (live map) | ✅ Clean: root wrapper canonical; dead duplicate already removed |
| CTA buttons | MagneticButton/MagneticLink → ShimmerLink (shimmer-button.tsx) | ✅ RESOLVED: **MagneticButton DELETED**; ShimmerLink live in Hero |
| Theme toggles | ThemeSwitcher → AnimatedThemeToggler | ✅ RESOLVED in TopBar; ThemeSwitcher still live in DocsTopBar |