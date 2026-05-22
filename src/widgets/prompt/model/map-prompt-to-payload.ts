import z from 'zod';
import type { TCreateVideoDto } from '@/entities/video';
import type {
	TParamDefinition,
	TParamId,
} from '@/shared/config/translation-params/model/types';
import type { TPromptField } from './schema';

const voiceValueSchema = z.object({
	voice_name: z.string(),
	gender: z.enum(['female', 'male']),
});

const voiceTypeSchema = z.enum(['neutral', 'narrator']);

export const mapPromptToPayload = (fields: TPromptField): TCreateVideoDto => {
	const params: Partial<Record<TParamId, TParamDefinition>> =
		fields.params ?? {};

	const voice = voiceValueSchema.safeParse(params['voice']);
	const voiceType = voiceTypeSchema.safeParse(params['voice-type']);

	return {
		videoUrl: fields.videoUrl,
		language: fields.language,
		voice: {
			gender: voice.success ? voice.data.gender : 'female',
			voice_name: voice.success ? voice.data.voice_name : 'anna',
			style: voiceType.success ? voiceType.data : 'neutral',
		},
	};
};
