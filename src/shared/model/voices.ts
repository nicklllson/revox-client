export type TVoiceGender = 'female' | 'male';
export type TVoiceStyle = 'neutral' | 'narrator';
export type TVoiceProvider = 'edge-tts' | 'silero';

export type VoiceOption = {
	id: string;
	name: string;
	gender: TVoiceGender;
	lang: string;
	provider: TVoiceProvider;
};

export const VOICE_OPTIONS: Record<string, VoiceOption[]> = {
	ru: [
		// Edge TTS
		{
			id: 'dmitry',
			name: 'Dmitry',
			gender: 'male',
			lang: 'ru',
			provider: 'edge-tts',
		},
		{
			id: 'anna',
			name: 'Anna',
			gender: 'female',
			lang: 'ru',
			provider: 'edge-tts',
		},
		{
			id: 'daria',
			name: 'Daria',
			gender: 'female',
			lang: 'ru',
			provider: 'edge-tts',
		},
		// Silero
		{
			id: 'kseniya',
			name: 'Kseniya',
			gender: 'female',
			lang: 'ru',
			provider: 'silero',
		},
		{
			id: 'xenia',
			name: 'Xenia',
			gender: 'female',
			lang: 'ru',
			provider: 'silero',
		},
		{
			id: 'baya',
			name: 'Baya',
			gender: 'female',
			lang: 'ru',
			provider: 'silero',
		},
		{
			id: 'aidar',
			name: 'Aidar',
			gender: 'male',
			lang: 'ru',
			provider: 'silero',
		},
		{
			id: 'eugene',
			name: 'Eugene',
			gender: 'male',
			lang: 'ru',
			provider: 'silero',
		},
	],
	en: [
		{
			id: 'jenny',
			name: 'Jenny',
			gender: 'female',
			lang: 'en',
			provider: 'edge-tts',
		},
		{
			id: 'aria',
			name: 'Aria',
			gender: 'female',
			lang: 'en',
			provider: 'edge-tts',
		},
		{
			id: 'guy',
			name: 'Guy',
			gender: 'male',
			lang: 'en',
			provider: 'edge-tts',
		},
		{
			id: 'davis',
			name: 'Davis',
			gender: 'male',
			lang: 'en',
			provider: 'edge-tts',
		},
		{
			id: 'en_0',
			name: 'EN Female',
			gender: 'female',
			lang: 'en',
			provider: 'silero',
		},
		{
			id: 'en_1',
			name: 'EN Male',
			gender: 'male',
			lang: 'en',
			provider: 'silero',
		},
	],
	es: [
		{
			id: 'elvira',
			name: 'Elvira',
			gender: 'female',
			lang: 'es',
			provider: 'edge-tts',
		},
		{
			id: 'alvaro',
			name: 'Alvaro',
			gender: 'male',
			lang: 'es',
			provider: 'edge-tts',
		},
		{
			id: 'tux',
			name: 'Tux',
			gender: 'female',
			lang: 'es',
			provider: 'silero',
		},
	],
	de: [
		{
			id: 'katja',
			name: 'Katja',
			gender: 'female',
			lang: 'de',
			provider: 'edge-tts',
		},
		{
			id: 'conrad',
			name: 'Conrad',
			gender: 'male',
			lang: 'de',
			provider: 'edge-tts',
		},
		{
			id: 'eva_k',
			name: 'Eva K',
			gender: 'female',
			lang: 'de',
			provider: 'silero',
		},
		{
			id: 'thorsten',
			name: 'Thorsten',
			gender: 'male',
			lang: 'de',
			provider: 'silero',
		},
	],
	fr: [
		{
			id: 'denise',
			name: 'Denise',
			gender: 'female',
			lang: 'fr',
			provider: 'edge-tts',
		},
		{
			id: 'henri',
			name: 'Henri',
			gender: 'male',
			lang: 'fr',
			provider: 'edge-tts',
		},
		{
			id: 'fr_0',
			name: 'FR Female',
			gender: 'female',
			lang: 'fr',
			provider: 'silero',
		},
		{
			id: 'fr_1',
			name: 'FR Male',
			gender: 'male',
			lang: 'fr',
			provider: 'silero',
		},
	],
	ja: [
		// Silero не поддерживает японский, только Edge TTS
		{
			id: 'nanami',
			name: 'Nanami',
			gender: 'female',
			lang: 'ja',
			provider: 'edge-tts',
		},
		{
			id: 'keita',
			name: 'Keita',
			gender: 'male',
			lang: 'ja',
			provider: 'edge-tts',
		},
	],
	'zh-cn': [
		{
			id: 'xiaoxiao',
			name: 'Xiaoxiao',
			gender: 'female',
			lang: 'zh-cn',
			provider: 'edge-tts',
		},
		{
			id: 'yunxi',
			name: 'Yunxi',
			gender: 'male',
			lang: 'zh-cn',
			provider: 'edge-tts',
		},
	],
};

export const VOICE_STYLES: { id: TVoiceStyle; label: string }[] = [
	{ id: 'neutral', label: 'Neutral' },
	{ id: 'narrator', label: 'Narrator' },
];
