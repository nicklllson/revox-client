import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/api';
import { videosApi } from '../api/videos.api';

export const useUpdateVideo = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: videosApi.updateVideo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: videosApi.getVideosFromUser().queryKey,
			});
		},
	});

	return { handleUpdateVideo: mutateAsync, isPending };
};
