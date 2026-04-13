import type { LoginDto, RegisterDto } from '@/entities/auth';
import { api } from '@/shared/lib/api';

export const authApi = {
	baseKey: 'auth',

	register: (registerDto: RegisterDto) =>
		api('/auth/register', { method: 'POST', json: registerDto }),

	login: (loginDto: LoginDto) =>
		api('/auth/login', { method: 'POST', json: loginDto }),

	logout: () => api('/auth/logout', { method: 'POST' }),

	resendCode: () => api('/auth/resend-code', { method: 'POST' }),

	refresh: () => api('/auth/refresh', { method: 'POST' }),

	verifyEmail: (dto: { email: string; code: string }) =>
		api<{ email: string; code: string }, { accessToken: string }>(
			'/auth/verify-email',
			{ method: 'POST', json: dto },
		),
};
