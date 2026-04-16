import { lazy, Suspense } from 'react';
import type { YouTubeEvent } from 'react-youtube';
import { usePlayer } from '@/app/providers/player-provider/player-provider';
import { craftVideoThumbnail } from '@/shared/model/videos.service';

const YouTubePlayer = lazy(() => import('react-youtube'));

export const Player = ({ youtubeVideoId }: { youtubeVideoId: string }) => {
	const { playerRef, dispatch } = usePlayer();

	const handleOnReady = (e: YouTubeEvent) => {
		const data = e.target.getVideoData();
		dispatch({ type: 'SET_TITLE', payload: data?.title ?? '' });
		dispatch({
			type: 'SET_THUMBNAIL',
			payload: craftVideoThumbnail(youtubeVideoId),
		});
	};

	return (
		<div className='relative flex h-[72dvh] min-h-[440px] w-full gap-5 overflow-hidden rounded-2xl bg-white/5'>
			<Suspense>
				<YouTubePlayer
					ref={playerRef}
					loading='eager'
					videoId={youtubeVideoId}
					iframeClassName='absolute top-0 left-0 h-full w-full'
					onReady={handleOnReady}
					onPlay={() => console.log('onPlay')}
					onPause={() => console.log('onPause')}
					onEnd={() => console.log('onEnd')}
					onError={() => console.log('onError')}
					onStateChange={() => console.log('onStateChange')}
					onPlaybackRateChange={() => console.log('onPlaybackRateChange')}
					onPlaybackQualityChange={() => console.log('onPlaybackQualityChange')}
				/>
			</Suspense>
		</div>
	);
};
