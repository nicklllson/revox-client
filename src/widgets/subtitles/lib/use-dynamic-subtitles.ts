import { type RefObject, useEffect, useMemo, useRef, useState } from 'react';
import type { TSegment } from '@/entities/translation';

export const useDynamicSubtitles = (
	allSegments: TSegment[],
	playerTimeRef: RefObject<number>,
) => {
	const prevActiveIndexRef = useRef(-1);
	const activeRef = useRef<HTMLDivElement>(null);

	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			const t = playerTimeRef.current;
			setCurrentTime(prev => (prev !== t ? t : prev));
		}, 200);
		return () => clearInterval(interval);
	}, [playerTimeRef]);

	const activeIndex = useMemo(
		() =>
			allSegments.findIndex(s => currentTime >= s.start && currentTime < s.end),
		[currentTime, allSegments],
	);

	useEffect(() => {
		if (activeIndex !== -1 && activeIndex !== prevActiveIndexRef.current) {
			prevActiveIndexRef.current = activeIndex;
			activeRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	}, [activeIndex]);

	return { activeRef, currentTime, activeIndex };
};
