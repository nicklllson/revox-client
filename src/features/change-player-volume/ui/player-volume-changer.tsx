import { Volume1, Volume2, VolumeOffIcon } from 'lucide-react';
import { useVolume } from '@/app/providers/volume-provider';
import { Button } from '@/shared/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
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

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild id='onboarding-volume'>
				<Button variant='outline'>Change volume</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-60' align='end'>
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
