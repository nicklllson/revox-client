type MeterDotsProps = {
	value: number;
	max?: number;
	color: string;
};

export const MeterDots = ({ value, max = 5, color }: MeterDotsProps) => {
	return (
		<div className='inline-flex gap-[3px]'>
			{Array.from({ length: max }).map((_, i) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: static meter
					key={i}
					className='h-[5px] w-[5px] rounded-full transition-colors duration-200'
					style={{
						background: i < value ? color : 'rgba(255,255,255,0.1)',
					}}
				/>
			))}
		</div>
	);
};
