import { createGStore } from 'create-gstore';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

const ACCESS_TOKEN_KEY = 'access_token';

type TSession = {
	userId: string;
	email: string;
	exp: string;
	iat: string;
};

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

	return { session, login, logout };
});
