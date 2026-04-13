import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import type { z } from 'zod';
import { useAuth, useSession, useVerifyEmail } from '@/entities/auth';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Field, FieldDescription, FieldGroup } from '@/shared/ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp';
import { useResendCode } from '../lib/use-resend-code';
import { confirmCodeSchema } from '../model/schemes';

type ConfirmCodeFormData = z.infer<typeof confirmCodeSchema>;

export const ConfirmCodeForm = ({
	className,
	...props
}: React.ComponentProps<'div'>) => {
	const { canResend, seconds, handleResend } = useResendCode();
	const { handleVerifyEmail, isVerifying } = useVerifyEmail();

	const { state } = useAuth();
	const { login } = useSession();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<ConfirmCodeFormData>({
		mode: 'onBlur',
		resolver: zodResolver(confirmCodeSchema),
	});

	// TODO - add error toaster here
	const onSubmit = (formData: ConfirmCodeFormData) => {
		if (!state.email) return;

		const payload = {
			email: state.email,
			code: formData.code,
		};

		handleVerifyEmail(payload).then(res => {
			login(res.accessToken);
			navigate(ROUTES.PRIVATE.META);
		});
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className='overflow-hidden p-0'>
				<CardContent className='grid p-0 md:grid-cols-2'>
					<form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<div className='flex flex-col items-center gap-2 text-center'>
								<h1 className='font-bold text-2xl!'>Confirm your code</h1>
								<p className='text-balance! text-muted-foreground'>
									Enter the 4-digit code we sent to your email
								</p>
							</div>
							<FieldGroup>
								<Field>
									<div className='flex justify-center'>
										<InputOTP
											maxLength={4}
											containerClassName='justify-center'
											{...register('code')}
											onChange={value => setValue('code', value)}>
											<InputOTPGroup className='gap-1'>
												{[...Array(4)].map((_, index) => (
													<InputOTPSlot index={index} key={index} />
												))}
											</InputOTPGroup>
										</InputOTP>
									</div>
									{errors.code && (
										<p className='text-destructive text-sm'>
											{errors.code.message}
										</p>
									)}
								</Field>
							</FieldGroup>
							<Field>
								<Button type='submit' disabled={isVerifying}>
									Verify
								</Button>
							</Field>
							<FieldDescription className='text-center'>
								Didn't receive a code?{' '}
								{canResend ? (
									<button
										type='button'
										className='text-primary underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
										onClick={handleResend}>
										Request a new one
									</button>
								) : (
									<span className='text-muted-foreground'>
										Resend in {seconds}s
									</span>
								)}
							</FieldDescription>
						</FieldGroup>
					</form>
					<div className='relative hidden bg-muted md:block'>
						<img
							src='/placeholder.svg'
							alt='Image'
							className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
