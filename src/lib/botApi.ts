import { experiences, education, certificates, awards, projects, writings, personal } from "@/data/idx";

export interface BotSource {
  label: string;
  href: string;
  description?: string;
}

export interface BotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: BotSource[];
}

export interface BotResponse {
  content: string;
  sources?: BotSource[];
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const currentRole = experiences[0]?.roles[0];
const prevRole = experiences[0]?.roles[1];
const otherExp = experiences[1];

export async function sendMessage(
  text: string,
  _history: BotMessage[],
): Promise<BotResponse> {
  await wait(500 + Math.random() * 400);

  const q = text.toLowerCase();

  if (/\b(experience|work|role|kynoby|simplamo|career|background)\b/.test(q)) {
    return {
      content: [
        `**${currentRole?.title}** at **${experiences[0].company}** (${experiences[0].location} — ${experiences[0].locationType}), ${currentRole?.period}`,
        currentRole?.description,
        ``,
        `Previously **${prevRole?.title}** at ${experiences[0].company} (${prevRole?.period}): ${prevRole?.description}`,
        ``,
        `Before that: **${otherExp.roles[0].title}** at **${otherExp.company}**, ${otherExp.location} (${otherExp.roles[0].period}).`,
        ``,
        `**Total professional experience: 2 years 8 months.**`,
      ].join("\n"),
    };
  }

  if (/\b(stack|python|react|tech|mcp|tool|language|framework)\b/.test(q)) {
    return {
      content: [
        `**Core Powerhouse** (daily drivers): Python, React, n8n, Custom MCPs, Docker.`,
        ``,
        `**Backend & Systems:** Python, Django, FastAPI, PostgreSQL, Redis, Celery, Docker`,
        `**AI & Automation:** Model Context Protocol (MCP), n8n, Power Automate, AutoHotkey, Tampermonkey`,
        `**Frontend:** React 19, Next.js, TypeScript, Tailwind CSS, Motion`,
        `**Cloud & DevOps:** AWS, Linux, Git/GitHub, Docker`,
        ``,
        `Automations deployed: **150+** | Engineering hours: **4,280+** | Projects: **40+**`,
      ].join("\n"),
    };
  }

  if (/\b(education|university|degree|gpa|academic|college)\b/.test(q)) {
    return {
      content: [
        `**${education[0].degree} (Minor: ${education[0].minor})**`,
        `${education[0].institution}, ${education[0].location} (${education[0].startDate}–${education[0].endDate})`,
        `GPA: ${education[0].grade} | Dean's Honor List | ${education[0].activities}`,
        ``,
        `**${education[1].degree}** — ${education[1].institution}, ${education[1].location} (${education[1].startDate}–${education[1].endDate})`,
        `${education[1].grade} | ${education[1].activities}`,
      ].join("\n"),
    };
  }

  if (/\b(cert|certification|aws|google|course)\b/.test(q)) {
    return {
      content: certificates
        .map(
          (c) =>
            `• **${c.name}** (${c.issuingOrg}) — issued ${c.issueDate}${c.expirationDate ? `, expires ${c.expirationDate}` : ""}`,
        )
        .join("\n"),
    };
  }

  if (/\b(project|built|ship|deploy|portfolio|case.study)\b/.test(q)) {
    return {
      content: [
        ...projects.map(
          (p) => `• **${p.title}** — ${p.description.split(".")[0]}${p.tech ? ` (${p.tech.join(", ")})` : ""}`,
        ),
        ``,
        `**40+ projects delivered.**`,
      ].join("\n"),
    };
  }

  if (/\b(blog|article|writing|post|read)\b/.test(q)) {
    return {
      content: [
        "Here are Bilal's recent writings:",
        ``,
        ...writings.map(
          (b) => `• **"${b.title}"** — ${b.excerpt} *(Tags: ${b.tags.join(", ")})*`,
        ),
        ``,
        "You can find these under the **Writing** section in the navigation.",
      ].join("\n"),
    };
  }

  if (/\b(award|achievement|honor|recognition)\b/.test(q)) {
    return {
      content: [
        `• **${awards[0].title}** — ${awards[0].issuer}, ${awards[0].date}. ${awards[0].description}`,
        `• **${awards[1].title}** — ${awards[1].issuer}, ${awards[1].date}. ${awards[1].description}`,
      ].join("\n"),
    };
  }

  if (/\b(contact|email|hire|available|reach|opportunity)\b/.test(q)) {
    return {
      content: [
        `Bilal is **open to Forward Deployed, Senior Full-Stack, and AI/Automation Lead roles**.`,
        ``,
        `Work: Remote worldwide or Hybrid (Islamabad / London timezone overlap).`,
        ``,
        `📧 **${personal.email}**`,
        `📄 ATS Resume available via the download button in the header.`,
      ].join("\n"),
    };
  }

  return {
    content: [
      `I'm trained on Bilal's engineering background. Ask me about his **experience**, **tech stack**, **projects**, **education**, **certifications**, **blog posts**, or **availability**.`,
      ``,
      `Try the quick prompt chips below or ask me anything specific!`,
    ].join("\n"),
  };
}