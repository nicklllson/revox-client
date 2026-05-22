import type { TTranslationModel } from '../types';

export const REVOX_ULTRA: TTranslationModel = {
	modelId: 'revox-ultra',
	name: 'Revox Ultra',
	tagline: 'Premium voiceover',
	description: 'Best quality with premium TTS.',
	speed: 2,
	quality: 5,
	tier: 'PREMIUM',
	badge: null,
	eta: '~30 min for 10-min video',
	features: ['Premium voiceover', 'Multi-voice', 'Up to 2 hours'],
	accent: 'oklch(0.7 0.14 290)',
	isEnabled: true,
	maxDurationMinutes: 120,
	params: [
		{ id: 'voice', required: false },
		{ id: 'multitalk', required: false },
	],
	providers: { translator: 'google', tts: 'edge-tts', whisper: 'medium' },
	pipelineFeatures: { multiSpeaker: true },
};
