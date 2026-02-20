import { Diamond, Globe, LogOut, Settings } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

export const ProfileMenu = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>NS</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-50' align='start'>
				<DropdownMenuGroup>
					<DropdownMenuItem>
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
