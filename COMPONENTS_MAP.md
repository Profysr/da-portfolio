# 🧩 COMPONENTS MAP — Full Audit

**Companion docs:** `ROADMAP.md` (phases) · `ARCHITECTURE.md` (sitemap/design)
**Rule:** NO component is deleted. Deprecated items are marked `UNUSED` and their imports removed — files stay on disk. *User-authorized exceptions:* HeroPills.jsx (P11b) · spotlight family (P03b) · ai-elements/ (P17c) · CodeBlock docs/ version (P17c).

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
| Hero.jsx | Avatar status, typewriter roles, socials, magnetic CTA; LightRays removed P12 | Home | — | 7 | **P12 rebuild done**: LightRays+Particles+Suspense dropped; stack = status → kinetic headline → tagline → socials+CTA on plain solid bg |
| About.jsx | Bio editorial split · DoubleBezel portrait (removed P12d; portrait content now inline/asymmetric) · NumberTicker stats · NumberSlider heatmap range · ViewOnMap | Home | — | 8 | ✅ **P12 DONE**: single-column max-w-3xl; NumberTicker on numeric stats; ViewOnMap and NumberSlider integrated P12bc |
| TechStack.jsx | GSAP dual-dimensional horizontal scroller · shade-differentiated cards | Home | FavoriteStack (marquee overlap) | 7 | ✅ **P13 DONE**: GSAP pin-scrub engine `components/ui/HorizontalScroll.tsx` · solid shade cards · no FavoriteStack; envItem wrap fix included |
| Experience.jsx | Work history scroll stories | Home | ScrollRail, GSAPScrollRail | 8 | ✅ **P14 DONE**: Timeline renderer (Rule #14 refactored — motion/react, tokens, scaleY spine, ResizeObserver, reduced-motion static); ScrollRail retired from this section (live in Credentials) |
| Projects.jsx | ALL projects incl. in-progress · asymmetric bento grid | Home | layouts/ProjectsBento | 8 | ✅ **P15 DONE**: ProjectCard.jsx PricingCard DNA; BorderBeam paused-until-hover; ContinuousTabs from TAG_META; all 8 projects including in-progress |
| Credentials.jsx | Education only (certs/awards commented out in data) | Home | StatCard | 8 | **P17 education ONLY** — certs + awards data preserved but commented out; ScrollRail.jsx is live consumer here (height→scaleY conversion = P21 candidate) |
| Activities.jsx → Writings.jsx | Writings · MDX articles on tracing-beam spine | Home | Heatmap, JournalNavigation | 7 | ✅ **P17 DONE**: Activity section renamed to Writings; tracing-beam spine — JournalNavigation (watermelon) integration = P21 |
| FAQ.jsx / FAQClient.jsx | Accordion (server wrapper + client island) | Home | — | 9 | Keep; lazy client island |

---

## components/layout/

| Component | What it does | Used in | Score | Disposition |
|-----------|-------------|---------|-------|-------------|
| HomeLayout.jsx | App shell: TopBar, dock, footer, AmbientBackground retracted P08d | Home route | Layout.jsx | 8 | Replace banned scroll-listener with IO/Motion; plain solid bg confirmed (AmbientBackground DEPRECATED, file kept UNUSED) |
| TopBar.jsx | Fixed top navigation · theme toggle · NavLink | HomeLayout | FluidIslandNav | 8 | ✅ Integrated: theme switch + NavLink prefetching; Logo.jsx mounted |
| BottomDock.jsx | Bottom macOS-style dock · chatbot trigger | HomeLayout | dock.tsx, MagneticDock.tsx | 9 | ✅ Kept; ChatInputForm wired |
| Footer.jsx | Site footer | HomeLayout | ContactCard | 9 | Keep; ComposeEmail/ViewOnMap integration candidates |
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
| DoubleBezel.tsx | Nested machined-container aesthetic | 9 | Core premium container everywhere |
| blur-fade.tsx | Blur-in entrance | 8 | Hero entry workhorse |
| typing-animation.tsx | Typewriter effect | 9 | Headline device |
| kinetic-text.tsx | Animated text emphasis | 8 | Headline emphasis |
| number-ticker.tsx | Count-up numbers | 8 | Stats rows |
| border-beam.tsx | Animated border sweep | 8 | Bento card hover (paused-until-hover) |
| tracing-beam.tsx | Vertical scroll-drawn spine | 8 | Writings spine (P21 candidate) |
| FluidIslandNav.tsx | Morphing island navigation | 8 | TopBar integration |
| useGSAP.js | ⚠️ Lives at `hooks/useGSAP.js` — GSAP context cleanup, reduced-motion guard, re-exports gsap/ScrollTrigger | — | Keep; P10 DONE |

### Animation/reveal family (consolidated)

| Component | Score | Disposition |
|-----------|-------|-------------|
| ScrollReveal.tsx | 9 | ✅ **P10/P09 UPGRADED (LIVE)** — unified system with StaggeredReveal + ScrollRevealText; CSS data-visible keyframes; reduced-motion handled; consumer: Hero, About, Projects, Credentials, ContentCarousel, EditorialHeading |
| StaggeredList.tsx | 5 | Role merged into ScrollReveal (file kept) |
| MagneticButton.tsx / MagneticDock.tsx | — | MagneticLink/MagneticButton LIVE in Hero, live pattern in TechPill, About; **MagneticDock → UNUSED** (P10 Option B: zero consumers, 12KB, file kept) |
| dock.tsx | 9 | ⭐ Dock A/B WINNER — live production dock inside BottomDock (P10 Option B verdict) |
| GSAPScrollRail.tsx | 6→UNUSED | Zero consumers; superseded by Timeline spine (P14) — file kept |
| shimmer-button.tsx | 5 | Fold styling into Magnetic variants (file kept) |
| animated-shiny-text.tsx | 6 | Max once (badge accent); check live use |
| CurtainReveal.tsx | 6 | Route-transition candidate — future decision |
| EditorialHeading.tsx / Heading.tsx | 6 | Two heading systems — consolidate (files kept); EditorialHeading uses ScrollRevealText internally |

### Content/display

| Component | Score | Disposition |
|-----------|-------|-------------|
| bento-grid.tsx | 6 | Reference base for P15 rebuild (rebuilt true asymmetric; file kept) |
| TextMaskReveal.tsx | 7 | Section headings; consolidate heading roles P13+ |
| animated-circular-progress-bar.tsx | 6 | Credential stat option (P17 decision) |
| animated-beam.tsx | 5 | Verify zero live imports then retire |

### Spotlight family → ✅ CONSOLIDATED into `GlowFrame.tsx` (DONE P03b)

| Component | Status |
|-----------|--------|
| GlowFrame.tsx | **The one component.** Wraps ANY child. Element-local pointer tracking (no window listeners): interior circular glow (`rgba(255,255,255,.14)`, 180px, blur 24px) + border seam-leak (conic-gradient, angle-chases mouse via motion). rAF-throttled CSS vars · reduced-motion + non-mouse-pointer guards · forwardRef |
| ~~cursor-glow.tsx~~ · ~~glowing-effect.tsx~~ · ~~spotlight-glow.tsx~~ · ~~spotlight.tsx~~ · ~~SpotlightCard.tsx~~ | **DELETED** — user-authorized Rule #13 exception (P03b). Migrations: `bento-grid.tsx` BentoCard root → GlowFrame; `TechStack.jsx` category cards → GlowFrame |

### Marked UNUSED (imports removed — FILES KEPT)

| Component | Reason |
|-----------|--------|
| AmbientBackground.jsx | ⛔ P08 DEPRECATED by user: plain solid backgrounds preferred; simplification pass. Kept for future revisit — grain still awaits noise asset |
| StackedCards.jsx | **FILESYSTEM NOTE:** lives at `components/StackedCards.jsx` (root, NOT `components/animations/`). P14 CSS-sticky deck + GSAP scrub scale-handoff (0.92/0.55, reversible, reduced-motion-safe). **User-directed: reserved for a FUTURE section (not Experience)** — zero consumers today, file kept |
| light-rays.tsx | User removing from Hero; superseded by plain-solid directive; file kept |
| particles.tsx | Replaced by CSS-only approach; superseded by plain-solid directive; file kept |
| ripple.tsx / pointer.tsx / background-gradient.tsx | Decorative redundancy — verify zero live imports then mark UNUSED permanently |
| modal.tsx | dialog.tsx + drawer.tsx cover all overlay needs — verify usage first (zero consumers believed) |

### shadcn primitives (all kept, token-migrated Phase 3–4)

button · button-group · card · badge · input · input-group · textarea · label · select · checkbox · switch · slider · tooltip · hover-card · collapsible · dropdown-menu · separator · scroll-area · spinner · sonner · drawer · dialog · expandable-list · terminal · breadcrumb · alert · carousel · accordion · theme-switcher

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
| lazy.jsx | React.lazy registry | 3→UNUSED | Superseded by `components/lazy/index.jsx` next/dynamic P22 (file kept Rule #13) |
| NavLink.jsx | `next/link` wrapper · active state via `usePathname()` · prefetch intent · forwardRef | 9 | ✅ **P20 CREATED** — replaces ExtendedLink; consumer migration deferred to P21 |
| ExtendedLink.jsx | Custom link wrapper | 3→UNUSED | ✅ **P20 MARKED UNUSED** — replaced by NavLink.jsx (file kept Rule #13; consumers migrate P21) |

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

## components/chatbot/ — LIVE (P17/P18)

| Component | What it does | Score | Disposition |
|-----------|-------------|-------|-------------|
| Chatbot.jsx | Custom streaming UI · focus trap · no ai SDK | 9 | ✅ **P17/P18 LIVE** in BottomDock |
| Message.jsx | Message bubble · Markdown rendering · streamdown | 9 | ✅ **P17b LIVE** — regex renderMarkdown replaced by `<Markdown>` |
| QuickActions.jsx | Quick-action chips (Projects/Experience/Stack/Contact) | 9 | ✅ **P17 LIVE** |
| ChatInputForm.jsx | Client-side validation · character counter · rate-limit display · submit gating | 9 | ✅ **P17b/P18 LIVE** — Zod guard + credit system wired |
| AutoResizeTextArea.jsx | Auto-growing textarea | 9 | ✅ **P17 LIVE** — imported by ChatInputForm |

---

## Root `components/`

| Component | What it does | Score | Disposition |
|-----------|-------------|-------|-------------|
| FavoriteStack.jsx | Compact tech marquee + grid; data source retained | 7 | **Zero consumers as marquee** (P13); data reused for Hero pills; file kept |
| TechPill.jsx | Tech logo/name pill atom | 9 | Reused in Hero, TechStack, bento meta; icon-only box widened |
| AvatarStatus.jsx | Availability avatar chip | 9 | Hero element #1; post-P12 optimized |
| CommandPallete.jsx | ⌘K command palette | 8 | Strict lazy island |
| Heatmap.jsx | Contribution heatmap · lazy + cached API | 8 | Candidate visual for Writings/Activity strip; NumberSlider (in About) controls week range |
| StatCard.jsx | Metric card | 8 | Listings/stats |
| ContactCard.jsx | Contact info card | 8 | Contact/footer area |
| StackedCards.jsx | **FILESYSTEM NOTE:** lives at `components/StackedCards.jsx` (root, NOT `components/animations/`). CSS-sticky deck + GSAP scrub scale-handoff | — | Reserved for a future section (not Experience) · zero consumers · file kept |
| MasonryGrid.jsx | Masonry grid layout | — | Verify live imports (internal reference from expandable-list) · file kept |
| Timeline.tsx | **FILESYSTEM NOTE:** lives at `components/Timeline.tsx` (root). NOT `components/21st/Timeline.tsx` (that path does not exist) | 8 | ✅ **P14 LIVE in Experience** (Rule #14 refactored: motion/react · tokens · scaleY transform-only spine · ResizeObserver · reduced-motion) |

---

## components/watermelon/ — INTEGRATED

> Rule #14: components refactored before wiring in. ViewOnMap and NumberSlider now live in `components/common/`.

| Component | What it does | Proposed fit | Phase |
|-----------|-------------|--------------|-------|
| Tabs.tsx | ✅ **P15 LIVE in Projects** — moved to `components/common/Tabs.tsx`; Rule #14 refactored: token classes, demos commented, keyboard nav, count chips, aria-controls | Projects section | ✅ P15 |
| JournalNavigation.tsx | Journal-style prev/next nav | Writings section navigation | P21 candidate |
| ComposeEmail.tsx | Email compose widget | Contact composer in footer area | P21 candidate |
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
| globals.css | 9 | Token injection P4, keyframes P9, seamless masks, reveal system, ambient-orb block removed P08d |
| loading.jsx / error.jsx / not-found.jsx | 9 | Polish during relevant passes |
| sitemap.ts / robots.ts / manifest.ts | 9 | Dynamic MDX slugs |
| api/github/route.ts | 8 | Cache headers pass |

---

## Duplicate/Risk Summary

| Cluster | Members | Resolution |
|---------|---------|-----------|
| Dock systems | BottomDock · dock.tsx · MagneticDock.tsx | ✅ RESOLVED P10 Option B: dock.tsx wins (live evidence); MagneticDock UNUSED (kept) |
| Scroll rails | ScrollRail (live in Credentials) · GSAPScrollRail · tracing-beam · Timeline · HorizontalScroll | ✅ P14: Timeline = Experience spine; ScrollRail = Credentials only (height→scaleY conversion = P21 candidate); GSAPScrollRail UNUSED; tracing-beam = Writings candidate (P21); HorizontalScroll = TechStack engine |
| Overlays | dialog · drawer · modal | modal → UNUSED candidate |
| Headings | Heading.tsx · EditorialHeading.tsx · TextMaskReveal.tsx | Consolidate roles P13+ |
| Marquees | FavoriteStack (zero marquee consumers, data source kept) · TechStack shade cards | Page budget ≤1 post-P14 |
| Chat stacks | AssistantAi (UNUSED, kept) · ai-elements (DELETED 2026-08-26) → chatbot/* + common/Markdown | ✅ chatbot/* LIVE; AssistantAi swap completes at P18 |
| mdx exports | Root `mdx-components.jsx` (8-line thin wrapper → delegates to docs/mdx-custom-components) · `components/mdx-components.jsx` (244-line dead duplicate, **DELETED 2026-08-28**) · `components/docs/mdx-custom-components.jsx` (live map: 3 overrides — headings, links, images; base elements from shared markdown-styles.js) | ✅ Clean: root wrapper is canonical; dead duplicate removed; shared style engine via markdown-styles.js |