import Link from "next/link"
import { ArrowRight, Search, Database, Save, Download, Shield, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute inset-0 scanline opacity-10" />
          
          <div className="container relative py-24 md:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                <Shield className="mr-2 h-4 w-4" />
                For Authorized Security Research
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight leading-[1.1] sm:text-6xl md:text-7xl overflow-visible">
                 Recon Intelligence for{" "}
              <span
                  className="inline-block overflow-visible pb-2 bg-gradient-to-r from-primary via-green-400 to-primary bg-clip-text text-transparent"
                  style={{ textShadow: "0 0 18px rgba(34,255,136,0.25)" }}
                >
                 Bug Hunters
              </span>
              </h1>
              
              <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
                Organize curated dorks and generate custom search queries for authorized 
                security research and bug bounty reconnaissance.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild className="glow">
                  <Link href="/dork-search">
                    <Search className="mr-2 h-5 w-5" />
                    Start Searching
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" asChild>
                  <Link href="/bug-bounty-dorks">
                    <Database className="mr-2 h-5 w-5" />
                    Explore Bug Bounty Dorks
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8">
                <Button variant="link" asChild>
                  <Link href="#docs">
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border/40 bg-muted/30">
          <div className="container py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary">930+</div>
                <div className="text-sm text-muted-foreground">Curated Dorks</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary">AI</div>
                <div className="text-sm text-muted-foreground">Powered Generation</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-primary">∞</div>
                <div className="text-sm text-muted-foreground">Search Workflows</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need for Recon
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools designed for security researchers and bug bounty hunters
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:glow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Curated Bug Bounty Dorks</h3>
              <p className="text-sm text-muted-foreground">
                Access a comprehensive collection of pre-built dorks for discovering bug bounty programs
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:glow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">AI Assisted Dork Builder</h3>
              <p className="text-sm text-muted-foreground">
                Generate custom search queries using AI for specific vulnerability types and targets
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:glow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Save className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Saved Recon Lists</h3>
              <p className="text-sm text-muted-foreground">
                Organize and save your favorite dorks and generated queries for quick access
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:glow">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Export and Reuse</h3>
              <p className="text-sm text-muted-foreground">
                Export your dorks as TXT or JSON files for use with other security tools
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="border-y border-border/40 bg-muted/30">
          <div className="container py-24">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Simple Workflow
              </h2>
              <p className="text-lg text-muted-foreground">
                Get started in three easy steps
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  1
                </div>
                <h3 className="mb-2 text-xl font-semibold">Search or Generate</h3>
                <p className="text-muted-foreground">
                  Browse curated dorks or use AI to generate custom queries for your target
                </p>
              </div>

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  2
                </div>
                <h3 className="mb-2 text-xl font-semibold">Save Useful Dorks</h3>
                <p className="text-muted-foreground">
                  Bookmark individual dorks or save entire result sets as named lists
                </p>
              </div>

              <div className="relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  3
                </div>
                <h3 className="mb-2 text-xl font-semibold">Export for Recon</h3>
                <p className="text-muted-foreground">
                  Export your dorks and integrate them into your security testing workflow
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="container py-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Common Use Cases
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover what you can find with DorkHunt
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <Target className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Disclosure Pages</h3>
              <p className="text-sm text-muted-foreground">
                Find responsible disclosure policies and security contact information
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <Target className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Security.txt Files</h3>
              <p className="text-sm text-muted-foreground">
                Locate security.txt files with bug bounty program details
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <Target className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Exposed Documentation</h3>
              <p className="text-sm text-muted-foreground">
                Discover publicly accessible API docs and technical documentation
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <Target className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-semibold">Login Portals</h3>
              <p className="text-sm text-muted-foreground">
                Identify admin panels and authentication endpoints for testing
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border/40 bg-muted/30">
          <div className="container py-24 text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Start Hunting?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join security researchers using DorkHunt for authorized reconnaissance
              </p>
              <Button size="lg" asChild className="glow">
                <Link href="/dork-search">
                  <Search className="mr-2 h-5 w-5" />
                  Start Searching Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
