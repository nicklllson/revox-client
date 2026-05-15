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

	const form = useForm<TPromptInput, TPromptField, TPromptOutput>({
		resolver: zodResolver(promptSchema),
		defaultValues: {
			language: storedLanguage,
			videoUrl: '',
			params: {},
		},
	});

	const language = useWatch({ control: form.control, name: 'language' });

	useEffect(() => {
		if (language && language !== storedLanguage) {
			setStoredLanguage(language);
		}
	}, [language, storedLanguage, setStoredLanguage]);

	return form;
};
