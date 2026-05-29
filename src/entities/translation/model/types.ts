import type { TSubscriptionTier } from '@/entities/subscription';
import type { TParamId } from '@/shared/config/translation-params/model/types';
import type { TVoiceGender, TVoiceStyle } from '@/shared/model/voices';

export type TTranslationModelTTS = 'edge-tts' | 'piper' | 'eleven-labs';

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
	gender: 'male',
	voice_name: 'dmitriy',
	style: 'neutral',
};

export type TTranslationModelParam = {
	id: TParamId;
	required: boolean;
	minTier?: TSubscriptionTier;
};

export type TTranslationModel = {
	modelId: string;
	name: string;
	tagline: string;
	description: string;
	speed: number;
	quality: number;
	tier: TSubscriptionTier;
	badge: string | null;
	eta: string;
	features: string[];
	accent: string;
	isEnabled: boolean;
	params: TTranslationModelParam[];
	providers: {
		translator: string; // 'deepseek' | 'google'
		tts: TTranslationModelTTS; // | 'elevenlabs'
		whisper: string; // 'base' | 'large-v3'
	};
	pipelineFeatures: {
		multiSpeaker: boolean;
	};
};
