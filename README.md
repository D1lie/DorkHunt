# DorkHunt 🔍

> Recon Intelligence for Bug Hunters & Security Researchers

Hey, so I built this thing called DorkHunt because I was tired of keeping my dorks in random text files scattered across my machine. If you do bug bounty or security research, you know the pain. This tool is basically my attempt to fix that.

---

## 🛑 Heads up about AI Generation

The AI dork generation feature needs an NVIDIA API key to work. I'm just one person running this, so I can't foot the bill for everyone's API usage. Here's how to get it working:

- Grab a free API key from [NVIDIA NIM](https://nvidia.com) and drop it in your `.env.local`
- If you want to help keep the public instance alive with a donated key, hit me up — would genuinely appreciate it

---

## 🎯 What it does

- **Curated Dorks** — a big list of hand-picked queries for finding bug bounty programs, exposed files, admin panels, and more
- **AI Generation** — type what you're looking for and the AI writes the dorks for you. Works surprisingly well
- **Target Scoping** — enter a domain and every dork automatically gets `site:yourdomain.com` added. Keeps you in scope
- **Category Filters** — filter by API, Admin/Login, Config Files, PII, etc. so you're not scrolling through 1000 unrelated queries
- **Save & Export** — save your favorites, build lists, export to `.txt` or `.json` for your other tools

---

## 🛠️ Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- DeepSeek V3.1 + Mistral Devstral via NVIDIA NIM (with automatic fallback)

---

## 🚀 Running it locally

```bash
git clone https://github.com/D1lie/DorkHunt.git
cd DorkHunt
npm install
```

Copy the env file and add your key:

```bash
cp .env.example .env.local
```

```env
NVIDIA_API_KEY=your_key_here

# optional fallback key (different model, kicks in if primary fails)
NVIDIA_API_KEY_FALLBACK=your_fallback_key_here
```

Then just run:

```bash
npm run dev
```

---

## 👨‍💻 About me

I'm alastor, a security researcher and bug hunter from India 🇮🇳. I spend most of my time doing web app pentesting, vulnerability research, and chasing bounties. Built this tool because I needed it, figured others might too.

If you want to collab, have feedback, or just want to talk shop — find me on GitHub.

---

## ☕ Buy me a coffee

If this tool helped you find something cool, I won't say no to a coffee.

<a href="https://buymeacoffee.com/d1lie" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

---

## ⚠️ Legal

This is for authorized security testing only. Only run these queries against targets you have permission to test. I'm not responsible for what you do with it — be ethical about it.

---

made with ❤️ by alastor
