import { type RefObject, useEffect } from 'react';
import type YouTube from 'react-youtube';

const TIMER_THRESHOLD = 500;

export const useGetPlayerTime = (
	playerRef: RefObject<YouTube | null>,
	timeRef: RefObject<number>,
	options?: { isEnabled: boolean },
) => {
	const { isEnabled = false } = options ?? {};

	return useEffect(() => {
		if (!isEnabled) return;

		const player = playerRef.current?.getInternalPlayer();

		const interval = setInterval(() => {
			player.getCurrentTime().then((res: number) => {
				timeRef.current = res;
			});
		}, TIMER_THRESHOLD);

		return () => {
			clearInterval(interval);
		};
	}, [isEnabled]);
};
