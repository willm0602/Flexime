import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from 'node:process';

export default async function parseResumeFromText(text: string) {
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-lite'
    });

    const prompt = `
You are a resume parser.

Convert the following unstructured resume text into a valid JSON object that conforms exactly to the JSON Resume schema: https://jsonresume.org/schema/.

Strict constraints:
- Output ONLY raw JSON. Do NOT use markdown syntax (no \`\`\`json).
- Do NOT include any explanation or surrounding text.
- The "skills" field must be a flat array (e.g., [{ "name": "JavaScript" }, { "name": "React" }])
- Only include sections actually found in the resume text.

Resume Text:
"""
${text}
"""
Output:
`
    const res = await model.generateContent(prompt);
    const resume = res.response.text();
    return resume;
}