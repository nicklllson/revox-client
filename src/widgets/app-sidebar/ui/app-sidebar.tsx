import { Search } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useSession } from '@/entities/auth';
import { useIntersect } from '@/shared/hooks/use-intersect';
import { Logo } from '@/shared/ui/logo';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
} from '@/shared/ui/sidebar';
import { Skeleton } from '@/shared/ui/skeleton';
import { ProfileMenu } from '@/widgets/profile-menu';
import { SearchMenu, useSearchMenu } from '@/widgets/search-menu';
import { UsageMinutes } from '@/widgets/usage-minutes';
import { useUsersVideos } from '../lib/use-users-videos';
import { MENU_ITEMS } from '../model/constants';
import { VideosList } from './videos-list';

export const AppSidebar = () => {
	const { open: searchOpen, setOpen: setSearchOpen } = useSearchMenu();

	const { videos, isFetching, fetchNextPage, hasNextPage } = useUsersVideos();
	const { pathname } = useLocation();
	const cursorRef = useIntersect<HTMLDivElement>(fetchNextPage);
	const { session } = useSession();

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<div className='my-3.5 flex items-center justify-between group-data-[collapsible=icon]:justify-center'>
					<div className='flex items-center transition-opacity delay-150 duration-200 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:delay-0'>
						<img
							src='/images/revox-logo.webp'
							alt='Revox logo'
							className='mr-1 size-10 rounded-lg'
						/>
						<Logo />
					</div>
					<SidebarTrigger className='p-5 group-data-[collapsible=icon]:p-0' />
				</div>
				<SidebarMenu>
					{MENU_ITEMS.map(item => (
						<SidebarMenuItem key={item.label}>
							<SidebarMenuButton
								asChild
								size='lg'
								tooltip={item.label}
								isActive={pathname === item.href}
								className='data-[state=open]:bg-sidebar-accent'>
								<Link to={item.href}>
									{item.icon}
									<span className='font-medium'>{item.label}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem className='group-data-[collapsible=icon]:hidden'>
								<SidebarMenuButton
									asChild
									size='default'
									className='cursor-default select-none'>
									<div className='group/history-row'>
										<span className='flex-1 font-medium text-muted-foreground text-sm'>
											History
										</span>
										<button
											type='button'
											aria-label='Search history'
											onClick={() => setSearchOpen(true)}
											className='rounded-md p-0.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover/history-row:opacity-100'>
											<Search className='size-3.5' />
										</button>
									</div>
								</SidebarMenuButton>
							</SidebarMenuItem>

							<VideosList isFetching={isFetching} videos={videos} />

							{hasNextPage && <div ref={cursorRef} className='h-1 w-full' />}
							{isFetching &&
								videos &&
								session &&
								[...Array(3)].map((_, index) => (
									<Skeleton key={`loading-more-${index}`} className='h-15' />
								))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{session && (
				<SidebarFooter>
					<UsageMinutes />
					<ProfileMenu />
				</SidebarFooter>
			)}

			<SearchMenu open={searchOpen} onOpenChange={setSearchOpen} />

			<SidebarRail />
		</Sidebar>
	);
};
