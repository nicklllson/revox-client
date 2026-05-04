/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Not important dependencies */

import { Star } from 'lucide-react';
import { useCallback } from 'react';
import { useFavorites } from '@/entities/favorites';
import { PlayerVolumeChanger } from '@/features/change-player-volume';
import { Button } from '@/shared/ui/button';

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
			<Button size='icon' variant='outline' onClick={handleToggleFavorite}>
				<Star fill={isFavorite ? 'white' : 'none'} />
			</Button>
			<PlayerVolumeChanger />
			{/* <div>add to playlist</div> */}
		</div>
	);
};
