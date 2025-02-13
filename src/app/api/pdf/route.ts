/**
 * API Route to generate the PDFs
 *
 * Available by making a POST request to /api/pdf. The body needs to consist of
 *  - resume_data: Stringified version of a configured resume (see /lib/resume
 *  for the schema
 */

import { NextRequest, NextResponse } from 'next/server'
import type Resume from '@/lib/resume'
import Templates from '@/lib/templates'

/**
 * Converts a NodeJS readable stream to a Buffer to be returned to the user
 */
async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((res, rej) => {
        const chunks: Buffer[] = []
        stream.on('data', (chunk) => chunks.push(chunk))
        stream.on('end', () => res(Buffer.concat(chunks)))
        stream.on('error', rej)
    })
}

export async function POST(req: NextRequest) {
    // Get resume data from the query string
    const body = await req.formData()
    const resumeAsStr = body.get('resume_data') as string

    if (!resumeAsStr) {
        return NextResponse.json(
            { message: 'No resume data provided' },
            { status: 400 }
        )
    }

    // Parse the resume JSON string into a Resume object
    const resume = JSON.parse(resumeAsStr) as Resume

    // Generate the PDF from the DefaultTemplate
    try {
        // TODO: implement template system to allow for different resume templates
        const template = Templates.DEFAULT

        // generate the resume and convert it to a buffer
        const generatedResumeStream = await template(resume)
        const generatedResume = await streamToBuffer(generatedResumeStream)

        // generate the response
        const resp = new NextResponse(generatedResume)
        resp.headers.set('content-type', 'application/pdf')
        resp.headers.set('content-disposition', 'inline; filename="resume.pdf"')
        return resp
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: 'Failed to generate PDF', error: error },
            { status: 500 }
        )
    }
}
