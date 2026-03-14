import { NextRequest, NextResponse } from "next/server"
import { generateDorksSchema, sanitizeInput } from "@/lib/validators"
import { generateDorks } from "@/lib/deepseek"
import { checkRateLimit } from "@/lib/rate-limit"
import { DeepSeekError } from "@/lib/deepseek-errors"

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      const message = rateLimit.globalLimited
        ? "Service is busy — too many users generating at once. Try again shortly."
        : "Generation limit reached"

      return NextResponse.json(
        {
          success: false,
          code: "RATE_LIMIT_EXCEEDED",
          error: message,
          retryAfter: rateLimit.retryAfter,
          resetAt: rateLimit.resetAt,
          remaining: 0,
          globalLimited: rateLimit.globalLimited ?? false,
          retryable: true,
        },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
      )
    }

    const body = await request.json()

    if (body.query) body.query = sanitizeInput(body.query)
    if (body.targetDomain) body.targetDomain = sanitizeInput(body.targetDomain)

    const validatedInput = generateDorksSchema.parse(body)

    if (!validatedInput.query || validatedInput.query.length < 3) {
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION_ERROR",
          error: "Query too short (minimum 3 characters)",
          retryable: false,
        },
        { status: 400 }
      )
    }

    const dorks = await generateDorks(validatedInput)

    const uniqueDorks = Array.from(new Set(dorks))
    const limitedDorks = uniqueDorks.slice(0, validatedInput.count || 10)

    return NextResponse.json({
      success: true,
      dorks: limitedDorks,
      count: limitedDorks.length,
      remaining: rateLimit.remaining,
      resetAt: rateLimit.resetAt,
    })
  } catch (error) {
    console.error("Generate dorks error:", error)

    if (typeof error === "object" && error !== null && "code" in error) {
      const aiError = error as DeepSeekError

      const statusCode =
        aiError.code === "AI_MISSING_KEY" || aiError.code === "AI_INVALID_KEY" ? 401 :
        aiError.code === "AI_QUOTA_EXCEEDED" || aiError.code === "AI_RATE_LIMIT" ? 429 :
        500

      return NextResponse.json(
        {
          success: false,
          code: aiError.code,
          error: aiError.userMessage,
          retryable: aiError.retryable,
        },
        { status: statusCode }
      )
    }

    if (error && typeof error === "object" && "issues" in error) {
      return NextResponse.json(
        { success: false, code: "VALIDATION_ERROR", error: "Invalid input parameters", retryable: false },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, code: "UNKNOWN_ERROR", error: "An unexpected error occurred. Please try again.", retryable: true },
      { status: 500 }
    )
  }
}

export const dynamic = "force-dynamic"
export const maxDuration = 300 // 5 minutes max for slow free-tier API
