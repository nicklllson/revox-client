import { createI18nPath } from './services';
import { useLanguage } from './use-language';

export function useI18nPath() {
	const { currentLang } = useLanguage();
	return (path: string) => createI18nPath(currentLang, path);
}
