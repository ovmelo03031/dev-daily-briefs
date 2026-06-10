import type { CollectionEntry } from 'astro:content';
import type { Category } from '../consts';

type BriefEntry = CollectionEntry<Category>;

export interface EntityTag {
	slug: string;
	label: string;
	/** Lowercase substrings matched against tool names, update titles, and providers. */
	aliases: string[];
}

// Curated registry — only entities worth a hub page. Matching is
// case-insensitive substring, so keep aliases specific enough to avoid
// false positives (e.g. 'go' or 'js' alone would match everything).
export const ENTITIES: EntityTag[] = [
	// AI coding tools
	{ slug: 'claude-code', label: 'Claude Code', aliases: ['claude code'] },
	{ slug: 'codex', label: 'OpenAI Codex', aliases: ['codex'] },
	{ slug: 'github-copilot', label: 'GitHub Copilot', aliases: ['copilot'] },
	{ slug: 'gemini', label: 'Google Gemini', aliases: ['gemini'] },
	{ slug: 'cursor', label: 'Cursor', aliases: ['cursor'] },
	{ slug: 'windsurf', label: 'Windsurf', aliases: ['windsurf'] },
	// Model providers
	{ slug: 'anthropic', label: 'Anthropic', aliases: ['anthropic', 'claude opus', 'claude sonnet', 'claude haiku'] },
	{ slug: 'openai', label: 'OpenAI', aliases: ['openai', 'gpt-'] },
	{ slug: 'google', label: 'Google', aliases: ['google', 'deepmind'] },
	{ slug: 'deepseek', label: 'DeepSeek', aliases: ['deepseek'] },
	{ slug: 'qwen', label: 'Qwen (Alibaba)', aliases: ['qwen', 'alibaba'] },
	{ slug: 'kimi', label: 'Kimi (Moonshot)', aliases: ['kimi', 'moonshot'] },
	{ slug: 'glm', label: 'GLM (Zhipu)', aliases: ['glm-', 'zhipu'] },
	{ slug: 'doubao', label: 'Doubao (ByteDance)', aliases: ['doubao', 'bytedance'] },
	{ slug: 'minimax', label: 'MiniMax', aliases: ['minimax'] },
	{ slug: 'mistral', label: 'Mistral', aliases: ['mistral'] },
	{ slug: 'meta-ai', label: 'Meta AI', aliases: ['llama'] },
	{ slug: 'xai', label: 'xAI', aliases: ['grok', 'xai'] },
	{ slug: 'microsoft', label: 'Microsoft', aliases: ['microsoft', 'azure', 'vs code', 'vscode'] },
	// Backend / runtime
	{ slug: 'nodejs', label: 'Node.js', aliases: ['node.js', 'nodejs', 'node '] },
	{ slug: 'deno', label: 'Deno', aliases: ['deno'] },
	{ slug: 'bun', label: 'Bun', aliases: ['bun '] },
	{ slug: 'typescript', label: 'TypeScript', aliases: ['typescript'] },
	{ slug: 'postgres', label: 'PostgreSQL', aliases: ['postgres'] },
	{ slug: 'docker', label: 'Docker', aliases: ['docker'] },
	{ slug: 'kubernetes', label: 'Kubernetes', aliases: ['kubernetes', 'k8s'] },
	{ slug: 'hono', label: 'Hono', aliases: ['hono'] },
	{ slug: 'nestjs', label: 'NestJS', aliases: ['nestjs', 'nest.js'] },
	// Frontend / web platform
	{ slug: 'react', label: 'React', aliases: ['react '] },
	{ slug: 'react-native', label: 'React Native', aliases: ['react native'] },
	{ slug: 'nextjs', label: 'Next.js', aliases: ['next.js', 'nextjs'] },
	{ slug: 'astro', label: 'Astro', aliases: ['astro '] },
	{ slug: 'tailwind', label: 'Tailwind CSS', aliases: ['tailwind'] },
	{ slug: 'vite', label: 'Vite', aliases: ['vite '] },
	{ slug: 'angular', label: 'Angular', aliases: ['angular'] },
	{ slug: 'vue', label: 'Vue', aliases: ['vue '] },
	{ slug: 'css', label: 'CSS', aliases: ['css '] },
	// Gentleman-Programming projects
	{ slug: 'engram', label: 'Engram', aliases: ['engram'] },
	{ slug: 'gentle-ai', label: 'Gentle AI', aliases: ['gentle-ai', 'gentle ai'] },
];

const ENTITY_BY_SLUG = new Map(ENTITIES.map((e) => [e.slug, e]));

export function getEntity(slug: string): EntityTag | undefined {
	return ENTITY_BY_SLUG.get(slug);
}

function textOf(value: unknown): string {
	if (typeof value === 'string') return value;
	if (value && typeof value === 'object' && 'en' in value) return String((value as { en?: unknown }).en ?? '');
	return '';
}

export interface ExtractTagsOptions {
	/**
	 * Include the model-catalog table as a tag source. The ai-coding model
	 * table lists every provider daily, so hub pages want it (full coverage)
	 * but per-brief chips don't (it would tag every provider on every brief).
	 */
	includeModels?: boolean;
}

/**
 * Derives entity tags for a brief from its structured data: tool section
 * names, update titles, and (optionally) model provider/name fields.
 * Returns slugs in registry order so output is deterministic.
 */
export function extractTags(data: BriefEntry['data'], { includeModels = true }: ExtractTagsOptions = {}): string[] {
	const haystackParts: string[] = [];
	const d = data as Record<string, unknown>;

	const tools = d.tools as Array<{ name?: unknown; updates?: Array<{ title?: unknown }> }> | undefined;
	for (const tool of tools ?? []) {
		haystackParts.push(textOf(tool.name));
		for (const update of tool.updates ?? []) haystackParts.push(textOf(update.title));
	}

	if (includeModels) {
		const models = d.models as Array<{ provider?: unknown; model?: unknown; name?: unknown }> | undefined;
		for (const model of models ?? []) {
			haystackParts.push(textOf(model.provider), textOf(model.model), textOf(model.name));
		}
	}

	const haystack = ` ${haystackParts.join(' ').toLowerCase()} `;
	return ENTITIES.filter((e) => e.aliases.some((alias) => haystack.includes(alias))).map((e) => e.slug);
}

function matchesEntity(entity: EntityTag, text: string): boolean {
	const haystack = ` ${text.toLowerCase()} `;
	return entity.aliases.some((alias) => haystack.includes(alias));
}

/**
 * Resolves the in-page anchor where an entity appears in a brief, so tag hub
 * pages can deep-link straight to the relevant section (HighlightBar's hash
 * handler scrolls to `[data-anchor]` and flashes it). Priority: tool section
 * whose NAME matches, then tool section whose update titles match, then the
 * model-catalog anchor. Returns undefined when the entity has no section
 * (link falls back to the top of the brief).
 */
export function resolveTagAnchor(data: BriefEntry['data'], slug: string): string | undefined {
	const entity = ENTITY_BY_SLUG.get(slug);
	if (!entity) return undefined;
	const d = data as Record<string, unknown>;

	const tools = d.tools as
		| Array<{ name?: unknown; id?: unknown; anchor?: unknown; updates?: Array<{ title?: unknown }> }>
		| undefined;

	for (const tool of tools ?? []) {
		if (matchesEntity(entity, textOf(tool.name))) {
			return textOf(tool.anchor) || textOf(tool.id) || undefined;
		}
	}
	for (const tool of tools ?? []) {
		const updateText = (tool.updates ?? []).map((u) => textOf(u.title)).join(' ');
		if (matchesEntity(entity, updateText)) {
			return textOf(tool.anchor) || textOf(tool.id) || undefined;
		}
	}

	const models = d.models as Array<{ provider?: unknown; model?: unknown; name?: unknown }> | undefined;
	const modelText = (models ?? [])
		.map((m) => `${textOf(m.provider)} ${textOf(m.model)} ${textOf(m.name)}`)
		.join(' ');
	if (modelText && matchesEntity(entity, modelText)) {
		return textOf(d.model_timeline_anchor) || undefined;
	}

	return undefined;
}
