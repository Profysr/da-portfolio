import { streamText, createTextStreamResponse, toTextStream } from "ai";
import { google } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { Index } from "@upstash/vector";
import { validateAndCleanRequest, wrapPromptBoundary } from "@/lib/chat-guard";
import { checkQuota, deductUserCredit } from "@/lib/rate-limit";

export const maxDuration = 30;
// ============================================================================
// 1. CLIENT INITIALIZATION & CONFIGURATION
// ============================================================================

function getIndex() {
  return new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });
}

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

// ============================================================================
// 2. HELPER UTILITIES & PROMPT FORMATTERS
// ============================================================================

/**
 * Builds system prompt with isolated vector retrieval context.
 * @param {string} context
 * @returns {string}
 */
function getSystemPrompt(context) {
  return `You are Bilal's portfolio assistant. Answer questions concisely using ONLY the provided context.
Cite sources inline using [Source: Title > Heading] format.

Context:
${context}`;
}

/**
 * Serializes vector retrieval metadata into JSON format for UI source chips.
 * @param {Array} matches
 * @returns {string}
 */
function buildSourcesHeader(matches) {
  const sources =
    matches
      ?.map((m) => ({
        title: m.metadata?.title,
        heading: m.metadata?.heading,
        url: m.metadata?.url,
        category: m.metadata?.category,
      }))
      .slice(0, 3) || [];
  return JSON.stringify(sources);
}

/**
 * Extracts client IP across Vercel, Cloudflare, or reverse proxies.
 */
function getClientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp || "127.0.0.1";
}

/**
 * Executes model streaming and attaches X-Sources response headers.
 * @param {any} model
 * @param {Array} messages
 * @param {string} context
 * @param {string} sourcesHeader
 * @returns {Promise<Response>}
 */
async function tryModelStream(model, messages, context, sourcesHeader) {
  const result = streamText({
    model,
    system: getSystemPrompt(context),
    messages,
    temperature: 0.7,
  });

  const response = createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });

  response.headers.set("X-Sources", sourcesHeader);
  return response;
}

// ============================================================================
// 3. MAIN ROUTE HANDLER (POST)
// ============================================================================

export async function POST(req) {
  try {
    // ------------------------------------------------------------------------
    // SECTION A: Rate Limiting & Identity Hook (IP Guest / User ID Auth)
    // ------------------------------------------------------------------------
    const clientIp = getClientIp(req);
    const userId = req.headers.get("x-user-id"); // Authenticated session header hook

    const quota = await checkQuota({ ip: clientIp, userId });
    if (!quota.allowed) {
      return new Response(
        JSON.stringify({
          error: quota.isCredit
            ? "Out of daily credits. Please sign in or check back tomorrow."
            : "Rate limit exceeded. Please wait a moment before retrying.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(quota.reset || 60),
          },
        },
      );
    }

    // ------------------------------------------------------------------------
    // SECTION B: Request Body Validation & Input Normalization
    // ------------------------------------------------------------------------
    let rawBody;
    try {
      rawBody = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const validation = validateAndCleanRequest(rawBody);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: validation.errors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { messages } = validation.data;
    const rawUserQuery = messages[messages.length - 1].content;

    // ------------------------------------------------------------------------
    // SECTION C: Vector Knowledge Search (Upstash Vector)
    // ------------------------------------------------------------------------
    const matches = await getIndex().query({
      data: rawUserQuery,
      topK: 3,
      includeMetadata: true,
      includeData: true,
    });

    const sourcesHeader = buildSourcesHeader(matches);
    const context =
      matches
        ?.map(
          (m) =>
            `[Source: ${m.metadata?.title} > ${m.metadata?.heading}]:\n${m.data || m.metadata?.text}`,
        )
        .join("\n\n---\n\n") || "No specific vector context found.";

    // ------------------------------------------------------------------------
    // SECTION D: Context Window Selection & Prompt Injection Guarding
    // ------------------------------------------------------------------------
    const recentMessages = messages.slice(-6);
    const lastIndex = recentMessages.length - 1;

    // Wrap final user query in structural XML boundary tags to prevent jailbreaks
    recentMessages[lastIndex].content = wrapPromptBoundary(
      recentMessages[lastIndex].content,
    );

    // Deduct authenticated daily credit post-validation
    if (userId) {
      await deductUserCredit(userId);
    }

    // ------------------------------------------------------------------------
    // SECTION E: Primary Provider Execution (Groq: openai/gpt-oss-120b)
    // ------------------------------------------------------------------------
    try {
      return await tryModelStream(
        groq("openai/gpt-oss-120b"),
        recentMessages,
        context,
        sourcesHeader,
      );
    } catch (groqErr) {
      console.warn(
        "Groq provider failed, switching to Google fallback:",
        groqErr.message,
      );
    }

    // ------------------------------------------------------------------------
    // SECTION F: Fallback Provider Execution (Google: gemini-2.0-flash)
    // ------------------------------------------------------------------------
    try {
      return await tryModelStream(
        google("gemini-2.0-flash"),
        recentMessages,
        context,
        sourcesHeader,
      );
    } catch (googleErr) {
      console.error("Google provider failed:", googleErr.message);
    }

    // ------------------------------------------------------------------------
    // SECTION G: Graceful Fallback Response
    // ------------------------------------------------------------------------
    return new Response("FALLBACK", {
      status: 503,
      headers: { "X-Sources": "[]" },
    });
  } catch (err) {
    console.error("Chat route unhandled execution error:", err.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
