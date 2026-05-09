import { href, Link } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';

export const HeaderActions = () => {
	return (
		<div className='flex gap-1'>
			<Button asChild size='lg' variant='secondary'>
				<Link to={href(ROUTES.PUBLIC.PRICING)}>Pricing</Link>
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
