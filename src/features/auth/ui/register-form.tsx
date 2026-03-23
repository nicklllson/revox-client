import { Link } from 'react-router';
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

export const RegisterForm = ({
	className,
	...props
}: React.ComponentProps<'div'>) => {
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card className='overflow-hidden p-0'>
				<CardContent className='grid p-0 md:grid-cols-2'>
					<form className='p-6 md:p-8'>
						<FieldGroup>
							<div className='flex flex-col items-center gap-2 text-center'>
								<h1 className='font-bold text-2xl!'>Welcome back</h1>
								<p className='text-balance! text-muted-foreground'>
									Login to your Acme Inc account
								</p>
							</div>
							<Field>
								<FieldLabel htmlFor='email'>Email</FieldLabel>
								<Input
									required
									id='email'
									type='email'
									placeholder='m@example.com'
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor='password'>Password</FieldLabel>
								<Input
									required
									id='password'
									type='password'
									placeholder='********'
								/>
							</Field>
							<Field>
								<Button type='submit'>Signup</Button>
							</Field>
							<div className='mx-auto text-muted-foreground text-sm'>
								Or continue with
							</div>
							<Field className='grid grid-cols-1 gap-4'>
								<Button variant='outline' type='button'>
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
										<path
											d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
											fill='currentColor'
										/>
									</svg>
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
