import {
	AnimatePresence,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from 'motion/react';
import { useRef, useState } from 'react';
import {
	AVAILABLE_MODELS,
	type TTranslationModel,
} from '@/entities/translation-models';
import { ModelCard } from './model-card';

export const TranslationModelSelect = () => {
	const [active, setActive] = useState<TTranslationModel>(AVAILABLE_MODELS[0]);
	const [open, setOpen] = useState<boolean>(false);
	const [hoveredId, setHoveredId] = useState<string | null>(null);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const rotateX = useSpring(useTransform(mouseY, [-30, 30], [8, -8]), {
		stiffness: 400,
		damping: 30,
	});
	const rotateY = useSpring(useTransform(mouseX, [-60, 60], [-10, 10]), {
		stiffness: 400,
		damping: 30,
	});

	const pillRef = useRef<HTMLButtonElement>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = pillRef.current?.getBoundingClientRect();
		if (!rect) return;
		mouseX.set(e.clientX - rect.left - rect.width / 2);
		mouseY.set(e.clientY - rect.top - rect.height / 2);
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	const select = (model: TTranslationModel) => {
		setActive(model);
		setOpen(false);
	};

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
							const isActive = model.id === active.id;
							const isHov = hoveredId === model.id;

							return (
								<ModelCard
									index={i}
									key={model.id}
									model={model}
									isHovered={isHov}
									onSelect={select}
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
					ref={pillRef}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					whileTap={{ scale: 0.95 }}
					onClick={() => setOpen(!open)}
					className='group relative flex h-18 w-60 items-center justify-center gap-3 overflow-hidden rounded-full outline-none'
					style={{
						rotateX,
						rotateY,
						transformStyle: 'preserve-3d',
						background: open
							? 'linear-gradient(120deg, #1a1a1a, #111)'
							: '#ffffff',
						boxShadow: open
							? `0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.6), 0 0 60px ${active.accent}20`
							: '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
						transition: 'background 0.4s ease, box-shadow 0.4s ease',
					}}>
					{/* Bottom glow line when open */}
					<AnimatePresence>
						{open && (
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{ scaleX: 1 }}
								exit={{ scaleX: 0 }}
								className='absolute right-6 bottom-0 left-6 h-px origin-left'
								style={{
									background: `linear-gradient(90deg, transparent, ${active.accent}, transparent)`,
								}}
							/>
						)}
					</AnimatePresence>

					{/* Glitch model name */}
					<motion.span
						animate={{ color: open ? '#ffffff' : '#000000' }}
						transition={{ duration: 0.3 }}
						className='font-mono font-semibold text-xl tracking-tight'>
						{active.name}
					</motion.span>

					{/* Pulsing accent dot */}
					<motion.div
						animate={{
							scale: open ? [1, 1.4, 1] : 1,
							backgroundColor: open ? active.accent : '#00000040',
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
