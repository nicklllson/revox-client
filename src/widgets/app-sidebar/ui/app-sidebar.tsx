import { Link, useLocation } from 'react-router';
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
	const { videos, isFetching } = useUsersVideos();
	const { pathname } = useLocation();

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader>
				<SidebarTrigger className='my-3.5 p-5 group-data-[collapsible=icon]:p-0' />
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
							{isFetching && !videos
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
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<ProfileMenu />
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
};
