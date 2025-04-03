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
    - For each field with an "isOn" property, set "isOn" to true if it is directly relevant to the job or adds transferable value; otherwise, set it to false.
    - Do NOT remove any fields or objects from the resume. If a field is not relevant, set "isOn" to false instead of removing it.
    - Do NOT add, rename, or change fields—only modify the "isOn" status.
    - Do NOT alter the schema, structure, or content of the resume—just adjust the "isOn" fields.
    - **The resume MUST include 25-30 bullet points** in total. Each work/project highlight counts as one bullet, and source code/project links each count as one bullet.
    - **Prioritize relevant jobs over projects**: Ensure that jobs are included first, and only include projects if there is room after including all relevant jobs.
    - **Include sufficient highlights for jobs**: For each included job, ensure that at least 5 highlights are turned on. If a job has fewer than 5 highlights, turn on additional relevant highlights until it has at least 5.
    - **Exclude projects with only source code or project links**: Only include projects if they have at least 2 meaningful highlights (excluding source code or project links).
    - **Maximize relevant content**: For jobs, prioritize turning on highlights that demonstrate impact, achievements, or transferable skills. For projects, prioritize highlights that showcase technical skills or outcomes.
    - **For the title and summary**: Include ONLY ONE of these elements at most, and only if it's highly relevant to the job. If neither is especially relevant, set both "isOn" to false.
    - **Reorder the highlights** section to prioritize the most relevant and impactful points based on the job description.
    - **Exclude any jobs** that have **fewer than 4 highlights** turned on (excluding source code/project links). If a job has fewer than 4 relevant highlights, set its "isOn" to false but do not remove it.
    - **IMPORTANT**: If the total bullet count is less than 25, turn on additional relevant highlights from work experiences and projects until you reach at least 25 bullet points.
    - Ensure the resume focuses primarily on experiences and skills most relevant to the job while still providing adequate context.
    - Return the resume in strict JSON format, matching the original schema exactly, with no added line breaks or markdown.`;

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