import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { privateApi, publicApi } from '@/shared/lib/api';
import type {
	TPaymentStatus,
	TPaymentStatusResponse,
} from '../lib/use-payment-status';
import type {
	TCreatePaymentResponse,
	TCurrentTierInfo,
	TTier,
} from '../model/types';

const FINAL_STATUSES: TPaymentStatus[] = ['SUCCEEDED', 'CANCELED'];

export const subscriptionApi = {
	BASE_KEY: 'subscription',

	getAvailableTiers: () => {
		return queryOptions({
			queryKey: [subscriptionApi.BASE_KEY, 'tiers'],
			queryFn: () => publicApi<void, TTier[]>('/subscriptions/tiers'),
		});
	},

	getUserSubscription: () => {
		return queryOptions({
			queryKey: [subscriptionApi.BASE_KEY, 'me'],
			queryFn: () => privateApi<void, TCurrentTierInfo>('/subscriptions/me'),
		});
	},

	createPayment: () => {
		return mutationOptions({
			mutationFn: (tier: TTier['tier']): Promise<TCreatePaymentResponse> => {
				return privateApi('/payments', {
					method: 'POST',
					json: { tier },
				});
			},
		});
	},

	getPaymentStatus: (paymentId: string | null) => {
		return queryOptions<TPaymentStatusResponse>({
			queryKey: ['payment', paymentId],
			queryFn: () => privateApi(`/payments/${paymentId}`),
			refetchInterval: query => {
				const status = query.state.data?.status;
				if (status && FINAL_STATUSES.includes(status)) return false;
				return 2000;
			},
		});
	},
};
