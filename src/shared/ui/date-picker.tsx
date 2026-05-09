import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/shared/hooks/use-click-outside';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';

type DatePickerProps = {
	value?: Date;
	onChange?: (date: Date | undefined) => void;
	placeholder?: string;
	className?: string;
	defaultMonth?: Date;
	fromDate?: Date;
	endDate?: Date;
};

export function DatePicker({
	value,
	onChange,
	placeholder = 'Choose date',
	className,
	...calendarProps
}: DatePickerProps) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useClickOutside(containerRef, () => setOpen(false), open);

	const handleToggle = () => setOpen(!open);
	const handleSelect = (date: Date | undefined) => {
		onChange?.(date);
		setOpen(false);
	};

	return (
		<div ref={containerRef} className={cn('relative', className)}>
			<Button
				type='button'
				variant='outline'
				className={cn(
					'w-full justify-start text-left font-normal',
					!value && 'text-muted-foreground',
				)}
				onClick={handleToggle}>
				<CalendarIcon className='mr-2 size-4' />
				{value ? (
					format(value, 'dd MMMM yyyy', { locale: enUS })
				) : (
					<span>{placeholder}</span>
				)}
			</Button>
			{open && (
				<div className='absolute bottom-full left-0 z-50 mb-2 rounded-lg border bg-popover p-3 shadow-md'>
					<Calendar
						lang='en'
						mode='single'
						selected={value}
						onSelect={handleSelect}
						captionLayout='dropdown'
						locale={enUS}
						{...calendarProps}
					/>
				</div>
			)}
		</div>
	);
}
