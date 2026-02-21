import { Button } from '@/shared/ui/button';
import { LoggedInActions } from './logged-in-actions';

export const HeaderActions = () => {
	const isLoggedIn = true;

	if (isLoggedIn) return <LoggedInActions />;

	return (
		<div className='flex gap-1'>
			<Button size='lg' variant='secondary'>
				Pricing
			</Button>
			<Button size='lg' variant='secondary'>
				Login
			</Button>
			<Button size='lg' variant='secondary' accent='secondary'>
				Sign Up
			</Button>
		</div>
	);
};
