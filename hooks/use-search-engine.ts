"use client";

import { useState, useEffect } from "react";
import { SearchEngine, openSearchUrl } from "@/lib/search-engine";
import { recentSearches, RecentSearch } from "@/lib/recent-searches";
import { toast } from "sonner";

const ENGINE_STORAGE_KEY = "dorkhunt_preferred_engine";

export function useSearchEngine() {
  const [preferredEngine, setPreferredEngine] = useState<SearchEngine>("google");
  const [history, setHistory] = useState<RecentSearch[]>([]);

  useEffect(() => {
    // Load from local storage
    const savedEngine = localStorage.getItem(ENGINE_STORAGE_KEY) as SearchEngine;
    if (savedEngine && ["google", "bing", "duckduckgo"].includes(savedEngine)) {
      setPreferredEngine(savedEngine);
    }
    setHistory(recentSearches.get());
  }, []);

  const updatePreferredEngine = (engine: SearchEngine) => {
    setPreferredEngine(engine);
    localStorage.setItem(ENGINE_STORAGE_KEY, engine);
  };

  const handleSearch = (dork: string, engine?: SearchEngine) => {
    const engineToUse = engine || preferredEngine;
    const success = openSearchUrl(dork, engineToUse);
    
    if (success) {
      recentSearches.add(dork, engineToUse);
      setHistory(recentSearches.get());
    } else {
      toast.error("Unable to search this dork");
    }
    
    return success;
  };

  const clearHistory = () => {
    recentSearches.clear();
    setHistory([]);
  };

  return {
    preferredEngine,
    setPreferredEngine: updatePreferredEngine,
    history,
    handleSearch,
    clearHistory,
  };
}
