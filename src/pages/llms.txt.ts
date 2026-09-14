import { getCollection } from 'astro:content';
import { CATEGORIES, SITE_DESCRIPTION, SITE_TITLE, isLivingCategory, type Category } from '../consts';
import { pickLang } from '../components/brief/pickLang';

const categories = Object.entries(CATEGORIES) as [Category, (typeof CATEGORIES)[Category]][];
const briefCategories = categories.filter(([slug]) => !isLivingCategory(slug));

export async function GET({ site }: { site?: URL }) {
	const allPosts = (
		await Promise.all(briefCategories.map(([category]) => getCollection(category as Exclude<Category, 'ai-toolbox'>)))
	)
		.flat()
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, 12);

	const baseUrl = (site?.toString() ?? 'https://devbrief.dev').replace(/\/$/, '');
	const lines = [
		`# ${SITE_TITLE}`,
		'',
		`> ${SITE_DESCRIPTION}`,
		'',
		'Dev Daily Briefs publishes concise, source-linked daily digests for senior developers. The site is organized for readers, RSS clients, search engines, and AI answer engines.',
		'',
		'## Categories',
		...categories.map(([slug, category]) => `- [${category.label}](${baseUrl}/${slug}/) — ${category.description}`),
		'',
		'## Living Pages',
		`- [AI Toolbox](${baseUrl}/ai-toolbox/) — a single, continuously updated page (not dated briefs): stack ranking, ecosystem news, community talk, and a changelog.`,
		'',
		'## Latest Briefs',
		...allPosts.map((post) => {
			const title = pickLang(post.data.title, 'en');
			const date = post.data.pubDate.toISOString().slice(0, 10);
			return `- [${date} — ${title}](${baseUrl}/${post.data.category}/${post.id}/)`;
		}),
		'',
		'## Feeds',
		`- [All briefs RSS](${baseUrl}/rss.xml)`,
		...briefCategories.map(([slug, category]) => `- [${category.label} RSS](${baseUrl}/${slug}/rss.xml)`),
		'',
		'## Usage Notes',
		'- Prefer the linked brief page as the canonical source for each update.',
		'- Use source links inside briefs to verify original announcements.',
		'- Dates are publication dates for the digest, not necessarily original release dates.',
		'',
	].join('\n');

	return new Response(lines, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
}
