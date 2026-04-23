import { SITE_TITLE, SITE_DESCRIPTION, CATEGORIES, type Category } from '../consts';

type Url = string | URL;

function abs(site: URL | undefined, path: string): string {
	if (!site) return path;
	return new URL(path, site).toString();
}

export function buildWebSiteSchema(site: URL | undefined) {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_TITLE,
		description: SITE_DESCRIPTION,
		url: site ? site.toString() : undefined,
	};
}

export function buildOrganizationSchema(site: URL | undefined) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: SITE_TITLE,
		url: site ? site.toString() : undefined,
		logo: abs(site, '/favicon-512.png'),
	};
}

export interface ArticleInput {
	title: string;
	description: string;
	pubDate: Date;
	category: Category;
	url: Url;
	image?: string;
}

export function buildArticleSchema(input: ArticleInput, site: URL | undefined) {
	const cat = CATEGORIES[input.category];
	const imageUrl = abs(site, input.image ?? '/og-image.png');
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: input.title,
		description: input.description,
		datePublished: input.pubDate.toISOString(),
		dateModified: input.pubDate.toISOString(),
		articleSection: cat.label,
		image: imageUrl,
		url: typeof input.url === 'string' ? input.url : input.url.toString(),
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': typeof input.url === 'string' ? input.url : input.url.toString(),
		},
		publisher: {
			'@type': 'Organization',
			name: SITE_TITLE,
			logo: {
				'@type': 'ImageObject',
				url: abs(site, '/favicon-512.png'),
			},
		},
	};
}

export interface BreadcrumbItem {
	name: string;
	url: Url;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: typeof item.url === 'string' ? item.url : item.url.toString(),
		})),
	};
}
