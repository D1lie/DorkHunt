import { DorkCategory } from "./dork-categorizer"

export interface DorkItem {
  id: string
  text: string
  source: "default" | "generated" | "saved"
  category: DorkCategory
}

export function createDorkItem(
  text: string, 
  source: "default" | "generated" | "saved", 
  category: DorkCategory,
  id?: string
): DorkItem {
  return {
    id: id || crypto.randomUUID(),
    text,
    source,
    category,
  }
}

export function deduplicateDorks(dorks: string[]): string[] {
  return Array.from(new Set(dorks))
}

export function filterDorksBySearch(dorks: DorkItem[], searchQuery: string): DorkItem[] {
  if (!searchQuery.trim()) return dorks
  
  const query = searchQuery.toLowerCase()
  return dorks.filter((dork) => dork.text.toLowerCase().includes(query))
}

export function filterDorksByCategories(dorks: DorkItem[], categories: DorkCategory[]): DorkItem[] {
  if (categories.length === 0) return dorks
  
  return dorks.filter((dork) => categories.includes(dork.category))
}

export function filterDorksBySource(
  dorks: DorkItem[],
  sourceMode: "default" | "generated" | "saved" | "all"
): DorkItem[] {
  if (sourceMode === "all") return dorks
  
  return dorks.filter((dork) => dork.source === sourceMode)
}

// Store recent target domains
const RECENT_TARGETS_KEY = "dorkhunt_recent_targets"
const MAX_RECENT_TARGETS = 5

export function getRecentTargets(): string[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(RECENT_TARGETS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function addRecentTarget(domain: string): void {
  if (!domain) return
  
  const recent = getRecentTargets()
  const filtered = recent.filter((d) => d !== domain)
  filtered.unshift(domain)
  const limited = filtered.slice(0, MAX_RECENT_TARGETS)
  
  localStorage.setItem(RECENT_TARGETS_KEY, JSON.stringify(limited))
}

export function clearRecentTargets(): void {
  localStorage.removeItem(RECENT_TARGETS_KEY)
}
