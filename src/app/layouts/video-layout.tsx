import { useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { useUpdateVideo, useVideo } from '@/entities/video';
import { Player } from '@/features/player';
import { cn } from '@/shared/lib/utils';
import { Subtitles } from '@/widgets/subtitles';
import {
	VideoBottomBar,
	VideoSettings,
	VideoTitle,
} from '@/widgets/video-player';
import { usePlayer } from '../providers/player-provider';

export const VideoLayout = () => {
	const { videoId } = useParams<{ videoId: string }>();

	const { state } = usePlayer();
	const { video } = useVideo(videoId);
	const { handleUpdateVideo } = useUpdateVideo();

	useLayoutEffect(() => {
		if (video?.title && video?.thumbnail) {
			return;
		}

		if (state.title && state.thumbnail) {
			handleUpdateVideo({
				videoId: video?.id,
				title: state.title,
				thumbnail: state.thumbnail,
			});
		}
	}, [state]);

	const isVertical = video?.isVertical ?? true;

	const bottomBar = (
		<VideoBottomBar
			className={cn(
				isVertical ? 'flex flex-col flex-nowrap items-start justify-start' : '',
			)}>
			<VideoTitle title={video?.title} />
			<VideoSettings isFavorite={video?.isFavorite} videoId={videoId} />
		</VideoBottomBar>
	);

	return (
		<div
			className={cn(
				'flex px-5 pt-22.5 max-2xl:pt-18',
				isVertical && 'flex-col',
			)}>
			<div
				className={cn(
					'relative z-10 mx-auto flex w-full flex-1 gap-2',
					isVertical
						? 'max-w-[58vw] flex-row'
						: 'max-w-[70vw] flex-col max-2xl:max-w-[55vw]',
				)}>
				<Player
					videoId={videoId!}
					isVertical={isVertical}
					key={video?.externalJobId}
				/>

				{isVertical ? (
					<div className='flex min-h-0 flex-1 flex-col gap-2'>
						{bottomBar}
						<Subtitles className='min-h-0 max-w-full flex-1' />
					</div>
				) : (
					bottomBar
				)}
			</div>

			{!isVertical && <Subtitles />}
		</div>
	);
};
