---
name: brief-new
description: Generate a new Dev Daily Brief entry for an existing category (ai-coding, backend-fullstack, dev-news). Triggers on "new brief", "nuevo brief", "add brief", "generate a brief", "agregá un brief", "brief de hoy", "daily brief".
---

# Skill — `brief-new`

Generates a single brief entry (JSON) for the Dev Daily Briefs Astro site at `/Users/ovi/Data/Projects/Blog`. The site renders briefs via Astro components — **you emit pure data, the site composes the design**.

## When to invoke

User says things like:
- "Crea un brief de ai-coding con [topics]"
- "Generame el brief de dev-news de hoy"
- "Add a backend brief covering [topic]"
- "Nuevo brief sobre React y TanStack"

## Step 1 — Gather inputs

Before writing anything, you MUST know:

1. **Category** — one of `ai-coding`, `backend-fullstack`, `dev-news`. If the user doesn't specify, ASK.
2. **Date** — default to today (`date +%Y-%m-%d`). Use the user's date if provided.
3. **Topics to cover** — if the user doesn't provide them, ASK or invoke the category's daily-brief skill to fetch fresh content.

## Step 2 — File location

**All categories use `.json`.** Legacy `.md` / `.mdx` briefs continue to render but all new briefs are JSON.

| Category | Path |
|----------|------|
| `ai-coding` | `src/content/ai-coding/ai-coding-{YYYY-MM-DD}.json` |
| `backend-fullstack` | `src/content/backend-fullstack/backend-fullstack-{YYYY-MM-DD}.json` |
| `dev-news` | `src/content/dev-news/dev-news-{YYYY-MM-DD}.json` |

## Step 3 — Top-level schema

```json
{
  "title":       { "es": "<es>", "en": "<en>", "fr": "<fr>" },
  "description": { "es": "<es>", "en": "<en>", "fr": "<fr>" },
  "pubDate":     "YYYY-MM-DD",
  "category":    "<ai-coding | backend-fullstack | dev-news>",
  "highlights":  [ /* 4–7 entries */ ],
  "tools":       [ /* see Tools per category */ ],
  "notable_trends": [
    { "es": "<es>", "en": "<en>", "fr": "<fr>" }
  ]
}
```

Every i18n field accepts `string` OR `{ es?, en, fr? }`. **`en` is required**; `es` and `fr` fall back to `en` via the language toggle when missing. Always provide all three when feasible.

**ai-coding only** also accepts top-level `stats`, `models`, `model_timeline_anchor` — see the ai-coding-daily-brief skill for those schemas.

### Description defaults per category

- `ai-coding`: "Daily digest of AI coding tools and model launches"
- `backend-fullstack`: "Daily backend and fullstack news digest for senior developers"
- `dev-news`: "Daily developer news digest — frontend, TypeScript, React, and web platform"

## Step 4 — Highlights (MANDATORY: 4–7 entries)

```json
"highlights": [
  {
    "text":   { "es": "~50 chars", "en": "~50 chars", "fr": "~50 chars" },
    "anchor": "kebab-case-slug",
    "icon":   "simple-icons:<brand>"
  }
]
```

- `anchor`: **must match** a `tool.anchor` OR an `update.id` (OR `model_timeline_anchor` in ai-coding) elsewhere in the file. Deep-links from the home page and chips resolve by this slug.
- `text`: max ~50 chars per language. Distilled teaser, not the full headline.
- `icon`: Iconify name. See the full catalog in the category-specific daily-brief skill.

**Priorities**: major releases, GA features, breaking changes, security CVEs, new product launches. Skip minor patches.

## Step 5 — Tools per category

Every category organizes content under `tools[]`. Each tool maps to a rendered `tool-section` on the page.

### ai-coding — 5 core tools + adjacent launches

Themes: `claude` | `openai` | `gemini` | `copilot` | `vscode`

Always include all 5 core tools (Claude Code / OpenAI Codex / GPT / Gemini / GitHub Copilot) even if a tool has no updates that day (empty `updates` array is OK). Add extra tool entries for **adjacent vendor launches** (e.g. Claude Design, OpenAI Canvas) — reuse the closest vendor theme.

### dev-news — per-category sections

Themes: `top-stories` | `typescript` | `css` | `html` | `react` | `react-native` | `js-frameworks` | `build-tools` | `dev-tools` | `quick-links`

### backend-fullstack — per-category sections

Themes: `top-stories` | `runtimes` | `frameworks` | `databases` | `cloud` | `architecture` | `fullstack` | `security` | `quick-links`

### Tool shape

```json
{
  "id":         "claude-code",
  "name":       "Claude Code",
  "publisher":  "Anthropic",
  "theme":      "claude",
  "icon_emoji": "🤖",
  "version":    "v2.1.114",
  "anchor":     "claude-code",
  "updates": [ /* see Update shape */ ]
}
```

- `publisher`, `version`, `icon_emoji`, `anchor` — all optional.
- If a highlight's `anchor` matches `tool.anchor`, the chip scrolls to the whole section. If it matches an `update.id`, it scrolls to that specific update.

### Update shape

```json
{
  "id":    "optional-anchor-target",
  "tag":   "feature",
  "title": { "es": "<es>", "en": "<en>", "fr": "<fr>" },
  "body_html": {
    "es": "<p>Inline HTML: <strong>bold</strong>, <em>italic</em>, <code>code</code>.</p>",
    "en": "<p>Inline HTML: <strong>bold</strong>, <em>italic</em>, <code>code</code>.</p>",
    "fr": "<p>HTML inline : <strong>gras</strong>, <em>italique</em>, <code>code</code>.</p>"
  },
  "date":   "16 abr 2026",
  "source": { "url": "https://...", "label": "anthropic.com" }
}
```

- `tag` is a free-form string mapped to CSS `.update-tag.tag-<value>`. Common values:
  - **ai-coding**: `feature` | `fix` | `model` | `preview` | `security` | `update`
  - **dev-news** / **backend-fullstack**: `breaking` | `notable` | `minor` | `patch` | `release` | `security` | `deprecation` | `ga` | `beta`
- Labels are auto-translated per language. For a custom label, add `tag_label: { es, en, fr }`.
- `body_html` allows simple inline HTML (`<p>`, `<strong>`, `<em>`, `<code>`, `<a>`). Keep it short (1–3 sentences).

## Step 6 — Notable Trends (close the brief)

```json
"notable_trends": [
  { "es": "<2–3 sentence synthesis>", "en": "<synthesis>", "fr": "<synthesis>" }
]
```

One or two paragraphs that tie together the day's items. Grounded — no speculation.

## Step 7 — Quality checklist

Before writing the file, verify:

- [ ] `en` is present on EVERY i18n field (`title`, `description`, each `highlight.text`, each `update.title`, each `update.body_html`, each `notable_trends[]`)
- [ ] Every `highlight.anchor` matches a `tool.anchor`, an `update.id`, or `model_timeline_anchor` (for ai-coding)
- [ ] Each update has a `source` with a valid URL OR a `date` (minimum provenance)
- [ ] 4–7 highlights total, each text ≤ ~50 chars per language
- [ ] No duplicate updates across tool-sections
- [ ] For `es`, use Rioplatense Spanish (voseo: "ojo con esto", "es una locura")
- [ ] For `fr`, use formal technical French; keep devops/tech loanwords devs actually use (`runtime`, `edge`, `React Server Components`, `type checker`, `prompt caching`)

## Step 8 — Publish

```bash
cd /Users/ovi/Data/Projects/Blog
git pull --rebase --autostash
git add src/content/{category}/{category}-{YYYY-MM-DD}.json
git commit -m "brief({category}): {YYYY-MM-DD}"
git push
```

- Stage ONLY the brief file — never `git add -A`.
- Do NOT run `astro build` — the `deploy.yml` GitHub Actions workflow builds and deploys on push.
- If the user asks for a dry run, skip the commit/push and show the JSON diff instead.

## Reference

- Zod schema: `src/content.config.ts`
- Styles: `public/styles/ai-coding-brief.css`
- Layout: `src/layouts/BlogPost.astro`
- Renderer: `src/components/brief/BriefStructured.astro` + `StatsBar`, `ToolSection`, `UpdateItem`, `ModelTable`, `NotableTrends`
- Example JSON brief: `src/content/ai-coding/ai-coding-2026-04-19.json`
- Category-specific daily-brief skills (fetch logic + extended tables): `.claude/skills/{ai-coding,dev-news,backend-fullstack}-daily-brief/SKILL.md`
