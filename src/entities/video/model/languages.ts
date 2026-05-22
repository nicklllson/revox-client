export type TLanguage = {
	label: string;
	value: string;
	providers: Array<'edge-tts' | 'silero'>;
};

export const AVAILABLE_LANGUAGES: readonly TLanguage[] = [
	{
		label: 'Russian',
		value: 'ru',
		providers: ['edge-tts', 'silero'],
	},
	{
		label: 'English',
		value: 'en',
		providers: ['edge-tts', 'silero'],
	},
	{
		label: 'Spanish',
		value: 'es',
		providers: ['edge-tts', 'silero'],
	},
	{
		label: 'French',
		value: 'fr',
		providers: ['edge-tts', 'silero'],
	},
	{
		label: 'German',
		value: 'de',
		providers: ['edge-tts', 'silero'],
	},
	{
		label: 'Japanese',
		value: 'ja',
		providers: ['edge-tts'],
	},
	{
		label: 'Chinese',
		value: 'zh-cn',
		providers: ['edge-tts'],
	},
] as const;
