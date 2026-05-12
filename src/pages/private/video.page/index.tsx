import { lazy, Suspense } from 'react';
import { PlayerProvider } from '@/app/providers/player-provider/player-provider';
import { SubtitlesProvider } from '@/app/providers/subtitles-provider';
import { VolumeProvider } from '@/app/providers/volume-provider';
import { Skeleton } from '@/shared/ui/skeleton';

const VideoLayout = lazy(() =>
	import('@/app/layouts/video-layout').then(comp => ({
		default: comp.VideoLayout,
	})),
);

const VideoPage = () => {
	return (
		<VolumeProvider>
			<PlayerProvider>
				<SubtitlesProvider>
					<Suspense
						fallback={
							<Skeleton className='relative z-10 mx-auto mt-22.5 flex aspect-video min-h-[440px] w-full max-w-[70vw] flex-col gap-2 rounded-2xl' />
						}>
						<VideoLayout />
					</Suspense>
				</SubtitlesProvider>
			</PlayerProvider>
		</VolumeProvider>
	);
};

export const Component = VideoPage;
