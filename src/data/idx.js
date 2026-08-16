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
} from "@tabler/icons-react";

/**
 * ============================================================
 *  src/data/idx.js
 *  ⚡ Single Source of Truth for the entire portfolio.
 *
 *  Every section (Hero, About, Experience, etc.) reads data
 *  from this file. To update your portfolio, edit here only.
 * ============================================================
 */

export const nav = [
  { id: "hero", label: "Home", icon: IconHome },
  { id: "about", label: "About", icon: IconUser },
  { id: "experience", label: "Experience", icon: IconBriefcase },
  { id: "projects", label: "Projects", icon: IconFolderCode },
  { id: "blog", label: "Blog", icon: IconBook },
  { id: "contact", label: "Contact", icon: IconMail },
];

export const socials = [
  {
    platform: "github",
    icon: IconBrandGithub,
    url: "https://github.com/",
    label: "GitHub",
    aria: "github",
  },
  {
    platform: "linkedin",
    icon: IconBrandLinkedin,
    url: "https://linkedin.com/in/",
    label: "LinkedIn",
    aria: "linkedin",
  },
  { platform: "x", icon: IconBrandX, url: "https://x.com/", label: "X", aria: "x" },
];

/* ============================================================
 *  👇 EDIT EVERYTHING BELOW THIS LINE
 * ============================================================ */

export const personal = {
  name: "Bilal Ahmad",
  tagline: "Forward Deployed and Software Engineer",
  bio: `I turn raw data into decisions. I build tools, mentor
        contributors, and run a one-person digital agency
        focused on analytics and intelligent systems.`,
  avatar: "/avatar.jpg",
  logo: "/logo.svg",
  location: "Pakistan",
  email: "hello@da-portfolio.dev",
  resumeUrl: "/resume.pdf",
  socials,
};

export const skills = [
  {
    category: "Automations",
    items: ["Power Automate", "Powershell Scripting", "n8n", "Tampermonkey"],
  },
  {
    category: "Engineering",
    items: ["React", "Python", "Django", "TypeScript", "Node.js"],
  },
  {
    category: "Tools & Platforms",
    items: ["Docker", "AWS", "Notion", "Git & GitHub"],
  },
];

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

export const animatedName = {
  suffixes: ["", " Ahmad"],
  cycleMs: 3500,
  holdAfterExitMs: 500,
};

export const stats = [
  { label: "Commits", value: 2500, suffix: "+" },
  { label: "Projects", value: 40 },
  { label: "DaysSpent", value: 1000, suffix: "+" },
  { label: "Articles", value: 60 },
];
