"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Download, Copy, FileText, FileJson } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DorkCardRow } from "@/components/dork-card-row"
import { EmptyState } from "@/components/empty-state"
import { DorkListSkeleton } from "@/components/loading-skeleton"
import { categorizeDork } from "@/lib/dork-categorizer"
import { downloadFile, getTimestampedFilename, exportDorksAsTxt, exportDorksAsJson } from "@/lib/parser"
import { storage } from "@/lib/storage"
import { toast } from "sonner"

export default function BugBountyDorksPage() {
  const [dorks, setDorks] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [savedCount, setSavedCount] = useState(0)

  useEffect(() => {
    loadDorks()
    updateSavedCount()
  }, [])

  const loadDorks = async () => {
    try {
      const response = await fetch("/api/bug-bounty-dorks")
      const data = await response.json()
      setDorks(data.dorks || [])
    } catch (error) {
      toast.error("Failed to load dorks")
    } finally {
      setLoading(false)
    }
  }

  const updateSavedCount = () => {
    setSavedCount(storage.getSavedDorks().length)
  }

  const filteredDorks = useMemo(() => {
    if (!searchQuery.trim()) return dorks
    const query = searchQuery.toLowerCase()
    return dorks.filter((dork) => dork.toLowerCase().includes(query))
  }, [dorks, searchQuery])

  const handleCopyAll = async () => {
    try {
      const text = filteredDorks.join("\n")
      await navigator.clipboard.writeText(text)
      toast.success(`Copied ${filteredDorks.length} dorks`)
    } catch (error) {
      toast.error("Failed to copy")
    }
  }

  const handleExportTxt = () => {
    const content = exportDorksAsTxt(filteredDorks)
    const filename = getTimestampedFilename("bug-bounty-dorks", "txt")
    downloadFile(content, filename, "text/plain")
    toast.success("Exported as TXT")
  }

  const handleExportJson = () => {
    const content = exportDorksAsJson(filteredDorks)
    const filename = getTimestampedFilename("bug-bounty-dorks", "json")
    downloadFile(content, filename, "application/json")
    toast.success("Exported as JSON")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Bug Bounty Dorks</h1>
            <p className="text-muted-foreground">
              Curated discovery queries for common bug bounty recon workflows
            </p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search dorks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCopyAll}>
                <Copy className="mr-2 h-4 w-4" />
                Copy All
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportTxt}>
                <FileText className="mr-2 h-4 w-4" />
                Export TXT
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportJson}>
                <FileJson className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredDorks.length} of {dorks.length} dorks
            {savedCount > 0 && ` • ${savedCount} saved`}
          </div>

          {/* Dorks List */}
          {loading ? (
            <DorkListSkeleton count={10} />
          ) : filteredDorks.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No dorks found"
              description={
                searchQuery
                  ? "Try adjusting your search query"
                  : "No dorks available"
              }
            />
          ) : (
            <div className="space-y-3">
              {filteredDorks.map((dork, index) => (
                <DorkCardRow
                  key={index}
                  dork={dork}
                  category={categorizeDork(dork)}
                  onSave={updateSavedCount}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
