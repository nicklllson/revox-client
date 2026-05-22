import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/ui/tooltip';

type TLockedParamProps = {
	label: string;
	requiredTier: 'PRO' | 'PREMIUM';
};

const TIER_LABEL: Record<TLockedParamProps['requiredTier'], string> = {
	PRO: 'Pro',
	PREMIUM: 'Premium',
};

export const LockedParam = ({ label, requiredTier }: TLockedParamProps) => {
	const navigate = useNavigate();
	const tierLabel = TIER_LABEL[requiredTier];

	return (
		<TooltipProvider delayDuration={150}>
			<Tooltip>
				<TooltipTrigger asChild>
					<button
						type='button'
						onClick={() => navigate('/pricing')}
						className={cn(
							'flex h-[30px] items-center gap-1.5 rounded-md border px-3',
							'transition-colors hover:bg-accent',
						)}>
						<Lock size={12} />
						<span className='font-mono text-[10.5px] uppercase tracking-[0.6px]'>
							{label}
						</span>
						<span className='font-semibold text-[10.5px]'>{tierLabel}</span>
					</button>
				</TooltipTrigger>
				<TooltipContent side='top' className='text-xs'>
					Available on {tierLabel}. Click to upgrade.
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
