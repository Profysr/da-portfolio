import { readFileSync, readdirSync } from "fs";
import { join, extname, basename } from "path";
import { Index } from "@upstash/vector";

/* ── Gemini embedding (same model as app/api/chat → same vector space) ── */
async function getEmbedding(text) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not defined.");

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "models/text-embedding-004",
        content: { parts: [{ text }] },
      }),
    }
  );

  if (!res.ok) throw new Error(`Gemini Embedding Error: ${await res.text()}`);

  const data = await res.json();
  return data.embedding.values;
}

/* ── Minimal flat-YAML frontmatter parser: `key: "value"` | `key: ["a","b"]` ── */
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
      const { content } = String(readFileSync(join(dir, f)));
      const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      return {
        slug: basename(f, ".mdx"), // fumadocs derives URL from filename
        meta: fmMatch ? parseFrontmatter(fmMatch[1]) : {},
        body: fmMatch ? fmMatch[2] : content,
      };
    });
}

const slugify = (t) =>
  t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

/* ── Chunking: projects by `##` headings, writings by paragraphs ── */
function getChunks() {
  const chunks = [];

  for (const doc of readMdx(join(process.cwd(), "content/projects"))) {
    const url = `/projects/${doc.slug}`;
    for (const section of doc.body.split(/\n##\s+/)) {
      const heading = section.match(/^([^\n]+)/)?.[1]?.trim() ?? "Overview";
      const text = section.trim();
      if (heading === "Overview" || text.length < 50) continue;
      chunks.push({
        vectorText: `Type: project\nPage: ${doc.meta.title}\nSection: ${heading}\n\n${text}`,
        metadata: { url: `${url}#${slugify(heading)}`, title: doc.meta.title, heading, text, category: "project" },
      });
    }
  }

  for (const doc of readMdx(join(process.cwd(), "content/writings"))) {
    const url = `/writing/${doc.slug}`;
    const paragraphs = doc.body.split(/\n\n+/).filter((p) => p.trim().length >= 50);
    for (const [i, p] of paragraphs.entries()) {
      chunks.push({
        vectorText: `Type: writing\nPage: ${doc.meta.title}\nSection: Part ${i + 1}\n\n${p.trim()}`,
        metadata: { url: `${url}#part-${i + 1}`, title: doc.meta.title, heading: `Part ${i + 1}`, text: p.trim(), category: "writing" },
      });
    }
  }

  return chunks;
}

/* ── Index into Upstash Vector (batched upserts) ── */
async function buildVectorStore() {
  const url = process.env.UPSTASH_VECTOR_REST_URL;
  const token = process.env.UPSTASH_VECTOR_REST_TOKEN;
  if (!url || !token) {
    console.error("❌ Missing UPSTASH_VECTOR_REST_URL / UPSTASH_VECTOR_REST_TOKEN");
    process.exit(1);
  }

  const chunks = getChunks();
  const index = new Index({ url, token });
  console.log(`Indexing ${chunks.length} chunks into Upstash Vector...`);

  const BATCH = 100;
  for (let i = 0; i < chunks.length; i += BATCH) {
    const records = [];
    for (const [idx, chunk] of chunks.slice(i, i + BATCH).entries()) {
      records.push({
        id: `chunk-${i + idx}`,
        vector: await getEmbedding(chunk.vectorText),
        metadata: chunk.metadata,
      });
    }
    await index.upsert(records);
    console.log(`[${Math.min(i + BATCH, chunks.length)}/${chunks.length}] batch upserted`);
  }

  console.log("✅ All chunks indexed.");
}

buildVectorStore().catch(console.error);