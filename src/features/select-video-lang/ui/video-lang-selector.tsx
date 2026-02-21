import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select';

export function VideoLangSelector() {
	return (
		<Select>
			<SelectTrigger className='w-full max-w-48'>
				<SelectValue placeholder='Select language' />
			</SelectTrigger>
			<SelectContent position='popper'>
				<SelectGroup>
					<SelectItem value='apple'>Russian</SelectItem>
					<SelectItem value='banana'>English</SelectItem>
					<SelectItem value='blueberry'>Spanish</SelectItem>
					<SelectItem value='grapes'>French</SelectItem>
					<SelectItem value='pineapple'>Chinese</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
