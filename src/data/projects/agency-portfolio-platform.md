## The Idea

A creative agency wanted a portfolio that didn't feel like every other Webflow template. The brief: make it feel like a piece of software, not a slideshow.

## Stack Decisions

- **cobe** for the WebGL globe — tiny dependency footprint, fully procedural, no asset pipeline
- **Motion** for orchestrated entrance animations tied to scroll position
- **Tailwind CSS** for the design system primitives (custom palette tokens layered on top)
- **Edge caching** on the static asset layer to keep first paint under 1s globally

## Results

- 92 Lighthouse score on mobile
- Bounce rate dropped 35% vs. the previous portfolio
- Globe interaction is the most-clicked element on the site

## What I'd Do Differently

The contribution heatmap is decorative noise on most visits. If rebuilding, I'd make it contextual — show only when the visitor is on the projects page, and tie it to real GitHub data.
