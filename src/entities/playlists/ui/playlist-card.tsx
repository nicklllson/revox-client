import { ListVideo, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/shared/ui/button';
import type { TPlaylist } from '../model/types';

type Props = {
	playlist: TPlaylist;
	isConfirming: boolean;
	isDeleting: boolean;
	onDeleteClick: () => void;
	onDeleteConfirm: () => void;
	onDeleteCancel: () => void;
};

export const PlaylistCard = ({
	playlist,
	isConfirming,
	isDeleting,
	onDeleteClick,
	onDeleteConfirm,
	onDeleteCancel,
}: Props) => {
	if (isConfirming) {
		return (
			<div className='flex flex-col rounded-4xl border p-3.5'>
				<div className='mb-3.5 flex aspect-1.5/1 items-center justify-center rounded-3xl bg-destructive/10'>
					<Trash2 className='size-12 text-destructive' />
				</div>
				<p className='mb-3 line-clamp-2 text-sm'>Delete «{playlist.name}»?</p>
				<div className='flex gap-2'>
					<Button
						type='button'
						variant='ghost'
						size='sm'
						disabled={isDeleting}
						onClick={onDeleteCancel}>
						Cancel
					</Button>
					<Button
						type='button'
						variant='destructive'
						size='sm'
						isLoading={isDeleting}
						onClick={onDeleteConfirm}>
						Delete
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className='group relative rounded-4xl p-3.5 hover:bg-muted max-2xl:rounded-2xl'>
			<Link to={`/playlist/${playlist.id}`} className='block'>
				<div className='mb-3.5 flex aspect-1.5/1 items-center justify-center rounded-3xl bg-muted max-2xl:rounded-xl'>
					<ListVideo className='size-12 text-muted-foreground max-2xl:size-8' />
				</div>
				<div className='mb-2.5 flex flex-col gap-2'>
					<span className='line-clamp-2 text-xl max-2xl:text-base'>
						{playlist.name}
					</span>
					<span className='text-white/70 max-2xl:text-xs'>
						{playlist._count?.items ?? 0} videos
					</span>
				</div>
			</Link>
			<button
				type='button'
				onClick={onDeleteClick}
				className='absolute top-3.5 right-3.5 hidden size-8 items-center justify-center rounded-full bg-destructive/80 text-white opacity-0 transition-opacity hover:bg-destructive group-hover:flex group-hover:opacity-100'>
				<Trash2 className='size-4' />
			</button>
		</div>
	);
};
