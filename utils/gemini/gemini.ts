import { GenerateContentStreamResult, GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_API_GEMINI as string
);

interface Message {
  role: string;
  parts: { text: string }[];
}

async function run(
  prompt: string,
  history: Message[]
): Promise<{ result: GenerateContentStreamResult | null}> {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: history,

    })


    const result =await chat.sendMessageStream(prompt);
    // console.log(text);
    return { result: result };
  } catch (error) {
    console.error("Error:", error);
    return { result: null };
  }
}

export default run;

// Example usage:
