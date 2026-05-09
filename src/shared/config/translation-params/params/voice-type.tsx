import { Wand2 } from 'lucide-react';
import type { TParamControlProps, TParamDefinition } from '../model/types';
import { ParamPill } from '../ui/param-pill';

type VoiceTypeValue = 'neutral' | 'narrator';

const VoiceTypeControl = ({
	value,
	onChange,
}: TParamControlProps<VoiceTypeValue>) => (
	<ParamPill
		icon={Wand2}
		label='Style'
		value={value}
		options={[
			{ value: 'neutral', label: 'Neutral' },
			{ value: 'narrator', label: 'Narrator' },
		]}
		onChange={v => onChange(v as VoiceTypeValue)}
	/>
);

export const WHISPER_ONE_VOICE_PARAM: TParamDefinition<VoiceTypeValue> = {
	id: 'whisper-one-voice-type',
	label: 'Style',
	defaultValue: 'neutral',
	Control: VoiceTypeControl,
};
