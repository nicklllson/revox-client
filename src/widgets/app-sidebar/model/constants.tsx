import { ListVideo, Plus, Star } from 'lucide-react';
import { ROUTES } from '@/shared/model/routes';

type TMenuItem = {
	label: string;
	href: string;
	icon: React.ReactNode;
};

export const MENU_ITEMS = [
	{
		label: 'Translate video',
		href: ROUTES.PUBLIC.HOME,
		icon: (
			<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground max-2xl:size-5 max-2xl:rounded-sm'>
				<Plus className='size-4 max-2xl:size-3' />
			</div>
		),
	},
	{
		label: 'Favorites',
		href: ROUTES.PRIVATE.FAVORITES,
		icon: (
			<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-primary-foreground max-2xl:size-5 max-2xl:rounded-sm'>
				<Star className='size-5 text-black max-2xl:size-3 dark:text-white' />
			</div>
		),
	},
	{
		label: 'Playlists',
		href: ROUTES.PRIVATE.PLAYLISTS,
		icon: (
			<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-primary-foreground max-2xl:size-5 max-2xl:rounded-sm'>
				<ListVideo className='size-5 text-black max-2xl:size-3 dark:text-white' />
			</div>
		),
	},
] satisfies TMenuItem[];
