import { CATEGORIES, DEFAULT_LANG, type Category, type LangCode } from '../consts';

export function getCategoryLabel(category: Category, lang: LangCode = DEFAULT_LANG): string {
	const cat = CATEGORIES[category];
	if (lang === 'es') return cat.label_es;
	if (lang === 'fr') return cat.label_fr;
	return cat.label;
}

export function getCategoryDescription(category: Category, lang: LangCode = DEFAULT_LANG): string {
	const cat = CATEGORIES[category];
	if (lang === 'es') return cat.description_es;
	if (lang === 'fr') return cat.description_fr;
	return cat.description;
}
