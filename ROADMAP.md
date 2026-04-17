# Dev Daily Briefs — Roadmap

Living document. Everything here is ordered by **impact on reader time saved ÷ implementation effort**. Revisit and re-prioritize weekly.

## Guiding principle

Every feature must answer: **does this help a senior developer waste less time finding what matters today?** If not, it goes to the "maybe later" pile.

---

## ✅ Shipped

- Brand icons (Simple Icons + Lucide) replacing random emojis — tool sections, provider badges, category cards.
- Bilingual EN/ES toggle.
- Automated daily generators via Claude Code scheduled tasks (3 categories).
- Scroll reveal animations (IntersectionObserver).
- Quick Links as responsive chip grid.
- HighlightBar — TL;DR chips at top of each brief with smooth-scroll + target flash.
- Mobile-first polish: collapsed header, 2-column stats, horizontal-scroll table.
- Auto-cleanup of briefs older than 30 days (scheduled task).
- Brand assets: logo, favicons (16/32/48/64/192/512), OG image, apple-touch-icon.
- SEO baseline: sitemap, canonical, description, OG tags, Twitter cards.
- Tailwind v4 `@layer base` correctness fix.

---

## 🔥 Tier 1 — High impact, low effort (do these first)

### 1. RSS / Atom feeds per category
**Why**: Power users subscribe once and consume via their RSS reader — zero site visits. The existing `@astrojs/rss` dependency is already installed.
**Scope**:
- `/rss.xml` — combined feed of the 3 categories, 30 latest.
- `/rss/ai-coding.xml`, `/rss/backend-fullstack.xml`, `/rss/dev-news.xml` — per category.
- Each `<item>` contains `title`, `pubDate`, `link`, `description` (from frontmatter), `content:encoded` (full rendered HTML) so reader apps render the full brief.
- Add `<link rel="alternate" type="application/rss+xml">` in `<head>` on every page.
- Footer gains 3 RSS icons linking to the per-category feeds.

**Effort**: ~45 min. **Status**: pending.

### 2. Read-time badge on each brief
**Why**: A reader decides in one second whether to open the brief when they see "5 min read" vs walking in blind.
**Scope**:
- Extract plaintext from each rendered brief's markdown body.
- Compute words ÷ 200 wpm, round up.
- Store in frontmatter `readTime` OR compute at render time via a remark plugin.
- Render next to the date badge in `BlogPost.astro` and in each list item on category pages.
- Distinguish ES and EN copies (visible lang determines the count).

**Effort**: ~30 min. **Status**: pending.

### 3. Tags system
**Why**: Readers who only care about a specific stack (TypeScript, React, AI security, Claude Code, etc.) can filter straight to what matters. Also enables cross-brief links (#8).
**Scope**:
- Add `tags: string[]` to `briefSchema` in `src/content.config.ts`.
- Update `brief-new` skill to require 3–8 tags per brief.
- Update the 3 scheduled-task SKILL.md files with the tag convention.
- New page: `/tags/[tag]` — lists all briefs carrying the tag.
- New page: `/tags/` — tag cloud / index.
- Chip in each brief header showing its tags (clickable → `/tags/{tag}`).

**Effort**: ~2 h. **Status**: pending.

### 4. Static search with Pagefind
**Why**: Find any brief by keyword in < 1s without any server. Pagefind is a build-time static index (no runtime server), ~3 kb client JS, works offline once loaded.
**Scope**:
- Install Pagefind as a dev dependency.
- Run `pagefind --site dist` as a post-build hook.
- Search UI: floating search button → opens modal with keyboard nav (Cmd+K / Ctrl+K).
- Results show brief title, snippet, category, date.

**Effort**: ~1 h. **Status**: pending.

---

## 🟡 Tier 2 — Medium impact or medium effort

### 5. Per-brief dynamic OG images
**Why**: When a brief is shared on Slack/WhatsApp/Twitter/Bluesky, a generic site OG image is meh. A per-brief image with the title + date + category icon looks pro and boosts click-through.
**Scope**:
- Use `satori` + `sharp` (already installed) to render at build time.
- Template: big category icon + title + date + site branding.
- Save as `/og/{category}/{slug}.png` during build.
- Point `og:image` at it in `BaseHead.astro`.

**Effort**: ~2 h. **Status**: pending.

### 6. Weekly rollup briefs
**Why**: "I missed the whole week — catch me up in 5 minutes." A single brief that aggregates the most important items from the 3 categories over the past 7 days.
**Scope**:
- New content category: `weekly`.
- New scheduled task `weekly-rollup`, cron `0 9 * * 0` (Sundays 9am).
- Prompt: read the 21 most recent briefs (7 per category), synthesize a "top 10 things that happened this week" + per-category mini-summary.
- Same HighlightBar + icon system reused.
- Consider collapsing: maybe skip it if `highlights` are already surfacing enough.

**Effort**: ~3 h. **Status**: pending.

### 7. Archive view with month/year filter
**Why**: After 3 months of briefs, the category list gets long. Grouping by month (already partially done in `CategoryList.astro`) plus a year dropdown helps.
**Scope**:
- `/archive/[year]/[month]` route.
- Calendar-style grid or month-by-month scroll.
- Could double as a "what happened in April 2026" reference.

**Effort**: ~1.5 h. **Status**: pending.

### 8. Cross-brief linking
**Why**: "Last Tuesday we covered X" — if we auto-detect mentions of previously covered tools/models, we can linkify them to the prior brief. Feels magical and cross-pollinates reading.
**Scope**:
- Requires #3 (tags) to be implemented first.
- During render, scan for known entities (tool names, model names) and auto-wrap in anchor tags pointing to the latest brief tagged with that entity.
- Tooltip on hover showing the date of the linked brief.

**Effort**: ~3 h (after tags are done). **Status**: blocked on #3.

### 9. Command palette / keyboard shortcuts
**Why**: Power users navigate with keyboard. Cmd+K = search, g then a = ai-coding, g then b = backend, g then d = dev-news, t = toggle lang, r = random brief.
**Scope**:
- Tiny keyboard handler wired to the search modal from #4.
- Small help overlay on `?`.

**Effort**: ~45 min (with #4 done). **Status**: blocked on #4.

### 10. View transitions for navigation
**Why**: Feels premium. Content fades/slides instead of the jarring full-page refresh.
**Scope**:
- Enable Astro's View Transitions via `<ViewTransitions />` in `<head>`.
- Named transitions on key elements (hero, cards).
- Respects `prefers-reduced-motion`.

**Effort**: ~30 min. **Status**: pending.

---

## 🟢 Tier 3 — Nice to have

### 11. Reading progress bar
Thin accent bar at the top of the viewport, fills as you scroll the brief. Pure CSS using `scroll-timeline`.

### 12. Copy-to-clipboard on code blocks
Small button that appears on hover over `<code>` blocks.

### 13. "Ask this brief" LLM widget
Floating chat box with the current brief as context. Feeds the brief's markdown + the question to the Anthropic API. **Cost risk** — cache embeddings per brief and rate-limit.

### 14. Newsletter / email subscription
Integrate Resend or MailerLite. Daily or weekly digest email with the HighlightBar + links. Requires a backend step (edge function or serverless).

### 15. Reading position memory
LocalStorage saves scroll position per brief. When you revisit, resume where you left off. Nice on mobile when you tap away.

### 16. Dark / light theme toggle
Currently dark-only. A light theme would need all the surface colors re-mapped. Low value if the readership is 100% dark-mode devs — validate first.

### 17. Author and contributor attribution
If you ever open the repo to outside contributors, each brief could have an `author` frontmatter field surfaced at the bottom with a link to their bio.

### 18. Bookmark / favorites (client-side)
LocalStorage of favorited briefs, new `/favorites` page that lists them. Zero backend.

### 19. Comments via Giscus
GitHub Discussions powered comments at the bottom of each brief. Free, no DB.

### 20. Audio version (TTS)
Generate a voice version of each brief with a scheduled task using OpenAI/ElevenLabs TTS. Podcast-style RSS. Expensive at scale.

---

## Brainstorm / ideas to validate later

- **Diff view between consecutive briefs in the same category** — "what changed since Monday".
- **Per-brief "related tools" panel** — automatic links to the tool's docs, GitHub, changelog.
- **Trending tracker** — most-mentioned entities over the past 30 days, leaderboard.
- **CLI tool** — `npx dev-daily-briefs` prints the highlights of today's briefs in the terminal.
- **Slack / Discord bot** — post the highlights to a channel every morning.
- **Public analytics dashboard** — GoatCounter / Umami on a `/stats` page showing read counts (if we care).
- **Full archive export as JSON** — `/archive.json` for people who want to build their own tools on top.
- **Browser extension** — sidebar that shows the latest brief whenever you open a tab. (Probably overkill.)

---

## Notes for the next iteration

- **Measure before building #14 or #20** — check if anyone uses RSS or search first. If no one adopts those, low-effort wins aren't finding an audience and we should rethink.
- **Don't scale Claude API usage blindly** — every generator run is N searches + rendering + commit. If we add categories, prompt-cache aggressively and consider batching.
- **Lock the HTML schema** — now that scheduled tasks depend on specific classes (`tool-section claude`, `update-item`, etc.), any rename needs a migration sweep through all briefs. Treat the schema as a public API.
- **Watch bundle size** — Pagefind and view transitions each add a little. Keep the homepage under 50 kb gzipped.
