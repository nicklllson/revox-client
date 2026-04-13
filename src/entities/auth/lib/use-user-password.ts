import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export const useUserPassword = () => {
	const {
		mutateAsync: handleSendTokenToUser,
		isPending: isSendingTokens,
		data,
	} = useMutation({
		mutationFn: authApi.forgotPassword,
	});

	const {
		mutateAsync: handleResetPassword,
		isPending: isCreatingNewPasswords,
	} = useMutation({
		mutationFn: authApi.resetPassword,
	});

	return {
		handleResetPassword,
		isCreatingNewPasswords,
		handleSendTokenToUser,
		isSendingTokens,
		tokensData: data,
	};
};
