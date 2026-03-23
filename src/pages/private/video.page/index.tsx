import { VideoLayout } from '@/app/layouts/video-layout';
import { PlayerProvider } from '@/app/providers/player-provider/player-provider';
import { VolumeProvider } from '@/app/providers/volume-provider';

const VideoPage = () => {
	return (
		<VolumeProvider>
			<PlayerProvider>
				<VideoLayout />
			</PlayerProvider>
		</VolumeProvider>
	);
};

export const Component = VideoPage;
