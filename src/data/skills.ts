export const SkillsAndTools = [
  {
    category: "Automations & AI",
    items: [
      {
        name: "Power Automate",
        img: "/tools/microsoft-icon.svg",
        subCategory: null,
      },
      { name: "n8n", img: "/tools/n8n.svg", subCategory: null },
      { name: "MCP Servers", img: "/tools/mcp.svg", subCategory: null },
      {
        name: "Tampermonkey",
        img: "/tools/tampermonkey.svg",
        subCategory: null,
      },
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
      { name: "Django", img: "/tools/django.svg", subCategory: null },
      {
        name: "TypeScript",
        img: "/tools/typescript.svg",
        subCategory: "Language",
      },
      { name: "Node.js", img: "/tools/nodejs.svg", subCategory: "Runtime" },
      { name: "Express.js", img: "/tools/express.svg", subCategory: "Runtime" },
    ],
  },
  {
    category: "Platforms & Cloud",
    items: [
      { name: "Docker", img: "/tools/docker-icon.svg", subCategory: "DevOps" },
      {
        name: "Kubernetes",
        img: "/tools/kubernetes.svg",
        subCategory: "DevOps",
      },
      {
        name: "PostgreSQL",
        img: "/tools/postgressql-icon.svg",
        subCategory: null,
      },
      { name: "Mongodb", img: "/tools/mongodb.svg", subCategory: null },
      { name: "Git & GitHub", img: "/tools/git.svg", subCategory: "VCS" },
      { name: "NHS", img: "/tools/nhs.webp", subCategory: null },
      { name: "SystmOne", img: "/tools/SYSTMONE.webp", subCategory: null },
      { name: "EMIS", img: "/tools/emis.webp", subCategory: null },
      { name: "Docman", img: "/tools/docman.png", subCategory: null },
    ],
  },
  {
    category: "Conceptual & Design",
    items: [
      {
        name: "System & Architecture Design",
        img: "/tools/tauri.svg",
        subCategory: null,
      },
      {
        name: "Data Structure & Algorithms",
        img: "/tools/rust.svg",
        subCategory: null,
      },
      { name: "Claude", img: "/tools/claude.svg", subCategory: null },
      { name: "Claude Code", img: "/tools/claude-code.svg", subCategory: null },
      { name: "MCPs", img: "/tools/mcp.svg", subCategory: null },
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
      img: "/tools/microsoft-icon.svg",
      role: "Agentic Tooling",
    },
    {
      name: "Claude Code",
      img: "/tools/claude-code.svg",
      role: "Agentic Tooling",
    },
    { name: "Docker", img: "/tools/docker.svg", role: "Containerization" },
    {
      name: "Microservices",
      img: "/tools/microservice.png",
      role: "Architecture",
    },
  ],
};
