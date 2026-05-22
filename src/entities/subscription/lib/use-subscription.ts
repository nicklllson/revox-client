import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/entities/auth';
import { subscriptionApi } from '../api/subscription.api';

export const useSubscription = () => {
	const { session } = useSession();
	const { isFetching, data } = useQuery({
		...subscriptionApi.getUserSubscription(),
		enabled: !!session,
	});

	return { isFetchingSubscription: isFetching, ...data };
};
