import { Logo } from '@/shared/ui/logo';
import { HeaderActions } from '@/widgets/header-actions';

export const Header = () => {
	return (
		<header className='fixed top-5 right-5 left-5'>
			<div className='flex items-center justify-between'>
				<Logo />
				<HeaderActions />
			</div>
		</header>
	);
};
