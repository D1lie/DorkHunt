import { z } from "zod"

export const generateDorksSchema = z.object({
  query: z.string().min(1, "Query is required").max(500, "Query too long"),
  targetDomain: z.string().optional(),
  includeTarget: z.boolean().optional().default(false),
  count: z.number().min(1).max(50).optional().default(20),
  mode: z.enum(["focused", "broad"]).optional().default("focused"),
})

export type GenerateDorksInput = z.infer<typeof generateDorksSchema>

export function sanitizeInput(input: string): string {
  // Remove potentially dangerous patterns
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .replace(/\$\{.*?\}/g, "")
    .trim()
}

export function validateDomain(domain: string): boolean {
  const domainRegex = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i
  return domainRegex.test(domain)
}
