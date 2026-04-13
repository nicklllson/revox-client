import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router';
import type { z } from 'zod';
import { useUserPassword } from '@/entities/auth';
import { ROUTES } from '@/shared/model/routes';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card';
import { PasswordInput } from '@/shared/ui/password-input';
import { Field, FieldLabel } from '@/shared/ui/field';
import { resetPasswordSchema } from '@/features/auth/model/schemes';

type NewPasswordFormData = z.infer<typeof resetPasswordSchema>;

export const NewPasswordPage = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string>('');
	const { handleResetPassword, isCreatingNewPasswords } = useUserPassword();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<NewPasswordFormData>({
		mode: 'onBlur',
		resolver: zodResolver(resetPasswordSchema),
	});

	const onSubmit = ({ confirmPassword, ...data }: NewPasswordFormData) => {
		if (!token) {
			setError('Invalid or missing reset token');
			return;
		}

		handleResetPassword({ token, password: data.password })
			.then(() => {
				setIsSubmitted(true);
			})
			.catch(() => {
				setError('Failed to reset password. Please try again.');
			});
	};

	if (!token) {
		return (
			<div className='flex items-center justify-center p-4'>
				<div className='w-full max-w-md'>
					<Card className='shadow-lg'>
						<CardHeader>
							<CardTitle className='font-bold text-2xl'>Invalid Link</CardTitle>
							<CardDescription>
								The password reset link is invalid or has expired.
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<Link to={ROUTES.PUBLIC.SIGNIN}>
								<Button variant='outline'>Back to Sign In</Button>
							</Link>
						</CardFooter>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className='flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<Card className='shadow-lg'>
					<CardHeader>
						<div className='mb-1'>
							<Link
								to={ROUTES.PUBLIC.SIGNIN}
								className='inline-flex items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground'>
								<ArrowLeft className='h-4 w-4' />
								Back to login
							</Link>
						</div>
						<CardTitle className='font-bold text-2xl tracking-tight'>
							Set New Password
						</CardTitle>
						<CardDescription>
							Create a strong password for your account
						</CardDescription>
					</CardHeader>

					<CardContent>
						{isSubmitted ? (
							<div className='flex flex-col items-center gap-4 py-4 text-center'>
								<div className='rounded-full bg-green-100 p-3 dark:bg-green-900/30'>
									<CheckCircle2 className='h-8 w-8 text-green-600 dark:text-green-400' />
								</div>
								<div className='space-y-1'>
									<p className='font-semibold text-base'>Password Updated!</p>
									<p className='text-muted-foreground text-sm'>
										Your password has been successfully updated.
									</p>
								</div>
								<Button
									onClick={() => navigate(ROUTES.PUBLIC.SIGNIN)}
									className='mt-4'>
									Sign In
								</Button>
							</div>
						) : (
							<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
								<Field>
									<FieldLabel htmlFor='password'>New Password</FieldLabel>
									<PasswordInput
										id='password'
										placeholder='********'
										disabled={isCreatingNewPasswords}
										{...register('password')}
									/>
									{errors.password && (
										<p className='text-destructive text-sm'>
											{errors.password.message}
										</p>
									)}
								</Field>

								<Field>
									<FieldLabel htmlFor='confirmPassword'>
										Confirm New Password
									</FieldLabel>
									<PasswordInput
										id='confirmPassword'
										placeholder='********'
										disabled={isCreatingNewPasswords}
										{...register('confirmPassword')}
									/>
									{errors.confirmPassword && (
										<p className='text-destructive text-sm'>
											{errors.confirmPassword.message}
										</p>
									)}
								</Field>

								{error && (
									<Alert variant='destructive'>
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								)}

								<Button
									type='submit'
									className='w-full'
									isLoading={isCreatingNewPasswords}>
									Update Password
								</Button>
							</form>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export const Component = NewPasswordPage;
