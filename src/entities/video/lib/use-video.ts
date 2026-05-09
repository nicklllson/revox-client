import { useQuery } from '@tanstack/react-query';
import { videosApi } from '../api/videos.api';

export const useVideo = (videoId: string | undefined) => {
	const { data, isFetching } = useQuery({ ...videosApi.getVideo(videoId) });
	return { video: data, isFetching };
};
