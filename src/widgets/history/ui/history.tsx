import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { useUsersVideos } from '../lib/use-users-videos';
import { HistoryItem } from './history-item';

export const History = () => {
	const { videos, isFetching } = useUsersVideos();

	return (
		<div className='-translate-y-1/2 absolute top-1/2 left-5 rounded-xl bg-primary-foreground p-2.5'>
			<Link to={ROUTES.PUBLIC.HOME}>
				<Button
					asChild
					variant='outline'
					className='flex h-13 w-13 items-center justify-center'>
					<Plus size={16} />
				</Button>
			</Link>
			{videos && videos?.length > 0 && <Separator />}
			{isFetching && !videos ? (
				<HistoryItem id='' language='none' thumbnail='' title='Loading' />
			) : (
				<div className='flex flex-col gap-2'>
					{videos?.map(video => (
						<HistoryItem
							id={video.id}
							key={video.id}
							title={video.title}
							language={video.language}
							thumbnail={video.thumbnail}
						/>
					))}
				</div>
			)}
		</div>
	);
};
