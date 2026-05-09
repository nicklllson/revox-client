import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { privateApi } from '@/shared/lib/api';
import type { TPaginatedResult } from '@/shared/types/queries';
import type {
	TCreatePlaylistDto,
	TPlaylist,
	TPlaylistItem,
	TPlaylistWithItems,
	TUpdatePlaylistDto,
} from '../model/types';

const DEFAULT_TAKE = 20;

export const playlistsApi = {
	BASE_KEY: 'playlists',

	getUserPlaylists: (params?: { search?: string }) =>
		infiniteQueryOptions({
			queryKey: [playlistsApi.BASE_KEY, { ...params }],
			queryFn: ({ pageParam }) =>
				privateApi<void, TPaginatedResult<TPlaylist>>('/playlists', {
					params: {
						skip: pageParam,
						take: DEFAULT_TAKE,
						...(params?.search ? { search: params.search } : {}),
					},
				}),
			initialPageParam: 0,
			getNextPageParam: lastPage => lastPage.meta.nextSkip,
			select: data => data?.pages.flatMap(page => page.data) ?? [],
		}),

	getPlaylist: (id: string | undefined) =>
		queryOptions({
			queryKey: [playlistsApi.BASE_KEY, id],
			queryFn: () => privateApi<void, TPlaylistWithItems>(`/playlists/${id}`),
			enabled: !!id,
			refetchOnMount: false,
			refetchOnReconnect: false,
			refetchOnWindowFocus: false,
		}),

	createPlaylist: (dto: TCreatePlaylistDto) =>
		privateApi<TCreatePlaylistDto, TPlaylist>('/playlists', {
			method: 'POST',
			json: dto,
		}),

	updatePlaylist: (id: string, dto: TUpdatePlaylistDto) =>
		privateApi<TUpdatePlaylistDto, TPlaylist>(`/playlists/${id}`, {
			method: 'PATCH',
			json: dto,
		}),

	deletePlaylist: (id: string) =>
		privateApi<void, { ok: string }>(`/playlists/${id}`, {
			method: 'DELETE',
		}),

	addVideoToPlaylist: (params: { playlistId: string; videoId: string }) =>
		privateApi<void, TPlaylistItem>(
			`/playlists/${params.playlistId}/videos/${params.videoId}`,
			{ method: 'POST' },
		),

	removeVideoFromPlaylist: (params: { playlistId: string; videoId: string }) =>
		privateApi<void, TPlaylistItem>(
			`/playlists/${params.playlistId}/videos/${params.videoId}`,
			{ method: 'DELETE' },
		),
};
