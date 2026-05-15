import { useInfiniteQuery } from '@tanstack/react-query';
import { videosApi } from '@/entities/video';

export const useUsersVideos = (search = '') => {
	const {
		data,
		isFetching,
		hasNextPage,
		fetchNextPage,
		hasPreviousPage,
		fetchPreviousPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		...videosApi.getVideosFromUser(search ? { search } : {}),
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
