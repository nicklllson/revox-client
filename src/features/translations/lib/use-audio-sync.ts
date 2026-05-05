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
	chunkMetas: Map<number, ChunkMeta>;
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
	const finishedChunksRef = useRef<Set<number>>(new Set());
	const syncTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const chunkStartedAtRef = useRef<number>(0);
	const startOffsetRef = useRef<number>(0);
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

	const findChunkAt = useCallback(
		(time: number): number | null => {
			let lastBefore: number | null = null;
			for (const [chunkId, meta] of chunkMetas.entries()) {
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
		},
		[chunkMetas],
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

			const safeOffset = Math.max(
				0,
				Math.min(offsetInChunk, decoded.duration - 0.05),
			);

			const gain = ctx.createGain();
			gain.gain.setValueAtTime(0, ctx.currentTime);
			gain.gain.setTargetAtTime(1, ctx.currentTime, 0.05);
			gain.connect(ctx.destination);

			const source = ctx.createBufferSource();
			source.buffer = decoded;
			source.connect(gain);
			source.start(0, safeOffset);

			source.onended = () => {
				if (currentChunkRef.current === chunkId) {
					finishedChunksRef.current.add(chunkId);
				}
			};

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
		const ytTime = youtubeTimeRef.current;
		const targetChunk = findChunkAt(ytTime);

		if (targetChunk === null) {
			onBuffering();
			return;
		}

		const meta = chunkMetas.get(targetChunk);
		if (!meta || meta.segments.length === 0) {
			onBuffering();
			return;
		}

		const chunkStartTime = meta.segments[0].start;

		// === случай 1: текущий чанк = тот что играет ===
		if (targetChunk === currentChunkRef.current) {
			if (finishedChunksRef.current.has(targetChunk)) {
				return;
			}

			const ctx = ctxRef.current;
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
	}, [findChunkAt, chunkMetas, playChunk, onBuffering, onBuffered]);

	const handleSeek = useCallback(() => {
		finishedChunksRef.current.clear();
		sync();
	}, [sync]);

	const destroy = useCallback(() => {
		try {
			sourceRef.current?.stop();
		} catch {}
		void ctxRef.current?.close();
		ctxRef.current = null;
		decodedRef.current.clear();
		finishedChunksRef.current.clear();
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

		try {
			sourceRef.current?.stop();
		} catch {}
		sourceRef.current = null;
		currentChunkRef.current = -1;
		if (syncTimerRef.current) clearInterval(syncTimerRef.current);

		return () => {
			if (syncTimerRef.current) clearInterval(syncTimerRef.current);
		};
	}, [isPlaying]);

	return { handleSeek, destroy, ensureContext };
};
