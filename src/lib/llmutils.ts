import type Resume from './resume';

import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-lite',
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [],
    responseMimeType: 'application/json',
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

export async function tailorResumeToJobDescription(
    resume: Resume,
    jobDescription: string,
) {
    const prompt = `You are given a JSON resume and a job description. Update the resume to match the job description more closely.

Resume: ${JSON.stringify(resume)}
Job Description: ${jobDescription}

Rules:
- Only modify the "isOn" fields and the "title" text. Do not change the structure, add or remove fields.
- If a parent contains children with "isOn": true, the parent must also be set to "isOn": true.
- You may modify the "title" to better match the job if it's clearly relevant.
- Use either "title" or "summary", not both. Set the less relevant one to false.
- Do not include jobs with fewer than 4 relevant highlights.
- Each job included must have at least 5 relevant highlights.
- Projects must have at least 2 meaningful highlights (not just links) to be included.
- Prioritize jobs over projects.
- Reorder highlights to show the most relevant first.

Bullet Count Requirements:
- You must return between 25 and 30 total bullet points ("isOn": true).
- Count each of the following as one bullet:
  - Each job/project highlight
  - Each project or source code link
- If fewer than 25 bullets are active, turn on more relevant ones to reach the minimum.

Output must be valid JSON, exactly matching the original structure. No formatting or line breaks.`;

    const candidates = await askGemini(prompt);

    if (candidates.length > 0) {
        const parts = candidates[0].content.parts;
        const resumeText = parts.map((part) => part.text || '').join('');

        try {
            return JSON.parse(resumeText);
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            console.error('Resume received:', resumeText);
            throw new Error('Invalid JSON response from Gemini');
        }
    }

    throw new Error('No candidates received from Gemini');
}
