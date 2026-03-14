import { SearchEngine } from "./search-engine";

export interface RecentSearch {
  dork: string;
  engine: SearchEngine;
  createdAt: string;
}

const STORAGE_KEY = "dorkhunt_recent_searches";
const MAX_RECENT_SEARCHES = 20;

export const recentSearches = {
  get(): RecentSearch[] {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load recent searches", error);
      return [];
    }
  },

  add(dork: string, engine: SearchEngine): void {
    if (typeof window === "undefined" || !dork.trim()) return;

    try {
      const current = this.get();
      const newItem: RecentSearch = {
        dork: dork.trim(),
        engine,
        createdAt: new Date().toISOString(),
      };

      // Remove existing same dork to move it to top
      const filtered = current.filter((item) => item.dork !== newItem.dork);
      const updated = [newItem, ...filtered].slice(0, MAX_RECENT_SEARCHES);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to save recent search", error);
    }
  },

  clear(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
