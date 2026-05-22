import { useCallback, useEffect, useRef, useState } from 'react';
import { useModel } from '@/app/providers/model-provider';
import { useSession } from '@/entities/auth';
import type { TCreateVideoVoice } from '@/entities/video';
import type { TTranslationMessage } from '../models/types';

type Options = {
	videoId: string;
	youtubeUrl: string;
	targetLang: string;
	enabled: boolean;
	voice?: TCreateVideoVoice;
};

const WS_API_URL = import.meta.env.VITE_PUBLIC_SERVER_WS;
const CHUNK_DURATION = 30;
const PREFETCH_AHEAD = 3;

export const useTranslationWs = ({
	videoId,
	youtubeUrl,
	targetLang,
	enabled,
	voice,
}: Options) => {
	const { activeModel } = useModel();
	const wsRef = useRef<WebSocket | null>(null);

	const pendingMetaQueueRef = useRef<
		Map<number, Extract<TTranslationMessage, { type: 'chunk_meta' }>>
	>(new Map());

	const metadataRef = useRef<Extract<
		TTranslationMessage,
		{ type: 'metadata' }
	> | null>(null);

	const requestedChunksRef = useRef<Set<number>>(new Set());

	const [progress, setProgress] = useState<Extract<
		TTranslationMessage,
		{ type: 'progress' }
	> | null>(null);
	const [metadata, setMetadata] = useState<Extract<
		TTranslationMessage,
		{ type: 'metadata' }
	> | null>(null);

	const chunksRef = useRef<Map<number, ArrayBuffer>>(new Map());
	const [chunks, setChunks] = useState<Map<number, ArrayBuffer>>(new Map());

	const chunkMetasRef = useRef<
		Map<number, Extract<TTranslationMessage, { type: 'chunk_meta' }>>
	>(new Map());
	const [chunkMetas, setChunkMetas] = useState<
		Map<number, Extract<TTranslationMessage, { type: 'chunk_meta' }>>
	>(new Map());

	const [error, setError] = useState<string | null>(null);

	const { token } = useSession();

	const requestChunk = useCallback((chunkId: number) => {
		const ws = wsRef.current;
		const meta = metadataRef.current;

		if (!ws || ws.readyState !== WebSocket.OPEN || !meta) return;
		if (chunkId < 0 || chunkId >= meta.total_chunks) return;
		if (requestedChunksRef.current.has(chunkId)) return;

		requestedChunksRef.current.add(chunkId);
		ws.send(
			JSON.stringify({
				event: 'playing_chunk',
				data: { chunk_id: chunkId, current_time: chunkId * CHUNK_DURATION },
			}),
		);
	}, []);

	const fillBuffer = useCallback(
		(currentChunkId: number) => {
			for (let i = 0; i <= PREFETCH_AHEAD; i++) {
				requestChunk(currentChunkId + i);
			}
		},
		[requestChunk],
	);

	useEffect(() => {
		if (!enabled || !youtubeUrl || !voice) return;
		requestedChunksRef.current = new Set();
		const ws = new WebSocket(`${WS_API_URL}/translations?token=${token}`);
		ws.binaryType = 'arraybuffer';

		wsRef.current = ws;

		ws.onopen = () => {
			ws.send(
				JSON.stringify({
					event: 'start',
					data: {
						voice,
						videoId,
						youtube_url: youtubeUrl,
						target_lang: targetLang,
						providers: activeModel.providers,
						pipelineFeatures: activeModel.pipelineFeatures,
					},
				}),
			);
		};

		ws.onmessage = e => {
			if (typeof e.data === 'string') {
				const msg = JSON.parse(e.data) as TTranslationMessage;

				if (msg.type === 'progress') setProgress(msg);

				if (msg.type === 'metadata') {
					metadataRef.current = msg;
					setMetadata(msg);

					for (let i = 0; i < 2; i++) {
						requestedChunksRef.current.add(i);
					}
				}

				if (msg.type === 'chunk_meta') {
					pendingMetaQueueRef.current.set(msg.chunk_id, msg);
					chunkMetasRef.current.set(msg.chunk_id, msg);
					setChunkMetas(prev => {
						const next = new Map(prev).set(msg.chunk_id, msg);
						return next;
					});
				}

				if (msg.type === 'error') setError(msg.message);
			} else {
				const buffer = e.data as ArrayBuffer;
				if (buffer.byteLength < 4) {
					console.warn('Binary frame too small to contain chunk_id header');
					return;
				}

				const view = new DataView(buffer);
				const chunkId = view.getUint32(0, false);
				const audioBuffer = buffer.slice(4);

				pendingMetaQueueRef.current.delete(chunkId);
				chunksRef.current.set(chunkId, audioBuffer);
				setChunks(new Map(chunksRef.current));
			}
		};

		ws.onerror = () => setError('WebSocket connection failed');

		return () => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify({ event: 'stop', data: {} }));
			}
			ws.close();
			metadataRef.current = null;
		};
	}, [enabled, youtubeUrl, token, targetLang, videoId, voice]);

	const sendHeartbeat = useCallback(
		(chunkId: number, currentTime: number) => {
			const ws = wsRef.current;
			if (!ws || ws.readyState !== WebSocket.OPEN) return;

			fillBuffer(chunkId);

			ws.send(
				JSON.stringify({
					event: 'playing_chunk',
					data: { chunk_id: chunkId, current_time: currentTime },
				}),
			);
		},
		[fillBuffer],
	);

	const sendSeek = useCallback(
		(time: number) => {
			const ws = wsRef.current;
			if (!ws || ws.readyState !== WebSocket.OPEN) return;

			const chunkId = Math.floor(time / CHUNK_DURATION);

			fillBuffer(chunkId);

			ws.send(
				JSON.stringify({
					event: 'seek',
					data: { time },
				}),
			);
		},
		[fillBuffer],
	);

	const isChunkReady = useCallback(
		(chunkId: number) => {
			return chunks.has(chunkId) && chunkMetas.has(chunkId);
		},
		[chunks, chunkMetas],
	);

	useEffect(() => {
		return () => {
			wsRef.current?.close();
		};
	}, []);

	return {
		progress,
		metadata,
		chunks,
		chunkMetas,
		chunkMetasRef,
		error,
		sendHeartbeat,
		sendSeek,
		isChunkReady,
		chunksRef,
		requestedChunksRef,
	};
};
