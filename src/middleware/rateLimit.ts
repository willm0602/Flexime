import type Middleware from "./handler";

const RateLimitHandler: Middleware = (handler) => {
    return (target: unknown)=> {
        return async (...args: Parameters<typeof handler>) => {
            // Implement rate limiting logic here
            const isRateLimited = false; // Replace with actual rate-limiting logic

            if (isRateLimited) {
            throw new Error("Too many requests, please try again later.");
            }

            return handler(...args);
        };
    }
}