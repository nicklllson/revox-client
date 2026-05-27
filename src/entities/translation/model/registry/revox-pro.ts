import type { TTranslationModel } from '../types';

export const REVOX_PRO: TTranslationModel = {
	modelId: 'revox-pro',
	name: 'Revox Pro',
	tagline: 'Context-aware translation',
	description: 'High-quality dubbing with voice selection and multi-speaker.',
	speed: 3,
	quality: 3,
	tier: 'PRO',
	badge: 'Recommended',
	eta: '~3 min for 10-min video',
	features: ['Premium voices (coqui)', 'Multi-speaker', 'Up to 60 min videos'],
	accent: 'oklch(0.7 0.16 250)',
	isEnabled: true,
	params: [
		{ id: 'voice', required: false },
		{ id: 'multitalk', required: false },
	],
	providers: { translator: 'google', tts: 'piper', whisper: 'small' },
	pipelineFeatures: { multiSpeaker: true },
};
