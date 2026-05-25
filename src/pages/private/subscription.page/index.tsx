import { CurrentPlanCard } from '@/widgets/current-plan-card';
import { SubscriptionHistory } from '@/widgets/subscription-history';

export const SubscriptionPage = () => {
	return (
		<div className='flex flex-col gap-3'>
			<CurrentPlanCard />
			<SubscriptionHistory />
		</div>
	);
};

export const Component = SubscriptionPage;
