import { queryOptions } from '@tanstack/react-query';
import { privateApi } from '@/shared/lib/api';
import type { TUpdateUser } from '../model/types';

export const usersApi = {
	BASE_KEY: 'users',
	updateUser: (user: TUpdateUser) =>
		privateApi('/users', {
			method: 'PATCH',
			json: user,
		}),
	getSingleUser: (userId: string) => {
		return queryOptions({
			queryKey: [usersApi.BASE_KEY, userId],
			queryFn: () => privateApi(`/users/${userId}`),
		});
	},
};
