import { Outlet } from 'react-router';
import { Logo } from '@/shared/ui/logo';

export const AuthLayout = () => {
	return (
		<div className='flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10'>
			<Logo className='absolute top-5 left-5' />
			<div className='w-full max-w-sm md:max-w-4xl'>
				<Outlet />
			</div>
		</div>
	);
};
