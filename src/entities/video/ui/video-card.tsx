import { Link } from 'react-router';

export const VideoCard = ({
	id,
	lang,
	title,
	thumbnail,
}: {
	id: string;
	lang: string;
	title?: string;
	thumbnail?: string;
}) => {
	return (
		<Link
			to={`/videos/${id}`}
			className='relative rounded-4xl p-3.5 hover:bg-muted'>
			<div className='relative mb-3.5 aspect-1.5/1'>
				<img
					loading='eager'
					alt='Test image'
					src={thumbnail ?? '/images/test-image.webp'}
					className='size-full rounded-3xl object-cover'
				/>
			</div>
			<div className='mb-2.5 flex flex-col gap-2'>
				<span className='line-clamp-2 text-xl'>{title}</span>
				<span className='text-white/70'>{lang}</span>
			</div>
		</Link>
	);
};
