import type { TTranslationModel } from '../types';

export const WHISPER_TWO: TTranslationModel = {
	modelId: 'whisper-two',
	name: 'Whisper 2.0',
	tagline: 'Balanced · Lip-sync ready',
	description:
		'Speaker-aware dubbing with lip-sync and tone matching. Recommended for most videos.',
	speed: 3,
	quality: 4,
	tier: 'pro',
	badge: 'Recommended',
	eta: '~5 min for 10-min video',
	features: ['48 languages', 'Lip-sync', 'Multi-voice', 'Tone matching'],
	accent: 'oklch(0.7 0.16 250)',
	isEnabled: true,
	params: [
		{ id: 'whisper-two-voice', required: false },
		{ id: 'whisper-two-voice-type', required: false },
	],
};
