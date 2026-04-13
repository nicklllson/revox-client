export type TAuthState = {
	email: string | null;
	isAuthenticated: boolean;
};

export type TAuthAction =
	| { type: 'LOGIN'; payload: { email: string } }
	| { type: 'LOGOUT' }
	| { type: 'UPDATE_EMAIL'; payload: { email: string } };

export const initialState: TAuthState = {
	email: null,
	isAuthenticated: false,
};

export const authReducer = (
	state: TAuthState,
	action: TAuthAction,
): TAuthState => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, email: action.payload.email, isAuthenticated: true };
		case 'LOGOUT':
			return { ...state, email: '', isAuthenticated: false };
		case 'UPDATE_EMAIL':
			return { ...state, email: action.payload.email };
		default:
			return state;
	}
};
