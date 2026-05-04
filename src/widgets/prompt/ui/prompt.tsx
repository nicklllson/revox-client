import { ArrowUp } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import TextareaAutosize from 'react-textarea-autosize';
import { VideoLangSelector } from '@/features/select-video-lang';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
} from '@/shared/ui/input-group';
import { useCreateVideo } from '../lib/use-create-video';
import { usePrompt } from '../lib/use-prompt';
import type { TPromptField } from '../model/schema';

export const Prompt = () => {
	const { handleSubmit, register, control, errors } = usePrompt();
	const { handleCreateVideo, isVideoCreating } = useCreateVideo();
	const navigate = useNavigate();

	const onSubmit = (fields: TPromptField) => {
		handleCreateVideo(fields).then(res => {
			navigate(`/videos/${res.id}`);
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='grid w-full max-w-2xl gap-6'>
			<InputGroup className='shadow-2xl'>
				<TextareaAutosize
					defaultValue={'https://www.youtube.com/watch?v=0Bo-RA0sGLU'}
					data-slot='input-group-control'
					aria-invalid={!!errors.videoUrl}
					className='field-sizing-content flex min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base outline-none transition-[color,box-shadow] placeholder:text-shadow-input md:text-sm'
					placeholder='https://www.youtube.com/watch...'
					{...register('videoUrl')}
				/>
				<InputGroupAddon align='block-end'>
					<Controller
						name='language'
						control={control}
						render={({ field }) => (
							<VideoLangSelector
								isInvalid={!!errors.language}
								value={field.value}
								onValueChange={field.onChange}
							/>
						)}
					/>
					<InputGroupButton
						type='submit'
						size='icon-sm'
						variant='default'
						className='ml-auto'
						isLoading={isVideoCreating}>
						<ArrowUp />
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</form>
	);
};
