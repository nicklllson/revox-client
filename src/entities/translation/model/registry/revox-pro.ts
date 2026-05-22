import type { TTranslationModel } from '../types';

export const REVOX_PRO: TTranslationModel = {
	modelId: 'revox-pro',
	name: 'Revox Pro',
	tagline: 'Context-aware translation',
	description: 'High-quality dubbing with multi-speaker support.',
	speed: 3,
	quality: 4,
	tier: 'PRO',
	badge: 'Recommended',
	eta: '~5 min for 10-min video',
	features: ['Context-aware translation', 'Multi-voice', 'Up to 300 min/m'],
	accent: 'oklch(0.7 0.16 250)',
	isEnabled: true,
	maxDurationMinutes: 60,
	params: [
		{ id: 'voice', required: true },
		{ id: 'multitalk', required: false },
	],
	providers: { translator: 'google', tts: 'silero', whisper: 'small' },
	pipelineFeatures: { multiSpeaker: true },
};
