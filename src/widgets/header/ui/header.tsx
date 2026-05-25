import { matchPath, useLocation } from 'react-router';
import { useSession } from '@/entities/auth';
import { TranslationModelSelect } from '@/features/select-translation-model';
import { HeaderActions } from '@/widgets/header-actions';
import { HIDDEN_PAGES } from '../model/constants';

export const Header = () => {
	const { pathname } = useLocation();
	const { session } = useSession();

	const isHidden = HIDDEN_PAGES.some(pattern => matchPath(pattern, pathname));

	if (isHidden) {
		return null;
	}

	return (
		<header className='absolute top-5 right-5 left-5 z-10 flex items-center justify-between max-2xl:top-2.5 max-2xl:right-2.5 max-2xl:left-2.5'>
			<TranslationModelSelect />
			{!session && <HeaderActions />}
		</header>
	);
};
