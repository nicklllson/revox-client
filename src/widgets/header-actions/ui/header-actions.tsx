import { Link } from 'react-router';
import { useSession } from '@/entities/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import { LoggedInActions } from './logged-in-actions';

export const HeaderActions = () => {
	const { session } = useSession();

	if (session) return <LoggedInActions />;

	return (
		<div className='flex gap-1'>
			<Button size='lg' variant='secondary'>
				Pricing
			</Button>
			<Button asChild size='lg' variant='secondary'>
				<Link to={ROUTES.PUBLIC.SIGNIN}>Sign In</Link>
			</Button>

			<Button asChild size='lg' variant='secondary' accent='secondary'>
				<Link to={ROUTES.PUBLIC.SIGNUP}>Sign Up</Link>
			</Button>
		</div>
	);
};
