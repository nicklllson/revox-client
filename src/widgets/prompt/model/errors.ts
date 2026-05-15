import type { FieldErrors } from 'react-hook-form';
import { toast } from 'sonner';

export const handleShowError = (
	errors: FieldErrors<{
		videoUrl: string;
		language: string;
		params?: Record<string, unknown> | undefined;
	}>,
) => {
	const firstError = Object.values(errors)[0];

	if (firstError?.message) {
		toast.error(firstError.message as string);
	}
};
