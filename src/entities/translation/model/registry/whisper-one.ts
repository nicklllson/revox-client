import type { TTranslationModel } from '../types';

export const WHISPER_ONE: TTranslationModel = {
	modelId: 'whisper-one',
	name: 'Whisper 1.0',
	tagline: 'Fast · Standard quality',
	description:
		'Quick translations with a single neutral voice. Best for short clips and previews.',
	speed: 5,
	quality: 3,
	tier: 'free',
	badge: null,
	eta: '~2 min for 10-min video',
	features: ['28 languages', 'Subtitles', 'Single voice'],
	accent: 'oklch(0.65 0.16 230)',
	isEnabled: true,
	maxDurationMinutes: 30,
	params: [
		{ id: 'whisper-one-voice', required: false },
		{ id: 'whisper-one-voice-type', required: false },
	],
};
