import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { subscriptionApi } from '../api/subscription.api';

export const useCancelSubscription = () => {
	const queryClient = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		...subscriptionApi.cancelSubscription(),
		onSuccess: () => {
			toast.success('Subscription canceled', {
				description: 'You will keep your plan until the end of the period.',
			});
			queryClient.invalidateQueries({
				queryKey: [subscriptionApi.BASE_KEY],
			});
		},
		onError: (err: any) => {
			toast.error('Failed to cancel subscription', {
				description: err?.response?.data?.message ?? err.message,
			});
		},
	});

	return { cancelSubscription: mutateAsync, isCanceling: isPending };
};
