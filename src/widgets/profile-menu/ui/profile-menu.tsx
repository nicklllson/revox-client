import { ChevronsUpDown, Diamond, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useSession } from '@/entities/auth';
import { useUser } from '@/entities/user';
import { ROUTES } from '@/shared/model/routes';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/shared/ui/sidebar';
import { Skeleton } from '@/shared/ui/skeleton';

export const ProfileMenu = () => {
	const { isMobile } = useSidebar();
	const navigation = useNavigate();
	const { logout } = useSession();
	const { user, isFetching } = useUser();

	if (isFetching) {
		return <Skeleton className='h-12 w-full' />;
	}

	const initials = user?.nickname?.slice(0, 2).toUpperCase() ?? '??';

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
							<Avatar className='h-8 w-8 rounded-lg'>
								<AvatarFallback className='rounded-lg'>
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-medium'>{user?.nickname}</span>
								<span className='truncate text-muted-foreground text-xs'>
									{user?.email}
								</span>
							</div>
							<ChevronsUpDown className='ml-auto size-4' />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
						side={isMobile ? 'bottom' : 'right'}
						align='end'
						sideOffset={4}>
						<DropdownMenuLabel className='p-0 font-normal'>
							<div className='flex items-center gap-2 px-1 py-1.5 text-sm'>
								<Avatar className='h-8 w-8 rounded-lg'>
									<AvatarFallback className='rounded-lg'>
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-medium'>{user?.nickname}</span>
									<span className='truncate text-muted-foreground text-xs'>
										{user?.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem
								onClick={() => navigation(ROUTES.PUBLIC.PRICING)}>
								<Diamond />
								Pricing
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => navigation(ROUTES.PRIVATE.SETTINGS)}>
								<Settings />
								Settings
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem variant='destructive' onClick={logout}>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
