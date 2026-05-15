import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSession } from '@/entities/auth';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 120000,
			gcTime: 120000,
		},
	},
	queryCache: new QueryCache({
		onError: (error, _) => {
			const message =
				error instanceof Error ? error.message : 'Something went wrong';
			toast.error(message);
		},
	}),
	mutationCache: new MutationCache({
		onError: (error, _) => {
			const message =
				error instanceof Error ? error.message : 'Error in mutating';
			toast.error(message);
		},
	}),
});

const SERVER_API = import.meta.env.VITE_PUBLIC_SERVER_API;

export const api = async <ReqData, ResData>(
	route: string,
	init?: RequestInit & { json?: ReqData; params?: Record<string, unknown> },
): Promise<ResData> => {
	let serverRoute = `${SERVER_API}${route}`;

	if (init?.params) {
		const searchParams = new URLSearchParams();
		Object.entries(init.params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				searchParams.set(key, String(value));
			}
		});
		const queryString = searchParams.toString();
		if (queryString) {
			serverRoute = `${serverRoute}?${queryString}`;
		}
	}

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
			let errData: any = null;
			try {
				errData = await res.json();
			} catch {
				errData = { message: res.statusText };
			}

			const error = new Error(
				errData?.message ?? `HTTP ${res.status}`,
			) as Error & {
				response: { status: number; data: any };
				status: number;
			};
			error.response = { status: res.status, data: errData };
			error.status = res.status;
			throw error;
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
