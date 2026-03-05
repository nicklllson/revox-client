import type { TTranslationModel } from './types';

export const AVAILABLE_MODELS: TTranslationModel[] = [
	{
		id: 'awdawd',
		modelId: 'whisper-1',
		name: 'Whisper 1.0',
		sub: 'Fast & reliable',
		accent: '#F5C518',
		glyph: 'W1',
		isEnabled: true,
	},
	{
		id: 'awdawdawd',
		modelId: 'whisper-2',
		name: 'Whisper 2.0',
		sub: 'Enhanced accuracy',
		accent: '#60EFFF',
		glyph: 'W2',
		isEnabled: false,
	},
	{
		id: 'awdawdawdawd',
		name: 'Nova',
		modelId: 'nova',
		sub: 'Multimodal',
		accent: '#FF6B6B',
		glyph: 'NV',
		isEnabled: false,
	},
	{
		id: 'awdawdawdawdawd',
		name: 'Echo',
		modelId: 'echo',
		sub: 'Low latency',
		accent: '#B8FF8C',
		glyph: 'EC',
		isEnabled: false,
	},
];
