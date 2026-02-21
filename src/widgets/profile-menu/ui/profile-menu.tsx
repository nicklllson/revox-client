import { Diamond, Globe, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

export const ProfileMenu = () => {
	const navigation = useNavigate();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>NS</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-50' align='end'>
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => navigation(ROUTES.PUBLIC.PRICING)}>
						<Diamond />
						Pricing
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings />
						Settings
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Globe />
						Join Community
					</DropdownMenuItem>
					<DropdownMenuItem variant='destructive'>
						<LogOut />
						Log out
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
