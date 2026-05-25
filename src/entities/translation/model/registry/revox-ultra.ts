import type { TTranslationModel } from '../types';

export const REVOX_ULTRA: TTranslationModel = {
	modelId: 'revox-ultra',
	name: 'Revox Ultra',
	tagline: 'Premium voiceover',
	description: 'Best quality with accurate transcription and premium TTS.',
	speed: 2,
	quality: 5,
	tier: 'PREMIUM',
	badge: null,
	eta: '~8 min for 10-min video',
	features: [
		'Premium voices (Silero)',
		'Accurate transcription (Whisper Medium)',
		'Multi-speaker',
		'Up to 2-hour videos',
	],
	accent: 'oklch(0.7 0.14 290)',
	isEnabled: true,
	params: [
		{ id: 'voice', required: false },
		{ id: 'multitalk', required: false },
	],
	providers: { translator: 'google', tts: 'silero', whisper: 'medium' },
	pipelineFeatures: { multiSpeaker: true },
};
