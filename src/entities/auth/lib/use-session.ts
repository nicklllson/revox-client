import { createGStore } from 'create-gstore';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { api } from '@/shared/lib/api';

const ACCESS_TOKEN_KEY = 'access_token';

type TSession = {
	userId: string;
	email: string;
	exp: number;
	iat: string;
};

let refreshTokenPromise: Promise<string | null | undefined> | null = null;

export const useSession = createGStore(() => {
	const [token, setToken] = useState<string | null>(() =>
		localStorage.getItem(ACCESS_TOKEN_KEY),
	);

	const login = (token: string) => {
		localStorage.setItem(ACCESS_TOKEN_KEY, token);
		setToken(token);
	};

	const logout = () => {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		setToken(null);
	};

	const session = token ? jwtDecode<TSession>(token) : null;

	const refreshToken = async () => {
		if (!session) return null;

		if (session.exp < Date.now() / 1000) {
			if (!refreshTokenPromise) {
				refreshTokenPromise = api<void, { accessToken: string }>(
					'/auth/refresh',
					{ method: 'POST' },
				)
					.then(res => res.accessToken ?? null)
					.then(token => {
						if (token) {
							login(token);
							setToken(token);
						} else {
							logout();
							return null;
						}
					})
					.finally(() => {
						refreshTokenPromise = null;
					});
			}

			const newToken = await refreshTokenPromise;
			if (!newToken) return null;
			return newToken;
		}
	};

	return { session, token, login, logout, refreshToken };
});
