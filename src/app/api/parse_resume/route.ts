/**
 * API route to parse a
 */

import { NextResponse } from 'next/server';
import readPDF from 'pdf-parse/lib/pdf-parse';
import { parseResumeFromText } from '@/lib/llmutils';
import mammoth from 'mammoth';

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
    const text = res.text || '';
    return text;
};

const parseDocx: ResumeParser = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const text = await mammoth.extractRawText({ buffer });
    return text.value;
};

export const maxDuration = 60;

export async function POST(request: Request) {
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
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            parseDocx,
    };

    const parser = parsers[mimeType];
    if (!parser) {
        return NextResponse.json(
            { msg: 'Unsupported file type' },
            { status: 400 },
        );
    }
    const resumeText = await parser(file);
    const parsedResume = await parseResumeFromText(resumeText);
    try {
        return NextResponse.json({ resume: parsedResume }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ msg: e }, { status: 500 });
    }
}
