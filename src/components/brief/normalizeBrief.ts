import { pickLang, type I18nValue } from './pickLang';

type FlatHighlight = {
	text: string;
	text_es?: string;
	text_fr?: string;
	anchor: string;
	icon?: string;
};

type RawHighlight = {
	text: I18nValue;
	text_es?: string;
	text_fr?: string;
	anchor: string;
	icon?: string;
};

/**
 * Normalize a brief's frontmatter/JSON data into the shape the
 * BlogPost layout expects. Handles both legacy MD briefs (flat
 * fields like `text_es`) and new JSON briefs (nested `text.es`).
 */
export function normalizeBrief<T extends {
	title: I18nValue;
	description: I18nValue;
	highlights?: RawHighlight[];
	tools?: unknown[];
}>(data: T) {
	const isStructured = Array.isArray(data.tools) && data.tools.length > 0;

	const highlightsForLayout: FlatHighlight[] = (data.highlights ?? []).map((h) => {
		if (typeof h.text === 'string') {
			return {
				text: h.text,
				text_es: h.text_es,
				text_fr: h.text_fr,
				anchor: h.anchor,
				icon: h.icon,
			};
		}
		const t = h.text as { es?: string; en: string; fr?: string };
		return {
			text: t.en,
			text_es: t.es,
			text_fr: t.fr,
			anchor: h.anchor,
			icon: h.icon,
		};
	});

	const title = pickLang(data.title, 'en');
	const description = pickLang(data.description, 'en');

	return { isStructured, title, description, highlightsForLayout };
}
