import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/entities/user';

type TUserEvent = 'auth';

type TUseUserEventParams = {
	enabled?: boolean;
};

const useAuthEvent = ({ enabled }: TUseUserEventParams) => {
	const navigate = useNavigate();
	const { user } = useUser();

	useEffect(() => {
		if (!enabled) return;
		if (!user) return;

		if (!user.profileCompleted) {
			navigate('/meta', { replace: true });
		}
	}, [enabled, user, navigate]);
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
