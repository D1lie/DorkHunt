"use client"

import { DorkItem } from "@/lib/dork-utils"
import { Badge } from "@/components/ui/badge"
import { DorkRowActions } from "@/components/dork-row-actions"
import { useSearchEngine } from "@/hooks/use-search-engine"

interface DorkResultsListProps {
  dorks: DorkItem[]
  displayedDorks: string[]
}

export function DorkResultsList({ dorks, displayedDorks }: DorkResultsListProps) {
  return (
    <div className="space-y-3">
      {dorks.map((dork, index) => (
        <DorkResultRow
          key={dork.id}
          dork={dork}
          displayedText={displayedDorks[index]}
        />
      ))}
    </div>
  )
}

interface DorkResultRowProps {
  dork: DorkItem
  displayedText: string
}

function DorkResultRow({ dork, displayedText }: DorkResultRowProps) {
  const { handleSearch } = useSearchEngine()

  const handleRowClick = () => {
    if (window.getSelection()?.toString()) return
    handleSearch(displayedText)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(displayedText)
    }
  }

  return (
    <div 
      className="group relative flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:glow cursor-pointer"
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Search dork: ${displayedText}`}
    >
      <div className="flex shrink-0 gap-2">
        <Badge variant="outline" className="text-xs">
          {dork.category}
        </Badge>
        <Badge
          variant={dork.source === "default" ? "secondary" : "default"}
          className="text-xs"
        >
          {dork.source === "default" ? "Default" : "AI"}
        </Badge>
      </div>

      <code className="flex-1 font-mono text-sm text-foreground break-all">
        {displayedText}
      </code>

      <DorkRowActions 
        dork={displayedText} 
        className="shrink-0"
      />
    </div>
  )
}
