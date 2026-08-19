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