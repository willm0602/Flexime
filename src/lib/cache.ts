// interface to Redis Cache

import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || '');

export default redis;

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

export async function canConnectToCache(): Promise<boolean> {
    console.log('Attempting to connect to cache');
    try {
        await redis.ping();
        return true;
    } catch (error) {
        console.error('Redis connection error:', error);
        return false;
    }
}
