import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_API_GEMINI as string
);

async function run(prompt: string): Promise<{ result: string | null }> {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log(text);
    return { result: text };
  } catch (error) {
    console.error("Error:", error);
    return { result: null };
  }
}

export default run

// Example usage:
