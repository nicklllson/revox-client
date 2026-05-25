import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
	useReactivateSubscription,
	useSubscription,
} from '@/entities/subscription';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import { CancelConfirmDialog } from './cancel-confirm-dialog';

export const CurrentPlanCard = () => {
	const navigate = useNavigate();
	const { subscription, config } = useSubscription();
	const { reactivateSubscription, isReactivating } =
		useReactivateSubscription();

	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

	const endPeriod = subscription?.periodEnd
		? new Date(subscription.periodEnd).toLocaleDateString('en')
		: null;

	const isFree = subscription?.tier === 'FREE';
	const isCanceled = !!subscription?.cancelAtPeriodEnd;

	return (
		<>
			<div className='grid grid-cols-[1fr_auto] items-center gap-4 rounded-[14px] border bg-primary-foreground px-[22px] py-5'>
				<div>
					<div className='mb-[6px] flex items-center gap-2'>
						<div className='rounded border border-[rgba(91,157,255,0.3)] bg-blue-800 px-2 py-[3px] font-bold font-mono text-[10px] tracking-[1px]'>
							{config?.name}
						</div>

						{isCanceled ? (
							<span className='text-[11px] text-amber-400'>
								Canceled · ends {endPeriod}
							</span>
						) : (
							<span className='text-[11px]'>Active</span>
						)}
					</div>

					<div className='font-bold text-[22px] tracking-[-0.4px]'>
						Revox {config?.name}
					</div>

					<div className='mt-1 text-[13px]'>
						{isFree ? (
							<>Free forever</>
						) : isCanceled ? (
							<>
								${config?.priceUsd}/month · Access until {endPeriod}
							</>
						) : (
							<>
								${config?.priceUsd}/month · Renews {endPeriod}
							</>
						)}
					</div>
				</div>

				<div className='flex gap-2'>
					{isFree && (
						<Button
							accent='primary'
							onClick={() => navigate(ROUTES.PUBLIC.PRICING)}>
							Upgrade
						</Button>
					)}

					{!isFree && !isCanceled && (
						<>
							<Button
								variant='outline'
								onClick={() => setCancelDialogOpen(true)}>
								Cancel
							</Button>
							<Button
								accent='secondary'
								onClick={() => navigate(ROUTES.PUBLIC.PRICING)}>
								Manage plan
							</Button>
						</>
					)}

					{!isFree && isCanceled && (
						<Button
							accent='primary'
							onClick={() => reactivateSubscription()}
							disabled={isReactivating}>
							{isReactivating ? 'Reactivating...' : 'Reactivate'}
						</Button>
					)}
				</div>
			</div>

			<CancelConfirmDialog
				open={cancelDialogOpen}
				onOpenChange={setCancelDialogOpen}
				endPeriod={endPeriod}
				tierName={config?.name ?? ''}
			/>
		</>
	);
};
