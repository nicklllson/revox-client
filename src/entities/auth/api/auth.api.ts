import type { LoginDto, RegisterDto } from '@/entities/auth';
import { publicApi } from '@/shared/lib/api';

export const authApi = {
	baseKey: 'auth',

	register: (registerDto: RegisterDto) =>
		publicApi('/auth/register', { method: 'POST', json: registerDto }),

	login: (loginDto: LoginDto) =>
		publicApi<LoginDto, { accessToken: string }>('/auth/login', {
			method: 'POST',
			json: loginDto,
		}),

	logout: () => publicApi('/auth/logout', { method: 'POST' }),

	resendCode: () => publicApi('/auth/resend-code', { method: 'POST' }),

	refresh: () => publicApi('/auth/refresh', { method: 'POST' }),

	verifyEmail: (dto: { email: string; code: string }) =>
		publicApi<{ email: string; code: string }, { accessToken: string }>(
			'/auth/verify-email',
			{ method: 'POST', json: dto },
		),

	forgotPassword: (dto: { email: string }) =>
		publicApi<{ email: string }, { message: string }>('/auth/forgot-password', {
			method: 'POST',
			json: dto,
		}),

	resetPassword: (dto: { token: string; password: string }) =>
		publicApi<{ token: string; password: string }, { message: string }>(
			'/auth/reset-password',
			{
				method: 'POST',
				json: dto,
			},
		),
};
