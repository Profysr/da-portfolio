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
  IconSchool,
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
  // { id: "contributions", label: "Contributions", icon: IconActivity },
  { id: "experience", label: "Experience", icon: IconBriefcase },
  { id: "projects", label: "Projects", icon: IconFolderCode },
  { id: "blog", label: "Blog", icon: IconBook },
  // { id: "contact", label: "Contact", icon: IconMail },
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
  stack: "Python • React • n8n • Custom MCPs • Docker",
  tag: "Modern Intelligent Stack",
  icon: IconSparkles,
  items: [
    { name: "Python", img: "/tools/python.svg", role: "Backend & Systems" },
    { name: "React", img: "/tools/react.svg", role: "Frontend UI" },
    { name: "Django", img: "/tools/django.svg", role: "Full-Stack" },
    {
      name: "Power Automate",
      img: "/tools/power-automate.svg",
      role: "Agentic Tooling",
    },
    {
      name: "Claude Code",
      img: "/tools/claude.png",
      role: "Agentic Tooling",
    },
    { name: "Docker", img: "/tools/docker.svg", role: "Containerization" },
    { name: "Microservices", img: null, role: "Architecture" },
  ],
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

export const experiences = [
  {
    company: "Kynoby",
    logo: "https://assets.chanhdai.com/images/companies/shadcncraft.svg", // Replace with your logo path
    url: "https://kynoby.com",
    location: "London, UK",
    locationType: "Remote",
    isCurrent: true,
    roles: [
      {
        id: "kynoby-lead",
        title: "Software Development Lead",
        type: "Full-time",
        period: "2026 — Present",
        duration: "Current",
        description:
          "Managing engineering team, architecting healthcare integrations, and driving technical direction across automation platforms.",
        skills: ["React", "Next.js", "Django", "PostgreSQL", "Redis", "Celery", "Docker"],
      },
      {
        id: "kynoby-rpa",
        title: "RPA Engineer",
        type: "Full-time",
        period: "03.2025 — 2026",
        duration: "1y",
        description:
          "Engineered clinical software automations integrated with SystmOne, EMIS, and Docman.",
        skills: ["Power Automate", "AutoHotkey", "JavaScript", "Python"],
      },
    ],
  },
  {
    company: "Simplamo",
    logo: "https://assets.chanhdai.com/images/companies/simplamo.webp",
    url: "https://simplamo.com",
    location: "Ho Chi Minh City, Viet Nam",
    locationType: "On-site",
    isCurrent: false,
    roles: [
      {
        id: "simplamo-sr-fe",
        title: "Senior Frontend Developer",
        type: "Full-time",
        period: "10.2022 — 01.2026",
        duration: "3y 4m",
        description:
          "Led frontend architecture, built component libraries, and optimized application performance.",
        skills: ["TypeScript", "Next.js", "React Native", "Tailwind CSS", "Agile"],
      },
    ],
  },
];

export const education = [
  {
    id: "edu-uml",
    institution: "University of Massachusetts, Lowell",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    minor: "Mathematics",
    startDate: "2020",
    endDate: "2024",
    grade: "3.8 GPA",
    activities: "ACM Student Chapter, Distributed Systems Lab",
    description:
      "Core focus on algorithms, distributed computing, operating systems, and applied mathematics.",
    location: "Lowell, MA",
    skills: ["C/C++", "Python", "Algorithms", "Distributed Systems", "SQL", "Linux"],
    url: "https://www.uml.edu",
    image: "/experience/umasslowell_logo.jpg",
  },
  {
    id: "edu-comsats",
    institution: "COMSATS University",
    degree: "Associate / Pre-Engineering",
    fieldOfStudy: "Computer & Information Sciences",
    startDate: "2018",
    endDate: "2020",
    grade: "First Class Honors",
    activities: "Software Innovation Society",
    description:
      "Foundation in data structures, computational mathematics, and database management.",
    location: "Islamabad, PK",
    skills: ["Data Structures", "OOP", "Database Design", "Mathematics"],
    url: "https://www.comsats.edu.pk",
    image: null,
  },
];

export const certificates = [
  {
    id: "cert-aws",
    name: "AWS Certified Solutions Architect",
    issuingOrg: "Amazon Web Services (AWS)",
    issueDate: "Jan 2024",
    expirationDate: "Jan 2027",
    credentialId: "AWS-PSA-882194",
    credentialUrl: "https://aws.amazon.com/verification",
    skills: ["Cloud Architecture", "S3", "EC2", "IAM", "VPC", "Serverless"],
  },
  {
    id: "cert-gcp-data",
    name: "Google Data Analytics Professional Certificate",
    issuingOrg: "Google / Coursera",
    issueDate: "Aug 2023",
    expirationDate: null,
    credentialId: "GCP-DA-49210",
    credentialUrl: "https://coursera.org/verify/professional-cert/google-data-analytics",
    skills: ["SQL", "Data Pipelines", "R", "Tableau", "Data Modeling"],
  },
  {
    id: "cert-react",
    name: "Advanced React & Next.js Architecture",
    issuingOrg: "Udemy / Vercel Partner",
    issueDate: "May 2023",
    expirationDate: null,
    credentialId: "UC-5928174",
    credentialUrl: "https://udemy.com/certificate/UC-5928174",
    skills: ["React 19", "Server Components", "Next.js", "State Machines"],
  },
  {
    id: "cert-sql",
    name: "SQL for Data Science & Distributed Queries",
    issuingOrg: "UC Davis / Coursera",
    issueDate: "Nov 2022",
    expirationDate: null,
    credentialId: "COURSERA-SQL-38192",
    credentialUrl: "https://coursera.org/verify/sql-data-science",
    skills: ["PostgreSQL", "Query Optimization", "Indexing", "ETL"],
  },
];

export const awards = [
  {
    id: "award-1",
    title: "Engineering Excellence & Innovation Award",
    issuer: "Kynoby Leadership",
    date: "2025",
    description: "Awarded for architecting healthcare interoperability pipelines reducing clinical data processing latency by 40%.",
  },
  {
    id: "award-2",
    title: "Dean's Honor List",
    issuer: "University of Massachusetts",
    date: "2023",
    description: "Academic honors in Computer Science & Applied Mathematics.",
  },
];

export const aiRecruiterData = {
  quickPrompts: [
    {
      id: "pitch",
      icon: "⚡",
      label: "15-Second Executive Pitch",
      answer: `Bilal is a **Forward Deployed Engineer & Engineering Lead** with 2.8+ years in industry. He bridges deep backend systems (*Python, Django, PostgreSQL*) with agentic automation pipelines (*Custom MCPs, n8n, Power Automate*) and modern React frontends. He currently leads engineering at **Kynoby**, architecting resilient healthcare automation platforms.`,
    },
    {
      id: "stack",
      icon: "🛠️",
      label: "Core Stack & MCP Pipelines",
      answer: `**Core Powerhouse**:
• **Backend & Systems**: Python, Django, FastAPI, PostgreSQL, Redis, Celery, Docker
• **AI & Automation**: Model Context Protocol (MCP), n8n, Power Automate, AutoHotkey
• **Frontend**: React 19, Next.js, TypeScript, Tailwind CSS, Motion
• **Cloud & DevOps**: AWS, Linux, Git/GitHub, Docker containerization.`,
    },
    {
      id: "achievements",
      icon: "📈",
      label: "Key Impact & Metrics @ Kynoby",
      answer: `At **Kynoby** as Software Development Lead & RPA Engineer:
• Architected clinical software integrations (SystmOne, EMIS, Docman) reducing manual operational overhead by **40%**.
• Scaled and managed engineering workflows across healthcare automation products.
• Built **150+ production automations** logging **4,280+ deep-focus engineering hours**.`,
    },
    {
      id: "education",
      icon: "🎓",
      label: "Academic Background & Certifications",
      answer: `• **B.S. in Computer Science (Minor in Mathematics)** from University of Massachusetts, Lowell (3.8 GPA, Dean's List).
• **AWS Certified Solutions Architect** & **Google Data Analytics Professional Certified**.
• Strong foundation in Data Structures, Distributed Algorithms, and High-throughput Systems.`,
    },
    {
      id: "contact",
      icon: "🤝",
      label: "Availability & Work Preference",
      answer: `• **Status**: Open to Forward Deployed, Senior Full-Stack, and AI/Automation Lead roles.
• **Work Arrangement**: Remote worldwide or Hybrid (Islamabad / London timezone overlap).
• **Direct Email**: [hello@da-portfolio.dev](mailto:hello@da-portfolio.dev)
• **ATS Resume**: Available via the top header download button.`,
    },
  ],
};


export const projects = [
  {
    id: "proj-1",
    title: "Analytics Dashboard",
    subtitle: "Real-time KPI dashboard with custom visualisations",
    description:
      "Real-time KPI dashboard with custom visualisations and alerting built for e-commerce clients.",
    tech: ["React", "TypeScript", "D3.js", "Python"],
    tags: ["React", "TypeScript", "D3.js", "Python"],
    category: "Web",
    isFeatured: true,
    github: "#",
    live: "#",
    githubUrl: "#",
    liveUrl: "#",
    image: "/projects/analytics-dashboard.jpg",
  },
  {
    id: "proj-2",
    title: "Data Pipeline Toolkit",
    subtitle: "Open-source ETL orchestration CLI",
    description:
      "Open-source CLI tool that orchestrates ETL jobs with minimal configuration.",
    tech: ["Python", "Docker", "SQL"],
    tags: ["Python", "Docker", "SQL"],
    category: "Automation",
    isFeatured: false,
    github: "#",
    live: "#",
    githubUrl: "#",
    liveUrl: "#",
    image: null,
  },
  {
    id: "proj-3",
    title: "RPA Clinical Automation Suite",
    subtitle: "Healthcare workflow automation for NHS clinics",
    description:
      "End-to-end clinical software automation integrated with SystmOne, EMIS, and Docman systems.",
    tech: ["Power Automate", "Python", "JavaScript"],
    tags: ["Power Automate", "Python", "JavaScript", "AutoHotkey"],
    category: "Automation",
    isFeatured: true,
    github: "#",
    live: "#",
    githubUrl: "#",
    liveUrl: "#",
    image: null,
  },
  {
    id: "proj-4",
    title: "Agency Portfolio Platform",
    subtitle: "Dark cinematic portfolio for DA Agency",
    description:
      "Single-page portfolio with interactive globe, contribution heatmap, and glassmorphic UI.",
    tech: ["React", "Motion", "Tailwind CSS", "cobe"],
    tags: ["React", "Motion", "Tailwind CSS", "cobe"],
    category: "Web",
    isFeatured: false,
    github: "#",
    live: "#",
    githubUrl: "#",
    liveUrl: "#",
    image: null,
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

export const FrequentQuestions = {
  badge: "FAQ",
  heading: "Frequently Asked Questions",
  subheading:
    "Everything you need to know about how I approach problems, products, and engineering.",
  items: [
    {
      id: "faq-1",
      question: "What core problem do you solve for businesses?",
      answer:
        "I bridge the gap between high-level business goals and robust technical execution. Whether it's optimizing workflows, building scalable software architectures, or shipping user-first web applications, my focus is always on solving real-world business problems efficiently.",
    },
    {
      id: "faq-2",
      question: "How do you approach a new engineering or product project?",
      answer:
        "I start by deeply understanding the core problem and user needs before writing any code. From there, I design modular, maintainable architectures, write clean, type-safe code, and iterate rapidly based on real user feedback and measurable outcomes.",
    },
    {
      id: "faq-3",
      question: "What technologies and frameworks do you specialize in?",
      answer:
        "My core stack centers around modern full-stack web technologies: React, Next.js, TypeScript, Tailwind CSS, Node.js, and modern database systems. However, I view frameworks as tools—I choose the best tool suited for the specific business problem at hand.",
    },
    {
      id: "faq-4",
      question: "Are you open to freelance, consulting, or full-time roles?",
      answer:
        "Yes! I am always open to high-impact opportunities—whether that means leading full-stack engineering efforts, consulting on complex software architecture, or joining an ambitious full-time team.",
    },
    {
      id: "faq-5",
      question: "How can we get in touch or start working together?",
      answer:
        "You can reach out directly via email using the contact CTA in the footer, or connect with me on LinkedIn and GitHub. I typically respond within 24 hours.",
    },
  ],
};

export const footer = {
  badge: "Get in Touch",
  heading: "20 years ago, today, or 20 years from now",
  subheading:
    "understand the problem, solve it, and you're unstoppable.",
  ctaLabel: "Say Hello",
  resumePath: "/resume.pdf",
};