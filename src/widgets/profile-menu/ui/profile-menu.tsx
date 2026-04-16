import { Diamond, Globe, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSession } from '@/entities/auth';
import { useUser } from '@/entities/user';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { Skeleton } from '@/shared/ui/skeleton';

export const ProfileMenu = () => {
	const navigation = useNavigate();
	const { logout } = useSession();
	const { user, isFetching } = useUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{isFetching ? (
					<Skeleton className='h-9 w-35' />
				) : (
					<Button variant='outline' className='max-w-[150px] overflow-hidden'>
						<span className='truncate'>{user?.nickname}</span>
					</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-50' align='end'>
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => navigation(ROUTES.PUBLIC.PRICING)}>
						<Diamond />
						Pricing
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => navigation(ROUTES.PRIVATE.SETTINGS)}>
						<Settings />
						Settings
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Globe />
						Join Community
					</DropdownMenuItem>
					<DropdownMenuItem variant='destructive' onClick={logout}>
						<LogOut />
						Log out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
