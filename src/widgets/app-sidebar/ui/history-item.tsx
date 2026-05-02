import { Link } from 'react-router';
import { AVAILABLE_LANGUAGES } from '@/entities/video';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar';

export const HistoryItem = ({
	id,
	title,
	language,
	thumbnail,
}: {
	id: string;
	thumbnail?: string;
	title?: string;
	language: string;
}) => {
	const availableLang = AVAILABLE_LANGUAGES.find(
		lang => lang.value === language,
	);

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild tooltip={title} className='h-auto py-1.5'>
				<Link to={`/videos/${id}`}>
					{thumbnail ? (
						<img
							alt={`Preview - ${title}`}
							src={thumbnail}
							className='size-12 rounded-md object-cover group-data-[collapsible=icon]:absolute group-data-[collapsible=icon]:inset-0 group-data-[collapsible=icon]:size-full'
						/>
					) : (
						<div className='flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs'>
							s
						</div>
					)}
					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-medium'>{title}</span>
						<span className='truncate text-muted-foreground text-xs'>
							{availableLang?.label}
						</span>
					</div>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
};
