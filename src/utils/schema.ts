import {
	AUTHOR_PATH,
	SITE_ALTERNATE_NAMES,
	SITE_AUTHOR,
	SITE_DESCRIPTION,
	SITE_SAME_AS,
	SITE_TITLE,
	type Category,
	type LangCode,
} from '../consts';
import { getCategoryLabel } from './categoryCopy';

type Url = string | URL;

function abs(site: URL | undefined, path: string): string {
	if (!site) return path;
	return new URL(path, site).toString();
}

export function buildWebSiteSchema(site: URL | undefined, lang: LangCode = 'en') {
	const siteUrl = site ? site.toString() : undefined;
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': siteUrl ? `${siteUrl}#website` : undefined,
		name: SITE_TITLE,
		alternateName: SITE_ALTERNATE_NAMES,
		description: SITE_DESCRIPTION,
		url: siteUrl,
		inLanguage: lang,
		publisher: siteUrl ? { '@id': `${siteUrl}#organization` } : undefined,
	};
}

export function buildOrganizationSchema(site: URL | undefined) {
	const siteUrl = site ? site.toString() : undefined;
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': siteUrl ? `${siteUrl}#organization` : undefined,
		name: SITE_TITLE,
		alternateName: SITE_ALTERNATE_NAMES,
		url: siteUrl,
		logo: abs(site, '/favicon-512.png'),
		sameAs: SITE_SAME_AS,
		founder: siteUrl ? { '@id': `${abs(site, AUTHOR_PATH)}#person` } : undefined,
	};
}

export function buildPersonSchema(site: URL | undefined) {
	const authorUrl = abs(site, AUTHOR_PATH);
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${authorUrl}#person`,
		name: SITE_AUTHOR,
		url: authorUrl,
		jobTitle: 'Software architect and curator',
		worksFor: site ? { '@id': `${site.toString()}#organization` } : undefined,
	};
}

export interface ArticleInput {
	title: string;
	description: string;
	pubDate: Date;
	category: Category;
	url: Url;
	image?: string;
	lang?: LangCode;
}

export function buildArticleSchema(input: ArticleInput, site: URL | undefined) {
	const imageUrl = abs(site, input.image ?? '/og-image.jpg');
	const url = typeof input.url === 'string' ? input.url : input.url.toString();
	const lang = input.lang ?? 'en';
	return {
		'@context': 'https://schema.org',
		'@type': 'NewsArticle',
		'@id': `${url}#article`,
		headline: input.title,
		description: input.description,
		datePublished: input.pubDate.toISOString(),
		dateModified: input.pubDate.toISOString(),
		articleSection: getCategoryLabel(input.category, lang),
		inLanguage: lang,
		isAccessibleForFree: true,
		image: imageUrl,
		url,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': url,
		},
		author: {
			'@type': 'Person',
			'@id': `${abs(site, AUTHOR_PATH)}#person`,
			name: SITE_AUTHOR,
		},
		publisher: {
			'@type': 'Organization',
			'@id': site ? `${site.toString()}#organization` : undefined,
			name: SITE_TITLE,
			logo: {
				'@type': 'ImageObject',
				url: abs(site, '/favicon-512.png'),
			},
		},
	};
}

export interface FaqItem {
	question: string;
	answer: string;
}

export function buildFaqPageSchema(faqs: FaqItem[]) {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer,
			},
		})),
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
