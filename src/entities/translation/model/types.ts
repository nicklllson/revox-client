import type { TVoiceGender, TVoiceStyle } from '@/shared/model/voices';

export type TSegment = {
	id: string;
	start: number;
	end: number;
	original_text: string;
	translated_text: string;
};

export type TVoiceSettings = {
	gender: TVoiceGender;
	voice_name: string;
	style: TVoiceStyle;
};

export const DEFAULT_VOICE_SETTINGS: TVoiceSettings = {
	gender: 'female',
	voice_name: 'anna',
	style: 'neutral',
};

export type TTranslationModelTier = 'free' | 'pro';

export type TTranslationModelParam = {
	id: string;
	required: boolean;
};

export type TTranslationModel = {
	modelId: string;
	name: string;
	tagline: string;
	description: string;
	speed: number;
	quality: number;
	tier: TTranslationModelTier;
	badge: string | null;
	eta: string;
	features: string[];
	accent: string;
	isEnabled: boolean;
	params: TTranslationModelParam[];
	maxDurationMinutes: number | null;
};
