import type { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export const ParamToggle = ({
	icon: Icon,
	label,
	value,
	onChange,
	isInvalid,
}: {
	icon: LucideIcon;
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
	isInvalid?: boolean;
}) => {
	return (
		<button
			type='button'
			role='switch'
			aria-checked={value}
			aria-invalid={isInvalid}
			onClick={() => onChange(!value)}
			className={cn(
				'group flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition-colors',
			)}>
			<Icon className='size-3.5 transition-colors' />
			<span className='text-white/40'>{label}</span>

			{/* Сам свитч */}
			<span
				className={cn(
					'relative h-3.5 w-6 rounded-full transition-colors',
					value ? 'bg-blue-800' : 'bg-white/15',
				)}>
				<span
					className={cn(
						'absolute top-0.5 size-2.5 rounded-full bg-white transition-all',
						value ? 'left-[12px]' : 'left-0.5',
					)}
				/>
			</span>
		</button>
	);
};
