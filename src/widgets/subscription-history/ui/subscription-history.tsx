import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useSubscriptionHistory } from '@/entities/subscription';
import { Button } from '@/shared/ui/button';
import { formatAmount } from '@/widgets/payment/model/services';
import { formatDate } from '../lib/format';
import { EVENT_CONFIG } from '../model/event-config';

const PAGE_SIZE = 10;

export const SubscriptionHistory = () => {
	const [page, setPage] = useState<number>(1);
	const { isFetching, history, total, totalPages } = useSubscriptionHistory();

	const isEmpty = !isFetching && history.length === 0;
	const showFrom = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
	const showTo = Math.min(page * PAGE_SIZE, total);

	if (isEmpty) {
		return (
			<div className='rounded-[14px] border bg-primary-foreground py-10 text-center text-sm text-white/40'>
				No subscription history yet
			</div>
		);
	}

	return (
		<div className='overflow-hidden rounded-[14px] border bg-primary-foreground'>
			<div className='grid grid-cols-[1fr_120px_140px_120px] gap-4 border-white/6 border-b px-5 py-3 text-[10px] text-white/45 uppercase tracking-wider'>
				<div>Event</div>
				<div>Plan</div>
				<div>Date</div>
				<div className='text-right'>Amount</div>
			</div>

			<div className='relative'>
				{isFetching && (
					<div className='absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]'>
						<Loader2 className='size-5 animate-spin text-white/60' />
					</div>
				)}

				{history.map(entry => {
					const cfg = EVENT_CONFIG[entry.eventType];
					const Icon = cfg.icon;

					return (
						<div
							key={entry.id}
							className='grid grid-cols-[1fr_120px_140px_120px] items-center gap-4 border-white/6 border-b px-5 py-3 last:border-b-0 hover:bg-white/2'>
							<div className='flex items-center gap-3'>
								<div
									className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-white/5 ${cfg.color}`}>
									<Icon className='size-[14px]' />
								</div>
								<span className='font-medium text-[13px]'>{cfg.label}</span>
							</div>

							<div className='font-mono text-[11px] text-white/70'>
								{entry.tier}
							</div>

							<div className='text-[12px] text-white/70'>
								{formatDate(entry.createdAt)}
							</div>

							<div className='text-right'>
								{entry.payment ? (
									<div className='flex flex-col'>
										<span className='font-medium text-[12px]'>
											{formatAmount(
												entry.payment.amount,
												entry.payment.currency,
											)}
										</span>
										<span className='text-[10px] text-white/45'>
											{entry.payment.status}
										</span>
									</div>
								) : (
									<span className='text-white/30'>—</span>
								)}
							</div>
						</div>
					);
				})}
			</div>

			{totalPages > 1 && (
				<div className='flex items-center justify-between border-white/6 border-t px-5 py-3'>
					<span className='text-[11px] text-white/45'>
						Showing {showFrom}–{showTo} of {total}
					</span>

					<div className='flex items-center gap-1'>
						<Button
							size='sm'
							variant='outline'
							disabled={page === 1 || isFetching}
							onClick={() => setPage(p => Math.max(1, p - 1))}>
							<ChevronLeft className='size-3.5' />
						</Button>
						<span className='px-2 text-[11px] text-white/70'>
							{page} / {totalPages}
						</span>
						<Button
							size='sm'
							variant='outline'
							disabled={page === totalPages || isFetching}
							onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
							<ChevronRight className='size-3.5' />
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
