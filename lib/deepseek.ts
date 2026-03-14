import OpenAI from "openai"
import { GenerateDorksInput } from "./validators"
import { classifyDeepSeekError, getSafeKeyPrefix } from "./deepseek-errors"

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || ""
const FALLBACK_API_KEY = process.env.NVIDIA_API_KEY_FALLBACK || ""

// Each key has its own model
const PRIMARY_MODEL = "deepseek-ai/deepseek-v3.1"
const FALLBACK_MODEL = "mistralai/devstral-2-123b-instruct-2512"

if (typeof window === "undefined") {
  console.log("=== AI Configuration ===")
  console.log("Primary Key Present:", NVIDIA_API_KEY ? "YES" : "NO")
  console.log("Fallback Key Present:", FALLBACK_API_KEY ? "YES" : "NO")
  console.log("Primary Model:", PRIMARY_MODEL)
  console.log("Fallback Model:", FALLBACK_MODEL)
  console.log("========================")
}

function makeClient(apiKey: string) {
  return new OpenAI({
    baseURL: "https://integrate.api.nvidia.com/v1",
    apiKey,
    timeout: 5 * 60 * 1000, // 5 minutes
    maxRetries: 0,
  })
}

export async function generateDorks(input: GenerateDorksInput): Promise<string[]> {
  const activeKey = NVIDIA_API_KEY || FALLBACK_API_KEY
  if (!activeKey) {
    throw classifyDeepSeekError(new Error("API key not configured"))
  }

  const count = Math.min(input.count || 10, 10)
  const target = input.includeTarget && input.targetDomain ? ` site:${input.targetDomain}` : ""

  const messages = [
    {
      role: "system" as const,
      content: "You are a Google dork generator. Output ONLY raw search query strings, one per line. No explanations, no introductions, no numbering, no bullet points, no markdown. Just the dork queries.",
    },
    {
      role: "user" as const,
      content: `Generate ${count} Google dork queries for: "${input.query}"${target}\nUse operators: site: inurl: intitle: filetype: intext: ext:`,
    },
  ]

  console.log(`[AI] Generating ${count} dorks for: "${input.query}"`)
  const start = Date.now()

  // Each entry: [apiKey, modelName]
  const attempts: [string, string][] = []
  if (NVIDIA_API_KEY) attempts.push([NVIDIA_API_KEY, PRIMARY_MODEL])
  if (FALLBACK_API_KEY) attempts.push([FALLBACK_API_KEY, FALLBACK_MODEL])

  let lastError: unknown
  for (const [key, model] of attempts) {
    try {
      const client = makeClient(key)
      const response = await client.chat.completions.create({
        model,
        messages,
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 300,
        stream: false,
      })

      const text = response.choices[0]?.message?.content || ""
      console.log(`[AI] Done in ${Date.now() - start}ms (model: ${model}, key: ${getSafeKeyPrefix(key)})`)

      // Filter to only lines that look like actual dork queries (contain a search operator)
      const DORK_OPERATORS = /site:|inurl:|intitle:|filetype:|intext:|ext:|inanchor:|allinurl:|allintitle:/i

      return text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
        .map((l) => l.replace(/^[\d]+[\.\)]\s*/, "").replace(/^[-*•]\s*/, "").trim())
        .filter((l) => DORK_OPERATORS.test(l))
        .slice(0, count)
    } catch (error) {
      const msg = error instanceof Error ? error.message.toLowerCase() : ""
      const isRetryable =
        msg.includes("401") || msg.includes("403") ||
        msg.includes("invalid") || msg.includes("unauthorized") ||
        msg.includes("quota") || msg.includes("429")

      console.warn(`[AI] Model ${model} (key: ${getSafeKeyPrefix(key)}) failed: ${msg}`)
      lastError = error

      if (!isRetryable) break
    }
  }

  console.error(`[AI] All attempts failed after ${Date.now() - start}ms`)
  throw classifyDeepSeekError(lastError)
}

export function getDeepSeekConfig() {
  return {
    hasApiKey: !!(NVIDIA_API_KEY || FALLBACK_API_KEY),
    keyPrefix: getSafeKeyPrefix(NVIDIA_API_KEY || FALLBACK_API_KEY),
    primaryModel: PRIMARY_MODEL,
    fallbackModel: FALLBACK_MODEL,
    environment: process.env.NODE_ENV || "development",
  }
}
