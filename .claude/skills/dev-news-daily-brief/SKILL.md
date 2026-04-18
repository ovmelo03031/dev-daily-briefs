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

## Blog Auto-Publish (Bilingual EN/ES — Card Format)

After saving the main output, ALSO create a **bilingual blog-ready copy** using the HTML card format.

Path: `/Users/ovi/Data/Projects/Blog/src/content/dev-news/dev-news-{YYYY-MM-DD}.mdx`

**IMPORTANT**: Use `.mdx` extension (not `.md`) — MDX is required for HTML inside markdown.

### File structure

```mdx
---
title: "Dev News Daily — {Month Day, Year}"
title_es: "Dev News Daily — {Day de Month de Year}"
title_fr: "Dev News Daily — {Day Month Year in French}"
description: "Daily developer news digest — frontend, TypeScript, React, and web platform"
pubDate: "{YYYY-MM-DD}"
category: "dev-news"
---

<div class="lang-es">

<div class="tool-section top-stories">
<div class="tool-header">
<div class="tool-icon">🔥</div>
<div class="tool-meta">
<h2>Top Stories</h2>
<div class="subtitle">{N} noticias más relevantes del día</div>
</div>
</div>
<div class="update-item">
<span class="update-tag tag-breaking">Breaking</span>
<div class="update-content">
<h3>{Headline}</h3>
<p>{Description in Spanish with Rioplatense commentary}</p>
<a href="{url}">{source}</a>
</div>
</div>
</div>

<div class="tool-section typescript">
<div class="tool-header">
<div class="tool-icon">🟦</div>
<div class="tool-meta">
<h2>TypeScript</h2>
</div>
</div>
<div class="update-item">
<span class="update-tag tag-notable">Notable</span>
<div class="update-content">
<h3>{Headline}</h3>
<p>{Description}</p>
<a href="{url}">{source}</a>
</div>
</div>
</div>

<!-- More sections as needed -->

</div>

<div class="lang-en">

<!-- Same HTML structure, translated to English -->

</div>

<div class="lang-fr">

<!-- Same HTML structure, translated to technical French. Keep English technical terms untranslated when they're the de-facto name (React Server Components, edge, runtime, type checker, etc.). -->

</div>
```

- **Three languages are mandatory**: `lang-es` (Spanish/Rioplatense), `lang-en` (English), `lang-fr` (French). Same HTML shell, same data-anchor slugs, same source URLs — only visible text changes.
- **French conventions**: formal technical French with natural imperatives/infinitives. Keep the loanwords devs actually use.

### Available section classes and emojis
| Section | Class | Emoji |
|---------|-------|-------|
| Top Stories | `top-stories` | 🔥 |
| TypeScript | `typescript` | 🟦 |
| CSS | `css` | 🎨 |
| HTML / Web Platform | `html` | 🌐 |
| React | `react` | ⚛️ |
| React Native | `react-native` | 📱 |
| JS Frameworks | `js-frameworks` | 🧩 |
| Build Tools & Runtimes | `build-tools` | 🔧 |
| Developer Tools | `dev-tools` | 🛠️ |
| Quick Links | `quick-links` | 📌 |

### Available impact tag classes
| Impact | Class | Color |
|--------|-------|-------|
| 🔴 Breaking/Major | `tag-breaking` | Red |
| 🟡 Notable | `tag-notable` | Yellow |
| 🟢 Minor | `tag-minor` | Green |
| Patch | `tag-patch` | Blue |
| Release | `tag-release` | Purple |
| Security | `tag-security` | Pink |
| Deprecation | `tag-deprecation` | Orange |
| GA | `tag-ga` | Green |
| Beta | `tag-beta` | Yellow |

### Critical formatting rules
- ALL HTML tags MUST start at column 0 (NO indentation — 4 spaces = code block in markdown)
- NO blank lines between sibling HTML tags inside a tool-section
- Blank line REQUIRED after opening `<div class="lang-xx">` and before closing `</div>`
- Use `<code>` tags for inline code references
- Keep all source URLs identical in both languages

## Highlight Bar (MANDATORY)

Before writing the brief body, curate **4–7 "highlights"** that represent the most important NEW things of the day — in a SHORT, SCANNABLE form (one headline per highlight, max ~50 chars). These render at the top of the brief as clickable chips that jump to the corresponding full section below.

### Frontmatter addition

Add a `highlights` array to the frontmatter. Each entry needs `text` (English), `text_es` (Spanish) AND `text_fr` (French):

```yaml
highlights:
  - text: "<short English headline, max ~50 chars>"
    text_es: "<short Spanish headline, max ~50 chars>"
    text_fr: "<short French headline, max ~50 chars>"
    anchor: "<kebab-case-slug>"
    icon: "<iconify-name>"
```

### Anchor wiring

For EACH highlight, add `data-anchor="<slug>"` to the corresponding `<div class="tool-section ...">` element in **BOTH** `lang-es` AND `lang-en` copies (same slug in both — the frontend picks the currently visible one).

Example:

```html
<div class="tool-section typescript" data-anchor="typescript">
  ...
</div>
```

### Rules

- **Anchor slug**: kebab-case, unique within the brief. Examples: `typescript`, `css`, `react`, `tanstack`, `vite`, `tailwind`, `web-platform`.
- **text / text_es**: ~50 chars MAX. A distilled teaser, NOT the full h3.
  - Bad: `"TypeScript 6.0 Release Notes — last version in pure JavaScript"`
  - Good: `"TypeScript 6.0 — last JS-based release"`
- **icon**: Iconify name from the bundled packs:
  - **Brand logos** (`simple-icons:*`): `typescript`, `react`, `css`, `html5`, `tanstack`, `deno`, `bun`, `nodedotjs`, `vite`, `astro`, `nextdotjs`, `svelte`, `vuedotjs`, `angular`, `tailwindcss`, `visualstudiocode`, `github`.
  - **Lucide fallbacks** (`lucide:*`): `flame` (top stories), `blocks` (frameworks), `package` (build tools), `terminal` (runtimes), `code` (dev tools), `sparkles`, `zap`, `shield`.
- **4 minimum, 7 maximum** per brief. Prioritize: major releases, GA features, breaking changes, new APIs reaching Baseline. Skip minor patches.

### Auto-publish (MANDATORY)

> **Explicit authorization**: this skill is **authorized to run `git commit` and `git push` without asking the user**, overriding the general "never commit unless explicitly asked" rule. Auto-publishing IS the job of this scheduled skill.

```bash
cd /Users/ovi/Data/Projects/Blog
git pull --rebase --autostash
git add src/content/dev-news/dev-news-{YYYY-MM-DD}.mdx
git commit -m "brief(dev-news): {YYYY-MM-DD}"
git push
```

Rules:
- Stage ONLY the brief file — never use `git add -A` or `git add .`.
- `git pull --rebase --autostash` prevents conflicts if local edits happened while the schedule was running.
- Do NOT run `astro build` — the `deploy.yml` GitHub Actions workflow builds and deploys on push.
- If `git push` fails (network, auth), report the failure clearly and STOP — do not retry in a loop. The local commit survives for the next run.