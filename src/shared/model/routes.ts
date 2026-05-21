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
		AUTH_CALLBACK: '/auth/callback',
	},
	PRIVATE: {
		VIDEO: '/videos/:videoId',
		SETTINGS: '/settings',
		META: '/meta',
		FAVORITES: '/favorites',
		PLAYLISTS: '/playlists',
		SINGLE_PLAYLIST: '/playlist/:playlistId',
		PAYMENT: '/payment/return',
	},
} as const;

export type TPathParams = {
	[ROUTES.PRIVATE.VIDEO]: {
		videoId: string;
	};
	[ROUTES.PRIVATE.SINGLE_PLAYLIST]: {
		playlistId: string;
	};
};

declare module 'react-router-dom' {
	interface Register {
		params: TPathParams;
	}
}
