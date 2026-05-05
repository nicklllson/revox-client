/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Not important dependencies */

import { Bookmark, Star } from 'lucide-react';
import { useCallback } from 'react';
import { useFavorites } from '@/entities/favorites';
import { PlayerVolumeChanger } from '@/features/change-player-volume';
import { Button } from '@/shared/ui/button';
import { PlaylistsModal } from '@/widgets/playlists-modal';

export const VideoSettings = ({
	isFavorite,
	videoId,
}: {
	videoId: string | undefined;
	isFavorite: boolean | undefined;
}) => {
	const { toggleFavorite } = useFavorites(isFavorite || false);

	const handleToggleFavorite = useCallback(() => {
		if (!videoId) return;
		toggleFavorite(videoId);
	}, [videoId]);

	return (
		<div className='flex gap-2'>
			<Button variant='outline' onClick={handleToggleFavorite}>
				<Star fill={isFavorite ? 'white' : 'none'} />
				{isFavorite ? 'Remove from favorites' : 'Add to favorites'}
			</Button>

			<PlaylistsModal
				videoId={videoId}
				trigger={
					<Button variant='outline'>
						<Bookmark />
						Add to playlist
					</Button>
				}
			/>

			<PlayerVolumeChanger />
		</div>
	);
};
