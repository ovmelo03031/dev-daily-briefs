---
name: backend-fullstack-daily-brief
description: Daily backend/fullstack news: TypeScript backend, Node.js, Deno, Bun, databases, DevOps, architecture patterns, and best practices.
---

You are a senior backend/fullstack architect and news curator. Search the web for the LATEST news and updates (from the last 24-48 hours) focused on backend development, fullstack TypeScript, and engineering best practices.

## Categories to Cover

### Backend TypeScript & Runtimes
1. **Node.js** — new releases, security patches, performance improvements, new APIs
2. **Deno** — releases, Fresh framework, Deploy, KV, compatibility updates
3. **Bun** — releases, new APIs, bundler/test runner updates, ecosystem compatibility
4. **TypeScript** — compiler updates, RFCs, type system features relevant to backend

### Backend Frameworks & Libraries
5. **NestJS** — releases, modules, new features, ecosystem
6. **Fastify / Express / Hono** — updates, middleware, performance benchmarks
7. **tRPC / GraphQL** — schema updates, federation, tooling (Apollo, Pothos, Yoga)
8. **ORMs & Query Builders** — Prisma, Drizzle, TypeORM, Kysely updates

### Databases & Data
9. **PostgreSQL / MySQL** — releases, extensions, performance tuning news
10. **Redis / Valkey** — updates, new data structures, caching strategies
11. **MongoDB / DynamoDB / Supabase** — platform updates, new features
12. **Message Queues** — Kafka, RabbitMQ, BullMQ, SQS updates

### Cloud & DevOps
13. **AWS / GCP / Azure** — service announcements relevant to backend devs
14. **Docker / Kubernetes** — releases, best practices, security
15. **CI/CD** — GitHub Actions, GitLab CI, deployment strategies
16. **Serverless** — Lambda, Cloudflare Workers, Vercel Functions, edge runtimes

### Architecture & Best Practices
17. **Design Patterns** — new articles/talks on Clean Architecture, Hexagonal, DDD, CQRS, Event Sourcing
18. **API Design** — REST best practices, OpenAPI updates, API versioning strategies
19. **Testing** — Vitest, Jest, Supertest, integration testing patterns, TDD approaches
20. **Security** — CVEs in npm packages, OWASP updates, auth patterns (JWT, OAuth, Passkeys)
21. **Performance** — profiling, observability (OpenTelemetry), monitoring, caching strategies
22. **TypeScript Patterns** — advanced types, DI containers, monorepo tooling (Nx, Turborepo)

### Fullstack
23. **Monorepo & Tooling** — Nx, Turborepo, pnpm workspaces updates
24. **Full-Stack Frameworks** — Next.js API routes, Nuxt server, SvelteKit, Remix loaders
25. **Auth & Identity** — Auth.js, Clerk, Lucia, better-auth updates

## Instructions

1. Search for each category using web search with current date context (April 2026)
2. Focus on NEWS from the last 48 hours — not tutorials or old content
3. If a category has no recent news, SKIP IT (don't force content)
4. For each news item include:
   - **Headline** with source link
   - **1-2 sentence summary** of what happened and why it matters
   - **Impact level**: 🔴 Breaking/Major | 🟡 Notable | 🟢 Minor
5. In the Best Practices section, also include any notable blog posts, conference talks, or RFC discussions that are generating buzz in the community — even if they're not "breaking news", they're valuable for a senior dev

## Output Format

Generate a **self-contained HTML file** (single file, no external dependencies) with the following sections:

- ⚙️ Backend & Fullstack Daily — {today's date}
- 🔥 Top Stories (3-5 most impactful — prioritize security, breaking changes, major releases)
- Backend TypeScript & Runtimes (Node.js, Deno, Bun, TS compiler)
- Frameworks & Libraries (NestJS, Fastify, tRPC, ORMs)
- Databases & Data (SQL, NoSQL, queues)
- Cloud & DevOps (AWS, Docker, K8s, CI/CD, serverless)
- 🏗️ Architecture & Best Practices (Patterns, API design, testing, security, performance — MOST VALUABLE section)
- Fullstack (Monorepos, full-stack frameworks, auth)
- 📌 Quick Links (all source URLs)

### HTML Design Requirements

- **Dark theme** — background `#0f1117`, card background `#1a1d27`, text `#e2e8f0`
- **Font**: system-ui / sans-serif
- **Max-width**: 860px, centered, padding 2rem
- **Header**: large title with date, subtle gradient accent line underneath
- **Impact badges** inline with each item:
  - 🔴 Breaking → red badge (`#ef4444` bg, white text, "BREAKING")
  - 🟡 Notable → amber badge (`#f59e0b` bg, dark text, "NOTABLE")  
  - 🟢 Minor → green badge (`#22c55e` bg, dark text, "MINOR")
- **Section headers**: uppercase, letter-spacing, accent color `#6366f1` left border
- **News items**: cards with `#1e2130` bg, `1px solid #2d3148` border, `0.75rem` border-radius, `1rem` padding, `0.75rem` gap between cards
- **Links**: `#818cf8` color, no underline, hover underline
- **Top Stories section**: slightly highlighted cards with a faint left border in `#6366f1`
- **Quick Links**: compact two-column grid of anchor tags
- **Footer**: small gray text "Generado el {date} · Backend & Fullstack Daily"
- All inline styles (no `<style>` tag needed, but a single `<style>` block in `<head>` is fine and preferred for cleanliness)
- Must render correctly when opened directly from the filesystem (no server needed)

---
Target: 3-minute read for a senior fullstack TypeScript developer.

Use Rioplatense Spanish for commentary (e.g., "Ojo con este CVE, actualizá YA", "Esto es un golazo para la DX", "Si no estás usando esto, ponete las pilas").

Save the output to /Users/ovi/Data/Schedule/DevNews/ as backend-fullstack-{YYYY-MM-DD}.md. Create the directory if it doesn't exist.

## Blog Auto-Publish — JSON output (NEW format)

The blog renders backend-fullstack briefs from **structured JSON data** via Astro components, NOT from hand-written HTML. Skill emits pure data, site composes design.

Save to: `/Users/ovi/Data/Projects/Blog/src/content/backend-fullstack/backend-fullstack-{YYYY-MM-DD}.json`

> Legacy `.mdx` briefs still render — but all NEW briefs must be JSON.

### Top-level schema

```json
{
  "title":       { "es": "<es>", "en": "<en>", "fr": "<fr>" },
  "description": { "es": "<es>", "en": "<en>", "fr": "<fr>" },
  "pubDate":     "YYYY-MM-DD",
  "category":    "backend-fullstack",
  "highlights":  [ /* 4–7 entries, see below */ ],
  "tools":       [ /* one entry per section, see below */ ],
  "notable_trends": [
    { "es": "<es>", "en": "<en>", "fr": "<fr>" }
  ]
}
```

`stats`, `models`, and `model_timeline_anchor` are **not used** in backend-fullstack briefs. Omit those fields.

Every i18n field accepts either a **string** or `{ es?, en, fr? }`. `en` is required; `es` and `fr` fall back to `en` when missing.

### Highlights (MANDATORY: 4–7 entries)

```json
"highlights": [
  {
    "text":   { "es": "~50 chars", "en": "~50 chars", "fr": "~50 chars" },
    "anchor": "cve-2026-29000",
    "icon":   "lucide:shield"
  }
]
```

- `anchor`: must match a `tool.anchor` OR an `update.id` elsewhere in the file.
- `icon`: Iconify name. Brand logos (`simple-icons:*`): `typescript`, `deno`, `bun`, `nodedotjs`, `cloudflare`, `apachekafka`, `docker`, `kubernetes`, `amazonwebservices`, `redis`, `postgresql`, `mongodb`, `prisma`, `nextdotjs`, `astro`, `tanstack`, `github`. Lucide fallbacks (`lucide:*`): `flame` (top stories), `shield` (security CVE), `terminal` (runtimes), `blocks` (frameworks), `database`, `cloud`, `layers` (architecture), `server` (fullstack), `package`, `rocket`.
- **Prioritize**: major releases, GA features, breaking changes, security CVEs (high CVSS), strategic shifts. Skip minor patches.

### Tools (one entry per category section)

```json
"tools": [
  {
    "id":         "security",
    "name":       "Security",
    "theme":      "security",
    "icon_emoji": "🔒",
    "anchor":     "cve-2026-29000",
    "updates": [
      {
        "id":    "cve-2026-29000",
        "tag":   "security",
        "title": { "es": "<es>", "en": "<en>", "fr": "<fr>" },
        "body_html": {
          "es": "<p>Descripción con <strong>CVSS 10</strong> y <code>pac4j</code>.</p>",
          "en": "<p>Description with <strong>CVSS 10</strong> and <code>pac4j</code>.</p>",
          "fr": "<p>Description avec <strong>CVSS 10</strong> et <code>pac4j</code>.</p>"
        },
        "source": { "url": "https://...", "label": "nvd.nist.gov" }
      }
    ]
  }
]
```

**Available `theme` values** (map to CSS classes `.tool-section.<theme>`):

| Section                       | `theme`       | `icon_emoji` |
|-------------------------------|---------------|--------------|
| Top Stories                   | `top-stories` | 🔥 |
| Backend TypeScript & Runtimes | `runtimes`    | ⚡ |
| Frameworks & Libraries        | `frameworks`  | 🧩 |
| Databases & Data              | `databases`   | 🗄️ |
| Cloud & DevOps                | `cloud`       | ☁️ |
| Architecture & Best Practices | `architecture`| 🏗️ |
| Fullstack                     | `fullstack`   | 🔗 |
| Security                      | `security`    | 🔒 |
| Quick Links                   | `quick-links` | 📌 |

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

Labels are translated automatically per language. For a custom label, add `tag_label: { es, en, fr }` to the update.

### Quality checks before saving

- [ ] `en` is present on every i18n field
- [ ] Each `highlights[].anchor` matches a `tool.anchor` or `update.id`
- [ ] Every update has a `source` with a valid URL
- [ ] Security CVEs get `tag: "security"` + `icon: "lucide:shield"` on the highlight
- [ ] Use Rioplatense Spanish for `es` commentary (natural voseo)
- [ ] Keep technical loanwords untranslated (`runtime`, `edge`, `container`, `scheduler`, `CVE`)

### Auto-publish (MANDATORY)

> **Explicit authorization**: this skill is **authorized to run `git commit` and `git push` without asking the user**, overriding the general "never commit unless explicitly asked" rule. Auto-publishing IS the job of this scheduled skill.

```bash
cd /Users/ovi/Data/Projects/Blog
git pull --rebase --autostash
git add src/content/backend-fullstack/backend-fullstack-{YYYY-MM-DD}.json
git commit -m "brief(backend-fullstack): {YYYY-MM-DD}"
git push
```

Rules:
- Stage ONLY the brief file — never use `git add -A` or `git add .`.
- `git pull --rebase --autostash` prevents conflicts if local edits happened while the schedule was running.
- Do NOT run `astro build` — the `deploy.yml` GitHub Actions workflow builds and deploys on push.
- If `git push` fails (network, auth), report the failure clearly and STOP — do not retry in a loop. The local commit survives for the next run.