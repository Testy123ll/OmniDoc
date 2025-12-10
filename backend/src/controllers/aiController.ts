import { Request, Response } from "express";
import { AIService } from "@/services/AIService";
import AIPrompt from "@/models/AIPrompt";

interface AuthRequest extends Request {
  userId?: string;
}

const savePrompt = async (
  userId: string,
  type: "write" | "edit" | "summarize" | "translate" | "analyze",
  input: string,
  output: string,
  options?: { language?: string; tone?: "formal" | "casual" | "academic" | "friendly" }
) => {
  try {
    const prompt = new AIPrompt({
      userId,
      type,
      input,
      output,
      language: options?.language,
      tone: options?.tone,
    });
    await prompt.save();
  } catch (error) {
    console.error("Failed to save AI prompt:", error);
  }
};

export const write = async (req: AuthRequest, res: Response) => {
  try {
    const { prompt, type } = req.body;
    const result = await AIService.write(prompt, type);
    if (req.userId) {
      await savePrompt(req.userId, "write", prompt, result);
    }
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "AI writing failed" });
  }
};

export const edit = async (req: AuthRequest, res: Response) => {
  try {
    const { text, editType, tone } = req.body;
    const result = await AIService.edit(text, editType, tone);
    if (req.userId) {
      await savePrompt(req.userId, "edit", text, result, { tone });
    }
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "AI editing failed" });
  }
};

export const summarize = async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body;
    const result = await AIService.summarize(text);
    if (req.userId) {
      await savePrompt(req.userId, "summarize", text, result);
    }
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Summarization failed" });
  }
};

export const translate = async (req: AuthRequest, res: Response) => {
  try {
    const { text, targetLanguage } = req.body;
    const result = await AIService.translate(text, targetLanguage);
    if (req.userId) {
      await savePrompt(req.userId, "translate", text, result, {
        language: targetLanguage,
      });
    }
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Translation failed" });
  }
};

export const analyze = async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body;
    const result = await AIService.analyze(text);
    await savePrompt(req.userId!, "analyze", text, result);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
};