import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { privateApi, publicApi } from '@/shared/lib/api';
import type {
	TCreatePaymentResponse,
	TCurrentTierInfo,
	TTier,
} from '../model/types';

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
};
