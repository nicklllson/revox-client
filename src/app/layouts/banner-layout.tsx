import { Outlet, useLocation } from 'react-router';

type TBannerContentItem = {
	href: string;
	title: string;
	description: string;
	actions: React.ReactNode | null;
};

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
		actions: null,
	},
	{
		href: '/subscription',
		title: 'Subscription',
		description:
			'Here you can find your subscription limits or subscription data for translated videos',
		actions: null,
	},
] satisfies TBannerContentItem[];

export const BannerLayout = () => {
	const { pathname } = useLocation();
	const content = BANNER_CONTENT.find(item => item.href === pathname);

	return (
		<div className='relative z-10'>
			<div className='relative m-5 flex aspect-4.5/1 flex-col items-center justify-center rounded-3xl bg-muted/20 max-2xl:aspect-6/1 max-2xl:rounded-xl'>
				<h1 className='mb-1 max-2xl:text-4xl!'>{content?.title}</h1>
				<p className='mb-6'>{content?.description}</p>
				{content?.actions}
			</div>
			<div className='px-5'>
				<Outlet />
			</div>
		</div>
	);
};
