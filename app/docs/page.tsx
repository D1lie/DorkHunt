"use client";

import { ArrowUp, BookOpen, Zap, Target, Download } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsSection } from "@/components/docs-section";
import { DocsCodeBlock } from "@/components/docs-code-block";
import { DocsCallout } from "@/components/docs-callout";
import { DocsTable } from "@/components/docs-table";
import { BrandLogo } from "@/components/brand-logo";
import { useState, useEffect } from "react";

export default function DocsPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Navbar />
      <DocsSidebar />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-xs text-green-400 mb-6">
              <BookOpen className="w-3 h-3" />
              For authorized security research only
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <BrandLogo variant="icon-only" size="desktop" showGlow={true} />
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                DorkHunt <span className="text-green-400">Documentation</span>
              </h1>
            </div>
            <p className="text-xl text-gray-400">
              Curated docs for using DorkHunt in authorized security research and bug bounty reconnaissance.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: BookOpen, label: "Curated Dorks", value: "1000+" },
                { icon: Zap, label: "AI Generation", value: "Enabled" },
                { icon: Target, label: "Target Scoping", value: "Active" },
                { icon: Download, label: "Export Formats", value: "2" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4"
                >
                  <stat.icon className="w-5 h-5 text-green-400 mb-2" />
                  <div className="text-xs text-gray-500">{stat.label}</div>
                  <div className="text-sm font-semibold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Overview */}
          <DocsSection id="overview" title="Overview">
            <p>
              Welcome to DorkHunt! If you're a bug bounty hunter or security researcher, you know that reconnaissance is where every good finding starts. DorkHunt is designed to make that process faster, smarter, and way more organized.
            </p>
            <p>
              Think of it as your personal dork library and workshop. Instead of maintaining scattered text files or bookmarks, you get a clean interface to browse thousands of curated search queries, generate new ones with AI, and keep everything scoped to your authorized targets. Whether you're hunting for exposed admin panels, API documentation, or security disclosure pages, DorkHunt helps you stay organized and efficient.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Browse</h4>
                <p className="text-sm text-gray-400">Explore thousands of hand-picked dorks organized by category</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Generate</h4>
                <p className="text-sm text-gray-400">Let AI create custom dorks based on what you're looking for</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-green-400 mb-2">Export</h4>
                <p className="text-sm text-gray-400">Save your favorite queries and export them for later use</p>
              </div>
            </div>
          </DocsSection>

          {/* What is DorkHunt */}
          <DocsSection id="what-is-dorkhunt" title="What is DorkHunt">
            <p>
              At its core, DorkHunt is a search query management tool built specifically for security researchers. You know those Google dorks you've been collecting in random text files? This is where they live now.
            </p>
            <p>
              But it's more than just a collection. DorkHunt helps you discover new queries, organize them by what they find, and automatically scope them to your target domains. It's like having a research assistant that remembers all your favorite recon techniques and applies them consistently.
            </p>
            <p className="font-semibold text-white mt-4">The tool has two main areas:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><span className="text-green-400 font-semibold">Dork Search</span> - Your main workspace. Browse default dorks, generate custom ones with AI, or combine both. Perfect when you need flexibility and want to experiment with different query combinations.</li>
              <li><span className="text-green-400 font-semibold">Bug Bounty Dorks</span> - A focused collection of queries specifically for finding bug bounty programs, security policies, and disclosure pages. Great for program discovery and initial reconnaissance.</li>
            </ul>
          </DocsSection>

          {/* Core Features */}
          <DocsSection id="core-features" title="Core Features">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Curated Dork Library",
                  desc: "Access thousands of pre-built reconnaissance queries organized by category and use case.",
                },
                {
                  title: "AI-Assisted Generation",
                  desc: "Generate custom dorks using AI based on your specific reconnaissance needs.",
                },
                {
                  title: "Target-Aware Scoping",
                  desc: "Automatically apply site:domain operators to focus searches on authorized targets.",
                },
                {
                  title: "Category Filters",
                  desc: "Filter dorks by type: PII, API, Admin/Login, Config Files, and more.",
                },
                {
                  title: "Saved Lists",
                  desc: "Save useful dorks and create named collections for repeated workflows.",
                },
                {
                  title: "Export Options",
                  desc: "Export filtered results to TXT or JSON formats for documentation and reporting.",
                },
                {
                  title: "One-Click Search",
                  desc: "Launch dorks directly in Google, Bing, or DuckDuckGo with a single click.",
                },
                {
                  title: "Search Engine Support",
                  desc: "Multi-engine support for comprehensive reconnaissance coverage.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4 hover:border-green-500/40 transition-colors"
                >
                  <h4 className="font-semibold text-green-400 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </DocsSection>

          {/* Getting Started */}
          <DocsSection id="getting-started" title="Getting Started">
            <DocsCallout type="tip">
              New to dorking? Start with Bug Bounty Dorks to see what's possible. The curated collection gives you a solid foundation before you start creating custom queries.
            </DocsCallout>
            <p className="mt-4">
              Getting up and running with DorkHunt is straightforward. Here's the typical workflow most researchers follow:
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Pick Your Starting Point</h4>
                  <p className="text-sm text-gray-400">Head to Dork Search if you want the full toolkit with AI generation, or jump into Bug Bounty Dorks for a curated collection focused on program discovery. Both work great, just depends on your current goal.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Find What You Need</h4>
                  <p className="text-sm text-gray-400">Use the search bar to filter through existing dorks, or type in a topic like "api documentation" to generate fresh queries with AI. The search is smart - it looks through dork content and categories to surface relevant results.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Scope to Your Target</h4>
                  <p className="text-sm text-gray-400">This is the important part. Enter your authorized target domain in the Target field, and DorkHunt automatically adds site:yourdomain.com to every query. This keeps your recon focused and within scope.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Narrow Down by Category</h4>
                  <p className="text-sm text-gray-400">Looking specifically for admin panels? API endpoints? Config files? Use the category filters to focus on exactly what you're hunting for. It's way faster than scrolling through everything.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 font-semibold">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Use Your Results</h4>
                  <p className="text-sm text-gray-400">Click any dork to launch it in your search engine, copy individual queries, save your favorites to a list, or export everything to a file. Whatever fits your workflow.</p>
                </div>
              </div>
            </div>
          </DocsSection>

          {/* Dork Search */}
          <DocsSection id="dork-search" title="Dork Search">
            <p>
              Dork Search is your main workspace and probably where you'll spend most of your time. It starts by loading a massive collection of curated dorks from our database, but the real power comes from combining these with AI-generated queries tailored to your specific needs.
            </p>
            <h4 className="font-semibold text-white mt-6 mb-3">Understanding the View Modes</h4>
            <p>
              The page has three different modes that control what dorks you see. Think of them as different lenses for viewing your query collection:
            </p>
            <DocsTable
              headers={["Mode", "What You See"]}
              rows={[
                ["Default", "Just the curated dorks from our collection - tried and tested queries that researchers use every day"],
                ["Generated", "Only the AI-generated dorks based on your topic - fresh queries created specifically for what you're looking for"],
                ["All", "Everything combined - both curated and generated dorks merged together and deduplicated"],
              ]}
            />
            <p className="mt-4">
              Here's a pro tip: start in Default mode to see what's available, then generate some custom dorks and switch to All mode. This gives you the best of both worlds - proven queries plus fresh ideas from AI.
            </p>
            <DocsCallout type="note">
              When you apply target scoping, it works across all modes. So whether you're viewing default, generated, or all dorks, your target domain gets applied consistently.
            </DocsCallout>
          </DocsSection>

          {/* Bug Bounty Dorks */}
          <DocsSection id="bug-bounty-dorks" title="Bug Bounty Dorks">
            <p>
              Bug Bounty Dorks is your go-to page when you're looking for programs to participate in or trying to find security contact information for a company. It's a specialized collection focused entirely on finding bug bounty programs, vulnerability disclosure policies, and security team contact details.
            </p>
            <p>
              This collection is particularly useful when you're expanding your target list or researching whether a company has a formal security program. Instead of manually searching for "security.txt" or "responsible disclosure" on every domain, you've got a ready-made toolkit.
            </p>
            <h4 className="font-semibold text-white mt-6 mb-3">What You'll Find Here</h4>
            <DocsCodeBlock
              code={`inurl:security.txt
inurl:"responsible disclosure"
inurl:"bug bounty" reward
inurl:"security" "swag"
site:hackerone.com
site:bugcrowd.com
inurl:"vulnerability disclosure policy"
"report security vulnerability"
"security@" contact
inurl:"hall of fame" security`}
            />
            <p className="mt-4">
              These queries are designed to surface program pages, policy documents, and contact information. You can search within the collection to find specific types of queries, copy individual dorks for quick use, save your favorites, or export the whole set for offline reference.
            </p>
            <DocsCallout type="tip">
              Combine these dorks with company names or domains to quickly check if they have a bug bounty program. For example, use the target field to scope all queries to a specific company's domain.
            </DocsCallout>
          </DocsSection>

          {/* Target Filtering */}
          <DocsSection id="target-filtering" title="Target Filtering">
            <p>
              Target filtering is probably the most important feature in DorkHunt, and here's why: it keeps you in scope. When you're doing security research, staying within your authorized boundaries isn't just good practice - it's essential.
            </p>
            <p>
              The Target field automatically adds the site: operator to every single dork you're viewing. This means instead of running broad searches across the entire internet, you're focusing exclusively on your authorized target domain.
            </p>
            <h4 className="font-semibold text-white mt-6 mb-3">How It Actually Works</h4>
            <p>Let's say you're testing example.com. Here's what happens:</p>
            <DocsCodeBlock
              code={`You enter: example.com

Original dork:
inurl:admin

What you actually search:
site:example.com inurl:admin

Another example:
Original: ext:env
Scoped: site:example.com ext:env`}
            />
            <h4 className="font-semibold text-white mt-6 mb-3">Smart Normalization</h4>
            <p>
              DorkHunt is smart about how it handles your target input. You can paste in a full URL, and it'll extract just the domain:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>https://example.com → example.com</li>
              <li>http://example.com/ → example.com</li>
              <li>example.com/path → example.com</li>
            </ul>
            <p className="mt-4">
              If a dork already has a site: operator, DorkHunt replaces it with your target. This prevents weird double-scoping issues and keeps everything clean.
            </p>
            <DocsCallout type="tip">
              The original dork is always preserved internally. If you clear the target field, you'll see the dorks in their original form. This makes it easy to switch between scoped and unscoped views.
            </DocsCallout>
          </DocsSection>

          {/* AI Generation */}
          <DocsSection id="ai-generation" title="AI Dork Generation">
            <p>
              This is where things get interesting. Instead of being limited to pre-made dorks, you can describe what you're looking for and let AI generate custom queries for you. It's powered by DeepSeek V3.1 AI and works surprisingly well.
            </p>
            <h4 className="font-semibold text-white mt-6 mb-3">How to Use It</h4>
            <p>
              Just type what you're hunting for in the search box. Be specific but natural - you're talking to an AI that understands context. Here are some examples:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
              <li>"swagger api documentation"</li>
              <li>"exposed database backups"</li>
              <li>"jenkins ci/cd dashboards"</li>
              <li>"wordpress admin login pages"</li>
              <li>"exposed git repositories"</li>
            </ul>
            <h4 className="font-semibold text-white mt-6 mb-3">What Happens Behind the Scenes</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="text-green-400">→</div>
                <div>You enter your topic and hit generate</div>
              </div>
              <div className="flex gap-3">
                <div className="text-green-400">→</div>
                <div>DorkHunt sends your request to a secure backend API</div>
              </div>
              <div className="flex gap-3">
                <div className="text-green-400">→</div>
                <div>DeepSeek analyzes your topic and creates relevant search queries</div>
              </div>
              <div className="flex gap-3">
                <div className="text-green-400">→</div>
                <div>Results come back, get cleaned up and deduplicated</div>
              </div>
              <div className="flex gap-3">
                <div className="text-green-400">→</div>
                <div>Your new dorks appear in the list, ready to use</div>
              </div>
            </div>
            <h4 className="font-semibold text-white mt-6 mb-3">Real Example</h4>
            <DocsCodeBlock
              code={`Topic: "swagger api documentation"

Generated dorks:
inurl:swagger-ui
inurl:api/docs
inurl:api-docs.json
intitle:"API Documentation"
inurl:graphql
inurl:openapi.json
inurl:/v1/api-docs
inurl:swagger.json`}
            />
            <DocsCallout type="note">
              If the AI service is temporarily unavailable (quota limits, API issues, etc.), don't worry - DorkHunt still works perfectly with the default curated dorks. You just won't be able to generate new ones until the service is back.
            </DocsCallout>
          </DocsSection>

          {/* Categories */}
          <DocsSection id="categories" title="Categories">
            <p>
              DorkHunt automatically organizes dorks into categories based on what they're designed to find. This makes it way easier to focus on specific types of reconnaissance without scrolling through hundreds of unrelated queries.
            </p>
            <p>
              The categorization happens automatically using keyword pattern matching. When a dork contains certain terms, it gets tagged with the appropriate category. You can then filter by these categories to see only what's relevant to your current task.
            </p>
            <h4 className="font-semibold text-white mt-6 mb-3">Available Categories</h4>
            <DocsTable
              headers={["Category", "What It Finds", "Example Dork"]}
              rows={[
                ["Admin/Login", "Admin panels, login pages, dashboards, authentication endpoints", "inurl:admin/login"],
                ["API", "API documentation, endpoints, Swagger/GraphQL interfaces", "inurl:api/v1"],
                ["Config Files", "Configuration files, environment variables, settings files", "ext:env"],
                ["Public Keys", "SSH keys, API tokens, credentials, certificates", "inurl:id_rsa"],
                ["PII", "Personal information, email lists, contact data", "filetype:xls email"],
                ["Sensitive Data", "Passwords, database dumps, backups, sensitive documents", "inurl:backup.sql"],
                ["Specific URLs", "Well-known files like security.txt, robots.txt, sitemap.xml", "inurl:security.txt"],
                ["Other", "Everything else that doesn't fit the above categories", "site:example.com"],
              ]}
            />
            <h4 className="font-semibold text-white mt-6 mb-3">How Categorization Works</h4>
            <p>
              The system looks for specific keywords in each dork. For example, if a dork contains "admin", "login", "signin", or "dashboard", it gets tagged as Admin/Login. If it has "api", "swagger", "graphql", or "endpoint", it becomes an API dork.
            </p>
            <DocsCallout type="tip">
              Use categories to speed up your workflow. Hunting for exposed APIs? Filter to just the API category. Looking for config files? Switch to Config Files. It's much faster than searching through everything.
            </DocsCallout>
          </DocsSection>

          {/* Saved Lists */}
          <DocsSection id="saved-lists" title="Saved Lists">
            <p>
              As you work with DorkHunt, you'll discover certain dorks that work really well for your targets or testing style. Instead of searching for them every time, you can save them to lists for quick access later.
            </p>
            <p>
              Think of saved lists as your personal dork collections. Maybe you have a "Web App Testing" list with your go-to queries for finding admin panels and APIs. Or a "Program Discovery" list with dorks for finding bug bounty programs. Whatever makes sense for your workflow.
            </p>
            <h4 className="font-semibold text-white mt-6 mb-3">Two Ways to Save</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">Save Individual Dorks</h5>
                <p className="text-sm text-gray-400">See a dork you like? Click the save icon on its card. It gets added to your saved collection instantly. Perfect for building your toolkit one query at a time.</p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">Save Entire Result Sets</h5>
                <p className="text-sm text-gray-400">Found a great combination of filters and searches? Save all visible dorks as a named list. Great for preserving specific reconnaissance workflows you want to repeat.</p>
              </div>
            </div>
            <DocsCallout type="note">
              Your saved lists live in your browser's localStorage. They'll stick around between sessions, but they're tied to your device and browser. If you clear your browser data or switch devices, you'll need to export and re-import your lists.
            </DocsCallout>
          </DocsSection>

          {/* Export Options */}
          <DocsSection id="export-options" title="Export Options">
            <p>
              Sometimes you need to take your dorks offline - maybe for a report, to share with a team, or just to have a backup. DorkHunt lets you export your filtered results in two formats, each useful for different purposes.
            </p>
            <h4 className="font-semibold text-white mt-6 mb-3">Choose Your Format</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">TXT Format</h5>
                <p className="text-sm text-gray-400 mb-3">Simple, clean, one dork per line. Perfect for command-line tools, scripts, or just keeping a readable list. No frills, just the queries.</p>
                <DocsCodeBlock
                  code={`site:example.com inurl:admin
site:example.com inurl:login
site:example.com ext:env
site:example.com inurl:api/docs`}
                />
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">JSON Format</h5>
                <p className="text-sm text-gray-400 mb-3">Structured data with metadata like categories. Great if you're building automation or want to import the data into other tools.</p>
                <DocsCodeBlock
                  code={`[
  {
    "dork": "site:example.com inurl:admin",
    "category": "Admin/Login"
  },
  {
    "dork": "site:example.com ext:env",
    "category": "Config Files"
  }
]`}
                />
              </div>
            </div>
            <p className="mt-4">
              Here's the cool part: exports respect all your active filters. So if you've filtered to just API dorks, scoped to a target, and searched for "swagger", your export will contain exactly what you're seeing on screen. No surprises.
            </p>
            <DocsCallout type="tip">
              Export your dork lists before starting a test and include them in your final report. It documents your methodology and makes your findings more credible.
            </DocsCallout>
          </DocsSection>

          {/* Search Engines */}
          <DocsSection id="search-engines" title="Search Engines">
            <p>
              Once you've found the perfect dork, you need to actually run it. DorkHunt makes this dead simple - just click a dork and it opens in your search engine of choice. No copy-pasting, no manual URL building.
            </p>
            <h4 className="font-semibold text-white mt-6 mb-3">Supported Search Engines</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { name: "Google", desc: "The gold standard. Most comprehensive index and best operator support. Usually your first choice." },
                { name: "Bing", desc: "Microsoft's search engine. Sometimes surfaces different results than Google. Worth checking for thorough recon." },
                { name: "DuckDuckGo", desc: "Privacy-focused with no tracking. Good for sensitive searches or when you want to avoid personalized results." },
              ].map((engine, i) => (
                <div
                  key={i}
                  className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4"
                >
                  <h5 className="font-semibold text-green-400 mb-2">{engine.name}</h5>
                  <p className="text-sm text-gray-400">{engine.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4">
              Click any dork row or hit the search button to launch it in a new tab. The dork opens with your selected search engine, ready to go. If you've applied target scoping, that's included automatically.
            </p>
            <DocsCallout type="tip">
              Different search engines index different content and update at different rates. For thorough reconnaissance, try the same dork across multiple engines. You might be surprised what one finds that another misses.
            </DocsCallout>
          </DocsSection>

          {/* Keyboard Shortcuts */}
          <DocsSection id="keyboard-shortcuts" title="Keyboard Shortcuts">
            <p>
              Speed up your workflow with keyboard shortcuts for common actions.
            </p>
            <DocsTable
              headers={["Shortcut", "Action"]}
              rows={[
                ["Enter", "Generate dorks (when in search input)"],
                ["Ctrl/Cmd + K", "Open command palette (placeholder)"],
                ["Ctrl/Cmd + Shift + C", "Copy all visible dorks"],
                ["Enter on focused row", "Launch search in new tab"],
                ["Escape", "Clear search or close modals"],
              ]}
            />
          </DocsSection>

          {/* Best Practices */}
          <DocsSection id="best-practices" title="Best Practices">
            <p>
              Here are some lessons learned from researchers who use DorkHunt regularly. These aren't strict rules, just practical advice that'll make your recon more effective and keep you out of trouble.
            </p>
            <div className="space-y-4 mt-6">
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">1. Always Scope to Authorized Assets</h5>
                <p className="text-sm text-gray-400">
                  This should go without saying, but it's worth repeating: only use the Target field with domains you have explicit permission to test. DorkHunt makes it easy to stay in scope, but it's your responsibility to make sure you're authorized. When in doubt, don't run the search.
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">2. Start Broad, Then Get Specific</h5>
                <p className="text-sm text-gray-400">
                  Don't jump straight to super specific queries. Start with general reconnaissance dorks to get a feel for the target's surface area, then use category filters to drill down into interesting areas. You might discover attack surfaces you didn't even know to look for.
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">3. Build Your Personal Toolkit</h5>
                <p className="text-sm text-gray-400">
                  As you find dorks that work well for your targets, save them to named lists. Over time, you'll build a personal collection of go-to queries for different scenarios. This is way more valuable than starting from scratch every time.
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">4. Document Your Methodology</h5>
                <p className="text-sm text-gray-400">
                  Export your dork lists and include them in your reports. This shows program managers exactly how you approached reconnaissance and makes your findings more credible. Plus, if you need to reproduce your work later, you'll have a record of what you searched for.
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">5. Mix Default and Generated Dorks</h5>
                <p className="text-sm text-gray-400">
                  The "All" mode exists for a reason. Curated dorks give you proven queries that work, while AI-generated ones give you fresh perspectives. Using both together often surfaces things you'd miss with just one approach.
                </p>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-4">
                <h5 className="font-semibold text-green-400 mb-2">6. Be Respectful with Search Engines</h5>
                <p className="text-sm text-gray-400">
                  Don't hammer search engines with automated requests. Click through dorks manually, take your time, and space out your searches. Search engines have rate limits and terms of service - respect them.
                </p>
              </div>
            </div>
          </DocsSection>

          {/* Example Workflows */}
          <DocsSection id="example-workflows" title="Example Workflows">
            <p>
              Real-world reconnaissance workflows using DorkHunt for different security testing scenarios.
            </p>

            <div className="space-y-6 mt-6">
              {/* Workflow A */}
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
                <h5 className="font-semibold text-green-400 mb-4 text-lg">A. Disclosure Page Hunting</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">1.</div>
                    <div>Navigate to Bug Bounty Dorks page</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">2.</div>
                    <div>Search for "security" or "disclosure" keywords</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">3.</div>
                    <div>Review filtered dorks like inurl:security.txt and "responsible disclosure"</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">4.</div>
                    <div>Launch selected dorks in Google to find program pages</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">5.</div>
                    <div>Save useful dorks to "Disclosure Hunting" list for future use</div>
                  </div>
                </div>
              </div>

              {/* Workflow B */}
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
                <h5 className="font-semibold text-green-400 mb-4 text-lg">B. Targeted Admin Surface Discovery</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">1.</div>
                    <div>Open Dork Search page</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">2.</div>
                    <div>Enter authorized target domain: target.com</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">3.</div>
                    <div>Filter by "Admin/Login" category</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">4.</div>
                    <div>Review scoped dorks like site:target.com inurl:admin</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">5.</div>
                    <div>Export visible results to TXT for systematic testing</div>
                  </div>
                </div>
              </div>

              {/* Workflow C */}
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
                <h5 className="font-semibold text-green-400 mb-4 text-lg">C. API Reconnaissance</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">1.</div>
                    <div>Open Dork Search and enter target domain</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">2.</div>
                    <div>Generate custom dorks with topic: "swagger graphql api docs"</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">3.</div>
                    <div>Switch to "All" mode to combine generated and default API dorks</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">4.</div>
                    <div>Filter by "API" category to focus results</div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-green-400 font-mono">5.</div>
                    <div>Launch searches and document discovered API endpoints</div>
                  </div>
                </div>
              </div>
            </div>
          </DocsSection>

          {/* Safety & Scope */}
          <DocsSection id="safety-scope" title="Safety & Scope">
            <DocsCallout type="warning">
              Let's be crystal clear: DorkHunt is a tool for authorized security research only. It's designed for bug bounty programs, penetration tests where you have written permission, and security assessments within approved scope. This tool does not give you permission to test anything.
            </DocsCallout>
            <div className="mt-6 space-y-4">
              <p>
                Using DorkHunt responsibly isn't just about following rules - it's about being a professional researcher who respects boundaries and builds trust with the security community.
              </p>
              <p className="font-semibold text-white">Here's what responsible use looks like:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Only test systems where you have explicit, written authorization. A bug bounty program page counts. A hunch that "they probably won't mind" does not.</li>
                <li>Read and follow bug bounty program rules carefully. Every program has different scope and rules of engagement. Respect them.</li>
                <li>Don't use dorks to access, download, or exfiltrate sensitive data. Finding something exposed doesn't mean you should grab it. Take a screenshot, document the finding, and report it.</li>
                <li>Report vulnerabilities through proper channels. Use the program's designated reporting method, not Twitter or public disclosure.</li>
                <li>Follow all applicable laws in your jurisdiction. Computer fraud laws vary by country and can be serious. Know your local regulations.</li>
                <li>Be gentle with your reconnaissance. Don't run hundreds of automated searches in rapid succession. Manual, thoughtful searching is more effective anyway.</li>
              </ul>
              <DocsCallout type="note">
                Search engines have their own terms of service regarding automated queries and excessive use. Google, Bing, and DuckDuckGo all have policies about this. Read them and stay within the limits.
              </DocsCallout>
              <p className="mt-4 text-gray-400">
                Remember: the goal is to make the internet more secure, not to cause problems. Use DorkHunt as a force for good, and you'll build a reputation as a trusted researcher that programs want to work with.
              </p>
            </div>
          </DocsSection>

          {/* FAQ */}
          <DocsSection id="faq" title="FAQ">
            <div className="space-y-6">
              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-5">
                <h5 className="font-semibold text-green-400 mb-2">Does DorkHunt store my searches on a server?</h5>
                <p className="text-sm text-gray-400">
                  Saved items and lists are stored locally in your browser using localStorage. No search history or saved dorks are transmitted to or stored on external servers unless you explicitly use backend features like AI generation.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-5">
                <h5 className="font-semibold text-green-400 mb-2">What happens if the AI quota is exceeded?</h5>
                <p className="text-sm text-gray-400">
                  If AI generation is unavailable due to API quota limits or errors, DorkHunt continues to function normally with the curated default dork collections. You can still browse, filter, scope, and export dorks.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-5">
                <h5 className="font-semibold text-green-400 mb-2">Can I scope dorks to a specific domain?</h5>
                <p className="text-sm text-gray-400">
                  Yes, use the Target field to automatically apply site:domain operators to all visible dorks. This ensures your reconnaissance stays focused on authorized assets.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-5">
                <h5 className="font-semibold text-green-400 mb-2">Can I export filtered results?</h5>
                <p className="text-sm text-gray-400">
                  Yes, DorkHunt supports exporting to both TXT and JSON formats. Exports respect all active filters including category selection, search terms, and target scoping.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-5">
                <h5 className="font-semibold text-green-400 mb-2">Does DorkHunt modify the original dorks?</h5>
                <p className="text-sm text-gray-400">
                  No, original dorks are preserved internally. Target-aware transformations (adding site: operators) are applied only for display and export purposes. You can always access the original query.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-5">
                <h5 className="font-semibold text-green-400 mb-2">How are categories determined?</h5>
                <p className="text-sm text-gray-400">
                  Categories are automatically inferred based on keyword pattern matching. Dorks containing terms like "admin", "login", or "dashboard" are categorized as Admin/Login, while those with "api", "swagger", or "graphql" are tagged as API.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-5">
                <h5 className="font-semibold text-green-400 mb-2">Can I add my own custom dorks?</h5>
                <p className="text-sm text-gray-400">
                  Currently, you can generate custom dorks using AI or save existing dorks to lists. Direct custom dork addition may be added in future versions. You can also modify the Dorks.txt file directly if you have access to the source.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-sm border border-green-500/20 rounded-lg p-5">
                <h5 className="font-semibold text-green-400 mb-2">Which search engine should I use?</h5>
                <p className="text-sm text-gray-400">
                  Google typically provides the most comprehensive results and best operator support. Bing and DuckDuckGo can offer alternative perspectives and may surface different results. Try multiple engines for thorough reconnaissance.
                </p>
              </div>
            </div>
          </DocsSection>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-green-500/20 text-center text-sm text-gray-500">
            <p>DorkHunt Documentation • For authorized security research only</p>
            <p className="mt-2">Built for bug bounty hunters and security researchers</p>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-green-500/20 border border-green-500/40 hover:bg-green-500/30 transition-all duration-200 backdrop-blur-sm shadow-lg shadow-green-500/20 z-50"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-green-400" />
        </button>
      )}
    </div>
  );
}
