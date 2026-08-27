import { readFileSync, readdirSync } from "fs";
import { join, extname, basename } from "path";
import { Index } from "@upstash/vector";
import { experiences } from "../data/experience.js";
import { SkillsAndTools, favoriteStack } from "../data/skills.js";
import { education, awards, certificates } from "../data/credentials.js";
import { botKnowledge } from "../data/botContent.js";
import { projects } from "../data/projects.js";
import { writings } from "../data/writings.js";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

function parseFrontmatter(raw) {
  const meta = {};
  for (const line of raw.split("\n")) {
    const match = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (!match) continue;
    const [, key, value] = match;
    const arrayMatch = value.match(/^\[(.*)\]$/);
    meta[key] = arrayMatch
      ? arrayMatch[1].split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""))
      : value.trim().replace(/^["']|["']$/g, "");
  }
  return meta;
}

function readMdx(dir) {
  return readdirSync(dir)
    .filter((f) => extname(f) === ".mdx")
    .map((f) => {
      const content = String(readFileSync(join(dir, f)));
      const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      return {
        slug: basename(f, ".mdx"),
        meta: fmMatch ? parseFrontmatter(fmMatch[1]) : {},
        body: fmMatch ? fmMatch[2] : content,
      };
    });
}

function chunkMdContent(content, maxLength = 800) {
  if (content.length <= maxLength) return [content.trim()];
  const sentences = content.split(/(?<=[.!?])\s+/);
  const chunks = [];
  let current = "";
  for (const s of sentences) {
    if ((current + s).length > maxLength && current) {
      chunks.push(current.trim());
      current = s;
    } else {
      current += (current ? " " : "") + s;
    }
  }
  if (current) chunks.push(current.trim());
  return chunks;
}

function getFumadocsChunks() {
  const chunks = [];
  const projectDir = join(process.cwd(), "content/projects");
  const writingDir = join(process.cwd(), "content/writings");

  for (const doc of readMdx(projectDir)) {
    const url = `/projects/${doc.slug}`;
    for (const section of doc.body.split(/\n##\s+/)) {
      const heading = section.match(/^([^\n]+)/)?.[1]?.trim() ?? "Overview";
      const text = section.trim();
      if (heading === "Overview" || text.length < 50) continue;
      const textChunks = chunkMdContent(text);
      for (let i = 0; i < textChunks.length; i++) {
        const partSuffix = textChunks.length > 1 ? ` (part ${i + 1})` : "";
        chunks.push({
          text: textChunks[i],
          metadata: {
            url: `${url}#${slugify(heading)}${partSuffix}`,
            title: doc.meta.title,
            heading: heading + partSuffix,
            category: "project",
          },
        });
      }
    }
  }

  for (const doc of readMdx(writingDir)) {
    const url = `/writing/${doc.slug}`;
    const paragraphs = doc.body.split(/\n\n+/).filter((p) => p.trim().length >= 50);
    for (const [i, p] of paragraphs.entries()) {
      const textChunks = chunkMdContent(p.trim());
      for (let j = 0; j < textChunks.length; j++) {
        const partSuffix = textChunks.length > 1 ? ` (part ${j + 1})` : "";
        chunks.push({
          text: textChunks[j],
          metadata: {
            url: `${url}#part-${i + 1}${partSuffix}`,
            title: doc.meta.title,
            heading: `Part ${i + 1}${partSuffix}`,
            category: "writing",
          },
        });
      }
    }
  }

  return chunks;
}

function getExperienceChunks() {
  const chunks = [];
  for (const exp of experiences) {
    for (const role of exp.roles) {
      const text = `Role: ${role.title} at ${exp.company}\n${role.description}\nSkills: ${role.skills.join(", ")}`;
      chunks.push({
        text: text.trim(),
        metadata: {
          url: "/",
          title: `${role.title} — ${exp.company}`,
          heading: "Experience",
          category: "experience",
        },
      });
    }
  }
  return chunks;
}

function getSkillsChunks() {
  const chunks = [];
  for (const group of SkillsAndTools) {
    const names = group.items.map((i) => i.name).join(", ");
    chunks.push({
      text: `Skill Group: ${group.category}\nTools: ${names}`,
      metadata: {
        url: "/",
        title: group.category,
        heading: "Skills",
        category: "skills",
      },
    });
  }
  const favNames = favoriteStack.items.map((i) => i.name).join(", ");
  chunks.push({
    text: `Favorite Stack: ${favNames}\n${favoriteStack.stack}`,
    metadata: {
      url: "/",
      title: "Favorite Stack",
      heading: "Skills",
      category: "skills",
    },
  });
  return chunks;
}

function getCredentialsChunks() {
  const chunks = [];
  for (const edu of education) {
    chunks.push({
      text: `Education: ${edu.degree} in ${edu.fieldOfStudy} at ${edu.institution} (${edu.startDate}–${edu.endDate}). ${edu.description}\nSkills: ${edu.skills.join(", ")}`,
      metadata: {
        url: "/credentials",
        title: `${edu.degree} — ${edu.institution}`,
        heading: "Education",
        category: "credentials",
      },
    });
  }
  for (const aw of awards) {
    chunks.push({
      text: `Award: ${aw.title} from ${aw.issuer} (${aw.date}). ${aw.description}`,
      metadata: {
        url: "/credentials",
        title: aw.title,
        heading: "Awards",
        category: "credentials",
      },
    });
  }
  for (const cert of certificates) {
    chunks.push({
      text: `Certificate: ${cert.name} by ${cert.issuingOrg} (${cert.issueDate}${cert.expirationDate ? `–${cert.expirationDate}` : ""}). ${cert.skills.join(", ")}`,
      metadata: {
        url: "/credentials",
        title: cert.name,
        heading: "Certificates",
        category: "credentials",
      },
    });
  }
  return chunks;
}

function getProjectsChunks() {
  const chunks = [];
  for (const proj of projects) {
    const tech = proj.tech.join(", ");
    const tags = proj.tags.join(", ");
    chunks.push({
      text: `Project: ${proj.title}\n${proj.description}\nTech: ${tech}\nTags: ${tags}\n${proj.features?.join("\n") || ""}`,
      metadata: {
        url: `/projects/${proj.slug}`,
        title: proj.title,
        heading: "Project",
        category: "project",
      },
    });
  }
  return chunks;
}

function getWritingsChunks() {
  const chunks = [];
  for (const w of writings) {
    chunks.push({
      text: `Article: ${w.title}\n${w.excerpt}\nCategory: ${w.category}\nTags: ${w.tags.join(", ")}`,
      metadata: {
        url: `/writing/${w.slug}`,
        title: w.title,
        heading: "Writing",
        category: "writing",
      },
    });
  }
  return chunks;
}

function getBotKnowledgeChunks() {
  return botKnowledge.map((text, i) => ({
    text,
    metadata: {
      url: "#about",
      title: "Profile Knowledge",
      heading: `Knowledge ${i + 1}`,
      category: "profile",
    },
  }));
}

async function buildVectorStore() {
  const url = process.env.UPSTASH_VECTOR_REST_URL;
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN;
  if (!url || !token) {
    console.error("❌ Missing UPSTASH_VECTOR_REST_URL / UPSTASH_VECTOR_REST_TOKEN");
    process.exit(1);
  }

  const index = new Index({ url, token });

  console.log("🔄 Resetting index...");
  await index.reset();
  console.log("✅ Index reset.");

  const allChunks = [
    ...getFumadocsChunks(),
    ...getExperienceChunks(),
    ...getSkillsChunks(),
    ...getCredentialsChunks(),
    ...getProjectsChunks(),
    ...getWritingsChunks(),
    ...getBotKnowledgeChunks(),
  ];

  console.log(`Indexing ${allChunks.length} chunks into Upstash Vector (model-based index)...`);

  const BATCH = 100;
  for (let i = 0; i < allChunks.length; i += BATCH) {
    const batch = allChunks.slice(i, i + BATCH);
    const records = batch.map((chunk, idx) => ({
      id: `${chunk.metadata.category}:${slugify(chunk.metadata.title)}:${slugify(chunk.metadata.heading)}:${i + idx}`,
      data: chunk.text,
      metadata: {
        ...chunk.metadata,
        text: chunk.text,
      },
    }));
    await index.upsert(records);
    console.log(`[${Math.min(i + BATCH, allChunks.length)}/${allChunks.length}] batch upserted`);
  }

  console.log("✅ All chunks indexed.");
}

buildVectorStore().catch(console.error);