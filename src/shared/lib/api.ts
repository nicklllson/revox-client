import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 120000,
			gcTime: 120000,
		},
	},
});

const SERVER_API = import.meta.env.VITE_PUBLIC_SERVER_API;

export const api = async <ReqData, ResData>(
	route: string,
	init?: RequestInit & { json?: ReqData },
): Promise<ResData> => {
	const serverRoute = `${SERVER_API}${route}`;

	const initParams: RequestInit = {
		credentials: 'include',
		...init,
		...(init?.json && {
			body: JSON.stringify(init.json),
			headers: {
				...init?.headers,
				'Content-type': 'application/json',
			},
		}),
	};

	try {
		const res = await fetch(serverRoute, initParams);
		if (!res.ok) {
			throw new Error('Error in api request');
		}
		return (await res.json()) as ResData;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
		throw new Error('Error in api request');
	}
};
