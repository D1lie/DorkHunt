// DeepSeek API Error Classification

export type DeepSeekErrorCode =
  | "AI_MISSING_KEY"
  | "AI_INVALID_KEY"
  | "AI_QUOTA_EXCEEDED"
  | "AI_MODEL_UNAVAILABLE"
  | "AI_GENERATION_FAILED"
  | "AI_RATE_LIMIT"
  | "AI_UNKNOWN_ERROR"

export interface DeepSeekError {
  code: DeepSeekErrorCode
  message: string
  userMessage: string
  retryable: boolean
}

export function classifyDeepSeekError(error: unknown): DeepSeekError {
  const errorMessage = error instanceof Error ? error.message : String(error)
  const errorString = errorMessage.toLowerCase()

  if (!process.env.NVIDIA_API_KEY || process.env.NVIDIA_API_KEY === "") {
    return {
      code: "AI_MISSING_KEY",
      message: "NVIDIA_API_KEY environment variable is not set",
      userMessage: "API key is not configured. Please add your NVIDIA API key to .env.local",
      retryable: false,
    }
  }

  if (errorString.includes("429") || errorString.includes("rate limit")) {
    return {
      code: "AI_RATE_LIMIT",
      message: errorMessage,
      userMessage: "Rate limit exceeded. Please wait a moment and try again.",
      retryable: true,
    }
  }

  if (
    errorString.includes("quota") ||
    errorString.includes("exceeded") ||
    errorString.includes("resource exhausted")
  ) {
    return {
      code: "AI_QUOTA_EXCEEDED",
      message: errorMessage,
      userMessage: "API quota exceeded. Please check your NVIDIA API quota limits.",
      retryable: false,
    }
  }

  if (
    errorString.includes("invalid") ||
    errorString.includes("unauthorized") ||
    errorString.includes("401") ||
    errorString.includes("403") ||
    errorString.includes("api key")
  ) {
    return {
      code: "AI_INVALID_KEY",
      message: errorMessage,
      userMessage: "Invalid API key. Please check your NVIDIA API key in .env.local",
      retryable: false,
    }
  }

  if (
    errorString.includes("404") ||
    errorString.includes("not found") ||
    errorString.includes("not supported")
  ) {
    return {
      code: "AI_MODEL_UNAVAILABLE",
      message: errorMessage,
      userMessage: `AI model unavailable (${errorMessage}). Using default dorks instead.`,
      retryable: false,
    }
  }

  return {
    code: "AI_GENERATION_FAILED",
    message: errorMessage,
    userMessage: "AI generation failed. Please try again or use default dorks.",
    retryable: true,
  }
}

export function getSafeKeyPrefix(apiKey: string | undefined): string {
  if (!apiKey || apiKey === "") return "[NOT SET]"
  if (apiKey.length < 8) return "[TOO SHORT]"
  return apiKey.substring(0, 8) + "..."
}
