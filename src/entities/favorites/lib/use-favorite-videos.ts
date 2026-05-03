import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from '@/entities/auth';
import { favoriteApi } from '../api/favorite.api';

export const useFavoriteVideos = (params?: {
	search?: string;
	lang?: string | null;
}) => {
	const { session } = useSession();

	const { data, ...restProps } = useInfiniteQuery({
		...favoriteApi.getFavoritesFromUser({
			search: params?.search || undefined,
			lang: params?.lang || undefined,
		}),
		enabled: !!session,
	});

	return {
		favoriteVideos: data,
		...restProps,
	};
};
