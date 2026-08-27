import { streamText, toTextStream, createTextStreamResponse } from "ai";
import { google } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { Index } from "@upstash/vector";
import { validateChatRequest, checkAllRateLimits, sanitizeInput } from "@/lib/validation";

export const runtime = "nodejs";
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

function getClientIdentifier(req: Request): string {
  // Try to get IP from headers (Vercel/Cloudflare)
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0]?.trim() || realIp || "unknown";
  return ip;
}

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
    // 0. Rate limiting by IP
    const clientIp = getClientIdentifier(req);
    const rateLimit = checkAllRateLimits(clientIp);
    if (rateLimit.limited) {
      return new Response(
        JSON.stringify({ error: rateLimit.reason }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(rateLimit.retryAfter || 60),
          },
        },
      );
    }

    // 1. Parse and validate request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate request structure
    const validation = validateChatRequest(body);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: validation.errors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { messages } = validation.data!;
    
    // 1. Extract and sanitize the user query
    const userQuery = sanitizeInput(messages[messages.length - 1].content);

    // 2. Query Upstash Vector for top 3 matches
    const matches = await getIndex().query({
      data: userQuery,
      topK: 3,
      includeMetadata: true,
      includeData: true,
    });

    // 3. Build context with retrieved chunks
    const context =
      matches
        ?.map(
          (m) =>
            `[Source: ${m.metadata?.title} > ${m.metadata?.heading}]:\n${m.data || m.metadata?.text}`
        )
        .join("\n\n---\n\n") || "No specific vector context found.";

    // 4. Build conversation context (last 6 messages)
    const recentMessages = messages.slice(-6);

    // 5. Try Groq (primary model)
    try {
      const response = await tryModelStream(
        groq("openai/gpt-oss-120b"),
        recentMessages,
        context,
      );
      return response;
    } catch (groqErr: unknown) {
      console.warn(
        "Groq failed, falling back to Google:",
        (groqErr as Error).message,
      );
    }

    // 6. Fallback to Google
    try {
      const response = await tryModelStream(
        google("gemini-2.5-flash"),
        recentMessages,
        context,
      );
      return response;
    } catch (googleErr: unknown) {
      console.error("Google failed:", (googleErr as Error).message);
    }

    // 7. Final fallback
    return new Response("FALLBACK", {
      status: 503,
    });
  } catch (err: unknown) {
    console.error("Chat route error:", (err as Error).message);
    
    // Don't leak internal errors to client
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}