import { createGStore } from 'create-gstore';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { publicApi } from '@/shared/lib/api';
import { useLogout } from './use-logout';

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

	const { handleLogout } = useLogout();

	const login = (token: string) => {
		localStorage.setItem(ACCESS_TOKEN_KEY, token);
		setToken(token);
	};

	const logout = () => {
		handleLogout().then(() => {
			localStorage.removeItem(ACCESS_TOKEN_KEY);
			setToken(null);
		});
	};

	const session = token ? jwtDecode<TSession>(token) : null;

	const refreshToken = async () => {
		if (!token) return null;

		const session = jwtDecode<TSession>(token);
		const isExpired = session.exp < Date.now() / 1000 + 30;

		if (isExpired) {
			if (!refreshTokenPromise) {
				refreshTokenPromise = publicApi<void, { accessToken: string }>(
					'/auth/refresh',
					{ method: 'POST' },
				)
					.then(res => res.accessToken ?? null)
					.then(newToken => {
						if (newToken) {
							login(newToken);
							return newToken;
						}
						logout();
						return null;
					})
					.finally(() => {
						refreshTokenPromise = null;
					});
			}

			return await refreshTokenPromise;
		}

		return token;
	};

	return { session, token, login, logout, refreshToken };
});
