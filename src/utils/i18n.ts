import { DEFAULT_LANG, LANGUAGES, type LangCode } from '../consts';

const LOCALE_PREFIX = /^\/(es|fr)(?=\/|$)/;

export const LANG_CODES = Object.keys(LANGUAGES) as LangCode[];
export const LOCALIZED_LANG_CODES = LANG_CODES.filter((lang) => lang !== DEFAULT_LANG);

export function isLangCode(value: string | undefined): value is LangCode {
	return value === 'es' || value === 'en' || value === 'fr';
}

export function getLangFromPath(pathname: string): LangCode {
	const match = pathname.match(LOCALE_PREFIX);
	const lang = match?.[1];
	return isLangCode(lang) ? lang : DEFAULT_LANG;
}

export function stripLangFromPath(pathname: string): string {
	const path = pathname.replace(LOCALE_PREFIX, '') || '/';
	return path.startsWith('/') ? path : `/${path}`;
}

export function localizePath(pathname: string, lang: LangCode): string {
	const basePath = stripLangFromPath(pathname);
	if (lang === DEFAULT_LANG) return basePath;
	return basePath === '/' ? `/${lang}/` : `/${lang}${basePath}`;
}

export function getLocalizedUrl(site: URL | undefined, pathname: string, lang: LangCode): string {
	const path = localizePath(pathname, lang);
	return site ? new URL(path, site).toString() : path;
}
