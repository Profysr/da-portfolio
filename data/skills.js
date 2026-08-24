import {
  IconCpu,
  IconServer,
  IconCloud,
  IconBrandReact,
  IconHeartRateMonitor,
} from "@tabler/icons-react";

// ─────────────────────────────────────────────────────────────────────────────
// TECH_ICON_MAP — single source of truth for every tool pill rendered anywhere.
//
// Keys   : exact tool name strings used in projects.js, experience.js, and
//          SkillsAndTools below.
// Values : { img, hideName?, lightBg?, category? }
//
//   img      — path relative to /public (e.g. "/tools/react.svg") or null/undefined
//   hideName — hide the text label when an icon IS present (default false)
//   lightBg  — wrap icon in a light pill background (for dark SVGs)
//   category — informational grouping tag (not rendered, for tooling/filtering)
//
// Rules enforced by TechPill:
//   • Has img  → show icon. Show name too, unless hideName === true.
//   • No img   → show name only. No fallback icons ever.
// ─────────────────────────────────────────────────────────────────────────────
export const TECH_ICON_MAP = {
  // ── Languages d
  Python: { img: "/tools/python.svg", category: "Language" },
  TypeScript: { img: "/tools/typescript.svg", category: "Language" },
  JavaScript: { img: "/tools/javascript.svg", category: "Language" },
  "C/C++": { img: "/tools/cpp.svg", category: "Language" },
  C: { img: "/tools/c.svg", category: "Language" },
  "C++": { img: "/tools/cpp.svg", category: "Language" },
  Rust: { img: "/tools/rust.svg", category: "Language", lightBg: true },
  SQL: { img: "/tools/sql.svg", category: "Language" },
  HTML: { img: "/tools/html.svg", category: "Language" },
  CSS: { img: "/tools/css.svg", category: "Language" },

  // ── Frontend ───────────────────────────────────────────────────────────────
  React: { img: "/tools/react.svg", category: "Frontend" },
  "Next.js": { img: "/tools/nextjs-dark.svg", category: "Frontend" },
  "React Native": { img: "/tools/reactnative.svg", category: "Frontend" },
  Vue: { img: "/tools/vue.svg", category: "Frontend" },
  Angular: { img: "/tools/angular.svg", category: "Frontend" },
  "Tailwind CSS": { img: "/tools/tailwind.svg", category: "Frontend" },
  "Framer Motion": { img: "/tools/framer-motion.svg", category: "Frontend" },
  Motion: { img: "/tools/framer-motion.svg", category: "Frontend" },
  // Figma:        { img: "/tools/figma.svg",         category: "Design" },

  // ── Backend / Runtime ──────────────────────────────────────────────────────
  Django: { img: "/tools/django.svg", category: "Backend" },
  "Django REST Framework": {
    img: "/tools/djangorest.svg",
    category: "Backend",
  },
  "Node.js": { img: "/tools/nodejs.svg", category: "Runtime" },
  "Express.js": {
    img: "/tools/express.svg",
    category: "Backend",
  },

  // ── Databases ──────────────────────────────────────────────────────────────
  PostgreSQL: { img: "/tools/postgres.svg", category: "Database" },
  MongoDB: { img: "/tools/mongodb.svg", category: "Database" },
  SQLite: { img: "/tools/sqlite.svg", category: "Database" },
  Redis: { img: undefined, category: "Database" },
  ClickHouse: { img: undefined, category: "Database" },

  // ── DevOps / Cloud ─────────────────────────────────────────────────────────
  Docker: { img: "/tools/docker-icon.svg", category: "DevOps" },
  Kubernetes: {
    img: "/tools/kubernetes.svg",
    category: "DevOps",
  },
  Azure: { img: "/tools/azure.svg", category: "Cloud" },
  "Git & GitHub": { img: "/tools/git.svg", category: "VCS" },
  Git: { img: "/tools/git-icon.svg", category: "VCS" },
  GitHub: { img: "/tools/github-dark.svg", category: "VCS" },

  // ── Automations & AI ───────────────────────────────────────────────────────
  "Power Automate": {
    img: "/tools/microsoft-icon.svg",
    category: "Automation",
  },
  n8n: { img: "/tools/n8n.svg", category: "Automation" },
  "MCP Servers": { img: "/tools/mcp.svg", category: "AI" },
  MCPs: { img: "/tools/mcp.svg", category: "AI" },
  Tampermonkey: {
    img: "/tools/tampermonkey.svg",
    lightBg: true,
    category: "Automation",
  },
  PowerShell: {
    img: "/tools/powershell.svg",
    lightBg: true,
    category: "Automation",
  },
  AutoHotkey: { img: undefined, category: "Automation" },
  Celery: { img: undefined, category: "Backend" },
  Claude: { img: "/tools/claude.svg", category: "AI" },
  "Claude Code": { img: "/tools/claude-code.svg", category: "AI" },

  // ── Healthcare / Clinical Systems ──────────────────────────────────────────
  NHS: { img: "/tools/nhs.webp", hideName: true, category: "Healthcare" },
  SystmOne: {
    img: "/tools/SYSTMONE.webp",
    category: "Healthcare",
  },
  EMIS: {
    img: "/tools/emis.webp",
    hideName: true,
    lightBg: true,
    category: "Healthcare",
  },
  Docman: { img: "/tools/docman.png", category: "Healthcare" },

  // ── Frameworks / Tooling ───────────────────────────────────────────────────
  Expo: { img: "/tools/expo-dark.svg", category: "Tooling" },
  Tauri: { img: "/tools/tauri.svg", category: "Tooling" },
  VSCode: { img: "/tools/vscode.svg", category: "Tooling" },
  "D3.js": { img: undefined, category: "Frontend" },
  cobe: { img: undefined, category: "Frontend" },

  // ── Conceptual / No-icon ───────────────────────────────────────────────────
  Agile: { img: undefined, category: "Process" },
  "Distributed Systems": { img: undefined, category: "Conceptual" },
  Algorithms: { img: undefined, category: "Conceptual" },
  Linux: { img: undefined, category: "Tooling" },
  "Data Structures": { img: undefined, category: "Conceptual" },
  OOP: { img: undefined, category: "Conceptual" },
  "Database Design": { img: undefined, category: "Conceptual" },
  Mathematics: { img: undefined, category: "Conceptual" },
  "System & Architecture Design": { img: undefined, category: "Conceptual" },
  "Data Structure & Algorithms": { img: undefined, category: "Conceptual" },
  Microservices: { img: "/tools/microservice.png", category: "Conceptual" },
};

/**
 * getTechIcon(name)
 * Returns the icon config for a given tool name, or undefined if not registered.
 * Used internally by TechPill — consumers don't need to call this directly.
 *
 * @param {string} name
 * @returns {{ img?: string, hideName?: boolean, lightBg?: boolean, category?: string } | undefined}
 */
export function getTechIcon(name) {
  return TECH_ICON_MAP[name];
}

// ─────────────────────────────────────────────────────────────────────────────
// SkillsAndTools — drives the TechStack section display (categories + items).
// Each category carries its own presentation meta (Icon + shade class from
// lib/tokens/shades.css) so data and styling live in one place.
// Items here reference names that MUST exist in TECH_ICON_MAP above if they
// have icons. Properties like img/hideName/lightBg on items below are kept
// for reference but TechPill resolves everything from TECH_ICON_MAP.
// ─────────────────────────────────────────────────────────────────────────────
export const SkillsAndTools = [
  {
    category: "Automations & AI",
    Icon: IconCpu,
    shade: "shade-card-gold",
    items: [
      { name: "Power Automate", subCategory: null },
      { name: "n8n", subCategory: null },
      { name: "MCP Servers", subCategory: null },
      { name: "Tampermonkey", subCategory: null },
      { name: "PowerShell", subCategory: "Automation" },
    ],
  },
  {
    category: "Engineering & Backend",
    Icon: IconServer,
    shade: "shade-card-blue",
    items: [
      { name: "Python", subCategory: "Language" },
      { name: "React", subCategory: "Frontend" },
      { name: "Django", subCategory: null },
      { name: "Django REST Framework", subCategory: null },
      { name: "TypeScript", subCategory: "Language" },
      { name: "Node.js", subCategory: "Runtime" },
      { name: "Express.js", subCategory: "Runtime" },
    ],
  },
  {
    category: "Platforms & Cloud",
    Icon: IconCloud,
    shade: "shade-card-green",
    items: [
      { name: "Docker", subCategory: "DevOps" },
      { name: "Kubernetes", subCategory: "DevOps" },
      { name: "PostgreSQL", subCategory: null },
      { name: "MongoDB", subCategory: null },
      { name: "Git & GitHub", subCategory: "VCS" },
    ],
  },
  {
    category: "Conceptual & Design",
    Icon: IconBrandReact,
    shade: "shade-card-rose",
    items: [
      { name: "System & Architecture Design", subCategory: null },
      { name: "Data Structure & Algorithms", subCategory: null },
      { name: "Claude", subCategory: null },
      { name: "Claude Code", subCategory: null },
      { name: "MCPs", subCategory: null },
    ],
  },
  {
    category: "Health Tech",
    Icon: IconHeartRateMonitor,
    shade: "shade-card-orange",
    items: [
      { name: "NHS", subCategory: null },
      { name: "SystmOne", subCategory: null },
      { name: "EMIS", subCategory: null },
      { name: "Docman", subCategory: null },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// favoriteStack — drives the FavoriteStack component (marquee + detailed card).
// ─────────────────────────────────────────────────────────────────────────────
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
