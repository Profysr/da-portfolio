import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconFolderCode,
  IconBook,
  IconMail,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconClock,
  IconGitBranch,
  IconRobot,
  IconCode,
  IconActivity,
  IconSparkles,
} from "@tabler/icons-react";

/**
 * ============================================================
 *  src/data/idx.js
 *  ⚡ Single Source of Truth for the entire portfolio.
 *
 *  Every section (Hero, About, Contributions, etc.) reads data
 *  from this file. To update your portfolio, edit here only.
 * ============================================================
 */

export const nav = [
  { id: "hero", label: "Home", icon: IconHome },
  { id: "about", label: "About", icon: IconUser },
  { id: "contributions", label: "Contributions", icon: IconActivity },
  { id: "experience", label: "Experience", icon: IconBriefcase },
  { id: "projects", label: "Projects", icon: IconFolderCode },
  { id: "blog", label: "Blog", icon: IconBook },
  { id: "contact", label: "Contact", icon: IconMail },
];

export const socials = [
  {
    platform: "github",
    icon: IconBrandGithub,
    url: "https://github.com/Profysr",
    label: "GitHub",
    handle: "@Profysr",
    aria: "github",
  },
  {
    platform: "linkedin",
    icon: IconBrandLinkedin,
    url: "https://linkedin.com/in/",
    label: "LinkedIn",
    handle: "Bilal Ahmad",
    aria: "linkedin",
  },
  {
    platform: "x",
    icon: IconBrandX,
    url: "https://x.com/",
    label: "X (Twitter)",
    handle: "@bilalahmad_dev",
    aria: "x",
  },
  {
    platform: "email",
    icon: IconMail,
    url: "mailto:hello@da-portfolio.dev",
    label: "Email",
    handle: "hello@da-portfolio.dev",
    aria: "email",
  },
];

/* ============================================================
 *  👇 EDIT EVERYTHING BELOW THIS LINE
 * ============================================================ */

export const personal = {
  name: "Bilal Ahmad",
  tagline: "Forward Deployed & Software Engineer",
  bio: `I turn raw data into decisions and automate complex engineering workflows. 
        Specializing in scalable system architecture, full-stack intelligence, 
        MCP-driven agentic pipelines, and autonomous tooling.`,
  avatar: "/avatar.jpg",
  logo: "/logo.svg",
  location: "Pakistan",
  locationLabel: "Islamabad, PK → Worldwide",
  timezone: "GMT+5",
  email: "hello@da-portfolio.dev",
  resumeUrl: "/resume.pdf",
  socials,
};

export const footer = {
  badge: "Discipline → Consistency → Impact",
  heading: "20 years ago, today, or 20 years from now: understand the problem, solve it, and you're unstoppable.",
  ctaLabel: "Say Hello",
  resumePath: "/resume.pdf",
};

export const about = {
  heading: "About Me",
  subheading:
    "A look into my background, core engineering pillars, and focus areas.",
  stats: [
    {
      id: "industry",
      title: "In Industry",
      value: "2 Yrs 8 Mos",
      subtext: "Experience",
      icon: IconClock,
      spanClass:
        "col-span-12 sm:col-span-6 md:col-span-2 md:row-span-2 md:col-start-9 md:row-start-1",
    },
    {
      id: "projects",
      title: "Projects Built",
      value: "40+",
      subtext: "Delivered",
      icon: IconFolderCode,
      isCompact: true,
      spanClass:
        "col-span-12 sm:col-span-6 md:col-span-2 md:row-span-1 md:col-start-11 md:row-start-1",
    },
    {
      id: "hours",
      title: "Hours Logged",
      value: "4,280+",
      subtext: "Deep Focus",
      icon: IconActivity,
      spanClass:
        "col-span-12 sm:col-span-6 md:col-span-2 md:row-span-3 md:col-start-11 md:row-start-2",
    },
    {
      id: "automations",
      title: "Automations",
      value: "150+",
      subtext: "Deployed",
      icon: IconRobot,
      isCompact: true,
      spanClass:
        "col-span-12 sm:col-span-6 md:col-span-2 md:row-span-2 md:col-start-9 md:row-start-3",
    },
  ],
};

export const SkillsAndTools = [
  {
    category: "Automations & AI",
    items: [
      { name: "Power Automate", img: null, subCategory: null },
      { name: "n8n", img: null, subCategory: null },
      { name: "MCP Servers", img: null, subCategory: null },
      { name: "Tampermonkey", img: null, subCategory: null },
      {
        name: "PowerShell",
        img: "/tools/powershell.svg",
        subCategory: "Automation",
      },
    ],
  },
  {
    category: "Engineering & Backend",
    items: [
      { name: "Python", img: "/tools/python.svg", subCategory: "Language" },
      { name: "React", img: "/tools/react.svg", subCategory: "Frontend" },
      { name: "Django", img: null, subCategory: null },
      {
        name: "TypeScript",
        img: "/tools/typescript.svg",
        subCategory: "Language",
      },
      { name: "Node.js", img: "/tools/nodejs.svg", subCategory: "Runtime" },
      { name: "FastAPI", img: null, subCategory: null },
    ],
  },
  {
    category: "Platforms & Cloud",
    items: [
      { name: "Docker", img: "/tools/docker.svg", subCategory: "DevOps" },
      { name: "AWS", img: null, subCategory: null },
      { name: "PostgreSQL", img: null, subCategory: null },
      { name: "Git & GitHub", img: "/tools/git.svg", subCategory: "VCS" },
      { name: "Linux", img: null, subCategory: null },
    ],
  },
  {
    category: "Conceptual & Design",
    items: [
      { name: "System & Architecture Design", img: null, subCategory: null },
      { name: "Data Structure & Algorithms", img: null, subCategory: null },
      { name: "Claude Code", img: null, subCategory: null },
      { name: "MCPs", img: null, subCategory: null },
    ],
  },
];

export const favoriteStack = {
  title: "Core Powerhouse",
  subtitle: "Daily Drivers & Preferred Workflow",
  stack: "Python • React • n8n • Custom MCPs",
  tag: "Modern Intelligent Stack",
  icon: IconSparkles,
};

export const contributions = {
  heading: "Github",
  subheading:
    "A live snapshot of build velocity, open-source contributions, and development consistency.",
  githubUsername: "Profysr",
  heatmapWeeks: 32, // Sleek wider heatmap
  stats: [
    {
      label: "Repositories",
      value: 38,
      suffix: "",
      icon: IconCode,
      badge: "Public & Private",
      spanClass: "md:col-span-2 md:col-start-9 md:row-start-1", // Div 2
    },
    {
      label: "Achievements",
      value: 10,
      suffix: "+",
      icon: IconClock,
      badge: "Tracked",
      spanClass: "md:col-span-2 md:col-start-9 md:row-start-2", // Div 3
    },
    {
      label: "Commits Logged",
      value: 2500,
      suffix: "+",
      icon: IconGitBranch,
      badge: "Year to Date",
      spanClass: "md:col-span-2 md:row-span-2 md:col-start-11 md:row-start-1", // Div 4 (L-Shape overlap)
    },
  ],
};

export const experience = [
  {
    id: "exp-1",
    role: "Founder & Software Engineer",
    company: "DA Agency",
    start: "Jan 2022",
    end: "Present",
    description:
      "Run an independent consultancy delivering software solutions, dashboards, and data strategy to growing businesses.",
    tech: ["Python", "SQL", "Tableau", "React"],
    current: true,
  },
  {
    id: "exp-2",
    role: "Open Source Contributor",
    company: "GitHub · Various",
    start: "2020",
    end: "Present",
    description:
      "Active contributor to analytics and developer-tooling projects; maintain documentation and core modules.",
    tech: ["GitHub", "Python", "TypeScript"],
    current: true,
  },
];

export const education = [
  {
    id: "edu-1",
    degree: "Bachelor of Science",
    institution: "University Name",
    start: "2018",
    end: "2022",
    description:
      "Focused on statistics, programming, and data-driven research.",
    highlights: [
      "Dean's List — 4 semesters",
      "Senior thesis on predictive modelling",
      "Data Science Club — President",
    ],
  },
];

export const certificates = [
  {
    id: "cert-1",
    name: "Google Data Analytics Professional Certificate",
    issuer: "Coursera / Google",
    date: "2023",
    url: "#",
  },
  {
    id: "cert-2",
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    url: "#",
  },
  {
    id: "cert-3",
    name: "React — The Complete Guide",
    issuer: "Udemy",
    date: "2023",
    url: "#",
  },
  {
    id: "cert-4",
    name: "SQL for Data Science",
    issuer: "Coursera / UC Davis",
    date: "2022",
    url: "#",
  },
];

export const projects = [
  {
    id: "proj-1",
    title: "Analytics Dashboard",
    description:
      "Real-time KPI dashboard with custom visualisations and alerting built for e-commerce clients.",
    tech: ["React", "TypeScript", "D3.js", "Python"],
    github: "#",
    live: "#",
  },
  {
    id: "proj-2",
    title: "Data Pipeline Toolkit",
    description:
      "Open-source CLI tool that orchestrates ETL jobs with minimal configuration.",
    tech: ["Python", "Docker", "SQL"],
    github: "#",
  },
];

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

export const blogs = [
  {
    id: "blog-1",
    title: "Why your dashboard lies to you",
    excerpt:
      "How common chart choices can mislead stakeholders — and how to fix them.",
    date: "2025-07-14",
    url: "#",
    tags: ["Analytics", "Visualization"],
  },
  {
    id: "blog-2",
    title: "Setting up a repeatable ETL pattern with Python",
    excerpt:
      "A pragmatic approach to building data pipelines that are easy to test and maintain.",
    date: "2025-06-03",
    url: "#",
    tags: ["Python", "ETL"],
  },
  {
    id: "blog-3",
    title: "Git contributions as a portfolio signal",
    excerpt:
      "What open-source commits tell hiring managers — and how to shape yours.",
    date: "2025-04-22",
    url: "#",
    tags: ["Career", "Open Source"],
  },
];
