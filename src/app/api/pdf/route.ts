/**
 * API route to generate PDF from JSON Resume schema
 */

import { type NextRequest, NextResponse } from 'next/server';
import type Resume from '@/lib/jsonResume';
import Templates from '@/lib/templates';

/**
 * converts a NodeJS stream to a Buffer
 */
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((res, rej) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => res(Buffer.concat(chunks)));
        stream.on('error', rej);
    });
}

/**
 * API route to generate resumes as PDF from JSON data
 *
 * req body:
 *  resume_data: string
 *      the stringified version of the JSON Resume
 *  download: 'true' | undefined
 *      whether or not the resume should be downloaded when returned
 *  templateName: string (of Templates names)
 *      name of template to use to generate resume
 *
 */
export async function POST(req: NextRequest) {
    const body = await req.formData();

    const resumeAsStr = body.get('resume_data') as string;
    const shouldDownload = body.get('download') === 'true';
    type TemplateOption = keyof typeof Templates;
    const templateName = (body.get('template') || 'DEFAULT') as TemplateOption;

    if (!resumeAsStr) {
        return NextResponse.json(
            { message: 'No resume data provided' },
            { status: 400 },
        );
    }

    try {
        const resume = JSON.parse(resumeAsStr) as Resume;
        const template = Templates[templateName];
        const generatedResumeStream = await template(resume);
        const generatedResume = await streamToBuffer(generatedResumeStream);

        const blob = new Blob([new Uint8Array(generatedResume)], {
            type: 'application/pdf',
        });
        const contentDispositon = shouldDownload ? 'attachment' : 'inline';

        const resp = new NextResponse(blob, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `${contentDispositon}; filename="file resume.pdf"`,
            },
        });

        return resp;
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Failed to generate PDF', error: error },
            { status: 500 },
        );
    }
}
