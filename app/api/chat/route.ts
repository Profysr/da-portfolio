import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { getEmbedding } from "@/lib/embeddings";
import { Index } from "@upstash/vector";

export const runtime = "nodejs";
export const maxDuration = 30;

function getIndex() {
  return new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL!,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
  });
}

export async function POST(req: Request) {
  const { messages } = await req.json();
  const userQuery = messages[messages.length - 1].content;

  // 1. Embed user query via Gemini
  const queryVector = await getEmbedding(userQuery);

  // 2. Search Upstash Vector via SDK
  const matches = await getIndex().query({
    vector: queryVector,
    topK: 3,
    includeMetadata: true,
  });

  const context =
    matches
      ?.map(
        (m) =>
          `[Source: ${m.metadata?.title} > ${m.metadata?.heading}]:\n${m.metadata?.text}`
      )
      .join("\n\n---\n\n") || "";

  // 3. Stream with Gemini 1.5 Flash using official Vercel AI SDK
  const resultStream = streamText({
    model: google("gemini-1.5-flash"),
    system: "You are Bilal's portfolio assistant. Answer questions concisely using ONLY the provided context.",
    prompt: `Context:\n${context}\n\nUser Question: ${userQuery}`,
  });

  return resultStream.toTextStreamResponse();
}