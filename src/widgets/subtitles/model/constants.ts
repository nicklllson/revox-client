import type { TSubLang } from './types';

export const LANG_OPTIONS: { value: TSubLang; label: string }[] = [
	{ value: 'translated', label: 'Translated' },
	{ value: 'original', label: 'Original' },
	{ value: 'both', label: 'Translated + Original' },
];
