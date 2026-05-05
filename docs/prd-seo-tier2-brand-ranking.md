# PRD — SEO Tier 2: Rank for "Dev Brief" / "Dev Daily Brief"

**Author:** Oswaldo Victor Melo Pérez
**Date:** 2026-04-23
**Branch:** `feat/seo-improvements` (continues from Tier 1 — PR #7)
**Status:** Draft — ready to execute
**Predecessor:** [`prd-seo-improvements.md`](./prd-seo-improvements.md)

---

## 1. Context

Tier 1 SEO is shipped (PR #7): canonical URLs, sitemap, robots, OG / Twitter cards, JSON-LD `WebSite` + `Organization` + `Article` + `BreadcrumbList`, per-brief meta, font preload. Baseline technical foundation: solid.

**New goal:** rank **#1 on Google** for the brand queries:

1. `dev brief`
2. `dev daily brief`
3. `devbrief`

For a new, unique brand, brand-name ranking is a function of three things: (a) Google being able to crawl and disambiguate the site, (b) an entity graph that associates the brand name with this specific site, and (c) enough external confirmation signals (sameAs, mentions, backlinks) to promote that entity into the Knowledge Graph.

Research findings are documented inline. Every item links to a primary source.

---

## 2. Goals

1. Be the **#1 organic result** on Google for `devbrief`, `dev brief`, and `dev daily brief` within 60 days.
2. Make the **multilingual content (ES/EN/FR) independently indexable** — today Google only sees the EN copy because all three languages share one HTML with CSS toggling.
3. Become a **recognized entity** in Google's Knowledge Graph (triggers brand panel, stabilizes rankings).
4. Be **citable by LLMs** (ChatGPT, Claude, Gemini, Perplexity, AI Overviews) when users ask "where can I find daily dev news".
5. Establish **E-E-A-T signals** (author identity, publisher verification) to avoid "scaled content abuse" penalties on AI-assisted digests.

## 3. Non-Goals

- Paid SEO tools (Ahrefs, SEMrush integration).
- Rewriting historical brief content for keyword density.
- Analytics instrumentation (separate scope).
- Performance/Lighthouse polish (already ≥95 from Tier 1).
- Aggressive link-building outreach (P3 below is the only link-building scope).

## 4. Success Metrics

| Metric | Baseline (2026-04-23) | Target (60 days) |
|---|---|---|
| Position on Google for `devbrief` | not indexed | #1 |
| Position on Google for `dev daily brief` | not ranking | top 3 |
| Indexed pages in Google (site:devbrief.dev) | ~home only | all briefs × 3 languages |
| Knowledge Graph entity for "Dev Daily Briefs" | none | present |
| Rich Results Test: `NewsArticle` + `BreadcrumbList` + `FAQPage` | `Article` only | all three passing |
| LLM citation coverage (ChatGPT/Claude sample prompts) | 0% | mentioned in ≥ 1 of 3 test queries |
| hreflang valid on every page (Google GSC International Targeting) | 0 | 100% |

---

## 5. Prioritized Action Plan

Items are ranked by impact-to-effort. P0 are non-negotiable for brand ranking. P1 amplifies. P2/P3 are ongoing.

### P0 — Ship this week (decide whether we rank at all)

#### P0.1 — Migrate to per-language URL paths + hreflang *(L, 1 day)*

**Problem.** Today, `es`/`en`/`fr` are all in one HTML, toggled via `html[data-lang]` CSS. Google sees ONE English page. Spanish and French content is invisible to search. This also dilutes topical signals and can trigger thin-content heuristics.

**Fix.** Use Astro's built-in i18n with `prefixDefaultLocale: false` so English stays at `/` (protects the `devbrief` brand query) and the others go to `/es/…` and `/fr/…`.

```js
// astro.config.mjs
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr'],
  routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
}
```

Emit `<link rel="alternate" hreflang="…">` tags on every page with reciprocal return links and `x-default` pointing to the English copy:

```html
<link rel="alternate" hreflang="en" href="https://devbrief.dev/…" />
<link rel="alternate" hreflang="es" href="https://devbrief.dev/es/…" />
<link rel="alternate" hreflang="fr" href="https://devbrief.dev/fr/…" />
<link rel="alternate" hreflang="x-default" href="https://devbrief.dev/…" />
```

Remove the client-side CSS toggle. Keep the `LangToggle` component, but point it at the localized URL instead of writing `data-lang`.

**Sources.**
- [Google — Localized versions of your pages](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Astro — Internationalization routing](https://docs.astro.build/en/guides/internationalization/)

---

#### P0.2 — Dynamic `<html lang>` per route *(S, 15 min)*

Today it is hardcoded to `"en"` in every layout. On `/es/…` it must be `es`, on `/fr/…` it must be `fr`. Set it from `Astro.currentLocale` in `BlogPost.astro` and `index.astro`.

**Source.** [Google — Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)

---

#### P0.3 — Google Search Console: verify, submit sitemap, request indexing *(S, 30 min)*

Without GSC we are blind. Steps:

1. Verify `devbrief.dev` (DNS TXT method — works with GitHub Pages).
2. Submit `https://devbrief.dev/sitemap-index.xml`.
3. Use URL Inspection → "Request indexing" on `/`, `/es/`, `/fr/`, and each category index.
4. Enable International Targeting report to monitor hreflang errors.
5. Repeat for Bing Webmaster Tools (mirrors GSC, feeds ChatGPT search).

**Source.** [Google — Submit a sitemap to Search Console](https://support.google.com/webmasters/answer/7451001)

---

#### P0.4 — Expand Organization schema with full `sameAs` *(S, 30 min)*

For a new brand, `sameAs` is the mechanical path to Knowledge Graph recognition. Each link = a disambiguation vote that this entity is "Dev Daily Briefs".

Update `src/utils/schema.ts`:

```ts
export function buildOrganizationSchema(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_TITLE,
    alternateName: ['Dev Brief', 'devbrief'],
    url: site?.toString(),
    logo: abs(site, '/favicon-512.png'),
    sameAs: [
      'https://github.com/<org-or-repo>',
      'https://x.com/<handle>',
      'https://linkedin.com/company/<slug>',
      'https://bsky.app/profile/<handle>',
      'https://mastodon.social/@<handle>',
      'https://dev.to/<handle>',
      // add Wikidata item once created (see P3.3)
    ],
  };
}
```

Claim each handle even if dormant — the point is the cross-link graph.

**Sources.**
- [Schema.org — sameAs](https://schema.org/sameAs)
- [Search Engine Land — Entity-first SEO](https://searchengineland.com/guide/entity-first-content-optimization)

---

### P1 — Next 2 weeks (amplification)

#### P1.1 — Switch `Article` → `NewsArticle` and register with Google Publisher Center *(M, half day)*

We ARE a news digest. `NewsArticle` is the correct schema type and is a prerequisite for Top Stories / Google News surfaces.

- Update `buildArticleSchema` → `@type: 'NewsArticle'`, add `dateline`, `articleBody`.
- Confirm every OG image is ≥ 1200 × 675.
- Register the site at [Publisher Center](https://publishercenter.google.com/).

**Sources.**
- [Google — Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Publisher Center — Get started](https://support.google.com/news/publisher-center/answer/9607104)

---

#### P1.2 — Author pages + `Person` schema with `sameAs` *(M, half day)*

In 2025–26 Google penalizes "scaled content abuse" — unattributed AI-assisted digests are a target. Defense = verifiable author identity.

- Create `/about/<author>/` with bio, photo, credentials, social links.
- Emit `Person` schema with `sameAs` on that page.
- On every post, reference `author: { '@type': 'Person', '@id': 'https://devbrief.dev/about/<author>/#person' }`.

**Source.** [Google — E-E-A-T and Quality Rater Guidelines](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

---

#### P1.3 — News-specific sitemap *(S, 1 hour)*

Separate sitemap for posts published in the last 48h. Required for Google News crawl prioritization. `@astrojs/sitemap` supports multiple sitemaps; add a `news-sitemap.xml` generator and list it in `sitemap-index.xml`.

**Source.** [Google — News sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap)

---

#### P1.4 — `llms.txt` at site root *(S, 1 hour)*

A markdown index optimized for LLMs fetching on demand. Proven lift on citation rate for Perplexity / ChatGPT / Claude.

Structure:

```markdown
# Dev Daily Briefs

> Curated daily digests for senior developers — AI tools, backend, and frontend news. Published in EN/ES/FR.

## Categories
- [AI Coding](https://devbrief.dev/ai-coding/) — AI coding tools (Claude Code, Codex, Copilot, Gemini) and model launches
- [Backend & Fullstack](https://devbrief.dev/backend-fullstack/) — Node.js, Deno, Bun, databases, DevOps, architecture
- [Dev News](https://devbrief.dev/dev-news/) — TypeScript, CSS, React, frameworks, web platform

## Latest briefs
- [<date> — <title>](<url>)
…
```

Auto-regenerate at build time from the content collections.

**Source.** [llms.txt specification](https://llmstxt.org/)

---

### P2 — Next month

#### P2.1 — FAQ schema on home + visible FAQ UI *(M, half day)*

Exact-match brand definition questions are what AI Overviews and LLMs lift verbatim. Pair schema with visible HTML (Google drops schema-only FAQs).

Example Qs:
- "What is Dev Daily Briefs?"
- "How often is it updated?"
- "Which topics does it cover?"
- "Is it free?"

**Source.** [Google — FAQ structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage)

---

#### P2.2 — IndexNow endpoint + daily ping from build *(S, 2 hours)*

Google does not participate, but Bing/Yandex/Naver/Seznam/Yep do. Bing feeds ChatGPT search and Copilot citations. Same-day indexation = same-day LLM visibility.

- Generate a key file at `public/<key>.txt`.
- In the GitHub Actions publish step, `POST https://api.indexnow.org/indexnow` with the list of changed URLs.

**Sources.**
- [IndexNow.org](https://www.indexnow.org/)
- [Bing — Submit URLs with IndexNow](https://www.bing.com/indexnow)

---

#### P2.3 — Internal linking: Prev/Next + Related *(M, half day)*

Daily archives are orphan-page risk. Every brief must link to:
- Prior day, same category (Prev/Next pair).
- 3 topically related posts (keyword/tag overlap).
- The category hub.

Reduces crawl depth, concentrates PageRank on recent content.

---

#### P2.4 — Visible breadcrumbs in UI *(S, 1 hour)*

We already emit `BreadcrumbList` JSON-LD. Render it visually too — Google's breadcrumb rich result requires the visible crumbs to match the schema.

---

### P3 — Ongoing (link acquisition)

#### P3.1 — Show HN launch *(M, one-shot)*

Dofollow, high domain rating, permanent. Use ONCE when the site has 30+ digests and a clean UX. Don't waste it on a sparse site.

**Source.** [markepear — launching a dev tool on HN](https://www.markepear.dev/blog/dev-tool-hacker-news-launch)

---

#### P3.2 — Weekly digest cross-posted with canonical *(M, recurring)*

Publish a weekly roundup (not dailies) on dev.to / Hashnode / lobste.rs with `rel="canonical"` back to `devbrief.dev`. Dofollow backlinks + brand-mention volume feeds branded-search signal — Google's strongest entity-matters input.

---

#### P3.3 — Wikidata item for "Dev Daily Briefs" *(S, 30 min, one-shot)*

Cheapest Knowledge Graph seed. Wikidata is a primary source Google reconciles against. Include: official website, founder, language(s), inception date, logo, topic(s), social properties. Link back from the home page `sameAs`.

**Source.** [Dakota Q — getting into Google Knowledge Graph](https://www.dakotaq.com/get-into-google-knowledge-graph/)

---

## 6. Execution Phases

### Phase 1 — Crawlability & Entity (week 1)
P0.1, P0.2, P0.3, P0.4 → site is fully crawlable in three languages, GSC verified, entity graph seeded.

### Phase 2 — News Eligibility & LLM Visibility (weeks 2–3)
P1.1, P1.2, P1.3, P1.4 → Top Stories eligibility, E-E-A-T defense, LLM index file.

### Phase 3 — Rich Results & Freshness (week 4)
P2.1, P2.2, P2.3, P2.4 → FAQ rich result, faster Bing indexation, stronger internal graph, breadcrumb UI.

### Phase 4 — Authority (ongoing)
P3.1, P3.2, P3.3 → backlinks, brand mentions, Knowledge Graph confirmation.

---

## 7. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| i18n URL migration breaks existing links | Add redirects from `/<category>/<slug>` to `/<category>/<slug>/` in a 301 map; keep EN at `/` via `prefixDefaultLocale: false`. |
| hreflang misconfigured triggers GSC errors | Validate every page has reciprocal return links + x-default. Monitor GSC International Targeting report for 7 days post-launch. |
| Switching `Article` → `NewsArticle` loses existing rich results while Google re-crawls | Acceptable — re-indexing is fast (< 7 days) and NewsArticle unlocks Top Stories. |
| `sameAs` links to dormant social profiles look spammy | Only include handles we actually own and can update. Don't pad the array. |
| Publisher Center rejects site for thin content | Ship only after 30+ briefs published and author pages live. |

---

## 8. Rollout Checklist (P0 only)

- [ ] `astro.config.mjs` — enable `i18n` with `prefixDefaultLocale: false`
- [ ] Move language-specific text out of shared components into localized routes under `src/pages/es/` and `src/pages/fr/`
- [ ] `BaseHead.astro` — remove client-side CSS language toggle, emit hreflang + x-default
- [ ] `BlogPost.astro` / `index.astro` — dynamic `<html lang={Astro.currentLocale}>`
- [ ] `LangToggle.astro` — switch from CSS toggle to localized URL navigation
- [ ] `src/utils/schema.ts` — add `alternateName` + full `sameAs` to `buildOrganizationSchema`
- [ ] Verify domain in Google Search Console (DNS TXT)
- [ ] Submit `sitemap-index.xml` to GSC + Bing Webmaster Tools
- [ ] Request indexing for `/`, `/es/`, `/fr/`, and every category index
- [ ] Run Google Rich Results Test on `/` + one post per language — must pass

---

## 9. References

- [Google — Localized versions of your pages](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google — Managing multi-regional sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Astro — Internationalization routing](https://docs.astro.build/en/guides/internationalization/)
- [Google — Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google — FAQ structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Google — News sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap)
- [Google — Publisher Center](https://support.google.com/news/publisher-center/answer/9607104)
- [Google — Creating helpful, people-first content (E-E-A-T)](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Schema.org — sameAs](https://schema.org/sameAs)
- [Search Engine Land — Entity-first SEO](https://searchengineland.com/guide/entity-first-content-optimization)
- [llms.txt specification](https://llmstxt.org/)
- [IndexNow.org](https://www.indexnow.org/)
- [Bing — IndexNow](https://www.bing.com/indexnow)
- [markepear — launching a dev tool on HN](https://www.markepear.dev/blog/dev-tool-hacker-news-launch)
- [Dakota Q — getting into Google Knowledge Graph](https://www.dakotaq.com/get-into-google-knowledge-graph/)
