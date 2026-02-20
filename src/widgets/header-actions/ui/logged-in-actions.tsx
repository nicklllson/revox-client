import { Diamond } from 'lucide-react';
import { ThemeToggle } from '@/features/toggle-theme';
import { Button } from '@/shared/ui/button';
import { ProfileMenu } from '@/widgets/profile-menu';
import { SearchMenu } from '@/widgets/search-menu';

export const LoggedInActions = () => {
	return (
		<div className='flex items-center gap-1'>
			<SearchMenu />
			<ThemeToggle />
			<Button>
				<Diamond size={24} />
				<span>Upgrade now</span>
			</Button>
			<ProfileMenu />
		</div>
	);
};
