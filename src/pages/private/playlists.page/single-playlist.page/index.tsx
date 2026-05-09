import { ListVideo, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
	useDeletePlaylist,
	usePlaylist,
	usePlaylistVideo,
} from '@/entities/playlists';
import { VideoCard } from '@/entities/video';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/shared/ui/empty';
import { Skeleton } from '@/shared/ui/skeleton';

export const SinglePlaylistPage = () => {
	const { playlistId } = useParams<{ playlistId: string }>();
	const [deleteOpen, setDeleteOpen] = useState(false);

	const navigate = useNavigate();
	const { playlist, isLoading } = usePlaylist(playlistId);
	const { removeVideo, isRemoving } = usePlaylistVideo(playlistId ?? '');
	const { deletePlaylist, isDeleting } = useDeletePlaylist();

	const handleDelete = () => {
		if (!playlistId) return;
		deletePlaylist(playlistId).then(() => {
			setDeleteOpen(false);
			navigate(ROUTES.PRIVATE.PLAYLISTS);
		});
	};

	return (
		<div className='flex flex-col gap-4 px-5 pt-20'>
			<div className='flex items-center justify-between gap-3'>
				<div className='flex flex-col gap-1'>
					{isLoading ? (
						<>
							<Skeleton className='h-7 w-48 rounded-lg' />
							<Skeleton className='h-4 w-24 rounded-lg' />
						</>
					) : (
						<>
							<h2 className='font-semibold text-2xl'>{playlist?.name}</h2>
							<p className='text-muted-foreground text-sm'>
								{playlist?.items.length ?? 0} videos
							</p>
						</>
					)}
				</div>

				<Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
					<DialogTrigger asChild>
						<Button variant='outline' size='sm' disabled={isLoading}>
							<Trash2 className='size-4' />
							Delete playlist
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Delete playlist?</DialogTitle>
						</DialogHeader>
						<p className='text-muted-foreground text-sm'>
							«{playlist?.name}» will be permanently deleted. This action cannot
							be undone.
						</p>
						<div className='flex justify-end gap-2'>
							<Button
								type='button'
								variant='outline'
								disabled={isDeleting}
								onClick={() => setDeleteOpen(false)}>
								Cancel
							</Button>
							<Button
								type='button'
								variant='destructive'
								isLoading={isDeleting}
								onClick={handleDelete}>
								Delete
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			{isLoading && (
				<div className='grid grid-cols-4 gap-4'>
					{Array.from({ length: 8 }).map((_, i) => (
						<Skeleton key={i} className='aspect-1.5/1 rounded-3xl' />
					))}
				</div>
			)}

			{!isLoading && playlist && playlist.items.length > 0 && (
				<div className='grid grid-cols-4 gap-4'>
					{playlist.items.map(item => (
						<div key={item.id} className='group relative'>
							<VideoCard
								id={item.video.id}
								title={item.video.title}
								lang={item.video.language}
								thumbnail={item.video.thumbnail}
							/>
							<button
								type='button'
								disabled={isRemoving}
								onClick={() => removeVideo(item.video.id)}
								className='absolute top-5 right-5 hidden size-8 items-center justify-center rounded-full bg-destructive/80 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:flex group-hover:opacity-100'>
								<Trash2 className='size-4' />
							</button>
						</div>
					))}
				</div>
			)}

			{!isLoading && playlist && playlist.items.length === 0 && (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant='icon'>
							<ListVideo />
						</EmptyMedia>
						<EmptyTitle>No Videos</EmptyTitle>
						<EmptyDescription>
							This playlist doesn&apos;t have any videos yet.
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			)}
		</div>
	);
};

export const Component = SinglePlaylistPage;
