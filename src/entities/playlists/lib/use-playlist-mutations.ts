import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { queryClient } from '@/shared/lib/api';
import { playlistsApi } from '../api/playlists.api';

export const useCreatePlaylist = () => {
	const { mutateAsync: createPlaylist, isPending: isCreating } = useMutation({
		mutationFn: playlistsApi.createPlaylist,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [playlistsApi.BASE_KEY] });
			toast.success('Playlist created');
		},
	});

	return { createPlaylist, isCreating };
};

export const useUpdatePlaylist = () => {
	const { mutateAsync: updatePlaylist, isPending: isUpdating } = useMutation({
		mutationFn: ({ id, ...dto }: { id: string; name?: string }) =>
			playlistsApi.updatePlaylist(id, dto),
		onSuccess: (_, { id }) => {
			queryClient.invalidateQueries({ queryKey: [playlistsApi.BASE_KEY] });
			queryClient.invalidateQueries({ queryKey: [playlistsApi.BASE_KEY, id] });
		},
	});

	return { updatePlaylist, isUpdating };
};

export const useDeletePlaylist = () => {
	const { mutateAsync: deletePlaylist, isPending: isDeleting } = useMutation({
		mutationFn: (id: string) => playlistsApi.deletePlaylist(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [playlistsApi.BASE_KEY] });
		},
	});

	return { deletePlaylist, isDeleting };
};
