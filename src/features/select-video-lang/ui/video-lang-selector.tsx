import { Languages } from 'lucide-react';
import { useEffect } from 'react';
import { useModel } from '@/app/providers/model-provider';
import { AVAILABLE_LANGUAGES } from '@/entities/video';
import { ParamPill } from '@/shared/config/translation-params';

export function VideoLangSelector({
	isInvalid,
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
	isInvalid?: boolean;
}) {
	const { activeModel } = useModel();
	const provider = activeModel?.providers?.tts ?? 'edge-tts';

	const langs = AVAILABLE_LANGUAGES.filter(l => l.providers.includes(provider));

	useEffect(() => {
		if (langs.length === 0) return;
		if (!langs.find(l => l.value === value)) {
			onChange(langs[0].value);
		}
	}, [provider, value]);

	return (
		<ParamPill
			id='onboarding-language'
			icon={Languages}
			label='Language'
			isInvalid={isInvalid}
			value={value}
			options={langs.map(lang => ({
				value: lang.value,
				label: lang.label,
			}))}
			onChange={onChange}
		/>
	);
}
