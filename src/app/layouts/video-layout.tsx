import { useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { useUpdateVideo, useVideo } from '@/entities/video';
import { Player } from '@/features/player';
import { Subtitles } from '@/widgets/subtitles';
import {
	VideoBottomBar,
	VideoSettings,
	VideoTitle,
} from '@/widgets/video-player';
import { usePlayer } from '../providers/player-provider';

export const VideoLayout = () => {
	const { state } = usePlayer();
	const { videoId } = useParams<{ videoId: string }>();
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

	return (
		<div className='flex px-5 pt-22.5'>
			<div className='relative z-10 mx-auto flex w-full max-w-[70vw] flex-1 flex-col gap-2'>
				<Player videoId={videoId!} key={video?.externalJobId} />
				<VideoBottomBar>
					<VideoTitle title={video?.title} />
					<VideoSettings isFavorite={video?.isFavorite} videoId={videoId} />
				</VideoBottomBar>
			</div>
			<Subtitles />
		</div>
	);
};
