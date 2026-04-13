import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import type { z } from 'zod';
import { useAuth, useRegister } from '@/entities/auth';
import { IconGoogle } from '@/shared/icons/google';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { registerSchema } from '../model/schemes';

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = ({
	callback,
	className,
	...props
}: React.ComponentProps<'div'> & {
	callback?: (data: RegisterFormData) => void;
}) => {
	const { handleRegister, isPending } = useRegister();
	const navigate = useNavigate();
	const { updateEmail } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		mode: 'onBlur',
		resolver: zodResolver(registerSchema),
	});

	// TODO - Add error toaster here
	const onSubmit = ({ confirmPassword, ...data }: RegisterFormData) => {
		handleRegister(data).then(() => navigate(ROUTES.PUBLIC.CONFIRM));
		updateEmail(data.email);
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className='overflow-hidden p-0'>
				<CardContent className='grid p-0 md:grid-cols-2'>
					<form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							<div className='flex flex-col items-center gap-2 text-center'>
								<h1 className='font-bold text-2xl!'>Welcome back</h1>
								<p className='text-balance! text-muted-foreground'>
									Login to your Acme Inc account
								</p>
							</div>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor='email'>Email</FieldLabel>
									<Input
										required
										id='email'
										type='email'
										disabled={isPending}
										placeholder='m@example.com'
										{...register('email')}
									/>
									{errors.email && (
										<p className='text-destructive text-sm'>
											{errors.email.message}
										</p>
									)}
								</Field>
								<Field>
									<FieldLabel htmlFor='password'>Password</FieldLabel>
									<PasswordInput
										required
										id='password'
										disabled={isPending}
										placeholder='********'
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
										Confirm Password
									</FieldLabel>
									<PasswordInput
										required
										disabled={isPending}
										id='confirmPassword'
										placeholder='********'
										{...register('confirmPassword')}
									/>
									{errors.confirmPassword && (
										<p className='text-destructive text-sm'>
											{errors.confirmPassword.message}
										</p>
									)}
								</Field>
							</FieldGroup>
							<Field>
								<Button type='submit' isLoading={isPending}>
									Signup
								</Button>
							</Field>
							<div className='mx-auto text-muted-foreground text-sm'>
								Or continue with
							</div>
							<Field className='grid grid-cols-1 gap-4'>
								<Button variant='outline' type='button'>
									<IconGoogle />
									<span className='sr-only'>Login with Google</span>
								</Button>
							</Field>
							<FieldDescription className='text-center'>
								Already have an account?{' '}
								<Link to={ROUTES.PUBLIC.SIGNIN}>Sign in</Link>
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
			<FieldDescription className='px-6 text-center'>
				By clicking continue, you agree to our{' '}
				<Link to={'#change-link'}>Terms of Service</Link> and{' '}
				<Link to={'#change-link'}>Privacy Policy</Link>.
			</FieldDescription>
		</div>
	);
};
