import { useQueries } from '@tanstack/react-query';
import { playlistsApi } from '../api/playlists.api';

export const usePlaylistVideoMembership = (
	videoId: string | undefined,
	playlistIds: string[],
) => {
	const results = useQueries({
		queries: playlistIds.map(id => ({
			...playlistsApi.getPlaylist(id),
			enabled: !!videoId,
		})),
	});

	const membershipSet = new Set(
		results
			.map((result, i) =>
				result.data?.items.some(item => item.videoId === videoId)
					? playlistIds[i]
					: null,
			)
			.filter((id): id is string => id !== null),
	);

	return {
		membershipSet,
		isLoading:
			!!videoId && playlistIds.length > 0 && results.some(r => r.isPending),
	};
};
