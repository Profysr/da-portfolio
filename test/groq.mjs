import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

// Ensure process.env.GROQ_API_KEY is set in your environment
async function testGroq() {
  try {
    const { text } = await generateText({
      model: groq("openai/gpt-oss-120b"),
      prompt: 'Ping! Reply with "Pong".',
    });
    console.log("✅ Groq API is working. Response:", text);
  } catch (error) {
    console.error("❌ Groq API Error:", error.message);
  }
}

testGroq();
