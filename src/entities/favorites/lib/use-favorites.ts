import { useMutation } from '@tanstack/react-query';
import { videosApi } from '@/entities/video';
import { queryClient } from '@/shared/lib/api';
import { favoriteApi } from '../api/favorite.api';

export const useFavorites = (isFavorite: boolean) => {
	const { mutateAsync: toggleFavorite, isPending: isTogglingFavorite } =
		useMutation({
			mutationFn: (videoId: string) =>
				isFavorite
					? favoriteApi.removeFromFavorites(videoId)
					: favoriteApi.addToFavorites(videoId),
			onSuccess: data => {
				queryClient.invalidateQueries({
					queryKey: favoriteApi.getFavoritesFromUser().queryKey,
				});
				queryClient.invalidateQueries({
					queryKey: videosApi.getVideo(data.videoId).queryKey,
				});
			},
		});

	return {
		toggleFavorite,
		isTogglingFavorite,
	};
};
