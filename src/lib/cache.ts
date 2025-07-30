// interface to Redis Cache

import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '', {
    retryStrategy(times) {
        if (times > 5) {
            console.error('[REDIS] Unable to connect to cache');
            return null;
        }
        return Math.min(times * 100, 5000);
    },
});

export default redis;

redis.on('error', (err) => {
    console.error(`[REDIS ERROR] ${err}`);
});

export async function get(key: string): Promise<string | null> {
    const value = await redis.get(key);
    return value;
}

export async function set(
    key: string,
    value: string,
    timeout = 3600,
): Promise<'OK' | null> {
    const result = await redis.set(key, value);
    await redis.expire(key, timeout);
    return result;
}
