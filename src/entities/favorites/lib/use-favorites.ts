import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/api';
import { favoriteApi } from '../api/favorite.api';

export const useFavorites = (isFavorite: boolean) => {
	const { mutateAsync: toggleFavorite, isPending: isTogglingFavorite } =
		useMutation({
			mutationFn: (videoId: string) =>
				isFavorite
					? favoriteApi.removeFromFavorites(videoId)
					: favoriteApi.addToFavorites(videoId),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: favoriteApi.getFavoritesFromUser().queryKey,
				});
			},
		});

	return {
		toggleFavorite,
		isTogglingFavorite,
	};
};
