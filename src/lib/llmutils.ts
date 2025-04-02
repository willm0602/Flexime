import type Resume from "./resume";

import {
    GoogleGenerativeAI,
} from '@google/generative-ai';


const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: [
    ],
    responseMimeType: "application/json",
};

async function askGemini(prompt: string) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
    });

    const result = await chatSession.sendMessage(prompt);
    const candidates = result.response.candidates;
    return candidates || [];
}

export async function tailorResumeToJobDescription(
    resume: Resume,
    jobDescription: string,
) {
    const prompt = `Modify the following resume to better align with the provided job description.

    Resume: ${JSON.stringify(resume)}
    Job Description: ${jobDescription}

    Instructions:
    - For each existing field that has an "isOn" property:
        - Set "isOn" to true if it directly helps, adds transferable value, or could be relevant in a broader context.
        - Set "isOn" to false only if the field is clearly irrelevant or provides no potential value.
    - When in doubt, **favor keeping fields on** rather than turning them off.
    - Do NOT add, create, rename, or invent new fields—only modify the "isOn" status of existing fields.
    - Do NOT alter the schema, structure, or content of the resume—only modify the "isOn" field.
    - Do not remove any children, even if they are unused.

    Requirements:
    - Return the resume in strict JSON format, matching the original schema exactly.
    - Do not include new line characters or format it with markdown.
    - Ensure the resume maintains enough content to form a complete, one-page resume.
    - Prioritize keeping valuable skills, certifications, and experiences to ensure a strong and well-rounded resume.`;

    const candidates = await askGemini(prompt);
    
    if (candidates.length > 0) {
        const parts = candidates[0].content.parts;
        const resumeText = parts.map((part) => part.text || '').join('');

        try {
            return JSON.parse(resumeText);
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            throw new Error('Invalid JSON response from Gemini');
        }
    }

    throw new Error('No candidates received from Gemini');
}