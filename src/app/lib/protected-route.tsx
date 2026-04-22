import { Navigate, Outlet, redirect } from 'react-router';
import { useSession } from '@/entities/auth';
import { ROUTES } from '@/shared/model/routes';

export const ProtectedRoute = () => {
	const { session } = useSession();

	if (!session) {
		return <Navigate to={ROUTES.PUBLIC.SIGNIN} />;
	}

	return <Outlet />;
};

export const protectedLoader = async () => {
	const { refreshToken, logout } = useSession.getState();

	const freshToken = await refreshToken();

	if (!freshToken) {
		logout();
		return redirect(ROUTES.PUBLIC.SIGNIN);
	}
	return null;
};
