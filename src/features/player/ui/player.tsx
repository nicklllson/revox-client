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
const PREFETCH_AHEAD = 3;

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
	const [isBuffering, setIsBuffering] = useState<boolean>(false);

	const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const bufferingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
		null,
	);

	const {
		playerRef,
		dispatch,
		getPlayer,
		playerTimeRef,
		state: { isPlaying },
	} = usePlayer();

	const {
		chunks,
		sendHeartbeat,
		progress,
		chunkMetas,
		chunksRef,
		requestedChunksRef,
	} = useTranslationWs({
		videoId,
		targetLang,
		youtubeUrl: videoUrl,
		enabled: !!videoUrl,
	});

	const onBuffering = useCallback(() => {
		if (isBuffering) return;
		setIsBuffering(true);

		bufferingIntervalRef.current = setInterval(() => {
			const time = playerTimeRef.current;
			const chunkId = Math.floor(time / CHUNK_DURATION);

			for (let i = chunkId; i <= chunkId + PREFETCH_AHEAD; i++) {
				if (!chunksRef.current.has(i)) {
					requestedChunksRef.current.delete(i);
				}
			}

			sendHeartbeat(chunkId, time);
		}, 1000);

		getPlayer()?.pauseVideo();
	}, [
		isBuffering,
		getPlayer,
		sendHeartbeat,
		playerTimeRef,
		chunksRef,
		requestedChunksRef,
	]);

	const onBuffered = useCallback(() => {
		setIsBuffering(false);
		if (bufferingIntervalRef.current) {
			clearInterval(bufferingIntervalRef.current);
			bufferingIntervalRef.current = null;
		}
		getPlayer()?.playVideo();
	}, [getPlayer, isPlaying]);

	const { destroy, ensureContext } = useAudioSync({
		isPlaying,
		chunkMetas,
		chunks: chunksRef,
		youtubeTimeRef: playerTimeRef,
		onBuffered,
		onBuffering,
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
			if (bufferingIntervalRef.current)
				clearInterval(bufferingIntervalRef.current);
		},
		[],
	);

	return (
		<div className='relative flex aspect-video min-h-[440px] w-full gap-5 overflow-hidden rounded-2xl bg-white/5'>
			<Suspense
				fallback={
					<div className='absolute top-0 left-0 h-full w-full bg-red' />
				}>
				<YouTubePlayer
					ref={playerRef}
					loading='eager'
					videoId={youtubeVideoId}
					iframeClassName='absolute top-0 left-0 h-full w-full'
					onReady={handleOnReady}
					onStateChange={handleStateChange}
				/>
			</Suspense>

			{isReady && !isStarted && (
				<>
					<div className='absolute inset-0 z-10 bg-black/80 backdrop-blur-sm' />

					<div className='-translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 z-20 flex flex-col items-center gap-4'>
						{chunks.size === 0 ? (
							<div className='flex flex-col items-center gap-2 text-center text-white'>
								<div className='h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white' />
								<span className='font-medium text-sm'>
									{progress?.message ?? 'Preparing translation...'}
								</span>
								{progress && (
									<div className='h-1 w-48 overflow-hidden rounded-full bg-white/20'>
										<div
											className='h-full rounded-full bg-white transition-all duration-500'
											style={{ width: `${progress.percent}%` }}
										/>
									</div>
								)}
							</div>
						) : (
							// первый чанк готов — показываем Play
							<Button
								variant='outline'
								onClick={handleStart}
								className='flex size-20 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80'>
								<Play className='size-10' />
							</Button>
						)}
					</div>
				</>
			)}
			{/* 
			{error && (
				<>
					<div className='absolute inset-0 z-10 bg-black/80 backdrop-blur-sm' />
					<div className='-translate-y-1/2 -translate-x-1/2 absolute top-1/2 left-1/2 z-20 flex flex-col items-center gap-3 text-center text-white'>
						<span className='text-4xl'>⚠️</span>
						<span className='font-medium text-sm'>{error}</span>
					</div>
				</>
			)} */}
		</div>
	);
};
