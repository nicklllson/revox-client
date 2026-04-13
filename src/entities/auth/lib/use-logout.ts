import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export const useLogout = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: authApi.logout,
	});

	return { handleLogout: mutateAsync, isPending };
};
