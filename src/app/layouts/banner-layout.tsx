import { Outlet, useLocation } from 'react-router';
import { Button } from '@/shared/ui/button';

const BANNER_CONTENT = [
	{
		href: '/favorites',
		title: 'Favorites videos',
		description: 'Here you can find your favorite translated videos',
		actions: null,
	},
	{
		href: '/playlists',
		title: 'Playlists',
		description: 'Here you can find your playlists for translated videos',
		actions: (
			<Button variant='secondary' accent='secondary'>
				See all playlists
			</Button>
		),
	},
];

export const BannerLayout = () => {
	const { pathname } = useLocation();
	const content = BANNER_CONTENT.find(item => item.href === pathname);

	return (
		<div>
			<div className='relative m-5 flex aspect-3.5/1 flex-col items-center justify-center rounded-3xl bg-muted'>
				<h1 className='mb-1'>{content?.title}</h1>
				<p className='mb-6'>{content?.description}</p>
				{content?.actions}
			</div>
			<Outlet />
		</div>
	);
};
