import { useSubscription } from '@/entities/subscription';
import { Button } from '@/shared/ui/button';

export const CurrentPlantCard = () => {
	const { subscription, config } = useSubscription();

	const endPeriod = subscription?.periodEnd
		? new Date(subscription?.periodEnd).toLocaleDateString('en')
		: null;

	return (
		<div className='grid grid-cols-[1fr_auto] items-center gap-4 rounded-[14px] border bg-primary-foreground px-[22px] py-5'>
			<div>
				<div className='mb-[6px] flex items-center gap-2'>
					<div className='rounded border border-[rgba(91,157,255,0.3)] bg-blue-800 px-2 py-[3px] font-bold font-mono text-[10px] tracking-[1px]'>
						{config?.name}
					</div>

					<span className='text-[11px]'>· Active</span>
				</div>

				<div className='font-bold text-[22px] tracking-[-0.4px]'>
					Revox {config?.name}
				</div>

				<div className='mt-1 text-[13px]'>
					${config?.priceUsd}/month · Renews {endPeriod}
				</div>
			</div>

			<div className='flex gap-2'>
				<Button variant='outline'>Invoices</Button>
				<Button accent='secondary'>Manage plan</Button>
			</div>
		</div>
	);
};
