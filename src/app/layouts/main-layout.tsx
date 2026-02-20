import { Outlet } from 'react-router';
import { Header } from '@/widgets/header';

export const MainLayout = () => {
	return (
		<>
			<Header />
			<main className='mt-18 px-5'>
				<Outlet />
			</main>
		</>
	);
};
