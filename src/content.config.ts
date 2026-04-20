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
	version: z.string().optional(),
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
	category: z.enum(['ai-coding', 'backend-fullstack', 'dev-news']),
	highlights: z.array(highlightSchema).optional(),
	// Structured body — when present, the page renders via components
	// instead of rendering the markdown body.
	stats: statsSchema.optional(),
	tools: z.array(toolSchema).optional(),
	models: z.array(modelSchema).optional(),
	model_timeline_anchor: z.string().optional(),
	notable_trends: z.array(i18nString).optional(),
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

export const collections = {
	'ai-coding': aiCoding,
	'backend-fullstack': backendFullstack,
	'dev-news': devNews,
};
