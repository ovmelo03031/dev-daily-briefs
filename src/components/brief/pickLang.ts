export type Lang = 'es' | 'en' | 'fr';

export type I18nValue =
	| string
	| { es?: string; en: string; fr?: string };

/**
 * Returns the best-matching localized string for a given target language.
 * Falls back to `en` when the requested locale is missing, then to `es`,
 * then to the first non-empty string available. Strings are treated as
 * locale-agnostic and returned as-is.
 */
export function pickLang(value: I18nValue | undefined, lang: Lang): string {
	if (value === undefined || value === null) return '';
	if (typeof value === 'string') return value;
	const direct = value[lang];
	if (direct) return direct;
	if (value.en) return value.en;
	if (value.es) return value.es;
	if (value.fr) return value.fr;
	return '';
}

/** True when `value` has an explicit entry for `lang` (no fallback). */
export function hasLang(value: I18nValue | undefined, lang: Lang): boolean {
	if (value === undefined || value === null) return false;
	if (typeof value === 'string') return true;
	return Boolean(value[lang]);
}
