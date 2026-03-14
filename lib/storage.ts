"use client"

export interface SavedDork {
  id: string
  dork: string
  savedAt: number
  source: "curated" | "generated"
}

export interface SavedList {
  id: string
  name: string
  dorks: string[]
  createdAt: number
  updatedAt: number
}

const SAVED_DORKS_KEY = "dorkhunt_saved"
const SAVED_LISTS_KEY = "dorkhunt_lists"
const RECENT_SEARCHES_KEY = "dorkhunt_recent"

export const storage = {
  // Saved individual dorks
  getSavedDorks(): SavedDork[] {
    if (typeof window === "undefined") return []
    try {
      const data = localStorage.getItem(SAVED_DORKS_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  saveDork(dork: string, source: "curated" | "generated" = "curated"): void {
    const saved = this.getSavedDorks()
    const exists = saved.find((d) => d.dork === dork)
    if (exists) return

    const newDork: SavedDork = {
      id: crypto.randomUUID(),
      dork,
      savedAt: Date.now(),
      source,
    }
    saved.push(newDork)
    localStorage.setItem(SAVED_DORKS_KEY, JSON.stringify(saved))
  },

  removeDork(dorkId: string): void {
    const saved = this.getSavedDorks()
    const filtered = saved.filter((d) => d.id !== dorkId)
    localStorage.setItem(SAVED_DORKS_KEY, JSON.stringify(filtered))
  },

  isDorkSaved(dork: string): boolean {
    const saved = this.getSavedDorks()
    return saved.some((d) => d.dork === dork)
  },

  // Saved lists
  getSavedLists(): SavedList[] {
    if (typeof window === "undefined") return []
    try {
      const data = localStorage.getItem(SAVED_LISTS_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  saveList(name: string, dorks: string[]): void {
    const lists = this.getSavedLists()
    const newList: SavedList = {
      id: crypto.randomUUID(),
      name,
      dorks,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    lists.push(newList)
    localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(lists))
  },

  updateList(listId: string, updates: Partial<SavedList>): void {
    const lists = this.getSavedLists()
    const index = lists.findIndex((l) => l.id === listId)
    if (index === -1) return

    lists[index] = {
      ...lists[index],
      ...updates,
      updatedAt: Date.now(),
    }
    localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(lists))
  },

  deleteList(listId: string): void {
    const lists = this.getSavedLists()
    const filtered = lists.filter((l) => l.id !== listId)
    localStorage.setItem(SAVED_LISTS_KEY, JSON.stringify(filtered))
  },

  // Recent searches
  getRecentSearches(): string[] {
    if (typeof window === "undefined") return []
    try {
      const data = localStorage.getItem(RECENT_SEARCHES_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  addRecentSearch(query: string): void {
    const recent = this.getRecentSearches()
    const filtered = recent.filter((q) => q !== query)
    filtered.unshift(query)
    const limited = filtered.slice(0, 10) // Keep last 10
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(limited))
  },

  clearRecentSearches(): void {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  },
}
