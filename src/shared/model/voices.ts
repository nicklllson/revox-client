export type TVoiceGender = 'female' | 'male';
export type TVoiceStyle = 'neutral' | 'narrator';
export type TVoiceProvider = 'edge-tts' | 'coqui' | 'piper';

export type VoiceOption = {
	id: string;
	name: string;
	gender: TVoiceGender;
	lang: string;
	provider: TVoiceProvider;
};

// ──────────────────────────────────────────────
// Coqui (одни и те же клонированные голоса на все языки)
// ──────────────────────────────────────────────

const COQUI_VOICES: VoiceOption[] = [
	{
		id: 'female_1',
		name: 'Ann',
		gender: 'female',
		lang: '',
		provider: 'coqui',
	},
	{
		id: 'female_2',
		name: 'Emily',
		gender: 'female',
		lang: '',
		provider: 'coqui',
	},
	{
		id: 'female_3',
		name: 'Hannah',
		gender: 'female',
		lang: '',
		provider: 'coqui',
	},
	{
		id: 'female_4',
		name: 'Sarah',
		gender: 'female',
		lang: '',
		provider: 'coqui',
	},
	{
		id: 'male_1',
		name: 'Brandon',
		gender: 'male',
		lang: '',
		provider: 'coqui',
	},
	{
		id: 'male_2',
		name: 'Jhonatan',
		gender: 'male',
		lang: '',
		provider: 'coqui',
	},
	{ id: 'male_3', name: 'Michel', gender: 'male', lang: '', provider: 'coqui' },
];

const coqui = (lang: string): VoiceOption[] =>
	COQUI_VOICES.map(v => ({ ...v, lang }));

// ──────────────────────────────────────────────
// Piper (свои голоса для каждого языка)
// ──────────────────────────────────────────────

const piper = (
	lang: string,
	voices: Array<{ id: string; name: string; gender: TVoiceGender }>,
): VoiceOption[] =>
	voices.map(v => ({ ...v, lang, provider: 'piper' as const }));

// ──────────────────────────────────────────────
// Languages
// ──────────────────────────────────────────────

export const VOICE_OPTIONS: Record<string, VoiceOption[]> = {
	ru: [
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
		...piper('ru', [
			{ id: 'irina', name: 'Irina', gender: 'female' },
			{ id: 'dmitri', name: 'Dmitri', gender: 'male' },
			{ id: 'denis', name: 'Denis', gender: 'male' },
			{ id: 'ruslan', name: 'Ruslan', gender: 'male' },
		]),
		...coqui('ru'),
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
		...piper('en', [
			{ id: 'amy', name: 'Amy', gender: 'female' },
			{ id: 'kathleen', name: 'Kathleen', gender: 'female' },
			{ id: 'ryan', name: 'Ryan', gender: 'male' },
			{ id: 'joe', name: 'Joe', gender: 'male' },
		]),
		...coqui('en'),
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
		...piper('de', [{ id: 'thorsten', name: 'Thorsten', gender: 'male' }]),
		...coqui('de'),
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
		...piper('es', [{ id: 'davefx', name: 'Davefx', gender: 'male' }]),
		...coqui('es'),
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
		...piper('fr', [
			{ id: 'siwis', name: 'Siwis', gender: 'female' },
			{ id: 'upmc', name: 'Upmc', gender: 'male' },
		]),
		...coqui('fr'),
	],
	it: [
		{
			id: 'elsa',
			name: 'Elsa',
			gender: 'female',
			lang: 'it',
			provider: 'edge-tts',
		},
		{
			id: 'isabella',
			name: 'Isabella',
			gender: 'female',
			lang: 'it',
			provider: 'edge-tts',
		},
		{
			id: 'diego',
			name: 'Diego',
			gender: 'male',
			lang: 'it',
			provider: 'edge-tts',
		},
		...piper('it', [{ id: 'paola', name: 'Paola', gender: 'female' }]),
		...coqui('it'),
	],
	pt: [
		{
			id: 'francisca',
			name: 'Francisca',
			gender: 'female',
			lang: 'pt',
			provider: 'edge-tts',
		},
		{
			id: 'duarte',
			name: 'Duarte',
			gender: 'male',
			lang: 'pt',
			provider: 'edge-tts',
		},
		...coqui('pt'),
	],
	pl: [
		{
			id: 'zofia',
			name: 'Zofia',
			gender: 'female',
			lang: 'pl',
			provider: 'edge-tts',
		},
		{
			id: 'marek',
			name: 'Marek',
			gender: 'male',
			lang: 'pl',
			provider: 'edge-tts',
		},
		...coqui('pl'),
	],
	tr: [
		{
			id: 'emel',
			name: 'Emel',
			gender: 'female',
			lang: 'tr',
			provider: 'edge-tts',
		},
		{
			id: 'ahmet',
			name: 'Ahmet',
			gender: 'male',
			lang: 'tr',
			provider: 'edge-tts',
		},
		...coqui('tr'),
	],
	nl: [
		{
			id: 'fenna',
			name: 'Fenna',
			gender: 'female',
			lang: 'nl',
			provider: 'edge-tts',
		},
		{
			id: 'maarten',
			name: 'Maarten',
			gender: 'male',
			lang: 'nl',
			provider: 'edge-tts',
		},
		...coqui('nl'),
	],
	cs: [
		{
			id: 'vlasta',
			name: 'Vlasta',
			gender: 'female',
			lang: 'cs',
			provider: 'edge-tts',
		},
		{
			id: 'antonin',
			name: 'Antonin',
			gender: 'male',
			lang: 'cs',
			provider: 'edge-tts',
		},
		...coqui('cs'),
	],
	ar: [
		{
			id: 'zariyah',
			name: 'Zariyah',
			gender: 'female',
			lang: 'ar',
			provider: 'edge-tts',
		},
		{
			id: 'hamdan',
			name: 'Hamdan',
			gender: 'male',
			lang: 'ar',
			provider: 'edge-tts',
		},
		...coqui('ar'),
	],
	hu: [
		{
			id: 'noemi',
			name: 'Noemi',
			gender: 'female',
			lang: 'hu',
			provider: 'edge-tts',
		},
		{
			id: 'tamas',
			name: 'Tamas',
			gender: 'male',
			lang: 'hu',
			provider: 'edge-tts',
		},
		...piper('hu', [
			{ id: 'anna', name: 'Anna', gender: 'female' },
			{ id: 'imre', name: 'Imre', gender: 'male' },
		]),
		...coqui('hu'),
	],
	ko: [
		{
			id: 'sun_hi',
			name: 'Sun-Hi',
			gender: 'female',
			lang: 'ko',
			provider: 'edge-tts',
		},
		{
			id: 'injoon',
			name: 'InJoon',
			gender: 'male',
			lang: 'ko',
			provider: 'edge-tts',
		},
		...coqui('ko'),
	],
	hi: [
		{
			id: 'swara',
			name: 'Swara',
			gender: 'female',
			lang: 'hi',
			provider: 'edge-tts',
		},
		{
			id: 'madhur',
			name: 'Madhur',
			gender: 'male',
			lang: 'hi',
			provider: 'edge-tts',
		},
		...coqui('hi'),
	],
	zh: [
		{
			id: 'xiaoxiao',
			name: 'Xiaoxiao',
			gender: 'female',
			lang: 'zh',
			provider: 'edge-tts',
		},
		{
			id: 'yunxi',
			name: 'Yunxi',
			gender: 'male',
			lang: 'zh',
			provider: 'edge-tts',
		},
		...coqui('zh'),
	],
	ja: [
		// Японский не поддерживается Coqui XTTS-v2 и Piper (по основным голосам)
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
};

// ──────────────────────────────────────────────
// Styles
// ──────────────────────────────────────────────

export const VOICE_STYLES: { id: TVoiceStyle; label: string }[] = [
	{ id: 'neutral', label: 'Neutral' },
	{ id: 'narrator', label: 'Narrator' },
];
