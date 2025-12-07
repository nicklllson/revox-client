import type { TSupportedLang } from './constants';

export function createI18nPath(lang: TSupportedLang, path: string): string {
	const cleanPath = path.startsWith('/') ? path : `/${path}`;
	return `/${lang}${cleanPath}`;
}
