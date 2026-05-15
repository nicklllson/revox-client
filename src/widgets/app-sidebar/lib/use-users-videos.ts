import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from '@/entities/auth';
import { videosApi } from '@/entities/video';

export const useUsersVideos = (search = '') => {
	const { session } = useSession();

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
		enabled: !!session,
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
