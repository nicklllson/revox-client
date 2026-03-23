import { Volume1, Volume2, VolumeOffIcon } from 'lucide-react';
import { usePlayer } from '@/app/providers/player-provider/player-provider';
import { useVolume } from '@/app/providers/volume-provider';
import { Button } from '@/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { VolumeSliderRow } from './volume-slider-row';

const getVolumeIcon = (value: number) => {
	if (value === 0) return <VolumeOffIcon size={16} />;
	if (value < 50) return <Volume1 size={16} />;
	return <Volume2 size={16} />;
};

export const PlayerVolumeChanger = () => {
	const { dispatch, state } = useVolume();
	const { getPlayer } = usePlayer();

	const handlePlayerVolume = async (value: number) => {
		dispatch({ type: 'SET_PLAYER_VOLUME', payload: value });
		const player = await getPlayer();
		player?.setVolume(value);
	};

	const handleToggleMutePlayer = async () => {
		const isMuted = state.playerVolume !== 0;
		dispatch({ type: 'TOGGLE_MUTE', target: 'player' });
		const player = await getPlayer();
		isMuted ? player?.setVolume(0) : player?.setVolume(75);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>Change volume</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-60' align='end'>
				<DropdownMenuGroup>
					<VolumeSliderRow
						label='Player Volume'
						value={[state.playerVolume]}
						onValueChange={handlePlayerVolume}
						icon={getVolumeIcon(state.playerVolume)}
						onIconClick={handleToggleMutePlayer}
					/>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<VolumeSliderRow
						label='Dubbing Volume'
						value={[state.dubbingVolume]}
						onValueChange={v =>
							dispatch({ type: 'SET_DUBBING_VOLUME', payload: v })
						}
						icon={getVolumeIcon(state.dubbingVolume)}
						onIconClick={() =>
							dispatch({ type: 'TOGGLE_MUTE', target: 'dubbing' })
						}
					/>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
