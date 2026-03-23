import {
	VideoBottomBar,
	VideoPlayer,
	VideoSettings,
	VideoTitle,
} from '@/widgets/video-player';
import { usePlayer } from '../providers/player-provider';

export const VideoLayout = () => {
	const { state } = usePlayer();

	return (
		<div className='mx-auto flex w-full max-w-[70vw] flex-1 flex-col gap-2'>
			<VideoPlayer />
			<VideoBottomBar>
				<VideoTitle title={state.title} />
				<VideoSettings />
			</VideoBottomBar>
		</div>
	);
};
