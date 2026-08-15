/**
 * ============================================================
 *  src/data/idx.js
 *  ⚡ Single Source of Truth for the entire portfolio.
 *
 *  Every section (Hero, About, Experience, etc.) reads data
 *  from this file. To update your portfolio, edit here only.
 *
 *  Fields are plain JS — JSDoc types for documentation.
 * ============================================================
 */

/**
 * @typedef {Object} SocialLink
 * @property {string} platform  — e.g. "github", "linkedin", "twitter"
 * @property {string} url
 * @property {string} label     — display name
 */

/**
 * @typedef {Object} PersonalInfo
 * @property {string} name        — full name shown in hero
 * @property {string} tagline     — short role descriptor
 * @property {string} bio         — longer about-me paragraph
 * @property {string} avatar      — path or URL to profile image
 * @property {string} location    — city, country
 * @property {string} email
 * @property {string} resumeUrl   — path to PDF resume (optional)
 * @property {SocialLink[]} socials
 */

/**
 * @typedef {Object} SkillCategory
 * @property {string} category   — e.g. "Frontend", "Data"
 * @property {string[]} items    — individual skill names
 */

/**
 * @typedef {Object} ExperienceItem
 * @property {string} id
 * @property {string} role
 * @property {string} company
 * @property {string} start       — e.g. "Jan 2023"
 * @property {string} end         — e.g. "Present" or "Mar 2024"
 * @property {string} description — short paragraph
 * @property {string[]} tech      — skills/tools used
 * @property {boolean} [current]  — true if still working here
 */

/**
 * @typedef {Object} EducationItem
 * @property {string} id
 * @property {string} degree
 * @property {string} institution
 * @property {string} start
 * @property {string} end
 * @property {string} [description]
 * @property {string[]} [highlights] — bullet-point achievements
 */

/**
 * @typedef {Object} Certificate
 * @property {string} id
 * @property {string} name
 * @property {string} issuer
 * @property {string} date        — e.g. "2024"
 * @property {string} url          — credential link
 * @property {string} [image]      — optional badge image path
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} tech
 * @property {string} [github]
 * @property {string} [live]
 * @property {string} [image]      — project screenshot/thumbnail
 */

/**
 * @typedef {Object} KanbanCard
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {"todo"|"in-progress"|"done"} status
 * @property {"current"|"vision"} category  — "current" = Current Activities, "vision" = Vision
 */

/**
 * @typedef {Object} BlogPost
 * @property {string} id
 * @property {string} title
 * @property {string} excerpt
 * @property {string} date        — ISO date "YYYY-MM-DD"
 * @property {string} url
 * @property {string[]} tags
 */

/**
 * @typedef {Object} Stat
 * @property {string} label        — e.g. "Commits"
 * @property {number} value        — e.g. 2500
 * @property {string} [suffix]     — e.g. "+"
 */

/* ============================================================
 *  👇 EDIT EVERYTHING BELOW THIS LINE
 * ============================================================ */

/** @type {PersonalInfo} */
export const personal = {
  name: "Bilal Ahmad",
  tagline: "Forward Deployed and Software Engineer",
  bio: `I turn raw data into decisions. I build tools, mentor
        contributors, and run a one-person digital agency
        focused on analytics and intelligent systems.`,
  avatar: "/avatar.jpg",
  location: "Pakistan",
  email: "hello@da-portfolio.dev",
  resumeUrl: "/resume.pdf",
  socials: [
    { platform: "github", url: "https://github.com/", label: "GitHub" },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/",
      label: "LinkedIn",
    },
    { platform: "x", url: "https://x.com/", label: "X" },
  ],
};

/** @type {SkillCategory[]} */
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

/** @type {ExperienceItem[]} */
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

/** @type {EducationItem[]} */
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

/** @type {Certificate[]} */
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

/** @type {Project[]} */
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

/** @type {KanbanCard[]} */
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

// Backward-compatible aliases (deprecated — use `kanban` + `category` filter instead)
/** @type {KanbanCard[]} */
export const kanbanCurrent = kanban.filter((c) => c.category === "current");

/** @type {KanbanCard[]} */
export const kanbanVision = kanban.filter((c) => c.category === "vision");

/** @type {BlogPost[]} */
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

/** @type {Stat[]} */
export const stats = [
  { label: "Commits", value: 2500, suffix: "+" },
  { label: "Projects", value: 40 },
  { label: "DaysSpent", value: 1000, suffix: "+" },
  { label: "Articles", value: 60 },
];
