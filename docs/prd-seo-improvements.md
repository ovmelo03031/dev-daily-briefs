# PRD — SEO Improvements for devbrief.dev

**Author:** Oswaldo Victor Melo Pérez
**Date:** 2026-04-23
**Branch:** `feat/seo-improvements`
**Status:** Draft — ready to execute

---

## 1. Context

`devbrief.dev` is a static Astro site publishing daily developer briefs across three categories (`ai-coding`, `backend-fullstack`, `dev-news`). Content is multilingual (ES/EN/FR) stored in JSON frontmatter. Hosted on GitHub Pages.

Baseline SEO audit (2026-04-23) scored the site **6/10**. Technical foundation is solid (canonical URLs, sitemap, meta tags), but several crawlability and rich-result signals are missing.

## 2. Goals

1. Make the site **fully crawlable and indexable** by search engines.
2. Enable **rich results** (Article cards, breadcrumbs) in Google SERP.
3. Ship a working **RSS feed** — core to a "daily briefs" product.
4. Make the **multilingual content discoverable** via proper i18n signals.
5. Improve **social sharing** with per-brief OG images.

## 3. Non-Goals

- Paid SEO tooling integration (Ahrefs, SEMrush).
- Link-building or off-page SEO.
- Full content rewrite for keyword optimization.
- Analytics implementation (separate scope).

## 4. Success Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| Lighthouse SEO score | unknown | ≥ 95 |
| Google-indexable pages | 1 language visible | 3 languages visible |
| JSON-LD coverage | 0% | 100% of briefs + home |
| RSS feed availability | ❌ | ✅ `/rss.xml` + per-category feeds |
| Rich results eligibility (Google Rich Results Test) | 0 schemas | Article + BreadcrumbList + WebSite pass |
| robots.txt present | ❌ | ✅ |

## 5. Scope & Deliverables

### Tier 1 — Foundational (MUST, this PR)

**1.1 `robots.txt`**
- Create `public/robots.txt`
- Allow all, declare sitemap URL

**1.2 JSON-LD structured data**
- `WebSite` schema on homepage (with SearchAction if feasible)
- `Article` schema on every brief page (headline, datePublished, author, image, description)
- `BreadcrumbList` schema on category landing + brief pages
- Centralize in a `StructuredData.astro` component

**1.3 RSS feed**
- Use existing `@astrojs/rss@4.0.18` dependency
- Create `src/pages/rss.xml.ts` (all briefs, newest first)
- Create per-category: `src/pages/[category]/rss.xml.ts`
- Link `<link rel="alternate" type="application/rss+xml">` in `BaseHead.astro`

**1.4 OG type per page**
- Pass `type` prop to `BaseHead.astro`
- Default `"website"`, set `"article"` on brief pages

**1.5 `theme-color` meta**
- Add `<meta name="theme-color" content="#...">` matching brand color

**1.6 `trailingSlash` explicit config**
- Set in `astro.config.mjs` to prevent duplicate URL risk

### Tier 2 — Rich social (SHOULD, follow-up PR)

**2.1 Dynamic OG images per brief**
- Generate on build using Satori + Resvg
- Template: title + category + date on branded background
- Output at `/og/[category]/[slug].png`
- Reference from per-page `og:image`

**2.2 PWA manifest**
- `public/site.webmanifest` referenced from head

### Tier 3 — i18n routing (OPTIONAL, separate initiative)

**3.1 Language-prefixed routes**
- Astro i18n config with `/en/`, `/es/`, `/fr/` prefixes
- Refactor pages to render per-locale
- Add `<link rel="alternate" hreflang>` tags
- Update sitemap to include all locale variants
- **Flagged as separate PRD** — requires routing refactor and content loader changes. Do not bundle with Tier 1/2.

## 6. Technical Approach

### 6.1 JSON-LD component

Create `src/components/StructuredData.astro` accepting a `schema` prop (object), serializing to `<script type="application/ld+json">`. Import from `BaseHead.astro` or brief layout depending on schema type.

Build helpers in `src/utils/schema.ts`:
- `buildWebSiteSchema(site)`
- `buildArticleSchema(brief, site)`
- `buildBreadcrumbSchema(trail, site)`

### 6.2 RSS feed

```ts
// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const briefs = (await Promise.all([
    getCollection('ai-coding'),
    getCollection('backend-fullstack'),
    getCollection('dev-news'),
  ])).flat().sort(byDateDesc);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: briefs.map(toRssItem),
  });
}
```

Per-category feed replicates logic scoped to one collection.

### 6.3 BaseHead.astro changes

Add optional props: `type` (default `"website"`), `article` (optional object with `publishedTime`, `author`, `section`). Emit `<meta property="article:published_time">` when `article` is present.

Add `<link rel="alternate" type="application/rss+xml">` to all pages.

### 6.4 Files touched (Tier 1)

- **NEW** `public/robots.txt`
- **NEW** `src/components/StructuredData.astro`
- **NEW** `src/utils/schema.ts`
- **NEW** `src/pages/rss.xml.ts`
- **NEW** `src/pages/ai-coding/rss.xml.ts`
- **NEW** `src/pages/backend-fullstack/rss.xml.ts`
- **NEW** `src/pages/dev-news/rss.xml.ts`
- **MOD** `src/components/BaseHead.astro` (props, RSS alternate, theme-color)
- **MOD** `src/layouts/BlogPost.astro` (pass `type="article"`, inject Article JSON-LD)
- **MOD** `src/pages/index.astro` (inject WebSite JSON-LD)
- **MOD** `src/components/CategoryList.astro` (inject BreadcrumbList)
- **MOD** `astro.config.mjs` (`trailingSlash`)

## 7. Validation Plan

1. **Build passes** — `pnpm build` no errors.
2. **Google Rich Results Test** — paste brief URL, verify Article schema detected.
3. **Schema.org validator** — all emitted JSON-LD validates.
4. **Lighthouse SEO audit** — score ≥ 95 on home + one brief + one category.
5. **RSS validation** — W3C feed validator passes on `/rss.xml` and per-category feeds.
6. **Manual spot-check** — view-source on 3 pages, confirm unique `og:type`, canonical, JSON-LD, RSS alternate link.
7. **robots.txt** — fetch `https://devbrief.dev/robots.txt` post-deploy, verify sitemap directive.

## 8. Risks & Tradeoffs

| Risk | Mitigation |
|------|------------|
| JSON-LD schema typos → invalid rich results | Run Google Rich Results Test before merge |
| RSS feed performance on large collections | Paginate or limit to last 50 items (current volume is low — non-issue for now) |
| `trailingSlash` change breaks existing links | Check GitHub Pages behavior; set to `"ignore"` if conservative |
| i18n refactor (Tier 3) is large | Split into separate PRD; ship Tier 1+2 first |

## 9. Timeline

- **Tier 1** — 1 session (~2-3h implementation + validation)
- **Tier 2** — 1 session (~2h, Satori setup is the unknown)
- **Tier 3** — separate initiative, not estimated here

## 10. Out of Scope / Parked

- Image sitemap
- Video sitemap
- News sitemap (would require Google News submission flow)
- `noindex` strategy for thin pages — N/A, all pages are substantive
- Analytics / Search Console verification (separate PRD)

---

## Execution Checklist (Tier 1)

- [ ] `public/robots.txt` created
- [ ] `src/utils/schema.ts` helpers implemented
- [ ] `StructuredData.astro` component created
- [ ] `WebSite` JSON-LD on home
- [ ] `Article` JSON-LD on brief pages
- [ ] `BreadcrumbList` JSON-LD on category + brief
- [ ] `/rss.xml` route live
- [ ] `/[category]/rss.xml` routes live
- [ ] `BaseHead.astro` accepts `type` prop
- [ ] `theme-color` meta added
- [ ] `trailingSlash` set in `astro.config.mjs`
- [ ] `<link rel="alternate" type="application/rss+xml">` in head
- [ ] `pnpm build` passes
- [ ] Lighthouse SEO ≥ 95 verified
- [ ] Google Rich Results Test passes for 1 brief
- [ ] W3C feed validator passes
