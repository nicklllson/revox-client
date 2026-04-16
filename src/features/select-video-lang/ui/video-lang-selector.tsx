import type { Select as SelectPrimitive } from 'radix-ui';
import type { ComponentProps } from 'react';
import { AVAILABLE_LANGUAGES } from '@/entities/video';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';

export function VideoLangSelector({
	isInvalid,
	...props
}: ComponentProps<typeof SelectPrimitive.Root> & { isInvalid?: boolean }) {
	return (
		<Select {...props}>
			<SelectTrigger
				className='w-full max-w-48 text-white'
				aria-invalid={isInvalid}
				data-slot='input-group-control'>
				<SelectValue placeholder='Select language' />
			</SelectTrigger>
			<SelectContent position='popper'>
				<SelectGroup>
					{AVAILABLE_LANGUAGES.map(lang => (
						<SelectItem key={lang.value} value={lang.value}>
							{lang.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
