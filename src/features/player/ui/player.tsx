import { lazy } from 'react';
import type { YouTubeEvent } from 'react-youtube';
import { usePlayer } from '@/app/providers/player-provider/player-provider';

const YouTubePlayer = lazy(() => import('react-youtube'));

export const Player = () => {
	const { playerRef, dispatch } = usePlayer();

	const handleOnReady = (e: YouTubeEvent) => {
		const title = e.target.getVideoData()?.title;
		dispatch({ type: 'SET_TITLE', payload: title });
	};

	return (
		<YouTubePlayer
			ref={playerRef}
			loading='eager'
			videoId='7vz6b_Ohdl0'
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
	);
};
