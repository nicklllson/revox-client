/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: Explicit */

import { useCallback, useRef } from 'react';

export const useIntersect = <T extends HTMLElement>(
	onIntersect: () => void,
) => {
	const unsubscribe = useRef(() => {});

	return useCallback(
		(el: T | null) => {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						onIntersect();
					}
				});
			});

			if (el) {
				observer.observe(el);
				unsubscribe.current = () => observer.disconnect();
			} else {
				unsubscribe.current();
			}
		},
		[onIntersect],
	);
};
