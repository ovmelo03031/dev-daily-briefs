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

#### 1c — Adjacent AI-dev-tool launches (company-level, 5 queries)

The 5 "coding tools" above are intentionally narrow. But vendors routinely ship **new dev-adjacent products** — prototyping, design, agents, canvas-style workflows — that affect how developers work. These get missed by tool-specific queries. Always run a second sweep at the **company level**:

```
- "Anthropic new product launch 2025 2026"       (e.g. Claude Design, Claude Artifacts, new Labs products)
- "OpenAI new developer tool launch 2025 2026"   (e.g. Canvas, Operator, new agent runtimes)
- "Google AI new developer product 2025 2026"    (e.g. AI Studio updates, Jules, new Gemini products)
- "Microsoft GitHub AI developer product 2025 2026" (e.g. Copilot Workspace, Spark, new agent tools)
- "AI coding IDE launch 2025 2026"                (new entrants: Cursor, Windsurf, Zed, etc.)
```

#### 1d — Primary fetch URLs

For each tool AND each vendor, fetch the primary release/changelog page directly when available. **Corporate blogs are mandatory** — they catch new product launches (like Claude Design) that tool-specific release-notes pages miss.

```
Tool-specific release notes:
- Claude Code:   https://docs.anthropic.com/en/release-notes/claude-code
- OpenAI Codex:  https://github.com/openai/codex/releases
- GPT models:    https://platform.openai.com/docs/models
- Gemini:        https://cloud.google.com/gemini/docs/release-notes
- Copilot:       https://github.blog/changelog/ (filter: copilot)
                 https://code.visualstudio.com/updates

Corporate news / product launches (MANDATORY — catches adjacent launches):
- Anthropic:     https://www.anthropic.com/news
- OpenAI:        https://openai.com/blog
- Google AI:     https://blog.google/technology/ai/
- GitHub:        https://github.blog/
- Microsoft Dev: https://devblogs.microsoft.com/

Chinese labs:
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

## Blog Auto-Publish — JSON output (NEW format)

The blog now renders ai-coding briefs from **structured JSON data** via Astro components, NOT from hand-written HTML. This dramatically cuts token cost: you emit pure data, the site composes the design.

Save to: `/Users/ovi/Data/Projects/Blog/src/content/ai-coding/ai-coding-{YYYY-MM-DD}.json`

> Legacy `.md` briefs still work — but all NEW briefs must be JSON.

### Top-level schema

```json
{
  "title":       { "es": "<es>", "en": "<en>", "fr": "<fr>" },
  "description": { "es": "<es>", "en": "<en>", "fr": "<fr>" },
  "pubDate":     "YYYY-MM-DD",
  "category":    "ai-coding",
  "highlights":  [ /* 4–7 entries, see below */ ],
  "stats":       { "tools_tracked": N, "updates_found": "N+", "models_cataloged": N, "providers_covered": N },
  "tools":       [ /* see Tools section */ ],
  "models":      [ /* see Models section */ ],
  "model_timeline_anchor": "model-timeline",
  "notable_trends": [
    { "es": "<es>", "en": "<en>", "fr": "<fr>" },
    { "es": "<es>", "en": "<en>", "fr": "<fr>" }
  ]
}
```

Every i18n field accepts either a **string** (applies to all languages) or an object `{ es, en, fr }`. **`en` is required**, `es` and `fr` are optional — if missing, the UI toggle falls back to `en` automatically. Write all three whenever possible.

### Highlights (MANDATORY: 4–7 entries)

Distilled teasers shown as clickable chips at the top of the brief. Each chip deep-links to the matching `tool.anchor` / `update.id` / `model_timeline_anchor` below.

```json
"highlights": [
  {
    "text":   { "es": "~50 chars", "en": "~50 chars", "fr": "~50 chars" },
    "anchor": "claude-code",
    "icon":   "simple-icons:anthropic"
  }
]
```

- `anchor`: kebab-case, must match a `tool.anchor` OR an `update.id` OR `model_timeline_anchor` elsewhere in the file.
- `icon`: Iconify name. Brand logos (`simple-icons:*`): `anthropic`, `openai`, `google`, `googlegemini`, `githubcopilot`, `visualstudiocode`, `meta`, `mistralai`, `alibabacloud`, `bytedance`, `minimax`, `typescript`, `react`, `tanstack`, `deno`, `bun`, `nodedotjs`, `vite`, `cloudflare`, `tailwindcss`, `docker`, `kubernetes`, `amazonwebservices`, `redis`, `postgresql`, `astro`, `nextdotjs`, `svelte`, `vuedotjs`, `angular`, `prisma`, `mongodb`, `github`, `x`. Lucide fallbacks (`lucide:*`): `flame`, `rocket`, `shield`, `atom`, `moon` (Moonshot), `brain-circuit` (Zhipu), `search` (DeepSeek), `terminal`, `blocks`, `sparkles`, `zap`.
- **Prioritize**: new model launches, GA features, major version bumps, security CVEs, breaking changes. Skip minor patches.

### Tools (5 core + adjacent launches)

**Core 5** (always present, even if empty): Claude Code, OpenAI Codex, GPT, Gemini, GitHub Copilot.

**Adjacent launches** (add as ADDITIONAL tool entries when relevant): whenever Anthropic / OpenAI / Google / Microsoft / GitHub ship a NEW DEV-ADJACENT product (prototyping, design, agents, canvas, workspace), add it as its own `tool` entry in the same array. This was specifically why the April 17 brief missed **Claude Design** — that launch did NOT fit any of the 5 core tools but deserved its own section. Reuse an existing theme that matches the vendor's brand:

| Vendor      | Reuse theme | Example products |
|-------------|-------------|-------------------|
| Anthropic   | `claude`    | Claude Code, Claude Design, Claude Artifacts |
| OpenAI      | `openai`    | Codex CLI, Canvas, Operator, Apps SDK |
| Google      | `gemini`    | Gemini Code Assist, Jules, AI Studio |
| GitHub      | `copilot`   | Copilot, Copilot Workspace, Spark |
| Microsoft   | `vscode`    | VS Code, Edit, Dev Home |

If a product is from a new vendor with no matching theme (e.g. Cursor, Windsurf, Zed), reuse `vscode` for IDE-style or `copilot` for agent/workspace-style until a dedicated theme is added to the CSS.

Example `tools` array:

```json
"tools": [
  {
    "id":         "claude-code",
    "name":       "Claude Code",
    "publisher":  "Anthropic",
    "theme":      "claude",
    "icon_emoji": "🤖",
    "version":    "v2.1.114",
    "anchor":     "claude-code",
    "updates": [
      {
        "id":    "claude-opus-47",
        "tag":   "model",
        "title": { "es": "<es>", "en": "<en>", "fr": "<fr>" },
        "body_html": {
          "es": "<p>Markup HTML inline permitido: <strong>bold</strong>, <em>italic</em>, <code>code</code>, enlaces manuales.</p>",
          "en": "<p>Inline HTML allowed: <strong>bold</strong>, <em>italic</em>, <code>code</code>, manual links.</p>",
          "fr": "<p>HTML inline autorisé : <strong>gras</strong>, <em>italique</em>, <code>code</code>, liens manuels.</p>"
        },
        "date":   "16 abr 2026",
        "source": { "url": "https://...", "label": "anthropic.com" }
      }
    ]
  }
]
```

- `theme`: one of `claude`, `openai`, `gemini`, `copilot`, `vscode`. Drives the accent gradient.
- `tag`: one of `feature`, `fix`, `model`, `preview`, `security`, `update`. The component translates the label per language.
- `body_html`: short HTML paragraph per language. Keep to inline elements (`<p>`, `<strong>`, `<em>`, `<code>`, `<a>`). The renderer trusts this content — never inject untrusted input.
- `id`: optional. Add it only when a highlight chip needs to jump to a specific update. Otherwise the anchor is the `tool.anchor`.

### Models (Model Launches Timeline)

```json
"models": [
  {
    "date":           "2026-04-18",
    "name":           "Claude Opus 4.7",
    "provider":       "anthropic",
    "provider_label": "Anthropic",
    "tier":           "splus",
    "weight":         "proprietary",
    "notes":          { "es": "<es>", "en": "<en>", "fr": "<fr>" },
    "row_kind":       "recent"
  }
]
```

- `provider`: one of `anthropic`, `openai`, `google`, `meta`, `xai`, `mistral`, `alibaba`, `deepseek`, `moonshot`, `zhipu`, `bytedance`, `minimax`. Drives the badge color.
- `tier`: one of `splus`, `s`, `aplus`, `a`, `bplus` (rendered as S+ / S / A+ / A / B+).
- `weight`: one of `open` (open-weight), `proprietary`, `upcoming` (rumored / not yet released).
- `row_kind`: optional. `recent` highlights the row; `upcoming` dims it. Defaults based on `weight`.
- Sort chronologically, newest first. Upcoming/rumored rows at the bottom.

### Quality checks before saving

- [ ] `en` is present on every i18n field
- [ ] `highlights[].anchor` each matches a `tool.anchor`, an `update.id`, or `model_timeline_anchor`
- [ ] Sources cited on every update (one `source` per update minimum, or a clear date)
- [ ] No duplicates across tools (same release mentioned twice)
- [ ] `notable_trends` has 1–3 short paragraphs grounded in the items actually found
- [ ] If web search found nothing for a tool, the `tool.updates` array is empty (don't hallucinate — empty arrays are fine)

### Auto-publish (MANDATORY)

> **Explicit authorization**: this skill is **authorized to run `git commit` and `git push` without asking the user**, overriding the general "never commit unless explicitly asked" rule. Auto-publishing IS the job of this scheduled skill.

```bash
cd /Users/ovi/Data/Projects/Blog
git pull --rebase --autostash
git add src/content/ai-coding/ai-coding-{YYYY-MM-DD}.json
git commit -m "brief(ai-coding): {YYYY-MM-DD}"
git push
```

Rules:
- Stage ONLY the brief file — never use `git add -A` or `git add .`.
- `git pull --rebase --autostash` prevents conflicts if local edits happened while the schedule was running.
- Do NOT run `astro build` — the `deploy.yml` GitHub Actions workflow builds and deploys on push.
- If `git push` fails (network, auth), report the failure clearly and STOP — do not retry in a loop. The local commit survives for the next run.