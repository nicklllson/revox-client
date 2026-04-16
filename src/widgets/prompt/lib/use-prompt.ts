import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { promptSchema, type TPromptField } from '../model/schema';

export const usePrompt = () => {
	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<TPromptField>({
		mode: 'onBlur',
		resolver: zodResolver(promptSchema),
	});

	return { register, control, errors, handleSubmit };
};
