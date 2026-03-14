"use client"

import { useState, useEffect, useMemo, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Sparkles, Trash2, Copy, Bookmark, Filter, X, AlertCircle, Target as TargetIcon } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DorkSearchSidebar } from "@/components/dork-search-sidebar"
import { DorkResultsList } from "@/components/dork-results-list"
import { EmptyState } from "@/components/empty-state"
import { DorkListSkeleton } from "@/components/loading-skeleton"
import { storage } from "@/lib/storage"
import { downloadFile, getTimestampedFilename, exportDorksAsTxt, exportDorksAsJson } from "@/lib/parser"
import { categorizeDork, DorkCategory } from "@/lib/dork-categorizer"
import { applyTargetToDorks, normalizeTargetDomain, isValidDomain } from "@/lib/target-transform"
import {
  DorkItem,
  createDorkItem,
  filterDorksBySearch,
  filterDorksByCategories,
  filterDorksBySource,
  getRecentTargets,
  addRecentTarget,
  clearRecentTargets,
} from "@/lib/dork-utils"
import { toast } from "sonner"

type SourceMode = "default" | "generated" | "saved" | "all"

const QUICK_PRESETS = [
  { label: "Admin Panels", query: "admin panels login portals" },
  { label: "API Discovery", query: "api documentation swagger graphql" },
  { label: "Sensitive Files", query: "config files environment variables" },
  { label: "Disclosure Pages", query: "security disclosure responsible disclosure" },
  { label: "Public Keys", query: "ssh keys private keys certificates" },
  { label: "Login Pages", query: "login signin authentication" },
]

function DorkSearchContent() {
  // State
  const [query, setQuery] = useState("")
  const [searchFilter, setSearchFilter] = useState("")
  const [targetDomain, setTargetDomain] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<DorkCategory[]>([])
  const [sourceMode, setSourceMode] = useState<SourceMode>("default")
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [defaultDorks, setDefaultDorks] = useState<DorkItem[]>([])
  const [generatedDorks, setGeneratedDorks] = useState<DorkItem[]>([])
  const [recentTargets, setRecentTargets] = useState<string[]>([])
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [savedDorks, setSavedDorks] = useState<DorkItem[]>([])
  // Rate limit state
  const [rateLimitResetAt, setRateLimitResetAt] = useState<number | null>(null)
  const [rateLimitRemaining, setRateLimitRemaining] = useState<number>(3)
  const [countdown, setCountdown] = useState<string | null>(null)
  const searchParams = useSearchParams()

  // Countdown timer for rate limit
  useEffect(() => {
    if (!rateLimitResetAt) return
    const tick = () => {
      const remaining = rateLimitResetAt - Date.now()
      if (remaining <= 0) {
        setCountdown(null)
        setRateLimitResetAt(null)
        setRateLimitRemaining(3)
        return
      }
      const m = Math.floor(remaining / 60000)
      const s = Math.floor((remaining % 60000) / 1000)
      setCountdown(`${m}:${s.toString().padStart(2, "0")}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [rateLimitResetAt])

  const loadSavedDorks = useCallback(() => {
    const saved = storage.getSavedDorks()
    const dorkItems = saved.map((d) => 
      createDorkItem(d.dork, "saved", categorizeDork(d.dork), d.id)
    )
    setSavedDorks(dorkItems)
  }, [])



  const loadDefaultDorks = useCallback(async () => {
    try {
      const response = await fetch("/api/default-dorks")
      const data = await response.json()
      
      const dorkItems = data.dorks.map((text: string) =>
        createDorkItem(text, "default", categorizeDork(text))
      )
      
      setDefaultDorks(dorkItems)
    } catch (error) {
      toast.error("Failed to load default dorks")
    } finally {
      setLoading(false)
    }
  }, [])

  // Load default dorks on mount
  useEffect(() => {
    loadDefaultDorks()
    loadSavedDorks()
    setRecentTargets(getRecentTargets())
    
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem("dorkhunt_onboarding_seen")
    if (hasSeenOnboarding) {
      setShowOnboarding(false)
    }

    // Storage update listener
    const handleUpdate = () => loadSavedDorks()
    window.addEventListener("dork-storage-update", handleUpdate)
    return () => window.removeEventListener("dork-storage-update", handleUpdate)
  }, [searchParams, loadSavedDorks, loadDefaultDorks])

  const handleGenerate = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search query")
      return
    }

    // Block if rate limited client-side
    if (rateLimitResetAt && Date.now() < rateLimitResetAt && rateLimitRemaining <= 0) {
      toast.error(`Limit reached. Try again in ${countdown}`)
      return
    }

    setGenerating(true)
    setError(null)

    try {
      const response = await fetch("/api/generate-dorks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query.trim(),
          targetDomain: targetDomain || undefined,
          includeTarget: false,
          count: 10,
          mode: "focused",
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        const errorMessage = data.error || "Failed to generate dorks"
        const errorCode = data.code || "UNKNOWN_ERROR"

        if (errorCode === "RATE_LIMIT_EXCEEDED") {
          setRateLimitResetAt(data.resetAt)
          setRateLimitRemaining(0)
          if (data.globalLimited) {
            setError(`Service is busy right now — too many users generating at once. Try again in ${data.retryAfter}s.`)
            toast.error("Too many users at once. Try again shortly.", { duration: 6000 })
          } else {
            setError(`You've used all 3 generations this minute. Try again in ${countdown || "a moment"}.`)
            toast.error("Generation limit reached. Please wait before trying again.", { duration: 6000 })
          }
        } else if (errorCode === "AI_QUOTA_EXCEEDED" || errorCode === "AI_RATE_LIMIT") {
          setError(errorMessage)
          toast.error(errorMessage, { duration: 5000 })
        } else if (errorCode === "AI_MISSING_KEY" || errorCode === "AI_INVALID_KEY") {
          setError(errorMessage)
          toast.error(errorMessage, { duration: 7000 })
        } else {
          setError(errorMessage)
          toast.error(errorMessage)
        }
        return
      }

      // Update remaining count from server
      if (typeof data.remaining === "number") setRateLimitRemaining(data.remaining)
      if (data.resetAt) setRateLimitResetAt(data.resetAt)

      const dorkItems = data.dorks.map((text: string) =>
        createDorkItem(text, "generated", categorizeDork(text))
      )

      setGeneratedDorks(dorkItems)
      setSourceMode("all")
      toast.success(`Generated ${data.dorks.length} dorks (${data.remaining ?? "?"}/3 uses left this minute)`)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to generate dorks"
      setError(message)
      toast.error(message)
    } finally {
      setGenerating(false)
    }
  }

  const handleSaveAllVisible = () => {
    if (displayedDorks.length === 0) {
      toast.error("No dorks to save")
      return
    }

    displayedDorks.forEach(dork => {
      storage.saveDork(dork, sourceMode === "generated" ? "generated" : "curated")
    })
    
    loadSavedDorks()
    toast.success(`Saved ${displayedDorks.length} dorks to your collection`)
  }

  const handleClear = () => {
    setQuery("")
    setSearchFilter("")
    setGeneratedDorks([])
    setError(null)
    setSourceMode("default")
  }

  const handleResetFilters = () => {
    setTargetDomain("")
    setSelectedCategories([])
    setSearchFilter("")
    clearRecentTargets()
    setRecentTargets([])
    toast.success("Filters and recent targets cleared")
  }

  const handleTargetChange = (domain: string) => {
    setTargetDomain(domain)
    const normalized = normalizeTargetDomain(domain)
    if (normalized && isValidDomain(normalized)) {
      addRecentTarget(normalized)
      setRecentTargets(getRecentTargets())
    }
  }

  const handlePresetClick = (preset: typeof QUICK_PRESETS[0]) => {
    setQuery(preset.query)
  }

  const dismissOnboarding = () => {
    setShowOnboarding(false)
    localStorage.setItem("dorkhunt_onboarding_seen", "true")
  }

  // Combine and filter dorks
  const allDorks = useMemo(() => {
    const combined = [...defaultDorks, ...generatedDorks, ...savedDorks]
    // Deduplicate by text to ensure 'All' doesn't double count items saved from default
    const seen = new Set<string>()
    return combined.filter(d => {
      if (seen.has(d.text)) return false
      seen.add(d.text)
      return true
    })
  }, [defaultDorks, generatedDorks, savedDorks])

  // Calculate filtered sets for tab counts and stats
  const filteredSets = useMemo(() => {
    const applyFilters = (list: DorkItem[]) => {
      let filtered = filterDorksBySearch(list, searchFilter)
      filtered = filterDorksByCategories(filtered, selectedCategories)
      return filtered
    }

    return {
      default: applyFilters(defaultDorks),
      generated: applyFilters(generatedDorks),
      saved: applyFilters(savedDorks),
      all: applyFilters(allDorks),
    }
  }, [defaultDorks, generatedDorks, savedDorks, allDorks, searchFilter, selectedCategories])

  const filteredDorks = useMemo(() => {
    return filteredSets[sourceMode] || []
  }, [filteredSets, sourceMode])

  // Apply target transformation for display
  const displayedDorks = useMemo(() => {
    const dorkTexts = filteredDorks.map((d) => d.text)
    return applyTargetToDorks(dorkTexts, targetDomain)
  }, [filteredDorks, targetDomain])

  const handleCopyAll = async () => {
    try {
      const text = displayedDorks.join("\n")
      await navigator.clipboard.writeText(text)
      toast.success(`Copied ${displayedDorks.length} dorks`)
    } catch (error) {
      toast.error("Failed to copy")
    }
  }



  const handleExportTxt = () => {
    const content = exportDorksAsTxt(displayedDorks)
    const filename = getTimestampedFilename("dorks", "txt")
    downloadFile(content, filename, "text/plain")
    toast.success("Exported as TXT")
  }

  const handleExportJson = () => {
    const content = exportDorksAsJson(displayedDorks)
    const filename = getTimestampedFilename("dorks", "json")
    downloadFile(content, filename, "application/json")
    toast.success("Exported as JSON")
  }

  const activeFiltersCount = selectedCategories.length + (targetDomain ? 1 : 0)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-6 max-h-[calc(100vh-7rem)] overflow-y-auto custom-scrollbar">
                <DorkSearchSidebar
                  targetDomain={targetDomain}
                  onTargetChange={handleTargetChange}
                  selectedCategories={selectedCategories}
                  onCategoriesChange={setSelectedCategories}
                  onResetFilters={handleResetFilters}
                  recentTargets={recentTargets}
                  onRecentTargetClick={setTargetDomain}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold tracking-tight">Dork Search</h1>
                <p className="text-muted-foreground">
                  Search, filter, and generate custom recon dorks
                </p>
              </div>

              {/* Onboarding Hint */}
              {showOnboarding && (
                <div className="mb-6 rounded-lg border border-primary/20 bg-primary/10 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">Quick Tips</h3>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Add a target domain to scope dorks with site:</li>
                        <li>• Use categories to narrow results</li>
                        <li>• Generate custom dorks with AI</li>
                      </ul>
                    </div>
                    <button
                      onClick={dismissOnboarding}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Filter Button */}
              <div className="mb-4 lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="default" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <DorkSearchSidebar
                      targetDomain={targetDomain}
                      onTargetChange={handleTargetChange}
                      selectedCategories={selectedCategories}
                      onCategoriesChange={setSelectedCategories}
                      onResetFilters={handleResetFilters}
                      recentTargets={recentTargets}
                      onRecentTargetClick={setTargetDomain}
                    />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Search Card */}
              <div className="mb-6 rounded-lg border border-border bg-card p-6">
                <div className="space-y-4">
                  <div>
                    <Input
                      placeholder="e.g., admin panels, API documentation, config files..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                      className="text-base"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleGenerate}
                      disabled={generating || (rateLimitRemaining <= 0 && !!rateLimitResetAt)}
                      className="glow"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {generating
                        ? "Generating..."
                        : rateLimitRemaining <= 0 && countdown
                        ? `Locked (${countdown})`
                        : `Generate${rateLimitRemaining < 3 ? ` (${rateLimitRemaining} left)` : ""}`}
                    </Button>

                    <Button variant="outline" onClick={handleClear}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear
                    </Button>

                    {displayedDorks.length > 0 && (
                      <>
                        <Button variant="outline" onClick={handleCopyAll}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy All
                        </Button>



                        <Button variant="outline" onClick={handleSaveAllVisible}>
                          <Bookmark className="mr-2 h-4 w-4" />
                          Save All
                        </Button>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={handleExportTxt}>
                            TXT
                          </Button>
                          <Button variant="outline" size="sm" onClick={handleExportJson}>
                            JSON
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mb-6">
                <p className="mb-3 text-sm font-medium">Quick Presets:</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_PRESETS.map((preset) => (
                    <Badge
                      key={preset.label}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => handlePresetClick(preset)}
                    >
                      {preset.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="text-2xl font-bold text-primary">{defaultDorks.length}</div>
                  <div className="text-xs text-muted-foreground">Default Dorks</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="text-2xl font-bold text-primary">{generatedDorks.length}</div>
                  <div className="text-xs text-muted-foreground">Generated</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="text-2xl font-bold text-primary">{filteredDorks.length}</div>
                  <div className="text-xs text-muted-foreground">Visible</div>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="text-2xl font-bold text-primary">{storage.getSavedDorks().length}</div>
                  <div className="text-xs text-muted-foreground">Saved</div>
                </div>
              </div>

              {/* Info Bar */}
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{filteredDorks.length} results</span>
                {targetDomain && (
                  <Badge variant="outline" className="gap-1">
                    <TargetIcon className="h-3 w-3" />
                    {normalizeTargetDomain(targetDomain)}
                  </Badge>
                )}
                {selectedCategories.length > 0 && (
                  <Badge variant="outline">
                    {selectedCategories.length} {selectedCategories.length === 1 ? "category" : "categories"}
                  </Badge>
                )}
              </div>

              {/* Search Filter */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search within results..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Source Mode Tabs */}
              <Tabs value={sourceMode} onValueChange={(v) => setSourceMode(v as SourceMode)} className="mb-6">
                <TabsList>
                  <TabsTrigger value="default">
                    Default ({filteredSets.default.length})
                  </TabsTrigger>
                  <TabsTrigger value="generated">
                    Generated ({filteredSets.generated.length})
                  </TabsTrigger>
                  <TabsTrigger value="saved">
                    Saved ({filteredSets.saved.length})
                  </TabsTrigger>
                  <TabsTrigger value="all">
                    All ({filteredSets.all.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Error State */}
              {error && (
                <div className="mb-6 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-yellow-500">
                        {rateLimitRemaining <= 0 && rateLimitResetAt ? "Generation Limit Reached" : "AI Generation Unavailable"}
                      </h3>
                      <p className="text-sm text-yellow-500/90 mt-1">{error}</p>
                      {rateLimitRemaining <= 0 && countdown && (
                        <p className="text-sm font-mono text-yellow-400 mt-2">
                          Available again in: <span className="font-bold">{countdown}</span>
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        Showing {defaultDorks.length} default dorks instead. You can still search, filter, and use all features.
                      </p>
                      <div className="flex gap-2 mt-3">
                        {!(rateLimitRemaining <= 0 && rateLimitResetAt) && (
                          <Button variant="outline" size="sm" onClick={handleGenerate} disabled={generating}>
                            Retry
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => setError(null)}>
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results */}
              {loading ? (
                <DorkListSkeleton count={10} />
              ) : filteredDorks.length > 0 ? (
                <DorkResultsList dorks={filteredDorks} displayedDorks={displayedDorks} />
              ) : (
                <EmptyState
                  icon={Search}
                  title="No results found"
                  description={
                    searchFilter
                      ? "Try adjusting your search or filters"
                      : sourceMode === "generated" && generatedDorks.length === 0
                      ? "Generate dorks to see results here"
                      : "No dorks match your current filters"
                  }
                  action={
                    searchFilter || selectedCategories.length > 0 || targetDomain ? (
                      <Button variant="outline" onClick={handleResetFilters}>
                        Reset Filters
                      </Button>
                    ) : undefined
                  }
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function DorkSearchPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="container py-8">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold tracking-tight">Dork Search</h1>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <DorkSearchContent />
    </Suspense>
  )
}
