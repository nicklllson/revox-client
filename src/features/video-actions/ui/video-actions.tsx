import { Bookmark, Ellipsis, MoveRight, Star, Trash } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFavorites } from '@/entities/favorites';
import { useDeleteVideo } from '@/entities/video';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { PlaylistsModal } from '@/widgets/playlists-modal';

export const VideoActions = ({
	videoId,
	isFavorite,
	onOpenChange,
}: {
	videoId: string;
	isFavorite: boolean;
	onOpenChange?: (open: boolean) => void;
}) => {
	const navigate = useNavigate();
	const { toggleFavorite } = useFavorites(isFavorite);
	const { handleDeleteVideo, isDeleting } = useDeleteVideo();
	const [open, setOpen] = useState<boolean>(false);

	const handleGoToSession = () => {
		navigate(`/videos/${videoId}`);
	};

	const deleteVideo = async () => {
		await handleDeleteVideo(videoId);
		navigate(ROUTES.PUBLIC.HOME);
	};

	const handleAddVideoToPlaylist = () => {
		setOpen(true);
	};

	return (
		<>
			<DropdownMenu onOpenChange={onOpenChange}>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='icon'>
						<Ellipsis />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='start'>
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={handleGoToSession}>
							<MoveRight />
							Open session
						</DropdownMenuItem>
						<DropdownMenuItem onClick={handleAddVideoToPlaylist}>
							<Bookmark />
							Add to playlist
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => toggleFavorite(videoId)}>
							<Star fill={isFavorite ? 'white' : 'none'} />
							{isFavorite ? 'Remove to favorites' : 'Add to favorites'}
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={deleteVideo}
							variant='destructive'
							disabled={isDeleting}>
							<Trash />
							Delete session
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>

			<PlaylistsModal
				isOpen={open}
				videoId={videoId}
				trigger={undefined}
				onClose={() => setOpen(false)}
			/>
		</>
	);
};
