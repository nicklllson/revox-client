import { Outlet } from 'react-router';
import { Header } from '@/widgets/header';

export const MainLayout = () => {
	return (
		<div className='container'>
			<Header />
			<Outlet />
		</div>
	);
};
