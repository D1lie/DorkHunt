"use client"

import { useState } from "react"
import { Globe, Copy, Bookmark, Save, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSearchEngine } from "@/hooks/use-search-engine"
import { storage } from "@/lib/storage"
import { toast } from "sonner"

interface DorkRowActionsProps {
  dork: string
  onSave?: () => void
  onCopy?: () => void
  className?: string
}

export function DorkRowActions({ dork, onSave, onCopy, className }: DorkRowActionsProps) {
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(() => storage.isDorkSaved(dork))
  const { handleSearch } = useSearchEngine()

  const handleCopyAction = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(dork)
      setCopied(true)
      toast.success("Copied to clipboard")
      onCopy?.()
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy")
    }
  }

  const handleSaveAction = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (saved) {
      const savedDorks = storage.getSavedDorks()
      const dorkToRemove = savedDorks.find((d) => d.dork === dork)
      if (dorkToRemove) {
        storage.removeDork(dorkToRemove.id)
        setSaved(false)
        toast.success("Removed from saved")
      }
    } else {
      storage.saveDork(dork, "curated")
      setSaved(true)
      toast.success("Saved")
    }
    window.dispatchEvent(new CustomEvent("dork-storage-update"))
    onSave?.()
  }

  const handleSearchAction = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleSearch(dork, "google")
  }

  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-2", className)}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSearchAction}
              className="h-8 w-8 p-0 transition-all hover:text-primary hover:bg-primary/10 active:scale-95 active:text-primary"
              aria-label="Search this dork"
            >
              <Globe className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Search this dork</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyAction}
              className={cn(
                "h-8 w-8 p-0 transition-all hover:text-primary hover:bg-primary/10 active:scale-95 active:text-primary",
                copied && "text-primary"
              )}
              aria-label="Copy dork"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy dork</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSaveAction}
              className={cn(
                "h-8 w-8 p-0 transition-all hover:text-primary hover:bg-primary/10 active:scale-95 active:text-primary",
                saved && "text-primary"
              )}
              aria-label="Save dork"
            >
              {saved ? (
                <Bookmark className="h-4 w-4 fill-current" />
              ) : (
                <Save className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Save dork</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
