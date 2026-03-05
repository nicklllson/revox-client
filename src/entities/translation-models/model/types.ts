export type TTranslationModelIds = 'whisper-1' | 'whisper-2' | 'nova' | 'echo';

export type TTranslationModel = {
	id: string;
	name: string;
	modelId: TTranslationModelIds;
	sub: string;
	accent: string;
	glyph: string;
	isEnabled: boolean;
};
