import { type RefObject, useEffect, useRef } from 'react';

const SEEK_DELTA_THRESHOLD = 1.5;

export const useSeekObserver = (
	playerTimeRef: RefObject<number>,
	onSeek: (time: number) => void,
	opt?: { isStarted: boolean },
) => {
	const { isStarted } = opt || {};
	const lastTimeRef = useRef(0);

	return useEffect(() => {
		if (!isStarted) return;

		const interval = setInterval(() => {
			const currentTime = playerTimeRef.current;
			const delta = currentTime - lastTimeRef.current;
			lastTimeRef.current = currentTime;

			// нормальное проигрывание: delta ~ 0.5 если интервал 500ms
			// перемотка: delta сильно больше или отрицательная
			if (Math.abs(delta) > SEEK_DELTA_THRESHOLD) {
				onSeek(currentTime);
			}
		}, 500);

		return () => clearInterval(interval);
	}, [isStarted, onSeek]);
};
