import { Outlet } from 'react-router';
import { useLocaleSync } from '@/shared/i18next/use-locale-sync';

export const App = () => {
	useLocaleSync();

	return (
		<div>
			<Outlet />
		</div>
	);
};
