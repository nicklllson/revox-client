import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/api';
import { playlistsApi } from '../api/playlists.api';

export const usePlaylistVideo = (playlistId: string) => {
	const invalidate = () => {
		queryClient.invalidateQueries({
			queryKey: [playlistsApi.BASE_KEY, playlistId],
		});
	};

	const { mutateAsync: addVideo, isPending: isAdding } = useMutation({
		mutationFn: (videoId: string) =>
			playlistsApi.addVideoToPlaylist({ playlistId, videoId }),
		onSuccess: invalidate,
	});

	const { mutateAsync: removeVideo, isPending: isRemoving } = useMutation({
		mutationFn: (videoId: string) =>
			playlistsApi.removeVideoFromPlaylist({ playlistId, videoId }),
		onSuccess: invalidate,
	});

	return { addVideo, isAdding, removeVideo, isRemoving };
};
