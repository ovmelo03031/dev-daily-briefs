import { DEFAULT_LANG, type LangCode } from '../consts';

export const NAV_COPY = {
	dailyBriefs: {
		en: 'Daily Briefs',
		es: 'Briefs diarios',
		fr: 'Briefs quotidiens',
	},
	topics: {
		en: 'Topics',
		es: 'Temas',
		fr: 'Sujets',
	},
	menu: {
		en: 'Menu',
		es: 'Menú',
		fr: 'Menu',
	},
	close: {
		en: 'Close',
		es: 'Cerrar',
		fr: 'Fermer',
	},
} as const;

type NavKey = keyof typeof NAV_COPY;

export function getNavLabel(key: NavKey, lang: LangCode = DEFAULT_LANG): string {
	return NAV_COPY[key][lang];
}
