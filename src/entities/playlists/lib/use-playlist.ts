import { useQuery } from '@tanstack/react-query';
import { playlistsApi } from '../api/playlists.api';

export const usePlaylist = (id: string | undefined) => {
	const { data, ...rest } = useQuery(playlistsApi.getPlaylist(id));

	return { playlist: data, ...rest };
};
