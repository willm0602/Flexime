import { tailorResumeToJobDescription } from '@/lib/llmutils';
import rateLimitTest from '@/middleware/rateLimit';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const rateLimitFine = await rateLimitTest(
		req,
		'ai-tailor-resume-2',
		1,
		5
	);

	if(!rateLimitFine)
		return NextResponse.json(
			{ message: 'Rate limit exceeded' },
			{ status: 429 }
		);

	const body = await req.json();
	const {resume, jobDescription} = body;

	const tailoredResume = await tailorResumeToJobDescription(resume, jobDescription);
	if(!tailoredResume)
		return NextResponse.json(
			{ message: 'Failed to tailor resume' },
			{ status: 500 }
		);

	return NextResponse.json(
		tailoredResume,
		{ status: 200 }
	);
}