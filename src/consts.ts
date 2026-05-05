export const SITE_TITLE = 'Dev Daily Briefs';
export const SITE_DESCRIPTION = 'Curated daily digests for senior developers — AI tools, backend, and frontend news.';
export const SITE_AUTHOR = 'Oswaldo Victor Melo Perez';
export const SITE_REPO_URL = 'https://github.com/ovmelo03031/dev-daily-briefs';
export const SITE_ALTERNATE_NAMES = ['Dev Brief', 'DevBrief', 'Dev Daily Brief'];
export const SITE_SAME_AS = [SITE_REPO_URL];
export const AUTHOR_PATH = '/about/oswaldo-victor-melo-perez/';

export const LANGUAGES = {
	es: { code: 'es', flag: '🇪🇸', label: 'Español', ogLocale: 'es_ES' },
	en: { code: 'en', flag: '🇬🇧', label: 'English', ogLocale: 'en_US' },
	fr: { code: 'fr', flag: '🇫🇷', label: 'Français', ogLocale: 'fr_FR' },
} as const;

export const DEFAULT_LANG = 'en';
export type LangCode = keyof typeof LANGUAGES;

export const CATEGORIES = {
	'ai-coding': {
		label: 'AI Coding',
		label_es: 'Programación con IA',
		label_fr: 'Programmation avec IA',
		description: 'Daily digest of AI coding tools and model launches',
		description_es: 'Resumen diario de herramientas de programación con IA y lanzamientos de modelos',
		description_fr: 'Résumé quotidien des outils de programmation avec IA et des lancements de modèles',
		emoji: '🤖',
		icon: 'lucide:bot',
		accent: '#7c6aff',
	},
	'backend-fullstack': {
		label: 'Backend & Fullstack',
		label_es: 'Backend y Fullstack',
		label_fr: 'Backend et Fullstack',
		description: 'TypeScript backend, Node.js, databases, DevOps, architecture',
		description_es: 'Backend TypeScript, Node.js, bases de datos, DevOps y arquitectura',
		description_fr: 'Backend TypeScript, Node.js, bases de données, DevOps et architecture',
		emoji: '⚙️',
		icon: 'lucide:server',
		accent: '#22d3ee',
	},
	'dev-news': {
		label: 'Dev News',
		label_es: 'Noticias Dev',
		label_fr: 'Actus Dev',
		description: 'Frontend, TypeScript, CSS, React, frameworks, and web platform',
		description_es: 'Frontend, TypeScript, CSS, React, frameworks y plataforma web',
		description_fr: 'Frontend, TypeScript, CSS, React, frameworks et plateforme web',
		emoji: '🧑‍💻',
		icon: 'lucide:code',
		accent: '#7c3aed',
	},
	'gentleman-releases': {
		label: 'Gentleman Releases',
		label_es: 'Lanzamientos Gentleman',
		label_fr: 'Versions Gentleman',
		description: 'Daily releases digest of Gentleman-Programming projects (engram, gentle-ai)',
		description_es: 'Resumen diario de lanzamientos de proyectos Gentleman-Programming (engram, gentle-ai)',
		description_fr: 'Résumé quotidien des versions des projets Gentleman-Programming (engram, gentle-ai)',
		emoji: '👨🏻',
		icon: 'local:mustache',
		image: '/icons/custom/gentleman-avatar.png',
		accent: '#ec4899',
	},
} as const;

export type Category = keyof typeof CATEGORIES;
