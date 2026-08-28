import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Explicit Upstash Redis client instantiation
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Anonymous limit (IP-based)
const anonymousRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
  prefix: "ratelimit:guest",
});

/**
 * Checks quotas for both guest IPs and authenticated users.
 * @param {Object} params
 * @param {string} params.ip - Client IP address
 * @param {string} [params.userId] - Optional authenticated user ID
 * @returns {Promise<{ allowed: boolean, remaining: number, isCredit: boolean }>}
 */
export async function checkQuota({ ip, userId }) {
  // Near-future Credit logic hook
  if (userId) {
    const userCreditsKey = `credits:${userId}`;
    const credits = await redis.get(userCreditsKey);

    // Default starting credits if not set
    const currentCredits = credits !== null ? Number(credits) : 20;

    if (currentCredits <= 0) {
      return { allowed: false, remaining: 0, isCredit: true };
    }

    return { allowed: true, remaining: currentCredits, isCredit: true };
  }

  // Fallback to IP sliding-window rate limit for guests
  const identifier = ip || "127.0.0.1";
  const result = await anonymousRateLimit.limit(identifier);

  return {
    allowed: result.success,
    remaining: result.remaining,
    reset: result.reset,
    isCredit: false,
  };
}

/**
 * Deducts 1 daily credit from an authenticated user.
 * Call this ONLY after a successful LLM stream response starts.
 * @param {string} userId
 */
export async function deductUserCredit(userId) {
  if (!userId) return;
  const userCreditsKey = `credits:${userId}`;
  await redis.decr(userCreditsKey);
}
