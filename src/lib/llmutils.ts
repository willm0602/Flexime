import type Resume from "./resume";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [],
  responseMimeType: "application/json",
};

async function askGemini(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const candidates = result.response.candidates;
  return candidates || [];
}

export async function parseResumeFromText(
  text: string,
) {
  const prompt = `
Given the following text extracted from a resume file, return a JSON object formatted following
the JSON Resume schema.

REQUIREMENTS
============
- Skills should not be grouped up
- The response should just be JSON, no markdown

RESUME TEXT
============
${text}
`;

  const candidates = await askGemini(prompt);

  if (candidates.length > 0) {
    const parts = candidates[0].content.parts;
    const resumeText = parts.map((part) => part.text || "").join("");
    
    // Clean response (Gemini sometimes adds markdown backticks)
    const cleanText = resumeText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      return JSON.parse(cleanText) as Resume;
    } catch (error) {
      throw new Error("Invalid JSON response from Gemini");
    }
  }
  throw new Error("No candidates received from Gemini");
}
