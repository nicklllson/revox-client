import { type RefObject, useEffect, useRef } from 'react';
import type YouTube from 'react-youtube';

const SEEK_DELTA_THRESHOLD = 1.5;
const POLL_INTERVAL = 250;

export const useSeekObserver = (
	playerRef: RefObject<YouTube | null>,
	onSeek: (time: number) => void,
	opt?: { isStarted: boolean },
) => {
	const { isStarted } = opt || {};
	const lastTimeRef = useRef<number | null>(null);
	const onSeekRef = useRef(onSeek);
	onSeekRef.current = onSeek;

	useEffect(() => {
		if (!isStarted) return;
		lastTimeRef.current = null;

		const interval = setInterval(async () => {
			const player = playerRef.current?.getInternalPlayer();
			if (!player) return;

			let currentTime: number;
			try {
				currentTime = await player.getCurrentTime();
			} catch {
				return;
			}
			if (typeof currentTime !== 'number') return;

			if (lastTimeRef.current === null) {
				lastTimeRef.current = currentTime;
				return;
			}

			const delta = currentTime - lastTimeRef.current;
			lastTimeRef.current = currentTime;

			if (Math.abs(delta) > SEEK_DELTA_THRESHOLD) {
				onSeekRef.current(currentTime);
			}
		}, POLL_INTERVAL);

		return () => clearInterval(interval);
	}, [isStarted, playerRef]);
};
