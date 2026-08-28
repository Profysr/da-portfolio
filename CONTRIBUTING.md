# Contributing to bilalahmad.dev

First off, thank you for considering contributing — it means a lot. This project only gets better with more hands on it.

## Code of Conduct

This project follows our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it. Be kind, be respectful, and assume good intent.

## What You Can Contribute

- 🐛 **Report bugs** — see [Reporting Bugs](#reporting-bugs)
- 💡 **Suggest features** — see [Suggesting Features](#suggesting-features)
- 📝 **Improve documentation** — typos, unclear sections, missing examples
- 🧩 **Improve components** — fixing layout, animation, a11y, or token issues
- ♿ **Accessibility** — WCAG AA gaps, keyboard nav, screen-reader testing

## Development Setup

1. **Fork** the repo
2. **Clone** your fork locally:

```bash
git clone https://github.com/YOUR-USERNAME/da-portfolio.git
cd da-portfolio
```

3. **Install dependencies:**

```bash
npm install
```

4. **Set up environment variables:**

```bash
cp .env.example .env.local
# Fill in required keys (Groq, Google AI, Upstash Vector, UploadThing)
```

5. **Verify everything works before making changes:**

```bash
npm run build
```

## Branching & Commit Conventions

**Branch naming:**

```
fix/short-description      # bug fixes
feat/short-description     # new features
docs/short-description     # documentation only
refactor/short-description # code changes with no behavior change
chore/short-description    # tooling, dependencies, build
```

Example: `fix/yellow-accent-contrast`, `refactor/cleanup-experience-gap`, `docs/add-component-map-entry`

**Commit messages** (loose Conventional Commits):

```
feat: add Chatbot quick-action chip for Experience section
fix: resolve ScrollRail height stale-measure bug in Credentials
docs: update COMPONENTS_MAP.md Phase 12 entries
refactor: refactor About.jsx — remove DoubleBezel portrait wrapper
chore: update streamdown to v2.5
```

Keep commits focused — one logical change per commit is easier to review.

## Coding Standards

### Rules (non-negotiable)

| # | Rule |
|---|------|
| 1 | **No custom SVGs** — download via URL or ask user. Library icon components (`@tabler/icons-react`) are sanctioned. |
| 2 | **File formats & folders:** `.jsx` default everywhere. `components/ui/` = library-added components (`.tsx` permitted). `components/common/` = our shared primitives (`.jsx` mandatory). |
| 3 | **No component deletions** — mark `UNUSED`, remove imports, keep files on disk. *User-authorized exceptions only.* |
| 4 | **Watermelon/21st refactor gate** — every component from `components/watermelon/` and `components/21st/` must be refactored (token-standardize CSS, comment out demo content) BEFORE integration. Never import raw. |
| 5 | **No window scroll listeners** — use IO / Motion `useScroll` / GSAP `ScrollTrigger` only. |
| 6 | **prefers-reduced-motion** — honored globally (CSS gate + JS guards). |

### Component Selection

Search the codebase first. If more than one option exists for a behavior, build a comparison table and **user picks**. Do not silently choose.

### Accessibility

Run `ux_check_contrast` on new token pairs before merging. Document any a11y decisions.

## Documentation Map

Update the matching file in the same PR as your code change:

| If your change touches... | Update this file |
|---------------------------|-----------------|
| A new component or changed component status | `COMPONENTS_MAP.md` |
| What's built vs. planned | `ROADMAP.md` |
| Folder structure, sitemap, design tokens, AI chatbot | `ARCHITECTURE.md` |
| Authoring help text or setup steps | `README.md` |

## Reporting Bugs

Before opening a new issue, search existing issues to avoid duplicates.

Include:
- Clear steps to reproduce
- Expected vs. actual behavior
- Environment (Node version, OS)
- Screenshots if UI-related

## Suggesting Features

Open a feature request describing:
- The problem (not just the solution)
- Which phase it should live in (see `ROADMAP.md`)
- Any alternatives considered

## Pull Request Checklist

- [ ] Code follows the standards above
- [ ] No new `window.addEventListener('scroll')`
- [ ] All new animations have `prefers-reduced-motion` guards
- [ ] Relevant docs updated (`COMPONENTS_MAP.md`, `ROADMAP.md`, `ARCHITECTURE.md`)
- [ ] `npm run build` passes

---

Thanks again for contributing! 🙌