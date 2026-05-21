import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { privateApi } from '@/shared/lib/api';

export type TPaymentStatus =
	| 'PENDING'
	| 'WAITING_FOR_CAPTURE'
	| 'SUCCEEDED'
	| 'CANCELED';

export type TPaymentStatusResponse = {
	id: string;
	status: TPaymentStatus;
	tier: 'FREE' | 'PRO' | 'PREMIUM';
	amount: number;
	currency: string;
};

const FINAL_STATUSES: TPaymentStatus[] = ['SUCCEEDED', 'CANCELED'];

export const usePaymentStatus = (paymentId: string | null) => {
	const queryClient = useQueryClient();

	const query = useQuery<TPaymentStatusResponse>({
		queryKey: ['payment', paymentId],
		queryFn: () => privateApi(`/payments/${paymentId}`),
		enabled: !!paymentId,
		refetchInterval: query => {
			const status = query.state.data?.status;
			if (status && FINAL_STATUSES.includes(status)) return false;
			return 2000;
		},
		retry: false,
	});

	useEffect(() => {
		if (query.data?.status === 'SUCCEEDED') {
			queryClient.invalidateQueries({ queryKey: ['subscription', 'me'] });
			queryClient.invalidateQueries({ queryKey: ['subscription', 'current'] });
		}
	}, [query.data?.status, queryClient]);

	return query;
};
