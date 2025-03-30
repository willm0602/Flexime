import RateLimitMiddleware from '@/middleware/rateLimit';

export async function POST(req, resp) {
	RateLimitMiddleware(request, res);
}