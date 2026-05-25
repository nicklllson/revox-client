import { Archive } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFavoriteVideos } from '@/entities/favorites';
import { AVAILABLE_LANGUAGES, VideoCard } from '@/entities/video';
import { useDebounce } from '@/shared/hooks';
import { useIntersect } from '@/shared/hooks/use-intersect';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/shared/ui/empty';
import { Input } from '@/shared/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';

export const FavoritesPage = () => {
	const [search, setSearch] = useState<string>('');
	const [lang, setLang] = useState<string | null>(null);

	const navigate = useNavigate();

	const debouncedValue = useDebounce(search, 300);
	const { favoriteVideos, isFetching, fetchNextPage, hasNextPage } =
		useFavoriteVideos({
			search: debouncedValue,
			lang,
		});

	const cursorRef = useIntersect<HTMLDivElement>(fetchNextPage);

	const handleNavigate = () => navigate(ROUTES.PUBLIC.HOME);

	return (
		<div className='flex flex-col gap-4 max-2xl:gap-2'>
			<div className='flex items-center justify-between gap-3'>
				<Input
					placeholder='Search favorites...'
					value={search}
					onChange={e => setSearch(e.target.value)}
					className='max-w-sm'
				/>
				<Select
					value={lang ?? 'all'}
					onValueChange={val => setLang(val === 'all' ? null : val)}>
					<SelectTrigger className='w-40'>
						<SelectValue placeholder='Language' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All languages</SelectItem>
						{AVAILABLE_LANGUAGES.map(l => (
							<SelectItem key={l.value} value={l.value}>
								{l.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{!isFetching && favoriteVideos && (
				<div className='grid grid-cols-4 gap-4'>
					{favoriteVideos.map(favorite => {
						const { video } = favorite;
						return (
							<VideoCard
								key={video.id}
								id={video.id}
								title={video.title}
								lang={video.language}
								thumbnail={video.thumbnail}
							/>
						);
					})}
					{hasNextPage && (
						<div ref={cursorRef} className='absolute bottom-20 h-1 w-full' />
					)}
				</div>
			)}

			{!isFetching && favoriteVideos?.length === 0 && (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant='icon'>
							<Archive />
						</EmptyMedia>
						<EmptyTitle>No Videos Yet</EmptyTitle>
						<EmptyDescription>
							You haven&apos;t add any videos to favorites yet. Get started by
							translating your first video.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent className='flex-row justify-center gap-2'>
						<Button
							onClick={handleNavigate}
							accent='secondary'
							variant='secondary'>
							Translate video
						</Button>
					</EmptyContent>
				</Empty>
			)}
		</div>
	);
};

export const Component = FavoritesPage;
