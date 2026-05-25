import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreatePlaylist } from '@/entities/playlists';
import { Button } from '@/shared/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import {
	createPlaylistSchema,
	type TCreatePlaylistForm,
} from '../model/schema';

export const CreatePlaylistDialog = () => {
	const [open, setOpen] = useState(false);
	const { createPlaylist, isCreating } = useCreatePlaylist();

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
				<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-1.5'>
						<Input
							autoFocus
							placeholder='My playlist'
							disabled={isCreating}
							{...register('name')}
						/>
						{errors.name && (
							<p className='text-destructive text-sm'>{errors.name.message}</p>
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
	);
};
