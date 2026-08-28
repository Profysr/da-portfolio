export const aiBotData = {
  quickPrompts: [
    {
      id: "pitch",
      icon: "⚡",
      label: "15-Second Executive Pitch",
    },
    {
      id: "stack",
      icon: "🛠️",
      label: "Core Stack & MCP Pipelines",
    },
    {
      id: "achievements",
      icon: "📈",
      label: "Key Impact & Metrics @ Kynoby",
    },
    {
      id: "education",
      icon: "🎓",
      label: "Academic Background & Certifications",
    },
    {
      id: "contact",
      icon: "🤝",
      label: "Availability & Work Preference",
    },
  ],
};

// Bot training corpus — plain markdown strings derived directly from idx data.
// This is what the LLM backend will use as context to answer questions.
// Extend this array whenever you add new entries to idx (new project, blog, role, etc.).
export const botKnowledge = [
  // ── Personal ──────────────────────────────────────────────────────────
  `Bilal Ahmad is a Forward Deployed & Software Engineer based in Islamabad, Pakistan (GMT+5). Email: hello@da-portfolio.dev.`,
  `Bilal's tagline: "Forward Deployed & Software Engineer". He turns raw data into decisions and automates complex engineering workflows, specializing in scalable system architecture, full-stack intelligence, MCP-driven agentic pipelines, and autonomous tooling.`,

  // ── Experience ────────────────────────────────────────────────────────
  `Current role: Software Development Lead at Kynoby (London, UK — Remote), 2026 — Present. Managing engineering team, architecting healthcare integrations, and driving technical direction across automation platforms.`,
  `Previous role at Kynoby: RPA Engineer, 03.2025 — 2026 (1y). Engineered clinical software automations integrated with SystmOne, EMIS, and Docman.`,
  `Role at Simplamo: Senior Frontend Developer, 10.2022 — 01.2026 (3y 4m). Ho Chi Minh City, Viet Nam (On-site). Led frontend architecture, built component libraries, and optimized application performance.`,
  `Total professional experience: 2 years 8 months (as of current date).`,

  // ── Tech Stack ────────────────────────────────────────────────────────
  `Core Powerhouse (daily drivers): Python, React, n8n, Custom MCPs, Docker.`,
  `Backend & Systems: Python, Django, FastAPI, PostgreSQL, Redis, Celery, Docker.`,
  `AI & Automation: Model Context Protocol (MCP), n8n, Power Automate, AutoHotkey, Tampermonkey.`,
  `Frontend: React 19, Next.js, TypeScript, Tailwind CSS, Motion.`,
  `Cloud & DevOps: AWS, Linux, Git/GitHub, Docker containerization.`,
  `Automations deployed: 150+ (as of current date).`,
  `Engineering hours logged: 4,280+ deep focus hours.`,
  `Projects delivered: 40+.`,

  // ── Healthcare Integration ────────────────────────────────────────────
  `Bilal architected clinical software integrations with SystmOne, EMIS, and Docman, reducing manual operational overhead by 40%.`,
  `Key healthcare automation focus: HIPAA/GDPR compliance, desktop OCR extraction, queue-based retry patterns, audit logging.`,

  // ── Education ─────────────────────────────────────────────────────────
  `B.S. Computer Science (Minor in Mathematics) — University of Massachusetts, Lowell, 2020–2024. GPA 3.8, Dean's Honor List. ACM Student Chapter, Distributed Systems Lab.`,
  `Associate / Pre-Engineering — COMSATS University, Islamabad, 2018–2020. First Class Honors. Software Innovation Society.`,

  // ── Certificates ──────────────────────────────────────────────────────
  `AWS Certified Solutions Architect (Amazon Web Services), issued Jan 2024, expires Jan 2027. Credential ID: AWS-PSA-882194.`,
  `Google Data Analytics Professional Certificate (Google / Coursera), issued Aug 2023. Credential ID: GCP-DA-49210.`,
  `Advanced React & Next.js Architecture (Udemy / Vercel Partner), issued May 2023. Credential ID: UC-5928174.`,
  `SQL for Data Science & Distributed Queries (UC Davis / Coursera), issued Nov 2022. Credential ID: COURSERA-SQL-38192.`,

  // ── Awards ────────────────────────────────────────────────────────────
  `Engineering Excellence & Innovation Award — Kynoby Leadership, 2025. Awarded for architecting healthcare interoperability pipelines reducing clinical data processing latency by 40%.`,
  `Dean's Honor List — University of Massachusetts, 2023. Academic honors in Computer Science & Applied Mathematics.`,

  // ── Projects ──────────────────────────────────────────────────────────
  `Project: Analytics Dashboard — Real-time KPI dashboard with custom visualisations and alerting built for high-throughput e-commerce operations. Tech: React, TypeScript, D3.js, Python, Redis. Live: https://example.com/analytics`,
  `Project: Data Pipeline Toolkit — CLI tool that orchestrates ETL jobs with minimal configuration and multi-tenant schema isolation. Tech: Python, Docker, SQL, ClickHouse. Open source.`,
  `Project: RPA Clinical Automation Suite — End-to-end clinical software automation integrated with SystmOne, EMIS, and Docman. Tech: Power Automate, Python, AutoHotkey, JavaScript.`,
  `Project: Agency Portfolio Platform — Single-page portfolio with interactive WebGL globe, contribution heatmap, and glassmorphic UI. Tech: React, Motion, Tailwind CSS, cobe.`,

  // ── Blog Posts ────────────────────────────────────────────────────────
  `Blog: "Why your dashboard lies to you" — How common chart choices can mislead stakeholders and how to fix them. Tags: Analytics, Visualization.`,
  `Blog: "Setting up a repeatable ETL pattern with Python" — A pragmatic approach to building data pipelines that are easy to test and maintain. Tags: Python, ETL.`,
  `Blog: "Git contributions as a portfolio signal" — What open-source commits tell hiring managers and how to shape yours. Tags: Career, Open Source.`,

  // ── Work Preferences ──────────────────────────────────────────────────
  `Availability: Open to Forward Deployed, Senior Full-Stack, and AI/Automation Lead roles.`,
  `Work arrangement: Remote worldwide or Hybrid (Islamabad / London timezone overlap).`,
  `Direct contact email: hello@da-portfolio.dev.`,
  `ATS Resume available via download button in the portfolio header.`,
];

// Canned fallback responses (used when API fails) — keyword-matched
export const cannedResponses = {
  projects: `I've built 8 projects spanning open source, healthcare automation, and developer tooling:

▸ **Data Pipeline Toolkit** — Open Source ETL CLI with AST-driven job inference, async worker pools, multi-tenant schema isolation (Python, Docker, ClickHouse)

▸ **RPA Clinical Automation Suite** — Private NHS integration with SystmOne, EMIS, Docman; OCR extraction, queue-based retries, HIPAA/GDPR compliant (Power Automate, Python, AutoHotkey)

▸ **Agency Portfolio Platform** — WebGL globe (cobe), deterministic contribution heatmap, edge-cached static export <100ms TTFB (React, Motion, Tailwind)

▸ **Da Profiler** (in progress) — Python REST API profiler & N+1 query workbench with CLI + JSON reporting

▸ **JCN Engine** (in progress) — Multi-tenant SaaS project management with RBAC, team workspaces, subscription scaffolding (TypeScript, PostgreSQL)

▸ **Clinical RPA Core** (in progress) — Reusable automation hooks for SystmOne & EMIS, local-first credential handling

▸ **Agentic CLI Coder** (in progress) — Terminal refactoring agent powered by local LLMs, repo-aware context indexing`,

  experience: `**Current:** Software Development Lead @ Kynoby (Mar 2026–present)
Leading engineering team, architecting healthcare integrations, driving technical direction across automation platforms. Stack: React, Next.js, Django, PostgreSQL, Redis, Celery, Docker.

**Previous:** Senior Frontend Developer @ Simplamo (Oct 2022–Jan 2026)
Led frontend architecture, built component libraries, optimized application performance. React Native, Next.js, Tailwind CSS, Agile.`,

  stack: `**Core Languages:** TypeScript, Python, JavaScript
**Frontend:** React, Next.js, Motion, Tailwind CSS, shadcn/ui (Radix)
**Backend:** Node.js, Django, PostgreSQL, Redis, Celery, ClickHouse
**Infra:** Docker, AWS/GCP, GitHub Actions
**Data/ML:** SQL, ETL pipelines, AST parsing, local LLMs
**Tools:** VS Code, Git, Linear, Figma`,

  contact: `**Email:** bilal@profysr.dev
**GitHub:** github.com/Profysr
**LinkedIn:** linkedin.com/in/bilalahmad
**Location:** London, UK (Remote)
**Open to:** Senior/Lead roles, healthcare tech, developer tooling, open source collaboration`,
};

export function matchCannedResponse(input) {
  const lower = input.toLowerCase();
  if (
    lower.includes("project") ||
    lower.includes("built") ||
    lower.includes("portfolio")
  )
    return cannedResponses.projects;
  if (
    lower.includes("experience") ||
    lower.includes("work") ||
    lower.includes("job") ||
    lower.includes("career")
  )
    return cannedResponses.experience;
  if (
    lower.includes("stack") ||
    lower.includes("tech") ||
    lower.includes("technology") ||
    lower.includes("language")
  )
    return cannedResponses.stack;
  if (
    lower.includes("contact") ||
    lower.includes("email") ||
    lower.includes("reach") ||
    lower.includes("hire")
  )
    return cannedResponses.contact;
  return `I can help with:\n▸ **Projects** — 8 engineering projects\n▸ **Experience** — Kynoby, Simplamo\n▸ **Tech Stack** — TypeScript, React, Python, PostgreSQL\n▸ **Contact** — bilal@profysr.dev\n\nWhat would you like to know?`;
}