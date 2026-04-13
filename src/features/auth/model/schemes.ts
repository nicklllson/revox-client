import { z } from 'zod';
import { GLOBAL_REGEX } from '@/shared/lib/regexes';

const isProd = import.meta.env.PROD;

let passwordSchema = z
	.string()
	.min(8, { message: 'Password must be longer then 8 symbols' })
	.max(20, { message: 'Password must be shorter then 20 symbols' });

if (isProd) {
	passwordSchema = passwordSchema
		.refine(password => GLOBAL_REGEX.UPPERCASE.test(password), {
			message: 'Password must contain at least one uppercase letter',
		})
		.refine(password => GLOBAL_REGEX.LOWERCASE.test(password), {
			message: 'Password must contain at least one lowercase letter',
		})
		.refine(password => GLOBAL_REGEX.NUMBERS.test(password), {
			message: 'Password must contain at least one number',
		})
		.refine(password => GLOBAL_REGEX.SYMBOLS.test(password), {
			message: 'Password must contain at least one symbol',
		});
}

export const registerSchema = z
	.object({
		email: z.email(),
		password: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "The passwords don't match",
		path: ['confirmPassword'],
	});

export const loginSchema = z.object({
	email: z.email('Please enter a valid email address'),
	password: z.string().min(1, { message: 'Password is required' }),
});

let newPasswordSchema = z
	.string()
	.min(8, { message: 'Password must be longer than 8 symbols' })
	.max(20, { message: 'Password must be shorter than 20 symbols' });

if (isProd) {
	newPasswordSchema = newPasswordSchema
		.refine(password => GLOBAL_REGEX.UPPERCASE.test(password), {
			message: 'Password must contain at least one uppercase letter',
		})
		.refine(password => GLOBAL_REGEX.LOWERCASE.test(password), {
			message: 'Password must contain at least one lowercase letter',
		})
		.refine(password => GLOBAL_REGEX.NUMBERS.test(password), {
			message: 'Password must contain at least one number',
		})
		.refine(password => GLOBAL_REGEX.SYMBOLS.test(password), {
			message: 'Password must contain at least one symbol',
		});
}

export const resetPasswordSchema = z
	.object({
		password: newPasswordSchema,
		confirmPassword: newPasswordSchema,
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "The passwords don't match",
		path: ['confirmPassword'],
	});

export const confirmCodeSchema = z.object({
	code: z.string().length(4, { message: 'Code must be 4 digits' }),
});
