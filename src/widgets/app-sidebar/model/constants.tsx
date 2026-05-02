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
			<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
				<Plus size={16} />
			</div>
		),
	},
	{
		label: 'Favorites',
		href: ROUTES.PRIVATE.FAVORITES,
		icon: (
			<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-primary-foreground'>
				<Star className='text-white' size={20} />
			</div>
		),
	},
	{
		label: 'Playlists',
		href: ROUTES.PRIVATE.PLAYLISTS,
		icon: (
			<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-primary-foreground'>
				<ListVideo className='text-white' size={20} />
			</div>
		),
	},
] satisfies TMenuItem[];
