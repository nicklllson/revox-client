import { zodResolver } from '@hookform/resolvers/zod';
import { ListVideo, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';
import {
	useCreatePlaylist,
	useDeletePlaylist,
	usePlaylists,
} from '@/entities/playlists';
import { useDebounce } from '@/shared/hooks';
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
import { Input } from '@/shared/ui/input';

const createPlaylistSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name is required' })
		.max(50, { message: 'Name must be 50 characters or less' }),
});

type TCreatePlaylistForm = z.infer<typeof createPlaylistSchema>;

export const PlaylistsPage = () => {
	const [search, setSearch] = useState('');
	const [open, setOpen] = useState(false);
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
	const debouncedSearch = useDebounce(search, 300);

	const { playlists, isFetching } = usePlaylists({
		search: debouncedSearch || undefined,
	});
	const { createPlaylist, isCreating } = useCreatePlaylist();
	const { deletePlaylist, isDeleting } = useDeletePlaylist();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TCreatePlaylistForm>({
		mode: 'onBlur',
		resolver: zodResolver(createPlaylistSchema),
	});

	const onSubmit = (data: TCreatePlaylistForm) => {
		createPlaylist(data).then(() => {
			setOpen(false);
			reset();
		});
	};

	const handleOpenChange = (next: boolean) => {
		setOpen(next);
		if (!next) reset();
	};

	return (
		<div className='flex flex-col gap-4 px-5'>
			<div className='flex items-center justify-between gap-3'>
				<Input
					placeholder='Search playlists...'
					value={search}
					onChange={e => setSearch(e.target.value)}
					className='max-w-sm'
				/>
				<Dialog open={open} onOpenChange={handleOpenChange}>
					<DialogTrigger asChild>
						<Button variant='outline'>
							<Plus className='size-4' />
							New playlist
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>New Playlist</DialogTitle>
						</DialogHeader>
						<form
							className='flex flex-col gap-4'
							onSubmit={handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-1.5'>
								<Input
									autoFocus
									placeholder='My playlist'
									disabled={isCreating}
									{...register('name')}
								/>
								{errors.name && (
									<p className='text-destructive text-sm'>
										{errors.name.message}
									</p>
								)}
							</div>
							<div className='flex justify-end gap-2'>
								<Button
									type='button'
									variant='outline'
									disabled={isCreating}
									onClick={() => setOpen(false)}>
									Cancel
								</Button>
								<Button type='submit' isLoading={isCreating}>
									Create
								</Button>
							</div>
						</form>
					</DialogContent>
				</Dialog>
			</div>

			{!isFetching && playlists && playlists.length > 0 && (
				<div className='grid grid-cols-4 gap-4'>
					{playlists.map(playlist => {
						const isConfirming = confirmDeleteId === playlist.id;
						const isDeletingThis = isDeleting && isConfirming;

						if (isConfirming) {
							return (
								<div
									key={playlist.id}
									className='flex flex-col rounded-4xl border p-3.5'>
									<div className='mb-3.5 flex aspect-1.5/1 items-center justify-center rounded-3xl bg-destructive/10'>
										<Trash2 className='size-12 text-destructive' />
									</div>
									<p className='mb-3 line-clamp-2 text-sm'>
										Delete «{playlist.name}»?
									</p>
									<div className='flex gap-2'>
										<Button
											type='button'
											variant='ghost'
											size='sm'
											disabled={isDeletingThis}
											onClick={() => setConfirmDeleteId(null)}>
											Cancel
										</Button>
										<Button
											type='button'
											variant='destructive'
											size='sm'
											isLoading={isDeletingThis}
											onClick={() =>
												deletePlaylist(playlist.id).then(() =>
													setConfirmDeleteId(null),
												)
											}>
											Delete
										</Button>
									</div>
								</div>
							);
						}

						return (
							<div
								key={playlist.id}
								className='group relative rounded-4xl p-3.5 hover:bg-muted'>
								<Link to={`/playlist/${playlist.id}`} className='block'>
									<div className='mb-3.5 flex aspect-1.5/1 items-center justify-center rounded-3xl bg-muted'>
										<ListVideo className='size-12 text-muted-foreground' />
									</div>
									<div className='mb-2.5 flex flex-col gap-2'>
										<span className='line-clamp-2 text-xl'>
											{playlist.name}
										</span>
										<span className='text-white/70'>
											{playlist._count?.items ?? 0} videos
										</span>
									</div>
								</Link>
								<button
									type='button'
									onClick={() => setConfirmDeleteId(playlist.id)}
									className='absolute top-3.5 right-3.5 hidden size-8 items-center justify-center rounded-full bg-destructive/80 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:flex group-hover:opacity-100'>
									<Trash2 className='size-4' />
								</button>
							</div>
						);
					})}
				</div>
			)}

			{!isFetching && (!playlists || playlists.length === 0) && (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant='icon'>
							<ListVideo />
						</EmptyMedia>
						<EmptyTitle>No playlists yet</EmptyTitle>
						<EmptyDescription>
							Create your first playlist to organize your videos.
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			)}
		</div>
	);
};

export const Component = PlaylistsPage;
