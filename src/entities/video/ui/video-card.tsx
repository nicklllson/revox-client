/** biome-ignore-all lint/a11y/useSemanticElements: Semantic */

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { AVAILABLE_LANGUAGES } from '../model/languages';

export const VideoCard = ({
	id,
	lang,
	title,
	actions,
	thumbnail,
}: {
	id: string;
	lang: string;
	title?: string;
	thumbnail?: string;
	actions?: React.ReactNode;
}) => {
	const navigate = useNavigate();

	const languageItem = useMemo(() => {
		return AVAILABLE_LANGUAGES.find(el => el.value === lang);
	}, [lang]);

	return (
		<div
			role='button'
			tabIndex={0}
			onClick={() => navigate(`/videos/${id}`)}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					navigate(`/videos/${id}`);
				}
			}}
			className='relative rounded-4xl p-3.5 hover:bg-muted max-2xl:rounded-2xl max-2xl:p-2'>
			{actions && <div className='absolute top-5 right-5 z-10'>{actions}</div>}
			<div className='relative mb-3.5 aspect-1.5/1'>
				<img
					loading='lazy'
					alt='Test image'
					src={thumbnail ?? '/images/test-image.webp'}
					className='size-full rounded-3xl object-cover max-2xl:rounded-[10px]'
				/>
			</div>
			<div className='mb-2.5 flex flex-col gap-2'>
				<span className='line-clamp-2 text-xl max-2xl:text-base'>{title}</span>
				<span className='text-white/70 max-2xl:text-xs'>
					{languageItem?.label}
				</span>
			</div>
		</div>
	);
};
