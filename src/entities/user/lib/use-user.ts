import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from '@/entities/auth';
import { queryClient } from '@/shared/lib/api';
import { usersApi } from '../api/user.api';

export const useUser = () => {
	const { session } = useSession();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: usersApi.updateUser,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [usersApi.BASE_KEY],
			});
		},
	});

	const { data, isFetching } = useQuery({
		queryKey: [usersApi.BASE_KEY],
		queryFn: () => usersApi.getSingleUser(session?.userId ?? ''),
		enabled: !!session,
	});

	return {
		handleUpdateUser: mutateAsync,
		isUpdating: isPending,
		user: data,
		isFetching,
	};
};
