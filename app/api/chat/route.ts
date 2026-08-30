import { generateText, ModelMessage } from "ai";
import { groq } from "@ai-sdk/groq";
import { Index } from "@upstash/vector";
import {
  validateAndCleanRequest,
  wrapPromptBoundary,
  type ChatMessage,
} from "@/validator/chat-guard";

// Allow up to 30 seconds for the full (non-streamed) generation to finish.
export const maxDuration = 30;

const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,
});

type RetrievedSource = {
  title: string;
  heading: string;
  content: string;
};

function getSystemPrompt(contextText: string) {
  return `You are Bilal's professional portfolio AI assistant. 
Your primary goal is to provide highly readable, engaging, and accurate answers based entirely on the provided context.

CRITICAL INSTRUCTIONS:
1. FORMAT IN MARKDOWN: You MUST format your response using clean, standard Markdown. Use headings (###), bullet points (-), bold text (**text**), and double newline linebreaks.
2. GROUNDING: Answer ONLY using the information provided inside the <context> tags below. If the answer cannot be found, politely state that you don't have that specific information. Do not invent details.

<context>
${contextText}
</context>`;
}

function formatContextForPrompt(sources: RetrievedSource[]) {
  if (sources.length === 0) {
    return "No specific vector context found.";
  }

  return sources
    .map(
      (s, i) => `<document index="${i + 1}">
  <source>${s.title} > ${s.heading}</source>
  <content>${s.content}</content>
</document>`,
    )
    .join("\n\n");
}

async function retrieveSources(query: string): Promise<RetrievedSource[]> {
  if (!query.trim()) {
    return [];
  }

  const matches = await index.query({
    data: query,
    topK: 3,
    includeMetadata: true,
    includeData: true,
  });

  if (!matches) {
    return [];
  }

  return matches.map((match) => ({
    title: (match.metadata?.title as string) ?? "Unknown Title",
    heading: (match.metadata?.heading as string) ?? "General",
    content: (match.data as string) ?? (match.metadata?.text as string) ?? "",
  }));
}

export async function POST(req: Request) {
  try {
    const rawBody: unknown = await req.json();

    const validation = validateAndCleanRequest(rawBody);
    if (!validation.isValid) {
      return Response.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 },
      );
    }

    const messages = validation.data.messages;
    const lastUserIndex = messages.map((m) => m.role).lastIndexOf("user");
    const lastUserMessage = messages[lastUserIndex];

    const sources = await retrieveSources(lastUserMessage.content);
    const contextText = formatContextForPrompt(sources);

    // Guard only the latest user turn against prompt injection; prior
    // history is passed through as-is for conversational context.
    const guardedMessages: ChatMessage[] = messages.map((msg, i) =>
      i === lastUserIndex
        ? { ...msg, content: wrapPromptBoundary(msg.content) }
        : msg,
    );

    // Plain { role, content: string } messages are already valid
    const { text } = await generateText({
      model: groq("openai/gpt-oss-120b"),
      messages: guardedMessages as ModelMessage[],
      system: getSystemPrompt(contextText),
      temperature: 0.4,
    });

    return Response.json({ text, sources });
  } catch (err) {
    console.error("Chat route unhandled execution error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
