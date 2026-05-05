export const SITE_TITLE = 'Dev Daily Briefs';
export const SITE_DESCRIPTION = 'Curated daily digests for senior developers — AI tools, backend, and frontend news.';

export const CATEGORIES = {
	'ai-coding': {
		label: 'AI Coding',
		description: 'Daily digest of AI coding tools and model launches',
		emoji: '🤖',
		icon: 'lucide:bot',
		accent: '#7c6aff',
	},
	'backend-fullstack': {
		label: 'Backend & Fullstack',
		description: 'TypeScript backend, Node.js, databases, DevOps, architecture',
		emoji: '⚙️',
		icon: 'lucide:server',
		accent: '#22d3ee',
	},
	'dev-news': {
		label: 'Dev News',
		description: 'Frontend, TypeScript, CSS, React, frameworks, and web platform',
		emoji: '🧑‍💻',
		icon: 'lucide:code',
		accent: '#7c3aed',
	},
	'gentleman-releases': {
		label: 'Gentleman Releases',
		description: 'Daily releases digest of Gentleman-Programming projects (engram, gentle-ai)',
		emoji: '👨🏻',
		icon: 'local:mustache',
		image: '/icons/custom/gentleman-avatar.png',
		accent: '#ec4899',
	},
} as const;

export type Category = keyof typeof CATEGORIES;
