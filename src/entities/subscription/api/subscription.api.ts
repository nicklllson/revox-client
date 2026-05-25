import {
	infiniteQueryOptions,
	mutationOptions,
	queryOptions,
} from '@tanstack/react-query';
import { privateApi, publicApi } from '@/shared/lib/api';
import type { TPaginatedResult } from '@/shared/types/queries';
import type {
	TPaymentStatus,
	TPaymentStatusResponse,
} from '../lib/use-payment-status';
import type {
	TCreatePaymentResponse,
	TCurrentTierInfo,
	TSubscriptionHistoryEntry,
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

	getHistory: () => {
		return infiniteQueryOptions({
			initialPageParam: 0,
			getNextPageParam: lastPage => lastPage.meta.nextSkip,
			queryKey: [subscriptionApi.BASE_KEY, 'history'],
			queryFn: () => {
				return privateApi<void, TPaginatedResult<TSubscriptionHistoryEntry>>(
					'/subscriptions/history',
				);
			},
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

	cancelSubscription: () => {
		return mutationOptions({
			mutationFn: () => privateApi('/subscriptions/cancel', { method: 'POST' }),
		});
	},

	reactivateSubscription: () => {
		return mutationOptions({
			mutationFn: () =>
				privateApi('/subscriptions/reactivate', { method: 'POST' }),
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
