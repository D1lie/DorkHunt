import Link from "next/link"
import { Github, Shield } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <Link href="/">
              <BrandLogo
                variant="full"
                size="footer"
                showGlow={false}
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Recon intelligence for authorized security research
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dork-search" className="text-muted-foreground hover:text-primary transition-colors">
                  Dork Search
                </Link>
              </li>
              <li>
                <Link href="/bug-bounty-dorks" className="text-muted-foreground hover:text-primary transition-colors">
                  Bug Bounty Dorks
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="https://github.com/D1lie" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center">
                  <Github className="mr-1 h-3 w-3" />
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold flex items-center">
              <Shield className="mr-2 h-4 w-4 text-primary" />
              Safety Notice
            </h3>
            <p className="text-xs text-muted-foreground">
              This tool is for authorized security testing and research only.
              Always obtain proper authorization before testing any systems.
            </p>
          </div>
        </div>

       <div className="mt-8 border-t border-border/40 pt-8 text-center text-xs text-muted-foreground space-y-2">
  
  <p>
    © {new Date().getFullYear()} DorkHunt. Built with{" "}
    <span className="text-red-500">❤️</span> by{" "}

    <a
      href="https://github.com/d1lie"
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-400 font-medium hover:underline"
    >
      Alastor (d1lie)
    </a>

  </p>

  <p className="text-yellow-400">
    ⚠️ For authorized testing and research only. Use responsibly.
  </p>

</div>
      </div>
    </footer>
  )
}
