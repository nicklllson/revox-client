import { Player } from '@/features/player';

export const VideoPlayer = () => {
	return (
		<div className='relative flex h-[72dvh] min-h-[440px] w-full gap-5 overflow-hidden rounded-2xl bg-white/5'>
			<Player />
		</div>
	);
};
