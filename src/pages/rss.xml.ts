import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { sortByDateDesc, toRssItem } from '../utils/rss';

export async function GET(context: APIContext) {
	const posts = (
		await Promise.all([
			getCollection('ai-coding'),
			getCollection('backend-fullstack'),
			getCollection('dev-news'),
			getCollection('gentleman-releases'),
			getCollection('ai-security'),
		])
	).flat();

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site ?? 'https://devbrief.dev',
		items: sortByDateDesc(posts).slice(0, 50).map(toRssItem),
	});
}
