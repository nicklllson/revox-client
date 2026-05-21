import { useQuery } from '@tanstack/react-query';
import { subscriptionApi } from '../api/subscription.api';

export const usePricingTiers = () => {
	const { isFetching, data } = useQuery({
		...subscriptionApi.getAvailableTiers(),
	});

	return { isFetching, tiers: data };
};
