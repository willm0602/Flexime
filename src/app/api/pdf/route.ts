import { NextRequest, NextResponse } from "next/server";
import type Resume from "@/lib/resume";
import Templates from "@/lib/templates";

export async function POST(req: NextRequest) {
  // Get resume data from the query string
  const body = await req.formData();
  const resumeAsStr = body.get('resume_data') || '';

  if (!resumeAsStr) {
    return NextResponse.json({ message: "No resume data provided" }, { status: 400 });
  }

  // Parse the resume JSON string into a Resume object
  const resume = JSON.parse(resumeAsStr) as Resume;

  // Generate the PDF from the DefaultTemplate
  try {
    const template = Templates.DEFAULT;
    const generatedResume = await template(resume);
    const resp = new NextResponse(generatedResume);
    resp.headers.set(
      'content-type', 'application/pdf',
    );
    return resp;
  } catch (error) {

    console.error(error);
    return NextResponse.json({ message: "Failed to generate PDF", error: error }, { status: 500 });
  }
}
