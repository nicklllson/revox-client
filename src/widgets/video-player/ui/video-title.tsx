import { Skeleton } from '@/shared/ui/skeleton';

export const VideoTitle = ({ title }: { title: string | undefined }) => {
	return (
		<div className='min-w-0 max-w-120'>
			{title ? (
				<span className='block truncate text-2xl'>{title}</span>
			) : (
				<Skeleton className='h-5 w-48' />
			)}
		</div>
	);
};
