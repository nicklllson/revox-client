import { useMemo } from 'react';
import { useSubscription } from '@/entities/subscription';
import { SidebarMenu, SidebarMenuItem } from '@/shared/ui/sidebar';
import { TIER_ACCENTS } from '../model/constants';

// !- TODO: Сделать развертывание нормальное

export const UsageMinutes = () => {
	const { subscription, config, minutesRemaining } = useSubscription();

	const usedMinutes = useMemo(() => {
		if (config?.minutesPerMonth && minutesRemaining) {
			return Math.round(config?.minutesPerMonth - minutesRemaining);
		}
		return 0;
	}, [config?.minutesPerMonth, minutesRemaining]);

	const pct = config?.minutesPerMonth
		? Math.min(100, (usedMinutes / config?.minutesPerMonth) * 100)
		: 100;

	const accent = TIER_ACCENTS[subscription?.tier ?? 'FREE'];

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<div className='pointer-events-none invisible absolute m-0 flex h-8 items-center justify-center rounded-[10px] border border-white/6 bg-white/3 group-data-[collapsible=icon]:pointer-events-auto group-data-[collapsible=icon]:visible group-data-[collapsible=icon]:static'>
					<span
						className='size-1.5 shrink-0 rounded-full'
						style={{
							background: accent.solid,
							boxShadow:
								subscription?.tier !== 'FREE'
									? `0 0 6px ${accent.solid}`
									: undefined,
						}}
					/>
				</div>
				<div className='flex flex-col gap-2 rounded-[10px] border border-white/6 bg-white/3 px-3 py-2.5 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:invisible group-data-[collapsible=icon]:absolute'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-1.5'>
							<span
								className='size-1.5 shrink-0 rounded-full'
								style={{
									background: accent.solid,
									boxShadow:
										subscription?.tier !== 'FREE'
											? `0 0 6px ${accent.solid}`
											: undefined,
								}}
							/>
							<span className='font-semibold text-[11.5px]'>
								{config?.name}
							</span>
						</div>
						<span
							className='cursor-pointer text-[10.5px]'
							style={{ color: accent.hue }}>
							Manage ↗
						</span>
					</div>
					<div className='h-[3px] overflow-hidden rounded-sm bg-white/6'>
						<div
							className='h-full rounded-sm'
							style={{ width: `${pct}%`, background: accent.solid }}
						/>
					</div>
					<div className='flex justify-between text-[10px] text-white/45'>
						<span>{usedMinutes} min used</span>
						<span>of {config?.minutesPerMonth} min</span>
					</div>
				</div>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
