import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const i18nString = z.union([
	z.string(),
	z.object({
		es: z.string().optional(),
		en: z.string(),
		fr: z.string().optional(),
	}),
]);

const highlightSchema = z.object({
	text: z.union([z.string(), z.object({ es: z.string().optional(), en: z.string(), fr: z.string().optional() })]),
	text_es: z.string().optional(),
	text_fr: z.string().optional(),
	anchor: z.string(),
	icon: z.string().optional(),
});

const updateSchema = z.object({
	id: z.string().optional(),
	// Tag is a free-form string matching a CSS class `tag-<value>` defined in
	// ai-coding-brief.css. Common values per category:
	//   ai-coding:  feature | fix | model | preview | security | update
	//   dev-news:   breaking | notable | minor | patch | release | security | deprecation | ga | beta
	//   backend:    release | security | deprecation | breaking | notable | ga | beta | patch
	tag: z.string(),
	tag_label: z
		.union([z.string(), z.object({ es: z.string().optional(), en: z.string(), fr: z.string().optional() })])
		.optional(),
	title: i18nString,
	body_html: i18nString,
	date: z.string().optional(),
	source: z
		.object({
			url: z.string().url(),
			label: z.string().optional(),
		})
		.optional(),
});

const toolSchema = z.object({
	id: z.string(),
	name: z.string(),
	publisher: z.string().optional(),
	theme: z.string(),
	icon_emoji: z.string().optional(),
	icon: z.string().optional(),
	version: z.string().nullable().optional(),
	anchor: z.string().optional(),
	updates: z.array(updateSchema),
});

const modelSchema = z.object({
	date: z.string(),
	name: z.string(),
	provider: z.string(),
	provider_label: z.string().optional(),
	tier: z.enum(['splus', 's', 'aplus', 'a', 'bplus']),
	weight: z.enum(['open', 'proprietary', 'upcoming']),
	notes: i18nString,
	row_kind: z.enum(['recent', 'upcoming']).optional(),
});

const statsSchema = z.object({
	tools_tracked: z.union([z.number(), z.string()]).optional(),
	updates_found: z.union([z.number(), z.string()]).optional(),
	models_cataloged: z.union([z.number(), z.string()]).optional(),
	providers_covered: z.union([z.number(), z.string()]).optional(),
});

const briefSchema = z.object({
	title: i18nString,
	title_es: z.string().optional(),
	title_fr: z.string().optional(),
	description: z.union([z.string(), z.object({ es: z.string().optional(), en: z.string(), fr: z.string().optional() })]),
	pubDate: z.coerce.date(),
	category: z.enum(['ai-coding', 'backend-fullstack', 'dev-news', 'gentleman-releases', 'ai-security']),
	highlights: z.array(highlightSchema).optional(),
	// Structured body — when present, the page renders via components
	// instead of rendering the markdown body.
	stats: statsSchema.optional(),
	tools: z.array(toolSchema).optional(),
	models: z.array(modelSchema).optional(),
	model_timeline_anchor: z.string().optional(),
	notable_trends: z.array(i18nString).optional(),
});

// AI Toolbox — single living page upserted daily by a scheduled agent.
// Tools are split into two groups (`group: "oss" | "closed"`):
//   - "oss" tools have a public repo and get scored/ranked with the formula below
//     (documented for readers in `ranking.method` too):
//       score = w.stars * log10(stars + 1) / 6
//             + w.velocity * clamp((stars - stars_prev) / max(stars_prev, 1) * 10, 0, 1)
//             + w.community * clamp((hn_mentions_7d + reddit_mentions_7d) / 30, 0, 1)
//       Rank = sort by score desc, within the oss group only.
//   - "closed" tools have no public repo to measure, so `score`/`rank`/`rank_prev` are
//     omitted entirely; they carry `signals.hn_mentions_7d` and an optional `evidence`
//     array of short trilingual traction notes instead.
const toolboxSignalsSchema = z.object({
	stars: z.number().nullable(),
	stars_prev: z.number().nullable(),
	npm_weekly: z.number().nullable().optional(),
	hn_mentions_7d: z.number(),
	reddit_mentions_7d: z.number(),
});

const toolboxIconSchema = z.object({
	kind: z.enum(['mask', 'image']),
	src: z.string(),
	color: z.string().optional(),
});

const toolboxEvidenceItemSchema = i18nString;

const toolboxToolSchema = z.object({
	id: z.string(),
	name: z.string(),
	publisher: z.string(),
	kind: z.enum(['cli', 'ide', 'extension', 'agent', 'runtime', 'platform']),
	group: z.enum(['oss', 'closed']),
	url: z.string().url(),
	repo: z.string().optional(),
	npm: z.string().nullable().optional(),
	signals: toolboxSignalsSchema,
	score: z.number().optional(),
	rank: z.number().optional(),
	rank_prev: z.number().optional(),
	why: i18nString,
	icon: toolboxIconSchema.optional(),
	evidence: z.array(toolboxEvidenceItemSchema).optional(),
});

const toolboxEcosystemItemSchema = z.object({
	id: z.string(),
	date: z.string(),
	name: z.string(),
	category: z.enum(['mcp', 'agents', 'memory', 'evals', 'local-inference', 'prompting', 'ide', 'other']),
	summary: i18nString,
	source: z.object({ url: z.string().url(), label: z.string().optional() }),
});

const toolboxCommunityItemSchema = z.object({
	id: z.string(),
	date: z.string(),
	platform: z.enum(['hn', 'reddit']),
	community: z.string(),
	title: z.string(),
	url: z.string().url(),
	points: z.number(),
	comments: z.number(),
	takeaway: i18nString,
});

const toolboxChangelogEntrySchema = z.object({
	date: z.string(),
	kind: z.enum(['rank', 'add', 'remove', 'note']),
	text: i18nString,
});

const toolboxSchema = z.object({
	updated_at: z.string(),
	title: i18nString,
	description: i18nString,
	ranking: z.object({
		weights: z.object({ stars: z.number(), velocity: z.number(), community: z.number() }),
		window_days: z.number(),
		method: i18nString,
	}),
	tools: z.array(toolboxToolSchema),
	ecosystem: z.array(toolboxEcosystemItemSchema),
	community: z.array(toolboxCommunityItemSchema),
	changelog: z.array(toolboxChangelogEntrySchema),
});

const aiCoding = defineCollection({
	loader: glob({ base: './src/content/ai-coding', pattern: '**/*.{md,mdx,json}' }),
	schema: briefSchema,
});

const backendFullstack = defineCollection({
	loader: glob({ base: './src/content/backend-fullstack', pattern: '**/*.{md,mdx,json}' }),
	schema: briefSchema,
});

const devNews = defineCollection({
	loader: glob({ base: './src/content/dev-news', pattern: '**/*.{md,mdx,json}' }),
	schema: briefSchema,
});

const gentlemanReleases = defineCollection({
	loader: glob({ base: './src/content/gentleman-releases', pattern: '**/*.{md,mdx,json}' }),
	schema: briefSchema,
});

const aiSecurity = defineCollection({
	loader: glob({ base: './src/content/ai-security', pattern: '**/*.{md,mdx,json}' }),
	schema: briefSchema,
});

const aiToolbox = defineCollection({
	loader: glob({ base: './src/content/ai-toolbox', pattern: '**/*.json' }),
	schema: toolboxSchema,
});

export const collections = {
	'ai-coding': aiCoding,
	'backend-fullstack': backendFullstack,
	'dev-news': devNews,
	'gentleman-releases': gentlemanReleases,
	'ai-security': aiSecurity,
	'ai-toolbox': aiToolbox,
};
