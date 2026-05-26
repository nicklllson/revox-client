import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/entities/user';

type TUserEvent = 'auth';

type TUseUserEventParams = {
	enabled?: boolean;
};

const useAuthEvent = ({ enabled }: TUseUserEventParams) => {
	const navigate = useNavigate();
	const { user, isFetching } = useUser();

	useEffect(() => {
		if (!enabled) return;
		if (!user || isFetching) return;

		if (!user.profileCompleted) {
			navigate('/meta', { replace: true });
		}
	}, [enabled, user, isFetching]);
};
/**
 * Главный хук — диспатчер пользовательских событий.
 *
 * @example
 * useUserEvent('auth', { enabled: isAuthenticated });
 */
export const useUserEvent = (
	event: TUserEvent,
	params?: TUseUserEventParams,
) => {
	const { enabled = true } = params ?? {};

	useAuthEvent({ enabled: enabled && event === 'auth' });
};
