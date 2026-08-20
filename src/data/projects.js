export const projects = [
  // ── Featured Projects (appear in homepage Projects grid) ──────────────
  {
    id: "proj-1",
    slug: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "Real-time KPI dashboard with custom visualisations and alerting built for high-throughput e-commerce operations.",
    tech: ["React", "TypeScript", "D3.js", "Python", "Redis"],
    category: "Web",
    industry: "E-Commerce Fintech",
    access: "Hosted",
    strategies: ["WebSockets Streaming", "Canvas Optimization", "Bento Grid UX"],
    github: "https://github.com/example/analytics",
    live: "https://example.com/analytics",
    image: null,
    featured: true,
    isActivity: false,
    content: `## The Idea

Operations teams needed real-time visibility into e-commerce KPIs without paying enterprise prices for legacy BI tools. The existing dashboards were 6+ hours stale and buried under nested drill-downs.

## Stack Decisions

- **React + TypeScript** for type-safe component composition under rapid iteration
- **D3.js** for custom visualisations — off-the-shelf charting libraries couldn't match the design language
- **Python + Redis Streams** on the backend for sub-second aggregation
- **WebSockets** for push-based updates instead of polling

## Results

- 40% faster decision-making across operations
- Sub-200ms p95 latency from event ingestion to dashboard tile
- Custom canvas optimisation brought render cost down 60% on 1k+ point series

## What I'd Do Differently

Started with too much custom D3 — would lean on Visx primitives for the 80% case and only drop down to D3 for the bespoke 20%.`,
    changelog: undefined,
  },
  {
    id: "proj-2",
    slug: "data-pipeline-toolkit",
    title: "Data Pipeline Toolkit",
    description:
      "CLI tool that orchestrates ETL jobs with minimal configuration and multi-tenant schema isolation.",
    tech: ["Python", "Docker", "SQL", "ClickHouse"],
    category: "Open Source",
    industry: "Developer Tools",
    access: "Open Source",
    strategies: ["AST Parsing", "Zero-Config CLI", "Async Worker Pools"],
    github: "https://github.com/example/pipeline-cli",
    live: "#",
    image: null,
    featured: true,
    isActivity: false,
    terminalSnippet: "data-pipeline sync --config pipeline.yaml --parallel 8\n✓ Schema validated\n✓ 1.2M rows migrated in 4.2s",
    content: `## The Idea

Every team I worked with wrote the same ETL scaffolding over and over — config parser, schema validator, worker pool, retry logic, observability. The toolkit absorbs all of it.

## Stack Decisions

- **Python** for AST parsing of pipeline definitions (typed dataclasses → runtime validation)
- **ClickHouse** as the default target — columnar storage makes analytical loads 10x faster than Postgres
- **Docker** per-worker so multi-tenant pipelines don't trample each other's dependencies
- **Zero-config philosophy**: if you can express it in YAML, you can ship it

## Results

- 1.2M rows migrated in 4.2s on a single-node setup
- Multi-tenant isolation means one team's failed migration doesn't poison another's
- Used in production by 3 internal teams before going open-source`,
    changelog: undefined,
  },
  {
    id: "proj-3",
    slug: "rpa-clinical-automation-suite",
    title: "RPA Clinical Automation Suite",
    description:
      "End-to-end clinical software automation integrated with SystmOne, EMIS, and Docman systems.",
    tech: ["Power Automate", "Python", "AutoHotkey", "JavaScript"],
    category: "Automation",
    industry: "Healthcare / NHS",
    access: "Private",
    strategies: ["Desktop OCR Extraction", "Queue-Based Retries", "HIPAA/GDPR Compliance"],
    github: "#",
    live: "#",
    image: null,
    featured: true,
    isActivity: false,
    archDiagram: {
      label: "Clinical Queue Pipeline",
      nodes: ["Docman Mail", "OCR Engine", "EMIS API", "Audit Log"],
    },
    content: `## The Idea

Primary care clinics were drowning in inbound clinical correspondence — letters, test results, referrals — being manually triaged into SystmOne, EMIS, and Docman. Each item took 3-5 minutes of admin time. Across a 40-site network, that was 80+ hours/day of avoidable work.

## Stack Decisions

- **Power Automate + Python** hybrid — Power Automate for the visual workflow orchestration, Python for the OCR + NLP that needed real libraries
- **AutoHotkey** for the desktop integration layer where no API existed
- **Queue-based retries with exponential backoff** — clinical systems fail in cascades, and a stuck document can't disappear
- **Audit log as a first-class artifact** — every action traceable for GDPR/HIPAA

## Results

- 40% reduction in manual triage time across the network
- Zero data loss in 18 months of production
- Audit log passed 3 separate clinical governance reviews

## What's Hard

Healthcare integrations are not about technology — they're about stakeholder management. The technical work was 30% of the project. The other 70% was sign-off from clinical safety, information governance, and Caldicott guardians.`,
    changelog: undefined,
  },
  {
    id: "proj-4",
    slug: "agency-portfolio-platform",
    title: "Agency Portfolio Platform",
    description:
      "Single-page portfolio with interactive WebGL globe, contribution heatmap, and glassmorphic UI.",
    tech: ["React", "Motion", "Tailwind CSS", "cobe"],
    category: "Web",
    industry: "Design & Creative",
    access: "Hosted",
    strategies: ["WebGL Shaders", "Framerate Throttling", "Edge Caching"],
    github: "https://github.com/example/agency-portfolio",
    live: "https://example.com",
    image: null,
    featured: true,
    isActivity: false,
    content: `## The Idea

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

The contribution heatmap is decorative noise on most visits. If rebuilding, I'd make it contextual — show only when the visitor is on the projects page, and tie it to real GitHub data.`,
    changelog: undefined,
  },

  // ── Side Projects (appear in Activities section) ──────────────────────
  {
    id: "proj-5",
    slug: "da-profiler",
    title: "Da Profiler",
    description: "Open-source Python REST API profiler & N+1 query workbench",
    link: "https://github.com",
    isExternal: true,
    tag: "Open Source",
    featured: false,
    isActivity: true,
    content: `## The Idea

I've watched three different teams debug the same Django N+1 query bug in production. Every time, the workflow is the same: enable Django debug toolbar, capture the SQL, manually correlate request → query → ORM call. There should be a tool that does this in one shot.

## What It Does

- Captures every SQL query issued during a single request lifecycle
- Groups queries by ORM call site so duplicate SELECTs collapse into a single "N+1 detected" entry
- Surfaces the line of Python code that triggered each query
- Exports a timeline view for sharing in PR reviews

## Status

Early prototype. Working on the grouping heuristics next.`,
    changelog: undefined,
  },
  {
    id: "proj-6",
    slug: "jcn-engine",
    title: "JCN Engine",
    description: "Multi-tenant SaaS project management engine",
    link: "https://github.com",
    isExternal: true,
    tag: "SaaS",
    featured: false,
    isActivity: true,
    content: `## The Idea

Building blocks for SaaS founders who'd rather focus on their actual product than on tenant isolation, billing webhooks, and role-based access control. The boring infrastructure that every SaaS needs and nobody wants to write twice.

## Architecture

- **Tenant isolation** via Postgres row-level security
- **Billing** via Stripe webhooks + idempotent event handlers
- **RBAC** via a simple role → permission → resource hierarchy
- **API** built on Django REST Framework with OpenAPI docs auto-generated

## Status

Internal use. Considering open-sourcing the RBAC and tenant-isolation primitives separately.`,
    changelog: undefined,
  },
  {
    id: "proj-7",
    slug: "clinical-rpa-core",
    title: "Clinical RPA Core",
    description: "Desktop automation hooks for SystmOne & EMIS",
    link: "#",
    isExternal: false,
    tag: "Private",
    featured: false,
    isActivity: true,
    content: `## The Idea

The production RPA suite (proj-3) has hundreds of automation primitives. Most of them are reusable across clinics — but the abstraction layer to compose them has been buried inside project-specific Power Automate flows. This is the extraction.

## Components

- **Action registry** — typed primitives for each EHR system (SystmOne, EMIS, Docman)
- **Flow composer** — declarative JSON DSL that Power Automate can call into
- **Audit bridge** — uniform logging regardless of which EHR the action targets

## Status

Extraction in progress. About 60% of actions ported.`,
    changelog: [
      {
        version: "v0.3",
        date: "2025-08-12",
        tags: ["Added", "Refactor"],
        content: `## Added

- New action: \`docman.moveToFolder\` — bulk relocate documents matching a filter
- New action: \`emis.lookupPatientByNHSNumber\` with caching

## Changed

- Refactored audit bridge to use a single structured logger instead of N formatters`,
      },
      {
        version: "v0.2",
        date: "2025-07-28",
        tags: ["Fixed"],
        content: `## Fixed

- SystmOne session timeout no longer kills in-flight flows (was happening every ~7 min)
- Retry policy now respects the per-action cooldown hint`,
      },
      {
        version: "v0.1",
        date: "2025-07-10",
        tags: ["Added"],
        content: `## Added

- Initial extraction of action primitives from production
- Action registry with 40 typed actions across 3 EHR systems`,
      },
    ],
  },
  {
    id: "proj-8",
    slug: "agentic-cli-coder",
    title: "Agentic CLI Coder",
    description: "Terminal refactoring agent powered by local LLMs",
    link: "https://github.com",
    isExternal: true,
    tag: "AI",
    featured: false,
    isActivity: true,
    content: `## The Idea

Most "AI coding assistants" are cloud-only and send your entire repo to someone else's GPU. For refactoring work on legacy codebases — where IP matters — that's a dealbreaker.

## What It Does

- Runs entirely on local LLMs (Ollama, LM Studio)
- Reads a target file + a refactor instruction
- Proposes a diff; you review and apply
- Persists a memory of your style preferences across runs

## Status

Experimental. Works well for small-to-medium refactors; struggles with cross-file changes that need a coherent plan.`,
    changelog: undefined,
  },
];

export const contributions = {
  heading: "Github",
  subheading:
    "A live snapshot of build velocity, open-source contributions, and development consistency.",
  githubUsername: "Profysr",
  heatmapWeeks: 32,
  stats: [
    {
      label: "Repositories",
      value: 38,
      suffix: "",
      icon: null,
      badge: "Public & Private",
      spanClass: "md:col-span-2 md:col-start-9 md:row-start-1",
    },
    {
      label: "Achievements",
      value: 10,
      suffix: "+",
      icon: null,
      badge: "Tracked",
      spanClass: "md:col-span-2 md:col-start-9 md:row-start-2",
    },
    {
      label: "Commits Logged",
      value: 2500,
      suffix: "+",
      icon: null,
      badge: "Year to Date",
      spanClass: "md:col-span-2 md:row-span-2 md:col-start-11 md:row-start-1",
    },
  ],
};

export const kanban = [
  {
    id: "kc-1",
    title: "Publish 2 blog posts / month",
    description: "Share learnings on data patterns and tooling.",
    status: "in-progress",
    category: "current",
  },
  {
    id: "kc-2",
    title: "Ship v2 of Analytics Dashboard",
    description: "Refactor core query engine and add AI-assisted insights.",
    status: "todo",
    category: "current",
  },
  {
    id: "kc-3",
    title: "Mentor 3 open-source contributors",
    description: "Review PRs and co-author onboarding docs.",
    status: "in-progress",
    category: "current",
  },
  {
    id: "kv-1",
    title: "Launch agency website portfolio",
    description: "This very site — secondary brand showcase.",
    status: "done",
    category: "vision",
  },
  {
    id: "kv-2",
    title: "Open-source data toolkit (100 ⭐)",
    description: "Build community around an ETL + analytics starter kit.",
    status: "todo",
    category: "vision",
  },
  {
    id: "kv-3",
    title: "Speaker at 2 data conferences",
    description: "Share real-world analytics workflows and lessons learned.",
    status: "todo",
    category: "vision",
  },
];
