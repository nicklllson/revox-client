/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Exception */

import { Loader2, Play } from 'lucide-react';
import { useNextStep } from 'nextstepjs';
import {
	lazy,
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useNavigate } from 'react-router';
import type { YouTubeEvent } from 'react-youtube';
import { toast } from 'sonner';
import { usePlayer } from '@/app/providers/player-provider/player-provider';
import { useVolume } from '@/app/providers/volume-provider';
import { DEFAULT_VOICE_SETTINGS } from '@/entities/translation';
import { type TCreateVideoVoice, useVideo } from '@/entities/video';
import { useAudioSync, useTranslationWs } from '@/features/translations';
import { cn } from '@/shared/lib/utils';
import { craftVideoThumbnail } from '@/shared/model/videos.service';
import { Button } from '@/shared/ui/button';
import { VideoMeta } from '@/widgets/video-player';
import { useSeekObserver } from '../lib/use-seek-observer';
import { PLAYER_OPTIONS } from '../model/config';
import { getChunkIdAtTime } from '../model/service';

const HEARTBEAT_INTERVAL = 1000;
const PREFETCH_AHEAD = 3;

const YouTubePlayer = lazy(() => import('react-youtube'));

export const Player = ({
	videoId,
	isVertical,
}: {
	videoId: string;
	isVertical: boolean;
}) => {
	const { video } = useVideo(videoId);
	const { startNextStep } = useNextStep();

	const [isReady, setIsReady] = useState<boolean>(false);
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const [isBuffering, setIsBuffering] = useState<boolean>(false);
	const [isWaitingForChunk, setIsWaitingForChunk] = useState<boolean>(false);

	const waitingChunkIdRef = useRef<number | null>(null);
	const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const bufferingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
		null,
	);

	const navigate = useNavigate();

	const {
		playerRef,
		dispatch,
		getPlayer,
		playerTimeRef,
		setChunkMetas,
		state: { isPlaying },
	} = usePlayer();

	const {
		state: { dubbingVolume },
	} = useVolume();
	const dubbingVolumeRef = useRef(dubbingVolume);
	dubbingVolumeRef.current = dubbingVolume;

	const voice = useMemo<TCreateVideoVoice>(
		() => ({
			gender:
				(video?.voiceGender as 'female' | 'male') ??
				DEFAULT_VOICE_SETTINGS.gender,
			voice_name: video?.voiceName ?? DEFAULT_VOICE_SETTINGS.voice_name,
			style:
				(video?.voiceStyle as 'neutral' | 'narrator') ??
				DEFAULT_VOICE_SETTINGS.style,
		}),
		[video?.voiceGender, video?.voiceName, video?.voiceStyle],
	);

	const {
		chunks,
		sendHeartbeat,
		sendSeek,
		progress,
		chunkMetas,
		chunksRef,
		requestedChunksRef,
		chunkMetasRef,
		error,
	} = useTranslationWs({
		videoId,
		targetLang: video?.language ?? '',
		youtubeUrl: video?.videoUrl ?? '',
		voice,
		enabled: !!video,
	});

	const onBuffering = useCallback(() => {
		if (isBuffering) return;
		if (isWaitingForChunk) return;
		setIsBuffering(true);

		const time = playerTimeRef.current;
		const chunkId = getChunkIdAtTime(chunkMetasRef.current, time);
		for (let i = chunkId; i <= chunkId + PREFETCH_AHEAD; i++) {
			if (!chunksRef.current.has(i)) {
				requestedChunksRef.current.delete(i);
			}
		}
		sendHeartbeat(chunkId);

		bufferingIntervalRef.current = setInterval(() => {
			const t = playerTimeRef.current;
			const cid = getChunkIdAtTime(chunkMetasRef.current, t);

			for (let i = cid; i <= cid + PREFETCH_AHEAD; i++) {
				if (!chunksRef.current.has(i)) {
					requestedChunksRef.current.delete(i);
				}
			}

			sendHeartbeat(cid);
		}, 1000);

		getPlayer()?.pauseVideo();
	}, [isBuffering, getPlayer, sendHeartbeat, isWaitingForChunk]);

	const onBuffered = useCallback(() => {
		if (!isBuffering) return;
		if (isWaitingForChunk) return;

		setIsBuffering(false);
		if (bufferingIntervalRef.current) {
			clearInterval(bufferingIntervalRef.current);
			bufferingIntervalRef.current = null;
		}
		getPlayer()?.playVideo();
	}, [isBuffering, getPlayer, isWaitingForChunk]);

	const { destroy, ensureContext, setVolume, handleSeek, stopPlayback } =
		useAudioSync({
			isPlaying,
			chunkMetasRef,
			chunks: chunksRef,
			youtubeTimeRef: playerTimeRef,
			volumeRef: dubbingVolumeRef,
			onBuffered,
			onBuffering,
		});

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
			const chunkId = getChunkIdAtTime(chunkMetasRef.current, time); // ← ref!

			sendHeartbeat(chunkId);
		}, HEARTBEAT_INTERVAL);
	}, [sendHeartbeat]);

	const stopHeartbeat = useCallback(() => {
		if (heartbeatRef.current) {
			clearInterval(heartbeatRef.current);
			heartbeatRef.current = null;
		}
	}, []);

	const handleUserSeek = useCallback(
		(time: number) => {
			if (!isStarted) return;

			const targetChunkId = getChunkIdAtTime(chunkMetasRef.current, time);
			const isReady =
				chunksRef.current.has(targetChunkId) &&
				chunkMetasRef.current.has(targetChunkId);

			getPlayer()?.pauseVideo();
			sendSeek(time);
			stopPlayback();

			if (isReady) {
				waitingChunkIdRef.current = null;
				setIsWaitingForChunk(false);
				handleSeek(time);
				setTimeout(() => getPlayer()?.playVideo(), 80);
				return;
			}

			waitingChunkIdRef.current = targetChunkId;
			setIsWaitingForChunk(true);
		},
		[
			/* deps */
		],
	);

	const handleOnReady = (e: YouTubeEvent) => {
		const data = e.target.getVideoData();
		dispatch({ type: 'SET_TITLE', payload: data?.title ?? '' });
		dispatch({
			type: 'SET_THUMBNAIL',
			payload: craftVideoThumbnail(video?.youtubeVideoId ?? ''),
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

	useEffect(() => {
		setVolume(dubbingVolume);
	}, [dubbingVolume]);

	useEffect(() => {
		if (!isWaitingForChunk) return;

		const targetChunkId = waitingChunkIdRef.current;
		if (targetChunkId === null) return;

		if (!chunksRef.current.has(targetChunkId)) return;
		if (!chunkMetasRef.current.has(targetChunkId)) return;

		const targetTime = playerTimeRef.current;
		const currentChunkAtTime = getChunkIdAtTime(chunkMetas, targetTime);
		if (currentChunkAtTime !== targetChunkId) return;

		waitingChunkIdRef.current = null;
		setIsWaitingForChunk(false);
		handleSeek(targetTime);
		getPlayer()?.playVideo();
	}, [
		chunks,
		chunkMetas,
		isWaitingForChunk,
		handleSeek,
		getPlayer,
		playerTimeRef,
		chunksRef,
		chunkMetasRef,
	]);

	useEffect(() => {
		setChunkMetas(chunkMetas);
	}, [chunkMetas]);

	// Refactor this to not rely on error message for control flow
	useEffect(() => {
		if (!error) return;

		if (error.code === 'credits_exhausted') {
			toast.error('Credits exhausted', {
				description:
					'Your translation was stopped. Upgrade your plan to continue.',
				duration: Number.POSITIVE_INFINITY,
				action: {
					label: 'Upgrade',
					onClick: () => navigate('/pricing'),
				},
			});
			getPlayer()?.pauseVideo();
			stopHeartbeat();
			destroy();
			dispatch({ type: 'SET_PLAYING', payload: false });
		} else {
			toast.error('Translation failed', {
				description: error.message,
			});
		}
	}, [error]);

	useEffect(
		() => () => {
			destroy();
			stopHeartbeat();
			if (bufferingIntervalRef.current)
				clearInterval(bufferingIntervalRef.current);
		},
		[],
	);

	useEffect(() => {
		if (!isReady) return;
		const completed = localStorage.getItem('revox_player_onboarding_completed');
		if (completed) return;

		const timer = setTimeout(() => {
			startNextStep('player-onboarding');
		}, 1500);

		return () => clearTimeout(timer);
	}, [isReady, startNextStep]);

	useSeekObserver(playerRef, handleUserSeek, { isStarted });

	return (
		<div
			className={cn(
				'group relative flex aspect-video min-h-[440px] w-full gap-5 overflow-hidden rounded-2xl bg-white/5',
				isVertical ? 'mx-auto aspect-9/16 max-w-[420px]' : 'aspect-video',
			)}
			id='onboarding-player'>
			<Suspense
				fallback={
					<div className='absolute top-0 left-0 h-full w-full bg-black/70' />
				}>
				<YouTubePlayer
					ref={playerRef}
					loading='eager'
					videoId={video?.youtubeVideoId}
					iframeClassName='absolute top-0 left-0 h-full w-full'
					onReady={handleOnReady}
					onStateChange={handleStateChange}
					opts={PLAYER_OPTIONS}
				/>
			</Suspense>

			{isWaitingForChunk && (
				<div className='absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm'>
					<div className='flex flex-col items-center gap-3 text-white'>
						<Loader2 className='size-10 animate-spin' />
						<span className='font-medium text-sm'>
							Translating this part...
						</span>
						<span className='text-white/60 text-xs'>Almost ready</span>
					</div>
				</div>
			)}

			{isReady && !isStarted && (
				<>
					<div className='absolute inset-0 z-10 bg-black/80' />

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

			<VideoMeta
				language={video?.language}
				voice={video?.voiceName}
				progress={progress?.percent ?? 0}
			/>
		</div>
	);
};
