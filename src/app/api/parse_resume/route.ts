import Resume from "@/lib/jsonResume";
import { NextResponse } from "next/server";
import fs from 'node:fs';
import readPDF from 'pdf-parse/lib/pdf-parse'
import parseResumeFromText from "./askGemini";
import json5 from "json5";

type ResumeParser = (file: File) => Promise<string>;

export const config = {
    api: {
      bodyParser: false,
    },
  };
  

const parsePDF: ResumeParser = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const res = await readPDF(buffer);
    const text = (res.text || '') ;
    return text;
}

export async function POST(request: Request){
    const body = await request.formData();
    const file = body.get('resume') as File;
    const mimeType = file.type;

    const parsers: Record<string, ResumeParser> = {
        'application/json': async (file) => {
            const contents = await file.text();
            return JSON.parse(contents);
        },
        'text/plain': async (file) => {
            const contents = await file.text();
            return JSON.parse(contents);
        },
        'application/pdf': parsePDF,
    };

    const parser = parsers[mimeType];
    if(!parser){
        return NextResponse.json({msg: 'Unsupported file type'}, {'status': 400});
    }
    const resumeText = await parser(file);
    const parsedResume = await parseResumeFromText(resumeText);
    try{
        const resume = json5.parse(parsedResume);
        return NextResponse.json({resume}, {'status': 200});
    } catch (e) {
        return NextResponse.json({msg: e}, {status: 500})
    }

}