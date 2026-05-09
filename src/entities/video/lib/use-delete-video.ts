import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/api';
import { videosApi } from '../api/videos.api';

export const useDeleteVideo = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: videosApi.deleteVideo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: videosApi.getVideosFromUser().queryKey,
			});
		},
	});

	return { handleDeleteVideo: mutateAsync, isDeleting: isPending };
};
