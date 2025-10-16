import 'react-router-dom';

export const ROUTES = {
	PUBLIC: {
		LOGIN: 'login',
		SIGNIN: 'register',
		PASSWORD: 'password',
		CONFIRM: 'email-confirm',
		PASSCODE: 'passcode',
	},
	PRIVATE: {
		HOME: '',
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
