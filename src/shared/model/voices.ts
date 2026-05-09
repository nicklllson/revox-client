export type TVoiceGender = 'female' | 'male';
export type TVoiceStyle = 'neutral' | 'narrator';

export type VoiceOption = {
	id: string;
	name: string;
	gender: TVoiceGender;
	lang: string;
};

export const VOICE_OPTIONS: Record<string, VoiceOption[]> = {
	ru: [
		{ id: 'dmitry', name: 'Dmitry', gender: 'male', lang: 'ru' },
		{ id: 'anna', name: 'Anna', gender: 'female', lang: 'ru' },
		{ id: 'daria', name: 'Daria', gender: 'female', lang: 'ru' },
	],
	en: [
		{ id: 'jenny', name: 'Jenny', gender: 'female', lang: 'en' },
		{ id: 'aria', name: 'Aria', gender: 'female', lang: 'en' },
		{ id: 'guy', name: 'Guy', gender: 'male', lang: 'en' },
		{ id: 'davis', name: 'Davis', gender: 'male', lang: 'en' },
	],
	es: [
		{ id: 'elvira', name: 'Elvira', gender: 'female', lang: 'es' },
		{ id: 'alvaro', name: 'Alvaro', gender: 'male', lang: 'es' },
	],
	de: [
		{ id: 'katja', name: 'Katja', gender: 'female', lang: 'de' },
		{ id: 'conrad', name: 'Conrad', gender: 'male', lang: 'de' },
	],
	fr: [
		{ id: 'denise', name: 'Denise', gender: 'female', lang: 'fr' },
		{ id: 'henri', name: 'Henri', gender: 'male', lang: 'fr' },
	],
	ja: [
		{ id: 'nanami', name: 'Nanami', gender: 'female', lang: 'ja' },
		{ id: 'keita', name: 'Keita', gender: 'male', lang: 'ja' },
	],
	'zh-cn': [
		{ id: 'xiaoxiao', name: 'Xiaoxiao', gender: 'female', lang: 'zh-cn' },
		{ id: 'yunxi', name: 'Yunxi', gender: 'male', lang: 'zh-cn' },
	],
};

export const VOICE_STYLES: { id: TVoiceStyle; label: string }[] = [
	{ id: 'neutral', label: 'Neutral' },
	{ id: 'narrator', label: 'Narrator' },
];
