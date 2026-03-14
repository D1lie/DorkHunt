interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const WINDOW = 60 * 1000       // 1 minute window
const PER_USER_MAX = 3         // max 3 requests per user per minute
const GLOBAL_MAX = 35          // stop at 35/40 RPM — 5 req buffer before hitting NVIDIA limit

// Global counter shared across all users
let globalCount = 0
let globalResetAt = Date.now() + WINDOW

export interface RateLimitResult {
  allowed: boolean
  remaining: number   // user's remaining requests
  resetAt: number     // when their window resets
  retryAfter?: number // seconds until reset
  globalLimited?: boolean // true when the global cap is hit
}

export function checkRateLimit(identifier: string): RateLimitResult {
  const now = Date.now()

  // Reset global counter if window expired
  if (now > globalResetAt) {
    globalCount = 0
    globalResetAt = now + WINDOW
  }

  // Check global cap first — affects all users equally
  if (globalCount >= GLOBAL_MAX) {
    const retryAfter = Math.ceil((globalResetAt - now) / 1000)
    return {
      allowed: false,
      remaining: 0,
      resetAt: globalResetAt,
      retryAfter,
      globalLimited: true,
    }
  }

  // Per-user check
  const entry = rateLimitMap.get(identifier)

  if (!entry || now > entry.resetAt) {
    const resetAt = now + WINDOW
    rateLimitMap.set(identifier, { count: 1, resetAt })
    globalCount++
    return { allowed: true, remaining: PER_USER_MAX - 1, resetAt }
  }

  if (entry.count >= PER_USER_MAX) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, remaining: 0, resetAt: entry.resetAt, retryAfter }
  }

  entry.count++
  globalCount++
  return { allowed: true, remaining: PER_USER_MAX - entry.count, resetAt: entry.resetAt }
}

// Cleanup old per-user entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(key)
  }
}, WINDOW)
