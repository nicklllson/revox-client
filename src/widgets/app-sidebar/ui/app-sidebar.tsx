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
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
} from '@/shared/ui/sidebar';
import { Skeleton } from '@/shared/ui/skeleton';
import { ProfileMenu } from '@/widgets/profile-menu';
import { useUsersVideos } from '../lib/use-users-videos';
import { MENU_ITEMS } from '../model/constants';
import { HistoryItem } from './history-item';

export const AppSidebar = () => {
	const { videos, isFetching, fetchNextPage, hasNextPage } = useUsersVideos();
	const { pathname } = useLocation();
	const cursorRef = useIntersect<HTMLDivElement>(fetchNextPage);
	const { session } = useSession();

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<div className='my-3.5 flex items-center justify-between'>
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
					<SidebarGroupLabel>History</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{isFetching && !videos && session
								? [...Array(6)].map((_, index) => (
										<Skeleton key={index} className='h-15' />
									))
								: videos?.map(video => (
										<HistoryItem
											id={video.id}
											key={video.id}
											title={video.title}
											language={video.language}
											thumbnail={video.thumbnail}
											isFavorite={video.isFavorite}
										/>
									))}
							{hasNextPage && (
								<div ref={cursorRef} className='h-1 w-full bg-red-500' />
							)}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{session && (
				<SidebarFooter>
					<ProfileMenu />
				</SidebarFooter>
			)}

			<SidebarRail />
		</Sidebar>
	);
};
