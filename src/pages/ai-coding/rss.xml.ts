import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { CATEGORIES, SITE_TITLE } from '../../consts';
import { sortByDateDesc, toRssItem } from '../../utils/rss';

export async function GET(context: APIContext) {
	const posts = await getCollection('ai-coding');
	const cat = CATEGORIES['ai-coding'];
	return rss({
		title: `${cat.label} — ${SITE_TITLE}`,
		description: cat.description,
		site: context.site ?? 'https://devbrief.dev',
		items: sortByDateDesc(posts).slice(0, 50).map(toRssItem),
	});
}
