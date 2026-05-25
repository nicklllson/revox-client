import type { TTranslationModel } from '../types';

export const REVOX_LITE: TTranslationModel = {
	modelId: 'revox-lite',
	name: 'Revox Lite',
	tagline: 'Try Revox for free',
	description: 'Basic translation with default voice for short videos.',
	speed: 5,
	quality: 2,
	tier: 'FREE',
	badge: null,
	eta: '~2 min for 10-min video',
	features: [
		'Basic translation',
		'Default voice (Edge TTS)',
		'Up to 30 min videos',
	],
	accent: 'oklch(0.65 0.16 230)',
	isEnabled: true,
	maxDurationMinutes: 30,
	params: [
		{ id: 'voice', required: false, minTier: 'PRO' },
		{ id: 'voice-type', required: false, minTier: 'PRO' },
	],
	providers: { translator: 'google', tts: 'edge-tts', whisper: 'base' },
	pipelineFeatures: { multiSpeaker: false },
};
