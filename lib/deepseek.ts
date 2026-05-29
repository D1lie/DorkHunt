import OpenAI from "openai"
import { GenerateDorksInput } from "./validators"
import { classifyDeepSeekError, getSafeKeyPrefix } from "./deepseek-errors"

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY || ""
const FALLBACK_API_KEY = process.env.NVIDIA_API_KEY_FALLBACK || ""

// Primary: Meta Llama 4 Maverick (fast, reliable on NVIDIA NIM)
// Fallback: MiniMax M2.7
const PRIMARY_MODEL = "meta/llama-4-maverick-17b-128e-instruct"
const FALLBACK_MODEL = "minimaxai/minimax-m2.7"

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
    timeout: 12 * 1000, // 12s per attempt — leaves room for fallback within 26s Netlify limit
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
    // Each model has its own recommended parameters
    const isLlama = model.startsWith("meta/")
    const modelParams = isLlama
      ? {
          temperature: 1.0,
          top_p: 1.0,
          max_tokens: 300,       // 10 short dork strings need ~200-300 tokens max
          frequency_penalty: 0.0,
          presence_penalty: 0.0,
        }
      : {
          temperature: 1,
          top_p: 0.95,
          max_tokens: 300,       // same — keeps response fast and within timeout
        }

    try {
      const client = makeClient(key)
      const response = await client.chat.completions.create({
        model,
        messages,
        ...modelParams,
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

      // Always continue to next model on timeout or connection error
      // Only break (stop trying) on hard auth failures where the key itself is bad
      const isHardFailure =
        msg.includes("401") ||
        msg.includes("403") ||
        msg.includes("invalid api key") ||
        msg.includes("unauthorized")

      console.warn(`[AI] Model ${model} (key: ${getSafeKeyPrefix(key)}) failed: ${msg}`)
      lastError = error

      if (isHardFailure) break  // bad key — no point trying fallback with same key
      // otherwise: timeout, quota, 429, network error → continue to next attempt
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
