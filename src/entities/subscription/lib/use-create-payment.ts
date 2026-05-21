import { useMutation } from '@tanstack/react-query';
import { subscriptionApi } from '../api/subscription.api';

export const useCreatePayment = () => {
	const { mutateAsync, isPending } = useMutation({
		...subscriptionApi.createPayment(),
		onSuccess: data => {
			window.location.href = data.confirmationUrl;
		},
	});

	return { createPayment: mutateAsync, isCreatingPayment: isPending };
};
