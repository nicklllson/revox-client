import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { useUpdateVideo, useVideo } from '@/entities/video';
import { Player } from '@/features/player';
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

	const youtubeVideoId = useMemo(() => {
		if (!video || !video?.youtubeVideoId) return '';
		return video.youtubeVideoId;
	}, [video?.youtubeVideoId]);

	useEffect(() => {
		if (video?.title && video?.thumbnail) {
			return;
		}

		if (state.title && state.thumbnail) {
			handleUpdateVideo({
				videoId,
				title: state.title,
				thumbnail: state.thumbnail,
			});
		}
	}, [state.title, state.thumbnail, video?.title, video?.thumbnail, videoId]);

	return (
		<div className='relative z-10 mx-auto flex w-full max-w-[70vw] flex-1 flex-col gap-2 px-5 pt-22.5'>
			<Player
				videoId={videoId!}
				key={video?.externalJobId}
				youtubeVideoId={youtubeVideoId}
				videoUrl={video?.videoUrl ?? ''}
				targetLang={video?.language ?? 'en'}
			/>
			<VideoBottomBar>
				<VideoTitle title={video?.title} />
				<VideoSettings />
			</VideoBottomBar>
		</div>
	);
};
