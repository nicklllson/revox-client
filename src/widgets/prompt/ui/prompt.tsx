import { ArrowUp } from 'lucide-react';
import { Controller, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router';
import TextareaAutosize from 'react-textarea-autosize';
import { useSession } from '@/entities/auth';
import { VideoLangSelector } from '@/features/select-video-lang';
import { TranslationParams } from '@/features/translation-params/';
import { ROUTES } from '@/shared/model/routes';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
} from '@/shared/ui/input-group';
import { useCreateVideo } from '../lib/use-create-video';
import { usePrompt } from '../lib/use-prompt';
import { handleShowError } from '../model/errors';
import { mapPromptToPayload } from '../model/map-prompt-to-payload';
import type { TPromptField } from '../model/schema';

export const Prompt = () => {
	const methods = usePrompt();
	const { session } = useSession();

	const { handleSubmit, register, control, formState } = methods;
	const { errors } = formState;

	const { handleCreateVideo, isVideoCreating } = useCreateVideo();
	const navigate = useNavigate();

	const onSubmit = (fields: TPromptField) => {
		if (!session) {
			return navigate(ROUTES.PUBLIC.SIGNIN);
		}

		const payload = mapPromptToPayload(fields);

		handleCreateVideo(payload).then(res => {
			navigate(`/videos/${res.id}`);
		});
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit, error => handleShowError(error))}
				className='grid w-full max-w-2xl gap-6'>
				<InputGroup className='shadow-2xl' id='onboarding-url-input'>
					<TextareaAutosize
						data-slot='input-group-control'
						aria-invalid={!!errors.videoUrl}
						className='field-sizing-content flex min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base outline-none transition-[color,box-shadow] placeholder:text-shadow-input md:text-sm'
						placeholder='https://www.youtube.com/watch...'
						{...register('videoUrl')}
					/>
					<InputGroupAddon align='block-end'>
						<div className='flex flex-wrap items-center gap-1.5'>
							<Controller
								name='language'
								control={control}
								render={({ field }) => (
									<VideoLangSelector
										isInvalid={!!errors.language}
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
							<TranslationParams />
						</div>
						<InputGroupButton
							id='onboarding-submit'
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
		</FormProvider>
	);
};
