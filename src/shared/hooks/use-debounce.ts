import { useEffect, useState } from 'react';

export const useDebounce = (value: string, time = 300) => {
	const [debouncedValue, setDebouncedValue] = useState<string>('');

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, time);

		return () => clearTimeout(timer);
	}, [time, value]);

	return debouncedValue;
};
