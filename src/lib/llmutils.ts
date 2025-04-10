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
    const prompt = `Modify the following resume to better align with the provided job description.

Resume: ${JSON.stringify(resume)}
Job Description: ${jobDescription}

Instructions:
- For each field with an "isOn" property, set "isOn" to true if it is directly relevant to the job or adds transferable value; otherwise, set it to false.
- You MAY modify the "title" if it helps better match the job description. If the title is not relevant, set "isOn" to false.
- You MAY include either the "summary" or the "title", but NOT both—whichever is more relevant.
- Do NOT remove any fields or objects from the resume. If a field is not relevant, set "isOn" to false instead of removing it.
- Do NOT rename or restructure fields—only modify "isOn" and optionally the "title" text.
- The resume MUST include **between 25 and 30 bullet points total** with "isOn" set to true. Count each of the following as one bullet:
  - Job or project highlights (i.e., resume bullets)
  - Links (such as source code or project URLs)
- If the total number of bullets with "isOn: true" is less than 25, turn on additional relevant highlights from jobs and projects until the total is between 25–30.
- Prioritize **jobs over projects** when selecting highlights.
- For each included job, at least **5 highlights** must have "isOn: true".
- Projects must have at least **2 meaningful highlights** (excluding links) to be included.
- Jobs with fewer than 4 meaningful highlights should have "isOn" set to false.
- If a parent object contains children with "isOn: true", then the parent itself MUST also have "isOn: true".
- Reorder highlights to prioritize the most relevant and impactful points based on the job description.
- Maximize inclusion of relevant, impactful, and transferable experience.
- Return the resume in **strict JSON format**, exactly matching the original schema, with no line breaks or markdown formatting.`;

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
