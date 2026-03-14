"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface DocSection {
  id: string;
  title: string;
}

const sections: DocSection[] = [
  { id: "overview", title: "Overview" },
  { id: "what-is-dorkhunt", title: "What is DorkHunt" },
  { id: "core-features", title: "Core Features" },
  { id: "getting-started", title: "Getting Started" },
  { id: "dork-search", title: "Dork Search" },
  { id: "bug-bounty-dorks", title: "Bug Bounty Dorks" },
  { id: "target-filtering", title: "Target Filtering" },
  { id: "ai-generation", title: "AI Dork Generation" },
  { id: "categories", title: "Categories" },
  { id: "saved-lists", title: "Saved Lists" },
  { id: "export-options", title: "Export Options" },
  { id: "search-engines", title: "Search Engines" },
  { id: "keyboard-shortcuts", title: "Keyboard Shortcuts" },
  { id: "best-practices", title: "Best Practices" },
  { id: "example-workflows", title: "Example Workflows" },
  { id: "safety-scope", title: "Safety & Scope" },
  { id: "faq", title: "FAQ" },
];

export function DocsSidebar() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-black/80 border border-green-500/30 backdrop-blur-sm"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 text-green-400" />
        ) : (
          <Menu className="w-5 h-5 text-green-400" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-black/40 backdrop-blur-md border-r border-green-500/20 overflow-y-auto custom-scrollbar transition-transform duration-300 z-40",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6">
          <h3 className="text-sm font-semibold text-green-400 mb-4 uppercase tracking-wider">
            Documentation
          </h3>
          <nav className="space-y-1">
            {sections.map(({ id, title }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200",
                  activeSection === id
                    ? "bg-green-500/10 text-green-400 border-l-2 border-green-500"
                    : "text-gray-400 hover:text-green-400 hover:bg-green-500/5"
                )}
              >
                {title}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
