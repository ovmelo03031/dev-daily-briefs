import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const briefSchema = z.object({
	title: z.string(),
	description: z.string(),
	pubDate: z.coerce.date(),
	category: z.enum(['ai-coding', 'backend-fullstack', 'dev-news']),
});

const aiCoding = defineCollection({
	loader: glob({ base: './src/content/ai-coding', pattern: '**/*.{md,mdx}' }),
	schema: briefSchema,
});

const backendFullstack = defineCollection({
	loader: glob({ base: './src/content/backend-fullstack', pattern: '**/*.{md,mdx}' }),
	schema: briefSchema,
});

const devNews = defineCollection({
	loader: glob({ base: './src/content/dev-news', pattern: '**/*.{md,mdx}' }),
	schema: briefSchema,
});

export const collections = {
	'ai-coding': aiCoding,
	'backend-fullstack': backendFullstack,
	'dev-news': devNews,
};
