---
name: ai-coding-daily-brief
description: Daily digest of AI coding tools (Claude Code, Codex, Copilot, Gemini) + global Model Launches timeline including Chinese labs (Qwen, DeepSeek, Kimi, GLM, Doubao, MiniMax).
---

"what's new in Claude Code / Copilot / Gemini / GPT / Codex", "daily AI briefing",
  "latest features for coding assistants", or wants to schedule a recurring digest of
  AI developer tool news. Trigger even for casual phrasing like "anything new in
  Claude Code?" or "catch me up on AI coding tools".
---
 
# AI Coding Tools — Daily Briefing Skill
 
Produces a structured daily digest of the latest features, releases, and announcements
across AI coding assistants AND a **Model Launches timeline** covering all major global providers:

### Part 1 — Coding Tool Updates (5 tools)
 
| Tool | Publisher | What to track |
|------|-----------|---------------|
| **Claude Code** | Anthropic | CLI releases, new commands, MCP integrations, model upgrades |
| **OpenAI Codex / Codex CLI** | OpenAI | Model updates, API changes, CLI releases |
| **GPT models** | OpenAI | GPT-4o, o3, o4 updates relevant to coding/dev |
| **Gemini / Gemini Code Assist** | Google | Gemini 2.x updates, IDE plugin releases |
| **GitHub Copilot** | Microsoft/GitHub | VS Code extension, agent mode, model switches |

### Part 2 — Model Launches Timeline (12+ providers)

Track ALL major model launches globally, including Chinese labs:

| Provider | Models to track | Region |
|----------|----------------|--------|
| **Anthropic** | Claude Opus, Sonnet, Haiku families | US |
| **OpenAI** | GPT-5.x, o-series, Codex models | US |
| **Google** | Gemini Pro, Flash, Flash-Lite | US |
| **Meta** | Llama family, Muse Spark | US |
| **xAI** | Grok family | US |
| **Mistral** | Mistral Small/Large/Medium | EU |
| **Alibaba / Qwen** | Qwen 3.x series (3, 3.5, 3.6-Plus) | 🇨🇳 China |
| **DeepSeek** | V3.x, R1, V4 series | 🇨🇳 China |
| **Moonshot AI / Kimi** | Kimi K2, K2.5 | 🇨🇳 China |
| **Z.ai / Zhipu** | GLM-4.x, GLM-5 series | 🇨🇳 China |
| **ByteDance** | Doubao-Seed series | 🇨🇳 China |
| **MiniMax** | M2, M2.x series | 🇨🇳 China |
 
---
 
## Workflow
 
### Step 1 — Parallel web searches
 
Run searches in parallel. Use date-scoped queries to get fresh results.
Today's date is always available via `date` in bash.

#### 1a — Coding tool searches (5 queries)
 
```
Search queries (customize the date window as needed):
- "Claude Code new features changelog 2025 2026"
- "OpenAI Codex CLI release update 2025 2026"
- "GPT-4o o3 o4 coding features update 2025 2026"
- "Gemini Code Assist new features 2025 2026"
- "GitHub Copilot new features update 2025 2026"
```

#### 1b — Model launch searches (6 queries for Chinese + global models)

```
- "Qwen 3 Alibaba model release 2025 2026 benchmarks"
- "DeepSeek V3 R1 R2 V4 model release 2025 2026"
- "Kimi K2 Moonshot AI model release 2025 2026"
- "GLM Zhipu Z.ai model release 2025 2026"
- "ByteDance Doubao MiniMax AI model release 2025 2026"
- "AI model launches Claude GPT Gemini Llama new releases 2025 2026"
```

#### 1c — Primary changelog URLs
 
For each tool, also fetch the primary release/changelog page directly when available:
 
```
Priority fetch URLs:
- Claude Code:   https://docs.anthropic.com/en/release-notes/claude-code
- OpenAI Codex:  https://github.com/openai/codex/releases  (and https://openai.com/blog)
- GPT models:    https://platform.openai.com/docs/models
- Gemini:        https://cloud.google.com/gemini/docs/release-notes
- Copilot:       https://github.blog/changelog/ (filter: copilot)
                 https://code.visualstudio.com/updates
- Qwen:          https://qwenlm.github.io/blog/
- DeepSeek:      https://api-docs.deepseek.com/updates
- Kimi:          https://github.com/MoonshotAI/Kimi-K2
```
 
### Step 2 — Extract and filter
 
For each tool, extract only items that are:
- **New** (not previously known/announced)
- **Relevant to developers** (coding, IDE, CLI, API surface, model upgrades)
- **Dated within the last 7 days** (for daily runs) or last 30 days (for catch-up runs)
 
Discard: marketing posts, social media noise, vague roadmap hints, repeated items.
 
### Step 3 — Format the digest
 
Render the briefing using the template in `references/digest-template.md`.
 
Key formatting rules:
- One section per tool, with an emoji header
- Each item as a short bullet: `[DATE] Short description — source link`
- If nothing new: write `> No updates found in this period.`
- **Model Launches section**: Add a full HTML table with columns: Date, Model, Provider (color-coded badge), Tier (S+/S/A+/A/B+), and Notes (short description with benchmarks)
  - Include ALL providers: Anthropic, OpenAI, Google, Meta, xAI, Mistral, Alibaba/Qwen, DeepSeek, Moonshot/Kimi, Z.ai/Zhipu, ByteDance, MiniMax
  - Tag open-weight models with an "Open" badge, proprietary with "Proprietary", upcoming with "Upcoming"
  - Sort chronologically (newest first)
  - Include upcoming/rumored models at the bottom with reduced opacity
  - Add a tier guide legend at the bottom of the table
- End with a **"Notable Trends"** paragraph (2–4 sentences) summarising cross-tool themes
 
### Step 4 — Output destination
 
| Mode | Output |
|------|--------|
| Interactive (user is present) | Render the brief as an HTML page and open it in the default browser |
| Scheduled / headless | Generate a viewable HTML report in a configurable output location and print a one-line summary |
| `--slack` flag | Post the summary to Slack webhook (see `scripts/post-to-slack.sh`) |
| `--email` flag | Send the brief as an HTML email via `mail` or `msmtp` (see `references/email-setup.md`) |
 
## Flags & Options
 
| Flag | Meaning |
|------|---------|
| `--days N` | Look back N days instead of the default 7 |
| `--tools claude,copilot` | Limit to specific tools (comma-separated) |
| `--format markdown\|json\|slack` | Output format |
| `--output FILE` | Override output file path |
| `--catchup` | Fetch last 30 days (onboarding / after vacation) |
 
Example invocation from Claude Code:
```
claude "Run the ai-coding-daily-brief skill with --days 3 --tools claude,copilot"
```
 
---
 
## Quality Checks
 
Before printing the digest, verify:
- [ ] At least one source URL is cited per tool section
- [ ] No items older than the requested window
- [ ] No duplicate items across sections
- [ ] "Notable Trends" paragraph is present and grounded in the actual items found
 
If web search returns nothing for a tool, say so explicitly — do not hallucinate updates.

Save the HTML output to /Users/ovi/Data/Schedule/AI/ as ai-coding-daily-brief-{YYYY-MM-DD}.html.

## Blog Auto-Publish

After saving the HTML output, ALSO create a **styled Markdown version** for the blog.
The blog uses Astro which renders raw HTML inside `.md` files natively.

Save to: `/Users/ovi/Data/Projects/Blog/src/content/ai-coding/ai-coding-{YYYY-MM-DD}.md`

### File structure

Start with frontmatter, then use HTML with CSS classes (the blog has styles for these classes):

```markdown
---
title: "AI Coding Tools — Daily Brief | {Month Day, Year}"
description: "Daily digest of AI coding tools and model launches"
pubDate: "{YYYY-MM-DD}"
category: "ai-coding"
---

<div class="stats-bar">
  <div class="stat-card"><div class="stat-num">{N}</div><div class="stat-label">Tools Tracked</div></div>
  <div class="stat-card"><div class="stat-num">{N}+</div><div class="stat-label">Updates Found</div></div>
  <div class="stat-card"><div class="stat-num">{N}</div><div class="stat-label">Models Cataloged</div></div>
  <div class="stat-card"><div class="stat-num">{N}</div><div class="stat-label">Providers Covered</div></div>
</div>

<!-- For EACH tool, use this structure: -->
<div class="tool-section claude"><!-- class: claude | openai | gemini | copilot | vscode -->
  <div class="tool-header">
    <div class="tool-icon">{emoji}</div>
    <div class="tool-meta">
      <h2>{Tool Name}</h2>
      <div class="publisher">{Publisher}</div>
    </div>
    <span class="version-badge">{version}</span>
  </div>

  <div class="update-item">
    <span class="update-tag tag-feature">Feature</span><!-- tag-feature | tag-fix | tag-model | tag-preview | tag-security | tag-update -->
    <div class="update-content">
      <h3>{Update Title}</h3>
      <p>{Description}</p>
      <a href="{url}">{source}</a>
    </div>
  </div>
  <!-- repeat update-item for each update -->
</div>

<!-- Model Launches Table -->
<div class="model-table-wrapper">
  <h2>🚀 Model Launches Timeline</h2>
  <div class="subtitle-text">All major model launches from the last 7 days, sorted newest first</div>
  <table>
    <thead>
      <tr><th>Date</th><th>Model</th><th>Provider</th><th>Tier</th><th>Type</th><th>Notes</th></tr>
    </thead>
    <tbody>
      <tr class="recent-row"><!-- or upcoming-row for rumored -->
        <td>{date}</td>
        <td><strong>{model name}</strong></td>
        <td><span class="provider-badge provider-anthropic">{provider}</span></td><!-- provider-anthropic | provider-openai | provider-google | provider-meta | provider-xai | provider-mistral | provider-alibaba | provider-deepseek | provider-moonshot | provider-zhipu | provider-bytedance | provider-minimax -->
        <td><span class="tier tier-splus">S+</span></td><!-- tier-splus | tier-s | tier-aplus | tier-a | tier-bplus -->
        <td><span class="weight-badge weight-proprietary">Proprietary</span></td><!-- weight-open | weight-proprietary | weight-upcoming -->
        <td>{description}</td>
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

<!-- Notable Trends at the end -->
<div class="trends">
  <h2>📊 Notable Trends</h2>
  <p>{trend paragraph 1}</p>
  <p>{trend paragraph 2}</p>
</div>
```

### Bilingual: wrap everything in language divs

The blog supports EN/ES toggle. Wrap the ENTIRE HTML content in language divs:

```markdown
---
title: "AI Coding Tools — Daily Brief | {Month Day, Year}"
title_es: "AI Coding Tools — Resumen Diario | {Day de Month de Year}"
title_fr: "AI Coding Tools — Résumé Quotidien | {Day Month Year in French}"
description: "Daily digest of AI coding tools and model launches"
pubDate: "{YYYY-MM-DD}"
category: "ai-coding"
---

<div class="lang-es">

{Full Spanish version with HTML structure as described above}

</div>
<div class="lang-en">

{Full English version — same HTML structure, translated to clean technical English. Keep all CSS classes, badges, table structure identical. Only translate text content.}

</div>
<div class="lang-fr">

{Full French version — same HTML structure, translated to clean technical French. Keep all CSS classes, badges, table structure identical. Only translate text content.}

</div>
```

- IMPORTANT: `<div class="lang-es">`, `<div class="lang-en">` and `<div class="lang-fr">` MUST start at column 0
- ALL HTML inside MUST also start at column 0 (no indentation — 4 spaces = code block in markdown)
- NO blank lines between sibling HTML tags inside a tool-section
- Blank line REQUIRED after opening `<div class="lang-xx">` and before closing `</div>`
- **All three languages are mandatory** going forward. Same HTML shell, same data-anchor slugs, same source URLs — only translate visible text.
- **French conventions**: use formal technical French ("vous" is fine, but for a tech audience, dropping the pronoun and using imperative / infinitive is natural: "Cliquez...", "Installer...", etc.). Keep English technical terms untranslated when they're the de-facto name (e.g. `React Server Components`, `edge`, `runtime`, `prompt caching`, `type checker`).

## Highlight Bar (MANDATORY)

Before writing the brief body, curate **4–7 "highlights"** that represent the most important NEW things of the day — in a SHORT, SCANNABLE form (one headline per highlight, max ~50 chars). These render at the top of the brief as clickable chips that jump to the corresponding full section below.

### Frontmatter addition

Add a `highlights` array to the frontmatter. Each entry needs `text` (English), `text_es` (Spanish) AND `text_fr` (French). All three languages share the same array:

```yaml
highlights:
  - text: "<short English headline, max ~50 chars>"
    text_es: "<short Spanish headline, max ~50 chars>"
    text_fr: "<short French headline, max ~50 chars>"
    anchor: "<kebab-case-slug>"
    icon: "<iconify-name>"
```

### Anchor wiring

For EACH highlight, add `data-anchor="<slug>"` to the corresponding `<div class="tool-section ...">` or `<div class="model-table-wrapper">` element in **BOTH** `lang-es` AND `lang-en` copies (same slug in both — the frontend picks the currently visible one).

Example:

```html
<div class="tool-section claude" data-anchor="claude-code">
  ...
</div>
<div class="model-table-wrapper" data-anchor="model-timeline">
  ...
</div>
```

### Rules

- **Anchor slug**: kebab-case, unique within the brief. Examples: `claude-code`, `openai-codex`, `gpt-models`, `gemini-code-assist`, `github-copilot`, `model-timeline`.
- **text / text_es**: ~50 chars MAX. A distilled teaser, NOT the full h3. Examples:
  - Bad: `"Claude Opus 4.7 xhigh Available in Claude Code v2.1.111"`
  - Good: `"Claude Opus 4.7 with xhigh effort level"`
- **icon**: Iconify name from the bundled packs:
  - **Brand logos** (`simple-icons:*`): `anthropic`, `openai`, `google`, `googlegemini`, `githubcopilot`, `visualstudiocode`, `meta`, `mistralai`, `alibabacloud`, `bytedance`, `minimax`, `typescript`, `react`, `css`, `html5`, `tanstack`, `deno`, `bun`, `nodedotjs`, `vite`, `cloudflare`, `apachekafka`, `tailwindcss`, `docker`, `kubernetes`, `amazonwebservices`, `redis`, `postgresql`, `astro`, `nextdotjs`, `svelte`, `vuedotjs`, `angular`, `prisma`, `mongodb`, `github`, `x`.
  - **Lucide fallbacks** (`lucide:*`): `flame` (top stories), `rocket` (launches), `shield` (security), `atom` (xAI / unknown AI lab), `moon` (Moonshot), `brain-circuit` (Zhipu), `search` (DeepSeek), `terminal`, `blocks`, `database`, `cloud`, `layers`, `server`, `package`, `newspaper`, `sparkles`, `zap`.
- **4 minimum, 7 maximum** per brief. Prioritize: new model launches, GA features, major version bumps, security CVEs, breaking changes. Skip minor patches.

### After saving the blog file, auto-publish (MANDATORY):

> **Explicit authorization**: this skill is **authorized to run `git commit` and `git push` without asking the user**, overriding the general "never commit unless explicitly asked" rule. Auto-publishing IS the job of this scheduled skill.

```bash
cd /Users/ovi/Data/Projects/Blog
git pull --rebase --autostash
git add src/content/ai-coding/ai-coding-{YYYY-MM-DD}.md
git commit -m "brief(ai-coding): {YYYY-MM-DD}"
git push
```

Rules:
- Stage ONLY the brief file — never use `git add -A` or `git add .`.
- `git pull --rebase --autostash` prevents conflicts if local edits happened while the schedule was running.
- Do NOT run `astro build` — the `deploy.yml` GitHub Actions workflow builds and deploys on push.
- If `git push` fails (network, auth), report the failure clearly and STOP — do not retry in a loop. The local commit survives for the next run.