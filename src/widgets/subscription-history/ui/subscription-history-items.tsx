import type { TSubscriptionHistoryEntry } from '@/entities/subscription';
import { cn } from '@/shared/lib/utils';
import { formatHistoryAmount, formatHistoryDate } from '../lib/format';
import { EVENT_CONFIG } from '../model/event-config';

export const SubscriptionHistoryItem = ({
	entry,
}: {
	entry: TSubscriptionHistoryEntry;
}) => {
	const { label, icon: Icon, color } = EVENT_CONFIG[entry.eventType];

	return (
		<div className='grid grid-cols-[auto_1fr_auto] items-center gap-4 border-white/6 border-b py-3 last:border-b-0'>
			<div
				className={cn(
					'flex size-9 items-center justify-center rounded-full bg-white/5',
					color,
				)}>
				<Icon className='size-4' />
			</div>

			<div className='flex flex-col'>
				<span className='font-medium text-[13px]'>{label}</span>
				<span className='text-[11px] text-white/45'>
					{formatHistoryDate(entry.createdAt)} · {entry.tier}
				</span>
			</div>

			<div className='text-right text-[12px]'>
				{entry.payment ? (
					<>
						<div className='font-medium'>
							{formatHistoryAmount(
								entry.payment.amount,
								entry.payment.currency,
							)}
						</div>
						<div className='text-[10px] text-white/45'>
							{entry.payment.status}
						</div>
					</>
				) : (
					<span className='text-white/30'>—</span>
				)}
			</div>
		</div>
	);
};
