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
import { useVolume } from '@/app/providers/volume-provider';
import { useAudioSync, useTranslationWs } from '@/features/translations';
import { craftVideoThumbnail } from '@/shared/model/videos.service';
import { Button } from '@/shared/ui/button';
import { getChunkIdAtTime } from '../model/serivices';

const HEARTBEAT_INTERVAL = 1000;
const PREFETCH_AHEAD = 3;

const YouTubePlayer = lazy(() => import('react-youtube'));

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
		state: { dubbingVolume },
	} = useVolume();
	const dubbingVolumeRef = useRef(dubbingVolume);
	dubbingVolumeRef.current = dubbingVolume;

	const {
		chunks,
		sendHeartbeat,
		progress,
		chunkMetas,
		chunksRef,
		requestedChunksRef,
		chunkMetasRef,
	} = useTranslationWs({
		videoId,
		targetLang,
		youtubeUrl: videoUrl,
		enabled: !!videoUrl,
	});

	const onBuffering = useCallback(() => {
		if (isBuffering) return;
		setIsBuffering(true);

		const time = playerTimeRef.current;
		const chunkId = getChunkIdAtTime(chunkMetas, time);
		for (let i = chunkId; i <= chunkId + PREFETCH_AHEAD; i++) {
			if (!chunksRef.current.has(i)) {
				requestedChunksRef.current.delete(i);
			}
		}
		sendHeartbeat(chunkId, time);

		bufferingIntervalRef.current = setInterval(() => {
			const t = playerTimeRef.current;
			const cid = getChunkIdAtTime(chunkMetas, t);

			for (let i = cid; i <= cid + PREFETCH_AHEAD; i++) {
				if (!chunksRef.current.has(i)) {
					requestedChunksRef.current.delete(i);
				}
			}

			sendHeartbeat(cid, t);
		}, 1000);

		getPlayer()?.pauseVideo();
	}, [
		isBuffering,
		getPlayer,
		sendHeartbeat,
		playerTimeRef,
		chunkMetas,
		chunksRef,
		requestedChunksRef,
	]);

	const onBuffered = useCallback(() => {
		if (!isBuffering) return;
		setIsBuffering(false);
		if (bufferingIntervalRef.current) {
			clearInterval(bufferingIntervalRef.current);
			bufferingIntervalRef.current = null;
		}
		getPlayer()?.playVideo();
	}, [isBuffering, getPlayer]);

	const { destroy, ensureContext, setVolume } = useAudioSync({
		isPlaying,
		chunkMetasRef,
		chunks: chunksRef,
		youtubeTimeRef: playerTimeRef,
		volumeRef: dubbingVolumeRef,
		onBuffered,
		onBuffering,
	});

	useEffect(() => {
		setVolume(dubbingVolume);
	}, [dubbingVolume, setVolume]);

	const handleStart = useCallback(() => {
		const player = getPlayer();
		if (!player) return;

		ensureContext();
		player.playVideo();
		setIsStarted(true);
	}, [getPlayer, ensureContext]);

	const startHeartbeat = useCallback(() => {
		if (heartbeatRef.current) return;
		heartbeatRef.current = setInterval(() => {
			const time = playerTimeRef.current;
			const chunkId = getChunkIdAtTime(chunkMetas, time);
			sendHeartbeat(chunkId, time);
		}, HEARTBEAT_INTERVAL);
	}, [chunkMetas, sendHeartbeat, playerTimeRef]);

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
			dispatch({ type: 'SET_PLAYING', payload: true });
			startHeartbeat();
		} else if (state === 2 || state === 0) {
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
		</div>
	);
};
