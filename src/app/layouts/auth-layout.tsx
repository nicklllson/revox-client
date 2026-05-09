import { Outlet } from 'react-router';
import { Aurora } from '@/shared/ui/aurora';
import { Logo } from '@/shared/ui/logo';

export const AuthLayout = () => {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10'>
			<Logo className='absolute top-5 left-5' />
			<div className='relative z-10 w-full max-w-sm md:max-w-4xl'>
				<Outlet />
			</div>
			<Aurora speed={1} amplitude={1.0} />
		</div>
	);
};
