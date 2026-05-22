import { Mic } from 'lucide-react';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { useModel } from '@/app/providers/model-provider';
import { VOICE_OPTIONS } from '@/shared/model/voices';
import type { TParamControlProps, TParamDefinition } from '../model/types';
import { ParamPill } from '../ui/param-pill';

type VoiceValue = {
	voice_name: string;
	gender: 'female' | 'male';
};

const VoiceControl = ({ value, onChange }: TParamControlProps<VoiceValue>) => {
	const language = useWatch({ name: 'language' }) ?? 'ru';
	const { activeModel } = useModel();
	const provider = activeModel?.providers?.tts ?? 'edge-tts';

	const allVoicesForLang = VOICE_OPTIONS[language] ?? VOICE_OPTIONS.en ?? [];
	const voices = allVoicesForLang.filter(v => v.provider === provider);

	useEffect(() => {
		if (voices.length === 0) return;
		if (!voices.find(v => v.id === value.voice_name)) {
			onChange({
				voice_name: voices[0].id,
				gender: voices[0].gender,
			});
		}
	}, [language, provider]);

	if (voices.length === 0) return null;

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

export const REVOX_VOICE_PARAM: TParamDefinition<VoiceValue> = {
	id: 'voice',
	label: 'Voice',
	defaultValue: { voice_name: 'anna', gender: 'female' },
	Control: VoiceControl,
};
