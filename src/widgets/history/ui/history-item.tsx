import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';

export const HistoryItem = () => {
	const [isHovered, setHovered] = useState<boolean>(false);

	return (
		<Link
			to='/videos/test'
			className='group relative'
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}>
			<div className='relative z-10 flex h-13 w-13 items-center justify-center rounded-lg bg-muted transition-all group-hover:scale-105'>
				s
			</div>
			<AnimatePresence>
				{isHovered && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						className='-top-1 -left-1 -bottom-1 absolute w-60 rounded-lg bg-secondary p-3 pl-17'>
						<div className='flex flex-col'>
							<span className='truncate text-sm'>
								How to beet minecraft in 20 minutes
							</span>
							<span className='text-muted-foreground text-xs'>English</span>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</Link>
	);
};
