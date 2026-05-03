import { Ellipsis, MoveRight, Star, Trash } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useFavorites } from '@/entities/favorites';
import { useDeleteVideo } from '@/entities/video';
import { Button } from '@/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

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

	const handleGoToSession = () => {
		navigate(`/videos/${videoId}`);
	};

	return (
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
					<DropdownMenuItem onClick={() => toggleFavorite(videoId)}>
						<Star fill={isFavorite ? 'white' : 'none'} />
						{isFavorite ? 'Remove to favorites' : 'Add to favorites'}
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => handleDeleteVideo(videoId)}
						variant='destructive'
						disabled={isDeleting}>
						<Trash />
						Delete session
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
