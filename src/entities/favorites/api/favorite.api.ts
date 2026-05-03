import { infiniteQueryOptions } from '@tanstack/react-query';
import { privateApi } from '@/shared/lib/api';
import type { TPaginatedResult } from '@/shared/types/queries';
import type { TFavoriteVideo } from '../model/types';

const DEFAULT_TAKE = 20;

export const favoriteApi = {
	BASE_KEY: 'favorites',

	addToFavorites: (videoId: string) => {
		return privateApi(`/favorites/${videoId}`, {
			method: 'POST',
		});
	},

	removeFromFavorites: (videoId: string) => {
		return privateApi(`/favorites/${videoId}`, {
			method: 'DELETE',
		});
	},

	getFavoritesFromUser: (params?: { search?: string; lang?: string }) => {
		return infiniteQueryOptions({
			queryKey: [favoriteApi.BASE_KEY, { ...params }],
			queryFn: ({ pageParam }) =>
				privateApi<void, TPaginatedResult<TFavoriteVideo>>('/favorites', {
					params: {
						skip: pageParam,
						take: DEFAULT_TAKE,
						...params,
					},
				}),
			initialPageParam: 0,
			getNextPageParam: lastPage => lastPage.meta.nextSkip,
			select: data => {
				return data?.pages.flatMap(page => page.data) ?? [];
			},
		});
	},
};
