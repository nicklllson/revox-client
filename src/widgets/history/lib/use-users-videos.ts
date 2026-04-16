import { useInfiniteQuery } from '@tanstack/react-query';
import { videosApi } from '@/entities/video';

export const useUsersVideos = () => {
	const {
		data,
		isFetching,
		hasNextPage,
		fetchNextPage,
		hasPreviousPage,
		fetchPreviousPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		...videosApi.getVideosFromUser(),
	});

	return {
		isFetching,
		hasNextPage,
		videos: data,
		fetchNextPage,
		hasPreviousPage,
		fetchPreviousPage,
		isFetchingNextPage,
	};
};
