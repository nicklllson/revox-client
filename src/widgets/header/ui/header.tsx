import { Logo } from '@/shared/ui/logo';
import { HeaderActions } from '@/widgets/header-actions';

export const Header = () => {
	return (
		<header className='relative p-2.5'>
			<div className='flex items-center justify-between'>
				<Logo />
				<HeaderActions />
			</div>
		</header>
	);
};
