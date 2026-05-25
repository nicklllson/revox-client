import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { subscriptionApi } from '../api/subscription.api';

export const useSubscriptionHistory = () => {
	const { isFetching, data } = useInfiniteQuery({
		...subscriptionApi.getHistory(),
	});

	const history = useMemo(() => {
		return data?.pages.flatMap(page => page.data) ?? [];
	}, [data]);

	const total = data?.pages?.[0]?.meta.total ?? 0;

	const totalPages = useMemo(() => {
		const meta = data?.pages?.[0]?.meta;

		if (!meta) return 0;

		return Math.ceil(meta.total / meta.take);
	}, [data]);

	return {
		isFetching,
		history,
		total,
		totalPages,
	};
};
