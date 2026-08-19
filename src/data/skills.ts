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
    ],
  },
  {
    category: "Platforms & Cloud",
    items: [
      { name: "Docker", img: "/tools/docker.svg", subCategory: "DevOps" },
      { name: "PostgreSQL", img: null, subCategory: null },
      { name: "Git & GitHub", img: "/tools/git.svg", subCategory: "VCS" },
      { name: "SystmOne", img: null, subCategory: null },
      { name: "EMIS", img: null, subCategory: null },
      { name: "Docman", img: null, subCategory: null },
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
  icon: null,
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