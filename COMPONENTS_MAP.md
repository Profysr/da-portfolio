# 🧩 COMPONENTS MAP — Full Audit

**Companion docs:** `ROADMAP.md` (phases) · `ARCHITECTURE.md` (sitemap/design)
**Rule:** NO component is deleted. Deprecated items are marked `UNUSED` and their imports removed — files stay on disk.

**Score legend:** 10 core keep-optimize · 7-8 keep-modify · 5-6 consolidate · 3-4 replace usage · UNUSED = retired from imports
**Columns:** Where used today → Target role → Duplicates/similar → Disposition

---

## app/(home)/_components/ — Home Sections

| Component | What it does | Used in | Similar to | Score | Disposition |
|-----------|-------------|---------|------------|-------|-------------|
| Hero.jsx | Avatar status, typewriter roles, FavoriteStack marquee, socials, magnetic CTA, scroll cue; currently mounts LightRays | Home | — | 7 | **P12 rebuild**: drop LightRays+Particles imports, add floating pill layer, restructure stack per hero discipline |
| About.jsx | Bio section | Home | — | 8 | P13 editorial-split recomposition, DoubleBezel portrait, NumberTicker stats |
| TechStack.jsx | Tech categories display | Home | FavoriteStack (marquee overlap) | 7 | **P14**: GSAP horizontal scroller, solid shade cards; absorbs page marquee budget decision |
| Experience.jsx | Work history | Home | 21st/Timeline, GSAPScrollRail | 8 | P15 scroll-stories; mechanism user-decided (sticky-stack vs Timeline) |
| Projects.jsx | Project grid feed | Home | layouts/ProjectsBento | 8 | P16 feeds rebuilt true bento |
| Credentials.jsx | Education + certs + awards | Home | StatCard | 8 | **P17 education ONLY** — comment out certs/awards data |
| Activities.jsx | Writings + activity mix | Home | Heatmap, JournalNavigation | 7 | **P17 redesign → Writings-only** |
| FAQ.jsx / FAQClient.jsx | Accordion (server wrapper + client island) | Home | — | 9 | Keep pattern; lazy client island |

## components/layout/

| Component | What it does | Used in | Similar to | Score | Disposition |
|-----------|-------------|---------|------------|-------|-------------|
| HomeLayout.jsx | App shell: TopBar, dock, AI, footer; scroll listener for nav visibility | Home route | Layout.jsx | 8 | Replace banned scroll-listener with IO/Motion; mount AmbientBackground layer |
| TopBar.jsx | Fixed top navigation | HomeLayout | FluidIslandNav | 8 | Integrate theme toggle + NavLink prefetching |
| BottomDock.jsx | Bottom macOS-style dock w/ chatbot trigger | HomeLayout | dock.tsx, MagneticDock.tsx | 9 | Keep; wire LazyChatbot P19 |
| Footer.jsx | Site footer | HomeLayout | ContactCard | 9 | Keep; ComposeEmail/ViewOnMap integration candidates |
| Section.jsx | Section wrapper | All sections | — | 9 | Add overlap/fade-mask variants (seamless system) |
| ReadingLayout.jsx | Article reading shell | Detail pages | — | 9 | Keep |
| Layout.jsx | Base layout primitives | Various | HomeLayout | 9 | Keep |

## components/ui/ (.tsx permitted zone)

### ⭐ Core engines
| Component | Role | Score | Disposition |
|-----------|------|-------|-------------|
| GSAPHorizontalScroll.tsx | Horizontal pin-scrub scroll engine | 9 | **P14 TechStack engine** |
| DoubleBezel.tsx | Nested machined-container aesthetic | 9 | Core premium container everywhere |
| blur-fade.tsx | Blur-in entrance | 8 | Hero entry workhorse |
| typing-animation.tsx | Typewriter effect | 9 | Headline device |
| kinetic-text.tsx | Animated text emphasis | 8 | Headline emphasis |
| number-ticker.tsx | Count-up numbers | 8 | Stats rows |
| border-beam.tsx | Animated border sweep | 8 | Bento card hover |
| tracing-beam.tsx | Vertical scroll-drawn spine | 8 | Writings spine |
| FluidIslandNav.tsx | Morphing island navigation | 8 | TopBar integration |

### Animation/reveal family (consolidation targets)
| Component | Score | Disposition |
|-----------|-------|-------------|
| ScrollReveal.tsx | 8 | Absorbed into `animations/ScrollReveal` P10 (file kept) |
| StaggeredList.tsx | 5 | Role merged into StaggeredReveal (file kept) |
| MagneticButton.tsx / MagneticDock.tsx | 7 | Consolidate into one `Magnetic` primitive P11 (files kept); dock-system winner decided with user |
| dock.tsx | 6 | Competes with MagneticDock/BottomDock — ONE dock system total |
| GSAPScrollRail.tsx | 6 | Overlaps Timeline/HorizontalScroll — pick one rail system |
| shimmer-button.tsx | 5 | Fold styling into Magnetic variants (file kept) |
| animated-shiny-text.tsx | 6 | Max once (badge accent) |
| CurtainReveal.tsx | 6 | Route-transition candidate — future decision |
| EditorialHeading.tsx / Heading.tsx | 6 | Two heading systems — consolidate (files kept) |

### Content/display
| Component | Score | Disposition |
|-----------|-------|-------------|
| bento-grid.tsx | 6 | Reference base for P16 rebuild (extend or replace) |
| TextMaskReveal.tsx | 7 | Section headings |
| animated-circular-progress-bar.tsx | 6 | Credential stat option (P17 decision) |
| animated-beam.tsx | 5 | Lazy-load only if a use survives audit |

### Marked UNUSED (imports removed when encountered — FILES KEPT)
| Component | Reason |
|-----------|--------|
| light-rays.tsx | User removing from Hero; replaced by AmbientBackground |
| particles.tsx | Replaced by CSS-only AmbientBackground |
| spotlight.tsx / spotlight-glow.tsx / SpotlightCard.tsx / cursor-glow.tsx | Cursor-follow effects: accessibility-hostile + perf cost |
| ripple.tsx / pointer.tsx / background-gradient.tsx / glowing-effect.tsx | Decorative redundancy — verify zero live imports then mark UNUSED |
| modal.tsx | dialog.tsx + drawer.tsx cover all overlay needs — verify usage first |

### shadcn primitives (all kept, token-migrated Phase 3–4)
button · button-group · card · badge · input · input-group · textarea · label · select · checkbox · switch · slider · tooltip · hover-card · collapsible · dropdown-menu · separator · scroll-area · spinner · sonner · drawer · dialog · expandable-list · terminal

## Root components/

| Component | What it does | Score | Disposition |
|-----------|-------------|-------|-------------|
| FavoriteStack.jsx | Compact tech marquee + full grid variant | 7 | Data source for Hero floating pills; compact-marquee role retired P12 |
| TechPill.jsx | Tech logo/name pill atom | 9 | Reused in Hero pills, TechStack, bento meta |
| AvatarStatus.jsx | Availability avatar chip | 9 | Hero element #1 |
| CommandPallete.jsx | ⌘K command palette | 8 | Strict lazy island |
| Heatmap.jsx | Contribution heatmap | 8 | Lazy + cached API; candidate visual for Writings/Activity strip |
| TagFilter.jsx | Tag filtering UI | 8 | Listing pages |
| StatCard.jsx | Metric card | 8 | Listings/stats |
| ContactCard.jsx | Contact info card | 8 | Contact/footer area |
| mdx-components.jsx | MDX renderer map | 9 | Keep |
| ExtendedLink.jsx | Custom link wrapper | 3→UNUSED | Replaced by analytics/NavLink P21 (file kept) |
| AssistantAi.jsx | AI chat panel (ai SDK) | 3→UNUSED | Replaced by chatbot/* P18 (file kept) |
| lazy.jsx | React.lazy registry | 3→UNUSED | Superseded by lazy/index.jsx next/dynamic P7 (file kept) |
| ai-elements/message·conversation·suggestion.tsx | Chat UI patterns | UNUSED | Design reference absorbed into lightweight chatbot (files kept) |

## components/watermelon/ — PLANNED INTEGRATION (user directive: USE these)

> ⚠️ **Rule #14 — REFACTOR GATE:** every component below MUST be refactored before wiring in: standardize CSS classes to `@theme` tokens · comment out demo/sample content · then integrate. Never import raw.

| Component | What it does | Proposed fit | Phase |
|-----------|-------------|--------------|-------|
| Tabs.tsx | Animated tab switcher | ✅ CONFIRMED: TechStack category switcher (P14); Writings filter reuse optional later | P14 — ⚠️ refactor first per Rule #14 (token-standardize classes, comment out demos) |
| JournalNavigation.tsx | Journal-style prev/next nav | Writings section navigation | P17 |
| ComposeEmail.tsx | Email compose widget | Contact composer in footer area | P21 |
| ViewOnMap.tsx | Location map block | Location near contact/footer | P21 |
| NumberSlider.tsx | Interactive number slider | Filter/stat control (optional) | Candidate P16/P17 |

## components/21st/ — KEPT WITH PURPOSE (user directive)

> ⚠️ **Rule #14 — REFACTOR GATE:** same as watermelon — token-standardize classes, comment out demos, then integrate.

| Component | Purpose |
|-----------|---------|
| PricingCard.tsx | **Style DNA source** for new minimal ProjectCard (P16) — extract aesthetic, build `ProjectCard.jsx` |
| Timeline.tsx | Story/timeline renderer — Experience P15 **A/B vs sticky-stack: both built, winner kept** (refactor first per Rule #14) |

## components/layouts/

| Component | Score | Disposition |
|-----------|-------|-------------|
| ProjectsBento.tsx | 5 | Current version NOT the actual bento → **P16 rebuild** as true asymmetric bento iterating ALL 8 projects incl. in-progress status |

## app/ infrastructure

| File | Score | Disposition |
|------|-------|-------------|
| layout.tsx | 8 | P6: providers, Analytics, SpeedInsights, WebVitals, dual themeColor (stays .tsx — Next root convention) |
| globals.css | 9 | Token injection P4, keyframes P9, seamless masks |
| loading.jsx / error.jsx / not-found.jsx | 9 | Polish during relevant passes |
| sitemap.ts / robots.ts / manifest.ts | 9 | Add dynamic MDX slugs |
| api/github/route.ts | 8 | Cache headers pass |

---

## Duplicate/Risk Summary

| Cluster | Members | Resolution |
|---------|---------|-----------|
| Dock systems | BottomDock · dock.tsx · MagneticDock.tsx | A/B BOTH live in BottomDock slot (P11) → keep winner; loser UNUSED (file kept) |
| Scroll rails | GSAPScrollRail · tracing-beam · 21st/Timeline · GSAPHorizontalScroll | Each gets distinct job or marked UNUSED after P15/P17 |
| Overlays | dialog · drawer · modal | modal → UNUSED candidate |
| Headings | Heading.tsx · EditorialHeading.tsx · TextMaskReveal.tsx | Consolidate roles P13+ |
| Marquees | marquee.tsx (via FavoriteStack, TechStack?) | Page budget ≤1 post-P14 |
| Chat stacks | AssistantAi + ai-elements → chatbot/* | Swap P18–P19, old files kept |
