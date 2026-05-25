import { X } from 'lucide-react';
import { Link, Outlet } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { Aurora } from '@/shared/ui/aurora';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { FieldDescription } from '@/shared/ui/field';

export const AuthLayout = () => {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center bg-background p-6 max-md:p-10 max-2xl:p-3'>
			<Button asChild size='icon' className='absolute top-5 right-5 z-10'>
				<Link to={ROUTES.PUBLIC.HOME}>
					<X />
				</Link>
			</Button>
			<div className='relative z-10 w-full max-w-sm md:max-w-4xl'>
				<div className='flex flex-col gap-6 max-2xl:gap-4'>
					<Card className='overflow-hidden p-0'>
						<CardContent className='grid p-0 md:grid-cols-2'>
							<Outlet />
							<div className='relative hidden bg-muted md:block'>
								<video
									loop
									playsInline
									muted
									autoPlay
									className='absolute inset-0 h-full w-full object-cover'
									src='/videos/preview.mp4'
								/>
							</div>
						</CardContent>
					</Card>
					<FieldDescription className='px-6 text-center max-2xl:text-xs'>
						By clicking continue, you agree to our{' '}
						<Link to={'#change-link'}>Terms of Service</Link> and{' '}
						<Link to={'#change-link'}>Privacy Policy</Link>.
					</FieldDescription>
				</div>
			</div>
			<Aurora speed={1} amplitude={1.0} />
		</div>
	);
};
