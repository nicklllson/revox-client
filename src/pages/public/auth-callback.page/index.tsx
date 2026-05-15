import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSession } from '@/entities/auth';
import { ROUTES } from '@/shared/model/routes';

const AuthCallbackPage = () => {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const { login } = useSession();

	useEffect(() => {
		const token = params.get('token');

		if (token) {
			login(token);
			navigate(ROUTES.PUBLIC.HOME, { replace: true });
		} else {
			navigate('/login?error=google_failed', { replace: true });
		}
	}, []);

	return <div>Authorization...</div>;
};

export const Component = AuthCallbackPage;
