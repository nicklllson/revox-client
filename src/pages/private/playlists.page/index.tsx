import { ListVideo } from 'lucide-react';
import { useState } from 'react';
import {
	PlaylistCard,
	useDeletePlaylist,
	usePlaylists,
} from '@/entities/playlists';
import { CreatePlaylistDialog } from '@/features/create-playlist';
import { useDebounce } from '@/shared/hooks';
import { useIntersect } from '@/shared/hooks/use-intersect';
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/shared/ui/empty';
import { Input } from '@/shared/ui/input';

export const PlaylistsPage = () => {
	const [search, setSearch] = useState('');
	const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
	const debouncedSearch = useDebounce(search, 300);

	const { playlists, isFetching, fetchNextPage, hasNextPage } = usePlaylists({
		search: debouncedSearch || undefined,
	});
	const { deletePlaylist, isDeleting } = useDeletePlaylist();
	const cursorRef = useIntersect<HTMLDivElement>(fetchNextPage);

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center justify-between gap-3'>
				<Input
					placeholder='Search playlists...'
					value={search}
					onChange={e => setSearch(e.target.value)}
					className='max-w-sm'
				/>
				<CreatePlaylistDialog />
			</div>

			{!isFetching && playlists && playlists.length > 0 && (
				<div className='grid grid-cols-4 gap-4'>
					{playlists.map(playlist => (
						<PlaylistCard
							key={playlist.id}
							playlist={playlist}
							isConfirming={confirmDeleteId === playlist.id}
							isDeleting={isDeleting && confirmDeleteId === playlist.id}
							onDeleteClick={() => setConfirmDeleteId(playlist.id)}
							onDeleteConfirm={() =>
								deletePlaylist(playlist.id).then(() => setConfirmDeleteId(null))
							}
							onDeleteCancel={() => setConfirmDeleteId(null)}
						/>
					))}
					{hasNextPage && (
						<div ref={cursorRef} className='absolute bottom-20 h-1 w-full' />
					)}
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
