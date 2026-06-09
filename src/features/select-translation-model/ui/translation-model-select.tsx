import { Check, ChevronDown, Lock, LockKeyhole } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSubscription } from '@/entities/subscription';
import { VOICES_REGISTRY } from '@/entities/translation';
import { useClickOutside } from '@/shared/hooks';
import { getRequiredTierLabel, isModelAvailable } from '@/shared/lib/models';
import { cn } from '@/shared/lib/utils';
import { Badge } from '@/shared/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { useSelectTranslation } from '../lib/use-select-translation';
import { MeterDots } from './meter-dots';

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
				<button
					type='button'
					className='flex min-w-35 items-center justify-center gap-2 rounded-full border bg-primary-foreground px-5 py-2.5'>
					<span className='font-medium text-lg'>{activeModel.name}</span>
					<ChevronDown size={14} className={cn({ 'rotate-180': open })} />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align='start'
				className={
					'scrollbar-custom max-h-[620px] w-[360px] rounded-3xl border bg-primary-foreground p-1.5'
				}>
				{/* Model list */}
				<div className='flex flex-col gap-0.5'>
					{Object.values(VOICES_REGISTRY).map(model => {
						const isSelected = model.modelId === activeModel.modelId;
						const isDisabled = !model.isEnabled;
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
									<div className='mb-1 flex items-center justify-between gap-2'>
										<span className='font-semibold text-lg'>{model.name}</span>

										<div className='flex gap-1'>
											{isDisabled && (
												<Badge>
													<LockKeyhole size={12} />
													Coming soon
												</Badge>
											)}

											{model.badge && !locked && (
												<Badge
													variant='outline'
													className='px-1.5 py-0 font-semibold text-[9.5px] uppercase'>
													{model.badge}
												</Badge>
											)}

											{locked && (
												<Badge
													variant='outline'
													className='ml-auto flex h-6 items-center gap-1 border-amber-500/30 bg-amber-500/15 px-1.5 py-0 font-semibold text-[9.5px] text-amber-300 uppercase'>
													<Lock size={9} />
													{requiredTierLabel}
												</Badge>
											)}

											{isSelected && !locked && (
												<Check size={14} className='ml-auto' />
											)}
										</div>
									</div>

									{/* Description */}
									<p className='mb-2 text-sm text-zinc-400 leading-relaxed'>
										{locked
											? `Upgrade to ${requiredTierLabel} to unlock this model`
											: model.description}
									</p>

									{/* Meters */}
									<div className='mb-2 flex items-center gap-3.5'>
										<div className='flex items-center gap-1.5'>
											<span className='text-[10px] text-zinc-500 uppercase'>
												Speed
											</span>
											<MeterDots value={model.speed} color={model.accent} />
										</div>
										<div className='flex items-center gap-1.5'>
											<span className='text-[10px] text-zinc-500 uppercase'>
												Quality
											</span>
											<MeterDots value={model.quality} color={model.accent} />
										</div>
									</div>

									{/* Features */}
									<div className='flex flex-wrap gap-1'>
										{model.features.map(feature => (
											<Badge key={feature} variant='secondary'>
												{feature}
											</Badge>
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
