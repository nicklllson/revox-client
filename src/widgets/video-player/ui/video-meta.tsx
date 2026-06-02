import { useMemo } from 'react';
import { AVAILABLE_LANGUAGES } from '@/entities/video';
import { VOICE_OPTIONS } from '@/shared/model/voices';
import { Badge } from '@/shared/ui/badge';

export const VideoMeta = ({
	language,
	voice,
	progress,
}: Partial<{
	language: string;
	voice: string;
	progress: number;
}>) => {
	const lang = useMemo(() => {
		const serverLang = language ? language : 'en';
		return (
			AVAILABLE_LANGUAGES.find(lang => lang.value === serverLang) ??
			AVAILABLE_LANGUAGES[0]
		);
	}, [language]);

	const currentVoice = VOICE_OPTIONS[lang?.value].find(v => v.id === voice);

	return (
		<div className='-translate-x-1/2 absolute top-4 left-1/2 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100'>
			<Badge variant='secondary'>{lang.label}</Badge>
			<Badge variant='secondary'>{currentVoice?.name}</Badge>
			<Badge>{progress?.toFixed()}%</Badge>
		</div>
	);
};
