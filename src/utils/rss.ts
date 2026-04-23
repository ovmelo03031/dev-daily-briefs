import type { CollectionEntry } from 'astro:content';
import { pickLang } from '../components/brief/pickLang';
import type { Category } from '../consts';

type BriefEntry = CollectionEntry<'ai-coding' | 'backend-fullstack' | 'dev-news'>;

export function toRssItem(post: BriefEntry) {
	const title = pickLang(post.data.title as never, 'en');
	const description = pickLang(post.data.description as never, 'en');
	const category = post.data.category as Category;
	return {
		title,
		description,
		pubDate: post.data.pubDate,
		link: `/${category}/${post.id}/`,
		categories: [category],
	};
}

export function sortByDateDesc(posts: BriefEntry[]): BriefEntry[] {
	return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
