import { useSession } from '@/entities/auth';
import type { TVideo } from '@/entities/video';
import { Skeleton } from '@/shared/ui/skeleton';
import { HistoryItem } from './history-item';

export const VideosList = ({
	isFetching,
	videos,
}: {
	isFetching: boolean;
	videos: TVideo[] | undefined;
}) => {
	const { session } = useSession();

	if (!session) return null;

	return isFetching && !videos
		? [...Array(12)].map((_, index) => (
				<Skeleton key={index} className='h-15' />
			))
		: videos?.map(video => (
				<HistoryItem
					id={video.id}
					key={video.id}
					title={video.title}
					language={video.language}
					thumbnail={video.thumbnail}
					isFavorite={video.isFavorite}
				/>
			));
};
