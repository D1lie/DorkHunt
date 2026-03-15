# DorkHunt Guidelines

Hey, if you're reading this — welcome to the DorkHunt codebase. This file is here to help you (or future me) understand how things work and what to keep in mind when making changes.

---

## What is DorkHunt?

DorkHunt is a recon tool I built for bug hunters and security researchers. The idea is simple — instead of manually writing Google dorks every time, you get a curated list, an AI generator, and the ability to save and export your dorks for later use.

- Live site: https://dorkhunt.netlify.app
- GitHub: https://github.com/D1lie/DorkHunt
- Built with: Next.js 15, TypeScript, Tailwind CSS, Gemini API
- Still in progress — v1.0 is out but there's more coming

---

## General Rules

A few things I want to keep consistent across the project:

- Don't use absolute positioning unless there's a real reason for it. Flexbox and grid handle most things cleanly.
- Keep files small and focused. If a helper function or component is getting big, split it out.
- Refactor as you go — don't let things get messy.
- If something isn't broken, don't touch it. Especially the core dork logic and API routes.
- The dark hacker aesthetic is intentional. Green on black, monospace for dork text. Keep it that way.

---

## Responsive Design

The app needs to work well on phones too, not just desktops. Here's how I approach it:

- Mobile-first. Start small, then scale up with `sm:`, `md:`, `lg:` breakpoints.
- The navbar collapses into a hamburger menu on mobile. Desktop gets the full nav.
- Buttons stack vertically on small screens and go inline on larger ones.
- Dork cards stay in a single row layout — badge, dork text, action buttons — but the text wraps naturally on mobile.
- Touch targets should be at least 44px so things are actually tappable on a phone.
- Font sizes drop a bit on mobile (`text-xs` or `text-sm`) and go back to normal on desktop.

---

## Design Decisions

The look and feel is intentional — dark, terminal-like, green accents. Here's what drives it:

- Primary green: `hsl(142 76% 36%)`
- Background: near-black `hsl(120 10% 5%)`
- Cards sit on `hsl(120 10% 8%)` — just slightly lighter than the background
- Borders are subtle: `hsl(120 10% 20%)`
- Two fonts: Inter for UI text, JetBrains Mono for dork strings
- The `glow` class adds a green box-shadow — use it on primary CTAs and active states

For components, I'm using shadcn/ui. Don't reinvent the wheel — check `components/ui/` first before building something custom.

---

## How the API Works

There are three API routes:

- `/api/default-dorks` — reads `data/Dorks.txt` and returns the list
- `/api/bug-bounty-dorks` — reads `data/bugbountydorks.txt`
- `/api/generate-dorks` — calls the Gemini API to generate custom dorks

For the Gemini integration, you need a `GEMINI_API_KEY` in your `.env.local`. Without it, the AI generation won't work but everything else still does — the curated dorks load fine.

The model defaults to `gemini-2.0-flash` but you can override it with `GEMINI_MODEL` in your env file.

---

## What's Still Being Worked On

A few things aren't perfect yet:

- **AI generation** — it works, but it needs a solid API key. Free-tier Gemini keys hit rate limits pretty fast. I'm looking into a better way to handle this for public users.
- **Mobile layout** — mostly done but still tweaking a few pages.
- **More dorks** — planning to expand the curated lists with more categories.

---

## Project Structure (quick reference)

```
app/
  page.tsx                  → Home / landing page
  dork-search/              → Main search + AI generation page
  bug-bounty-dorks/         → Curated bug bounty dorks
  docs/                     → Documentation
  api/
    default-dorks/          → Serves the default dorks list
    bug-bounty-dorks/       → Serves the bug bounty dorks list
    generate-dorks/         → Gemini AI generation endpoint

components/
  navbar.tsx                → Sticky top nav, mobile hamburger included
  footer.tsx                → Footer with nav links and safety notice
  dork-card-row.tsx         → Single dork row used on bug bounty page
  dork-results-list.tsx     → Dork list used on dork search page
  dork-row-actions.tsx      → The search / copy / save buttons on each row
  dork-search-sidebar.tsx   → Target domain input + category filters

lib/
  dorks.server.ts           → Reads dork files from disk (server-side only)
  gemini.ts                 → Gemini API client
  storage.ts                → Saves/loads dorks from localStorage
  dork-utils.ts             → Helpers for creating and filtering dork items
  dork-categorizer.ts       → Figures out what category a dork belongs to

data/
  Dorks.txt                 → 995+ default dorks
  bugbountydorks.txt        → 129 bug bounty specific dorks
```

---

## One Last Thing

This tool is strictly for **authorized security testing and research**. If you're using it, make sure you have permission to test whatever you're targeting. Don't be that person.
