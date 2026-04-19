import { useMutation } from '@tanstack/react-query';
import { videosApi } from '@/entities/video';
import { queryClient } from '@/shared/lib/api';

export const useCreateVideo = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: videosApi.createVideo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [videosApi.BASE_KEY] });
		},
	});

	return { handleCreateVideo: mutateAsync, isVideoCreating: isPending };
};
