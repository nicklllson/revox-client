/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */

import { Play } from 'lucide-react';
import {
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import type { YouTubeEvent } from 'react-youtube';
import { usePlayer } from '@/app/providers/player-provider/player-provider';
import { useAudioSync, useTranslationWs } from '@/features/translations';
import { craftVideoThumbnail } from '@/shared/model/videos.service';
import { Button } from '@/shared/ui/button';

const YouTubePlayer = lazy(() => import('react-youtube'));

const CHUNK_DURATION = 30;
const HEARTBEAT_INTERVAL = 1000;

export const Player = ({
	youtubeVideoId,
	targetLang,
	videoId,
	videoUrl,
}: {
	youtubeVideoId: string;
	videoId: string;
	videoUrl: string;
	targetLang: string;
}) => {
	const [isReady, setIsReady] = useState<boolean>(false);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const {
		playerRef,
		dispatch,
		getPlayer,
		playerTimeRef,
		state: { isPlaying },
	} = usePlayer();

	const { chunks, sendHeartbeat } = useTranslationWs({
		videoId,
		targetLang,
		youtubeUrl: videoUrl,
		enabled: !!videoUrl,
	});

	const { destroy, ensureContext } = useAudioSync({
		chunks,
		isPlaying,
		youtubeTimeRef: playerTimeRef,
	});

	const handleStart = useCallback(() => {
		const player = getPlayer();
		if (!player) return;

		ensureContext();
		player.playVideo();
		setIsStarted(true);
	}, [getPlayer]);

	const startHeartbeat = useCallback(() => {
		if (heartbeatRef.current) return;
		heartbeatRef.current = setInterval(() => {
			const time = playerTimeRef.current;
			const chunkId = Math.floor(time / CHUNK_DURATION);
			sendHeartbeat(chunkId, time);
		}, HEARTBEAT_INTERVAL);
	}, [getPlayer, sendHeartbeat]);

	const stopHeartbeat = useCallback(() => {
		if (heartbeatRef.current) {
			clearInterval(heartbeatRef.current);
			heartbeatRef.current = null;
		}
	}, []);

	const handleOnReady = (e: YouTubeEvent) => {
		const data = e.target.getVideoData();
		dispatch({ type: 'SET_TITLE', payload: data?.title ?? '' });
		dispatch({
			type: 'SET_THUMBNAIL',
			payload: craftVideoThumbnail(youtubeVideoId),
		});
		setIsReady(true);
	};

	// YouTube player states:
	// -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering, 5 cued
	const handleStateChange = (e: YouTubeEvent) => {
		const state = e.data;

		if (state === 1) {
			// playing
			dispatch({ type: 'SET_PLAYING', payload: true });
			startHeartbeat();
		} else if (state === 2 || state === 0) {
			// paused or ended
			dispatch({ type: 'SET_PLAYING', payload: false });
			stopHeartbeat();
		}
	};

	useEffect(
		() => () => {
			destroy();
			stopHeartbeat();
		},
		[],
	);

	return (
		<div className='relative flex h-[76dvh] min-h-[440px] w-full gap-5 overflow-hidden rounded-2xl bg-white/5'>
			<Suspense>
				<YouTubePlayer
					ref={playerRef}
					loading='eager'
					videoId={youtubeVideoId}
					iframeClassName='absolute top-0 left-0 h-full w-full'
					onReady={handleOnReady}
					onStateChange={handleStateChange}
				/>
			</Suspense>

			{/* Кнопка Play/Pause */}
			{isReady && !isStarted && (
				<>
					{/* Overlay — перекрывает iframe чтобы клики не уходили в YouTube */}
					<div className='absolute inset-0 z-10 bg-black/80' />
					<Button
						variant={'outline'}
						onClick={handleStart}
						className='-translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 z-20 flex size-20 items-center gap-2 rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80'>
						<Play className='size-10' />
					</Button>
				</>
			)}
		</div>
	);
};
