import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export const useRegister = () => {
	const { mutateAsync, isPending, isError } = useMutation({
		mutationFn: authApi.register,
	});
	return { handleRegister: mutateAsync, isPending, isError };
};
