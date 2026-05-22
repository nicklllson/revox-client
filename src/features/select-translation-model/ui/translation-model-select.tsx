import { Check, ChevronDown, Lock } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/entities/subscription';
import { VOICES_REGISTRY } from '@/entities/translation';
import { useClickOutside } from '@/shared/hooks';
import { getRequiredTierLabel, isModelAvailable } from '@/shared/lib/models';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useSelectTranslation } from '../lib/use-select-translation';
import { MeterDots } from './meter-dots';
import { ModelDot } from './model-dot';

export const TranslationModelSelect = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const { activeModel, handleSelectModel } = useSelectTranslation();
	const { subscription } = useSubscription();

	const currentTier = subscription?.tier;

	useClickOutside(containerRef, () => setOpen(false), open);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					className={cn(
						'group h-auto gap-2.5 rounded-xl border-white/10 bg-zinc-900/85 py-2 pr-3 pl-2.5',
						'hover:border-white/20 hover:bg-zinc-900/90',
					)}>
					<ModelDot accent={activeModel.accent} size={22} />
					<div className='flex flex-col items-start leading-tight'>
						<span className='font-medium text-[12.5px] text-zinc-100'>
							{activeModel.name}
						</span>
						<span className='text-[10.5px] text-zinc-500'>
							{activeModel.tagline}
						</span>
					</div>
					<ChevronDown
						size={13}
						className={cn(
							'ml-1 text-zinc-500 transition-transform duration-200',
							open && 'rotate-180',
						)}
					/>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='start'
				className={cn(
					'w-[360px] border-white/10 bg-zinc-950/95 p-1.5',
					'shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.02)]',
				)}>
				{/* Header */}
				<div className='flex items-baseline justify-between px-3 pt-2.5 pb-2'>
					<span className='font-mono text-[10.5px] text-zinc-500 uppercase tracking-[1px]'>
						Translation model
					</span>
				</div>

				{/* Model list */}
				<div className='flex flex-col gap-0.5'>
					{Object.values(VOICES_REGISTRY).map(model => {
						const isSelected = model.modelId === activeModel.modelId;
						const locked = !isModelAvailable(model, currentTier);
						const requiredTierLabel = getRequiredTierLabel(model);

						const handleClick = () => {
							if (locked) {
								setOpen(false);
								navigate('/pricing');
								return;
							}
							handleSelectModel(model, false);
						};

						return (
							<button
								type='button'
								key={model.modelId}
								disabled={!model.isEnabled}
								onClick={handleClick}
								className={cn(
									'flex gap-3 rounded-[10px] border border-transparent p-3 text-left transition-colors',
									'disabled:cursor-not-allowed disabled:opacity-40',
									isSelected ? 'bg-blue-800/20' : 'hover:bg-white/3',
									locked && !isSelected && 'opacity-50 hover:bg-amber-500/5',
								)}>
								<div className='min-w-0 flex-1'>
									{/* Title row */}
									<div className='mb-1 flex items-center gap-2'>
										<span className='font-semibold text-[13.5px] text-zinc-100'>
											{model.name}
										</span>

										{model.badge && !locked && (
											<Badge
												variant='outline'
												className='px-1.5 py-0 font-semibold text-[9.5px] text-white/40 uppercase tracking-[0.6px]'>
												{model.badge}
											</Badge>
										)}

										{locked && (
											<Badge
												variant='outline'
												className='ml-auto flex items-center gap-1 border-amber-500/30 bg-amber-500/15 px-1.5 py-0 font-mono font-semibold text-[9.5px] text-amber-300 uppercase tracking-[0.6px]'>
												<Lock size={9} />
												{requiredTierLabel}
											</Badge>
										)}

										{isSelected && !locked && (
											<Check size={14} className='ml-auto text-white' />
										)}
									</div>

									{/* Description */}
									<p className='mb-2 text-[11.5px] text-zinc-400 leading-relaxed'>
										{locked
											? `Upgrade to ${requiredTierLabel} to unlock this model`
											: model.description}
									</p>

									{/* Meters */}
									<div className='mb-2 flex items-center gap-3.5'>
										<div className='flex items-center gap-1.5'>
											<span className='font-mono text-[10px] text-zinc-500 uppercase tracking-[0.6px]'>
												Speed
											</span>
											<MeterDots value={model.speed} color={model.accent} />
										</div>
										<div className='flex items-center gap-1.5'>
											<span className='font-mono text-[10px] text-zinc-500 uppercase tracking-[0.6px]'>
												Quality
											</span>
											<MeterDots value={model.quality} color={model.accent} />
										</div>
									</div>

									{/* Features */}
									<div className='flex flex-wrap gap-1'>
										{model.features.map(feature => (
											<span
												key={feature}
												className='rounded border border-white/4 bg-zinc-900 px-[7px] py-0.5 text-[10.5px] text-zinc-400'>
												{feature}
											</span>
										))}
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
