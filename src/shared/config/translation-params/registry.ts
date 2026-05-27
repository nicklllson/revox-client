import type { TParamDefinition, TParamId } from './model/types';
import { REVOX_VOICE_PARAM } from './params/voice';
import { REVOX_VOICE_TYPE_PARAM } from './params/voice-type';

const ALL_PARAMS: TParamDefinition[] = [
	REVOX_VOICE_TYPE_PARAM as TParamDefinition,
	REVOX_VOICE_PARAM as TParamDefinition,
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
