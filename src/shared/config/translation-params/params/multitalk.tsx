import { Users } from 'lucide-react';
import type { TParamControlProps, TParamDefinition } from '../model/types';
import { ParamToggle } from '../ui/param-pill-toggle';

const MultitalkControl = ({ value, onChange }: TParamControlProps<boolean>) => {
	return (
		<ParamToggle
			icon={Users}
			label='Multi-speaker'
			value={value}
			onChange={onChange}
		/>
	);
};

export const REVOX_MULTITALK: TParamDefinition<boolean> = {
	id: 'multitalk',
	label: 'Multitalk',
	defaultValue: false,
	Control: MultitalkControl,
};
