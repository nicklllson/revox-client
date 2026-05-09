import { lazy } from 'react';

const SearchMenu = lazy(() =>
	import('@/widgets/search-menu').then(res => {
		return { default: res.SearchMenu };
	}),
);

export const LoggedInActions = () => {
	return (
		<div className='flex items-center gap-1'>
			<SearchMenu />
		</div>
	);
};
