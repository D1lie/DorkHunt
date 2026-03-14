"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Database, Home, Github, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dork-search", label: "Dork Search", icon: Search },
    { href: "/bug-bounty-dorks", label: "Bug Bounty Dorks", icon: Database },
    { href: "/docs", label: "Docs", icon: FileText },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-3 min-w-fit shrink-0 mr-8">
          <BrandLogo 
            variant="full" 
            size="desktop" 
            priority={true}
            showGlow={true}
            className="hidden sm:flex"
          />
          <BrandLogo 
            variant="icon-only" 
            size="mobile" 
            priority={true}
            showGlow={true}
            className="flex sm:hidden"
          />
        </Link>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                    isActive && "bg-primary/10 text-primary glow"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/D1lie/DorkHunt" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                Contribute
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
