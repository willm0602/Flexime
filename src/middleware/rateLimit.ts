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
    if (!ip) return false;

    const redisKey = `${key}:${ip}`;
    const occurancesUnparsed = (await cache.get(redisKey)) || '0';
    const occurances = Number.parseInt(occurancesUnparsed) + 1;
    const hasViolation = occurances > numOfOccurances;
    if (hasViolation) return false;

    await cache.set(redisKey, occurances);
    if (occurances === 1) await cache.expire(redisKey, time);

    return true;
}
