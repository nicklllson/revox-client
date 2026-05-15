import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import type { z } from 'zod';
import { useLogin, useSession } from '@/entities/auth';
import { IconGoogle } from '@/shared/icons/google';
import { cn } from '@/shared/lib/utils';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { PasswordInput } from '@/shared/ui/password-input';
import { loginSchema } from '../model/schemes';

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = ({
	className,
	...restProps
}: React.ComponentProps<'form'>) => {
	const { handleLogin, isPending } = useLogin();
	const { login } = useSession();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		mode: 'onBlur',
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormData) => {
		handleLogin(data)
			.then(res => login(res.accessToken))
			.then(() => navigate(ROUTES.PUBLIC.HOME));
	};

	return (
		<form
			className={cn('p-6 md:p-8', className)}
			onSubmit={handleSubmit(onSubmit)}
			{...restProps}>
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
							id='email'
							type='email'
							placeholder='m@example.com'
							disabled={isPending}
							{...register('email')}
						/>
						{errors.email && (
							<p className='text-destructive text-sm'>{errors.email.message}</p>
						)}
					</Field>
					<Field>
						<div className='flex items-center'>
							<FieldLabel htmlFor='password'>Password</FieldLabel>
							<Link
								to={ROUTES.PUBLIC.PASSWORD}
								className='ml-auto text-sm underline-offset-2 hover:underline'>
								Forgot your password?
							</Link>
						</div>
						<PasswordInput
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
				</FieldGroup>
				<Field>
					<Button type='submit' isLoading={isPending}>
						Login
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
					Don&apos;t have an account?{' '}
					<Link to={ROUTES.PUBLIC.SIGNUP}>Sign up</Link>
				</FieldDescription>
			</FieldGroup>
		</form>
	);
};
