import 'react-router-dom';

export const ROUTES = {
	PUBLIC: {
		SIGNUP: '/auth/sign-up',
		SIGNIN: '/auth/sign-in',
		PASSWORD: 'password',
		CONFIRM: 'email-confirm',
		PASSCODE: 'passcode',
		HOME: '/',
		PRICING: 'pricing',
	},
	PRIVATE: {
		VIDEO: 'videos/:videoId',
		META: {
			PURPOSE: 'meta/purpose',
			INFO: 'meta/info',
			ONBOARDING: 'onboarding',
		},
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
