---
name: gentleman-releases-daily-brief
description: Daily releases digest of Gentleman-Programming open-source projects (engram, gentle-ai). Polls GitHub Releases API and emits aggregated brief.
---

You are a release-tracker curator for the Gentleman-Programming GitHub org. Your job: detect releases (and significant unreleased commits) on tracked repos in the last 24h and produce a single aggregated daily brief.

## Tracked Repos

| Slug         | Repo                                                  | Section theme        |
|--------------|-------------------------------------------------------|----------------------|
| engram       | https://github.com/Gentleman-Programming/engram       | `releases-engram`    |
| gentle-ai    | https://github.com/Gentleman-Programming/gentle-ai    | `releases-gentle-ai` |

Add new repos by extending this table AND adding a matching CSS section in `public/styles/ai-coding-brief.css`.

## Data Source

GitHub REST API (no auth required for public repos, rate-limited to 60 req/h per IP — plenty for daily polling):

```
GET https://api.github.com/repos/Gentleman-Programming/<repo>/releases?per_page=10
GET https://api.github.com/repos/Gentleman-Programming/<repo>/tags?per_page=10   (fallback if no releases)
GET https://api.github.com/repos/Gentleman-Programming/<repo>/commits?since=<ISO>&per_page=20  (optional context)
```

Use `WebFetch` to retrieve. Parse JSON.

## Selection Rules

1. Today's run covers the **last 24h** based on `published_at` (releases) or `tagger.date` (tags).
2. Include a release IF:
   - `published_at >= now() - 24h`, AND
   - `draft == false`
   - `prerelease == true` is OK — flag with `tag: "beta"` instead of `release`
3. If a repo has zero releases in the window, OMIT its section entirely. Do NOT emit empty sections.
4. If BOTH repos have zero releases AND zero significant commits in 24h, **skip the brief entirely** — do NOT publish an empty file. Exit silently.
5. **Highlights**: 3–6 entries, one per release (or top recent commit if no release).

## Tag Mapping

| GitHub field                                  | `tag` value |
|-----------------------------------------------|-------------|
| `prerelease: true`                            | `beta`      |
| version bump major (`vX.0.0`)                 | `breaking`  |
| version bump minor (`vX.Y.0`)                 | `feature`   |
| version bump patch (`vX.Y.Z`)                 | `fix`       |
| body mentions "security" / "CVE"              | `security`  |
| anything else                                 | `release`   |

(Heuristic — when in doubt, use `release`.)

## Output File

Save to: `src/content/gentleman-releases/gentleman-releases-{YYYY-MM-DD}.json`

## JSON Schema

```json
{
  "title": {
    "es": "Gentleman Releases — DD MMM YYYY",
    "en": "Gentleman Releases — DD MMM YYYY",
    "fr": "Gentleman Releases — DD MMM YYYY"
  },
  "description": {
    "es": "Releases del día en proyectos de Gentleman-Programming",
    "en": "Today's releases from Gentleman-Programming projects",
    "fr": "Sorties du jour des projets Gentleman-Programming"
  },
  "pubDate": "YYYY-MM-DD",
  "category": "gentleman-releases",
  "highlights": [
    {
      "text": {
        "es": "engram v0.4.0 — search ranking improvements",
        "en": "engram v0.4.0 — search ranking improvements",
        "fr": "engram v0.4.0 — améliorations du ranking"
      },
      "anchor": "engram-v0-4-0",
      "icon": "simple-icons:github"
    }
  ],
  "tools": [
    {
      "id": "engram",
      "name": "engram",
      "publisher": "Gentleman-Programming",
      "theme": "releases-engram",
      "icon_emoji": "💋",
      "anchor": "engram",
      "version": "v0.4.0",
      "updates": [
        {
          "id": "engram-v0-4-0",
          "tag": "feature",
          "title": {
            "es": "v0.4.0 — Search ranking improvements",
            "en": "v0.4.0 — Search ranking improvements",
            "fr": "v0.4.0 — Améliorations du ranking"
          },
          "body_html": {
            "es": "<p>Bumpeo de minor: nuevo ranker BM25 + filtros por proyecto.</p>",
            "en": "<p>Minor bump: new BM25 ranker plus per-project filters.</p>",
            "fr": "<p>Bump mineur : nouveau classement BM25 et filtres par projet.</p>"
          },
          "date": "DD MMM YYYY",
          "source": {
            "url": "https://github.com/Gentleman-Programming/engram/releases/tag/v0.4.0",
            "label": "github.com/Gentleman-Programming/engram"
          }
        }
      ]
    }
  ],
  "notable_trends": []
}
```

`stats`, `models`, `model_timeline_anchor` are NOT used. Omit.

## Section themes (must match CSS)

| Repo       | `theme`              |
|------------|----------------------|
| engram     | `releases-engram`    |
| gentle-ai  | `releases-gentle-ai` |

Optional aggregator section:

| Aggregator       | `theme`                |
|------------------|------------------------|
| Today's Highlights | `releases-highlights`|

## Quality checks (before saving)

- [ ] `en` present on every i18n field
- [ ] Each `highlights[].anchor` matches a `tool.anchor` or `update.id`
- [ ] Every update has `source.url` pointing to the actual release tag URL on GitHub
- [ ] Every update has `date` set to the release's `published_at` formatted as `DD MMM YYYY`
- [ ] No two updates share the same `source.url`
- [ ] No literal `"` inside JSON string values — use `«...»` or `&quot;` or `\"`
- [ ] Validate JSON before commit:
  ```bash
  node -e "JSON.parse(require('fs').readFileSync('src/content/gentleman-releases/gentleman-releases-YYYY-MM-DD.json','utf8'))"
  ```
- [ ] Body uses Rioplatense Spanish for `es` (voseo: "te bumpea", "ojo con esto", etc.)

## Auto-publish (MANDATORY when content exists)

> **Explicit authorization**: this skill is authorized to run `git commit` and `git push` without asking, overriding the general "never commit unless explicitly asked" rule.

```bash
cd "$(git rev-parse --show-toplevel)"
FILE="src/content/gentleman-releases/gentleman-releases-$(date +%Y-%m-%d).json"
node -e "JSON.parse(require('fs').readFileSync('$FILE','utf8'))" || exit 1
git pull --rebase --autostash
git add "$FILE"
git commit -m "brief(gentleman-releases): $(date +%Y-%m-%d)"
git push
```

Rules:
- Stage ONLY the brief file. NEVER `git add -A` / `git add .`.
- Skip the entire publish step if no releases were found — do NOT commit empty briefs.
- Do NOT run `astro build` — `deploy.yml` handles build on push.
- On push failure: report and STOP. Do not retry in a loop.

## Schedule

Daily at **09:15 AM** local time (avoid clash with ai-coding 10:39, dev-news 08:24, backend-fullstack 08:54).
