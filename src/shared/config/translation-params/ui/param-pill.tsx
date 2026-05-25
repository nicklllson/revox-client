import type { LucideIcon } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

type Option = {
	value: string;
	label: string;
	hint?: string;
};

type Props = {
	icon: LucideIcon;
	label: string;
	value: string;
	options: Option[];
	onChange: (value: string) => void;
	isInvalid?: boolean;
	id?: string;
};

export const ParamPill = ({
	icon: Icon,
	label,
	value,
	options,
	onChange,
	isInvalid,
	id,
}: Props) => {
	const current = options.find(o => o.value === value);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				id={id}
				aria-invalid={isInvalid}
				className='group flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs transition-colors hover:bg-white/5'>
				<Icon className='size-3.5 text-white/40' />
				<span className='text-white/40'>{label}</span>
				<span className='font-medium text-white'>
					{current?.label ?? value}
				</span>
				<ChevronDown className='size-3 text-white/30 transition-transform group-data-[state=open]:rotate-180' />
			</DropdownMenuTrigger>
			<DropdownMenuContent align='start' className='min-w-[180px]'>
				{options.map(opt => (
					<DropdownMenuItem
						key={opt.value}
						onClick={() => onChange(opt.value)}
						className='flex items-center justify-between'>
						<span>{opt.label}</span>
						{opt.hint && (
							<span className='text-white/40 text-xs'>{opt.hint}</span>
						)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
