/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { type RefObject, useCallback, useEffect, useRef } from 'react';

const CHUNK_DURATION = 30; // секунд, должно совпадать с TTS сервером
const SYNC_INTERVAL = 500; // мс, как часто корректируем drift
const MAX_DRIFT = 0.3; // секунд, допустимое расхождение

interface UseAudioSyncOptions {
	isPlaying: boolean;
	chunks: Map<number, ArrayBuffer>;
	youtubeTimeRef: RefObject<number>;
}

export const useAudioSync = ({
	chunks,
	isPlaying,
	youtubeTimeRef,
}: UseAudioSyncOptions) => {
	const ctxRef = useRef<AudioContext | null>(null);
	const decodedRef = useRef<Map<number, AudioBuffer>>(new Map());
	const sourceRef = useRef<AudioBufferSourceNode | null>(null);
	const currentChunkRef = useRef<number>(-1);
	const syncTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const chunkStartedAtRef = useRef<number>(0);
	const pausedAtRef = useRef<number>(0);
	const gainRef = useRef<GainNode | null>(null);

	const ensureContext = useCallback(() => {
		if (!ctxRef.current) {
			ctxRef.current = new AudioContext();
		}
		if (ctxRef.current.state === 'suspended') {
			void ctxRef.current.resume();
		}
		return ctxRef.current;
	}, []);

	useEffect(() => {
		chunks.forEach((buffer, chunkId) => {
			if (decodedRef.current.has(chunkId)) return;
			const ctx = ensureContext();

			const toArrayBuffer =
				buffer instanceof Blob
					? buffer.arrayBuffer()
					: Promise.resolve(buffer as ArrayBuffer);

			void toArrayBuffer.then(ab => {
				void ctx.decodeAudioData(ab.slice(0)).then(decoded => {
					decodedRef.current.set(chunkId, decoded);
				});
			});
		});
	}, [chunks]);

	const playChunk = useCallback((chunkId: number, offsetInChunk: number) => {
		const ctx = ensureContext();
		const decoded = decodedRef.current.get(chunkId);
		if (!decoded) return;

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

		sourceRef.current = source;
		gainRef.current = gain;
		currentChunkRef.current = chunkId;
		chunkStartedAtRef.current = ctx.currentTime;
	}, []);

	const sync = useCallback(() => {
		const ytTime = youtubeTimeRef.current;

		const targetChunk = Math.floor(ytTime / CHUNK_DURATION);
		const offsetInChunk = ytTime % CHUNK_DURATION;

		if (targetChunk !== currentChunkRef.current) {
			if (decodedRef.current.has(targetChunk)) {
				playChunk(targetChunk, offsetInChunk);
			}
			return;
		}

		const ctx = ctxRef.current;
		if (!ctx || !sourceRef.current) return;

		const chunkStartedAt = chunkStartedAtRef.current;
		const chunkOffset = currentChunkRef.current * CHUNK_DURATION;
		const audioPosition =
			ctx.currentTime - chunkStartedAt + (chunkOffset % CHUNK_DURATION);

		if (Math.abs(audioPosition - offsetInChunk) > MAX_DRIFT) {
			playChunk(targetChunk, offsetInChunk);
		}
	}, [playChunk]);

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
