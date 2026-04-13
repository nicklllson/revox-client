import { ArrowLeft, CheckCircle2, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useUserPassword } from '@/entities/auth';
import { ROUTES } from '@/shared/model/routes';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

const REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ForgerPasswordForm = () => {
	const [email, setEmail] = useState<string>('');
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const { handleSendTokenToUser, isSendingTokens } = useUserPassword();

	const validateEmail = (value: string) => REGEX.test(value);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (!email.trim()) {
			setError('Please enter your email address.');
			return;
		}
		if (!validateEmail(email)) {
			setError('Please enter a valid email address.');
			return;
		}

		handleSendTokenToUser({ email }).then(() => setIsSubmitted(true));
	};

	return (
		<div className='flex items-center justify-center p-4'>
			<div className='w-full max-w-md'>
				<Card className='shadow-lg'>
					<CardHeader className=''>
						<div className='mb-1 flex items-center gap-2'>
							<Link
								to={ROUTES.PUBLIC.SIGNIN}
								className='inline-flex items-center gap-1 text-muted-foreground text-sm transition-colors hover:text-foreground'>
								<ArrowLeft className='h-4 w-4' />
								Back to login
							</Link>
						</div>
						<CardTitle className='font-bold text-2xl tracking-tight'>
							Forgot password?
						</CardTitle>
						<CardDescription className='text-muted-foreground text-sm'>
							No worries — enter your email and we'll send you reset
							instructions.
						</CardDescription>
					</CardHeader>

					<CardContent className=''>
						{isSubmitted ? (
							<div className='flex flex-col items-center gap-4 py-4 text-center'>
								<div className='rounded-full bg-green-100 p-3 dark:bg-green-900/30'>
									<CheckCircle2 className='h-8 w-8 text-green-600 dark:text-green-400' />
								</div>
								<div className='space-y-1'>
									<p className='font-semibold text-base'>Check your inbox</p>
									<p className='text-muted-foreground text-sm'>
										We've sent a password reset link to your email.
									</p>
								</div>
								<p className='text-muted-foreground text-xs'>
									Didn't receive the email? Check your spam folder or{' '}
									<button
										type='button'
										onClick={() => {
											setIsSubmitted(false);
											setEmail('');
										}}
										className='underline underline-offset-2 transition-colors hover:text-foreground'>
										try again
									</button>
									.
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='email'>Email address</Label>
									<div className='relative mb-20'>
										<Mail className='-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-4 w-4 text-muted-foreground' />
										<Input
											id='email'
											type='email'
											placeholder='you@example.com'
											value={email}
											onChange={e => {
												setEmail(e.target.value);
												if (error) setError('');
											}}
											className='pl-9'
											autoComplete='email'
											autoFocus
										/>
									</div>
								</div>

								{error && (
									<Alert variant='destructive' className='py-2'>
										<AlertDescription className='text-sm'>
											{error}
										</AlertDescription>
									</Alert>
								)}

								<Button
									type='submit'
									className='w-full'
									isLoading={isSendingTokens}>
									Submit
								</Button>
							</form>
						)}
					</CardContent>

					{!isSubmitted && (
						<CardFooter className='justify-center pt-0'>
							<p className='text-muted-foreground text-sm'>
								Remember your password?{' '}
								<a
									href='/login'
									className='font-medium text-primary underline-offset-4 hover:underline'>
									Sign in
								</a>
							</p>
						</CardFooter>
					)}
				</Card>
			</div>
		</div>
	);
};
