import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { subscriptionApi } from '../api/subscription.api';

export const useReactivateSubscription = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		...subscriptionApi.reactivateSubscription(),
		onSuccess: () => {
			toast.success('Subscription reactivated', {
				description: 'Your plan will renew automatically.',
			});
			queryClient.invalidateQueries({
				queryKey: [subscriptionApi.BASE_KEY],
			});
		},
		onError: (err: any) => {
			toast.error('Failed to reactivate subscription', {
				description: err?.response?.data?.message ?? err.message,
			});
		},
	});

	return { reactivateSubscription: mutateAsync, isReactivating: isPending };
};
