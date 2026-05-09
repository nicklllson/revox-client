import type { ComponentType } from 'react';

export type TParamId =
	| 'atlas-pro-voice'
	| 'atlas-pro-voice-type'
	| 'fast-voice'
	| 'whisper-one-voice'
	| 'whisper-one-voice-type';

export type TParamControlProps<T = unknown> = {
	value: T;
	onChange: (value: T) => void;
	isInvalid?: boolean;
};

export type TParamDefinition<T = unknown> = {
	id: TParamId;
	label: string;
	defaultValue: T;
	Control: ComponentType<TParamControlProps<T>>;
};

export type TParamValues = Record<string, unknown>;

export type TModelParamSlot = {
	id: TParamId;
	required: boolean;
};
