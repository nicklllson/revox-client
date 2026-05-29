import { href, Link } from 'react-router';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';

export const HeaderActions = () => {
	return (
		<div className='flex gap-1'>
			<Button asChild size='lg' variant='secondary'>
				<Link to={href(ROUTES.PUBLIC.PRICING)} className='text-base'>
					Pricing
				</Link>
			</Button>
			<Button asChild size='lg' variant='secondary'>
				<Link to={ROUTES.PUBLIC.SIGNIN} className='text-base'>
					Sign In
				</Link>
			</Button>

			<Button asChild size='lg' variant='secondary' accent='secondary'>
				<Link to={ROUTES.PUBLIC.SIGNUP} className='text-base'>
					Sign Up
				</Link>
			</Button>
		</div>
	);
};
