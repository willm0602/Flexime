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

export async function tailorResumeToJobDescription(
  resume: Resume,
  jobDescription: string,
) {
  const prompt = `
Optimize this resume for both relevance and length by toggling \`isOn\` flags to produce 1-1.5 pages of content. Follow these rules:

1. **Content Range Requirements**:
  - Work Experience:
    - Work should include 1-2 positions with 4+ bullets each
  - Skills:
    - Skills should include 8-12 skills
    - Skills should be relevant to the job description
  - Education:
    - Education should include 1-2 degrees
    - Degrees do not need to be relevant to the job description
  - Projects:
    - Projects should include 1-2 projects
    - Projects should be relevant to the job description
    - Projects should include 3-5 bullets each, keeping in mind that if
        a project has a source code link and a demo link, those will each
        count as an additional bullet

2. **Priority Activation System**:
   [Relevance Tier] -> [Action]
   Tier 1 (Direct JD matches) -> ALWAYS enable
   Tier 2 (Related skills/experience) -> Enable until hitting minimum page length
   Tier 3 (Everything else) -> Only enable if needed to reach minimum content

3. **Structure Preservation**:
   - NEVER delete fields - only modify \`isOn\` values
   - Maintain all nested structures exactly
4. **Job Description**:
${jobDescription}

5. **Output Format**:
\`\`\`json
{
  // Keep ALL original fields - example modifications:
  "skills": {
    "isOn": true,  // Tier 1: 8/12 skills enabled
    "children": [
      {"isOn": true},  // Python (direct match)
      {"isOn": false}  // Photoshop (no match)
    ]
  },
  "workExperience": {
    "isOn": true,
    "children": [
      {
        "isOn": true,
        "children": [
          {"isOn": true},  // Tier 1 bullet
          {"isOn": false} // Tier 3 bullet
        ]
      }
    ]
  }
}
\`\`\`

Resume to optimize:
\`\`\`json
${JSON.stringify(resume, null, 2)}
\`\`\``;

  const candidates = await askGemini(prompt);
  console.log("CANDIDATES ARE", candidates);

  if (candidates.length > 0) {
    const parts = candidates[0].content.parts;
    const resumeText = parts.map((part) => part.text || "").join("");
    
    // Clean response (Gemini sometimes adds markdown backticks)
    const cleanText = resumeText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    console.log("RESP FROM GEMINI IS", cleanText);
    try {
      return JSON.parse(cleanText) as Resume;
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      console.error("Raw response:", cleanText);
      throw new Error("Invalid JSON response from Gemini");
    }
  }

  throw new Error("No candidates received from Gemini");
}
