import { useInfiniteQuery } from '@tanstack/react-query';
import { useSession } from '@/entities/auth';
import { playlistsApi } from '../api/playlists.api';

export const usePlaylists = (params?: { search?: string }) => {
	const { session } = useSession();

	const { data, ...rest } = useInfiniteQuery({
		...playlistsApi.getUserPlaylists(params),
		enabled: !!session,
	});

	return { playlists: data, ...rest };
};
