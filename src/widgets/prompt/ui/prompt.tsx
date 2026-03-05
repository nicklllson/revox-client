import { ArrowUp } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { VideoLangSelector } from '@/features/select-video-lang';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
} from '@/shared/ui/input-group';

export function Prompt() {
	return (
		<div className='grid w-full max-w-2xl gap-6'>
			<InputGroup className='shadow-2xl'>
				<TextareaAutosize
					data-slot='input-group-control'
					className='field-sizing-content flex min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base outline-none transition-[color,box-shadow] placeholder:text-shadow-input md:text-sm'
					placeholder='Autoresize textarea...'
				/>
				<InputGroupAddon align='block-end'>
					<VideoLangSelector />
					<InputGroupButton
						className='ml-auto'
						size='icon-sm'
						variant='default'>
						<ArrowUp />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}
