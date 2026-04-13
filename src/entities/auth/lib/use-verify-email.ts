import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export const useVerifyEmail = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: authApi.verifyEmail,
	});

	return { handleVerifyEmail: mutateAsync, isVerifying: isPending };
};
