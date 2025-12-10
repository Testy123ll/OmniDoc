import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface AIResponse {
  text(): string;
}

const callGemini = async (systemPrompt: string, userMessage: string): Promise<string> => {
  if (!GEMINI_API_KEY) {
    // Fallback: return mock response if no API key
    console.warn("GEMINI_API_KEY not set, using mock responses");
    return `[Mock Response] ${userMessage.substring(0, 100)}...`;
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${systemPrompt}\n\n${userMessage}`,
            },
          ],
        },
      ],
    });

    const response = await result.response;
    return response.text() || "No response received";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("AI service temporarily unavailable");
  }
};

export class AIService {
  static async write(prompt: string, type: string): Promise<string> {
    try {
      const systemPrompt = `You are a professional writing assistant. Generate creative and engaging ${type} content.`;
      return await callGemini(systemPrompt, prompt);
    } catch (error) {
      throw new Error("AI writing failed");
    }
  }

  static async edit(
    text: string,
    editType: string,
    tone?: string
  ): Promise<string> {
    try {
      const systemPrompt = `You are a professional editor. ${editType} the following text with a ${tone || "professional"} tone. Only provide the edited text without explanations.`;
      return await callGemini(systemPrompt, text);
    } catch (error) {
      throw new Error("AI editing failed");
    }
  }

  static async summarize(text: string): Promise<string> {
    try {
      if (text.length < 100) return text;
      
      const systemPrompt = "You are a professional summarizer. Provide a concise summary of the key points in 2-3 sentences.";
      return await callGemini(systemPrompt, text);
    } catch (error) {
      throw new Error("Summarization failed");
    }
  }

  static async translate(text: string, targetLanguage: string): Promise<string> {
    try {
      const systemPrompt = `You are a professional translator. Translate the following text to ${targetLanguage}. Only provide the translated text without explanations.`;
      return await callGemini(systemPrompt, text);
    } catch (error) {
      throw new Error("Translation failed");
    }
  }

  static async analyze(text: string): Promise<string> {
    try {
      const systemPrompt = "You are an expert analyst. Analyze the provided text and provide insights on key themes, sentiment, structure, and overall quality.";
      return await callGemini(systemPrompt, text);
    } catch (error) {
      throw new Error("Analysis failed");
    }
  }
}

