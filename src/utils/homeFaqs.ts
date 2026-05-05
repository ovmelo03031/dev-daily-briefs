import { DEFAULT_LANG, type LangCode } from '../consts';

export interface HomeFaq {
	question: string;
	answer: string;
}

const HOME_FAQS = {
	en: [
		{
			question: 'What is Dev Daily Briefs?',
			answer: 'Dev Daily Briefs is a daily developer news digest for senior engineers. It curates AI coding tools, backend and fullstack updates, frontend news, and Gentleman Programming releases into concise briefs with source links.',
		},
		{
			question: 'How often is Dev Daily Briefs updated?',
			answer: 'Dev Daily Briefs is updated daily when relevant developer news is available. Each brief includes publication dates, category context, and links to primary sources so readers and AI assistants can verify the original announcements.',
		},
		{
			question: 'Which topics does Dev Daily Briefs cover?',
			answer: 'Dev Daily Briefs covers AI coding tools, model launches, TypeScript backend development, Node.js, databases, DevOps, frontend frameworks, CSS, React, Astro, and selected Gentleman Programming project releases.',
		},
		{
			question: 'Is Dev Daily Briefs useful for AI search?',
			answer: 'Dev Daily Briefs is structured for AI search with concise summaries, category pages, RSS feeds, source links, JSON-LD structured data, and an llms.txt index that helps answer engines understand the site.',
		},
	],
	es: [
		{
			question: '¿Qué es Dev Daily Briefs?',
			answer: 'Dev Daily Briefs es un resumen diario de noticias para desarrolladores senior. Cura herramientas de programación con IA, backend, fullstack, frontend y lanzamientos de Gentleman Programming en briefs concisos con fuentes.',
		},
		{
			question: '¿Cada cuánto se actualiza Dev Daily Briefs?',
			answer: 'Dev Daily Briefs se actualiza diariamente cuando hay noticias relevantes para desarrolladores. Cada brief incluye fecha de publicación, contexto de categoría y enlaces a fuentes primarias para verificar los anuncios originales.',
		},
		{
			question: '¿Qué temas cubre Dev Daily Briefs?',
			answer: 'Dev Daily Briefs cubre herramientas de programación con IA, lanzamientos de modelos, backend con TypeScript, Node.js, bases de datos, DevOps, frameworks frontend, CSS, React, Astro y proyectos Gentleman Programming.',
		},
		{
			question: '¿Dev Daily Briefs sirve para búsqueda con IA?',
			answer: 'Dev Daily Briefs está estructurado para búsqueda con IA mediante resúmenes concisos, páginas de categoría, feeds RSS, enlaces a fuentes, datos JSON-LD y un índice llms.txt para motores de respuesta.',
		},
	],
	fr: [
		{
			question: 'Qu’est-ce que Dev Daily Briefs ?',
			answer: 'Dev Daily Briefs est un résumé quotidien d’actualité pour développeurs seniors. Il sélectionne outils de programmation avec IA, backend, fullstack, frontend et versions Gentleman Programming dans des briefs concis avec sources.',
		},
		{
			question: 'À quelle fréquence Dev Daily Briefs est-il mis à jour ?',
			answer: 'Dev Daily Briefs est mis à jour chaque jour lorsque des nouvelles développeur pertinentes sont disponibles. Chaque brief inclut une date, une catégorie et des liens vers les sources primaires.',
		},
		{
			question: 'Quels sujets couvre Dev Daily Briefs ?',
			answer: 'Dev Daily Briefs couvre les outils de programmation avec IA, lancements de modèles, backend TypeScript, Node.js, bases de données, DevOps, frameworks frontend, CSS, React, Astro et projets Gentleman Programming.',
		},
		{
			question: 'Dev Daily Briefs est-il utile pour la recherche IA ?',
			answer: 'Dev Daily Briefs est structuré pour la recherche IA avec des résumés concis, pages de catégorie, flux RSS, liens sources, données JSON-LD et un index llms.txt pour les moteurs de réponse.',
		},
	],
} as const satisfies Record<LangCode, HomeFaq[]>;

export function getHomeFaqs(lang: LangCode = DEFAULT_LANG): HomeFaq[] {
	return HOME_FAQS[lang];
}
