import { Languages } from 'lucide-react';
import { AVAILABLE_LANGUAGES } from '@/entities/video';
import { ParamPill } from '@/shared/config/translation-params';

export function VideoLangSelector({
	isInvalid,
	...props
}: {
	value: string;
	onChange: (value: string) => void;
	isInvalid?: boolean;
}) {
	return (
		<ParamPill
			icon={Languages}
			label='Language'
			isInvalid={isInvalid}
			options={AVAILABLE_LANGUAGES.map(lang => ({
				value: lang.value,
				label: lang.label,
			}))}
			{...props}
		/>
	);
}
