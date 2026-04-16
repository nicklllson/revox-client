import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { AVAILABLE_LANGUAGES } from '@/entities/video';

export const HistoryItem = ({
	id,
	title,
	language,
	thumbnail,
}: {
	id: string;
	thumbnail?: string;
	title?: string;
	language: string;
}) => {
	const [isHovered, setHovered] = useState<boolean>(false);

	const availableLang = AVAILABLE_LANGUAGES.find(
		lang => lang.value === language,
	);

	return (
		<Link
			to={`/videos/${id}`}
			className='group relative'
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>
			{thumbnail ? (
				<img
					alt={`Preview thumbnail - ${title}`}
					aria-label='Preview thumbnail'
					src={thumbnail}
					className='relative z-10 flex h-13 w-13 items-center justify-center rounded-lg bg-muted object-cover transition-all group-hover:scale-105'
				/>
			) : (
				<div className='relative z-10 flex h-13 w-13 items-center justify-center rounded-lg bg-muted transition-all group-hover:scale-105'>
					s
				</div>
			)}
			<AnimatePresence>
				{isHovered && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						className='-top-1 -left-1 -bottom-1 absolute w-60 rounded-lg bg-secondary p-3 pl-17'>
						<div className='flex flex-col'>
							<span className='truncate text-sm'>{title}</span>
							<span className='text-muted-foreground text-xs'>
								{availableLang?.label}
							</span>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</Link>
	);
};
