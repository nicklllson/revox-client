import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import type z from 'zod';
import { useLocalStorage } from '@/shared/hooks';
import { promptSchema, type TPromptField } from '../model/schema';

const LANGUAGE_STORAGE_KEY = 'prompt:language';

type TPromptInput = z.input<typeof promptSchema>;
type TPromptOutput = z.output<typeof promptSchema>;

export const usePrompt = () => {
	const [storedLanguage, setStoredLanguage] = useLocalStorage<
		TPromptField['language'] | undefined
	>(LANGUAGE_STORAGE_KEY, undefined);

	const { register, control, formState, ...rest } = useForm<
		TPromptInput,
		TPromptField,
		TPromptOutput
	>({
		mode: 'onBlur',
		resolver: zodResolver(promptSchema),
		defaultValues: {
			language: storedLanguage,
			videoUrl: '',
			params: {},
		},
	});

	const language = useWatch({ control, name: 'language' });

	useEffect(() => {
		if (language && language !== storedLanguage) {
			setStoredLanguage(language);
		}
	}, [language, storedLanguage, setStoredLanguage]);

	return { register, control, formState, ...rest };
};
