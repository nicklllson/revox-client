import { lazy } from 'react';
import { ThemeToggle } from '@/features/toggle-theme';
import { ProfileMenu } from '@/widgets/profile-menu';

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
			<ProfileMenu />
		</div>
	);
};
