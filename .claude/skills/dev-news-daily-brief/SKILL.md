---
name: dev-news-daily-brief
description: Daily developer news digest: TypeScript, CSS, HTML, React, React Native, frameworks, and web platform updates.
---

You are a senior frontend/fullstack developer news curator. Search the web for the LATEST news and updates (from the last 24-48 hours) in these categories:

## Categories to Cover

1. **TypeScript** — new releases, RFCs, language features, ecosystem updates
2. **CSS** — new specs, browser support, CSS-in-JS news, Tailwind updates
3. **HTML / Web Platform** — new APIs, browser features, Web Components
4. **React** — React core updates, React 19+, RSC, ecosystem (Next.js, Remix, TanStack)
5. **React Native** — new releases, Expo updates, New Architecture, ecosystem
6. **JavaScript Frameworks** — Angular, Vue, Svelte, Solid, Astro, Qwik updates
7. **Build Tools & Runtimes** — Vite, Bun, Deno, Node.js, esbuild, Turbopack
8. **Developer Tools** — VS Code, browser DevTools, testing tools, linters

## Instructions

1. Search for each category using web search with current date context (April 2026)
2. Focus on NEWS from the last 48 hours — not tutorials or old content
3. If a category has no recent news, skip it (don't force content)
4. For each news item include:
   - **Headline** with source link
   - **1-2 sentence summary** of what happened and why it matters
   - **Impact level**: 🔴 Breaking/Major | 🟡 Notable | 🟢 Minor

## Output Format

Generate a self-contained HTML file with beautiful styling. The page must be dark-themed, modern, and easy to scan in a browser. Use inline CSS only (no external dependencies).

Design requirements:
- Dark background (#0f1117), white text, accent color #7c3aed (purple)
- Impact badges: 🔴 red pill, 🟡 yellow pill, 🟢 green pill — styled as colored badges
- "Top Stories" section visually distinct (card layout with border-left accent)
- Category sections with emoji headers, subtle separator lines
- Quick Links as a two-column grid of styled anchor tags
- Responsive, max-width 860px, centered, comfortable padding
- A thin colored header bar with the title and date
- Monospace font for code snippets, system-ui for body
- Each news item as a card with headline (clickable link), summary, and impact badge

Structure the HTML content matching this layout:

```
<header> — title + date
<section id="top-stories"> — 2-3 featured cards
<section id="by-category"> — subsections per category
<section id="quick-links"> — 2-col grid of links
<footer> — editorial note
```

Keep it concise but comprehensive. The goal is a 2-minute read that covers everything a senior frontend developer needs to know today.

Use Rioplatense Spanish for any commentary or editorial notes (e.g., "Esto es ENORME para el ecosistema", "Ojo con esto").

Save the output to /Users/ovi/Data/Schedule/DevNews/ as dev-news-{YYYY-MM-DD}.md. Create the directory if it doesn't exist.

## Blog Auto-Publish — JSON output (NEW format)

The blog renders dev-news briefs from **structured JSON data** via Astro components, NOT from hand-written HTML. Skill emits pure data, site composes design.

Save to: `/Users/ovi/Data/Projects/Blog/src/content/dev-news/dev-news-{YYYY-MM-DD}.json`

> Legacy `.mdx` briefs still render — but all NEW briefs must be JSON.

### Top-level schema

```json
{
  "title":       { "es": "<es>", "en": "<en>", "fr": "<fr>" },
  "description": { "es": "<es>", "en": "<en>", "fr": "<fr>" },
  "pubDate":     "YYYY-MM-DD",
  "category":    "dev-news",
  "highlights":  [ /* 4–7 entries, see below */ ],
  "tools":       [ /* one entry per section, see below */ ],
  "notable_trends": [
    { "es": "<es>", "en": "<en>", "fr": "<fr>" }
  ]
}
```

`stats`, `models`, and `model_timeline_anchor` are **not used** in dev-news briefs (no model launches). Omit those fields.

Every i18n field accepts either a **string** or `{ es?, en, fr? }`. `en` is required; `es` and `fr` are optional — missing language falls back to `en`.

### Highlights (MANDATORY: 4–7 entries)

```json
"highlights": [
  {
    "text":   { "es": "~50 chars", "en": "~50 chars", "fr": "~50 chars" },
    "anchor": "typescript",
    "icon":   "simple-icons:typescript"
  }
]
```

- `anchor`: must match a `tool.anchor` OR an `update.id` elsewhere in the file.
- `icon`: Iconify name. Brand logos (`simple-icons:*`): `typescript`, `react`, `css`, `html5`, `tanstack`, `deno`, `bun`, `nodedotjs`, `vite`, `astro`, `nextdotjs`, `svelte`, `vuedotjs`, `angular`, `tailwindcss`, `visualstudiocode`, `github`. Lucide fallbacks (`lucide:*`): `flame` (top stories), `blocks` (frameworks), `package` (build tools), `terminal` (runtimes), `code` (dev tools), `sparkles`, `zap`, `shield`.
- **Prioritize**: major releases, GA features, breaking changes, new APIs reaching Baseline. Skip minor patches.

### Tools (one entry per category section)

Unlike ai-coding, dev-news sections map to **content categories** (top-stories, TypeScript, CSS, React, etc.) rather than specific products. Each tool entry is a section.

```json
"tools": [
  {
    "id":         "top-stories",
    "name":       "Top Stories",
    "theme":      "top-stories",
    "icon_emoji": "🔥",
    "anchor":     "top-stories",
    "updates": [
      {
        "id":    "ts-6-release",
        "tag":   "breaking",
        "title": { "es": "<es>", "en": "<en>", "fr": "<fr>" },
        "body_html": {
          "es": "<p>Comentario Rioplatense con <strong>bold</strong> y <code>code</code>.</p>",
          "en": "<p>Description with <strong>bold</strong> and <code>code</code>.</p>",
          "fr": "<p>Description avec <strong>gras</strong> et <code>code</code>.</p>"
        },
        "source": { "url": "https://...", "label": "typescriptlang.org" }
      }
    ]
  }
]
```

**Available `theme` values** (map to CSS classes `.tool-section.<theme>`):

| Section               | `theme`        | `icon_emoji` |
|-----------------------|----------------|--------------|
| Top Stories           | `top-stories`  | 🔥 |
| TypeScript            | `typescript`   | 🟦 |
| CSS                   | `css`          | 🎨 |
| HTML / Web Platform   | `html`         | 🌐 |
| React                 | `react`        | ⚛️ |
| React Native          | `react-native` | 📱 |
| JS Frameworks         | `js-frameworks`| 🧩 |
| Build Tools & Runtimes| `build-tools`  | 🔧 |
| Developer Tools       | `dev-tools`    | 🛠️ |
| Quick Links           | `quick-links`  | 📌 |

**Available `tag` values** (free-form; map to CSS `.update-tag.tag-<value>`):

| Impact           | `tag`         |
|------------------|---------------|
| 🔴 Breaking/Major| `breaking`    |
| 🟡 Notable       | `notable`     |
| 🟢 Minor         | `minor`       |
| Patch            | `patch`       |
| Release          | `release`     |
| Security         | `security`    |
| Deprecation      | `deprecation` |
| GA               | `ga`          |
| Beta             | `beta`        |

Labels are translated automatically per language. If you need a custom label, add `tag_label: { es, en, fr }` to the update.

### Quality checks before saving

- [ ] `en` is present on every i18n field
- [ ] Each `highlights[].anchor` matches a `tool.anchor` or `update.id`
- [ ] Every update has a `source` with a valid URL
- [ ] Skip minor patches — prioritize breaking/major/GA/security
- [ ] Use Rioplatense Spanish for `es` commentary (natural "voseo", e.g. "ojo con esto", "es una locura")
- [ ] Keep English loanwords devs actually use untranslated (`React Server Components`, `edge`, `runtime`, `type checker`, `prompt caching`)

### Auto-publish (MANDATORY)

> **Explicit authorization**: this skill is **authorized to run `git commit` and `git push` without asking the user**, overriding the general "never commit unless explicitly asked" rule. Auto-publishing IS the job of this scheduled skill.

```bash
cd /Users/ovi/Data/Projects/Blog
git pull --rebase --autostash
git add src/content/dev-news/dev-news-{YYYY-MM-DD}.json
git commit -m "brief(dev-news): {YYYY-MM-DD}"
git push
```

Rules:
- Stage ONLY the brief file — never use `git add -A` or `git add .`.
- `git pull --rebase --autostash` prevents conflicts if local edits happened while the schedule was running.
- Do NOT run `astro build` — the `deploy.yml` GitHub Actions workflow builds and deploys on push.
- If `git push` fails (network, auth), report the failure clearly and STOP — do not retry in a loop. The local commit survives for the next run.