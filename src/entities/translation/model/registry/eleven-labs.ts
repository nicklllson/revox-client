import type { TTranslationModel } from '../types';

export const ELEVEN_LABS: TTranslationModel = {
	modelId: 'eleven-labs',
	name: 'Eleven Labs',
	tagline: 'Try Revox for free',
	description: 'Basic translation with default voice for short videos.',
	speed: 4,
	quality: 5,
	tier: 'PREMIUM',
	badge: null,
	eta: '~2 min for 60-min video',
	features: ['Advanced translation', 'Up to 60 min videos', 'Premium voices'],
	accent: 'oklch(0.65 0.16 230)',
	isEnabled: false,
	params: [
		{ id: 'voice', required: false, minTier: 'PRO' },
		{ id: 'voice-type', required: false, minTier: 'PRO' },
	],
	providers: { translator: 'google', tts: 'eleven-labs', whisper: 'base' },
	pipelineFeatures: { multiSpeaker: false },
};
