/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <Explicit> */
import { type RefObject, useCallback, useEffect, useRef } from 'react';

const CHUNK_DURATION = 30; // секунд, должно совпадать с TTS сервером
const SYNC_INTERVAL = 500; // мс, как часто корректируем drift
const MAX_DRIFT = 0.3; // секунд, допустимое расхождение

type UseAudioSyncOptions = {
	isPlaying: boolean;
	chunks: RefObject<Map<number, ArrayBuffer>>;
	chunkMetas: Map<number, { segments: { start: number }[] }>;
	youtubeTimeRef: RefObject<number>;
	onBuffering: () => void;
	onBuffered: () => void;
};

export const useAudioSync = ({
	chunks,
	isPlaying,
	chunkMetas,
	youtubeTimeRef,
	onBuffered,
	onBuffering,
}: UseAudioSyncOptions) => {
	const ctxRef = useRef<AudioContext | null>(null);
	const decodedRef = useRef<Map<number, AudioBuffer>>(new Map());
	const sourceRef = useRef<AudioBufferSourceNode | null>(null);
	const currentChunkRef = useRef<number>(-1);
	const syncTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const chunkStartedAtRef = useRef<number>(0);
	const pausedAtRef = useRef<number>(0);
	const gainRef = useRef<GainNode | null>(null);
	const startOffsetRef = useRef<number>(0);

	const ensureContext = useCallback(() => {
		if (!ctxRef.current) {
			ctxRef.current = new AudioContext();
		}
		if (ctxRef.current.state === 'suspended') {
			void ctxRef.current.resume();
		}
		return ctxRef.current;
	}, []);

	const playChunk = useCallback(
		(chunkId: number, offsetInChunk: number) => {
			const ctx = ensureContext();

			if (decodedRef.current.has(chunkId)) {
				const decoded = decodedRef.current.get(chunkId)!;
				_startSource(ctx, decoded, offsetInChunk, chunkId);
				return;
			}

			const buffer = chunks.current.get(chunkId);
			if (!buffer) return;

			void ctx.decodeAudioData(buffer.slice(0)).then(decoded => {
				decodedRef.current.set(chunkId, decoded);
				_startSource(ctx, decoded, offsetInChunk, chunkId);
			});
		},
		[ensureContext],
	);

	const _startSource = useCallback(
		(
			ctx: AudioContext,
			decoded: AudioBuffer,
			offsetInChunk: number,
			chunkId: number,
		) => {
			if (sourceRef.current) {
				const oldSource = sourceRef.current;
				const gainNode = gainRef.current;
				if (gainNode) {
					gainNode.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
					setTimeout(() => {
						try {
							oldSource.stop();
						} catch {}
						oldSource.disconnect();
					}, 200);
				} else {
					try {
						oldSource.stop();
					} catch {}
					oldSource.disconnect();
				}
			}

			const gain = ctx.createGain();
			gain.gain.setValueAtTime(0, ctx.currentTime);
			gain.gain.setTargetAtTime(1, ctx.currentTime, 0.05);
			gain.connect(ctx.destination);

			const source = ctx.createBufferSource();
			source.buffer = decoded;
			source.connect(gain);
			source.start(0, Math.max(0, offsetInChunk));

			startOffsetRef.current = Math.max(0, offsetInChunk);

			source.onended = () => {
				if (currentChunkRef.current === chunkId) {
					currentChunkRef.current = -1;
				}
			};

			sourceRef.current = source;
			gainRef.current = gain;
			currentChunkRef.current = chunkId;
			chunkStartedAtRef.current = ctx.currentTime;
		},
		[],
	);

	const sync = useCallback(() => {
		const ytTime = youtubeTimeRef.current;
		const targetChunk = Math.floor(ytTime / CHUNK_DURATION);

		if (targetChunk !== currentChunkRef.current) {
			const hasBuffer =
				decodedRef.current.has(targetChunk) || chunks.current.has(targetChunk);

			if (!hasBuffer) {
				onBuffering();
				return;
			}

			onBuffered();

			const meta = chunkMetas.get(targetChunk);
			const chunkStartTime =
				meta?.segments[0]?.start ?? targetChunk * CHUNK_DURATION;

			if (ytTime < chunkStartTime) return;

			const audioOffset = ytTime - chunkStartTime;
			playChunk(targetChunk, Math.max(0, audioOffset));
			return;
		}

		const ctx = ctxRef.current;
		if (!ctx || !sourceRef.current) return;

		const chunkStartedAt = chunkStartedAtRef.current;
		const audioPosition = ctx.currentTime - chunkStartedAt;
		const meta = chunkMetas.get(targetChunk);
		const chunkStartTime =
			meta?.segments[0]?.start ?? targetChunk * CHUNK_DURATION;
		const expectedAudioPosition = ytTime - chunkStartTime;

		if (Math.abs(audioPosition - expectedAudioPosition) > MAX_DRIFT) {
			playChunk(targetChunk, Math.max(0, expectedAudioPosition));
		}
	}, [playChunk, chunkMetas, onBuffering, onBuffered]);

	const handleSeek = useCallback(() => {
		sync();
	}, [sync]);

	const destroy = useCallback(() => {
		sourceRef.current?.stop();
		void ctxRef.current?.close();
		ctxRef.current = null;
		decodedRef.current.clear();
		currentChunkRef.current = -1;
	}, []);

	useEffect(() => {
		if (isPlaying) {
			const timeout = setTimeout(() => {
				sync();
				syncTimerRef.current = setInterval(sync, SYNC_INTERVAL);
			}, 300);

			return () => {
				clearTimeout(timeout);
				if (syncTimerRef.current) clearInterval(syncTimerRef.current);
			};
		}
		const ctx = ctxRef.current;
		if (ctx && chunkStartedAtRef.current > 0) {
			pausedAtRef.current = ctx.currentTime - chunkStartedAtRef.current;
		}
		sourceRef.current?.stop();
		sourceRef.current = null;
		currentChunkRef.current = -1;
		if (syncTimerRef.current) clearInterval(syncTimerRef.current);

		return () => {
			if (syncTimerRef.current) clearInterval(syncTimerRef.current);
		};
	}, [isPlaying]);

	return { handleSeek, destroy, ensureContext };
};
