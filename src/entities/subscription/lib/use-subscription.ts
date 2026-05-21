import { useQuery } from '@tanstack/react-query';
import { subscriptionApi } from '../api/subscription.api';

export const useSubscription = () => {
	const { isFetching, data } = useQuery({
		...subscriptionApi.getUserSubscription(),
	});

	return { isFetchingSubscription: isFetching, ...data };
};
