# Bilal Ahmad — Software Engineer Portfolio

> Engineer portfolio for recruiters, technical leads, and collaborators — editorial-luxury language, GSAP motion-first, WCAG AA.

**Live at:** [`bilalahmad.dev`](https://bilalahmad.dev)

---

## 📑 Sections

| Section | Content |
|---------|---------|
| **Hero** | Avatar status chip · kinetic typewriter headline · social links · magnetic CTA |
| **About** | Editorial-split bio · DoubleBezel portrait · NumberTicker stats · GitHub rhythm · NumberSlider heatmap control |
| **TechStack** | GSAP dual-dimensional horizontal scroller · shade-differentiated cards (5‑category palette) |
| **Experience** | Pinned scroll stories · scale‑down spine · ResizeObserver · one‑shot glow |
| **Projects** | Asymmetric bento (all 8 incl. in-progress) · PricingCard‑inspired minimal cards · BorderBeam hover · ContinuousTabs |
| **Credentials** | Education only · StatCard listings · certs/awards commented out in data |
| **Writings** | MDX articles · tracing-beam spine · JournalNavigation · TableOfContents |
| **FAQ** | Accordion island · lazy client component |
| **Chatbot** | RAG-powered AI · Groq primary → Google fallback · Upstash Vector · quick chips |

---

## 🗂️ Component Architecture

```
app/
├── (home)/_components/      Hero · About · TechStack · Experience · Projects · Credentials · Writings · FAQ
├── (projects)/[...slug]/    ProjectContent · ReadingLayout · JSON-LD SoftwareApplication
├── (writing)/[...slug]/     WritingContent · ReadingLayout · JSON-LD Article · TOC
├── api/
│   ├── chat/route.ts        Edge runtime · Groq→Google fallback · Upstash Vector RAG · Zod guard
│   ├── github/route.ts      Vercel serverless · GitHub API with cache headers
│   └── revalidate/route.ts  ISR revalidation endpoint
├── globals.css              @theme inline token wiring (colors, spacing, typography, effects)
├── layout.tsx               root layout · Providers · Analytics · SpeedInsights · dual themeColor
├── providers.jsx            next-themes (class strategy · suppressHydrationWarning)
└── [og]/route.jsx           Dynamic OG images 1200×630 (3 templates)

components/
├── ui/                      shadcn primitives + animation/scroll/scan engines
├── common/                  Tabs · Markdown · OptimizedImage · Skeleton · CodeBlock · ContentCarousel
├── chatbot/                 Chatbot · Message · QuickActions · ChatInputForm
├── docs/                    TableOfContents · DocsTopBar · SimilarContent · ZoomImage · Callout
├── layout/                  HomeLayout · TopBar · BottomDock · Footer · ReadingLayout · Section
├── watermelon/              JournalNavigation · ComposeEmail (Tabs/ViewOnMap/NumberSlider moved to common/)
└── *.jsx                    FavoriteStack · TechPill · AvatarStatus · Heatmap · StatCard · ContactCard
```

---

## 🎨 Design System

Three-layer token architecture (CSS files, self-contained `@theme inline` per file):

| Layer | File | Contents |
|-------|------|----------|
| `colors.css` | Semantic light/dark maps · pastel family · sidebar/chart aliases |
| `typography.css` | Font stacks (`--font-stack-*`) · fluid clamp scale |
| `spacing.css` | Radius (DEFAULT 4px) · section rhythm · gutter spacing |
| `effects.css` | Elevation shadows (e1–e5) · motion easings · spotlight vars |

**Taste profile:** editorial-luxury · warm cream `#FDFBF7` · gold accent `#EBC429` · reverse-animated entrances · lower roundness · tighter spacing · multi-hue tint system for card categories.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Edge runtime)
- **Runtime:** React 19 · Server Components + client islands
- **Styling:** Tailwind CSS v4 — `@theme inline` namespace tokens
- **Animation:** Motion (Framer Motion) · GSAP (ScrollTrigger, pin-scrub)
- **Content:** MDX + Streamdown@2.5 (Shiki highlighting) · Fumadocs-MDX
- **Chat:** Groq `openai/gpt-oss-120b` primary · Google `gemini-2.0-flash` fallback · Upstash Vector RAG
- **Analytics:** @vercel/analytics · @vercel/speed-insights · WebVitals
- **UI primitives:** shadcn/ui (Radix + Tailwind)
- **Deploy:** Vercel (ISR · edge · dynamic OG)

---

## ♿ Accessibility

- WCAG AA contrast on all token pairs (validated Phase 4 + Phase 21 sweep)
- Full keyboard paths: nav, dock, chatbot focus trap + restore, ⌘K palette
- ARIA live regions for chatbot streaming; labels on all icon buttons
- `prefers-reduced-motion` enforced globally (CSS gate + JS guards)
- No window scroll listeners — IO / Motion useScroll / GSAP ScrollTrigger only

---

## 🚀 Getting Started

```bash
# Install
npm install

# Environment
cp .env.example .env.local
# Required: DATABASE_URL, GROQ_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, UPSTASH_VECTOR_REST_URL, UPSTASH_VECTOR_REST_TOKEN, UPLOADTHING_SECRET, UPLOADTHING_APP_ID

# Dev server
npm run dev

# Build
npm run build
```

---

## 📋 Documentation Map

| Concern | File |
|---------|------|
| Full component audit | `COMPONENTS_MAP.md` |
| 24-phase build plan | `ROADMAP.md` |
| Sitemap / token system / design direction | `ARCHITECTURE.md` |
| Testing standards / contribution guide | `CONTRIBUTING.md` |

---

## 📄 License

MIT — see `LICENSE`
