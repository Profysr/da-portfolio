export const projects = [
  {
    id: "proj-1",
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
  },
  {
    id: "proj-2",
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
    terminalSnippet: "data-pipeline sync --config pipeline.yaml --parallel 8\n✓ Schema validated\n✓ 1.2M rows migrated in 4.2s",
  },
  {
    id: "proj-3",
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
    archDiagram: {
      label: "Clinical Queue Pipeline",
      nodes: ["Docman Mail", "OCR Engine", "EMIS API", "Audit Log"],
    },
  },
  {
    id: "proj-4",
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