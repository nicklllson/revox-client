import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { AVAILABLE_MODELS } from '@/entities/translation-models';
import { useMouseAnimations } from '../model/use-mouse-animations';
import { useSelectTranslation } from '../model/use-select-translation';
import { ModelCard } from './model-card';

export const TranslationModelSelect = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const { activeModel, handleSelectModel } = useSelectTranslation();
	const { rotateX, rotateY, ...mouseController } = useMouseAnimations();

	return (
		<div className='-translate-x-1/2 fixed bottom-5 left-1/2 z-50 flex flex-col items-center gap-3'>
			{/* ── Floating model cards (open state) ──────────────────────── */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='flex items-end gap-2'>
						{AVAILABLE_MODELS.map((model, i) => {
							const isActive = model.id === activeModel.id;
							const isHov = hoveredId === model.id;

							return (
								<ModelCard
									index={i}
									key={model.id}
									model={model}
									isHovered={isHov}
									onSelect={handleSelectModel}
									isActive={isActive}
									onModelHover={setHoveredId}
								/>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>

			<motion.div style={{ perspective: 600 }}>
				<motion.button
					ref={mouseController.pillRef}
					onMouseMove={mouseController.handleMouseMove}
					onMouseLeave={mouseController.handleMouseLeave}
					whileTap={{ scale: 0.95 }}
					onClick={() => setOpen(!open)}
					className='group relative flex w-50 items-center justify-center gap-3 overflow-hidden rounded-2xl py-4 outline-none'
					style={{
						rotateX,
						rotateY,
						transformStyle: 'preserve-3d',
						background: open
							? 'linear-gradient(120deg, #1a1a1a, #111)'
							: '#ffffff',
						boxShadow: open
							? `0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.6), 0 0 60px ${activeModel.accent}20`
							: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
						transition: 'background 0.4s ease, box-shadow 0.4s ease',
					}}>
					{/* ── Bottom glow line when open ──────────────────────── */}
					<AnimatePresence>
						{open && (
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								exit={{ scaleX: 0 }}
								className='absolute right-6 bottom-0 left-6 h-px origin-left'
								style={{
									background: `linear-gradient(90deg, transparent, ${activeModel.accent}, transparent)`,
								}}
							/>
						)}
					</AnimatePresence>

					{/* ── Glitch model name ──────────────────────── */}
					<motion.span
						animate={{ color: open ? '#ffffff' : '#000000' }}
						transition={{ duration: 0.3 }}
						className='font-semibold text-base tracking-tight'>
						{activeModel.name}
					</motion.span>

					{/* ── Pulsing accent dot ──────────────────────── */}
					<motion.div
						animate={{
							scale: open ? [1, 1.4, 1] : 1,
							backgroundColor: open ? activeModel.accent : '#00000040',
						}}
						transition={{
							duration: 0.6,
							repeat: open ? Number.POSITIVE_INFINITY : 0,
							repeatDelay: 1.2,
						}}
						className='h-2 w-2 rounded-full'
					/>
				</motion.button>
			</motion.div>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setOpen(false)}
						className='-z-10 fixed inset-0'
					/>
				)}
			</AnimatePresence>
		</div>
	);
};
