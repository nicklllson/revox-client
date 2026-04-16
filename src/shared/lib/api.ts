import { QueryClient } from '@tanstack/react-query';
import { useSession } from '@/entities/auth';

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
	init?: RequestInit & { json?: ReqData; params?: Record<string, unknown> },
): Promise<ResData> => {
	const serverRoute = `${SERVER_API}${route}`;

	const baseHeaders = new Headers(init?.headers as HeadersInit);

	if (init?.json) {
		baseHeaders.set('Content-Type', 'application/json');
	}

	const initParams: RequestInit = {
		credentials: 'include',
		...init,
		...(init?.json && { body: JSON.stringify(init.json) }),
		headers: baseHeaders,
	};

	try {
		const res = await fetch(serverRoute, initParams);

		if (!res.ok) {
			throw new Error(`API Error ${res.status}: ${res.statusText}`);
		}
		return (await res.json()) as ResData;
	} catch (error) {
		if (error instanceof Error) {
			console.error('[api] Caught error:', error.message);
			throw error;
		}
		throw new Error('Error in api request');
	}
};

export const publicApi = async <ReqData, ResData>(
	route: string,
	init?: RequestInit & { json?: ReqData; params?: Record<string, unknown> },
) => {
	return await api<ReqData, ResData>(route, init);
};

export const privateApi = async <ReqData, ResData>(
	route: string,
	init?: RequestInit & { json?: ReqData; params?: Record<string, unknown> },
) => {
	const token = await useSession.getState().refreshToken();

	if (!token) {
		throw new Error('401 You are not authorized');
	}

	const headers = new Headers(init?.headers);
	headers.set('Authorization', `Bearer ${token}`);

	return await api<ReqData, ResData>(route, { ...init, headers });
};
