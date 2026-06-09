import { useMemo } from 'react';
import { Link } from 'react-router';
import { useSubscription } from '@/entities/subscription';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/model/routes';
import { SidebarMenu, SidebarMenuItem } from '@/shared/ui/sidebar';
import { TIER_ACCENTS } from '../model/constants';

const formatCredits = (value: number): string =>
	value.toLocaleString('en-US', { maximumFractionDigits: 0 });

export const UsageCredits = () => {
	const { subscription, config, creditsRemaining } = useSubscription();

	const usedCredits = useMemo(() => {
		if (config?.creditsPerMonth && creditsRemaining != null) {
			return Math.round(config.creditsPerMonth - creditsRemaining);
		}
		return 0;
	}, [config?.creditsPerMonth, creditsRemaining]);

	const pct = config?.creditsPerMonth
		? Math.min(100, (usedCredits / config.creditsPerMonth) * 100)
		: 100;

	const accent = TIER_ACCENTS[subscription?.tier ?? 'FREE'];
	const hasGlow = subscription?.tier !== 'FREE';

	return (
		<SidebarMenu>
			<SidebarMenuItem id='onboarding-usage-credits'>
				<div
					className={cn(
						'group/usage relative flex flex-col gap-2 overflow-hidden rounded-[10px] border bg-muted transition-all duration-300 ease-out',
						'px-3 py-2.5',
						'group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0',
					)}>
					<span
						className={cn(
							'absolute size-1.5 shrink-0 rounded-full opacity-0 transition-opacity duration-200',
							'group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:delay-200',
						)}
						style={{
							background: accent.solid,
							boxShadow: hasGlow ? `0 0 6px ${accent.solid}` : undefined,
						}}
					/>

					<div
						className={cn(
							'flex w-full flex-col gap-2 transition-opacity duration-150',
							'group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0',
						)}>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-1.5'>
								<span
									className='size-1.5 shrink-0 rounded-full'
									style={{
										background: accent.solid,
										boxShadow: hasGlow ? `0 0 6px ${accent.solid}` : undefined,
									}}
								/>
								<span className='whitespace-nowrap font-semibold text-[11.5px]'>
									{config?.name}
								</span>
							</div>
							<Link
								to={ROUTES.PRIVATE.SUBSCRIPTION}
								className='cursor-pointer whitespace-nowrap text-[10.5px]'
								style={{ color: accent.hue }}>
								Manage ↗
							</Link>
						</div>

						<div className='h-[3px] overflow-hidden rounded-sm bg-muted-foreground'>
							<div
								className='h-full rounded-sm transition-[width] duration-500 ease-out'
								style={{ width: `${pct}%`, background: accent.solid }}
							/>
						</div>

						<div className='flex justify-between whitespace-nowrap text-[10px] text-muted-foreground'>
							<span>{formatCredits(usedCredits)} used</span>
							<span>of {formatCredits(config?.creditsPerMonth ?? 0)}</span>
						</div>
					</div>
				</div>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
