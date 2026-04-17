---
name: brief-new
description: Generate a new Dev Daily Brief entry for an existing category (ai-coding, backend-fullstack, dev-news). Triggers on "new brief", "nuevo brief", "add brief", "generate a brief", "agregá un brief", "brief de hoy", "daily brief".
---

# Skill — `brief-new`

Generates a single brief entry that plugs into the Dev Daily Briefs Astro site at `/Users/ovi/Data/Projects/Blog`.

## When to invoke

User says things like:
- "Crea un brief de ai-coding con [topics]"
- "Generame el brief de dev-news de hoy"
- "Add a backend brief covering [topic]"
- "Nuevo brief sobre React y TanStack"

## Step 1 — Gather inputs

Before writing anything, you MUST know:

1. **Category** — must be one of: `ai-coding`, `backend-fullstack`, `dev-news`. If the user doesn't specify, ASK.
2. **Date** — default to today (`date +%Y-%m-%d`). If the user gives a date, use theirs.
3. **Topics to cover** — if user didn't provide them, ASK (or run the category's daily-brief skill to fetch fresh content).

## Step 2 — File location and extension

| Category | Path | Extension |
|----------|------|-----------|
| `ai-coding` | `src/content/ai-coding/ai-coding-{YYYY-MM-DD}.md` | **`.md`** |
| `backend-fullstack` | `src/content/backend-fullstack/backend-fullstack-{YYYY-MM-DD}.mdx` | **`.mdx`** |
| `dev-news` | `src/content/dev-news/dev-news-{YYYY-MM-DD}.mdx` | **`.mdx`** |

The `ai-coding` briefs are `.md` because they use only standard HTML. `dev-news` and `backend-fullstack` use `.mdx` because they may contain JSX components.

## Step 3 — Frontmatter schema (MANDATORY)

```yaml
---
title: "<English title, e.g. 'AI Coding Tools — Daily Brief | April 17, 2026'>"
title_es: "<Spanish title, e.g. 'AI Coding Tools — Resumen Diario | 17 de Abril de 2026'>"
description: "<One-line description matching the category>"
pubDate: "<YYYY-MM-DD>"
category: "<ai-coding | backend-fullstack | dev-news>"
highlights:
  - text: "<short English headline, max ~50 chars>"
    text_es: "<short Spanish headline, max ~50 chars>"
    anchor: "<kebab-case-slug>"
    icon: "<iconify-name>"
  # 4 to 7 highlights total
---
```

Description defaults per category:
- `ai-coding`: "Daily digest of AI coding tools and model launches"
- `backend-fullstack`: "Daily backend and fullstack news digest for senior developers"
- `dev-news`: "Daily developer news digest — frontend, TypeScript, React, and web platform"

## Step 4 — Body layout (bilingual)

Wrap the ENTIRE body in two language divs. Spanish first, English second:

```markdown
<div class="lang-es">

<!-- Spanish content using HTML with CSS classes. Stats-bar, tool-sections, highlights -->

</div>
<div class="lang-en">

<!-- Same structure, translated to English -->

</div>
```

### Critical formatting rules

- `<div class="lang-es">` and `<div class="lang-en">` MUST start at column 0
- ALL HTML tags MUST start at column 0 (NO indentation — 4 spaces = markdown code block)
- NO blank lines between sibling HTML tags inside a tool-section
- Blank line REQUIRED after the opening `<div class="lang-xx">` and before the closing `</div>`
- Keep source URLs identical across languages — only translate visible text

## Step 5 — HTML building blocks

### Stats bar (optional, `ai-coding` uses it)

```html
<div class="stats-bar">
<div class="stat-card"><div class="stat-num">{N}</div><div class="stat-label">{Label}</div></div>
<!-- 3 to 4 cards -->
</div>
```

### Tool section (the main block, repeats per topic)

```html
<div class="tool-section {section-class}" data-anchor="{slug}">
<div class="tool-header">
<div class="tool-icon">{emoji}</div>
<div class="tool-meta">
<h2>{Section title}</h2>
<div class="publisher">{optional publisher}</div>
<div class="subtitle">{optional subtitle}</div>
</div>
<span class="version-badge">{optional version}</span>
</div>
<div class="update-item">
<span class="update-tag tag-{kind}">{Tag}</span>
<div class="update-content">
<h3>{Update headline}</h3>
<p>{Description, 1–3 sentences}</p>
<a href="{source-url}">{source label}</a>
</div>
</div>
<!-- repeat update-item as many times as needed -->
</div>
```

**IMPORTANT**: `data-anchor` MUST be present on tool-sections that are referenced by any entry in `highlights[].anchor`. Both the `lang-es` and `lang-en` copies carry the SAME anchor slug (the frontend selects the visible one).

### Section classes per category

**ai-coding**: `claude` | `openai` | `gemini` | `copilot` | `vscode`

**backend-fullstack**: `top-stories` | `runtimes` | `frameworks` | `databases` | `cloud` | `architecture` | `fullstack` | `security` | `quick-links`

**dev-news**: `top-stories` | `typescript` | `css` | `html` | `react` | `react-native` | `js-frameworks` | `build-tools` | `dev-tools` | `quick-links`

Any OTHER class can be added too — but you'll need to also add CSS for it in `public/styles/ai-coding-brief.css` (left-border accent + icon mapping). For one-off use, pick the closest existing class.

### Update tag classes

| Tag | Class | Meaning |
|-----|-------|---------|
| Breaking | `tag-breaking` | Major change, action required |
| Notable | `tag-notable` | Significant but not urgent |
| Feature | `tag-feature` | New functionality |
| Fix | `tag-fix` | Bug fix |
| Model | `tag-model` | New AI model |
| Preview | `tag-preview` | Early/beta release |
| Security | `tag-security` | CVE / security-relevant |
| Update | `tag-update` | Minor iteration |
| Release | `tag-release` | Version bump |
| GA | `tag-ga` | General availability |
| Beta | `tag-beta` | Beta release |
| Deprecation | `tag-deprecation` | Feature retirement |
| Patch | `tag-patch` | Patch release |
| Minor | `tag-minor` | Small change |

### Model launches table (ai-coding only)

```html
<div class="model-table-wrapper" data-anchor="model-timeline">
<h2>&#x1F680; Model Launches Timeline</h2>
<div class="subtitle-text">Major launches from the last 7 days, newest first</div>
<table>
<thead><tr><th>Date</th><th>Model</th><th>Provider</th><th>Tier</th><th>Type</th><th>Notes</th></tr></thead>
<tbody>
<tr class="recent-row">
<td>{date}</td>
<td><strong>{model}</strong></td>
<td><span class="provider-badge provider-{slug}">{provider}</span></td>
<td><span class="tier tier-{level}">{S+/S/A+/A/B+}</span></td>
<td><span class="weight-badge weight-{type}">{Open/Proprietary/Upcoming}</span></td>
<td>{benchmarks and notes}</td>
</tr>
</tbody>
</table>
<div class="tier-legend">
<span><strong class="tier tier-splus">S+</strong> Frontier</span>
<span><strong class="tier tier-s">S</strong> Major</span>
<span><strong class="tier tier-aplus">A+</strong> Notable</span>
<span><strong class="tier tier-a">A</strong> Solid</span>
<span><strong class="tier tier-bplus">B+</strong> Incremental</span>
</div>
</div>
```

Provider slugs: `anthropic` | `openai` | `google` | `meta` | `xai` | `mistral` | `alibaba` | `deepseek` | `moonshot` | `zhipu` | `bytedance` | `minimax`. Use `recent-row` for shipped models, `upcoming-row` for rumored/expected.

### Trends block (close the brief)

```html
<div class="trends">
<h2>&#x1F4CA; Notable Trends</h2>
<p>{2 to 4 sentence synthesis}</p>
</div>
```

## Step 6 — Highlights (MANDATORY)

Curate **4–7 highlights** of the day's most important items. Each must match a `data-anchor` on an actual tool-section / model-table in the body (both `lang-es` and `lang-en` copies).

### Icon taxonomy

- **Brand logos** (`simple-icons:*`): `anthropic`, `openai`, `google`, `googlegemini`, `githubcopilot`, `visualstudiocode`, `meta`, `mistralai`, `alibabacloud`, `bytedance`, `minimax`, `typescript`, `react`, `css`, `html5`, `tanstack`, `deno`, `bun`, `nodedotjs`, `vite`, `cloudflare`, `apachekafka`, `tailwindcss`, `docker`, `kubernetes`, `amazonwebservices`, `redis`, `postgresql`, `astro`, `nextdotjs`, `svelte`, `vuedotjs`, `angular`, `prisma`, `mongodb`, `github`, `x`.
- **Lucide fallbacks** (`lucide:*`): `flame` (top stories), `rocket` (launches), `shield` (security), `atom` (xAI / unknown AI), `moon` (Moonshot), `brain-circuit` (Zhipu), `search` (DeepSeek), `terminal`, `blocks`, `database`, `cloud`, `layers`, `server`, `package`, `newspaper`, `sparkles`, `zap`.

If you need an icon that's NOT in the extracted set (see `/Users/ovi/Data/Projects/Blog/public/icons/`), add it via:

```bash
node -e "const fs=require('fs');const p=require('/Users/ovi/Data/Projects/Blog/node_modules/@iconify-json/{pack}/icons.json');const i=p.icons['{name}'];fs.writeFileSync('/Users/ovi/Data/Projects/Blog/public/icons/{pack}/{name}.svg',\`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 \${i.width||p.width} \${i.height||p.height}'>\${i.body}</svg>\`);"
```

## Step 7 — Quality checklist

Before writing the file, verify:

- [ ] Frontmatter has `title`, `title_es`, `description`, `pubDate`, `category`, `highlights` (4–7 items)
- [ ] Both `<div class="lang-es">` and `<div class="lang-en">` blocks present, start at column 0
- [ ] All tool-sections referenced in `highlights[].anchor` have `data-anchor="<slug>"` in BOTH language copies
- [ ] Every `update-item` has one `span.update-tag` AND one `div.update-content` with `h3`, `p`, and `a`
- [ ] All source URLs are identical between languages
- [ ] Each highlight text is ≤ 50 chars (scan-friendly)
- [ ] No indentation inside `.lang-es` / `.lang-en` blocks
- [ ] File extension matches category (`.md` for ai-coding, `.mdx` for others)

## Step 8 — Publish

```bash
cd /Users/ovi/Data/Projects/Blog && \
  git add src/content/{category}/{category}-{YYYY-MM-DD}.{md,mdx} && \
  git commit -m "brief: {category} {YYYY-MM-DD}" && \
  git push
```

If the user asks for a dry run, skip the push and show a diff instead.

## Reference

- Zod schema: `src/content.config.ts`
- Styles: `public/styles/ai-coding-brief.css`
- Layout: `src/layouts/BlogPost.astro`
- HighlightBar component: `src/components/HighlightBar.astro`
- Example brief with highlights: `src/content/ai-coding/ai-coding-2026-04-17.md`
