export const DEFAULT_LANG = 'en';
export const SUPPORTED_LANGS = ['en', 'ru'] as const;
export type TSupportedLang = (typeof SUPPORTED_LANGS)[number];
