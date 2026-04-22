import { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from '@/entities/auth';
import type { TTranslationMessage } from '../models/types';

interface Options {
	videoId: string;
	youtubeUrl: string;
	targetLang: string;
	enabled: boolean;
}

const WS_API_URL = import.meta.env.VITE_PUBLIC_SERVER_WS;
const CHUNK_DURATION = 30; // должно совпадать с сервером
const PREFETCH_AHEAD = 3; // сколько чанков запрашивать вперёд

export const useTranslationWs = ({
	videoId,
	youtubeUrl,
	targetLang,
	enabled,
}: Options) => {
	const wsRef = useRef<WebSocket | null>(null);
	const pendingMetaRef = useRef<Extract<
		TTranslationMessage,
		{ type: 'chunk_meta' }
	> | null>(null);
	const metadataRef = useRef<Extract<
		TTranslationMessage,
		{ type: 'metadata' }
	> | null>(null);

	// Чанки которые уже запрошены на генерацию — не запрашиваем повторно
	const requestedChunksRef = useRef<Set<number>>(new Set());

	const [progress, setProgress] = useState<Extract<
		TTranslationMessage,
		{ type: 'progress' }
	> | null>(null);
	const [metadata, setMetadata] = useState<Extract<
		TTranslationMessage,
		{ type: 'metadata' }
	> | null>(null);
	const [chunks, setChunks] = useState<Map<number, ArrayBuffer>>(new Map());
	const [chunkMetas, setChunkMetas] = useState<
		Map<number, Extract<TTranslationMessage, { type: 'chunk_meta' }>>
	>(new Map());
	const [error, setError] = useState<string | null>(null);

	const { token } = useSession();

	// Запросить конкретный чанк если ещё не запрашивали
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

	// Заполнить буфер от текущего чанка вперёд
	const fillBuffer = useCallback(
		(currentChunkId: number) => {
			for (let i = 0; i <= PREFETCH_AHEAD; i++) {
				requestChunk(currentChunkId + i);
			}
		},
		[requestChunk],
	);

	useEffect(() => {
		if (!enabled || !youtubeUrl) return;
		requestedChunksRef.current = new Set();
		const ws = new WebSocket(`${WS_API_URL}/translations?token=${token}`);
		ws.binaryType = 'arraybuffer';

		wsRef.current = ws;

		ws.onopen = () => {
			ws.send(
				JSON.stringify({
					event: 'start',
					data: { videoId, youtube_url: youtubeUrl, target_lang: targetLang },
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
					pendingMetaRef.current = msg;
					setChunkMetas(prev => new Map(prev).set(msg.chunk_id, msg));
				}

				if (msg.type === 'error') setError(msg.message);
			} else {
				const meta = pendingMetaRef.current;
				if (meta) {
					setChunks(prev =>
						new Map(prev).set(meta.chunk_id, e.data as ArrayBuffer),
					);
					pendingMetaRef.current = null;
				}
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
	}, [enabled, youtubeUrl, token, targetLang, videoId]);

	// Вызывается из плеера при timeupdate
	const sendHeartbeat = useCallback(
		(chunkId: number, currentTime: number) => {
			const ws = wsRef.current;
			if (!ws || ws.readyState !== WebSocket.OPEN) return;

			// Заполняем буфер вперёд от текущей позиции
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

	// Вызывается при seek
	const sendSeek = useCallback(
		(time: number) => {
			const ws = wsRef.current;
			if (!ws || ws.readyState !== WebSocket.OPEN) return;

			const chunkId = Math.floor(time / CHUNK_DURATION);

			// При seek — сбрасываем буфер вперёд и запрашиваем новую позицию
			// Не сбрасываем уже полученные чанки — они могут пригодиться
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

	// Проверка — готов ли чанк к воспроизведению
	const isChunkReady = useCallback(
		(chunkId: number) => {
			return chunks.has(chunkId) && chunkMetas.has(chunkId);
		},
		[chunks, chunkMetas],
	);

	return {
		progress,
		metadata,
		chunks,
		chunkMetas,
		error,
		sendHeartbeat,
		sendSeek,
		isChunkReady,
	};
};
