import type { CollectionEntry } from 'astro:content';
import type { Category } from '../consts';

type BriefEntry = CollectionEntry<Category>;

export interface BriefNeighbors {
	prev: BriefEntry | undefined;
	next: BriefEntry | undefined;
}

/**
 * Chronological neighbors of a brief within its own category.
 * `prev` is the older brief, `next` the newer one.
 */
export function getBriefNeighbors(posts: BriefEntry[], postId: string): BriefNeighbors {
	const sorted = [...posts].sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());
	const index = sorted.findIndex((p) => p.id === postId);
	if (index === -1) return { prev: undefined, next: undefined };
	return { prev: sorted[index - 1], next: sorted[index + 1] };
}
