"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Target as TargetIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { DorkCategory } from "@/lib/dork-categorizer"

interface DorkSearchSidebarProps {
  targetDomain: string
  onTargetChange: (domain: string) => void
  selectedCategories: DorkCategory[]
  onCategoriesChange: (categories: DorkCategory[]) => void
  onResetFilters: () => void
  recentTargets?: string[]
  onRecentTargetClick?: (domain: string) => void
}

const CATEGORIES: DorkCategory[] = [
  "PII",
  "Sensitive Data",
  "Specific URLs",
  "API",
  "Admin/Login",
  "Config Files",
  "Public Keys",
  "Cloud Infrastructure",
  "CI/CD & DevOps",
  "Social Media & OAuth",
  "Log Files",
  "Database Backups",
  "Network Devices",
  "Other",
]

export function DorkSearchSidebar({
  targetDomain,
  onTargetChange,
  selectedCategories,
  onCategoriesChange,
  onResetFilters,
  recentTargets = [],
  onRecentTargetClick,
}: DorkSearchSidebarProps) {
  const toggleCategory = (category: DorkCategory | "All") => {
    if (category === "All") {
      onCategoriesChange([])
    } else {
      onCategoriesChange([category])
    }
  }

  const clearTarget = () => {
    onTargetChange("")
  }

  const isAllSelected = selectedCategories.length === 0

  return (
    <div className="w-full space-y-6">
      {/* Target Section */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <TargetIcon className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">Target</h3>
        </div>
        
        <div className="space-y-2">
          <div className="relative">
            <Input
              placeholder="example.com"
              value={targetDomain}
              onChange={(e) => onTargetChange(e.target.value)}
              className="pr-8 bg-background/50 border-white/5 focus-visible:ring-primary/50"
            />
            {targetDomain && (
              <button
                onClick={clearTarget}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {recentTargets.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Recent Targets</p>
              <div className="flex flex-wrap gap-1.5">
                {recentTargets.map((target) => (
                  <Badge
                    key={target}
                    variant="outline"
                    className="cursor-pointer text-xs hover:bg-primary/10 hover:border-primary/30 transition-colors border-white/5"
                    onClick={() => onRecentTargetClick?.(target)}
                  >
                    {target}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Categories Section */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">Category</h3>
        
        <div className="space-y-1">
          {/* All Categories Option */}
          <button
            onClick={() => toggleCategory("All")}
            className={cn(
              "group relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 transition-all duration-200 outline-none",
              isAllSelected 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
            )}
          >
            <div className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
              isAllSelected 
                ? "border-primary bg-primary/20" 
                : "border-muted-foreground/40 group-hover:border-muted-foreground/60"
            )}>
              <div className={cn(
                "h-2 w-2 rounded-full bg-primary transition-all duration-300 shadow-[0_0_10px_#22c55e]",
                isAllSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"
              )} />
            </div>
            <span className="text-sm font-medium">All Categories</span>
          </button>

          {CATEGORIES.map((category) => {
            const isSelected = selectedCategories.includes(category)
            
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 transition-all duration-200 outline-none",
                  isSelected 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
                )}
              >
                <div className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isSelected 
                    ? "border-primary bg-primary/20" 
                    : "border-muted-foreground/40 group-hover:border-muted-foreground/60"
                )}>
                  <div className={cn(
                    "h-2 w-2 rounded-full bg-primary transition-all duration-300 shadow-[0_0_10px_#22c55e]",
                    isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  )} />
                </div>
                <span className="text-sm font-medium">{category}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          className="w-full border-white/5 hover:bg-primary/10 hover:text-primary transition-all duration-300"
        >
          Reset All Filters
        </Button>
      </div>
    </div>
  )
}
