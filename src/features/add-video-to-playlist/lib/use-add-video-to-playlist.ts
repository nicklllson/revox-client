import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import { playlistsApi, usePlaylistVideoMembership } from '@/entities/playlists';
import { queryClient } from '@/shared/lib/api';

export const useAddVideoToPlaylist = (
	videoId: string,
	playlistIds: string[],
) => {
	const { membershipSet, isLoading: isMembershipLoading } =
		usePlaylistVideoMembership(videoId || undefined, playlistIds);

	const [sessionState, setSessionState] = useState<Map<string, boolean>>(
		new Map(),
	);
	const [pendingId, setPendingId] = useState<string | null>(null);

	const isInPlaylist = (playlistId: string): boolean => {
		if (sessionState.has(playlistId)) return sessionState.get(playlistId)!;
		return membershipSet.has(playlistId);
	};

	const invalidate = (playlistId: string) => {
		queryClient.invalidateQueries({
			queryKey: [playlistsApi.BASE_KEY, playlistId],
		});
	};

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: (playlistId: string) =>
			playlistsApi.addVideoToPlaylist({ playlistId, videoId }),
		onSuccess: (_, playlistId) => {
			setSessionState(prev => new Map(prev).set(playlistId, true));
			invalidate(playlistId);
			toast.success('Added to playlist');
		},
		onSettled: (_, __, playlistId) => {
			setPendingId(prev => (prev === playlistId ? null : prev));
		},
	});

	const { mutateAsync: removeMutation } = useMutation({
		mutationFn: (playlistId: string) =>
			playlistsApi.removeVideoFromPlaylist({ playlistId, videoId }),
		onSuccess: (_, playlistId) => {
			setSessionState(prev => new Map(prev).set(playlistId, false));
			invalidate(playlistId);
			toast.success('Removed from playlist');
		},
		onSettled: (_, __, playlistId) => {
			setPendingId(prev => (prev === playlistId ? null : prev));
		},
	});

	const togglePlaylist = (playlistId: string) => {
		setPendingId(playlistId);
		if (isInPlaylist(playlistId)) {
			return removeMutation(playlistId);
		}
		return addMutation(playlistId);
	};

	return { togglePlaylist, isInPlaylist, pendingId, isMembershipLoading };
};
