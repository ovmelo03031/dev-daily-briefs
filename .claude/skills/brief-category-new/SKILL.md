---
name: brief-category-new
description: Scaffold a completely new category on the Dev Daily Briefs site — content collection, routes, navigation, colors, and optionally a recurring scheduled task. Triggers on "new category", "nueva categoría", "scaffold category", "agregá una categoría", "create a mobile-dev section", etc.
---

# Skill — `brief-category-new`

Adds a brand-new daily-brief category to `/Users/ovi/Data/Projects/Blog`. This is a bigger change than adding a single brief — it touches multiple files. For adding ONE more entry to an existing category use `brief-new` instead.

## When to invoke

User says things like:
- "Agregá una categoría `mobile-dev` al blog"
- "Create a new category for DevOps news"
- "Scaffold a `design` section with its own briefs"
- "Quiero una categoría nueva para crypto / web3 / AI safety / ..."

## Step 1 — Gather inputs

Before editing anything, confirm with the user:

1. **Slug** — kebab-case, URL-safe (`mobile-dev`, `devops`, `crypto`). REJECT if the slug already exists.
2. **Label** — the human-readable name shown in nav and headers (`Mobile Dev`, `DevOps`, `Crypto & Web3`).
3. **Description** — one-line tagline displayed under the category hero.
4. **Accent color** — hex color for icon tint, borders, gradients. If unsure, pick from the existing palette (`#7c6aff`, `#22d3ee`, `#7c3aed`, `#f59e0b`, `#34d399`, `#f87171`).
5. **Lucide icon name** — the abstract icon used in nav + hero + list (`smartphone`, `server`, `paintbrush`, `coins`). Browse https://lucide.dev/icons to pick.
6. **Section class list** — the sub-themes that will appear inside each brief (e.g. `top-stories`, `ios`, `android`, `flutter`, `react-native`, `quick-links`). Decide 5–8.
7. **Optional: scheduled task?** — if the user wants daily auto-generation, we also create a scheduled task via `mcp__scheduled-tasks__create_scheduled_task`.

## Step 2 — Files to touch

### 2a. `src/consts.ts` — add the category to the `CATEGORIES` object

```ts
'{slug}': {
  label: '{Label}',
  description: '{Description}',
  emoji: '{fallback emoji — still used in some places}',
  icon: 'lucide:{icon-name}',
  accent: '{hex color}',
},
```

### 2b. `src/content.config.ts` — add a new Zod collection

```ts
const {camelCaseSlug} = defineCollection({
  loader: glob({ base: './src/content/{slug}', pattern: '**/*.{md,mdx}' }),
  schema: briefSchema,
});
```

And add it to the `collections` export:

```ts
export const collections = {
  'ai-coding': aiCoding,
  'backend-fullstack': backendFullstack,
  'dev-news': devNews,
  '{slug}': {camelCaseSlug},
};
```

Also update the category enum in `briefSchema` to include the new slug:

```ts
category: z.enum(['ai-coding', 'backend-fullstack', 'dev-news', '{slug}']),
```

### 2c. Create content directory

```bash
mkdir -p /Users/ovi/Data/Projects/Blog/src/content/{slug}
```

Leave it empty — the first brief goes in via the `brief-new` skill.

### 2d. Create routes — 2 files

`src/pages/{slug}/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseHead from '../../components/BaseHead.astro';
import Footer from '../../components/Footer.astro';
import Header from '../../components/Header.astro';
import CategoryList from '../../components/CategoryList.astro';
import { CATEGORIES } from '../../consts';

const posts = await getCollection('{slug}');
const cat = CATEGORIES['{slug}'];
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={`${cat.label} — Dev Daily Briefs`} description={cat.description} />
  </head>
  <body>
    <Header />
    <main>
      <CategoryList posts={posts} category="{slug}" />
    </main>
    <Footer />
  </body>
</html>
```

`src/pages/{slug}/[...slug].astro`:

```astro
---
import { type CollectionEntry, getCollection, render } from 'astro:content';
import BlogPost from '../../layouts/BlogPost.astro';

export async function getStaticPaths() {
  const posts = await getCollection('{slug}');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: post,
  }));
}
type Props = CollectionEntry<'{slug}'>;

const post = Astro.props;
const { Content } = await render(post);
---

<BlogPost {...post.data}>
  <Content />
</BlogPost>
```

### 2e. `public/styles/ai-coding-brief.css` — add styling for the new section classes

For EACH section class decided in Step 1:

1. Left-border accent gradient (add in the section colors block):
   ```css
   .tool-section.{section-class}::before {
     background: linear-gradient(90deg, {color-1}, {color-2});
   }
   ```

2. Brand variable + icon mapping (add in the Scroll-reveal / icon block):
   ```css
   .prose-brief .tool-section.{section-class} { --brand: {hex}; }
   .prose-brief .tool-section.{section-class} .tool-icon::after {
     mask-image: url('../icons/{pack}/{name}.svg');
     -webkit-mask-image: url('../icons/{pack}/{name}.svg');
   }
   ```

3. Include the new classes in the TWO `:is()` lists that gate the icon overlay (the one that hides emoji and the one that applies the ::after):
   ```css
   .prose-brief .tool-section:is(..., .{new-class}) .tool-icon
   .prose-brief .tool-section:is(..., .{new-class}) .tool-icon::after
   ```

4. Include the new classes in the scroll-reveal `@media (prefers-reduced-motion: no-preference)` selectors (the big comma-separated list at the bottom).

### 2f. Extract any missing SVG icons

If a section class needs an icon not yet in `/public/icons/`:

```bash
node -e "
const fs=require('fs');
const pack='lucide'; // or 'simple-icons'
const name='smartphone'; // change
const p=require('/Users/ovi/Data/Projects/Blog/node_modules/@iconify-json/\${pack}/icons.json');
const i=p.icons[name];
const w=i.width||p.width||24;
const h=i.height||p.height||24;
fs.writeFileSync(\`/Users/ovi/Data/Projects/Blog/public/icons/\${pack}/\${name}.svg\`,
  \`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 \${w} \${h}'>\${i.body}</svg>\`);
"
```

### 2g. `Header.astro` — NO edit needed

The nav iterates `Object.entries(CATEGORIES)` so the new category shows up automatically once added to `consts.ts`. Same for the home page category cards and the mobile-only icons.

## Step 3 — Verify the scaffold

Run the dev server and check:

```bash
cd /Users/ovi/Data/Projects/Blog && pnpm dev
```

- `http://localhost:4321/dev-daily-briefs/{slug}/` renders an empty hero with "No briefs yet" message
- The nav shows the new category with its Lucide icon in its accent color
- The home page shows 4 category cards (or N+1) instead of 3

## Step 4 — Optional: schedule auto-generation

If the user wants a daily auto-generator, create a new scheduled task:

```
mcp__scheduled-tasks__create_scheduled_task:
  taskId: "{slug}-daily-brief"
  description: "<short one-line description>"
  cronExpression: "<minute hour * * *>"  # pick a time that doesn't collide with existing tasks
  prompt: <full prompt text, modeled after the existing SKILL.md files in ~/.claude/scheduled-tasks/>
```

The prompt MUST include:
- Web search queries for the topic
- Filtering rules (newness, developer relevance, recency)
- The same "Blog Auto-Publish" section as the existing tasks, with the path updated to `/Users/ovi/Data/Projects/Blog/src/content/{slug}/`
- The full "## Highlight Bar (MANDATORY)" block (copy from `~/.claude/scheduled-tasks/ai-coding-daily-brief/SKILL.md`)
- An auto-commit + push step at the end

Existing task schedules (to avoid clashes):
- `ai-coding-daily-brief`: 10:39 AM
- `dev-news-daily-brief`: 08:24 AM
- `backend-fullstack-daily-brief`: 08:54 AM

Pick something else (e.g. 09:15 AM or 11:30 AM).

## Step 5 — Create the first brief

Delegate to the `brief-new` skill:

> "Use the `brief-new` skill to create the first brief for `{slug}` with these topics: [...]"

Or, if the user set up a scheduled task, just wait for the next cron fire.

## Step 6 — Commit

```bash
cd /Users/ovi/Data/Projects/Blog && \
  git add src/consts.ts src/content.config.ts src/pages/{slug}/ public/styles/ai-coding-brief.css public/icons/ && \
  git commit -m "feat: add {slug} category scaffold" && \
  git push
```

## Quality checklist

- [ ] `consts.ts` entry has label, description, icon (lucide:*), accent hex, emoji fallback
- [ ] `content.config.ts` has new collection + slug in the enum
- [ ] `src/content/{slug}/` directory exists (empty is fine)
- [ ] Both route files (`index.astro` + `[...slug].astro`) exist under `src/pages/{slug}/`
- [ ] CSS has left-border accent for each new section class
- [ ] CSS has icon `mask-image` for each new section class
- [ ] New section classes added to the two `:is()` gates that drive the icon overlay
- [ ] New section classes added to the scroll-reveal selector list
- [ ] `pnpm dev` compiles cleanly and the new category appears in the nav + home
- [ ] (Optional) scheduled task created, tested, commit convention matches

## Reference

- Existing scaffolding: look at `src/pages/ai-coding/` vs `backend-fullstack/` vs `dev-news/` for the exact patterns
- Colors: use a hue that doesn't clash with the existing 3 (violet, cyan, purple)
