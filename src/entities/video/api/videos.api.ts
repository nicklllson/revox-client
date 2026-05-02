import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { privateApi } from '@/shared/lib/api';
import type { TPaginatedResult } from '@/shared/types/queries';
import type {
	TCreateVideoDto,
	TUpdateVideoDto,
	TVideo,
	TVideosParams,
} from '../model/types';

const DEFAULT_TAKE = 20;

export const videosApi = {
	BASE_KEY: 'videos',

	getVideosFromUser: (params: TVideosParams = {}) =>
		infiniteQueryOptions({
			queryKey: [videosApi.BASE_KEY],
			queryFn: ({ pageParam }) =>
				privateApi<void, TPaginatedResult<TVideo>>('/videos', {
					params: {
						skip: pageParam,
						take: params.take ?? DEFAULT_TAKE,
						...(params.search ? { search: params.search } : {}),
					},
				}),

			initialPageParam: 0,
			getNextPageParam: lastPage => lastPage.meta.nextSkip,
			select: data => {
				return data?.pages.flatMap(page => page.data) ?? [];
			},
		}),

	createVideo: (dto: Omit<TCreateVideoDto, 'youtubeVideoId'>) =>
		privateApi<Omit<TCreateVideoDto, 'youtubeVideoId'>, TVideo>('/videos', {
			method: 'POST',
			json: dto,
		}),

	updateVideo: ({ videoId, ...dto }: TUpdateVideoDto) =>
		privateApi<TUpdateVideoDto, TVideo>(`/videos/${videoId}`, {
			method: 'PATCH',
			json: dto,
		}),

	getVideo: (videoId: string | undefined) =>
		queryOptions({
			queryKey: [videosApi.BASE_KEY, videoId],
			queryFn: () => privateApi<void, TVideo>(`/videos/${videoId}`),
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}),

	deleteVideo: (videoId: string) => {
		return privateApi<void, { ok: string }>(`/videos/${videoId}`, {
			method: 'DELETE',
		});
	},
};
