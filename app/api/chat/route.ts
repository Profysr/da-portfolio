import { streamText, toTextStream, createTextStreamResponse } from "ai";
import { google } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { Index } from "@upstash/vector";

export const maxDuration = 30;

function getIndex() {
  return new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL!,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
  });
}

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

function getSystemPrompt(context: string) {
  return `You are Bilal's portfolio assistant. Answer questions concisely using ONLY the provided context.
Cite sources inline using [Source: Title > Heading] format.

Context:
${context}`;
}

// function buildSourcesHeader(matches: Array<{ metadata?: Record<string, unknown>; data?: string }>) {
//   const sources = matches
//     ?.map((m) => ({
//       title: m.metadata?.title,
//       heading: m.metadata?.heading,
//       url: m.metadata?.url,
//       category: m.metadata?.category,
//     }))
//     .slice(0, 3) || [];
//   return JSON.stringify(sources);
// }

async function tryModelStream(model: any, messages: any[], context: string) {
  const result = streamText({
    model,
    system: getSystemPrompt(context),
    messages,
    temperature: 0.7,
  });
  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}

export async function POST(req: Request) {
  try {
    // 1- Extracting the message
    const { messages } = (await req.json()) as { messages: any[] };
    if (!messages?.length) {
      return new Response("No messages", { status: 400 });
    }

    // 2- Ask the upstash for the top 3 match indexes
    const userQuery = messages[messages.length - 1].content;

    const matches = await getIndex().query({
      data: userQuery,
      topK: 3,
      includeMetadata: true,
      includeData: true,
    });

    // 3- Parsing the context and adding up recent 6 messages with the built context for better results
    const context =
      matches
        ?.map(
          (m) =>
            `[Source: ${m.metadata?.title} > ${m.metadata?.heading}]:\n${m.data || m.metadata?.text}`,
        )
        .join("\n\n---\n\n") || "No specific vector context found.";

    const recentMessages = messages.slice(-6);

    // 4- Send a Post Req to Groq Model
    try {
      const response = await tryModelStream(
        groq("openai/gpt-oss-120b"),
        recentMessages,
        context,
      );
      // response.headers.set("X-Sources", buildSourcesHeader(matches));
      return response;
    } catch (groqErr: unknown) {
      console.warn(
        "Groq failed, falling back to Google:",
        (groqErr as Error).message,
      );
    }
    
    // 5- Using Gemini as a Fallback Model
    try {
      const response = await tryModelStream(
        google("gemini-2.5-flash"),
        recentMessages,
        context,
      );
      // response.headers.set("X-Sources", buildSourcesHeader(matches));
      return response;
    } catch (googleErr: unknown) {
      console.error("Google failed:", (googleErr as Error).message);
    }

    return new Response("FALLBACK", {
      status: 503,
      // headers: { "X-Sources": "[]" },
    });
  } catch (err: unknown) {
    console.error("Chat route error:", (err as Error).message);
    return new Response("Internal error", { status: 500 });
  }
}