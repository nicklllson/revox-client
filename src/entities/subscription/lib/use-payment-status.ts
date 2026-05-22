import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSession } from '@/entities/auth';
import { subscriptionApi } from '../api/subscription.api';
import type { TSubscriptionTier } from '../model/types';

export type TPaymentStatus =
	| 'PENDING'
	| 'WAITING_FOR_CAPTURE'
	| 'SUCCEEDED'
	| 'CANCELED';

export type TPaymentStatusResponse = {
	id: string;
	status: TPaymentStatus;
	tier: TSubscriptionTier;
	amount: number;
	currency: string;
};

export const usePaymentStatus = (paymentId: string | null) => {
	const queryClient = useQueryClient();
	const { session } = useSession();

	const query = useQuery<TPaymentStatusResponse>({
		...subscriptionApi.getPaymentStatus(paymentId),
		retry: false,
		enabled: !!paymentId && !!session,
	});

	useEffect(() => {
		if (query.data?.status === 'SUCCEEDED') {
			queryClient.invalidateQueries({ queryKey: ['subscription', 'me'] });
			queryClient.invalidateQueries({ queryKey: ['subscription', 'current'] });
		}
	}, [query.data?.status, queryClient]);

	return query;
};
