export type SearchEngine = "google" | "bing" | "duckduckgo";

export const SEARCH_ENGINES: { id: SearchEngine; label: string; url: string }[] = [
  {
    id: "google",
    label: "Google",
    url: "https://www.google.com/search?q=",
  },
  {
    id: "bing",
    label: "Bing",
    url: "https://www.bing.com/search?q=",
  },
  {
    id: "duckduckgo",
    label: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
  },
];

export function getSearchUrl(dork: string, engineId: SearchEngine): string | null {
  const trimmedDork = dork.trim();
  if (!trimmedDork) return null;

  const engine = SEARCH_ENGINES.find((e) => e.id === engineId);
  if (!engine) return null;

  return `${engine.url}${encodeURIComponent(trimmedDork)}`;
}

export function openSearchUrl(dork: string, engineId: SearchEngine): boolean {
  const url = getSearchUrl(dork, engineId);
  if (!url) return false;

  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
