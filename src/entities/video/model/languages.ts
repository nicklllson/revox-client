export type TLanguage = {
	label: string;
	value: string;
	providers: Array<'edge-tts' | 'coqui' | 'piper' | 'eleven-labs'>;
};

export const AVAILABLE_LANGUAGES: readonly TLanguage[] = [
	{ label: 'Russian', value: 'ru', providers: ['edge-tts', 'coqui', 'piper'] },
	{ label: 'English', value: 'en', providers: ['edge-tts', 'coqui', 'piper'] },
	{ label: 'Spanish', value: 'es', providers: ['edge-tts', 'coqui', 'piper'] },
	{ label: 'French', value: 'fr', providers: ['edge-tts', 'coqui', 'piper'] },
	{ label: 'German', value: 'de', providers: ['edge-tts', 'coqui', 'piper'] },
	{ label: 'Italian', value: 'it', providers: ['edge-tts', 'coqui', 'piper'] },
	{ label: 'Portuguese', value: 'pt', providers: ['edge-tts', 'coqui'] },
	{ label: 'Polish', value: 'pl', providers: ['edge-tts', 'coqui'] },
	{ label: 'Turkish', value: 'tr', providers: ['edge-tts', 'coqui'] },
	{ label: 'Dutch', value: 'nl', providers: ['edge-tts', 'coqui'] },
	{ label: 'Czech', value: 'cs', providers: ['edge-tts', 'coqui'] },
	{ label: 'Arabic', value: 'ar', providers: ['edge-tts', 'coqui'] },
	{
		label: 'Hungarian',
		value: 'hu',
		providers: ['edge-tts', 'coqui', 'piper'],
	},
	{ label: 'Korean', value: 'ko', providers: ['edge-tts', 'coqui'] },
	{ label: 'Hindi', value: 'hi', providers: ['edge-tts', 'coqui'] },
	{ label: 'Chinese', value: 'zh', providers: ['edge-tts', 'coqui'] },
	{ label: 'Japanese', value: 'ja', providers: ['edge-tts'] },
] as const;
