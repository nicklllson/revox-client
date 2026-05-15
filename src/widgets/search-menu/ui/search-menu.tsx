/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Explicit */

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSession } from '@/entities/auth';
import { AVAILABLE_LANGUAGES, videosApi } from '@/entities/video';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { useIntersect } from '@/shared/hooks/use-intersect';
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/shared/ui/command';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/shared/ui/dialog';
import { Skeleton } from '@/shared/ui/skeleton';

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export const SearchMenu = ({ open, onOpenChange }: Props) => {
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query, 400);
	const navigate = useNavigate();
	const { session } = useSession();

	const {
		data: videos,
		isFetching,
		isFetchingNextPage,
		fetchNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		...videosApi.getVideosFromUser(
			debouncedQuery ? { search: debouncedQuery } : {},
		),
		enabled: open && !!session,
	});

	const cursorRef = useIntersect<HTMLDivElement>(fetchNextPage);

	useEffect(() => {
		if (!open) setQuery('');
	}, [open]);

	const handleSelect = (videoId: string) => {
		navigate(`/videos/${videoId}`);
		onOpenChange(false);
	};

	const isInitialLoad =
		isFetching && !isFetchingNextPage && (!videos || videos.length === 0);
	const isEmpty = !isFetching && (!videos || videos.length === 0);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className='overflow-hidden p-0 sm:max-w-xl'
				showCloseButton={false}>
				<DialogTitle className='sr-only'>Search videos</DialogTitle>
				<DialogDescription className='sr-only'>
					Search your video history
				</DialogDescription>
				<Command
					shouldFilter={false}
					className='**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
					<CommandInput
						placeholder='Search videos...'
						value={query}
						onValueChange={setQuery}
					/>

					<CommandList className='max-h-[420px]'>
						{isInitialLoad && (
							<div className='space-y-0.5 p-2'>
								{[...Array(5)].map((_, i) => (
									<div
										key={i}
										className='flex items-center gap-3 rounded-sm px-2 py-2.5'>
										<Skeleton className='size-10 shrink-0 rounded-md' />
										<div className='flex flex-1 flex-col gap-2'>
											<Skeleton className='h-3.5 w-3/4' />
											<Skeleton className='h-3 w-1/4' />
										</div>
									</div>
								))}
							</div>
						)}

						{isEmpty && (
							<p className='py-8 text-center text-muted-foreground text-sm'>
								No videos found.
							</p>
						)}

						{videos && videos.length > 0 && (
							<CommandGroup heading='Videos'>
								{videos.map(video => {
									const lang = AVAILABLE_LANGUAGES.find(
										l => l.value === video.language,
									);
									return (
										<CommandItem
											key={video.id}
											value={video.id}
											onSelect={() => handleSelect(video.id)}>
											{video.thumbnail ? (
												<img
													src={video.thumbnail}
													alt={video.title ?? 'Video'}
													className='size-10 shrink-0 rounded-md object-cover'
												/>
											) : (
												<div className='flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground text-xs'>
													V
												</div>
											)}
											<div className='flex min-w-0 flex-col gap-0.5'>
												<span className='truncate font-medium'>
													{video.title ?? 'Untitled'}
												</span>
												<span className='text-muted-foreground text-xs'>
													{lang?.label ?? video.language}
												</span>
											</div>
										</CommandItem>
									);
								})}
							</CommandGroup>
						)}

						{hasNextPage && (
							<div
								ref={cursorRef}
								className='flex items-center justify-center py-3'>
								{isFetchingNextPage && (
									<div className='size-4 animate-spin rounded-full border-2 border-border border-t-foreground' />
								)}
							</div>
						)}
					</CommandList>
				</Command>
			</DialogContent>
		</Dialog>
	);
};
