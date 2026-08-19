export const SkillsAndTools = [
  {
    category: "Automations & AI",
    items: [
      { name: "Power Automate", img: "/tools/microsoft-icon.svg", subCategory: null },
      { name: "n8n", img: "/tools/n8n.svg", subCategory: null },
      { name: "MCP Servers", img: "/tools/mcp.svg", subCategory: null, hideName: true },
      { name: "Tampermonkey", img: "/tools/tampermonkey.svg", subCategory: null, lightBg: true },
      {
        name: "PowerShell",
        img: "/tools/powershell.svg",
        subCategory: "Automation",
        lightBg: true,
      },
    ],
  },
  {
    category: "Engineering & Backend",
    items: [
      { name: "Python", img: "/tools/python.svg", subCategory: "Language" },
      { name: "React", img: "/tools/react.svg", subCategory: "Frontend" },
      { name: "Django", img: "/tools/django.svg", subCategory: null },
      { name: "Django REST Framework", img: "/tools/django.svg", subCategory: null, hideName: true },
      {
        name: "TypeScript",
        img: "/tools/typescript.svg",
        subCategory: "Language",
      },
      { name: "Node.js", img: "/tools/nodejs.svg", subCategory: "Runtime" },
      { name: "Express.js", img: "/tools/express.svg", subCategory: "Runtime", hideName: true },
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
        hideName: true,
      },
      {
        name: "PostgreSQL",
        img: "/tools/postgres.svg",
        subCategory: null,
      },
      { name: "Mongodb", img: "/tools/mongodb.svg", subCategory: null, hideName: true },
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
        img: null,
        subCategory: null,
      },
      {
        name: "Data Structure & Algorithms",
        img: null,
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
    { name: "Python", role: "Backend & Systems" },
    { name: "React", role: "Frontend UI" },
    { name: "Django", role: "Full-Stack" },
    { name: "Power Automate", role: "Agentic Tooling" },
    { name: "Claude Code", role: "Agentic Tooling" },
    { name: "Docker", role: "Containerization" },
    { name: "Microservices", role: "Architecture" },
  ],
};

/**
 * TECH_ICON_MAP — single source of truth for tool name → icon metadata.
 * Built automatically from SkillsAndTools + favoriteStack.
 * Add a new tool there and it appears everywhere, no second edit needed.
 */
export interface TechIconConfig {
  img: string;
  hideName?: boolean;
  lightBg?: boolean;
}

export const TECH_ICON_MAP: Record<string, TechIconConfig> = (() => {
  const map: Record<string, TechIconConfig> = {};
  for (const group of SkillsAndTools) {
    for (const item of group.items) {
      if (!item.img) continue;
      map[item.name] = {
        img: item.img,
        hideName: (item as any).hideName ?? undefined,
        lightBg: (item as any).lightBg ?? undefined,
      };
    }
  }
  for (const item of favoriteStack.items) {
    const cfg = resolveFavoriteItem(item.name);
    if (!cfg?.img) continue;
    if (!map[item.name]) {
      map[item.name] = { img: cfg.img };
    }
  }
  return map;
})();

export function resolveFavoriteItem(
  name: string,
): { img?: string; hideName?: boolean; lightBg?: boolean } | undefined {
  return TECH_ICON_MAP[name];
}