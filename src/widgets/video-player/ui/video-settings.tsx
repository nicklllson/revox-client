import { PlayerVolumeChanger } from '@/features/change-player-volume';

export const VideoSettings = () => {
	return (
		<div className='flex gap-2'>
			{/* <div>change language</div> */}
			<PlayerVolumeChanger />
			{/* <div>add to fav</div> */}
			{/* <div>report</div> */}
		</div>
	);
};
