import { useLocation } from 'react-router';
import { Logo } from '@/shared/ui/logo';
import { HeaderActions } from '@/widgets/header-actions';
import { HIDDEN_PAGES } from '../model/constants';

export const Header = () => {
	const { pathname } = useLocation();

	if (HIDDEN_PAGES.includes(pathname)) {
		return null;
	}

	return (
		<header className='absolute top-5 right-5 left-5 z-10'>
			<div className='flex items-center justify-between'>
				<Logo />
				<HeaderActions />
			</div>
		</header>
	);
};
