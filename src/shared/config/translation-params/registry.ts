import type { TParamDefinition, TParamId } from './model/types';
import { WHISPER_ONE_VOICE_TYPE_PARAM } from './params/voice';
import { WHISPER_ONE_VOICE_PARAM } from './params/voice-type';

const ALL_PARAMS: TParamDefinition[] = [
	WHISPER_ONE_VOICE_PARAM as TParamDefinition,
	WHISPER_ONE_VOICE_TYPE_PARAM as TParamDefinition,
	// new params here
];

export const PARAM_REGISTRY: Record<TParamId, TParamDefinition> =
	Object.fromEntries(ALL_PARAMS.map(p => [p.id, p])) as Record<
		TParamId,
		TParamDefinition
	>;

export const getParamDef = (id: TParamId): TParamDefinition | null => {
	return PARAM_REGISTRY[id] ?? null;
};
