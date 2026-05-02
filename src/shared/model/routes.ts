import 'react-router-dom';

export const ROUTES = {
	PUBLIC: {
		SIGNUP: '/auth/sign-up',
		SIGNIN: '/auth/sign-in',
		PASSWORD: '/auth/password',
		CONFIRM: '/auth/email-confirm',
		PASSCODE: '/auth/passcode',
		RESET_PASSWORD: '/reset-password',
		NEW_PASSWORD: '/new-password',
		HOME: '/',
		PRICING: 'pricing',
	},
	PRIVATE: {
		VIDEO: '/videos/:videoId',
		SETTINGS: '/settings',
		META: '/meta',
		FAVORITES: '/favorites',
		PLAYLISTS: '/playlists',
	},
} as const;

export type TPathParams = {
	[ROUTES.PRIVATE.VIDEO]: {
		videoId: string;
	};
};

declare module 'react-router-dom' {
	interface Register {
		params: TPathParams;
	}
}
