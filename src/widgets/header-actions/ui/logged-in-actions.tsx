import { lazy } from 'react';
import { ThemeToggle } from '@/features/toggle-theme';

const SearchMenu = lazy(() =>
	import('@/widgets/search-menu').then(res => {
		return { default: res.SearchMenu };
	}),
);

export const LoggedInActions = () => {
	return (
		<div className='flex items-center gap-1'>
			<SearchMenu />
			<ThemeToggle />
		</div>
	);
};
