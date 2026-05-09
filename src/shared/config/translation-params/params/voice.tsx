// shared/config/translation-params/params/voice.tsx

import { Mic } from 'lucide-react';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { VOICE_OPTIONS } from '@/shared/model/voices';
import type { TParamControlProps, TParamDefinition } from '../model/types';
import { ParamPill } from '../ui/param-pill';

type VoiceValue = {
	voice_name: string;
	gender: 'female' | 'male';
};

const VoiceControl = ({ value, onChange }: TParamControlProps<VoiceValue>) => {
	const language = useWatch({ name: 'language' }) ?? 'ru';
	const voices = VOICE_OPTIONS[language] ?? VOICE_OPTIONS.en ?? [];

	useEffect(() => {
		if (!voices.find(v => v.id === value.voice_name) && voices.length > 0) {
			onChange({
				voice_name: voices[0].id,
				gender: voices[0].gender,
			});
		}
	}, [language]);

	return (
		<ParamPill
			icon={Mic}
			label='Voice'
			value={value.voice_name}
			options={voices.map(v => ({
				value: v.id,
				label: v.name,
				hint: v.gender === 'female' ? 'Female' : 'Male',
			}))}
			onChange={voiceName => {
				const v = voices.find(v => v.id === voiceName);
				onChange({
					voice_name: voiceName,
					gender: v?.gender ?? 'female',
				});
			}}
		/>
	);
};

export const WHISPER_ONE_VOICE_TYPE_PARAM: TParamDefinition<VoiceValue> = {
	id: 'whisper-one-voice',
	label: 'Voice',
	defaultValue: { voice_name: 'anna', gender: 'female' },
	Control: VoiceControl,
};
