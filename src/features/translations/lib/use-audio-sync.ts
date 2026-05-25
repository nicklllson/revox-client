/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Explicit */
/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: Explicit */

import { type RefObject, useCallback, useEffect, useRef } from 'react';

const SYNC_INTERVAL = 500;
const MAX_DRIFT = 0.5;

type ChunkMeta = {
	chunk_id: number;
	segments: { start: number; end: number }[];
};

type UseAudioSyncOptions = {
	isPlaying: boolean;
	chunks: RefObject<Map<number, ArrayBuffer>>;
	chunkMetasRef: RefObject<Map<number, ChunkMeta>>;
	youtubeTimeRef: RefObject<number>;
	onBuffering: () => void;
	onBuffered: () => void;
	volumeRef: RefObject<number>;
};

export const useAudioSync = ({
	chunks,
	isPlaying,
	volumeRef,
	chunkMetasRef,
	youtubeTimeRef,
	onBuffered,
	onBuffering,
}: UseAudioSyncOptions) => {
	const ctxRef = useRef<AudioContext | null>(null);
	const decodedRef = useRef<Map<number, AudioBuffer>>(new Map());
	const sourceRef = useRef<AudioBufferSourceNode | null>(null);
	const currentChunkRef = useRef<number>(-1);
	const finishedChunksRef = useRef<Set<number>>(new Set());
	const syncTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const chunkStartedAtRef = useRef<number>(0);
	const startOffsetRef = useRef<number>(0);
	const isLockedRef = useRef<boolean>(false);
	const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);

	const gainRef = useRef<GainNode | null>(null);
	const masterGainRef = useRef<GainNode | null>(null);

	const ensureContext = useCallback(() => {
		if (!ctxRef.current) {
			ctxRef.current = new AudioContext();
			const masterGain = ctxRef.current.createGain();
			masterGain.gain.value = (volumeRef.current ?? 100) / 100;
			masterGain.connect(ctxRef.current.destination);
			masterGainRef.current = masterGain;
		}
		if (ctxRef.current.state === 'suspended') {
			void ctxRef.current.resume();
		}
		return ctxRef.current;
	}, []);

	const findChunkAt = useCallback((time: number): number | null => {
		let lastBefore: number | null = null;
		for (const [chunkId, meta] of chunkMetasRef.current.entries()) {
			const segs = meta.segments;

			if (segs.length === 0) continue;

			const start = segs[0].start;
			const end = segs[segs.length - 1].end;

			if (time >= start && time < end) {
				return chunkId;
			}
			if (time >= end && (lastBefore === null || chunkId > lastBefore)) {
				lastBefore = chunkId;
			}
		}
		return lastBefore;
	}, []);

	const _startSource = useCallback(
		(
			ctx: AudioContext,
			decoded: AudioBuffer,
			offsetInChunk: number,
			chunkId: number,
		) => {
			const oldSource = sourceRef.current;
			const oldGain = gainRef.current;

			if (oldSource && oldGain) {
				oldGain.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
				setTimeout(() => {
					try {
						oldSource.stop();
					} catch {}
					oldSource.disconnect();
					activeSourcesRef.current = activeSourcesRef.current.filter(
						s => s !== oldSource,
					);
				}, 200);
			}

			const safeOffset = Math.max(
				0,
				Math.min(offsetInChunk, decoded.duration - 0.05),
			);

			const gain = ctx.createGain();
			gain.gain.setValueAtTime(0, ctx.currentTime);
			gain.gain.setTargetAtTime(1, ctx.currentTime, 0.05);
			gain.connect(masterGainRef.current!);

			const source = ctx.createBufferSource();
			source.buffer = decoded;
			source.connect(gain);
			source.start(0, safeOffset);

			source.onended = () => {
				if (currentChunkRef.current === chunkId) {
					finishedChunksRef.current.add(chunkId);
				}
				activeSourcesRef.current = activeSourcesRef.current.filter(
					s => s !== source,
				);
			};

			activeSourcesRef.current.push(source);

			finishedChunksRef.current.delete(chunkId);
			sourceRef.current = source;
			gainRef.current = gain;
			currentChunkRef.current = chunkId;
			chunkStartedAtRef.current = ctx.currentTime;
			startOffsetRef.current = safeOffset;
		},
		[],
	);

	const playChunk = useCallback(
		(chunkId: number, offsetInChunk: number) => {
			const ctx = ensureContext();

			const startWithDecoded = (decoded: AudioBuffer) => {
				if (offsetInChunk >= decoded.duration) {
					finishedChunksRef.current.add(chunkId);
					currentChunkRef.current = chunkId;
					return;
				}
				_startSource(ctx, decoded, offsetInChunk, chunkId);
			};

			if (decodedRef.current.has(chunkId)) {
				startWithDecoded(decodedRef.current.get(chunkId)!);
				return;
			}

			const buffer = chunks.current.get(chunkId);
			if (!buffer) return;

			void ctx.decodeAudioData(buffer.slice(0)).then(decoded => {
				decodedRef.current.set(chunkId, decoded);
				startWithDecoded(decoded);
			});
		},
		[ensureContext, _startSource],
	);

	const sync = useCallback(() => {
		if (isLockedRef.current) {
			console.log('[sync] LOCKED, skip');
			return;
		}

		console.log('[sync] tick, ytTime:', youtubeTimeRef.current);

		const ytTime = youtubeTimeRef.current;
		const targetChunk = findChunkAt(ytTime);
		const ctx = ctxRef.current;

		if (targetChunk === null) {
			onBuffering();
			return;
		}

		const meta = chunkMetasRef.current.get(targetChunk);
		if (!meta || meta.segments.length === 0) {
			onBuffering();
			return;
		}

		const chunkStartTime = meta.segments[0].start;

		if (targetChunk === currentChunkRef.current) {
			if (finishedChunksRef.current.has(targetChunk)) {
				const nextId = targetChunk + 1;
				const nextMeta = chunkMetasRef.current.get(nextId);
				const hasNextBuffer =
					decodedRef.current.has(nextId) || chunks.current.has(nextId);

				if (nextMeta && hasNextBuffer && nextMeta.segments.length > 0) {
					const nextStart = nextMeta.segments[0].start;
					if (ytTime >= nextStart) {
						const audioOffset = ytTime - nextStart;
						playChunk(nextId, Math.max(0, audioOffset));
					}
				}
				return;
			}

			if (!ctx || !sourceRef.current) return;

			const audioPosition =
				ctx.currentTime - chunkStartedAtRef.current + startOffsetRef.current;
			const expectedAudioPosition = ytTime - chunkStartTime;

			if (Math.abs(audioPosition - expectedAudioPosition) > MAX_DRIFT) {
				playChunk(targetChunk, Math.max(0, expectedAudioPosition));
			}
			return;
		}

		const hasBuffer =
			decodedRef.current.has(targetChunk) || chunks.current.has(targetChunk);

		if (!hasBuffer) {
			onBuffering();
			return;
		}

		onBuffered();

		if (ytTime < chunkStartTime) return;

		const audioOffset = ytTime - chunkStartTime;
		playChunk(targetChunk, Math.max(0, audioOffset));
	}, [findChunkAt, playChunk, onBuffering, onBuffered, chunks]);

	const syncToTime = useCallback(
		(ytTime: number) => {
			if (isLockedRef.current) return;

			const targetChunk = findChunkAt(ytTime);

			if (targetChunk === null) {
				onBuffering();
				return;
			}

			const meta = chunkMetasRef.current.get(targetChunk);
			if (!meta || meta.segments.length === 0) {
				onBuffering();
				return;
			}

			const chunkStartTime = meta.segments[0].start;
			const hasBuffer =
				decodedRef.current.has(targetChunk) || chunks.current.has(targetChunk);

			if (!hasBuffer) {
				onBuffering();
				return;
			}

			onBuffered();

			if (ytTime < chunkStartTime) return;

			const audioOffset = ytTime - chunkStartTime;
			console.log('[syncToTime]', {
				ytTime,
				targetChunk,
				chunkStartTime,
				audioOffset,
			});
			playChunk(targetChunk, Math.max(0, audioOffset));
		},
		[findChunkAt, playChunk, onBuffering, onBuffered, chunks],
	);

	const handleSeek = useCallback(
		(targetTime?: number) => {
			console.log(
				'[seek] handleSeek called, unlocking, targetTime:',
				targetTime,
			);
			finishedChunksRef.current.clear();
			currentChunkRef.current = -1;
			isLockedRef.current = false;

			// Если передали целевое время — используем его, иначе берём из ref
			if (targetTime !== undefined) {
				syncToTime(targetTime);
			} else {
				sync();
			}
		},
		[sync],
	);

	const destroy = useCallback(() => {
		for (const source of activeSourcesRef.current) {
			try {
				source.stop();
			} catch {}
		}
		activeSourcesRef.current = [];

		void ctxRef.current?.close();
		ctxRef.current = null;
		decodedRef.current.clear();
		finishedChunksRef.current.clear();
		currentChunkRef.current = -1;
	}, []);

	const setVolume = useCallback((value: number) => {
		if (masterGainRef.current && ctxRef.current) {
			masterGainRef.current.gain.setTargetAtTime(
				value / 100,
				ctxRef.current.currentTime,
				0.02,
			);
		}
	}, []);

	const stopPlayback = useCallback(() => {
		isLockedRef.current = true;

		console.log('[seek] stopPlayback called', {
			activeSources: activeSourcesRef.current.length,
		});

		for (const source of activeSourcesRef.current) {
			try {
				source.stop(0);
				source.disconnect();
			} catch {}
		}
		activeSourcesRef.current = [];

		sourceRef.current = null;
		gainRef.current = null;
		currentChunkRef.current = -1;
		finishedChunksRef.current.clear();

		if (syncTimerRef.current) {
			clearInterval(syncTimerRef.current);
			syncTimerRef.current = null;
		}
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

		for (const source of activeSourcesRef.current) {
			try {
				source.stop();
			} catch {}
		}
		activeSourcesRef.current = [];
		sourceRef.current = null;
		currentChunkRef.current = -1;
		if (syncTimerRef.current) clearInterval(syncTimerRef.current);

		return () => {
			if (syncTimerRef.current) clearInterval(syncTimerRef.current);
		};
	}, [isPlaying]);

	return { handleSeek, destroy, ensureContext, setVolume, stopPlayback };
};
