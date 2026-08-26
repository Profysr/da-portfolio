import path from "path";
import { LocalIndex } from "vectra";
import { getEmbedding } from "@/lib/embeddings";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const userQuery = messages[messages.length - 1].content;

  // 1. Vectorize query & retrieve top matches
  const queryVector = await getEmbedding(userQuery);
  const indexPath = path.join(process.cwd(), "vector-store");
  const index = new LocalIndex(indexPath);

  // queryItems(vector, textQuery, topK)
  const matches = await index.queryItems(queryVector, "", 3);
  const context = matches
    .map(
      (m) =>
        `[Source: ${m.item.metadata.title} > ${m.item.metadata.heading}]:\n${m.item.metadata.text}`,
    )
    .join("\n\n---\n\n");

  // 2. Stream generation via Gemini REST API
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?alt=sse&key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Context Information:\n${context}\n\nUser Question: ${userQuery}\n\nAnswer accurately using only the context provided above.`,
              },
            ],
          },
        ],
      }),
    },
  );

  return new Response(geminiRes.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}
