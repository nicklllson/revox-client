import type { TTranslationModel } from '../types';

export const ATLAS_PRO: TTranslationModel = {
	modelId: 'atlas-pro',
	name: 'Atlas Pro',
	tagline: 'Studio · Voice cloning',
	description:
		'Highest quality with speaker voice cloning. Use for content where the original voice matters.',
	speed: 2,
	quality: 5,
	tier: 'pro',
	badge: null,
	eta: '~12 min for 10-min video',
	features: ['62 languages', 'Voice cloning', 'Lip-sync', 'Studio mix'],
	accent: 'oklch(0.7 0.14 290)',
	isEnabled: true,
	maxDurationMinutes: 75,
	params: [
		{ id: 'atlas-pro-voice', required: false },
		{ id: 'atlas-pro-voice-type', required: false },
	],
};
