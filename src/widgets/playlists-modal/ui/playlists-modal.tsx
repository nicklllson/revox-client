import { zodResolver } from '@hookform/resolvers/zod';
import {
	ArrowLeft,
	Check,
	ListVideo,
	Loader2,
	Plus,
	Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	useCreatePlaylist,
	useDeletePlaylist,
	usePlaylists,
} from '@/entities/playlists';
import { useAddVideoToPlaylist } from '@/features/add-video-to-playlist';
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
import { Skeleton } from '@/shared/ui/skeleton';
import {
	createPlaylistSchema,
	type TCreatePlaylistForm,
} from '../model/schemes';

export const PlaylistsModal = ({
	trigger,
	videoId,
	onClose,
	isOpen: externalOpen,
}: {
	trigger?: React.ReactNode;
	videoId?: string;
	isOpen?: boolean;
	onClose?: () => void;
}) => {
	const [internalOpen, setInternalOpen] = useState<boolean>(false);
	const [view, setView] = useState<'list' | 'create'>('list');
	const [search, setSearch] = useState<string>('');
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
	const debouncedSearch = useDebounce(search, 300);

	const open = externalOpen || internalOpen;

	const { playlists, isFetching } = usePlaylists({
		search: debouncedSearch || undefined,
	});
	const { createPlaylist, isCreating } = useCreatePlaylist();
	const { deletePlaylist, isDeleting } = useDeletePlaylist();

	const playlistIds = playlists?.map(p => p.id) ?? [];
	const { togglePlaylist, isInPlaylist, pendingId, isMembershipLoading } =
		useAddVideoToPlaylist(videoId ?? '', playlistIds);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TCreatePlaylistForm>({
		mode: 'onBlur',
		resolver: zodResolver(createPlaylistSchema),
	});

	const handleOpenChange = (next: boolean) => {
		setInternalOpen(next);
		if (!next) {
			setView('list');
			setSearch('');
			setConfirmDeleteId(null);
			reset();
			onClose?.();
		}
	};

	const onSubmit = (data: TCreatePlaylistForm) => {
		createPlaylist(data).then(() => {
			setView('list');
			reset();
		});
	};

	const handleDelete = (id: string) => {
		deletePlaylist(id).then(() => {
			setConfirmDeleteId(null);
		});
	};

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				{typeof trigger === 'undefined' ? null : (
					<Button variant='outline'>Playlists</Button>
				)}
			</DialogTrigger>
			<DialogContent className='flex max-h-[70dvh] flex-col gap-4'>
				<DialogHeader>
					<div className='flex items-center gap-2'>
						{view === 'create' && (
							<button
								type='button'
								onClick={() => {
									setView('list');
									reset();
								}}
								className='flex size-7 items-center justify-center rounded-md transition-colors hover:bg-muted'>
								<ArrowLeft className='size-4' />
							</button>
						)}
						<DialogTitle>
							{view === 'list' ? 'Your Playlists' : 'New Playlist'}
						</DialogTitle>
					</div>
				</DialogHeader>

				{view === 'list' ? (
					<>
						<div className='flex gap-2'>
							<Input
								placeholder='Search playlists...'
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
							<Button
								type='button'
								variant='outline'
								size='icon'
								onClick={() => setView('create')}>
								<Plus className='size-4' />
							</Button>
						</div>

						<div className='flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto'>
							{isFetching &&
								Array.from({ length: 4 }).map((_, i) => (
									<Skeleton key={i} className='h-14 w-full rounded-lg' />
								))}

							{!isFetching &&
								playlists &&
								playlists.length > 0 &&
								playlists.map(playlist => {
									const isPending = pendingId === playlist.id;
									const inPlaylist = isInPlaylist(playlist.id);
									const isConfirming = confirmDeleteId === playlist.id;
									const isDeletingThis = isDeleting && isConfirming;

									return (
										<div
											key={playlist.id}
											className='flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors'>
											{isConfirming ? (
												<>
													<div className='flex size-9 shrink-0 items-center justify-center rounded-md bg-destructive/10'>
														<Trash2 className='size-4 text-destructive' />
													</div>
													<p className='min-w-0 flex-1 truncate text-sm'>
														Delete «{playlist.name}»?
													</p>
													<div className='flex shrink-0 gap-1'>
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
															onClick={() => handleDelete(playlist.id)}>
															Delete
														</Button>
													</div>
												</>
											) : (
												<>
													<button
														type='button'
														disabled={!videoId || isPending}
														onClick={() =>
															videoId && togglePlaylist(playlist.id)
														}
														className='flex min-w-0 flex-1 items-center gap-3 disabled:cursor-default'>
														<div className='flex size-9 shrink-0 items-center justify-center rounded-md bg-muted'>
															<ListVideo className='size-4 text-muted-foreground' />
														</div>
														<div className='min-w-0 flex-1 text-left'>
															<p className='truncate font-medium text-sm'>
																{playlist.name}
															</p>
															<p className='text-muted-foreground text-xs'>
																{playlist._count?.items ?? 0} videos
															</p>
														</div>
													</button>

													{isPending && (
														<Loader2 className='size-4 shrink-0 animate-spin text-muted-foreground' />
													)}
													{!isPending && videoId && isMembershipLoading && (
														<div className='size-4 shrink-0 animate-pulse rounded-full bg-muted' />
													)}
													{!isPending &&
														!isMembershipLoading &&
														videoId &&
														inPlaylist && (
															<Check className='size-4 shrink-0 text-green-500' />
														)}

													<button
														type='button'
														onClick={() => setConfirmDeleteId(playlist.id)}
														className='flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive'>
														<Trash2 className='size-4' />
													</button>
												</>
											)}
										</div>
									);
								})}

							{!isFetching && (!playlists || playlists.length === 0) && (
								<Empty className='border-none'>
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
					</>
				) : (
					<form
						className='flex flex-col gap-4'
						onSubmit={handleSubmit(onSubmit)}>
						<div className='flex flex-col gap-1.5'>
							<Input
								placeholder='My playlist'
								autoFocus
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
								onClick={() => {
									setView('list');
									reset();
								}}>
								Cancel
							</Button>
							<Button type='submit' isLoading={isCreating}>
								Create
							</Button>
						</div>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
};
