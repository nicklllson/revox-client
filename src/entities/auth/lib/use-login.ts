import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export const useLogin = () => {
	return useMutation({
		mutationFn: authApi.login,
	});
};
