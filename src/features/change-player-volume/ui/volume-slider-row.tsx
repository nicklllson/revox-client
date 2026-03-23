import { Button } from '@/shared/ui/button';
import { DropdownMenuLabel } from '@/shared/ui/dropdown-menu';
import { Slider } from '@/shared/ui/slider';

export const VolumeSliderRow = ({
	icon,
	label,
	value,
	onValueChange,
	onIconClick,
}: {
	label: string;
	icon: React.ReactNode;
	value: number[];
	onValueChange: (value: number) => void;
	onIconClick?: () => void;
}) => {
	return (
		<>
			<DropdownMenuLabel>{label}</DropdownMenuLabel>
			<div className='flex items-center gap-1 p-2 pr-2.5'>
				<Button onClick={onIconClick} variant='ghost' size='icon'>
					{icon}
				</Button>
				<Slider
					max={100}
					step={1}
					value={value}
					onValueChange={([v]) => onValueChange(v)}
					className='w-full'
				/>
			</div>
		</>
	);
};
