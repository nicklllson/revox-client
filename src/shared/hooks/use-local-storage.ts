import { useCallback, useState } from 'react';

type SetValue<T> = (next: T | ((prev: T) => T)) => void;

export const useLocalStorage = <T>(
	key: string,
	initialValue: T,
): [T, SetValue<T>] => {
	const [value, setValue] = useState<T>(() => {
		try {
			const stored = localStorage.getItem(key);
			return stored !== null ? (JSON.parse(stored) as T) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setStoredValue = useCallback<SetValue<T>>(
		next => {
			setValue(prev => {
				const resolved =
					typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
				try {
					localStorage.setItem(key, JSON.stringify(resolved));
				} catch {}
				return resolved;
			});
		},
		[key],
	);

	return [value, setStoredValue];
};
