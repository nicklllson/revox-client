/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Not important dependencies */

import { Bookmark, Captions, Star } from 'lucide-react';
import { useCallback } from 'react';
import { useSubtitles } from '@/app/providers/subtitles-provider';
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
	const { isOpen, toggle } = useSubtitles();

	const handleToggleFavorite = useCallback(() => {
		if (!videoId) return;
		toggleFavorite(videoId);
	}, [videoId]);

	return (
		<div className='flex gap-2 max-2xl:w-full'>
			<Button
				variant='outline'
				onClick={handleToggleFavorite}
				id='onboarding-favorite-btn'>
				<Star fill={isFavorite ? 'white' : 'none'} />
				{isFavorite ? 'Remove from favorites' : 'Add to favorites'}
			</Button>

			<PlaylistsModal
				videoId={videoId}
				trigger={
					<Button variant='outline' className='max-2xl:mr-auto'>
						<Bookmark />
						Add to playlist
					</Button>
				}
			/>

			<Button variant='outline' onClick={toggle}>
				<Captions fill={isOpen ? 'currentColor' : 'none'} />
				Subtitles
			</Button>

			<PlayerVolumeChanger />
		</div>
	);
};
