import { cn } from '@/shared/lib/utils';

const plans = [
	{
		id: 'free',
		name: 'Free',
		price: '0 ₽ / мес',
		features: ['5 видео / мес', 'До 10 минут', 'Стандартный голос'],
		available: true,
	},
	{
		id: 'pro',
		name: 'Pro',
		price: '990 ₽ / мес',
		features: ['Безлимит', 'До 2 часов', 'ElevenLabs голоса'],
		available: false,
	},
];

export const PlanTab = () => {
	const currentPlan = 'free';

	return (
		<div className='p-5'>
			<div className='grid grid-cols-2 gap-3'>
				{plans.map(plan => (
					<div
						key={plan.id}
						className={cn(
							'relative rounded-lg border p-4',
							plan.id === currentPlan && 'border-blue-500 bg-blue-50',
							!plan.available && 'cursor-not-allowed opacity-50',
						)}>
						{!plan.available && (
							<span className='absolute top-2.5 right-2.5 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground'>
								Скоро
							</span>
						)}
						{plan.id === currentPlan && (
							<span className='mb-2 inline-block rounded bg-white px-1.5 py-0.5 text-[10px] text-muted-foreground'>
								Текущий
							</span>
						)}
						<p className='font-medium text-sm'>{plan.name}</p>
						<p className='mt-0.5 text-muted-foreground text-xs'>{plan.price}</p>
						<ul className='mt-3 space-y-1.5'>
							{plan.features.map(f => (
								<li
									key={f}
									className='flex items-center gap-1.5 text-muted-foreground text-xs'>
									<span className='text-green-500'>✓</span> {f}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};
