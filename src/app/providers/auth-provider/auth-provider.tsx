import { createContext, type ReactNode, useReducer } from 'react';
import { authReducer, initialState, type TAuthState } from './reducer';

type AuthContextType = {
	state: TAuthState;
	login: (email: string) => void;
	logout: () => void;
	updateEmail: (email: string) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	const login = (email: string) => {
		dispatch({ type: 'LOGIN', payload: { email } });
	};

	const logout = () => {
		dispatch({ type: 'LOGOUT' });
	};

	const updateEmail = (email: string) => {
		dispatch({ type: 'UPDATE_EMAIL', payload: { email } });
	};

	return (
		<AuthContext value={{ state, login, logout, updateEmail }}>
			{children}
		</AuthContext>
	);
};
