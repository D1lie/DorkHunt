"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { DorkRowActions } from "@/components/dork-row-actions"
import { useSearchEngine } from "@/hooks/use-search-engine"

interface DorkCardRowProps {
  dork: string
  category?: string
  onCopy?: () => void
  onSave?: () => void
}

export function DorkCardRow({ dork, category, onCopy, onSave }: DorkCardRowProps) {
  const { handleSearch } = useSearchEngine()

  const handleRowClick = () => {
    // Only search on desktop/click if not selecting text
    if (window.getSelection()?.toString()) return
    handleSearch(dork)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(dork)
    }
  }

  return (
    <div 
      className="group relative flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:glow cursor-pointer"
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Search dork: ${dork}`}
    >
      {category && (
        <Badge variant="outline" className="shrink-0 text-xs">
          {category}
        </Badge>
      )}
      
      <code className="flex-1 font-mono text-sm text-foreground break-all">
        {dork}
      </code>

      <DorkRowActions 
        dork={dork} 
        onSave={onSave} 
        onCopy={onCopy} 
        className="shrink-0"
      />
    </div>
  )
}
