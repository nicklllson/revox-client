import { AnimatePresence, motion } from 'motion/react';
import type { TTranslationModel } from '@/entities/translation-models';

export const ModelCard = ({
	model,
	isActive,
	isHovered,
	index = 0,
	onSelect,
	onModelHover,
}: {
	model: TTranslationModel;
	isActive: boolean;
	isHovered: boolean;
	index?: number;
	onSelect?: (model: TTranslationModel) => void;
	onModelHover?: (value: string | null) => void;
}) => {
	return (
		<motion.button
			key={model.id}
			initial={{
				opacity: 0,
				y: 40,
				scale: 0.8,
				rotate: (index - 1.5) * 8,
			}}
			animate={{
				opacity: 1,
				y: isHovered ? -8 : 0,
				scale: isActive ? 1.06 : 1,
				rotate: isHovered ? 0 : (index - 1.5) * 3,
			}}
			exit={{ opacity: 0, y: 30, scale: 0.85 }}
			transition={{
				type: 'spring',
				stiffness: 320,
				damping: 22,
				delay: index * 0.06,
			}}
			onClick={() => onSelect?.(model)}
			onMouseEnter={() => onModelHover?.(model.id)}
			onMouseLeave={() => onModelHover?.(null)}
			className='relative flex h-28 w-24 flex-col items-start justify-between overflow-hidden rounded-2xl border p-3 text-left'
			style={{
				background: isActive
					? `linear-gradient(135deg, ${model.accent}22, ${model.accent}08)`
					: '#0f0f0f',
				borderColor: isActive ? `${model.accent}60` : 'rgba(255,255,255,0.07)',
				boxShadow: isActive
					? `0 0 24px ${model.accent}30, inset 0 0 12px ${model.accent}10`
					: 'none',
			}}>
			{/* Glyph badge */}
			<span
				className='font-bold font-mono text-xs leading-none'
				style={{
					color: isActive ? model.accent : 'rgba(255,255,255,0.2)',
				}}>
				{model.glyph}
			</span>

			{/* Hover glow orb */}
			<AnimatePresence>
				{isHovered && (
					<motion.div
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0 }}
						className='absolute top-2 right-2 h-10 w-10 rounded-full blur-xl'
						style={{ background: model.accent }}
					/>
				)}
			</AnimatePresence>

			{/* Text */}
			<div>
				<p className='font-mono font-semibold text-[11px] text-white leading-tight'>
					{model.name}
				</p>
				<p className='mt-0.5 font-mono text-[9px] text-white/30 leading-tight'>
					{model.sub}
				</p>
			</div>

			{/* Active corner accent */}
			{isActive && (
				<motion.div
					layoutId='corner-mark'
					className='absolute top-0 right-0 h-6 w-6'
					style={{
						background: `linear-gradient(135deg, ${model.accent} 0%, transparent 60%)`,
						borderTopRightRadius: '1rem',
					}}
				/>
			)}
		</motion.button>
	);
};
