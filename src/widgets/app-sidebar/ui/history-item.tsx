import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { AVAILABLE_LANGUAGES } from '@/entities/video';
import { VideoActions } from '@/features/video-actions';
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar';

export const HistoryItem = ({
	id,
	title,
	language,
	thumbnail,
	isFavorite,
}: {
	id: string;
	thumbnail?: string;
	title?: string;
	language: string;
	isFavorite: boolean;
}) => {
	const [isHovered, setHovered] = useState(false);
	const [isMenuOpen, setMenuOpen] = useState(false);

	const isVisible = isHovered || isMenuOpen;

	const availableLang = useMemo(() => {
		return AVAILABLE_LANGUAGES.find(lang => lang.value === language);
	}, [language]);

	const handleMouseEnter = () => setHovered(true);
	const handleMouseLeave = () => setHovered(false);

	return (
		<SidebarMenuItem
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}>
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

					{isVisible && (
						<button
							type='button'
							onClick={e => {
								e.preventDefault();
								e.stopPropagation();
							}}>
							<VideoActions
								videoId={id}
								isFavorite={isFavorite}
								onOpenChange={setMenuOpen}
							/>
						</button>
					)}
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
};
