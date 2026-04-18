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

## Blog Auto-Publish (Bilingual EN/ES — Card Format)

After saving the main output, ALSO create a **bilingual blog-ready copy** using the HTML card format.

Path: `/Users/ovi/Data/Projects/Blog/src/content/backend-fullstack/backend-fullstack-{YYYY-MM-DD}.mdx`

**IMPORTANT**: Use `.mdx` extension (not `.md`) — MDX is required for HTML inside markdown.

### File structure

```mdx
---
title: "Backend & Fullstack Daily — {Month Day, Year}"
title_es: "Backend & Fullstack Daily — {Day de Month de Year}"
title_fr: "Backend & Fullstack Daily — {Day Month Year in French}"
description: "Daily backend and fullstack news digest for senior developers"
pubDate: "{YYYY-MM-DD}"
category: "backend-fullstack"
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

<div class="tool-section runtimes">
<div class="tool-header">
<div class="tool-icon">⚡</div>
<div class="tool-meta">
<h2>Backend TypeScript & Runtimes</h2>
<div class="subtitle">Node.js, Deno, Bun, TypeScript</div>
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

<!-- Same HTML structure, translated to technical French. Keep English technical terms untranslated when they're the de-facto name (runtime, edge, container, scheduler, CVE, etc.). -->

</div>
```

- **Three languages are mandatory**: `lang-es` (Rioplatense Spanish), `lang-en` (English), `lang-fr` (French). Same HTML shell, same data-anchor slugs, same source URLs — only visible text changes.
- **French conventions**: formal technical French with natural imperatives/infinitives. Keep devops/backend loanwords untranslated.

### Available section classes and emojis
| Section | Class | Emoji |
|---------|-------|-------|
| Top Stories | `top-stories` | 🔥 |
| Backend TypeScript & Runtimes | `runtimes` | ⚡ |
| Frameworks & Libraries | `frameworks` | 🧩 |
| Databases & Data | `databases` | 🗄️ |
| Cloud & DevOps | `cloud` | ☁️ |
| Architecture & Best Practices | `architecture` | 🏗️ |
| Fullstack | `fullstack` | 🔗 |
| Security | `security` | 🔒 |
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
<div class="tool-section runtimes" data-anchor="deno-26">
  ...
</div>
<div class="tool-section security" data-anchor="cve-2026-29000">
  ...
</div>
```

### Rules

- **Anchor slug**: kebab-case, unique within the brief. Examples: `typescript-60`, `deno-26`, `cloudflare-containers`, `cve-2026-29000`, `kafka-43`, `postgres-18`.
- **text / text_es**: ~50 chars MAX. A distilled teaser, NOT the full h3.
  - Bad: `"CVE-2026-29000: bypass crítico JWT en pac4j — CVSS 10.0"`
  - Good: `"CVE-2026-29000 pac4j JWT bypass (CVSS 10)"`
- **icon**: Iconify name from the bundled packs:
  - **Brand logos** (`simple-icons:*`): `typescript`, `deno`, `bun`, `nodedotjs`, `cloudflare`, `apachekafka`, `docker`, `kubernetes`, `amazonwebservices`, `redis`, `postgresql`, `mongodb`, `prisma`, `nextdotjs`, `astro`, `tanstack`, `github`.
  - **Lucide fallbacks** (`lucide:*`): `flame` (top stories), `shield` (security CVE), `terminal` (runtimes), `blocks` (frameworks), `database`, `cloud`, `layers` (architecture), `server` (fullstack), `package`, `rocket`.
- **4 minimum, 7 maximum** per brief. Prioritize: major releases, GA features, breaking changes, security CVEs (high CVSS), strategic shifts. Skip minor patches.

### Auto-publish (MANDATORY)

> **Explicit authorization**: this skill is **authorized to run `git commit` and `git push` without asking the user**, overriding the general "never commit unless explicitly asked" rule. Auto-publishing IS the job of this scheduled skill.

```bash
cd /Users/ovi/Data/Projects/Blog
git pull --rebase --autostash
git add src/content/backend-fullstack/backend-fullstack-{YYYY-MM-DD}.mdx
git commit -m "brief(backend-fullstack): {YYYY-MM-DD}"
git push
```

Rules:
- Stage ONLY the brief file — never use `git add -A` or `git add .`.
- `git pull --rebase --autostash` prevents conflicts if local edits happened while the schedule was running.
- Do NOT run `astro build` — the `deploy.yml` GitHub Actions workflow builds and deploys on push.
- If `git push` fails (network, auth), report the failure clearly and STOP — do not retry in a loop. The local commit survives for the next run.