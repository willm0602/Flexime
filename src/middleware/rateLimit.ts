import type { NextRequest } from 'next/server';
import cache, { canConnectToCache } from '@/lib/cache';
import getIP from './getIP';

export default async function rateLimitTest(
    req: NextRequest,
    key: string,
    numOfOccurances: number,
    time = 3600,
): Promise<boolean> {
    if (!canConnectToCache) return true;

    const ip = getIP(req);
    if (!ip) return true;

    const redisKey = `${key}:${ip}`;
    const occurancesUnparsed = (await cache.get(redisKey)) || '0';
    const occurances = Number.parseInt(occurancesUnparsed) + 1;
    const hasViolation = occurances > numOfOccurances;

    await cache.set(redisKey, occurances, 'EX', time);
    if (hasViolation) return false;

    return true;
}
